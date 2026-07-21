import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Polygon } from 'react-native-svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TripsStackParamList } from '@/navigation/types';
import { useApp } from '@/context/AppContext';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import { getParkById } from '@/data/parks';
import { getParkScene } from '@/data/parkImages';
import { convertMiles, convertFeet, distanceLabel, elevationLabel } from '@/utils/units';
import { parseLocalDate } from '@/utils/dates';

type Props = NativeStackScreenProps<TripsStackParamList, 'TripDetail'>;

function formatDate(d: string) {
  return parseLocalDate(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function BackArrowIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16">
      <Path d="M10 2 4 8l6 6" fill="none" stroke={colors.textPrimary} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function EditIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24">
      <Path
        d="M4 20h4l11-11a2.12 2.12 0 0 0-3-3L5 17v3Z"
        fill="none"
        stroke={colors.textPrimary}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function TrashIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24">
      <Path
        d="M4 7h16M9 7V4h6v3m-9 0 1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13M10 11v6M14 11v6"
        fill="none"
        stroke={colors.rose}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function StarIcon({ filled, size = 16 }: { filled: boolean; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Polygon
        points="12,2 14.9,9 22.5,9.3 16.4,14 18.5,21.3 12,17.1 5.5,21.3 7.6,14 1.5,9.3 9.1,9"
        fill={filled ? colors.orange : colors.divider}
      />
    </Svg>
  );
}

export default function TripDetailScreen({ route, navigation }: Props) {
  const { tripId } = route.params;
  const { trips, deleteTrip, userProfile } = useApp();
  const units = userProfile.units;
  const insets = useSafeAreaInsets();
  const trip = trips.find((t) => t.id === tripId);
  const park = trip ? getParkById(trip.parkId) : null;

  if (!trip || !park) return null;

  const confirmDelete = () => {
    const remove = () => {
      deleteTrip(trip.id);
      navigation.goBack();
    };
    if (Platform.OS === 'web') {
      if (window.confirm('Delete this trip? This cannot be undone.')) remove();
      return;
    }
    Alert.alert('Delete Trip', 'Delete this trip? This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: remove },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <Image source={getParkScene(park.id)} style={styles.heroImage} resizeMode="cover" />
          <TouchableOpacity style={[styles.backBtn, { top: insets.top + 16 }]} onPress={() => navigation.goBack()}>
            <BackArrowIcon />
          </TouchableOpacity>
          <View style={[styles.heroActions, { top: insets.top + 16 }]}>
            <TouchableOpacity
              style={styles.heroActionBtn}
              onPress={() => (navigation as any).navigate('LogTrip', { tripId: trip.id })}
            >
              <EditIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.heroActionBtn} onPress={confirmDelete}>
              <TrashIcon />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.parkName}>{park.name}</Text>
          <Text style={styles.dates}>{formatDate(trip.startDate)} – {formatDate(trip.endDate)}</Text>

          {/* Activities */}
          {trip.activities.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Activities</Text>
              <View style={styles.tagRow}>
                {trip.activities.map((a) => (
                  <View key={a} style={styles.tag}>
                    <Text style={styles.tagText}>{a}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Journal */}
          {trip.notes ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Journal</Text>
              <View style={styles.journalCard}>
                <Text style={styles.journalText}>{trip.notes}</Text>
              </View>
            </View>
          ) : null}

          {/* Photos */}
          {trip.photos.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Photos</Text>
              <View style={styles.photoGrid}>
                {trip.photos.map((uri) => (
                  <Image key={uri} source={{ uri }} style={styles.photoThumb} resizeMode="cover" />
                ))}
              </View>
            </View>
          )}

          {/* Trails Hiked */}
          {trip.trailsHiked && trip.trailsHiked.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Trails Hiked</Text>
              <View style={styles.tagRow}>
                {trip.trailsHiked.map((t) => (
                  <View key={t.trailId ?? t.name} style={styles.tag}>
                    <Text style={styles.tagText}>{t.name} · {convertMiles(t.miles, units).toFixed(1)} {distanceLabel(units)}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Wildlife */}
          {trip.wildlifeSightings && trip.wildlifeSightings.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Wildlife Spotted</Text>
              <View style={styles.tagRow}>
                {trip.wildlifeSightings.map((w) => (
                  <View key={w} style={[styles.tag, styles.tagWildlife]}>
                    <Text style={[styles.tagText, styles.tagTextWildlife]}>{w}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Stats */}
          <View style={styles.statsRow}>
            {trip.milesHiked ? (
              <View style={styles.statChip}><Text style={styles.statNum}>{convertMiles(trip.milesHiked, units).toFixed(1)}</Text><Text style={styles.statLabel}>{distanceLabel(units) === 'mi' ? 'Miles' : 'Kilometers'}</Text></View>
            ) : null}
            {trip.elevationGainFt ? (
              <View style={styles.statChip}><Text style={styles.statNum}>{Math.round(convertFeet(trip.elevationGainFt, units)).toLocaleString()}</Text><Text style={styles.statLabel}>Elev. Gain ({elevationLabel(units)})</Text></View>
            ) : null}
            {trip.rating ? (
              <View style={styles.statChip}>
                <View style={styles.starRow}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <StarIcon key={i} filled={i <= (trip.rating ?? 0)} />
                  ))}
                </View>
                <Text style={styles.statLabel}>Rating</Text>
              </View>
            ) : null}
            {trip.weather ? (
              <View style={styles.statChip}><Text style={styles.statNum}>{trip.weather}</Text><Text style={styles.statLabel}>Weather</Text></View>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingBottom: spacing['5xl'] },
  hero: { height: 320, position: 'relative', backgroundColor: colors.surfaceWarm },
  heroImage: { width: '100%', height: '100%' },
  backBtn: { position: 'absolute', top: 16, left: 16, width: 36, height: 36, borderRadius: 18, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', ...shadows.md },
  heroActions: { position: 'absolute', top: 16, right: 16, flexDirection: 'row', gap: spacing.sm },
  heroActionBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', ...shadows.md },
  content: {
    padding: spacing.xl,
    gap: spacing.xl,
    marginTop: -28,
    backgroundColor: colors.background,
    borderTopLeftRadius: radius['2xl'],
    borderTopRightRadius: radius['2xl'],
  },
  parkName: { ...typography.h2, color: colors.textPrimary },
  dates: { ...typography.body, color: colors.textSecondary },
  section: { gap: spacing.sm },
  sectionTitle: { ...typography.h5, color: colors.textPrimary },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  tag: { backgroundColor: colors.surfaceWarm, borderRadius: radius.full, paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  tagWildlife: { backgroundColor: colors.surfaceWarm },
  tagText: { ...typography.labelSmall, color: colors.primary },
  tagTextWildlife: { color: colors.orange },
  journalCard: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, ...shadows.sm },
  journalText: { ...typography.body, color: colors.textPrimary, lineHeight: 22 },
  photoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  photoThumb: { width: '31%', aspectRatio: 1, borderRadius: radius.md, backgroundColor: colors.surfaceWarm },
  statsRow: { flexDirection: 'row', gap: spacing.md, flexWrap: 'wrap' },
  statChip: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, alignItems: 'center', minWidth: 80, ...shadows.sm },
  statNum: { ...typography.h5, color: colors.textPrimary },
  statLabel: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
  starRow: { flexDirection: 'row', gap: 2 },
});
