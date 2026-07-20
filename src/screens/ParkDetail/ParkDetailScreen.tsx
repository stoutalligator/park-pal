import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Polyline, Polygon } from 'react-native-svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParksStackParamList } from '@/navigation/types';
import { useApp } from '@/context/AppContext';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import { getParkScene } from '@/data/parkImages';
import StatusBadge from '@/components/StatusBadge';
import TripCard from '@/components/TripCard';
import PrimaryButton from '@/components/PrimaryButton';

type Props = NativeStackScreenProps<ParksStackParamList, 'ParkDetail'>;

function BackArrowIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16">
      <Polyline
        points="10,2 4,8 10,14"
        fill="none"
        stroke={colors.textPrimary}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function TreeIcon({ size = 20 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Polygon points="10,2 4,10 7,10 3,15 8,15 8,18 12,18 12,15 17,15 13,10 16,10" fill={colors.sage} />
    </Svg>
  );
}

export default function ParkDetailScreen({ route, navigation }: Props) {
  const { parkId } = route.params;
  const { parks, trips, toggleFavorite, updateParkStatus } = useApp();
  const insets = useSafeAreaInsets();
  const park = parks.find((p) => p.id === parkId);
  const parkTrips = trips.filter((t) => t.parkId === parkId);

  if (!park) return null;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <Image source={getParkScene(park.id)} style={styles.heroImage} resizeMode="cover" />
          <TouchableOpacity style={[styles.backBtn, { top: insets.top + 16 }]} onPress={() => navigation.goBack()}>
            <BackArrowIcon />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.heartBtn, { top: insets.top + 16 }]} onPress={() => toggleFavorite(park.id)}>
            <Image
              source={require('@/assets/icons/icon-favorites.png')}
              style={[styles.heartIcon, !park.isFavorite && styles.heartIconInactive]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Info */}
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <View style={styles.titleBlock}>
              <Text style={styles.parkName}>{park.name}</Text>
              <Text style={styles.parkType}>National Park</Text>
            </View>
            <StatusBadge status={park.status} detail />
          </View>

          <Text style={styles.description}>{park.description}</Text>

          {/* Facts */}
          <View style={styles.factsRow}>
            <View style={styles.fact}>
              <Image source={require('@/assets/icons/icon-calendar.png')} style={styles.factIcon} resizeMode="contain" />
              <Text style={styles.factLabel}>Est. {park.establishedYear}</Text>
            </View>
            <View style={styles.factDivider} />
            <View style={styles.fact}>
              <Image source={require('@/assets/icons/icon-map.png')} style={styles.factIcon} resizeMode="contain" />
              <Text style={styles.factLabel}>{park.state}</Text>
            </View>
            <View style={styles.factDivider} />
            <View style={styles.fact}>
              <TreeIcon size={26} />
              <Text style={styles.factLabel}>{park.acres.toLocaleString()} Acres</Text>
            </View>
          </View>

          {/* Status actions */}
          {park.status !== 'visited' && (
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.actionChip} onPress={() => updateParkStatus(park.id, 'visited')}>
                <Text style={styles.actionChipText}>Mark Visited</Text>
              </TouchableOpacity>
              {park.status !== 'bucketList' && (
                <TouchableOpacity style={[styles.actionChip, styles.actionChipAlt]} onPress={() => updateParkStatus(park.id, 'bucketList')}>
                  <Text style={[styles.actionChipText, styles.actionChipAltText]}>Bucket List</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Memories */}
          {parkTrips.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Your Memories</Text>
                <Text style={styles.viewAll}>View All</Text>
              </View>
              {parkTrips.map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  onPress={() =>
                    (navigation as any).navigate('TripsTab', { screen: 'TripDetail', params: { tripId: trip.id } })
                  }
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.xl }]}>
        <PrimaryButton
          label={park.status === 'visited' ? '+ LOG ANOTHER TRIP' : '+ LOG THIS PARK'}
          onPress={() => {}}
          style={styles.ctaBtn}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingBottom: 100 },

  hero: { height: 320, position: 'relative', backgroundColor: colors.surfaceWarm },
  heroImage: { width: '100%', height: '100%' },
  backBtn: { position: 'absolute', top: 16, left: 16, width: 36, height: 36, borderRadius: 18, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', ...shadows.md },
  heartBtn: { position: 'absolute', top: 16, right: 16, width: 36, height: 36, borderRadius: 18, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', ...shadows.md },
  heartIcon: { width: 18, height: 18 },
  heartIconInactive: { opacity: 0.3 },

  content: {
    padding: spacing.xl,
    gap: spacing.xl,
    marginTop: -28,
    backgroundColor: colors.background,
    borderTopLeftRadius: radius['2xl'],
    borderTopRightRadius: radius['2xl'],
  },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  titleBlock: { flex: 1, gap: 4 },
  parkName: { ...typography.h2, color: colors.textPrimary },
  parkType: { ...typography.body, color: colors.textSecondary },

  description: { ...typography.body, color: colors.textSecondary, lineHeight: 22 },

  factsRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  fact: { gap: 6, alignItems: 'center', paddingHorizontal: spacing.lg },
  factDivider: { width: 1, height: 34, backgroundColor: colors.divider },
  factIcon: { width: 26, height: 26 },
  factLabel: { ...typography.caption, color: colors.textSecondary, textAlign: 'center' },

  actionRow: { flexDirection: 'row', gap: spacing.md },
  actionChip: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, backgroundColor: colors.primary, borderRadius: radius.full },
  actionChipText: { ...typography.labelSmall, color: colors.textInverse },
  actionChipAlt: { backgroundColor: colors.surfaceWarm, borderWidth: 1.5, borderColor: colors.orange },
  actionChipAltText: { color: colors.orange },

  section: { gap: spacing.sm },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  sectionTitle: { ...typography.h5, color: colors.textPrimary },
  viewAll: { ...typography.labelSmall, color: colors.sage },

  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: spacing.xl, backgroundColor: colors.background },
  ctaBtn: { width: '100%' },
});
