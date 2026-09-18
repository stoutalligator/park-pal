import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Path, Line, Polyline } from 'react-native-svg';
import { colors, spacing, radius, typography } from '@/theme';
import { isVolatileTag, verificationStatus, formatVerified, VerificationStatus } from '@/data/verification';

interface Props {
  lastVerified?: string;
  tags: string[];
}

type VisibleStatus = Exclude<VerificationStatus, 'none'>;

const STATUS_COLOR: Record<VisibleStatus, string> = {
  fresh: colors.sage,
  aging: colors.tan,
  stale: colors.orange,
  unverified: colors.orange,
};

function StatusIcon({ status }: { status: VisibleStatus }) {
  const color = STATUS_COLOR[status];
  if (status === 'fresh') {
    return (
      <Svg width={16} height={16} viewBox="0 0 16 16">
        <Circle cx={8} cy={8} r={7} fill="none" stroke={color} strokeWidth={1.6} />
        <Polyline points="4.8,8.2 7,10.4 11.2,5.8" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    );
  }
  if (status === 'aging') {
    return (
      <Svg width={16} height={16} viewBox="0 0 16 16">
        <Circle cx={8} cy={8} r={7} fill="none" stroke={color} strokeWidth={1.6} />
        <Path d="M8 4.4V8l2.4 1.6" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    );
  }
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16">
      <Circle cx={8} cy={8} r={7} fill="none" stroke={color} strokeWidth={1.6} />
      <Line x1={8} y1={4.6} x2={8} y2={8.8} stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Circle cx={8} cy={11.4} r={0.9} fill={color} />
    </Svg>
  );
}

function statusText(status: VisibleStatus, lastVerified?: string): string {
  const when = lastVerified ? formatVerified(lastVerified) : '';
  switch (status) {
    case 'fresh':
      return `Verified ${when}`;
    case 'aging':
      return `Verified ${when} · confirm before you go`;
    case 'stale':
      return `Last verified ${when} · may be out of date, check NPS.gov`;
    case 'unverified':
      return 'Not yet verified · check NPS.gov before you go';
  }
}

export default function VerifiedNote({ lastVerified, tags }: Props) {
  const status = verificationStatus(lastVerified, tags.some(isVolatileTag));
  if (status === 'none') return null;

  return (
    <View style={[styles.note, { borderColor: STATUS_COLOR[status] }]}>
      <StatusIcon status={status} />
      <Text style={styles.text}>{statusText(status, lastVerified)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  note: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing.xs,
    backgroundColor: colors.surfaceWarm,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    maxWidth: '100%',
  },
  text: { ...typography.caption, color: colors.textSecondary, flexShrink: 1 },
});
