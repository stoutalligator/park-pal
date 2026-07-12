import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing, radius, shadows, typography } from '@/theme';

const SETTINGS_ROWS = [
  { section: 'Account', items: [{ label: '👤 Profile', sub: 'Name, avatar, explorer style' }, { label: '🎯 My Goal', sub: 'Update your park goal' }] },
  { section: 'App', items: [{ label: '📐 Units', sub: 'Miles / Kilometers' }, { label: '🔔 Notifications', sub: 'Reminders & updates' }] },
  { section: 'Data', items: [{ label: '💾 Backup & Sync', sub: 'Coming soon' }, { label: '📤 Export Data', sub: 'Export your trips as CSV' }] },
  { section: 'About', items: [{ label: '🏕️ About Park Pal', sub: 'v1.0.0' }, { label: '🔐 Privacy Policy', sub: '' }] },
];

export default function SettingsScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={{ width: 60 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {SETTINGS_ROWS.map(({ section, items }) => (
          <View key={section} style={styles.section}>
            <Text style={styles.sectionLabel}>{section.toUpperCase()}</Text>
            <View style={styles.group}>
              {items.map(({ label, sub }, i) => (
                <TouchableOpacity key={label} style={[styles.row, i < items.length - 1 && styles.rowBorder]} activeOpacity={0.7}>
                  <View style={styles.rowText}>
                    <Text style={styles.rowLabel}>{label}</Text>
                    {sub ? <Text style={styles.rowSub}>{sub}</Text> : null}
                  </View>
                  <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>
              ))}
            </View>
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
  scroll: { padding: spacing.xl, paddingBottom: spacing['5xl'], gap: spacing.xl },
  section: { gap: spacing.sm },
  sectionLabel: { ...typography.caption, color: colors.textMuted, letterSpacing: 1.5, paddingLeft: spacing.xs },
  group: { backgroundColor: colors.surface, borderRadius: radius.xl, overflow: 'hidden', ...shadows.sm },
  row: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg, gap: spacing.md },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.divider },
  rowText: { flex: 1, gap: 2 },
  rowLabel: { ...typography.labelSemiBold, color: colors.textPrimary },
  rowSub: { ...typography.caption, color: colors.textSecondary },
  chevron: { fontSize: 20, color: colors.textMuted },
});
