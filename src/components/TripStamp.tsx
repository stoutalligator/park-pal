import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, typography } from '@/theme';
import { Trip } from '@/types';
import { getParkById } from '@/data/parks';
import { getParkImage } from '@/data/parkImages';
import { parseLocalDate } from '@/utils/dates';

// Rotates through the palette so consecutive stamps don't share ink color,
// evoking different checkpoint stamps rather than one uniform badge.
export const STAMP_INK_COLORS = [colors.primary, colors.orange, colors.sage, colors.rose, colors.brown];

function formatStampDate(dateStr: string): string {
  const d = parseLocalDate(dateStr);
  return d
    .toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
    .toUpperCase();
}

// Deterministic pseudo-rotation per trip so each stamp looks hand-pressed
// but stays stable across re-renders instead of jittering on every render.
function stampRotation(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return (hash % 13) - 6;
}

interface Props {
  trip: Trip;
  ink: string;
  // Diameter of the round stamp; the passport uses the default.
  size?: number;
  // The recap card already names the park in its title.
  hideName?: boolean;
}

export default function TripStamp({ trip, ink, size = 76, hideName = false }: Props) {
  const park = getParkById(trip.parkId);
  if (!park) return null;
  const rotation = stampRotation(trip.id);
  return (
    <View style={[styles.stamp, { transform: [{ rotate: `${rotation}deg` }] }]}>
      <View style={[styles.stampRing, { width: size, height: size, borderRadius: size / 2, borderColor: ink }]}>
        <Image source={getParkImage(park.id)} style={styles.stampImage} resizeMode="cover" />
      </View>
      <Text style={[styles.stampDate, { color: ink }]}>{formatStampDate(trip.startDate)}</Text>
      {hideName ? null : (
        <Text style={styles.stampName} numberOfLines={2}>
          {park.name}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  stamp: { alignItems: 'center', gap: 2, width: '100%' },
  stampRing: {
    borderWidth: 2.5,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  // The source art is a circular badge inset on a white square canvas — the
  // badge itself only spans ~66% of the canvas width (measured directly off
  // the PNGs) — so the image is oversized ~1/0.66 and clipped by the ring's
  // overflow:hidden to crop that built-in white margin away entirely.
  stampImage: { width: '160%', height: '160%' },
  stampDate: { ...typography.caption, fontSize: 10, letterSpacing: 0.5, marginTop: 4 },
  stampName: { ...typography.labelSmall, color: colors.textPrimary, textAlign: 'center' },
});
