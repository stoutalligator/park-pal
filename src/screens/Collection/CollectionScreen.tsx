import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '@/context/AppContext';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import { getBadgeImage } from '@/data/badgeImages';
import ScreenHeader from '@/components/ScreenHeader';

function LockIcon({ size = 16 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Rect x={3} y={7} width={10} height={7} rx={1.5} fill={colors.textMuted} />
      <Path d="M5 7V5a3 3 0 0 1 6 0v2" fill="none" stroke={colors.textMuted} strokeWidth={1.6} strokeLinecap="round" />
    </Svg>
  );
}

export default function CollectionScreen() {
  const { badges } = useApp();
  const navigation = useNavigation<any>();

  const earnedBadges = badges.filter((b) => b.earned);
  const lockedBadges = badges.filter((b) => !b.earned);

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Badge Collection" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryCount}>{earnedBadges.length} / {badges.length}</Text>
          <Text style={styles.summaryLabel}>Badges Earned</Text>
          <View style={styles.summaryBar}>
            <View style={[styles.summaryBarFill, { width: `${(earnedBadges.length / badges.length) * 100}%` }]} />
          </View>
        </View>

        {earnedBadges.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>Earned</Text>
            <View style={styles.grid}>
              {earnedBadges.map((b) => (
                <View key={b.id} style={styles.badge}>
                  <Image source={getBadgeImage(b.id)} style={styles.badgeImage} resizeMode="contain" />
                  <Text style={styles.badgeName}>{b.name}</Text>
                  <Text style={styles.badgeDesc}>{b.description}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        <Text style={styles.sectionLabel}>{lockedBadges.length} Locked</Text>
        <View style={styles.lockedList}>
          {lockedBadges.map((b) => {
            const progress = b.progress ?? 0;
            const goal = b.goal ?? 1;
            const isHiddenSecret = b.secret && !b.earned;
            return (
              <View key={b.id} style={styles.lockedRow}>
                <View style={styles.lockedIconBubble}>
                  {isHiddenSecret ? (
                    <LockIcon size={30} />
                  ) : (
                    <>
                      <Image source={getBadgeImage(b.id)} style={styles.lockedIconImage} resizeMode="contain" />
                      <View style={styles.lockBadge}>
                        <LockIcon size={18} />
                      </View>
                    </>
                  )}
                </View>
                <View style={styles.lockedInfo}>
                  <Text style={styles.lockedName}>{isHiddenSecret ? '???' : b.name}</Text>
                  <Text style={styles.lockedDesc}>
                    {isHiddenSecret ? 'A secret badge. Keep exploring to discover it.' : b.description}
                  </Text>
                  {!isHiddenSecret && (
                    <View style={styles.barRow}>
                      <View style={styles.bar}>
                        <View style={[styles.barFill, { width: `${Math.min((progress / goal) * 100, 100)}%` }]} />
                      </View>
                      <Text style={styles.barLabel}>{progress}/{goal}</Text>
                    </View>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  scroll: { paddingHorizontal: spacing.xl, paddingBottom: spacing['5xl'] },

  summaryCard: { backgroundColor: colors.primary, borderRadius: radius.xl, padding: spacing.xl, alignItems: 'center', gap: spacing.xs, marginBottom: spacing.md },
  summaryCount: { ...typography.h2, color: colors.textInverse },
  summaryLabel: { ...typography.labelSemiBold, color: 'rgba(255,255,255,0.85)' },
  summaryBar: { width: '100%', height: 6, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 3, overflow: 'hidden', marginTop: spacing.sm },
  summaryBarFill: { height: '100%', backgroundColor: colors.textInverse, borderRadius: 3 },

  sectionLabel: { ...typography.h5, color: colors.textPrimary, marginTop: spacing.xl, marginBottom: spacing.md },
  lockedLabel: { color: colors.textSecondary },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  badge: { width: '47%', backgroundColor: colors.surface, borderRadius: radius.xl, padding: spacing.md, alignItems: 'center', gap: spacing.xs, ...shadows.sm },
  badgeImage: { width: 132, height: 150 },
  badgeName: { ...typography.labelBold, color: colors.textPrimary, textAlign: 'center' },
  badgeDesc: { ...typography.bodySmall, color: colors.textSecondary, textAlign: 'center', lineHeight: 16 },

  lockedList: { gap: spacing.md },
  lockedRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.surfaceWarm, borderRadius: radius.lg, padding: spacing.lg },
  lockedIconBubble: { width: 72, height: 72, borderRadius: 36, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', position: 'relative', ...shadows.sm },
  lockedIconImage: { width: 56, height: 64, opacity: 0.35 },
  lockBadge: {
    position: 'absolute',
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  lockedInfo: { flex: 1, gap: 3 },
  lockedName: { ...typography.labelBold, color: colors.textPrimary },
  lockedDesc: { ...typography.bodySmall, color: colors.textSecondary },
  barRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: 4 },
  bar: { flex: 1, height: 5, backgroundColor: colors.border, borderRadius: 3, overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 3 },
  barLabel: { ...typography.caption, color: colors.textMuted },
});
