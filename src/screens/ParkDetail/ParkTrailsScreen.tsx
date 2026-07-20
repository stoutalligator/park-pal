import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParksStackParamList } from '@/navigation/types';
import { useApp } from '@/context/AppContext';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import { ALL_TRAILS } from '@/data/trails';
import { Trail, TrailDifficulty, Units } from '@/types';
import ScreenHeader from '@/components/ScreenHeader';
import { convertMiles, convertFeet, distanceLabel, elevationLabel } from '@/utils/units';

type Props = NativeStackScreenProps<ParksStackParamList, 'ParkTrails'>;

const DIFFICULTY_COLOR: Record<TrailDifficulty, string> = {
  Easy: colors.sage,
  Moderate: colors.orange,
  Hard: colors.rose,
};

const DIFFICULTY_FILTERS: ('All' | TrailDifficulty)[] = ['All', 'Easy', 'Moderate', 'Hard'];
const DIFFICULTY_RANK: Record<TrailDifficulty, number> = { Easy: 0, Moderate: 1, Hard: 2 };

function CheckBadge() {
  return (
    <View style={styles.checkBadge}>
      <Svg width={10} height={10} viewBox="0 0 12 12">
        <Polyline points="2,6 5,9 10,3" fill="none" stroke={colors.textInverse} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    </View>
  );
}

function TrailListCard({ trail, completed, units }: { trail: Trail; completed: boolean; units: Units }) {
  return (
    <View style={styles.itemCard}>
      <View style={styles.itemTitleRow}>
        <Text style={styles.itemName}>{trail.name}</Text>
        {completed && <CheckBadge />}
      </View>
      <Text style={styles.itemDescription}>{trail.description}</Text>
      <View style={styles.itemMetaRow}>
        <Text style={styles.itemMeta}>{convertMiles(trail.miles, units).toFixed(1)} {distanceLabel(units)}</Text>
        <Text style={styles.itemMeta}>{Math.round(convertFeet(trail.elevationGainFt, units)).toLocaleString()} {elevationLabel(units)} gain</Text>
        <View style={[styles.pill, { backgroundColor: DIFFICULTY_COLOR[trail.difficulty] }]}>
          <Text style={styles.pillText}>{trail.difficulty}</Text>
        </View>
      </View>
    </View>
  );
}

export default function ParkTrailsScreen({ route, navigation }: Props) {
  const { parkId } = route.params;
  const { parks, isTrailCompleted, userProfile } = useApp();
  const units = userProfile.units;
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | TrailDifficulty>('All');

  const park = parks.find((p) => p.id === parkId);
  const allTrails = ALL_TRAILS.filter((t) => t.parkId === parkId);
  const completedCount = allTrails.filter((t) => isTrailCompleted(t.id)).length;

  const trails = allTrails
    .filter((t) => {
      const matchesSearch = t.name.toLowerCase().includes(search.trim().toLowerCase());
      const matchesDifficulty = difficultyFilter === 'All' || t.difficulty === difficultyFilter;
      return matchesSearch && matchesDifficulty;
    })
    .sort((a, b) => DIFFICULTY_RANK[a.difficulty] - DIFFICULTY_RANK[b.difficulty]);

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title={park ? `${park.name} Trails` : 'Trails'} onBack={() => navigation.goBack()} />
      <View style={styles.searchWrap}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search trails..."
          placeholderTextColor={colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <View style={styles.filterRow}>
        {DIFFICULTY_FILTERS.map((d) => {
          const active = difficultyFilter === d;
          return (
            <TouchableOpacity
              key={d}
              style={[styles.filterChip, active && styles.filterChipActive]}
              onPress={() => setDifficultyFilter(d)}
              activeOpacity={0.8}
            >
              <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>{d}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Text style={styles.progressText}>{completedCount} of {allTrails.length} completed</Text>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {trails.map((trail) => (
          <TrailListCard key={trail.id} trail={trail} completed={isTrailCompleted(trail.id)} units={units} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: spacing.xl, paddingBottom: spacing['5xl'] },

  searchWrap: { paddingHorizontal: spacing.xl, marginBottom: spacing.md },
  searchInput: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, ...typography.body, color: colors.textPrimary, ...shadows.sm },

  filterRow: { flexDirection: 'row', gap: spacing.sm, paddingHorizontal: spacing.xl, marginBottom: spacing.md },
  filterChip: { paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: radius.full, backgroundColor: colors.surface, borderWidth: 1.5, borderColor: colors.border },
  filterChipActive: { borderColor: colors.primary, backgroundColor: colors.primary },
  filterChipText: { ...typography.labelSmall, color: colors.textSecondary },
  filterChipTextActive: { color: colors.textInverse },

  progressText: { ...typography.labelSemiBold, color: colors.textSecondary, paddingHorizontal: spacing.xl, marginBottom: spacing.md },

  itemCard: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, marginBottom: spacing.md, gap: 4, ...shadows.sm },
  itemTitleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  itemName: { ...typography.labelBold, color: colors.textPrimary },
  itemDescription: { ...typography.bodySmall, color: colors.textSecondary },
  itemMetaRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginTop: 2 },
  itemMeta: { ...typography.caption, color: colors.textMuted },
  pill: { paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: radius.full },
  pillText: { ...typography.labelSmall, fontSize: 10, color: colors.textInverse },
  checkBadge: { width: 18, height: 18, borderRadius: 9, backgroundColor: colors.primary, borderWidth: 2, borderColor: colors.background, alignItems: 'center', justifyContent: 'center' },
});
