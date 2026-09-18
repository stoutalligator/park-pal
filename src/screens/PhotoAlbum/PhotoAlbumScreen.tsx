import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '@/context/AppContext';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import { getParkById } from '@/data/parks';
import { getParkImage } from '@/data/parkImages';
import { formatDateRange } from '@/utils/dates';
import ScreenHeader from '@/components/ScreenHeader';
import EmptyState from '@/components/EmptyState';
import Polaroid, { tapeColorForIndex } from '@/components/Polaroid';
import { Trip } from '@/types';

const COLUMNS = 2;
const ROWS = 3;
const TRIPS_PER_PAGE = COLUMNS * ROWS;
const GRID_GAP = spacing.lg;

// Computed from the live window width (not a module-level Dimensions
// snapshot, which is captured once at import time and can be stale) so the
// grid always matches the screen it's actually rendered on.
function useAlbumLayout(screenWidth: number) {
  return useMemo(() => {
    // The ScrollView and each page are full screen width — matching
    // TripPhotoAlbumScreen's approach — with the xl inset applied as
    // padding *inside* each page instead of shrinking-and-centering the
    // ScrollView itself, which was landing short of the true screen width.
    const contentWidth = screenWidth - spacing.xl * 2;
    const tileWidth = (contentWidth - GRID_GAP * (COLUMNS - 1)) / COLUMNS;
    // Deliberately conservative (not "as big as fits") so the back photos'
    // peek — see backLeft1/2 below — always clears the tile edge with room
    // to spare, rather than nearly touching it.
    const stackSize = tileWidth * 0.72;
    const tileHeight = stackSize * 1.3 + 40;
    const pageHeight = tileHeight * ROWS + GRID_GAP * (ROWS - 1);
    const backSize = stackSize * 0.88;
    const backMargin = (tileWidth - backSize) / 2;
    const backShift = backMargin * 0.7;
    const backLeft1 = backMargin - backShift;
    const backLeft2 = backMargin + backShift;
    const parkBadgeSize = stackSize * 0.4;
    return { tileWidth, stackSize, tileHeight, pageHeight, backSize, backLeft1, backLeft2, parkBadgeSize };
  }, [screenWidth]);
}

type Layout = ReturnType<typeof useAlbumLayout>;

function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size));
  return chunks;
}

function PhotoStack({ trip, tapeColor, layout }: { trip: Trip; tapeColor: string; layout: Layout }) {
  const backPhotos = trip.photos.slice(1, 3);
  const { stackSize, backSize, backLeft1, backLeft2, parkBadgeSize } = layout;

  return (
    <View style={[styles.stackWrap, { height: stackSize * 1.3 }]}>
      {backPhotos.map((uri, i) => (
        <Polaroid
          key={uri}
          uri={uri}
          size={backSize}
          variant="stack"
          rotate={i === 0 ? -12 : 10}
          style={{ position: 'absolute', left: i === 0 ? backLeft1 : backLeft2, top: stackSize * (i === 0 ? 0.1 : 0.12) }}
        />
      ))}
      <Polaroid uri={trip.photos[0]} size={stackSize} variant="stack" tapeColor={tapeColor} rotate={-2} />
      <View style={[styles.parkBadgeShadow, { width: parkBadgeSize, height: parkBadgeSize, bottom: parkBadgeSize * 0.18, right: parkBadgeSize * 0.25 }]}>
        <View style={styles.parkBadge}>
          <Image source={getParkImage(trip.parkId)} style={styles.parkBadgeImage} resizeMode="cover" />
        </View>
      </View>
      {trip.photos.length > 1 && (
        <View style={styles.countBadge}>
          <Text style={styles.countBadgeText}>{trip.photos.length}</Text>
        </View>
      )}
    </View>
  );
}

