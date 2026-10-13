import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '@/context/AppContext';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import { ExplorerGoal } from '@/types';
import ScreenHeader from '@/components/ScreenHeader';
import PrimaryButton from '@/components/PrimaryButton';

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

const GOALS: { label: ExplorerGoal; render: (color: string) => React.ReactElement }[] = [
  { label: 'Visit 5 parks this year', render: (c) => <StarIcon color={c} /> },
  { label: 'Complete one region', render: (c) => <MapIcon color={c} /> },
  { label: 'Track past trips', render: (c) => <JournalIcon color={c} /> },
  { label: 'Visit all 63 National Parks', render: (c) => <MountainsIcon color={c} /> },
];

export default function EditGoalScreen() {
  const { userProfile, updateProfile, stats } = useApp();
  const navigation = useNavigation<any>();
  const [selectedGoal, setSelectedGoal] = useState<ExplorerGoal | undefined>(userProfile.goal);

  const handleSave = () => {
    updateProfile({ goal: selectedGoal });
    navigation.goBack();
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScreenHeader title="My Goal" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>What's your adventure goal?</Text>
        <View style={styles.grid}>
          {/* The stored goal value predates park #64, so only its display tracks the live count. */}
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
                <Text style={[styles.optionLabel, active && styles.optionLabelActive]}>{label === 'Visit all 63 National Parks' ? `Visit all ${stats.totalParks} National Parks` : label}</Text>
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
  optionLabel: { ...typography.labelSemiBold, color: colors.textSecondary, textAlign: 'center' },
  optionLabelActive: { color: colors.textInverse },

  saveBtn: { marginTop: spacing.md },
});
