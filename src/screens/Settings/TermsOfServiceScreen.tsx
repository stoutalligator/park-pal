import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import ScreenHeader from '@/components/ScreenHeader';

const SECTIONS = [
  {
    title: 'Using Parks Pal',
    body: 'Parks Pal is provided for personal, non-commercial use tracking your own national park visits, trips, and progress. You\'re responsible for the accuracy of anything you enter — trip notes, trail logs, wildlife sightings, and photos.',
  },
  {
    title: 'Not Directed at Children',
    body: 'Parks Pal is not directed at children under 13, and we do not knowingly collect data from them.',
  },
  {
    title: 'Park & Trail Information',
    body: 'Park, trail, and wildlife information in the app is provided for reference only and may be incomplete, outdated, or inaccurate. Conditions at national parks change — always verify current trail status, closures, weather, and safety information with official park sources before you go.',
  },
  {
    title: 'No Warranty',
    body: 'Parks Pal is provided "as is," without warranties of any kind. We don\'t guarantee the app will be uninterrupted, error-free, or that any data you enter will never be lost — back up anything irreplaceable, like photos, separately.',
  },
  {
    title: 'Limitation of Liability',
    body: 'To the fullest extent permitted by law, Parks Pal and its developer aren\'t liable for any injury, loss, or damage arising from your use of the app, including reliance on park or trail information, or from technical issues, data loss, or service interruptions.',
  },
  {
    title: 'Your Account',
    body: 'You\'re responsible for keeping your login credentials secure. You can delete your account and all associated data at any time from Settings, Delete Account.',
  },
  {
    title: 'Changes',
    body: 'If these terms change in a meaningful way, we\'ll update this page and the effective date on the web version at parks-pal.com/terms.',
  },
];

export default function TermsOfServiceScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Terms of Service" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {SECTIONS.map(({ title, body }) => (
          <View key={title} style={styles.card}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <Text style={styles.sectionBody}>{body}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: spacing.xl, paddingBottom: spacing['5xl'], gap: spacing.md },
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, gap: spacing.xs, ...shadows.sm },
  sectionTitle: { ...typography.labelBold, color: colors.textPrimary },
  sectionBody: { ...typography.bodySmall, color: colors.textSecondary, lineHeight: 20 },
});
