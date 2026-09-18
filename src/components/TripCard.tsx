import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Rect, Circle } from 'react-native-svg';
import { colors, radius, spacing, shadows, typography } from '@/theme';
import { Trip } from '@/types';
import { getParkById } from '@/data/parks';
import { getParkImage } from '@/data/parkImages';
import { formatDateRange, daysUntilLabel } from '@/utils/dates';

interface Props {
  trip: Trip;
  onPress: () => void;
}

function PhotoIcon({ size = 18, color = colors.textMuted }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect x={2.5} y={5.5} width={19} height={14} rx={2.5} fill="none" stroke={color} strokeWidth={1.8} />
      <Circle cx={12} cy={12.5} r={3.4} fill="none" stroke={color} strokeWidth={1.8} />
      <Rect x={8.5} y={3} width={7} height={3} rx={1} fill={color} />
    </Svg>
  );
}

export default function TripCard({ trip, onPress }: Props) {
  const park = getParkById(trip.parkId);
  const planned = trip.tripType === 'planned';
  const hasPhotos = trip.photos.length > 0;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={[styles.card, planned && styles.cardPlanned]}>
      <View style={styles.imageBox}>
        <Image source={getParkImage(trip.parkId)} style={styles.parkIcon} resizeMode="cover" />
      </View>
      <View style={styles.content}>
        <Text style={styles.parkName} numberOfLines={1}>{park?.name ?? 'Unknown Park'}</Text>
        <Text style={styles.dates}>{formatDateRange(trip.startDate, trip.endDate)}</Text>
        {planned ? (
          <Text style={styles.daysUntil}>{daysUntilLabel(trip.startDate)}</Text>
        ) : trip.notes ? (
          <Text style={styles.notes} numberOfLines={1}>{trip.notes}</Text>
        ) : null}
      </View>
      {hasPhotos && <PhotoIcon />}
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    gap: spacing.md,
    ...shadows.sm,
  },
  cardPlanned: {
    borderLeftWidth: 3,
    borderLeftColor: colors.sky,
  },
  imageBox: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceWarm,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  parkIcon: {
    width: 56,
    height: 56,
  },
  content: {
    flex: 1,
    gap: 3,
  },
  parkName: {
    ...typography.labelBold,
    color: colors.textPrimary,
  },
  dates: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  notes: {
    ...typography.caption,
    color: colors.textMuted,
  },
  daysUntil: {
    ...typography.labelSmall,
    color: colors.sky,
  },
  chevron: {
    fontSize: 22,
    color: colors.textMuted,
  },
});
