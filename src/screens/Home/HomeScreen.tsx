import React, { useMemo, useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '@/context/AppContext';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import ProgressRing from '@/components/ProgressRing';
import UsMap from '@/components/UsMap';
import SegmentedToggle from '@/components/SegmentedToggle';
import { ParkStatus } from '@/types';
import { TOTAL_PARKS } from '@/data/parks';

type Filter = 'All Parks' | 'Visited' | 'Bucket List';

const FILTERS: Filter[] = ['All Parks', 'Visited', 'Bucket List'];

const STATUS_MAP: Record<Filter, ParkStatus | null> = {
  'All Parks': null,
  Visited: 'visited',
  'Bucket List': 'bucketList',
};

export default function HomeScreen() {
  const { parks, stats } = useApp();
  const navigation = useNavigation<any>();
  const [filter, setFilter] = useState<Filter>('All Parks');

  const filteredParks = useMemo(() => {
    const status = STATUS_MAP[filter];
    return status ? parks.filter((p) => p.status === status) : parks;
  }, [parks, filter]);

  const goToPark = (parkId: string) => {
    navigation.navigate('ParkDetail', { parkId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
      </View>

      <View style={styles.toggleRow}>
        <SegmentedToggle options={FILTERS} value={filter} onChange={setFilter} />
      </View>

      <UsMap parks={filteredParks} onPressPark={goToPark} />

      <View style={styles.progressCard}>
        <View style={styles.progressLeft}>
          <Text style={styles.progressTitle}>Your Progress</Text>
          <Text style={styles.progressCount}>
            {stats.totalVisited} / {TOTAL_PARKS}
          </Text>
          <Text style={styles.progressSub}>National Parks Visited</Text>
        </View>
        <ProgressRing percentage={stats.completionPercentage} size={64} />
        <Image
          source={require('@/assets/mascot/mascot-excited.png')}
          style={styles.mascotPeek}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  header: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing['2xl'],
    paddingBottom: spacing.md,
  },
  title: { ...typography.h3, color: colors.textPrimary },

  toggleRow: { paddingHorizontal: spacing.xl, marginBottom: spacing.lg },

  progressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.xl,
    marginHorizontal: spacing.xl,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  progressLeft: { gap: spacing.xs, flex: 1 },
  progressTitle: { ...typography.labelBold, color: colors.textPrimary },
  progressCount: { ...typography.h3, color: colors.textPrimary },
  progressSub: { ...typography.bodySmall, color: colors.textSecondary },
  mascotPeek: {
    position: 'absolute',
    width: 56,
    height: 56,
    right: spacing.md,
    top: -28,
  },
});
