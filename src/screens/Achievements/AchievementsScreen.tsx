import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '@/context/AppContext';
import { colors, spacing, radius, shadows, typography } from '@/theme';

export default function AchievementsScreen() {
  const { badges } = useApp();
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Achievements</Text>
        <View style={{ width: 60 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {badges.map((b) => (
          <View key={b.id} style={[styles.row, !b.earned && styles.rowLocked]}>
            <View style={styles.iconBubble}>
              <Text style={styles.icon}>{b.earned ? b.icon : '🔒'}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>{b.name}</Text>
              <Text style={styles.desc}>{b.description}</Text>
              {!b.earned && b.progress !== undefined && b.goal ? (
                <View style={styles.barRow}>
                  <View style={styles.bar}>
                    <View style={[styles.barFill, { width: `${(b.progress / b.goal) * 100}%` as any }]} />
                  </View>
                  <Text style={styles.barLabel}>{b.progress}/{b.goal}</Text>
                </View>
              ) : null}
            </View>
            {b.earned ? <Text style={styles.check}>✓</Text> : null}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.xl, paddingVertical: spacing.md },
  back: { ...typography.labelSemiBold, color: colors.primary, fontSize: 18 },
  title: { ...typography.h4, color: colors.textPrimary },
  scroll: { paddingHorizontal: spacing.xl, paddingVertical: spacing.md, gap: spacing.md, paddingBottom: spacing['5xl'] },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, ...shadows.sm },
  rowLocked: { opacity: 0.65 },
  iconBubble: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.surfaceWarm, alignItems: 'center', justifyContent: 'center' },
  icon: { fontSize: 24 },
  info: { flex: 1, gap: 3 },
  name: { ...typography.labelBold, color: colors.textPrimary },
  desc: { ...typography.bodySmall, color: colors.textSecondary },
  barRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: 4 },
  bar: { flex: 1, height: 5, backgroundColor: colors.border, borderRadius: 3, overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 3 },
  barLabel: { ...typography.caption, color: colors.textMuted },
  check: { fontSize: 18, color: colors.primary },
});
