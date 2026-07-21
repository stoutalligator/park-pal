import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, useWindowDimensions, LayoutChangeEvent, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '@/context/AppContext';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import { Trip } from '@/types';
import { getParkById, TOTAL_PARKS } from '@/data/parks';
import { getParkImage } from '@/data/parkImages';
import ProgressRing from '@/components/ProgressRing';
import ScreenHeader from '@/components/ScreenHeader';
import { parseLocalDate } from '@/utils/dates';

const STAMPS_PER_SIDE = 3;
const STAMPS_PER_SPREAD = STAMPS_PER_SIDE * 2;

// Rotates through the palette so consecutive stamps don't share ink color,
// evoking different checkpoint stamps rather than one uniform badge.
const STAMP_INK_COLORS = [colors.primary, colors.orange, colors.sage, colors.rose, colors.brown];

function formatStampDate(dateStr: string): string {
  const d = parseLocalDate(dateStr);
  return d
    .toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
    .toUpperCase();
}

// Deterministic pseudo-rotation per trip so each stamp looks hand-pressed
// but stays stable across re-renders instead of jittering on every render.
function stampRotation(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return (hash % 13) - 6;
}

function TripStamp({ trip, ink }: { trip: Trip; ink: string }) {
  const park = getParkById(trip.parkId);
  if (!park) return null;
  const rotation = stampRotation(trip.id);
  return (
    <View style={[styles.stamp, { transform: [{ rotate: `${rotation}deg` }] }]}>
      <View style={[styles.stampRing, { borderColor: ink }]}>
        <Image source={getParkImage(park.id)} style={styles.stampImage} resizeMode="cover" />
      </View>
      <Text style={[styles.stampDate, { color: ink }]}>{formatStampDate(trip.startDate)}</Text>
      <Text style={styles.stampName} numberOfLines={2}>{park.name}</Text>
    </View>
  );
}

