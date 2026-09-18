import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { useApp } from '@/context/AppContext';
import { colors, spacing, radius, shadows, typography } from '@/theme';

function CloudIcon() {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24">
      <Path
        d="M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 8.5a4 4 0 0 1-.5 9.5z"
        fill="none"
        stroke={colors.brownDark}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// A small, calm pill that tells people their changes are safe on the device
// while they're offline or still sending. Shown only while there's something
// to say, and never blocks touches.
export default function SyncBanner() {
  const { isOffline, pendingChangeCount } = useApp();
  const insets = useSafeAreaInsets();

  if (!isOffline && pendingChangeCount === 0) return null;

  const waiting = pendingChangeCount > 0 ? `${pendingChangeCount} change${pendingChangeCount === 1 ? '' : 's'} waiting` : '';
  const text = isOffline
    ? waiting
      ? `Offline · ${waiting} to sync`
      : 'Offline · changes are saved on this device'
    : `Syncing ${waiting.replace(' waiting', '')}...`;

  return (
    <View pointerEvents="none" style={[styles.wrapper, { top: insets.top + spacing.xs }]}>
      <View style={styles.pill}>
        <CloudIcon />
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 900,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.cream,
    borderRadius: radius.full,
    paddingVertical: 4,
    paddingHorizontal: spacing.md,
    ...shadows.sm,
  },
  text: { ...typography.caption, color: colors.brownDark },
});
