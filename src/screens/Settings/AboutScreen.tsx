import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import ScreenHeader from '@/components/ScreenHeader';

export default function AboutScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="About Park Pal" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Image source={require('@/assets/mascot/mascot-happy.png')} style={styles.mascot} resizeMode="contain" />
        <Text style={styles.title}>Park Pal</Text>
        <Text style={styles.version}>v1.0.0</Text>
        <Text style={styles.motto}>COLLECT. EXPLORE. REMEMBER.</Text>
        <Text style={styles.body}>
          Park Pal is your cozy companion for tracking every U.S. National Park you visit. Log
          trips, save memories, collect digital passport stamps, and watch your progress toward
          all 63 parks fill in — one adventure at a time.
        </Text>
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
});
