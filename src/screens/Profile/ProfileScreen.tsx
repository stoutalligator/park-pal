import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '@/context/AppContext';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import TripCard from '@/components/TripCard';

export default function ProfileScreen() {
  const { stats, trips, badges, userProfile } = useApp();
  const navigation = useNavigation<any>();

  const recentTrips = trips.slice(0, 3);
  const earnedBadges = badges.filter((b) => b.earned);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Profile hero - matches reference image */}
        <View style={styles.hero}>
          <View style={styles.heroSky} />
          <View style={styles.heroBg} />
          <View style={styles.heroContent}>
            <View style={styles.avatarRing}>
              <Text style={styles.avatarEmoji}>🐻</Text>
            </View>
            <Text style={styles.greeting}>Hey, {userProfile.name}!</Text>
            <Text style={styles.tagline}>Keep exploring. The outdoors is calling.</Text>
          </View>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{stats.totalVisited}</Text>
            <Text style={styles.statLabel}>Visited</Text>
          </View>
          <View style={[styles.statCard, styles.statCardMid]}>
            <Text style={styles.statNum}>{stats.totalRemaining}</Text>
            <Text style={styles.statLabel}>To Go</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{stats.bucketListCount}</Text>
            <Text style={styles.statLabel}>Bucket List</Text>
          </View>
        </View>

        {/* Recent Trips */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Trips</Text>
            <TouchableOpacity onPress={() => navigation.navigate('TripsTab')}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          {recentTrips.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              onPress={() => navigation.navigate('TripsTab', { screen: 'TripDetail', params: { tripId: trip.id } })}
            />
          ))}
        </View>

        {/* Collection preview */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Collection</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Collection')}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.badgeRow}>
            {earnedBadges.slice(0, 5).map((b) => (
              <View key={b.id} style={styles.badgeBubble}>
                <Text style={styles.badgeIcon}>{b.icon}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Shortcut links */}
        <View style={styles.section}>
          {[
            { label: '📖 Passport', screen: 'Passport' },
            { label: '🏆 Achievements', screen: 'Achievements' },
            { label: '📊 Stats', screen: 'Stats' },
            { label: '⭐ Wishlist', screen: 'Wishlist' },
            { label: '⚙️ Settings', screen: 'Settings' },
          ].map(({ label, screen }) => (
            <TouchableOpacity key={screen} style={styles.linkRow} onPress={() => navigation.navigate(screen as any)}>
              <Text style={styles.linkLabel}>{label}</Text>
              <Text style={styles.linkChevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingBottom: spacing['5xl'] },

  hero: { height: 220, position: 'relative', marginBottom: spacing.md },
  heroSky: { position: 'absolute', top: 0, left: 0, right: 0, height: 140, backgroundColor: colors.sky, opacity: 0.3 },
  heroBg: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, backgroundColor: colors.background, borderTopLeftRadius: 32, borderTopRightRadius: 32 },
  heroContent: { alignItems: 'center', paddingTop: spacing.xl, gap: spacing.sm },
  avatarRing: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.background, borderWidth: 3, borderColor: colors.primary, alignItems: 'center', justifyContent: 'center', ...shadows.md },
  avatarEmoji: { fontSize: 42 },
  greeting: { ...typography.h3, color: colors.textPrimary },
  tagline: { ...typography.bodySmall, color: colors.textSecondary, textAlign: 'center' },

  statsRow: { flexDirection: 'row', marginHorizontal: spacing.xl, backgroundColor: colors.surface, borderRadius: radius.xl, overflow: 'hidden', ...shadows.sm, marginBottom: spacing.xl },
  statCard: { flex: 1, padding: spacing.lg, alignItems: 'center' },
  statCardMid: { borderLeftWidth: 1, borderRightWidth: 1, borderColor: colors.divider },
  statNum: { ...typography.h3, color: colors.textPrimary },
  statLabel: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },

  section: { paddingHorizontal: spacing.xl, marginBottom: spacing.xl, gap: spacing.sm },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { ...typography.h5, color: colors.textPrimary },
  viewAll: { ...typography.labelSmall, color: colors.sage },

  badgeRow: { flexDirection: 'row', gap: spacing.md },
  badgeBubble: { width: 52, height: 52, borderRadius: 26, backgroundColor: colors.surfaceWarm, alignItems: 'center', justifyContent: 'center', ...shadows.sm },
  badgeIcon: { fontSize: 24 },

  linkRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, ...shadows.sm },
  linkLabel: { ...typography.labelSemiBold, color: colors.textPrimary },
  linkChevron: { fontSize: 20, color: colors.textMuted },
});
