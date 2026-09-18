import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, radius, typography } from '@/theme';
import Polaroid from '@/components/Polaroid';
import PrimaryButton from '@/components/PrimaryButton';

export const CAPTION_MAX_LENGTH = 80;

interface Props {
  visible: boolean;
  uri: string | null;
  caption: string;
  onSave: (caption: string) => void;
  onClose: () => void;
}

const PREVIEW_SIZE = 220;

export default function PhotoCaptionSheet({ visible, uri, caption, onSave, onClose }: Props) {
  const insets = useSafeAreaInsets();
  const [draft, setDraft] = useState(caption);

  useEffect(() => {
    if (visible) setDraft(caption);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (!visible || !uri) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={onClose} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={[styles.sheet, { paddingBottom: spacing.xl + insets.bottom }]}>
          <Text style={styles.title}>Add a caption</Text>
          <Text style={styles.subtitle}>It's written under the photo in your album.</Text>

          <View style={styles.preview}>
            <Polaroid uri={uri} size={PREVIEW_SIZE} variant="page" rotate={-2} caption={draft.trim()} />
          </View>

          <TextInput
            style={styles.input}
            value={draft}
            onChangeText={setDraft}
            placeholder="Sunrise from the summit"
            placeholderTextColor={colors.textMuted}
            maxLength={CAPTION_MAX_LENGTH}
            autoFocus
          />
          <Text style={styles.counter}>
            {draft.length}/{CAPTION_MAX_LENGTH}
          </Text>

          <PrimaryButton label="Save caption" onPress={() => onSave(draft.trim())} />
          <TouchableOpacity onPress={onClose} style={styles.cancel} hitSlop={8}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
    zIndex: 10,
  },
  sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: radius['2xl'],
    borderTopRightRadius: radius['2xl'],
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  title: { ...typography.h5, color: colors.textPrimary },
  subtitle: { ...typography.bodySmall, color: colors.textSecondary, marginTop: -spacing.sm },
  preview: { alignItems: 'center', paddingVertical: spacing.md },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    ...typography.body,
    color: colors.textPrimary,
  },
  counter: { ...typography.caption, color: colors.textMuted, textAlign: 'right', marginTop: -spacing.sm },
  cancel: { alignSelf: 'center', paddingVertical: spacing.xs },
  cancelText: { ...typography.labelSemiBold, color: colors.textSecondary },
});
