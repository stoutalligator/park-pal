import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import ScreenHeader from '@/components/ScreenHeader';

const SUPPORT_EMAIL = 'parkpal.support@gmail.com';

const LEGAL_LINKS = [
  { label: 'Support', url: 'https://parks-pal.com/support' },
  { label: 'Privacy Policy', url: 'https://parks-pal.com/privacy' },
  { label: 'Terms of Service', url: 'https://parks-pal.com/terms' },
];

export default function AboutScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScreenHeader title="About Parks Pal" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Image source={require('@/assets/mascot/mascot-happy.png')} style={styles.mascot} resizeMode="contain" />
        <Text style={styles.title}>Parks Pal</Text>
        <Text style={styles.version}>v1.0.0</Text>
        <Text style={styles.motto}>COLLECT. EXPLORE. REMEMBER.</Text>
        <Text style={styles.body}>
          Parks Pal is your cozy companion for tracking every U.S. National Park you visit. Log
          trips, save memories, collect postcards from every adventure, and watch your national park map fill
          in — one adventure at a time.
        </Text>
        <View style={styles.sourceCard}>
          <Text style={styles.sourceTitle}>Where our info comes from</Text>
          <Text style={styles.sourceText}>
            Parks Pal is an independent app and is not affiliated with, endorsed by, or operated by the
            National Park Service. Park, trail, and wildlife info is gathered from NPS.gov and other public
            sources. Suggestions and day plans are based on our own experiences plus those of fellow users
            and pals.
          </Text>
          <Text style={styles.sourceText}>
            Conditions, closures, permits, and hours change often, so the official NPS website will always
            have the most up-to-date info. Spot something wrong or have a recommendation? Let us know below.
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.nps.gov')} hitSlop={8}>
            <Text style={styles.sourceLink}>Visit nps.gov {'›'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.supportCard}>
          <Text style={styles.supportLabel}>Need help or have feedback?</Text>
          <TouchableOpacity onPress={() => Linking.openURL(`mailto:${SUPPORT_EMAIL}`)}>
            <Text style={styles.supportEmail}>{SUPPORT_EMAIL}</Text>
          </TouchableOpacity>
          <View style={styles.legalRow}>
            {LEGAL_LINKS.map((link, i) => (
              <React.Fragment key={link.url}>
                {i > 0 && <Text style={styles.legalDot}>·</Text>}
                <TouchableOpacity onPress={() => Linking.openURL(link.url)} hitSlop={8}>
                  <Text style={styles.legalLink}>{link.label}</Text>
                </TouchableOpacity>
              </React.Fragment>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: spacing.xl, paddingBottom: spacing['5xl'], alignItems: 'center', gap: spacing.sm },
  mascot: { width: 96, height: 96, marginTop: spacing.lg, marginBottom: spacing.sm },
  title: { ...typography.h2, color: colors.textPrimary },
  version: { ...typography.bodySmall, color: colors.textMuted },
  motto: { ...typography.labelBold, color: colors.sage, letterSpacing: 1.5, marginTop: spacing.md, marginBottom: spacing.lg },
  body: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    ...shadows.sm,
  },
  sourceCard: {
    alignSelf: 'stretch',
    marginTop: spacing.lg,
    backgroundColor: colors.surfaceWarm,
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.sm,
  },
  sourceTitle: { ...typography.labelBold, color: colors.textPrimary },
  sourceText: { ...typography.bodySmall, color: colors.textSecondary, lineHeight: 20 },
  sourceLink: { ...typography.labelSemiBold, color: colors.primary },
  supportCard: {
    marginTop: spacing.lg,
    alignItems: 'center',
    gap: spacing.xs,
  },
  supportLabel: { ...typography.bodySmall, color: colors.textSecondary },
  supportEmail: { ...typography.labelBold, color: colors.primary },
  legalRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: spacing.sm, marginTop: spacing.md },
  legalLink: { ...typography.bodySmall, color: colors.primary, textDecorationLine: 'underline' },
  legalDot: { ...typography.bodySmall, color: colors.textMuted },
});
