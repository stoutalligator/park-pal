import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '@/context/AppContext';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import { getBadgeImage } from '@/data/badgeImages';
import ScreenHeader from '@/components/ScreenHeader';

function LockIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16">
      <Rect x={3} y={7} width={10} height={7} rx={1.5} fill={colors.textMuted} />
      <Path d="M5 7V5a3 3 0 0 1 6 0v2" fill="none" stroke={colors.textMuted} strokeWidth={1.6} strokeLinecap="round" />
    </Svg>
  );
}

export default function CollectionScreen() {
  const { badges } = useApp();
  const navigation = useNavigation<any>();

  const earned = badges.filter((b) => b.earned);
  const locked = badges.filter((b) => !b.earned);
  const pct = badges.length > 0 ? Math.round((earned.length / badges.length) * 100) : 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Badge Collection" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryCount}>{earned.length} / {badges.length}</Text>
          <Text style={styles.summaryLabel}>Badges Earned</Text>
          <View style={styles.summaryBar}>
            <View style={[styles.summaryBarFill, { width: `${pct}%` as any }]} />
          </View>
        </View>

        {/* Earned grid */}
        <Text style={styles.sectionLabel}>Earned — {earned.length} badges</Text>
        <View style={styles.grid}>
          {earned.map((b) => (
            <View key={b.id} style={styles.badge}>
              <Image source={getBadgeImage(b.id)} style={styles.badgeImage} resizeMode="contain" />
              <Text style={styles.badgeName}>{b.name}</Text>
              <Text style={styles.badgeDesc} numberOfLines={2}>{b.description}</Text>
            </View>
          ))}
        </View>

        {/* Locked list with progress */}
        <Text style={[styles.sectionLabel, styles.lockedLabel]}>In Progress — {locked.length} remaining</Text>
        <View style={styles.lockedList}>
          {locked.map((b) => (
            <View key={b.id} style={styles.lockedRow}>
              <View style={styles.lockedIconBubble}>
                <Image source={getBadgeImage(b.id)} style={styles.lockedIconImage} resizeMode="contain" />
                <View style={styles.lockBadge}>
                  <LockIcon />
                </View>
              </View>
              <View style={styles.lockedInfo}>
                <Text style={styles.lockedName}>{b.name}</Text>
                <Text style={styles.lockedDesc}>{b.description}</Text>
                {b.progress !== undefined && b.goal ? (
                  <View style={styles.barRow}>
                    <View style={styles.bar}>
                      <View style={[styles.barFill, { width: `${(b.progress / b.goal) * 100}%` as any }]} />
                    </View>
                    <Text style={styles.barLabel}>{b.progress}/{b.goal}</Text>
                  </View>
                ) : null}
              </View>
            </View>
          ))}
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
  badge: { width: '30%', backgroundColor: colors.surface, borderRadius: radius.xl, padding: spacing.md, alignItems: 'center', gap: spacing.xs, ...shadows.sm },
  badgeImage: { width: 56, height: 64 },
  badgeName: { ...typography.labelSmall, color: colors.textPrimary, textAlign: 'center' },
  badgeDesc: { ...typography.caption, color: colors.textSecondary, textAlign: 'center', lineHeight: 13 },

  lockedList: { gap: spacing.md },
  lockedRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.surfaceWarm, borderRadius: radius.lg, padding: spacing.lg },
  lockedIconBubble: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', position: 'relative', ...shadows.sm },
  lockedIconImage: { width: 36, height: 42, opacity: 0.35 },
  lockBadge: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
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
