import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParksStackParamList } from '@/navigation/types';
import { useApp } from '@/context/AppContext';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import StatusBadge from '@/components/StatusBadge';
import TripCard from '@/components/TripCard';
import PrimaryButton from '@/components/PrimaryButton';

type Props = NativeStackScreenProps<ParksStackParamList, 'ParkDetail'>;

export default function ParkDetailScreen({ route, navigation }: Props) {
  const { parkId } = route.params;
  const { parks, trips, toggleFavorite, updateParkStatus } = useApp();
  const park = parks.find((p) => p.id === parkId);
  const parkTrips = trips.filter((t) => t.parkId === parkId);

  if (!park) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.heroImageBox}>
            <Text style={styles.heroEmoji}>🏔️</Text>
          </View>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.heartBtn} onPress={() => toggleFavorite(park.id)}>
            <Text style={styles.heartIcon}>{park.isFavorite ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </View>

        {/* Info */}
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <View style={styles.titleBlock}>
              <Text style={styles.parkName}>{park.name}</Text>
              <Text style={styles.parkType}>National Park</Text>
            </View>
            <StatusBadge status={park.status} />
          </View>

          <Text style={styles.description}>{park.description}</Text>

          {/* Facts */}
          <View style={styles.factsRow}>
            <View style={styles.fact}>
              <Text style={styles.factIcon}>📅</Text>
              <Text style={styles.factLabel}>Est. {park.establishedYear}</Text>
            </View>
            <View style={styles.fact}>
              <Text style={styles.factIcon}>📍</Text>
              <Text style={styles.factLabel}>{park.state}</Text>
            </View>
            <View style={styles.fact}>
              <Text style={styles.factIcon}>🌲</Text>
              <Text style={styles.factLabel}>{park.acres.toLocaleString()} Acres</Text>
            </View>
          </View>

          {/* Status actions */}
          <View style={styles.actionRow}>
            {park.status !== 'visited' && (
              <TouchableOpacity style={styles.actionChip} onPress={() => updateParkStatus(park.id, 'visited')}>
                <Text style={styles.actionChipText}>✓ Mark Visited</Text>
              </TouchableOpacity>
            )}
            {park.status !== 'bucketList' && (
              <TouchableOpacity style={[styles.actionChip, styles.actionChipAlt]} onPress={() => updateParkStatus(park.id, 'bucketList')}>
                <Text style={[styles.actionChipText, styles.actionChipAltText]}>⭐ Bucket List</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Memories */}
          {parkTrips.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Your Memories</Text>
                <Text style={styles.viewAll}>View All</Text>
              </View>
              {parkTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} onPress={() => {}} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.footer}>
        <PrimaryButton
          label={park.status === 'visited' ? '+ Log Another Trip' : '+ Log This Park'}
          icon="🌲"
          onPress={() => {}}
          style={styles.ctaBtn}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingBottom: 100 },

  hero: { height: 240, position: 'relative' },
  heroImageBox: { flex: 1, backgroundColor: '#C5DEBA', alignItems: 'center', justifyContent: 'center' },
  heroEmoji: { fontSize: 64, opacity: 0.7 },
  backBtn: { position: 'absolute', top: 16, left: 16, width: 36, height: 36, borderRadius: 18, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', ...shadows.md },
  backIcon: { fontSize: 24, color: colors.textPrimary, lineHeight: 30 },
  heartBtn: { position: 'absolute', top: 16, right: 16, width: 36, height: 36, borderRadius: 18, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', ...shadows.md },
  heartIcon: { fontSize: 18 },

  content: { padding: spacing.xl, gap: spacing.xl },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  titleBlock: { flex: 1, gap: 4 },
  parkName: { ...typography.h2, color: colors.textPrimary },
  parkType: { ...typography.body, color: colors.textSecondary },

  description: { ...typography.body, color: colors.textSecondary, lineHeight: 22 },

  factsRow: { flexDirection: 'row', gap: spacing.xl },
  fact: { gap: 4, alignItems: 'center' },
  factIcon: { fontSize: 20 },
  factLabel: { ...typography.caption, color: colors.textSecondary, textAlign: 'center' },

  actionRow: { flexDirection: 'row', gap: spacing.md },
  actionChip: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, backgroundColor: colors.primary, borderRadius: radius.full },
  actionChipText: { ...typography.labelSmall, color: colors.textInverse },
  actionChipAlt: { backgroundColor: '#FFF3E8', borderWidth: 1.5, borderColor: colors.orange },
  actionChipAltText: { color: colors.orange },

  section: { gap: spacing.sm },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  sectionTitle: { ...typography.h5, color: colors.textPrimary },
  viewAll: { ...typography.labelSmall, color: colors.sage },

  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: spacing.xl, backgroundColor: colors.background, borderTopWidth: 1, borderTopColor: colors.border },
  ctaBtn: { width: '100%' },
});
