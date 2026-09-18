import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '@/context/AppContext';
import { colors, spacing, radius, typography } from '@/theme';
import { getParkById } from '@/data/parks';
import { getParkImage } from '@/data/parkImages';
import { formatDateRange } from '@/utils/dates';
import ScreenHeader from '@/components/ScreenHeader';
import EmptyState from '@/components/EmptyState';
import Polaroid, { tapeColorForIndex } from '@/components/Polaroid';
import { Trip } from '@/types';

const SCREEN_WIDTH = Dimensions.get('window').width;
const PAGE_WIDTH = SCREEN_WIDTH - spacing.xl * 2;

const COLUMNS = 2;
const ROWS = 3;
const TRIPS_PER_PAGE = COLUMNS * ROWS;
const GRID_GAP = spacing.lg;
const TILE_WIDTH = (PAGE_WIDTH - GRID_GAP * (COLUMNS - 1)) / COLUMNS;
const STACK_SIZE = TILE_WIDTH * 0.82;
const TILE_HEIGHT = STACK_SIZE * 1.3 + 40;
const PAGE_HEIGHT = TILE_HEIGHT * ROWS + GRID_GAP * (ROWS - 1);

// Back photos peek out from behind the front one, but must stay within the
// tile's own bounds — otherwise, at wider (2-column) layouts, the left-leaning
// photo bleeds past the tile edge into whatever sits next to it in the
// horizontal scroll content (the previous album page, for a column-1 tile).
const BACK_SIZE = STACK_SIZE * 0.9;
const BACK_MARGIN = (TILE_WIDTH - BACK_SIZE) / 2;
const BACK_SHIFT = BACK_MARGIN * 0.75;
const BACK_LEFT_1 = BACK_MARGIN - BACK_SHIFT;
const BACK_LEFT_2 = BACK_MARGIN + BACK_SHIFT;

function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size));
  return chunks;
}

function PhotoStack({ trip, tapeColor }: { trip: Trip; tapeColor: string }) {
  const backPhotos = trip.photos.slice(1, 3);

  return (
    <View style={styles.stackWrap}>
      {backPhotos.map((uri, i) => (
        <Polaroid
          key={uri}
          uri={uri}
          size={BACK_SIZE}
          variant="stack"
          rotate={i === 0 ? -12 : 10}
          style={i === 0 ? styles.stackBackPhoto1 : styles.stackBackPhoto2}
        />
      ))}
      <Polaroid uri={trip.photos[0]} size={STACK_SIZE} variant="stack" tapeColor={tapeColor} rotate={-2} />
      <View style={styles.parkBadge}>
        <Image source={getParkImage(trip.parkId)} style={styles.parkBadgeImage} resizeMode="cover" />
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
  const [pageIndex, setPageIndex] = useState(0);

  // Oldest trip first — flips forward like a keepsake album filled in over time.
  const tripsWithPhotos = [...trips]
    .filter((t) => t.photos.length > 0)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
  const pages = chunk(tripsWithPhotos, TRIPS_PER_PAGE);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setPageIndex(Math.round(e.nativeEvent.contentOffset.x / PAGE_WIDTH));
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
        style={styles.pager}
        contentContainerStyle={styles.pagerContent}
      >
        {pages.map((pageTrips, pageNum) => (
          <View key={pageNum} style={styles.page}>
            <View style={styles.grid}>
              {pageTrips.map((trip, i) => {
                const park = getParkById(trip.parkId);
                const globalIndex = pageNum * TRIPS_PER_PAGE + i;
                return (
                  <TouchableOpacity
                    key={trip.id}
                    style={styles.tile}
                    activeOpacity={0.85}
                    onPress={() => navigation.navigate('TripPhotoAlbum', { tripId: trip.id })}
                  >
                    <PhotoStack trip={trip} tapeColor={tapeColorForIndex(globalIndex)} />
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

  pager: { flexGrow: 0, width: PAGE_WIDTH, alignSelf: 'center' },
  pagerContent: { alignItems: 'flex-start' },
  page: { width: PAGE_WIDTH, height: PAGE_HEIGHT, paddingTop: spacing.md },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: GRID_GAP },
  tile: { width: TILE_WIDTH, height: TILE_HEIGHT, alignItems: 'center' },

  stackWrap: {
    width: '100%',
    height: STACK_SIZE * 1.3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  stackBackPhoto1: { position: 'absolute', left: BACK_LEFT_1, top: STACK_SIZE * 0.1 },
  stackBackPhoto2: { position: 'absolute', left: BACK_LEFT_2, top: STACK_SIZE * 0.12 },

  parkBadge: {
    position: 'absolute',
    bottom: -4,
    right: TILE_WIDTH * 0.06,
    width: 28,
    height: 28,
    borderRadius: radius.full,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.surface,
  },
  parkBadgeImage: { width: '100%', height: '100%' },

  countBadge: {
    position: 'absolute',
    top: -2,
    left: TILE_WIDTH * 0.06,
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
