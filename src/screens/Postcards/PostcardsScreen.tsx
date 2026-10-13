import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '@/context/AppContext';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import { Trip } from '@/types';
import { TOTAL_PARKS, getParkById } from '@/data/parks';
import { getParkImage, getParkScene } from '@/data/parkImages';
import { formatDateRange } from '@/utils/dates';
import ScreenHeader from '@/components/ScreenHeader';

// Deterministic tilt per trip so each stamp looks hand-stuck but stays stable
// across re-renders.
function stampTilt(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return (hash % 9) - 2;
}

function Postcard({ trip, onPress }: { trip: Trip; onPress: () => void }) {
  const park = getParkById(trip.parkId);
  if (!park) return null;
  return (
    <TouchableOpacity style={styles.postcard} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.sceneWrap}>
        <Image source={getParkScene(park.id)} style={styles.scene} resizeMode="cover" />

        <View style={[styles.stamp, { transform: [{ rotate: `${stampTilt(trip.id)}deg` }] }]}>
          <View style={styles.stampArt}>
            <Image source={getParkImage(park.id)} style={styles.stampImage} resizeMode="cover" />
          </View>
        </View>

        <View style={styles.greeting}>
          <Text style={styles.greetingKicker}>GREETINGS FROM</Text>
          <Text style={styles.greetingPark} numberOfLines={1}>{park.name}</Text>
          <Text style={styles.greetingDate}>{formatDateRange(trip.startDate, trip.endDate)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function PostcardsScreen() {
  const { trips, stats } = useApp();
  const navigation = useNavigation<any>();

  // Newest first. Planned trips haven't happened yet, so they don't earn a
  // postcard until they're completed and become a logged trip.
  const postcards = trips
    .filter((t) => t.tripType === 'logged')
    .sort((a, b) => b.startDate.localeCompare(a.startDate));

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScreenHeader title="Postcard Collection" onBack={() => navigation.goBack()} />

      {postcards.length === 0 ? (
        <View style={styles.empty}>
          <Image source={require('@/assets/mascot/mascot-thinking.png')} style={styles.emptyMascot} resizeMode="contain" />
          <Text style={styles.emptyTitle}>No Postcards Yet</Text>
          <Text style={styles.emptyText}>Log your first trip and a postcard from that park will land here.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Text style={styles.summary}>
            {postcards.length} {postcards.length === 1 ? 'postcard' : 'postcards'} · {stats.totalVisited} / {TOTAL_PARKS} parks
          </Text>
          {postcards.map((trip) => (
            <Postcard key={trip.id} trip={trip} onPress={() => navigation.navigate('TripDetail', { tripId: trip.id })} />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const STAMP_SIZE = 64;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: spacing.xl, paddingBottom: spacing['5xl'], gap: spacing.xl },
  summary: { ...typography.bodySmall, color: colors.textSecondary, textAlign: 'center' },

  postcard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.sm,
    ...shadows.md,
  },
  sceneWrap: { aspectRatio: 3 / 2, borderRadius: radius.md, overflow: 'hidden', backgroundColor: colors.surfaceWarm },
  scene: { width: '100%', height: '100%' },

  stamp: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    backgroundColor: colors.surface,
    padding: 4,
    borderRadius: 2,
    ...shadows.sm,
  },
  stampArt: {
    width: STAMP_SIZE,
    height: STAMP_SIZE,
    borderWidth: 1,
    borderColor: colors.tan,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: colors.background,
  },
  // The park icon art is a circular badge inset on a white square canvas, so
  // it's oversized (same crop as TripStamp) to fill the stamp.
  stampImage: { width: '140%', height: '140%' },

  greeting: {
    position: 'absolute',
    left: spacing.md,
    bottom: spacing.md,
    maxWidth: '70%',
    backgroundColor: `${colors.surface}E6`,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  greetingKicker: { ...typography.caption, color: colors.brown, letterSpacing: 1.5, fontSize: 9 },
  greetingPark: { ...typography.h5, color: colors.textPrimary },
  greetingDate: { ...typography.caption, color: colors.textSecondary },

  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md, paddingHorizontal: spacing['2xl'] },
  emptyMascot: { width: 88, height: 88 },
  emptyTitle: { ...typography.h5, color: colors.textPrimary },
  emptyText: { ...typography.body, color: colors.textSecondary, textAlign: 'center' },
});
