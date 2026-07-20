import React, { useMemo, useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Svg, { Line, Circle } from 'react-native-svg';
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

function MenuIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20">
      <Line x1={2} y1={5} x2={18} y2={5} stroke={colors.textPrimary} strokeWidth={2} strokeLinecap="round" />
      <Line x1={2} y1={10} x2={18} y2={10} stroke={colors.textPrimary} strokeWidth={2} strokeLinecap="round" />
      <Line x1={2} y1={15} x2={18} y2={15} stroke={colors.textPrimary} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

function FilterIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20">
      <Line x1={2} y1={5} x2={18} y2={5} stroke={colors.textPrimary} strokeWidth={2} strokeLinecap="round" />
      <Circle cx={13} cy={5} r={2.5} fill={colors.background} stroke={colors.textPrimary} strokeWidth={1.5} />
      <Line x1={2} y1={10} x2={18} y2={10} stroke={colors.textPrimary} strokeWidth={2} strokeLinecap="round" />
      <Circle cx={7} cy={10} r={2.5} fill={colors.background} stroke={colors.textPrimary} strokeWidth={1.5} />
      <Line x1={2} y1={15} x2={18} y2={15} stroke={colors.textPrimary} strokeWidth={2} strokeLinecap="round" />
      <Circle cx={14} cy={15} r={2.5} fill={colors.background} stroke={colors.textPrimary} strokeWidth={1.5} />
    </Svg>
  );
}

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
        <TouchableOpacity hitSlop={12}>
          <MenuIcon />
        </TouchableOpacity>
        <Text style={styles.title}>Explore</Text>
        <TouchableOpacity hitSlop={12}>
          <FilterIcon />
        </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
