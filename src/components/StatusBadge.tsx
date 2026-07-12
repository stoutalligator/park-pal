import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius, spacing, typography } from '@/theme';
import { ParkStatus } from '@/types';

const CONFIG: Record<ParkStatus, { label: string; bg: string; text: string; icon: string }> = {
  visited: { label: 'Visited', bg: colors.primary, text: colors.textInverse, icon: '✓' },
  bucketList: { label: 'Bucket List', bg: '#FFF3E8', text: colors.orange, icon: '⭐' },
  planned: { label: 'Planned', bg: '#E8F4F8', text: '#4A7D8C', icon: '📅' },
  notVisited: { label: 'Not Visited', bg: colors.divider, text: colors.textMuted, icon: '' },
};

interface Props {
  status: ParkStatus;
}

export default function StatusBadge({ status }: Props) {
  const cfg = CONFIG[status];
  return (
    <View style={[styles.badge, { backgroundColor: cfg.bg }]}>
      {cfg.icon ? <Text style={styles.icon}>{cfg.icon}</Text> : null}
      <Text style={[styles.label, { color: cfg.text }]}>{cfg.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    alignSelf: 'flex-start',
  },
  icon: {
    fontSize: 11,
  },
  label: {
    ...typography.labelSmall,
    fontSize: 11,
  },
});
