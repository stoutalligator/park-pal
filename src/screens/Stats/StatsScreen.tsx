import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '@/context/AppContext';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import ProgressRing from '@/components/ProgressRing';
import { TOTAL_PARKS } from '@/data/parks';

export default function StatsScreen() {
  const { stats } = useApp();
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>My Stats</Text>
        <View style={{ width: 60 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Summary callout */}
        <View style={styles.summaryCard}>
          <Text style={styles.mascot}>🐻</Text>
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
          {[
            { label: 'Total Trips', value: stats.totalTrips, icon: '🗺️' },
            { label: 'Miles Hiked', value: stats.totalMilesHiked, icon: '🥾' },
            { label: 'States Visited', value: stats.statesVisited, icon: '📍' },
            { label: 'Photos Saved', value: stats.totalPhotos, icon: '📷' },
            { label: 'Bucket List', value: stats.bucketListCount, icon: '⭐' },
            { label: 'Remaining', value: stats.totalRemaining, icon: '🌲' },
          ].map(({ label, value, icon }) => (
            <View key={label} style={styles.statCard}>
              <Text style={styles.statIcon}>{icon}</Text>
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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.xl, paddingVertical: spacing.md },
  back: { ...typography.labelSemiBold, color: colors.primary, fontSize: 18 },
  title: { ...typography.h4, color: colors.textPrimary },
  scroll: { paddingHorizontal: spacing.xl, paddingBottom: spacing['5xl'], gap: spacing.xl },
  summaryCard: { backgroundColor: colors.surface, borderRadius: radius.xl, padding: spacing.xl, flexDirection: 'row', alignItems: 'center', gap: spacing.md, ...shadows.sm, marginTop: spacing.md },
  mascot: { fontSize: 36 },
  summaryText: { ...typography.body, color: colors.textPrimary, flex: 1, lineHeight: 22 },
  ringCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.xl, backgroundColor: colors.surface, borderRadius: radius.xl, padding: spacing.xl, ...shadows.sm },
  ringCount: { ...typography.h3, color: colors.textPrimary },
  ringLabel: { ...typography.body, color: colors.textSecondary },
  ringPct: { ...typography.labelBold, color: colors.sage },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  statCard: { width: '30%', flex: 1, minWidth: '30%', backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, alignItems: 'center', gap: spacing.xs, ...shadows.sm },
  statIcon: { fontSize: 24 },
  statValue: { ...typography.h4, color: colors.textPrimary },
  statLabel: { ...typography.caption, color: colors.textSecondary, textAlign: 'center' },
});
