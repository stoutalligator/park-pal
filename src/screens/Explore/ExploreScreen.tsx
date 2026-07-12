import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '@/context/AppContext';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import FilterPill from '@/components/FilterPill';
import ParkCard from '@/components/ParkCard';
import ProgressRing from '@/components/ProgressRing';
import { ParkStatus } from '@/types';
import { TOTAL_PARKS } from '@/data/parks';

type Filter = 'All Parks' | 'Visited' | 'Bucket List' | 'Not Visited';

const FILTERS: Filter[] = ['All Parks', 'Visited', 'Bucket List', 'Not Visited'];

const STATUS_MAP: Record<Filter, ParkStatus | null> = {
  'All Parks': null,
  'Visited': 'visited',
  'Bucket List': 'bucketList',
  'Not Visited': 'notVisited',
};

export default function ExploreScreen() {
  const { parks, stats, toggleFavorite } = useApp();
  const navigation = useNavigation<any>();
  const [filter, setFilter] = useState<Filter>('All Parks');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = parks;
    const status = STATUS_MAP[filter];
    if (status) list = list.filter((p) => p.status === status);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.state.toLowerCase().includes(q));
    }
    return list;
  }, [parks, filter, search]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        <TouchableOpacity hitSlop={12}>
          <Text style={styles.filterIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search parks..."
            placeholderTextColor={colors.textMuted}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* Filter pills */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pills}>
        {FILTERS.map((f) => (
          <FilterPill key={f} label={f} active={filter === f} onPress={() => setFilter(f)} />
        ))}
      </ScrollView>

      {/* Map placeholder */}
      <View style={styles.mapCard}>
        <Text style={styles.mapEmoji}>🗺️</Text>
        <Text style={styles.mapLabel}>Interactive Map</Text>
        <Text style={styles.mapSub}>Tap parks on the map to explore</Text>
        {/* Park pin dots scattered */}
        {parks.filter((p) => p.status === 'visited').slice(0, 5).map((p, i) => (
          <View key={p.id} style={[styles.pin, { top: 20 + i * 22, left: 30 + i * 30 }]}>
            <Text style={styles.pinDot}>📍</Text>
          </View>
        ))}
        {/* Mascot peeking */}
        <View style={styles.mapMascot}>
          <Text style={{ fontSize: 28 }}>🐻</Text>
        </View>
      </View>

      {/* Progress card */}
      <View style={styles.progressCard}>
        <View>
          <Text style={styles.progressTitle}>Your Progress</Text>
          <Text style={styles.progressCount}>{stats.totalVisited} / {TOTAL_PARKS}</Text>
          <Text style={styles.progressSub}>National Parks Visited</Text>
        </View>
        <ProgressRing percentage={stats.completionPercentage} size={64} />
      </View>

      {/* Park list */}
      <ScrollView style={styles.list} contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
        {filtered.map((park) => (
          <ParkCard
            key={park.id}
            park={park}
            onPress={() => navigation.navigate('ParkDetail', { parkId: park.id })}
            onFavorite={() => toggleFavorite(park.id)}
          />
        ))}
        {filtered.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🐻</Text>
            <Text style={styles.emptyText}>No parks found. Try a different filter!</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.xl, paddingTop: spacing.lg, paddingBottom: spacing.sm },
  title: { ...typography.h3, color: colors.textPrimary },
  filterIcon: { fontSize: 20 },

  searchRow: { paddingHorizontal: spacing.xl, marginBottom: spacing.sm },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.lg, paddingHorizontal: spacing.md, gap: spacing.sm, ...shadows.sm },
  searchIcon: { fontSize: 16 },
  searchInput: { flex: 1, height: 44, ...typography.body, color: colors.textPrimary },

  pills: { paddingHorizontal: spacing.xl, paddingBottom: spacing.sm },

  mapCard: {
    marginHorizontal: spacing.xl,
    height: 160,
    backgroundColor: '#D4E8C4',
    borderRadius: radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    overflow: 'hidden',
    position: 'relative',
  },
  mapEmoji: { fontSize: 32, opacity: 0.3, position: 'absolute' },
  mapLabel: { ...typography.h5, color: colors.primary },
  mapSub: { ...typography.caption, color: colors.sage },
  pin: { position: 'absolute' },
  pin0: { top: 30, left: 60 },
  pinDot: { fontSize: 18 },
  mapMascot: { position: 'absolute', bottom: 8, right: 16 },

  progressCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, marginHorizontal: spacing.xl, marginBottom: spacing.md, ...shadows.sm },
  progressTitle: { ...typography.labelBold, color: colors.textPrimary, marginBottom: 4 },
  progressCount: { ...typography.h4, color: colors.textPrimary },
  progressSub: { ...typography.caption, color: colors.textSecondary },

  list: { flex: 1 },
  listContent: { paddingHorizontal: spacing.xl, paddingBottom: spacing['5xl'] },
  empty: { alignItems: 'center', paddingTop: spacing['3xl'], gap: spacing.md },
  emptyIcon: { fontSize: 40 },
  emptyText: { ...typography.body, color: colors.textSecondary, textAlign: 'center' },
});
