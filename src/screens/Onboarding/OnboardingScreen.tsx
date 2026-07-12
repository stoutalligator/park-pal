import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { colors, spacing, radius, typography, shadows } from '@/theme';
import { ExplorerStyle, ExplorerGoal } from '@/types';
import { useApp } from '@/context/AppContext';
import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const STYLES: { label: ExplorerStyle; icon: string }[] = [
  { label: 'Casual Explorer', icon: '😊' },
  { label: 'Road Tripper', icon: '🚗' },
  { label: 'Hiker', icon: '🥾' },
  { label: 'Photographer', icon: '📷' },
  { label: 'Camper', icon: '⛺' },
  { label: 'Completionist', icon: '🏆' },
];

const GOALS: { label: ExplorerGoal; icon: string }[] = [
  { label: 'Visit 5 parks this year', icon: '🌟' },
  { label: 'Complete one region', icon: '🗺️' },
  { label: 'Track past trips', icon: '📖' },
  { label: 'Visit all 63 National Parks', icon: '🎯' },
];

export default function OnboardingScreen({ navigation }: Props) {
  const { completeOnboarding } = useApp();
  const [step, setStep] = useState<'style' | 'goal'> ('style');
  const [selectedStyle, setSelectedStyle] = useState<ExplorerStyle | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<ExplorerGoal | null>(null);

  const handleContinue = () => {
    if (step === 'style') { setStep('goal'); return; }
    completeOnboarding({ explorerStyle: selectedStyle ?? undefined, goal: selectedGoal ?? undefined });
    navigation.replace('Main', { screen: 'HomeTab' } as any);
  };

  const handleSkip = () => {
    completeOnboarding({});
    navigation.replace('Main', { screen: 'HomeTab' } as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.mascot}>🐻</Text>
        <Text style={styles.title}>
          {step === 'style' ? 'What kind of explorer are you?' : 'Set your adventure goal'}
        </Text>
        <Text style={styles.subtitle}>
          {step === 'style' ? 'Pick the style that fits you best.' : 'What are you working toward?'}
        </Text>

        <View style={styles.grid}>
          {step === 'style'
            ? STYLES.map(({ label, icon }) => (
                <TouchableOpacity
                  key={label}
                  style={[styles.option, selectedStyle === label && styles.optionActive]}
                  onPress={() => setSelectedStyle(label)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.optionIcon}>{icon}</Text>
                  <Text style={[styles.optionLabel, selectedStyle === label && styles.optionLabelActive]}>{label}</Text>
                </TouchableOpacity>
              ))
            : GOALS.map(({ label, icon }) => (
                <TouchableOpacity
                  key={label}
                  style={[styles.option, styles.optionWide, selectedGoal === label && styles.optionActive]}
                  onPress={() => setSelectedGoal(label)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.optionIcon}>{icon}</Text>
                  <Text style={[styles.optionLabel, selectedGoal === label && styles.optionLabelActive]}>{label}</Text>
                </TouchableOpacity>
              ))
          }
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton label={step === 'style' ? 'Continue' : 'Start Exploring!'} onPress={handleContinue} style={styles.btn} />
        <SecondaryButton label="Skip for now" onPress={handleSkip} style={styles.btn} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing['3xl'], paddingBottom: spacing.xl, gap: spacing.md, alignItems: 'center' },
  mascot: { fontSize: 52, marginBottom: spacing.sm },
  title: { ...typography.h3, color: colors.textPrimary, textAlign: 'center' },
  subtitle: { ...typography.body, color: colors.textSecondary, textAlign: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, justifyContent: 'center', marginTop: spacing.lg, width: '100%' },
  option: {
    width: '44%',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.border,
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.sm,
    ...shadows.sm,
  },
  optionWide: { width: '90%' },
  optionActive: { borderColor: colors.primary, backgroundColor: '#EEF5E8' },
  optionIcon: { fontSize: 28 },
  optionLabel: { ...typography.labelSemiBold, color: colors.textSecondary, textAlign: 'center' },
  optionLabelActive: { color: colors.primary },
  footer: { padding: spacing['3xl'], gap: spacing.md },
  btn: { width: '100%' },
});
