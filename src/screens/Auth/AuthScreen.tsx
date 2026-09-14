import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { colors, spacing, radius, typography, shadows } from '@/theme';
import { ExplorerStyle, ExplorerGoal } from '@/types';
import { useApp } from '@/context/AppContext';
import { supabase, supabaseUrl, supabaseAnonKey } from '@/lib/supabase';
import PrimaryButton from '@/components/PrimaryButton';
import SegmentedToggle from '@/components/SegmentedToggle';

type Props = NativeStackScreenProps<RootStackParamList, 'Auth'>;

type Mode = 'Log In' | 'Sign Up';

// Hosted page users land on from the reset email to actually set a new
// password — the app has no deep-link scheme configured, so this has to be
// a web page rather than a route inside the app itself. Supabase's default
// "Reset Password" email template can't be edited without custom SMTP, so
// this uses that default template's built-in link, unmodified.
const RESET_PASSWORD_URL = 'https://parks-pal.com/reset-password';

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
      <Path
        d="M4 4H11V9L19 12Q21 12.8 21 15V17H4Z"
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M4 14.5h17" stroke={color} strokeWidth={1.1} strokeLinecap="round" />
      <Path d="M5.3 5.5h4M5.3 7.5h4" stroke={color} strokeWidth={1} strokeLinecap="round" />
    </Svg>
  );
}

