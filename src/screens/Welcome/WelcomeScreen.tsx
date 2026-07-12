import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { colors, spacing, typography, shadows } from '@/theme';
import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Sky / mountain illustrated header */}
      <View style={styles.hero}>
        <View style={styles.skyBand} />
        <View style={styles.mountainRow}>
          <View style={[styles.mountain, styles.mountainBack]} />
          <View style={[styles.mountain, styles.mountainMid]} />
          <View style={[styles.mountain, styles.mountainFront]} />
        </View>
        <View style={styles.groundBand} />
        {/* Bear mascot */}
        <View style={styles.mascotWrapper}>
          <Text style={styles.mascotEmoji}>🐻</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.eyebrow}>NATIONAL PARK</Text>
        <Text style={styles.title}>TRACKER</Text>
        <Text style={styles.subtitle}>Collect memories. Explore more.</Text>

        <View style={styles.buttons}>
          <PrimaryButton
            label="Start Exploring"
            icon="🌲"
            onPress={() => navigation.navigate('Onboarding')}
            style={styles.primaryBtn}
          />
          <SecondaryButton
            label="Log In / Sign Up"
            onPress={() => navigation.navigate('Onboarding')}
            style={styles.secondaryBtn}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  hero: {
    height: 320,
    overflow: 'hidden',
    position: 'relative',
  },
  skyBand: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: colors.sky,
    opacity: 0.35,
  },
  mountainRow: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    height: 200,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  mountain: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  mountainBack: {
    borderLeftWidth: 100,
    borderRightWidth: 100,
    borderBottomWidth: 160,
    borderBottomColor: colors.sage,
    opacity: 0.5,
    marginBottom: 20,
    marginHorizontal: -20,
  },
  mountainMid: {
    borderLeftWidth: 120,
    borderRightWidth: 120,
    borderBottomWidth: 180,
    borderBottomColor: colors.primary,
    opacity: 0.8,
    marginHorizontal: -30,
  },
  mountainFront: {
    borderLeftWidth: 80,
    borderRightWidth: 80,
    borderBottomWidth: 130,
    borderBottomColor: '#1e3a0e',
    opacity: 0.9,
    marginBottom: 10,
    marginHorizontal: -20,
  },
  groundBand: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: colors.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  mascotWrapper: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: colors.background,
    borderRadius: 50,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
  mascotEmoji: {
    fontSize: 44,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spacing['3xl'],
    paddingTop: spacing.xl,
    gap: spacing.sm,
  },
  eyebrow: {
    ...typography.labelSmall,
    color: colors.textSecondary,
    letterSpacing: 2,
  },
  title: {
    ...typography.h1,
    color: colors.primary,
    letterSpacing: 1,
  },
  subtitle: {
    ...typography.bodyLarge,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  buttons: {
    width: '100%',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  primaryBtn: {
    width: '100%',
  },
  secondaryBtn: {
    width: '100%',
  },
});
