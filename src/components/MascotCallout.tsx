import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius, spacing, typography, shadows } from '@/theme';

interface Props {
  message: string;
  size?: 'sm' | 'lg';
}

export default function MascotCallout({ message, size = 'sm' }: Props) {
  return (
    <View style={styles.row}>
      <Text style={size === 'lg' ? styles.bearLg : styles.bearSm}>🐻</Text>
      <View style={styles.bubble}>
        <Text style={styles.text}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  bearSm: {
    fontSize: 32,
  },
  bearLg: {
    fontSize: 52,
  },
  bubble: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderBottomLeftRadius: 4,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    maxWidth: 220,
    ...shadows.sm,
  },
  text: {
    ...typography.bodySmall,
    color: colors.textPrimary,
  },
});
