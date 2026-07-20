import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, radius, spacing, shadows, typography } from '@/theme';
import { Park } from '@/types';
import { getParkImage } from '@/data/parkImages';
import StatusBadge from './StatusBadge';

interface Props {
  park: Park;
  onPress: () => void;
  onFavorite?: () => void;
}

export default function ParkCard({ park, onPress, onFavorite }: Props) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={styles.card}>
      <View style={styles.imageBox}>
        <Image source={getParkImage(park.id)} style={styles.parkImage} resizeMode="cover" />
      </View>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{park.name}</Text>
        <Text style={styles.state} numberOfLines={1}>{park.state}</Text>
        <StatusBadge status={park.status} />
      </View>
      <TouchableOpacity onPress={onFavorite} hitSlop={12} style={styles.heart}>
        <Image
          source={require('@/assets/icons/icon-favorites.png')}
          style={[styles.heartIcon, !park.isFavorite && styles.heartIconInactive]}
          resizeMode="contain"
        />
      </TouchableOpacity>
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
  imageBox: {
    width: 60,
    height: 60,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceWarm,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  parkImage: {
    width: 60,
    height: 60,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  name: {
    ...typography.labelBold,
    color: colors.textPrimary,
  },
  state: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  heart: {
    padding: spacing.xs,
  },
  heartIcon: {
    width: 18,
    height: 18,
  },
  heartIconInactive: {
    opacity: 0.3,
  },
});
