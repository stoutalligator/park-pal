import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '@/context/AppContext';
import { colors, spacing, radius, shadows, typography } from '@/theme';

export default function CollectionScreen() {
  const { badges } = useApp();
  const navigation = useNavigation<any>();

  const earned = badges.filter((b) => b.earned);
  const locked = badges.filter((b) => !b.earned);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Collection</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionLabel}>Earned — {earned.length} badges</Text>
        <View style={styles.grid}>
          {earned.map((b) => (
            <View key={b.id} style={styles.badge}>
              <Text style={styles.badgeIcon}>{b.icon}</Text>
              <Text style={styles.badgeName}>{b.name}</Text>
              <Text style={styles.badgeDesc} numberOfLines={2}>{b.description}</Text>
            </View>
          ))}
        </View>

        <Text style={[styles.sectionLabel, styles.lockedLabel]}>Locked — {locked.length} remaining</Text>
        <View style={styles.grid}>
          {locked.map((b) => (
            <View key={b.id} style={[styles.badge, styles.badgeLocked]}>
              <Text style={[styles.badgeIcon, styles.lockedIcon]}>🔒</Text>
              <Text style={[styles.badgeName, styles.lockedText]}>{b.name}</Text>
              {b.progress !== undefined && b.goal ? (
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${(b.progress / b.goal) * 100}%` as any }]} />
                </View>
              ) : null}
              <Text style={styles.progressText}>{b.progress ?? 0}/{b.goal ?? '?'}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.xl, paddingVertical: spacing.md },
  back: { ...typography.labelSemiBold, color: colors.primary, fontSize: 18 },
  title: { ...typography.h4, color: colors.textPrimary },

  scroll: { paddingHorizontal: spacing.xl, paddingBottom: spacing['5xl'] },
  sectionLabel: { ...typography.h5, color: colors.textPrimary, marginTop: spacing.xl, marginBottom: spacing.md },
  lockedLabel: { color: colors.textSecondary },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  badge: { width: '30%', backgroundColor: colors.surface, borderRadius: radius.xl, padding: spacing.md, alignItems: 'center', gap: spacing.xs, ...shadows.sm },
  badgeLocked: { backgroundColor: colors.surfaceWarm, opacity: 0.7 },
  badgeIcon: { fontSize: 30 },
  lockedIcon: { opacity: 0.4 },
  badgeName: { ...typography.labelSmall, color: colors.textPrimary, textAlign: 'center' },
  lockedText: { color: colors.textMuted },
  badgeDesc: { ...typography.caption, color: colors.textSecondary, textAlign: 'center', lineHeight: 13 },
  progressBar: { width: '100%', height: 4, backgroundColor: colors.border, borderRadius: 2, overflow: 'hidden', marginTop: 2 },
  progressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 2 },
  progressText: { ...typography.caption, color: colors.textMuted, fontSize: 10 },
});
