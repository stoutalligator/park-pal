import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, radius, spacing, typography } from '@/theme';

interface Props {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
}

export default function SecondaryButton({ label, onPress, style }: Props) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.75} style={[styles.button, style]}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: radius.full,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing['3xl'],
  },
  label: {
    ...typography.labelBold,
    color: colors.primary,
    letterSpacing: 0.3,
  },
});
