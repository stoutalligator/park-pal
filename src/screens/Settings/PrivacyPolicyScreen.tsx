import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import ScreenHeader from '@/components/ScreenHeader';

const SECTIONS = [
  {
    title: 'What We Collect',
    body: 'Your account email, the parks you mark visited or wishlisted, trip logs you write, and any photos you attach to a trip.',
  },
  {
    title: 'How We Use It',
    body: 'Solely to power your Park Pal passport — tracking progress, showing your trip history, and calculating stats and badges. We do not sell your data.',
  },
  {
    title: 'Where It Lives',
    body: 'Your data is stored securely and is only accessible from your signed-in account.',
  },
  {
    title: 'Your Control',
    body: 'You can edit or delete any trip, park status, or profile detail at any time from within the app. Signing out does not delete your data.',
  },
];

export default function PrivacyPolicyScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
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
