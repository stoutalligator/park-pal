import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors, typography } from '@/theme';

interface Props {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  /** Overrides for use on a dark/colored background (e.g. the passport cover) — default to the normal light-background look. */
  trackColor?: string;
  fillColor?: string;
  textColor?: string;
}

export default function ProgressRing({
  percentage,
  size = 72,
  strokeWidth = 7,
  trackColor = colors.border,
  fillColor = colors.primary,
  textColor = colors.textPrimary,
}: Props) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={fillColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={[StyleSheet.absoluteFill, styles.center]}>
        <Text style={[styles.pct, { color: textColor }]}>{percentage}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pct: {
    ...typography.labelBold,
    color: colors.textPrimary,
    fontSize: 13,
  },
});
