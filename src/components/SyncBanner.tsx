import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { useApp } from '@/context/AppContext';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import PrimaryButton from '@/components/PrimaryButton';

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

// "No connection" just means it's waiting its turn; anything else is the
// server refusing the change, which the person should be able to see.
const isProblem = (error?: string) => !!error && !error.startsWith('No connection');

// A small, calm pill that tells people their changes are safe on the device
// while they're offline or still sending. Tap it to see exactly what is
// waiting, why, and to retry.
export default function SyncBanner() {
  const { isOffline, pendingChangeCount, pendingChanges, retrySync } = useApp();
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    if (pendingChangeCount === 0) setOpen(false);
  }, [pendingChangeCount]);

  if (!isOffline && pendingChangeCount === 0) return null;

  const problems = pendingChanges.filter((c) => isProblem(c.error)).length;
  const plural = (n: number) => `${n} change${n === 1 ? '' : 's'}`;
  const text =
    problems > 0
      ? `${plural(problems)} couldn't sync · tap for details`
      : isOffline
        ? pendingChangeCount > 0
          ? `Offline · ${plural(pendingChangeCount)} waiting to sync`
          : 'Offline · changes are saved on this device'
        : `Syncing ${plural(pendingChangeCount)}...`;

  const retry = async () => {
    setRetrying(true);
    try {
      await retrySync();
    } finally {
      setRetrying(false);
    }
  };

  return (
    <>
      <View pointerEvents="box-none" style={[styles.wrapper, { top: insets.top + spacing.xs }]}>
        <TouchableOpacity
          style={[styles.pill, problems > 0 && styles.pillProblem]}
          activeOpacity={0.8}
          disabled={pendingChangeCount === 0}
          onPress={() => setOpen(true)}
        >
          <CloudIcon />
          <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
      </View>

      {open && (
        <View style={styles.overlay}>
          <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={() => setOpen(false)} />
          <View style={[styles.sheet, { paddingBottom: spacing.xl + insets.bottom }]}>
            <Text style={styles.title}>Waiting to sync</Text>
            <Text style={styles.subtitle}>
              {isOffline
                ? "You're offline. These are saved on this device and will send when you reconnect."
                : 'These are saved on this device and sending now. If something stays here, try again.'}
            </Text>

            <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
              {pendingChanges.map((change) => (
                <View key={change.id} style={styles.row}>
                  <Text style={styles.rowTitle}>{change.title}</Text>
                  {change.detail ? <Text style={styles.rowDetail}>{change.detail}</Text> : null}
                  {change.error ? (
                    <Text style={[styles.rowError, isProblem(change.error) && styles.rowErrorProblem]}>
                      {change.error}
                    </Text>
                  ) : null}
                </View>
              ))}
            </ScrollView>

            <PrimaryButton label={retrying ? 'Trying...' : 'Try again now'} onPress={retry} loading={retrying} />
            <TouchableOpacity onPress={() => setOpen(false)} style={styles.close} hitSlop={8}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
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
    borderWidth: 1,
    borderColor: colors.cream,
    paddingVertical: 4,
    paddingHorizontal: spacing.md,
    ...shadows.sm,
  },
  pillProblem: { borderColor: colors.orange },
  text: { ...typography.caption, color: colors.brownDark },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
    zIndex: 950,
  },
  sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: radius['2xl'],
    borderTopRightRadius: radius['2xl'],
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
    maxHeight: '75%',
  },
  title: { ...typography.h5, color: colors.textPrimary },
  subtitle: { ...typography.bodySmall, color: colors.textSecondary, marginTop: -spacing.sm },
  list: { flexGrow: 0 },
  row: {
    backgroundColor: colors.surfaceWarm,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    gap: 2,
  },
  rowTitle: { ...typography.labelBold, color: colors.textPrimary },
  rowDetail: { ...typography.bodySmall, color: colors.textSecondary },
  rowError: { ...typography.caption, color: colors.textMuted, marginTop: 2 },
  rowErrorProblem: { color: colors.orange },
  close: { alignSelf: 'center', paddingVertical: spacing.xs },
  closeText: { ...typography.labelSemiBold, color: colors.textSecondary },
});
