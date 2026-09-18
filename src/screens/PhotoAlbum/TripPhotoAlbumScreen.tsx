import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '@/navigation/types';
import { useApp } from '@/context/AppContext';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import { getParkById } from '@/data/parks';
import { formatDateRange } from '@/utils/dates';
import ScreenHeader from '@/components/ScreenHeader';
import Polaroid, { tapeColorForIndex } from '@/components/Polaroid';

type Props = NativeStackScreenProps<ProfileStackParamList, 'TripPhotoAlbum'>;

const SCREEN_WIDTH = Dimensions.get('window').width;
const PAGE_WIDTH = SCREEN_WIDTH - spacing.xl * 2;
const PHOTO_SIZE = PAGE_WIDTH * 0.82;

function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  const d = direction === 'left' ? 'M10 3 4 9l6 6' : 'M8 3l6 6-6 6';
  return (
    <Svg width={16} height={16} viewBox="0 0 18 18">
      <Path d={d} fill="none" stroke={colors.textPrimary} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export default function TripPhotoAlbumScreen({ route, navigation }: Props) {
  const { tripId } = route.params;
  const { trips } = useApp();
  const scrollRef = useRef<ScrollView>(null);
  const [pageIndex, setPageIndex] = useState(0);

  const trip = trips.find((t) => t.id === tripId);
  const park = trip ? getParkById(trip.parkId) : undefined;
  const photos = trip?.photos ?? [];

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, photos.length - 1));
    scrollRef.current?.scrollTo({ x: clamped * PAGE_WIDTH, animated: true });
    setPageIndex(clamped);
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setPageIndex(Math.round(e.nativeEvent.contentOffset.x / PAGE_WIDTH));
  };

  if (!trip || photos.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <ScreenHeader title="Photo Album" onBack={() => navigation.goBack()} />
        <Text style={styles.notFound}>No photos to show.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title={park?.name ?? 'Trip Photos'} onBack={() => navigation.goBack()} />
      <Text style={styles.dateLabel}>{formatDateRange(trip.startDate, trip.endDate)}</Text>

      <View style={styles.pagerRow}>
        {pageIndex > 0 && (
          <TouchableOpacity style={styles.navBtn} onPress={() => goTo(pageIndex - 1)} hitSlop={10}>
            <ArrowIcon direction="left" />
          </TouchableOpacity>
        )}

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
          {photos.map((uri, index) => (
            <View key={`${uri}-${index}`} style={styles.page}>
              <Polaroid uri={uri} size={PHOTO_SIZE} variant="page" tapeColor={tapeColorForIndex(index)} rotate={index % 2 === 0 ? -2 : 2} />
            </View>
          ))}
        </ScrollView>

        {pageIndex < photos.length - 1 && (
          <TouchableOpacity style={styles.navBtn} onPress={() => goTo(pageIndex + 1)} hitSlop={10}>
            <ArrowIcon direction="right" />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.counter}>{pageIndex + 1} / {photos.length}</Text>

      <View style={styles.dots}>
        {photos.map((_, i) => (
          <View key={i} style={[styles.dot, i === pageIndex && styles.dotActive]} />
        ))}
      </View>

      <TouchableOpacity
        style={styles.viewTripLink}
        onPress={() => navigation.navigate('TripsTab' as any, { screen: 'TripDetail', params: { tripId } })}
      >
        <Text style={styles.viewTripLinkText}>View Trip Details</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  notFound: { ...typography.body, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xl },

  dateLabel: { ...typography.bodySmall, color: colors.textMuted, textAlign: 'center', marginBottom: spacing.md },

  pagerRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingHorizontal: spacing.md },
  navBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },

  pager: { flex: 1, width: PAGE_WIDTH, alignSelf: 'center' },
  page: { width: PAGE_WIDTH, alignItems: 'center', justifyContent: 'center' },

  counter: { ...typography.labelSemiBold, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.md },

  dots: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, justifyContent: 'center', paddingVertical: spacing.md, paddingHorizontal: spacing.xl },
  dot: { width: 6, height: 6, borderRadius: radius.full, backgroundColor: colors.border },
  dotActive: { backgroundColor: colors.primary, width: 18 },

  viewTripLink: { alignItems: 'center', paddingVertical: spacing.md },
  viewTripLinkText: { ...typography.labelSemiBold, color: colors.sage },
});
