import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Sharing from 'expo-sharing';
import { captureRef } from 'react-native-view-shot';
import { useApp } from '@/context/AppContext';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import { Trip } from '@/types';
import { captureException } from '@/lib/sentry';
import PrimaryButton from '@/components/PrimaryButton';
import RecapCard, { RECAP_CARD_WIDTH, RECAP_CARD_HEIGHT } from '@/components/RecapCard';
import { showToast } from '@/components/Toast';

// Output size of the shared picture: the card's 4:5 layout at 3x.
const EXPORT_WIDTH = 1080;
const EXPORT_HEIGHT = 1350;

interface Props {
  visible: boolean;
  trip: Trip;
  onClose: () => void;
}

// Shows the recap card scaled to fit the screen, then turns it into a picture
// and hands it to the phone's share sheet (Messages, Instagram, Save Image...).
export default function RecapPreview({ visible, trip, onClose }: Props) {
  const { userProfile } = useApp();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const cardRef = useRef<View>(null);
  const [photosReady, setPhotosReady] = useState(false);
  const [sharing, setSharing] = useState(false);

  if (!visible) return null;

  const scale = Math.min(1, (width - spacing.xl * 2) / RECAP_CARD_WIDTH);
  const shownWidth = RECAP_CARD_WIDTH * scale;
  const shownHeight = RECAP_CARD_HEIGHT * scale;

  const share = async () => {
    if (!cardRef.current) return;
    setSharing(true);
    try {
      const uri = await captureRef(cardRef, {
        format: 'png',
        quality: 1,
        result: 'tmpfile',
        width: EXPORT_WIDTH,
        height: EXPORT_HEIGHT,
      });
      if (!(await Sharing.isAvailableAsync())) {
        showToast("Sharing isn't available on this device.", 'error');
        return;
      }
      await Sharing.shareAsync(uri, { mimeType: 'image/png', dialogTitle: 'Share your trip', UTI: 'public.png' });
    } catch (error) {
      console.error('Failed to share the recap:', error);
      captureException(error, { action: 'share recap' });
      showToast("Couldn't create your recap picture. Please try again.", 'error');
    } finally {
      setSharing(false);
    }
  };

  const close = () => {
    setPhotosReady(false);
    onClose();
  };

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={close} />
      <View style={[styles.content, { paddingTop: insets.top + spacing.xl, paddingBottom: insets.bottom + spacing.xl }]}>
        <Text style={styles.heading}>Your trip recap</Text>

        <View style={[styles.cardFrame, { width: shownWidth, height: shownHeight }]}>
          {/* Scaled about its center, then shifted back to the frame's corner,
              so the card lays out at its true size (and is captured at it). */}
          <View
            style={{
              width: RECAP_CARD_WIDTH,
              height: RECAP_CARD_HEIGHT,
              transform: [
                { translateX: -(RECAP_CARD_WIDTH - shownWidth) / 2 },
                { translateY: -(RECAP_CARD_HEIGHT - shownHeight) / 2 },
                { scale },
              ],
            }}
          >
            <RecapCard ref={cardRef} trip={trip} units={userProfile.units} onPhotosLoaded={() => setPhotosReady(true)} />
          </View>
        </View>

        <View style={styles.actions}>
          <PrimaryButton
            label={photosReady ? 'SHARE' : 'LOADING PHOTOS...'}
            onPress={share}
            disabled={!photosReady}
            loading={sharing}
          />
          <TouchableOpacity onPress={close} style={styles.close} hitSlop={8}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    zIndex: 20,
  },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.lg, paddingHorizontal: spacing.xl },
  heading: { ...typography.h4, color: colors.textInverse },
  cardFrame: { overflow: 'hidden', borderRadius: radius.md, ...shadows.lg },
  actions: { width: '100%', gap: spacing.sm },
  close: { alignSelf: 'center', paddingVertical: spacing.xs },
  closeText: { ...typography.labelSemiBold, color: colors.textInverse },
});
