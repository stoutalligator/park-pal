import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '@/context/AppContext';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import ProgressRing from '@/components/ProgressRing';
import TripCard from '@/components/TripCard';
import { TOTAL_PARKS } from '@/data/parks';

export default function HomeScreen() {
  const { stats, trips, badges, parks } = useApp();
  const navigation = useNavigation<any>();

  const recentTrips = trips.slice(0, 3);
  const earnedBadges = badges.filter((b) => b.earned).slice(0, 4);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.heroSky} />
          <View style={styles.heroContent}>
            <View style={styles.mascotBubble}>
              <Text style={styles.mascotEmoji}>🐻</Text>
            </View>
            <View style={styles.heroText}>
              <Text style={styles.greeting}>Hey, Explorer!</Text>
              <Text style={styles.heroSubtitle}>Keep exploring. The outdoors is calling.</Text>
            </View>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{stats.totalVisited}</Text>
            <Text style={styles.statLabel}>Visited</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{stats.totalRemaining}</Text>
            <Text style={styles.statLabel}>To Go</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{stats.bucketListCount}</Text>
            <Text style={styles.statLabel}>Bucket List</Text>
          </View>
        </View>

        {/* Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressLeft}>
            <Text style={styles.progressCount}>{stats.totalVisited} / {TOTAL_PARKS}</Text>
            <Text style={styles.progressLabel}>National Parks Visited</Text>
          </View>
          <ProgressRing percentage={stats.completionPercentage} size={72} />
        </View>

        {/* Recent Trips */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Trips</Text>
            <TouchableOpacity onPress={() => navigation.navigate('TripsTab')}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          {recentTrips.length === 0 ? (
            <View style={styles.emptyTrips}>
              <Text style={styles.emptyText}>No adventures logged yet. Ready to explore?</Text>
            </View>
          ) : (
            recentTrips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onPress={() => navigation.navigate('TripsTab', { screen: 'TripDetail', params: { tripId: trip.id } })}
              />
            ))
          )}
        </View>

        {/* Collection Preview */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Collection</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ProfileTab', { screen: 'Collection' })}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.badgeRow}>
            {earnedBadges.map((b) => (
              <View key={b.id} style={styles.badgeBubble}>
                <Text style={styles.badgeIcon}>{b.icon}</Text>
              </View>
            ))}
            {earnedBadges.length === 0 ? (
              <Text style={styles.emptyText}>Earn your first badge by logging a trip!</Text>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingBottom: spacing['5xl'] },

  hero: { backgroundColor: colors.primary, borderBottomLeftRadius: 28, borderBottomRightRadius: 28, overflow: 'hidden', marginBottom: spacing.xl },
  heroSky: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.15, backgroundColor: colors.sky },
  heroContent: { flexDirection: 'row', alignItems: 'center', padding: spacing['2xl'], gap: spacing.lg },
  mascotBubble: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', ...shadows.md },
  mascotEmoji: { fontSize: 36 },
  heroText: { flex: 1, gap: 4 },
  greeting: { ...typography.h3, color: colors.textInverse },
  heroSubtitle: { ...typography.bodySmall, color: 'rgba(255,255,255,0.8)', lineHeight: 18 },

  statsRow: { flexDirection: 'row', gap: spacing.md, paddingHorizontal: spacing.xl, marginBottom: spacing.md },
  statCard: { flex: 1, backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, alignItems: 'center', ...shadows.sm },
  statNum: { ...typography.h3, color: colors.textPrimary },
  statLabel: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },

  progressCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.xl, marginHorizontal: spacing.xl, marginBottom: spacing.xl, ...shadows.sm },
  progressLeft: { gap: spacing.xs },
  progressCount: { ...typography.h3, color: colors.textPrimary },
  progressLabel: { ...typography.bodySmall, color: colors.textSecondary },

  section: { paddingHorizontal: spacing.xl, marginBottom: spacing.xl },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  sectionTitle: { ...typography.h5, color: colors.textPrimary },
  viewAll: { ...typography.labelSmall, color: colors.sage },

  emptyTrips: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.xl, alignItems: 'center' },
  emptyText: { ...typography.bodySmall, color: colors.textMuted, textAlign: 'center' },

  badgeRow: { flexDirection: 'row', gap: spacing.md, flexWrap: 'wrap' },
  badgeBubble: { width: 56, height: 56, borderRadius: 28, backgroundColor: colors.surfaceWarm, alignItems: 'center', justifyContent: 'center', ...shadows.sm },
  badgeIcon: { fontSize: 26 },
});
