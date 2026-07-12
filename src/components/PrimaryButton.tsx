import React from 'react';
import { TouchableOpacity, Text, Image, ImageSourcePropType, StyleSheet, ViewStyle } from 'react-native';
import { colors, radius, spacing, typography } from '@/theme';

interface Props {
  label: string;
  onPress: () => void;
  icon?: string | ImageSourcePropType;
  style?: ViewStyle;
  disabled?: boolean;
}

export default function PrimaryButton({ label, onPress, icon, style, disabled }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.82}
      style={[styles.button, disabled && styles.disabled, style]}
    >
      {typeof icon === 'string' ? (
        <Text style={styles.icon}>{icon}</Text>
      ) : icon ? (
        <Image source={icon} style={styles.iconImage} resizeMode="contain" />
      ) : null}
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing['3xl'],
    gap: spacing.sm,
  },
  disabled: {
    opacity: 0.5,
  },
  icon: {
    fontSize: 16,
  },
  iconImage: {
    width: 18,
    height: 18,
  },
  label: {
    ...typography.labelBold,
    color: colors.textInverse,
    letterSpacing: 0.3,
  },
});
