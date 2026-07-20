import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Svg, { Path, Polygon } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '@/context/AppContext';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import { ExplorerStyle } from '@/types';
import ScreenHeader from '@/components/ScreenHeader';
import PrimaryButton from '@/components/PrimaryButton';

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

export default function EditProfileScreen() {
  const { userProfile, completeOnboarding } = useApp();
  const navigation = useNavigation<any>();
  const [name, setName] = useState(userProfile.name);
  const [selectedStyle, setSelectedStyle] = useState<ExplorerStyle | undefined>(userProfile.explorerStyle);

  const handleSave = () => {
    completeOnboarding({
      name: name.trim() || userProfile.name,
      explorerStyle: selectedStyle,
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
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
  optionIconImg: { width: 22, height: 22 },
  optionLabel: { ...typography.labelSemiBold, color: colors.textSecondary, textAlign: 'center' },
  optionLabelActive: { color: colors.textInverse },

  saveBtn: { marginTop: spacing.md },
});