export default function PassportScreen() {
  const { trips, stats } = useApp();
  const navigation = useNavigation<any>();
  const [pageIndex, setPageIndex] = useState(0);
  // Measured from the pager's own layout rather than Dimensions.get('window')
  // so each page is exactly as wide as the actual viewport — Dimensions is a
  // one-time snapshot and goes stale on web window resizes.
  const { width: windowWidth } = useWindowDimensions();
  const [pagerWidth, setPagerWidth] = useState(windowWidth);

  const handlePagerLayout = (e: LayoutChangeEvent) => {
    setPagerWidth(e.nativeEvent.layout.width);
  };

  // Oldest first, so flipping forward through the passport retraces the
  // order the parks were actually collected in — not alphabetical or by region.
  const orderedTrips = [...trips].sort((a, b) => a.startDate.localeCompare(b.startDate));

  const spreads: Trip[][] = [];
  for (let i = 0; i < orderedTrips.length; i += STAMPS_PER_SPREAD) {
    spreads.push(orderedTrips.slice(i, i + STAMPS_PER_SPREAD));
  }

  const pageCount = 1 + (spreads.length > 0 ? spreads.length : 1);

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / pagerWidth);
    setPageIndex(idx);
  };

  let inkCursor = 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="My Passport" onBack={() => navigation.goBack()} />

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        onLayout={handlePagerLayout}
        style={styles.pager}
      >
        {/* Cover page */}
        <View style={[styles.page, { width: pagerWidth }]}>
          <View style={styles.cover}>
            <Image source={require('@/assets/mascot/mascot-ranger-full.png')} style={styles.coverMascot} resizeMode="contain" />
            <Text style={styles.coverTitle}>NATIONAL PARK</Text>
            <Text style={styles.coverSubtitle}>PASSPORT</Text>
            <View style={styles.coverProgress}>
              <ProgressRing percentage={stats.completionPercentage} size={64} />
              <View>
                <Text style={styles.coverCount}>{stats.totalVisited} / {TOTAL_PARKS}</Text>
                <Text style={styles.coverLabel}>Parks Visited</Text>
              </View>
            </View>
            <Text style={styles.coverHint}>{'Swipe to see your stamps  ›'}</Text>
          </View>
        </View>

        {/* Stamp spreads, oldest trip first */}
        {spreads.map((spreadTrips, spreadIndex) => {
          const left = spreadTrips.slice(0, STAMPS_PER_SIDE);
          const right = spreadTrips.slice(STAMPS_PER_SIDE);
          return (
            <View key={spreadIndex} style={[styles.page, { width: pagerWidth }]}>
              <View style={styles.spread}>
                <View style={styles.spreadSide}>
                  {left.map((trip) => {
                    const ink = STAMP_INK_COLORS[inkCursor++ % STAMP_INK_COLORS.length];
                    return <TripStamp key={trip.id} trip={trip} ink={ink} />;
                  })}
                </View>
                <View style={styles.spreadSeam} />
                <View style={styles.spreadSide}>
                  {right.map((trip) => {
                    const ink = STAMP_INK_COLORS[inkCursor++ % STAMP_INK_COLORS.length];
                    return <TripStamp key={trip.id} trip={trip} ink={ink} />;
                  })}
                </View>
              </View>
              <Text style={styles.pageNumber}>Page {spreadIndex + 1} of {spreads.length}</Text>
            </View>
          );
        })}

        {/* Empty state — no trips logged yet */}
        {spreads.length === 0 && (
          <View style={[styles.page, { width: pagerWidth }]}>
            <View style={styles.emptyPage}>
              <Image source={require('@/assets/mascot/mascot-thinking.png')} style={styles.emptyMascot} resizeMode="contain" />
              <Text style={styles.emptyTitle}>No Stamps Yet</Text>
              <Text style={styles.emptyText}>Log your first trip and it'll show up here as a stamp.</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Page dots */}
      <View style={styles.dots}>
        {Array.from({ length: pageCount }).map((_, i) => (
          <View key={i} style={[styles.dot, i === pageIndex && styles.dotActive]} />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  pager: { flex: 1 },
  page: { flex: 1, paddingHorizontal: spacing.xl, paddingTop: spacing.md, paddingBottom: spacing.lg },

  cover: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
    padding: spacing['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  coverMascot: { width: 96, height: 108 },
  coverTitle: { ...typography.labelSmall, color: 'rgba(255,255,255,0.8)', letterSpacing: 3 },
  coverSubtitle: { ...typography.h3, color: colors.textInverse },
  coverProgress: { flexDirection: 'row', alignItems: 'center', gap: spacing.xl, marginTop: spacing.sm },
  coverCount: { ...typography.h4, color: colors.textInverse },
  coverLabel: { ...typography.caption, color: 'rgba(255,255,255,0.7)' },
  coverHint: { ...typography.caption, color: 'rgba(255,255,255,0.6)', marginTop: spacing.xl },

  spread: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.surfaceWarm,
    borderRadius: radius.xl,
    ...shadows.sm,
  },
  spreadSide: { flex: 1, padding: spacing.lg, justifyContent: 'space-evenly', alignItems: 'center' },
  spreadSeam: { width: 0, marginVertical: spacing.lg, borderLeftWidth: 1.5, borderStyle: 'dashed', borderColor: colors.border },
  pageNumber: { ...typography.caption, color: colors.textMuted, textAlign: 'center', marginTop: spacing.md },

  stamp: { alignItems: 'center', gap: 2, width: '100%' },
  stampRing: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 2.5,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  // The source art is a circular badge inset on a white square canvas — the
  // badge itself only spans ~66% of the canvas width (measured directly off
  // the PNGs) — so the image is oversized ~1/0.66 and clipped by the ring's
  // overflow:hidden to crop that built-in white margin away entirely.
  stampImage: { width: '160%', height: '160%' },
  stampDate: { ...typography.caption, fontSize: 10, letterSpacing: 0.5, marginTop: 4 },
  stampName: { ...typography.labelSmall, color: colors.textPrimary, textAlign: 'center' },

  emptyPage: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md },
  emptyMascot: { width: 88, height: 88 },
  emptyTitle: { ...typography.h5, color: colors.textPrimary },
  emptyText: { ...typography.body, color: colors.textSecondary, textAlign: 'center', paddingHorizontal: spacing['2xl'] },

  dots: { flexDirection: 'row', justifyContent: 'center', gap: spacing.xs, paddingBottom: spacing.lg },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.border },
  dotActive: { backgroundColor: colors.primary, width: 16 },
});