function TentIcon({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M12 3.3 2.6 19.5h18.8L12 3.3z" fill="none" stroke={color} strokeWidth={1.8} strokeLinejoin="round" strokeLinecap="round" />
      <Path d="M12 3.3 8.5 19.5" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
      <Path d="M12 3.3 15.5 19.5" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
      <Path d="M10.2 19.5 12 12.3l1.8 7.2" fill="none" stroke={color} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M1.5 19.5h21" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

function CarIcon({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M4.4 14.6 5.9 9.4a2.2 2.2 0 0 1 2.1-1.6h7.9a2.2 2.2 0 0 1 2.1 1.6l1.5 5.2"
        fill="none"
        stroke={color}
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.7 18.9h-.9a1 1 0 0 1-1-1v-2.3a1 1 0 0 1 1-1h20.4a1 1 0 0 1 1 1v2.3a1 1 0 0 1-1 1h-.9"
        fill="none"
        stroke={color}
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M7.9 11.1h8.2" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Circle cx="7" cy="18.9" r="1.9" fill="none" stroke={color} strokeWidth={1.7} />
      <Circle cx="17" cy="18.9" r="1.9" fill="none" stroke={color} strokeWidth={1.7} />
    </Svg>
  );
}

function StarIcon({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12 2.4c.4 3.3 1.1 5.4 2.1 6.4s3.1 1.7 6.5 2.1c-3.4.4-5.5 1.1-6.5 2.1s-1.7 3.1-2.1 6.5c-.4-3.4-1.1-5.5-2.1-6.5s-3.1-1.7-6.5-2.1c3.4-.4 5.5-1.1 6.5-2.1s1.7-3.1 2.1-6.4z"
        fill={color}
      />
      <Circle cx="19.3" cy="5" r="1.1" fill={color} />
      <Circle cx="4.3" cy="16.7" r="0.9" fill={color} />
    </Svg>
  );
}

function CompassIcon({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx="12" cy="12" r="9" fill="none" stroke={color} strokeWidth={1.6} />
      <Path
        d="M15.2 8.8 13 13l-4.2 2.2L11 11z"
        fill="none"
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="12" cy="12" r="0.9" fill={color} />
    </Svg>
  );
}

function CameraIcon({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M9 5.5 7.8 7.7H4.6A1.6 1.6 0 0 0 3 9.3v8.1a1.6 1.6 0 0 0 1.6 1.6h14.8a1.6 1.6 0 0 0 1.6-1.6V9.3a1.6 1.6 0 0 0-1.6-1.6h-3.2L15 5.5z" fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx="12" cy="13" r="3.4" fill="none" stroke={color} strokeWidth={1.6} />
      <Path d="M17.3 10.4h1.3" stroke={color} strokeWidth={1.3} strokeLinecap="round" />
    </Svg>
  );
}

function TrophyIcon({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M7.5 3.6h9v5.1a4.5 4.5 0 0 1-9 0z" fill="none" stroke={color} strokeWidth={1.6} strokeLinejoin="round" strokeLinecap="round" />
      <Path d="M7.5 5H4.8v1.6a3 3 0 0 0 3 3" fill="none" stroke={color} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M16.5 5h2.7v1.6a3 3 0 0 1-3 3" fill="none" stroke={color} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M12 13.2v3.4" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M8.7 20.4a3.3 3.3 0 0 1 6.6 0z" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function MapIcon({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M9 4.4 3.6 6.2v13.4L9 17.8l6 1.8 5.4-1.8V4.4L14.6 6.2z" fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
      <Path d="M9 4.4v13.4M15 6.2v13.4" stroke={color} strokeWidth={1.3} strokeLinecap="round" />
      <Path d="M12 9.4c-1.4 0-2.5 1-2.5 2.4 0 1.7 2.5 4 2.5 4s2.5-2.3 2.5-4c0-1.4-1.1-2.4-2.5-2.4z" fill="none" stroke={color} strokeWidth={1.2} strokeLinejoin="round" />
    </Svg>
  );
}

function JournalIcon({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect x="4.5" y="3.2" width="15" height="17.6" rx="1.8" fill="none" stroke={color} strokeWidth={1.6} />
      <Path d="M8 3.2v17.6" stroke={color} strokeWidth={1.3} strokeLinecap="round" />
      <Path d="M11.2 8.2h5M11.2 11.4h5M11.2 14.6h3.4" stroke={color} strokeWidth={1.2} strokeLinecap="round" />
    </Svg>
  );
}

function MountainsIcon({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M2.6 18.4 8.4 8.6l3.4 5-1.7 2.4z" fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
      <Path d="M9.6 18.4 15.6 6.2l6 12.2z" fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
      <Path d="M15.6 6.2v-3M15.6 3.2 19 4.3l-3.4 1.5z" fill="none" stroke={color} strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" />
    </Svg>
  );
}

const STYLES: { label: ExplorerStyle; render: (color: string) => React.ReactElement }[] = [
  {
    label: 'Casual Explorer',
    render: (c) => <CompassIcon color={c} />,
  },
  { label: 'Road Tripper', render: (c) => <CarIcon color={c} /> },
  { label: 'Hiker', render: (c) => <BootIcon color={c} /> },
  {
    label: 'Photographer',
    render: (c) => <CameraIcon color={c} />,
  },
  { label: 'Camper', render: (c) => <TentIcon color={c} /> },
  {
    label: 'Completionist',
    render: (c) => <TrophyIcon color={c} />,
  },
];

const GOALS: { label: ExplorerGoal; render: (color: string) => React.ReactElement }[] = [
  { label: 'Visit 5 parks this year', render: (c) => <StarIcon color={c} /> },
  {
    label: 'Complete one region',
    render: (c) => <MapIcon color={c} />,
  },
  {
    label: 'Track past trips',
    render: (c) => <JournalIcon color={c} />,
  },
  {
    label: 'Visit all 63 National Parks',
    render: (c) => <MountainsIcon color={c} />,
  },
];

export default function AuthScreen({ navigation }: Props) {
  const { completeOnboarding } = useApp();
  const [mode, setMode] = useState<Mode>('Log In');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [betaKey, setBetaKey] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<ExplorerStyle | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<ExplorerGoal | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);
  const [sendingReset, setSendingReset] = useState(false);

  const handleSubmit = async () => {
    setErrorMessage(null);
    if (!email.trim() || !password) {
      setErrorMessage('Please enter an email and password.');
      return;
    }
    if (mode === 'Sign Up' && !betaKey.trim()) {
      setErrorMessage('Park Pal is in a closed beta right now — enter your beta key to sign up.');
      return;
    }
    setSubmitting(true);
    try {
      if (mode === 'Sign Up') {
        // Account creation is gated behind a beta key checked server-side by
        // this Edge Function (never shipped in the app bundle), which creates
        // the user via the admin API — then we sign in normally to get a session.
        const res = await fetch(`${supabaseUrl}/functions/v1/beta-signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: supabaseAnonKey,
            Authorization: `Bearer ${supabaseAnonKey}`,
          },
          body: JSON.stringify({ email: email.trim(), password, betaKey: betaKey.trim() }),
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.error ?? 'Could not create your account.');

        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
        // RootNavigator picks up the session change and swaps to Main on its
        // own; just write the chosen profile details onto it.
        completeOnboarding({
          name: name.trim() || 'Explorer',
          explorerStyle: selectedStyle ?? undefined,
          goal: selectedGoal ?? undefined,
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
        // RootNavigator swaps to Main automatically once the session lands.
      }
    } catch (err: any) {
      setErrorMessage(err?.message ?? 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgotPassword = async () => {
    setErrorMessage(null);
    if (!email.trim()) {
      setErrorMessage('Enter your email above first, then tap "Forgot password?"');
      return;
    }
    setSendingReset(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: RESET_PASSWORD_URL,
      });
      if (error) throw error;
      setResetSent(true);
    } catch (err: any) {
      setErrorMessage(err?.message ?? 'Could not send the reset email. Please try again.');
    } finally {
      setSendingReset(false);
    }
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

        {resetSent ? (
          <>
            <Text style={styles.title}>Check Your Email</Text>
            <Text style={styles.subtitle}>
              We sent a password reset link to {email.trim()}. Open it on your phone to set a new
              password, then come back here and log in.
            </Text>
            <PrimaryButton
              label="Back to Log In"
              onPress={() => setResetSent(false)}
              style={styles.submitBtn}
            />
          </>
        ) : (
          <>
        <Text style={styles.title}>{mode === 'Log In' ? 'Welcome Back' : 'Create Your Account'}</Text>
        <Text style={styles.subtitle}>
          {mode === 'Log In' ? 'Log in to keep tracking your adventures.' : 'Join Park Pal and start your journey.'}
        </Text>

        <View style={styles.toggleRow}>
          <SegmentedToggle
            options={['Log In', 'Sign Up'] as const}
            value={mode}
            onChange={(m) => {
              setMode(m);
              setErrorMessage(null);
            }}
          />
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
          {mode === 'Sign Up' && (
            <TextInput
              style={styles.input}
              placeholder="Beta Key"
              placeholderTextColor={colors.textMuted}
              autoCapitalize="none"
              value={betaKey}
              onChangeText={setBetaKey}
            />
          )}
        </View>

        {mode === 'Log In' && (
          <TouchableOpacity onPress={handleForgotPassword} disabled={sendingReset} style={styles.forgotLink}>
            <Text style={styles.forgotLinkText}>
              {sendingReset ? 'Sending…' : 'Forgot password?'}
            </Text>
          </TouchableOpacity>
        )}

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

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <PrimaryButton
          label={submitting ? 'Please wait…' : mode === 'Log In' ? 'Log In' : 'Create Account'}
          onPress={handleSubmit}
          disabled={submitting}
          style={styles.submitBtn}
        />

        <TouchableOpacity
          onPress={() => {
            setMode(mode === 'Log In' ? 'Sign Up' : 'Log In');
            setErrorMessage(null);
          }}
          style={styles.switchLink}
        >
          <Text style={styles.switchLinkText}>
            {mode === 'Log In' ? "Don't have an account? " : 'Already have an account? '}
            <Text style={styles.switchLinkTextBold}>{mode === 'Log In' ? 'Sign Up' : 'Log In'}</Text>
          </Text>
        </TouchableOpacity>
          </>
        )}
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

  errorText: { ...typography.bodySmall, color: colors.rose, textAlign: 'center', marginTop: spacing.lg },

  forgotLink: { alignSelf: 'flex-end', marginTop: spacing.sm },
  forgotLinkText: { ...typography.bodySmall, color: colors.primary },

  submitBtn: { width: '100%', marginTop: spacing.xl },
  switchLink: { marginTop: spacing.lg },
  switchLinkText: { ...typography.bodySmall, color: colors.textSecondary },
  switchLinkTextBold: { color: colors.primary, fontFamily: typography.labelBold.fontFamily },
});
