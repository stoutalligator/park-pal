import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import ScreenHeader from '@/components/ScreenHeader';

const SECTIONS = [
  {
    title: 'What We Collect',
    body: 'Your account email, the parks you mark visited or wishlisted, trip logs you write, any photos you attach to a trip, and any trail or animal you flag as wrong. If the app crashes or hits an error, and for a sample of sessions, technical diagnostics (device model, OS, app version, the error) are sent to our crash-reporting provider — never linked to your email or account.',
  },
  {
    title: 'How We Use It',
    body: 'Solely to power your Parks Pal experience — tracking progress, showing your trip history, and calculating stats and badges. We do not sell your data.',
  },
  {
    title: 'Where It Lives',
    body: 'Your data is stored securely with Supabase and is only accessible from your signed-in account. Crash and performance diagnostics go to Sentry and are used only to find and fix bugs.',
  },
  {
    title: 'Your Control',
    body: 'You can edit or delete any trip, park status, or profile detail at any time from within the app. Signing out does not delete your data — to permanently delete your account and everything in it, use Delete Account in Settings.',
  },
  {
    title: "Children's Privacy",
    body: 'Parks Pal is not directed at children under 13, and we do not knowingly collect data from them.',
  },
];

export default function PrivacyPolicyScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScreenHeader title="Privacy Policy" onBack={() => navigation.goBack()} />
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
