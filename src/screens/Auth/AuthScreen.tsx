import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Svg, { Path, Polygon } from 'react-native-svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { colors, spacing, radius, typography, shadows } from '@/theme';
import { ExplorerStyle, ExplorerGoal } from '@/types';
import { useApp } from '@/context/AppContext';
import PrimaryButton from '@/components/PrimaryButton';
import SegmentedToggle from '@/components/SegmentedToggle';

type Props = NativeStackScreenProps<RootStackParamList, 'Auth'>;

type Mode = 'Log In' | 'Sign Up';

function BackArrowIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16">
      <Path d="M10 2 4 8l6 6" fill="none" stroke={colors.textPrimary} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function BootIcon({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Polygon points="4,3 11,3 11,9 19,9 19,12 22,12 22,17 4,17" fill={color} />
    </Svg>
  );
}

function TentIcon({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Polygon points="12,4 3,20 21,20" fill={color} />
      <Polygon points="12,11 8.6,20 15.4,20" fill={colors.background} />
    </Svg>
  );
}

function CarIcon({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M4 14 5.6 9a2 2 0 0 1 1.9-1.4h9a2 2 0 0 1 1.9 1.4L20 14z" fill={color} />
      <Path d="M2.5 14h19a1.5 1.5 0 0 1 1.5 1.5V17a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-1.5A1.5 1.5 0 0 1 2.5 14z" fill={color} />
      <Path d="M7 18.5a1.8 1.8 0 1 1 3.6 0 1.8 1.8 0 0 1-3.6 0Z" fill={colors.background} stroke={color} strokeWidth={1.4} />
      <Path d="M13.4 18.5a1.8 1.8 0 1 1 3.6 0 1.8 1.8 0 0 1-3.6 0Z" fill={colors.background} stroke={color} strokeWidth={1.4} />
    </Svg>
  );
}

function StarIcon({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Polygon points="12,2 14.9,9 22.5,9.3 16.4,14 18.5,21.3 12,17.1 5.5,21.3 7.6,14 1.5,9.3 9.1,9" fill={color} />
    </Svg>
  );
}

const STYLES: { label: ExplorerStyle; render: (color: string) => React.ReactElement }[] = [
  {
    label: 'Casual Explorer',
    render: (c) => <Image source={require('@/assets/icons/icon-explore.png')} style={[styles.optionIconImg, { tintColor: c }]} resizeMode="contain" />,
  },
  { label: 'Road Tripper', render: (c) => <CarIcon color={c} /> },
  { label: 'Hiker', render: (c) => <BootIcon color={c} /> },
  {
    label: 'Photographer',
    render: (c) => <Image source={require('@/assets/icons/icon-photos.png')} style={[styles.optionIconImg, { tintColor: c }]} resizeMode="contain" />,
  },
  { label: 'Camper', render: (c) => <TentIcon color={c} /> },
  {
    label: 'Completionist',
    render: (c) => <Image source={require('@/assets/icons/icon-achievements.png')} style={[styles.optionIconImg, { tintColor: c }]} resizeMode="contain" />,
  },
];

const GOALS: { label: ExplorerGoal; render: (color: string) => React.ReactElement }[] = [
  { label: 'Visit 5 parks this year', render: (c) => <StarIcon color={c} /> },
  {
    label: 'Complete one region',
    render: (c) => <Image source={require('@/assets/icons/icon-map.png')} style={[styles.optionIconImg, { tintColor: c }]} resizeMode="contain" />,
  },
  {
    label: 'Track past trips',
    render: (c) => <Image source={require('@/assets/icons/icon-journal.png')} style={[styles.optionIconImg, { tintColor: c }]} resizeMode="contain" />,
  },
  {
    label: 'Visit all 63 National Parks',
    render: (c) => <Image source={require('@/assets/icons/icon-parks.png')} style={[styles.optionIconImg, { tintColor: c }]} resizeMode="contain" />,
  },
];

