import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParksStackParamList } from '@/navigation/types';
import { useApp } from '@/context/AppContext';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import { AnimalRarity } from '@/types';
import ScreenHeader from '@/components/ScreenHeader';
import VerifiedNote from '@/components/VerifiedNote';
import ReportSheet, { ReportFlagButton } from '@/components/ReportSheet';

type Props = NativeStackScreenProps<ParksStackParamList, 'AnimalDetail'>;

const RARITY_COLOR: Record<AnimalRarity, string> = {
  Common: colors.sage,
  Uncommon: colors.orange,
  Rare: colors.rose,
};

const RARITY_HERO: Record<AnimalRarity, ReturnType<typeof require>> = {
  Common: require('@/assets/animals/rarity-common.png'),
  Uncommon: require('@/assets/animals/rarity-uncommon.png'),
  Rare: require('@/assets/animals/rarity-rare.png'),
};

const MASCOT_TIP = require('@/assets/mascot/mascot-tip.png');
const MASCOT_THINKING = require('@/assets/mascot/mascot-thinking.png');

function SpottedBadge({ spotted }: { spotted: boolean }) {
  return (
    <View style={[styles.checkBadge, spotted && styles.checkBadgeCompleted]}>
      {spotted && (
        <Svg width={14} height={14} viewBox="0 0 12 12">
          <Polyline points="2,6 5,9 10,3" fill="none" stroke={colors.textInverse} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      )}
    </View>
  );
}

