import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
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
