import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParksStackParamList } from '@/navigation/types';
import { useApp } from '@/context/AppContext';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import { ALL_ANIMALS } from '@/data/animals';
import { Animal, AnimalRarity } from '@/types';
import ScreenHeader from '@/components/ScreenHeader';

type Props = NativeStackScreenProps<ParksStackParamList, 'ParkAnimals'>;

const RARITY_COLOR: Record<AnimalRarity, string> = {
  Common: colors.sage,
  Uncommon: colors.orange,
  Rare: colors.rose,
};

const RARITY_FILTERS: ('All' | AnimalRarity)[] = ['All', 'Common', 'Uncommon', 'Rare'];
const RARITY_RANK: Record<AnimalRarity, number> = { Common: 0, Uncommon: 1, Rare: 2 };

function CheckBadge() {
  return (
    <View style={styles.checkBadge}>
      <Svg width={10} height={10} viewBox="0 0 12 12">
        <Polyline points="2,6 5,9 10,3" fill="none" stroke={colors.textInverse} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    </View>
  );
}

function AnimalListCard({ animal, spotted }: { animal: Animal; spotted: boolean }) {
  return (
    <View style={styles.itemCard}>
      <View style={styles.itemTitleRow}>
        <Text style={styles.itemName}>{animal.name}</Text>
        {spotted && <CheckBadge />}
      </View>
      <Text style={styles.itemDescription}>{animal.description}</Text>
      <View style={styles.itemMetaRow}>
        <View style={[styles.pill, { backgroundColor: RARITY_COLOR[animal.rarity] }]}>
          <Text style={styles.pillText}>{animal.rarity}</Text>
        </View>
      </View>
    </View>
  );
}

export default function ParkAnimalsScreen({ route, navigation }: Props) {
  const { parkId } = route.params;
  const { parks, isAnimalSpotted } = useApp();
  const [search, setSearch] = useState('');
  const [rarityFilter, setRarityFilter] = useState<'All' | AnimalRarity>('All');

  const park = parks.find((p) => p.id === parkId);
  const allAnimals = ALL_ANIMALS.filter((a) => a.parkId === parkId);
  const spottedCount = allAnimals.filter((a) => isAnimalSpotted(a.id)).length;

  const animals = allAnimals
    .filter((a) => {
      const matchesSearch = a.name.toLowerCase().includes(search.trim().toLowerCase());
      const matchesRarity = rarityFilter === 'All' || a.rarity === rarityFilter;
      return matchesSearch && matchesRarity;
    })
    .sort((a, b) => RARITY_RANK[a.rarity] - RARITY_RANK[b.rarity]);

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title={park ? `${park.name} Animals` : 'Animal Compendium'} onBack={() => navigation.goBack()} />
      <View style={styles.searchWrap}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search animals..."
          placeholderTextColor={colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <View style={styles.filterRow}>
        {RARITY_FILTERS.map((r) => {
          const active = rarityFilter === r;
          return (
            <TouchableOpacity
              key={r}
              style={[styles.filterChip, active && styles.filterChipActive]}
              onPress={() => setRarityFilter(r)}
              activeOpacity={0.8}
            >
              <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>{r}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Text style={styles.progressText}>{spottedCount} of {allAnimals.length} spotted</Text>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {animals.map((animal) => (
          <AnimalListCard key={animal.id} animal={animal} spotted={isAnimalSpotted(animal.id)} />
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
  pill: { paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: radius.full },
  pillText: { ...typography.labelSmall, fontSize: 10, color: colors.textInverse },
  checkBadge: { width: 18, height: 18, borderRadius: 9, backgroundColor: colors.primary, borderWidth: 2, borderColor: colors.background, alignItems: 'center', justifyContent: 'center' },
});
