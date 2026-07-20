import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import ScreenHeader from '@/components/ScreenHeader';

const SETTINGS_ROWS = [
  {
    section: 'Account',
    items: [
      { label: 'Profile', sub: 'Name, avatar, explorer style', icon: require('@/assets/icons/icon-profile.png') },
      { label: 'My Goal', sub: 'Update your park goal', icon: require('@/assets/icons/icon-achievements.png') },
    ],
  },
  {
    section: 'App',
    items: [
      { label: 'Units', sub: 'Miles / Kilometers', icon: require('@/assets/icons/icon-explore.png') },
      { label: 'Notifications', sub: 'Reminders & updates', icon: require('@/assets/icons/icon-notifications.png') },
    ],
  },
  {
    section: 'Data',
    items: [
      { label: 'Backup & Sync', sub: 'Coming soon', icon: require('@/assets/icons/icon-offline-maps.png') },
      { label: 'Export Data', sub: 'Export your trips as CSV', icon: require('@/assets/icons/icon-journal.png') },
    ],
  },
  {
    section: 'About',
    items: [
      { label: 'About Park Pal', sub: 'v1.0.0', icon: require('@/assets/icons/icon-parks.png') },
      { label: 'Privacy Policy', sub: '', icon: require('@/assets/icons/icon-safety.png') },
    ],
  },
];

export default function SettingsScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Settings" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {SETTINGS_ROWS.map(({ section, items }) => (
          <View key={section} style={styles.section}>
            <Text style={styles.sectionLabel}>{section.toUpperCase()}</Text>
            <View style={styles.group}>
              {items.map(({ label, sub, icon }, i) => (
                <TouchableOpacity key={label} style={[styles.row, i < items.length - 1 && styles.rowBorder]} activeOpacity={0.7}>
                  <Image source={icon} style={styles.rowIcon} resizeMode="contain" />
                  <View style={styles.rowText}>
                    <Text style={styles.rowLabel}>{label}</Text>
                    {sub ? <Text style={styles.rowSub}>{sub}</Text> : null}
                  </View>
                  <Text style={styles.chevron}>{'›'}</Text>
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
  scroll: { paddingHorizontal: spacing.xl, paddingBottom: spacing['5xl'], gap: spacing.xl },
  section: { gap: spacing.sm },
  sectionLabel: { ...typography.caption, color: colors.textMuted, letterSpacing: 1.5, paddingLeft: spacing.xs },
  group: { backgroundColor: colors.surface, borderRadius: radius.xl, overflow: 'hidden', ...shadows.sm },
  row: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg, gap: spacing.md },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.divider },
  rowIcon: { width: 22, height: 22 },
  rowText: { flex: 1, gap: 2 },
  rowLabel: { ...typography.labelSemiBold, color: colors.textPrimary },
  rowSub: { ...typography.caption, color: colors.textSecondary },
  chevron: { fontSize: 20, color: colors.textMuted },
});
