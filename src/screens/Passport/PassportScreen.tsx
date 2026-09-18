import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, useWindowDimensions, LayoutChangeEvent, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle } from 'react-native-svg';
import { useApp } from '@/context/AppContext';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import { Trip } from '@/types';
import { TOTAL_PARKS } from '@/data/parks';
import ProgressRing from '@/components/ProgressRing';
import ScreenHeader from '@/components/ScreenHeader';
import TripStamp, { STAMP_INK_COLORS } from '@/components/TripStamp';

// Alpha-suffixed theme-token derivatives (matches the `${colors.x}NN` pattern
// used elsewhere, e.g. DateRangePicker's range-highlight) rather than
// hardcoded rgba literals.
const CREAM_FAINT = `${colors.cream}59`;
const CREAM_SOFT = `${colors.cream}8C`;
const WHITE_FAINT = `${colors.textInverse}24`;

function CornerBracket({ corner }: { corner: 'tl' | 'tr' | 'bl' | 'br' }) {
  return <View style={[styles.corner, styles[`corner_${corner}`]]} />;
}

// Dashed medallion ring behind the mascot, evoking a wax-seal / rubber-stamp
// emblem rather than a plain circle — a straight borderStyle:'dashed' View
// renders inconsistently across RN Web vs native, so it's drawn with SVG.
function SealRing({ size }: { size: number }) {
  const r = size / 2 - 2;
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={StyleSheet.absoluteFill}>
      <Circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={CREAM_SOFT} strokeWidth={1.5} strokeDasharray="3,5" />
    </Svg>
  );
}

const STAMPS_PER_SIDE = 3;
const STAMPS_PER_SPREAD = STAMPS_PER_SIDE * 2;

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
  // order the parks were actually collected in — not alphabetical or by
  // region. Planned trips haven't happened yet, so they don't earn a stamp
  // until they're completed and become a logged trip.
  const orderedTrips = trips
    .filter((t) => t.tripType === 'logged')
    .sort((a, b) => a.startDate.localeCompare(b.startDate));

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
          <LinearGradient
            colors={[colors.primaryLight, colors.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cover}
          >
            <View style={styles.coverInset}>
              <CornerBracket corner="tl" />
              <CornerBracket corner="tr" />
              <CornerBracket corner="bl" />
              <CornerBracket corner="br" />

              <View style={styles.sealWrap}>
                <SealRing size={132} />
                <Image source={require('@/assets/mascot/mascot-ranger-full.png')} style={styles.coverMascot} resizeMode="contain" />
              </View>

              <Text style={styles.coverTitle}>NATIONAL PARK</Text>
              <Text style={styles.coverSubtitle}>PASSPORT</Text>

              <View style={styles.coverDivider}>
                <View style={styles.coverDividerLine} />
                <View style={styles.coverDividerDot} />
                <View style={styles.coverDividerLine} />
              </View>

              <View style={styles.coverProgress}>
                <ProgressRing
                  percentage={stats.completionPercentage}
                  size={64}
                  trackColor={WHITE_FAINT}
                  fillColor={colors.cream}
                  textColor={colors.textInverse}
                />
                <View>
                  <Text style={styles.coverCount}>{stats.totalVisited} / {TOTAL_PARKS}</Text>
                  <Text style={styles.coverLabel}>Parks Visited</Text>
                </View>
              </View>

              <Text style={styles.coverHint}>{'Swipe to see your stamps  ›'}</Text>
            </View>
          </LinearGradient>
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
    borderRadius: radius.xl,
    ...shadows.lg,
  },
  coverInset: {
    flex: 1,
    margin: spacing.md,
    borderWidth: 1,
    borderColor: CREAM_FAINT,
    borderRadius: radius.lg,
    padding: spacing['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  corner: { position: 'absolute', width: 22, height: 22, borderColor: CREAM_SOFT },
  corner_tl: { top: 10, left: 10, borderTopWidth: 2, borderLeftWidth: 2, borderTopLeftRadius: radius.sm },
  corner_tr: { top: 10, right: 10, borderTopWidth: 2, borderRightWidth: 2, borderTopRightRadius: radius.sm },
  corner_bl: { bottom: 10, left: 10, borderBottomWidth: 2, borderLeftWidth: 2, borderBottomLeftRadius: radius.sm },
  corner_br: { bottom: 10, right: 10, borderBottomWidth: 2, borderRightWidth: 2, borderBottomRightRadius: radius.sm },
  sealWrap: { width: 132, height: 132, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xs },
  coverMascot: { width: 92, height: 104 },
  coverTitle: { ...typography.labelSmall, color: `${colors.textInverse}CC`, letterSpacing: 3 },
  coverSubtitle: { ...typography.h3, color: colors.textInverse },
  coverDivider: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, width: '55%', marginTop: spacing.xs },
  coverDividerLine: { flex: 1, height: 1, backgroundColor: CREAM_FAINT },
  coverDividerDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: CREAM_SOFT },
  coverProgress: { flexDirection: 'row', alignItems: 'center', gap: spacing.xl, marginTop: spacing.sm },
  coverCount: { ...typography.h4, color: colors.textInverse },
  coverLabel: { ...typography.caption, color: `${colors.textInverse}B3` },
  coverHint: { ...typography.caption, color: `${colors.textInverse}99`, marginTop: spacing.xl },

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

  emptyPage: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md },
  emptyMascot: { width: 88, height: 88 },
  emptyTitle: { ...typography.h5, color: colors.textPrimary },
  emptyText: { ...typography.body, color: colors.textSecondary, textAlign: 'center', paddingHorizontal: spacing['2xl'] },

  dots: { flexDirection: 'row', justifyContent: 'center', gap: spacing.xs, paddingBottom: spacing.lg },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.border },
  dotActive: { backgroundColor: colors.primary, width: 16 },
});