export default function AnimalDetailScreen({ route, navigation }: Props) {
  const { animalId } = route.params;
  const { parks, animals, animalDetails, isAnimalSpotted } = useApp();
  const [reportVisible, setReportVisible] = useState(false);

  const animal = animals.find((a) => a.id === animalId);
  const detail = animalDetails[animalId];
  const park = animal ? parks.find((p) => p.id === animal.parkId) : undefined;

  if (!animal) {
    return (
      <SafeAreaView style={styles.container}>
        <ScreenHeader title="Animal" onBack={() => navigation.goBack()} />
        <Text style={styles.notFound}>Animal not found.</Text>
      </SafeAreaView>
    );
  }

  const spotted = isAnimalSpotted(animal.id);

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title={animal.name}
        onBack={() => navigation.goBack()}
        right={<ReportFlagButton onPress={() => setReportVisible(true)} />}
      />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Image source={RARITY_HERO[animal.rarity]} style={styles.heroImage} resizeMode="cover" />
        </View>

        <View style={styles.titleRow}>
          <View style={styles.titleTextWrap}>
            <Text style={styles.parkName}>{park?.name ?? 'National Park'}</Text>
            <Text style={styles.animalName}>{animal.name}</Text>
            {detail ? <Text style={styles.scientificName}>{detail.scientificName}</Text> : null}
          </View>
          <SpottedBadge spotted={spotted} />
        </View>

        {detail && (
          <View style={styles.statRow}>
            <View style={styles.statChip}>
              <Text style={styles.statValue} numberOfLines={1}>{detail.bestTimeOfDay}</Text>
              <Text style={styles.statKey}>Best time</Text>
            </View>
            <View style={styles.statChip}>
              <Text style={styles.statValue} numberOfLines={1}>{detail.bestSeason}</Text>
              <Text style={styles.statKey}>Best season</Text>
            </View>
          </View>
        )}

        {detail && (
          <View style={styles.whereRow}>
            <Text style={styles.whereLabel}>WHERE TO LOOK</Text>
            <Text style={styles.whereText}>{detail.whereToLook}</Text>
          </View>
        )}

        <View style={styles.tagRow}>
          <View style={[styles.rarityTag, { backgroundColor: RARITY_COLOR[animal.rarity] }]}>
            <Text style={styles.rarityTagText}>{animal.rarity}</Text>
          </View>
          {detail?.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.description}>{animal.description}</Text>

        {detail && (
          <>
            <View style={[styles.callout, styles.calloutTip]}>
              <Image source={MASCOT_TIP} style={styles.calloutMascot} resizeMode="contain" />
              <View style={styles.calloutTextWrap}>
                <Text style={styles.calloutLabelTip}>VIEWING TIP</Text>
                <Text style={styles.calloutTextTip}>{detail.viewingTip}</Text>
              </View>
            </View>
            <View style={[styles.callout, styles.calloutFact]}>
              <Image source={MASCOT_THINKING} style={styles.calloutMascot} resizeMode="contain" />
              <View style={styles.calloutTextWrap}>
                <Text style={styles.calloutLabelFact}>DID YOU KNOW</Text>
                <Text style={styles.calloutTextFact}>{detail.didYouKnow}</Text>
              </View>
            </View>
            <VerifiedNote lastVerified={detail.lastVerified} tags={detail.tags} />
          </>
        )}
      </ScrollView>
      <ReportSheet
        visible={reportVisible}
        onClose={() => setReportVisible(false)}
        entryType="animal"
        entryId={animal.id}
        entryName={animal.name}
        parkId={animal.parkId}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: spacing.xl, paddingBottom: spacing['5xl'], gap: spacing.md },
  notFound: { ...typography.body, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xl },

  hero: { height: 150, borderRadius: radius.lg, overflow: 'hidden', ...shadows.sm },
  heroImage: { width: '100%', height: '100%' },

  titleRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm },
  titleTextWrap: { flex: 1 },
  parkName: { ...typography.labelSmall, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 },
  animalName: { ...typography.h3, color: colors.textPrimary },
  scientificName: { ...typography.bodySmall, color: colors.textSecondary, fontStyle: 'italic' },

  statRow: { flexDirection: 'row', gap: spacing.sm },
  statChip: { flex: 1, backgroundColor: colors.surfaceWarm, borderRadius: radius.md, paddingVertical: spacing.sm, paddingHorizontal: spacing.xs, alignItems: 'center', gap: 2 },
  statValue: { ...typography.labelBold, color: colors.primary, fontSize: 13 },
  statKey: { ...typography.caption, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.3, fontSize: 9 },

  whereRow: { backgroundColor: colors.surfaceWarm, borderRadius: radius.md, padding: spacing.md, gap: 4 },
  whereLabel: { ...typography.labelSmall, color: colors.textMuted, fontSize: 10, letterSpacing: 0.4 },
  whereText: { ...typography.bodySmall, color: colors.textPrimary },

  tagRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: spacing.xs },
  rarityTag: { paddingHorizontal: spacing.sm, paddingVertical: 4, borderRadius: radius.full },
  rarityTagText: { ...typography.labelSmall, color: colors.textInverse, fontSize: 10 },
  tag: { paddingHorizontal: spacing.sm, paddingVertical: 4, borderRadius: radius.full, backgroundColor: colors.cream },
  tagText: { ...typography.labelSmall, color: colors.brownDark, fontSize: 10 },

  description: { ...typography.body, color: colors.textSecondary, lineHeight: 21 },

  callout: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm, borderRadius: radius.md, padding: spacing.md, ...shadows.sm },
  calloutMascot: { width: 40, height: 46, marginTop: -4 },
  calloutTextWrap: { flex: 1, gap: 4 },
  calloutTip: { backgroundColor: colors.cream },
  calloutFact: { backgroundColor: colors.surfaceWarm },
  calloutLabelTip: { ...typography.labelSmall, color: colors.orange, fontSize: 10, letterSpacing: 0.4 },
  calloutLabelFact: { ...typography.labelSmall, color: colors.sage, fontSize: 10, letterSpacing: 0.4 },
  calloutTextTip: { ...typography.bodySmall, color: colors.brownDark, lineHeight: 19 },
  calloutTextFact: { ...typography.bodySmall, color: colors.textPrimary, lineHeight: 19 },

  checkBadge: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.surfaceWarm, borderWidth: 2, borderColor: colors.border, alignItems: 'center', justifyContent: 'center', marginTop: spacing.xs },
  checkBadgeCompleted: { backgroundColor: colors.primary, borderColor: colors.primary },
});
