import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '@/context/AppContext';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import { ExplorerGoal } from '@/types';
import ScreenHeader from '@/components/ScreenHeader';
import PrimaryButton from '@/components/PrimaryButton';

function StarIcon({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Polygon points="12,2 14.9,9 22.5,9.3 16.4,14 18.5,21.3 12,17.1 5.5,21.3 7.6,14 1.5,9.3 9.1,9" fill={color} />
    </Svg>
  );
}

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

export default function EditGoalScreen() {
  const { userProfile, completeOnboarding } = useApp();
  const navigation = useNavigation<any>();
  const [selectedGoal, setSelectedGoal] = useState<ExplorerGoal | undefined>(userProfile.goal);

  const handleSave = () => {
    completeOnboarding({ goal: selectedGoal });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="My Goal" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>What's your adventure goal?</Text>
        <View style={styles.grid}>
          {GOALS.map(({ label, render }) => {
            const active = selectedGoal === label;
            const iconColor = active ? colors.textInverse : colors.brown;
            return (
              <TouchableOpacity
                key={label}
                style={[styles.option, active && styles.optionActive]}
                onPress={() => setSelectedGoal(label)}
                activeOpacity={0.8}
              >
                {render(iconColor)}
                <Text style={[styles.optionLabel, active && styles.optionLabelActive]}>{label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <PrimaryButton label="Save Goal" onPress={handleSave} style={styles.saveBtn} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: spacing.xl, paddingBottom: spacing['5xl'], gap: spacing.xl },

  label: { ...typography.labelBold, color: colors.textPrimary },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  option: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.border,
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.sm,
    ...shadows.sm,
  },
  optionActive: { borderColor: colors.primary, backgroundColor: colors.primary },
  optionIconImg: { width: 22, height: 22 },
  optionLabel: { ...typography.labelSemiBold, color: colors.textSecondary, textAlign: 'center' },
  optionLabelActive: { color: colors.textInverse },

  saveBtn: { marginTop: spacing.md },
});
