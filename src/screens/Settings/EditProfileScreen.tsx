import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '@/context/AppContext';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import { ExplorerStyle } from '@/types';
import ScreenHeader from '@/components/ScreenHeader';
import PrimaryButton from '@/components/PrimaryButton';

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

const STYLES: { label: ExplorerStyle; render: (color: string) => React.ReactElement }[] = [
  { label: 'Casual Explorer', render: (c) => <CompassIcon color={c} /> },
  { label: 'Road Tripper', render: (c) => <CarIcon color={c} /> },
  { label: 'Hiker', render: (c) => <BootIcon color={c} /> },
  { label: 'Photographer', render: (c) => <CameraIcon color={c} /> },
  { label: 'Camper', render: (c) => <TentIcon color={c} /> },
  { label: 'Completionist', render: (c) => <TrophyIcon color={c} /> },
];

export default function EditProfileScreen() {
  const { userProfile, updateProfile } = useApp();
  const navigation = useNavigation<any>();
  const [name, setName] = useState(userProfile.name);
  const [selectedStyle, setSelectedStyle] = useState<ExplorerStyle | undefined>(userProfile.explorerStyle);

  const handleSave = () => {
    updateProfile({
      name: name.trim() || userProfile.name,
      explorerStyle: selectedStyle,
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScreenHeader title="Profile" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.field}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Your name"
            placeholderTextColor={colors.textMuted}
            value={name}
            onChangeText={setName}
          />
        </View>

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

        <PrimaryButton label="Save Changes" onPress={handleSave} style={styles.saveBtn} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: spacing.xl, paddingBottom: spacing['5xl'], gap: spacing.xl },

  field: { gap: spacing.sm },
  label: { ...typography.labelBold, color: colors.textPrimary },
  input: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, ...typography.body, color: colors.textPrimary, ...shadows.sm },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
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
  optionActive: { borderColor: colors.primary, backgroundColor: colors.primary },
  optionLabel: { ...typography.labelSemiBold, color: colors.textSecondary, textAlign: 'center' },
  optionLabelActive: { color: colors.textInverse },

  saveBtn: { marginTop: spacing.md },
});
