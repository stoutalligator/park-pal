import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Line } from 'react-native-svg';
import { colors, radius, shadows, spacing, typography } from '@/theme';

type ToastVariant = 'error' | 'success';

interface ToastState {
  id: number;
  message: string;
  variant: ToastVariant;
}

// Imperative module-level API so any code — including plain async functions
// in AppContext.tsx that aren't components/hooks — can trigger a toast
// without needing to be inside a provider's render tree.
let currentSetter: ((toast: ToastState) => void) | null = null;
let nextId = 0;

export function showToast(message: string, variant: ToastVariant = 'error') {
  nextId += 1;
  currentSetter?.({ id: nextId, message, variant });
}

function CheckCircleIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18">
      <Circle cx={9} cy={9} r={8} fill="none" stroke={colors.textInverse} strokeWidth={1.6} />
      <Path d="M5.5 9.2 7.8 11.5 12.5 6.5" fill="none" stroke={colors.textInverse} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function AlertIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18">
      <Circle cx={9} cy={9} r={8} fill="none" stroke={colors.textInverse} strokeWidth={1.6} />
      <Line x1={9} y1={5.2} x2={9} y2={10} stroke={colors.textInverse} strokeWidth={1.8} strokeLinecap="round" />
      <Circle cx={9} cy={12.6} r={1} fill={colors.textInverse} />
    </Svg>
  );
}

const AUTO_DISMISS_MS = 4000;

export function ToastHost() {
  const insets = useSafeAreaInsets();
  const [toast, setToast] = useState<ToastState | null>(null);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-12)).current;
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = useCallback(() => {
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
    Animated.parallel([
      Animated.timing(opacity, { toValue: 0, duration: 180, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: -12, duration: 180, useNativeDriver: true }),
    ]).start(() => setToast(null));
  }, [opacity, translateY]);

  useEffect(() => {
    currentSetter = (next) => {
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
      setToast(next);
      opacity.setValue(0);
      translateY.setValue(-12);
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 220, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 0, duration: 220, useNativeDriver: true }),
      ]).start();
      dismissTimer.current = setTimeout(dismiss, AUTO_DISMISS_MS);
    };
    return () => {
      currentSetter = null;
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
    };
  }, [dismiss, opacity, translateY]);

  if (!toast) return null;

  const isError = toast.variant === 'error';

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[styles.wrapper, { top: insets.top + spacing.sm, opacity, transform: [{ translateY }] }]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={dismiss}
        style={[styles.toast, { backgroundColor: isError ? colors.rose : colors.primary }]}
      >
        {isError ? <AlertIcon /> : <CheckCircleIcon />}
        <Text style={styles.message} numberOfLines={2}>{toast.message}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    zIndex: 1000,
    alignItems: 'center',
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
    width: '100%',
    ...shadows.lg,
  },
  message: {
    ...typography.labelSemiBold,
    color: colors.textInverse,
    flex: 1,
  },
});
