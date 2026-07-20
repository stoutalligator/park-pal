import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '@/context/AppContext';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import ProgressRing from '@/components/ProgressRing';
import ScreenHeader from '@/components/ScreenHeader';
import { TOTAL_PARKS } from '@/data/parks';

export default function StatsScreen() {
  const { stats } = useApp();
  const navigation = useNavigation<any>();

  const STAT_CARDS = [
    { label: 'Total Trips', value: stats.totalTrips, icon: require('@/assets/icons/icon-trips.png') },
    { label: 'Miles Hiked', value: stats.totalMilesHiked, icon: require('@/assets/icons/mountain.png') },
    { label: 'Elevation Gain (ft)', value: stats.totalElevationGain, icon: require('@/assets/icons/icon-hikes.png') },
    { label: 'States Visited', value: stats.statesVisited, icon: require('@/assets/icons/icon-map.png') },
    { label: 'Photos Saved', value: stats.totalPhotos, icon: require('@/assets/icons/icon-photos.png') },
    { label: 'Bucket List', value: stats.bucketListCount, icon: require('@/assets/icons/icon-favorites.png') },
    { label: 'Remaining', value: stats.totalRemaining, icon: require('@/assets/icons/icon-parks.png') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="My Stats" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Summary callout */}
        <View style={styles.summaryCard}>
          <Image source={require('@/assets/mascot/mascot-tip.png')} style={styles.mascot} resizeMode="contain" />
          <Text style={styles.summaryText}>
            You are officially a Mountain Explorer. Your most logged activity is {stats.favoriteActivity}.
          </Text>
        </View>

        {/* Progress ring */}
        <View style={styles.ringCard}>
          <ProgressRing percentage={stats.completionPercentage} size={100} strokeWidth={10} />
          <View>
            <Text style={styles.ringCount}>{stats.totalVisited} / {TOTAL_PARKS}</Text>
            <Text style={styles.ringLabel}>Parks Visited</Text>
            <Text style={styles.ringPct}>{stats.completionPercentage}% Complete</Text>
          </View>
        </View>

        {/* Stat grid */}
        <View style={styles.grid}>
          {STAT_CARDS.map(({ label, value, icon }) => (
            <View key={label} style={styles.statCard}>
              <Image source={icon} style={styles.statIcon} resizeMode="contain" />
              <Text style={styles.statValue}>{value}</Text>
              <Text style={styles.statLabel}>{label}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: spacing.xl, paddingBottom: spacing['5xl'], gap: spacing.xl },
  summaryCard: { backgroundColor: colors.surface, borderRadius: radius.xl, padding: spacing.xl, flexDirection: 'row', alignItems: 'center', gap: spacing.md, ...shadows.sm, marginTop: spacing.md },
  mascot: { width: 48, height: 48 },
  summaryText: { ...typography.body, color: colors.textPrimary, flex: 1, lineHeight: 22 },
  ringCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.xl, backgroundColor: colors.surface, borderRadius: radius.xl, padding: spacing.xl, ...shadows.sm },
  ringCount: { ...typography.h3, color: colors.textPrimary },
  ringLabel: { ...typography.body, color: colors.textSecondary },
  ringPct: { ...typography.labelBold, color: colors.sage },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  statCard: { width: '30%', flex: 1, minWidth: '30%', backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, alignItems: 'center', gap: spacing.xs, ...shadows.sm },
  statIcon: { width: 26, height: 26 },
  statValue: { ...typography.h4, color: colors.textPrimary },
  statLabel: { ...typography.caption, color: colors.textSecondary, textAlign: 'center' },
});
