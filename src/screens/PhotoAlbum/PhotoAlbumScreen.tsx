import React, { useRef, useState } from 'react';
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
import { colors, spacing, radius, shadows, typography } from '@/theme';
import { getParkById } from '@/data/parks';
import { getParkImage } from '@/data/parkImages';
import { formatDateRange } from '@/utils/dates';
import ScreenHeader from '@/components/ScreenHeader';
import EmptyState from '@/components/EmptyState';

const SCREEN_WIDTH = Dimensions.get('window').width;
const PAGE_WIDTH = SCREEN_WIDTH - spacing.xl * 2;

interface AlbumPhoto {
  uri: string;
  tripId: string;
  parkId: string;
  dateLabel: string;
}

export default function PhotoAlbumScreen() {
  const { trips } = useApp();
  const navigation = useNavigation<any>();
  const scrollRef = useRef<ScrollView>(null);
  const [pageIndex, setPageIndex] = useState(0);

  // Oldest trip first, keeping each trip's own photo order — flips forward
  // like a keepsake album filled in over time rather than a "recent" feed.
  const photos: AlbumPhoto[] = [...trips]
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
    .flatMap((trip) =>
      trip.photos.map((uri) => ({
        uri,
        tripId: trip.id,
        parkId: trip.parkId,
        dateLabel: formatDateRange(trip.startDate, trip.endDate),
      }))
    );

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setPageIndex(Math.round(e.nativeEvent.contentOffset.x / PAGE_WIDTH));
  };

  if (photos.length === 0) {
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
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        onScroll={handleScroll}
        scrollEventThrottle={32}
        style={styles.pager}
      >
        {photos.map((photo, index) => {
          const park = getParkById(photo.parkId);
          return (
            <TouchableOpacity
              key={`${photo.tripId}-${index}`}
              style={styles.page}
              activeOpacity={0.9}
              onPress={() =>
                navigation.navigate('TripsTab', { screen: 'TripDetail', params: { tripId: photo.tripId } })
              }
            >
              <View style={styles.slide}>
                <Image source={{ uri: photo.uri }} style={styles.photo} resizeMode="cover" />
              </View>
              <View style={styles.caption}>
                <Image source={getParkImage(photo.parkId)} style={styles.parkIcon} resizeMode="cover" />
                <View style={styles.captionText}>
                  <Text style={styles.parkName} numberOfLines={1}>{park?.name ?? 'Unknown Park'}</Text>
                  <Text style={styles.dateLabel}>{photo.dateLabel}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.dots}>
        {photos.map((_, i) => (
          <View key={i} style={[styles.dot, i === pageIndex && styles.dotActive]} />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  pager: { flex: 1, width: PAGE_WIDTH, alignSelf: 'center' },
  page: { width: PAGE_WIDTH, alignItems: 'center', justifyContent: 'center', gap: spacing.lg },

  slide: {
    width: '100%',
    aspectRatio: 4 / 3,
    backgroundColor: colors.cream,
    borderRadius: radius.lg,
    padding: spacing.md,
    ...shadows.md,
  },
  photo: {
    flex: 1,
    borderRadius: radius.md,
  },

  caption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.full,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    ...shadows.sm,
  },
  parkIcon: { width: 32, height: 32, borderRadius: radius.full },
  captionText: { gap: 1 },
  parkName: { ...typography.labelBold, color: colors.textPrimary },
  dateLabel: { ...typography.caption, color: colors.textMuted },

  dots: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, justifyContent: 'center', paddingVertical: spacing.md, paddingHorizontal: spacing.xl },
  dot: { width: 6, height: 6, borderRadius: radius.full, backgroundColor: colors.border },
  dotActive: { backgroundColor: colors.primary, width: 18 },
});