export default function PhotoAlbumScreen() {
  const { trips } = useApp();
  const navigation = useNavigation<any>();
  const { width: screenWidth } = useWindowDimensions();
  const layout = useAlbumLayout(screenWidth);
  const [pageIndex, setPageIndex] = useState(0);

  // Oldest trip first — flips forward like a keepsake album filled in over time.
  const tripsWithPhotos = [...trips]
    .filter((t) => t.photos.length > 0)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
  const pages = chunk(tripsWithPhotos, TRIPS_PER_PAGE);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setPageIndex(Math.round(e.nativeEvent.contentOffset.x / screenWidth));
  };

  if (tripsWithPhotos.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <ScreenHeader title="Photo Album" onBack={() => navigation.goBack()} />
        <EmptyState
          title="No Photos Yet"
          subtitle="Add photos when you log a trip and they'll show up here in your album."
          actionLabel="Log a Trip"
          onAction={() => navigation.navigate('LogTrip')}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Photo Album" onBack={() => navigation.goBack()} />
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        onScroll={handleScroll}
        scrollEventThrottle={32}
        style={{ width: screenWidth }}
      >
        {pages.map((pageTrips, pageNum) => (
          <View key={pageNum} style={[styles.page, { width: screenWidth, height: layout.pageHeight }]}>
            <View style={styles.grid}>
              {pageTrips.map((trip, i) => {
                const park = getParkById(trip.parkId);
                const globalIndex = pageNum * TRIPS_PER_PAGE + i;
                return (
                  <TouchableOpacity
                    key={trip.id}
                    style={[styles.tile, { width: layout.tileWidth, height: layout.tileHeight }]}
                    activeOpacity={0.85}
                    onPress={() => navigation.navigate('TripPhotoAlbum', { tripId: trip.id })}
                  >
                    <PhotoStack trip={trip} tapeColor={tapeColorForIndex(globalIndex)} layout={layout} />
                    <Text style={styles.parkName} numberOfLines={1}>{park?.name ?? 'Unknown Park'}</Text>
                    <Text style={styles.dateLabel} numberOfLines={1}>{formatDateRange(trip.startDate, trip.endDate)}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>

      {pages.length > 1 && (
        <View style={styles.dots}>
          {pages.map((_, i) => (
            <View key={i} style={[styles.dot, i === pageIndex && styles.dotActive]} />
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  page: { paddingTop: spacing.md, paddingHorizontal: spacing.xl },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: GRID_GAP },
  tile: { alignItems: 'center' },

  stackWrap: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },

  // Sits fully on the polaroid's own white bottom strip rather than hanging
  // off its rounded corner — overlapping that corner let the frame's drop
  // shadow bleed around part of the ring, making it read as an uneven halo
  // instead of a clean circle. Shadow and circular clip are split across two
  // views since overflow:hidden (needed for the clip) would otherwise also
  // clip the shadow itself on iOS.
  parkBadgeShadow: {
    position: 'absolute',
    borderRadius: radius.full,
    ...shadows.sm,
  },
  parkBadge: {
    width: '100%',
    height: '100%',
    borderRadius: radius.full,
    borderWidth: 3,
    borderColor: colors.surface,
    overflow: 'hidden',
  },
  parkBadgeImage: { width: '100%', height: '100%' },

  countBadge: {
    position: 'absolute',
    top: -2,
    left: 6,
    minWidth: 20,
    height: 20,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    borderWidth: 2,
    borderColor: colors.surface,
  },
  countBadgeText: { ...typography.labelSmall, fontSize: 10, color: colors.textInverse },

  parkName: { ...typography.labelBold, color: colors.textPrimary, textAlign: 'center', fontSize: 13 },
  dateLabel: { ...typography.caption, color: colors.textMuted, textAlign: 'center', fontSize: 10 },

  dots: { flexDirection: 'row', gap: spacing.xs, justifyContent: 'center', paddingVertical: spacing.md },
  dot: { width: 6, height: 6, borderRadius: radius.full, backgroundColor: colors.border },
  dotActive: { backgroundColor: colors.primary, width: 18 },
});
