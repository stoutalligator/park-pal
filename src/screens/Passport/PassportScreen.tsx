import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '@/context/AppContext';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import { ParkRegion } from '@/types';
import ProgressRing from '@/components/ProgressRing';
import { TOTAL_PARKS } from '@/data/parks';

const REGIONS: ParkRegion[] = ['Northeast', 'Southeast', 'Midwest', 'SouthCentral', 'Mountain', 'Pacific', 'Alaska', 'Hawaii'];

export default function PassportScreen() {
  const { parks, stats } = useApp();
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>My Passport</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Passport cover */}
        <View style={styles.cover}>
          <Text style={styles.coverEmoji}>🐻</Text>
          <Text style={styles.coverTitle}>NATIONAL PARK</Text>
          <Text style={styles.coverSubtitle}>PASSPORT</Text>
          <View style={styles.coverProgress}>
            <ProgressRing percentage={stats.completionPercentage} size={64} />
            <View>
              <Text style={styles.coverCount}>{stats.totalVisited} / {TOTAL_PARKS}</Text>
              <Text style={styles.coverLabel}>Parks Visited</Text>
            </View>
          </View>
        </View>

        {/* Stamps by region */}
        {REGIONS.map((region) => {
          const regionParks = parks.filter((p) => p.region === region);
          if (regionParks.length === 0) return null;
          const visitedCount = regionParks.filter((p) => p.status === 'visited').length;
          return (
            <View key={region} style={styles.regionSection}>
              <View style={styles.regionHeader}>
                <Text style={styles.regionTitle}>{region}</Text>
                <Text style={styles.regionCount}>{visitedCount}/{regionParks.length}</Text>
              </View>
              <View style={styles.stampGrid}>
                {regionParks.map((park) => (
                  <View key={park.id} style={[styles.stamp, park.status !== 'visited' && styles.stampLocked]}>
                    <Text style={styles.stampEmoji}>{park.status === 'visited' ? '🏔️' : '❓'}</Text>
                    <Text style={styles.stampName} numberOfLines={2}>{park.name}</Text>
                    {park.visitedDates?.[0] ? (
                      <Text style={styles.stampDate}>{new Date(park.visitedDates[0]).getFullYear()}</Text>
                    ) : null}
                  </View>
                ))}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.xl, paddingVertical: spacing.md },
  back: { ...typography.labelSemiBold, color: colors.primary, fontSize: 18 },
  title: { ...typography.h4, color: colors.textPrimary },

  scroll: { paddingBottom: spacing['5xl'] },

  cover: { margin: spacing.xl, backgroundColor: colors.primary, borderRadius: radius.xl, padding: spacing['2xl'], alignItems: 'center', gap: spacing.md },
  coverEmoji: { fontSize: 48 },
  coverTitle: { ...typography.labelSmall, color: 'rgba(255,255,255,0.8)', letterSpacing: 3 },
  coverSubtitle: { ...typography.h3, color: colors.textInverse },
  coverProgress: { flexDirection: 'row', alignItems: 'center', gap: spacing.xl, marginTop: spacing.sm },
  coverCount: { ...typography.h4, color: colors.textInverse },
  coverLabel: { ...typography.caption, color: 'rgba(255,255,255,0.7)' },

  regionSection: { paddingHorizontal: spacing.xl, marginBottom: spacing.xl },
  regionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.md },
  regionTitle: { ...typography.h5, color: colors.textPrimary },
  regionCount: { ...typography.labelSmall, color: colors.textSecondary },

  stampGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  stamp: { width: '30%', backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, alignItems: 'center', gap: 4, borderWidth: 2, borderColor: colors.primary, ...shadows.sm },
  stampLocked: { borderColor: colors.border, backgroundColor: colors.surfaceWarm, opacity: 0.6 },
  stampEmoji: { fontSize: 22 },
  stampName: { ...typography.caption, color: colors.textPrimary, textAlign: 'center', lineHeight: 14 },
  stampDate: { ...typography.caption, color: colors.sage, fontSize: 10 },
});
