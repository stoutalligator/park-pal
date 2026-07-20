import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '@/context/AppContext';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import { ParkRegion } from '@/types';
import { getParkImage } from '@/data/parkImages';
import ProgressRing from '@/components/ProgressRing';
import ScreenHeader from '@/components/ScreenHeader';
import { TOTAL_PARKS } from '@/data/parks';

const REGIONS: ParkRegion[] = ['Northeast', 'Southeast', 'Midwest', 'SouthCentral', 'Mountain', 'Pacific', 'Alaska', 'Hawaii'];

function LockIcon() {
  return (
    <Svg width={14} height={14} viewBox="0 0 16 16">
      <Rect x={3} y={7} width={10} height={7} rx={1.5} fill={colors.textMuted} />
      <Path d="M5 7V5a3 3 0 0 1 6 0v2" fill="none" stroke={colors.textMuted} strokeWidth={1.6} strokeLinecap="round" />
    </Svg>
  );
}

export default function PassportScreen() {
  const { parks, stats } = useApp();
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="My Passport" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Passport cover */}
        <View style={styles.cover}>
          <Image source={require('@/assets/mascot/mascot-ranger-full.png')} style={styles.coverMascot} resizeMode="contain" />
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
                {regionParks.map((park) => {
                  const visited = park.status === 'visited';
                  return (
                    <View key={park.id} style={[styles.stamp, !visited && styles.stampLocked]}>
                      <View style={styles.stampImageWrap}>
                        <Image
                          source={getParkImage(park.id)}
                          style={[styles.stampImage, !visited && styles.stampImageLocked]}
                          resizeMode="cover"
                        />
                        {!visited && (
                          <View style={styles.stampLockBadge}>
                            <LockIcon />
                          </View>
                        )}
                      </View>
                      <Text style={styles.stampName} numberOfLines={2}>{park.name}</Text>
                      {park.visitedDates?.[0] ? (
                        <Text style={styles.stampDate}>{new Date(park.visitedDates[0]).getFullYear()}</Text>
                      ) : null}
                    </View>
                  );
                })}
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

  scroll: { paddingBottom: spacing['5xl'] },

  cover: { margin: spacing.xl, backgroundColor: colors.primary, borderRadius: radius.xl, padding: spacing['2xl'], alignItems: 'center', gap: spacing.md },
  coverMascot: { width: 96, height: 108 },
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
  stampLocked: { borderColor: colors.border, backgroundColor: colors.surfaceWarm },
  stampImageWrap: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  stampImage: { width: 40, height: 40, borderRadius: radius.sm },
  stampImageLocked: { opacity: 0.3 },
  stampLockBadge: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  stampName: { ...typography.caption, color: colors.textPrimary, textAlign: 'center', lineHeight: 14 },
  stampDate: { ...typography.caption, color: colors.sage, fontSize: 10 },
});