export default function AuthScreen({ navigation }: Props) {
  const { completeOnboarding } = useApp();
  const [mode, setMode] = useState<Mode>('Log In');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<ExplorerStyle | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<ExplorerGoal | null>(null);

  const goToApp = () => navigation.replace('Main', { screen: 'HomeTab' } as any);

  const handleSubmit = () => {
    if (mode === 'Sign Up') {
      completeOnboarding({
        name: name.trim() || 'Explorer',
        explorerStyle: selectedStyle ?? undefined,
        goal: selectedGoal ?? undefined,
      });
    } else {
      completeOnboarding({});
    }
    goToApp();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} hitSlop={10}>
            <BackArrowIcon />
          </TouchableOpacity>
        </View>

        <Image source={require('@/assets/mascot/mascot-happy.png')} style={styles.mascot} resizeMode="contain" />
        <Text style={styles.title}>{mode === 'Log In' ? 'Welcome Back' : 'Create Your Account'}</Text>
        <Text style={styles.subtitle}>
          {mode === 'Log In' ? 'Log in to keep tracking your adventures.' : 'Join Park Pal and start your journey.'}
        </Text>

        <View style={styles.toggleRow}>
          <SegmentedToggle options={['Log In', 'Sign Up'] as const} value={mode} onChange={setMode} />
        </View>

        <View style={styles.form}>
          {mode === 'Sign Up' && (
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor={colors.textMuted}
              value={name}
              onChangeText={setName}
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={colors.textMuted}
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={colors.textMuted}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {mode === 'Sign Up' && (
          <>
            <View style={styles.field}>
              <Text style={styles.label}>What kind of explorer are you?</Text>
              <View style={styles.grid}>
                {STYLES.map(({ label, render }) => {
                  const active = selectedStyle === label;
                  const iconColor = active ? colors.textInverse : colors.brown;
                  return (
                    <TouchableOpacity
                      key={label}
                      style={[styles.option, active && styles.optionActive]}
                      onPress={() => setSelectedStyle(label)}
                      activeOpacity={0.8}
                    >
                      {render(iconColor)}
                      <Text style={[styles.optionLabel, active && styles.optionLabelActive]}>{label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>What's your adventure goal?</Text>
              <View style={styles.grid}>
                {GOALS.map(({ label, render }) => {
                  const active = selectedGoal === label;
                  const iconColor = active ? colors.textInverse : colors.brown;
                  return (
                    <TouchableOpacity
                      key={label}
                      style={[styles.option, styles.optionWide, active && styles.optionActive]}
                      onPress={() => setSelectedGoal(label)}
                      activeOpacity={0.8}
                    >
                      {render(iconColor)}
                      <Text style={[styles.optionLabel, active && styles.optionLabelActive]}>{label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </>
        )}

        <PrimaryButton
          label={mode === 'Log In' ? 'Log In' : 'Create Account'}
          onPress={handleSubmit}
          style={styles.submitBtn}
        />

        <TouchableOpacity onPress={() => setMode(mode === 'Log In' ? 'Sign Up' : 'Log In')} style={styles.switchLink}>
          <Text style={styles.switchLinkText}>
            {mode === 'Log In' ? "Don't have an account? " : 'Already have an account? '}
            <Text style={styles.switchLinkTextBold}>{mode === 'Log In' ? 'Sign Up' : 'Log In'}</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.xl, paddingBottom: spacing['5xl'], alignItems: 'center' },

  header: { width: '100%', marginBottom: spacing.md },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', ...shadows.sm },

  mascot: { width: 72, height: 72, marginBottom: spacing.sm },
  title: { ...typography.h3, color: colors.textPrimary, textAlign: 'center' },
  subtitle: { ...typography.body, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xs, marginBottom: spacing.xl },

  toggleRow: { width: '80%', marginBottom: spacing.xl },

  form: { width: '100%', gap: spacing.md, marginBottom: spacing.md },
  input: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, ...typography.body, color: colors.textPrimary, ...shadows.sm },

  field: { width: '100%', marginTop: spacing.lg },
  label: { ...typography.labelBold, color: colors.textPrimary, marginBottom: spacing.sm },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, justifyContent: 'center' },
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
  optionWide: { width: '100%' },
  optionActive: { borderColor: colors.primary, backgroundColor: colors.primary },
  optionIconImg: { width: 22, height: 22 },
  optionLabel: { ...typography.labelSemiBold, color: colors.textSecondary, textAlign: 'center' },
  optionLabelActive: { color: colors.textInverse },

  submitBtn: { width: '100%', marginTop: spacing.xl },
  switchLink: { marginTop: spacing.lg },
  switchLinkText: { ...typography.bodySmall, color: colors.textSecondary },
  switchLinkTextBold: { color: colors.primary, fontFamily: typography.labelBold.fontFamily },
});
