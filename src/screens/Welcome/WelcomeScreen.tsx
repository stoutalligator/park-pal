import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { colors, spacing, typography, shadows } from '@/theme';
import { useApp } from '@/context/AppContext';
import { preloadAssets } from '@/utils/preloadAssets';
import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen({ navigation }: Props) {
  const { completeOnboarding } = useApp();
  const [assetsReady, setAssetsReady] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;
    preloadAssets((fraction) => {
      if (!cancelled) setProgress(fraction);
    }).finally(() => {
      if (!cancelled) setAssetsReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const startExploring = () => {
    completeOnboarding({});
    navigation.replace('Main', { screen: 'HomeTab' } as any);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/mascot/bear-title-scene.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <SafeAreaView style={styles.overlay}>
        <View style={styles.topContent}>
          <Text style={styles.eyebrow}>NATIONAL PARK</Text>
          <Text style={styles.title}>TRACKER</Text>
          <Text style={styles.subtitle}>{'Collect memories.\nExplore more.'}</Text>
          <Image
            source={require('@/assets/icons/favorite-heart.png')}
            style={styles.heart}
            resizeMode="contain"
          />
        </View>

        <View style={styles.buttons}>
          {assetsReady ? (
            <>
              <PrimaryButton
                label="Start Exploring"
                icon={require('@/assets/icons/mountain.png')}
                onPress={startExploring}
                style={styles.primaryBtn}
              />
              <SecondaryButton
                label="Log In / Sign Up"
                onPress={() => navigation.navigate('Auth')}
                style={styles.secondaryBtn}
              />
            </>
          ) : (
            <View style={styles.loadingBlock}>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${Math.round(progress * 100)}%` }]} />
              </View>
              <Text style={styles.loadingText}>Preparing your adventure...</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: spacing['3xl'],
    paddingTop: spacing['5xl'] + spacing['5xl'] + spacing['2xl'],
    paddingBottom: spacing['5xl'],
  },
  topContent: {
    alignItems: 'center',
  },
  eyebrow: {
    ...typography.h5,
    color: colors.brownDark,
    letterSpacing: 2,
    marginBottom: 2,
  },
  title: {
    ...typography.h1,
    color: colors.brownDark,
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.bodyLarge,
    color: colors.brown,
    textAlign: 'center',
    lineHeight: 24,
  },
  heart: {
    width: 22,
    height: 22,
    marginTop: spacing.sm,
  },
  buttons: {
    width: '100%',
    alignItems: 'center',
    gap: spacing.md,
  },
  primaryBtn: {
    width: '85%',
    borderWidth: 2,
    borderColor: colors.brownDark,
    ...shadows.lg,
  },
  secondaryBtn: {
    width: '85%',
    backgroundColor: colors.cream,
    borderWidth: 2,
    borderColor: colors.brownDark,
    ...shadows.lg,
  },
  loadingBlock: {
    width: '85%',
    alignItems: 'center',
    gap: spacing.sm,
  },
  progressTrack: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.cream,
    borderWidth: 2,
    borderColor: colors.brownDark,
    overflow: 'hidden',
    ...shadows.lg,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  loadingText: {
    ...typography.labelSemiBold,
    color: colors.brownDark,
  },
});
