import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '@/navigation/types';
import { useApp } from '@/context/AppContext';
import { colors, spacing, typography } from '@/theme';
import { getParkById } from '@/data/parks';
import { formatDateRange } from '@/utils/dates';
import ScreenHeader from '@/components/ScreenHeader';
import Polaroid, { tapeColorForIndex } from '@/components/Polaroid';

type Props = NativeStackScreenProps<ProfileStackParamList, 'TripPhotoAlbum'>;

// A trip can never have more than 3 photos (schema caps trip_photos at slot
// 0-2), so rather than a swipeable pager sized off the screen width — which
// is exactly what made centering fragile — this is just three fixed,
// always-centered slots. Each one only renders if that slot has a photo.
const MAX_SLOTS = 3;
const SLOT_ROTATIONS = [-2, 3, -3];

export default function TripPhotoAlbumScreen({ route, navigation }: Props) {
  const { tripId } = route.params;
  const { trips } = useApp();
  const { width: screenWidth } = useWindowDimensions();
  const photoSize = (screenWidth - spacing.xl * 2) * 0.78;

  const trip = trips.find((t) => t.id === tripId);
  const park = trip ? getParkById(trip.parkId) : undefined;
  const photos = trip?.photos ?? [];

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

      <ScrollView contentContainerStyle={styles.slots} showsVerticalScrollIndicator={false}>
        {Array.from({ length: MAX_SLOTS }, (_, slot) => {
          const uri = photos[slot];
          if (!uri) return null;
          return (
            <Polaroid
              key={slot}
              uri={uri}
              size={photoSize}
              variant="page"
              tapeColor={tapeColorForIndex(slot)}
              rotate={SLOT_ROTATIONS[slot]}
            />
          );
        })}
      </ScrollView>

      <TouchableOpacity
        style={styles.viewTripLink}
        onPress={() => (navigation as any).navigate('TripDetail', { tripId })}
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

  // alignItems:'center' on a plain column is what actually guarantees
  // centering here — no width math tied to the screen size involved.
  slots: { alignItems: 'center', gap: spacing['2xl'], paddingHorizontal: spacing.xl, paddingTop: spacing.xl, paddingBottom: spacing.xl },

  viewTripLink: { alignItems: 'center', paddingVertical: spacing.md },
  viewTripLinkText: { ...typography.labelSemiBold, color: colors.sage },
});
