import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Polyline, Path } from 'react-native-svg';
import { colors, radius, spacing, shadows, typography } from '@/theme';
import { Park } from '@/types';
import { getParkImage } from '@/data/parkImages';
import StatusBadge from './StatusBadge';

interface Props {
  park: Park;
  onPress: () => void;
  onFavorite?: () => void;
  onToggleVisited?: () => void;
  onToggleBucketList?: () => void;
}

function CheckIcon({ color }: { color: string }) {
  return (
    <Svg width={14} height={14} viewBox="0 0 12 12">
      <Polyline points="2,6 5,9 10,3" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function BookmarkIcon({ color }: { color: string }) {
  return (
    <Svg width={14} height={14} viewBox="0 0 14 14">
      <Path d="M3 1.5h8a.5.5 0 0 1 .5.5v11l-4.5-2.6L2.5 13V2a.5.5 0 0 1 .5-.5Z" fill="none" stroke={color} strokeWidth={1.6} strokeLinejoin="round" />
    </Svg>
  );
}

export default function ParkCard({ park, onPress, onFavorite, onToggleVisited, onToggleBucketList }: Props) {
  const visited = park.status === 'visited';
  const bucketListed = park.status === 'bucketList';
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
      <View style={styles.actions}>
        <TouchableOpacity onPress={onFavorite} hitSlop={10} style={styles.actionBtn}>
          <Image
            source={require('@/assets/icons/icon-favorites.png')}
            style={[styles.heartIcon, !park.isFavorite && styles.heartIconInactive]}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onToggleVisited}
          hitSlop={10}
          style={[styles.actionBtn, styles.iconBtn, visited && styles.iconBtnVisitedActive]}
        >
          <CheckIcon color={visited ? colors.textInverse : colors.textMuted} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onToggleBucketList}
          hitSlop={10}
          style={[styles.actionBtn, styles.iconBtn, bucketListed && styles.iconBtnBucketActive]}
        >
          <BookmarkIcon color={bucketListed ? colors.textInverse : colors.textMuted} />
        </TouchableOpacity>
      </View>
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
  actions: {
    gap: spacing.xs,
    alignItems: 'center',
  },
  actionBtn: {
    padding: spacing.xs,
  },
  heartIcon: {
    width: 18,
    height: 18,
  },
  heartIconInactive: {
    opacity: 0.3,
  },
  iconBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  iconBtnVisitedActive: {
    backgroundColor: colors.visited,
    borderColor: colors.visited,
  },
  iconBtnBucketActive: {
    backgroundColor: colors.bucketList,
    borderColor: colors.bucketList,
  },
});
