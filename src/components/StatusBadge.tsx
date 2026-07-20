import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';
import { colors, radius, spacing, typography } from '@/theme';
import { ParkStatus } from '@/types';

const CONFIG: Record<ParkStatus, { label: string; bg: string; text: string }> = {
  visited: { label: 'Visited', bg: colors.primary, text: colors.textInverse },
  bucketList: { label: 'Bucket List', bg: colors.surfaceWarm, text: colors.orange },
  planned: { label: 'Planned', bg: colors.surfaceWarm, text: colors.sky },
  notVisited: { label: 'Not Visited', bg: colors.divider, text: colors.textMuted },
};

interface Props {
  status: ParkStatus;
  /** Larger, uppercase pill with a checkmark for visited — used on the Park Detail header. */
  detail?: boolean;
}

export default function StatusBadge({ status, detail }: Props) {
  const cfg = CONFIG[status];
  return (
    <View style={[styles.badge, detail && styles.badgeDetail, { backgroundColor: cfg.bg }]}>
      {detail && status === 'visited' && (
        <Svg width={11} height={11} viewBox="0 0 12 12">
          <Polyline
            points="2,6 5,9 10,3"
            fill="none"
            stroke={cfg.text}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      )}
      <Text style={[styles.label, detail && styles.labelDetail, { color: cfg.text }]}>
        {detail ? cfg.label.toUpperCase() : cfg.label}
      </Text>
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
  badgeDetail: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm - 2,
  },
  label: {
    ...typography.labelSmall,
    fontSize: 11,
  },
  labelDetail: {
    letterSpacing: 0.4,
  },
});
