import React from 'react';
import { TouchableOpacity, Text, Image, ImageSourcePropType, StyleSheet, ViewStyle, ActivityIndicator } from 'react-native';
import { colors, radius, spacing, typography } from '@/theme';

interface Props {
  label: string;
  onPress: () => void;
  icon?: string | ImageSourcePropType | React.ReactElement;
  style?: ViewStyle;
  disabled?: boolean;
  loading?: boolean;
}

export default function PrimaryButton({ label, onPress, icon, style, disabled, loading }: Props) {
  const inactive = disabled || loading;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={inactive}
      activeOpacity={0.82}
      style={[styles.button, disabled && styles.disabled, loading && styles.loading, style]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={colors.textInverse} />
      ) : typeof icon === 'string' ? (
        <Text style={styles.icon}>{icon}</Text>
      ) : React.isValidElement(icon) ? (
        icon
      ) : icon ? (
        <Image source={icon as ImageSourcePropType} style={styles.iconImage} resizeMode="contain" />
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
  loading: {
    opacity: 0.85,
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
