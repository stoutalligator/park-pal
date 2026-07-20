import React, { useMemo, useState } from 'react';
import { View, Image, TouchableOpacity, ScrollView, StyleSheet, LayoutChangeEvent } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Svg, { Polyline, Polygon } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, shadows } from '@/theme';
import { Park, ParkStatus } from '@/types';
import { IMAGE_HEIGHT, CROP_TOP, CROPPED_WIDTH, CROPPED_HEIGHT, projectPark, resolveOverlaps } from '@/utils/mapProjection';
import { getParkImage } from '@/data/parkImages';

const MIN_ZOOM = 1;
const MAX_ZOOM = 2.5;

const PIN_SIZE = 26;
const BADGE_SIZE = 14;

const STAR_POINTS = '6,1 7.2,4.4 10.8,4.5 7.9,6.6 8.9,10.1 6,8 3.1,10.1 4.1,6.6 1.2,4.5 4.8,4.4';

const STATUS_BADGE: Record<ParkStatus, { bg: string; icon: 'check' | 'star' | 'none' }> = {
  visited: { bg: colors.visited, icon: 'check' },
  bucketList: { bg: colors.bucketList, icon: 'star' },
  planned: { bg: colors.planned, icon: 'none' },
  notVisited: { bg: colors.notVisited, icon: 'none' },
};

function StatusIcon({ icon }: { icon: 'check' | 'star' | 'none' }) {
  if (icon === 'check') {
    return (
      <Svg width={BADGE_SIZE * 0.6} height={BADGE_SIZE * 0.6} viewBox="0 0 12 12">
        <Polyline
          points="2,6 5,9 10,3"
          fill="none"
          stroke={colors.textInverse}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }
  if (icon === 'star') {
    return (
      <Svg width={BADGE_SIZE * 0.6} height={BADGE_SIZE * 0.6} viewBox="0 0 12 12">
        <Polygon points={STAR_POINTS} fill={colors.textInverse} />
      </Svg>
    );
  }
  return null;
}

interface PinProps {
  park: Park;
  x: number;
  y: number;
  onPress: () => void;
}

function Pin({ park, x, y, onPress }: PinProps) {
  const badge = STATUS_BADGE[park.status];
  return (
    <TouchableOpacity
      onPress={onPress}
      hitSlop={8}
      style={[styles.pin, { left: x - PIN_SIZE / 2, top: y - PIN_SIZE / 2 }]}
    >
      <View style={styles.pinImageClip}>
        <Image
          source={getParkImage(park.id)}
          style={styles.pinImage}
          resizeMode="cover"
        />
      </View>
      <View style={[styles.badge, { backgroundColor: badge.bg }]}>
        <StatusIcon icon={badge.icon} />
      </View>
    </TouchableOpacity>
  );
}

interface Props {
  parks: Park[];
  onPressPark: (parkId: string) => void;
}

export default function UsMap({ parks, onPressPark }: Props) {
  const [viewportHeight, setViewportHeight] = useState(0);

  const onLayout = (e: LayoutChangeEvent) => {
    setViewportHeight(e.nativeEvent.layout.height);
  };

  // Pinch-to-zoom is purely a presentational scale layered on top of the
  // existing fit-to-height map/pin layout below — it doesn't touch any of
  // that positioning math.
  const pinchScale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      const next = savedScale.value * e.scale;
      pinchScale.value = Math.min(Math.max(next, MIN_ZOOM), MAX_ZOOM);
    })
    .onEnd(() => {
      savedScale.value = pinchScale.value;
    });

  const zoomStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pinchScale.value }],
  }));

  // Scale so the map fills the available height exactly (no vertical
  // letterboxing or scrolling); width naturally overflows and is reached
  // by panning horizontally, since Alaska/the islands sit at its edges.
  const scale = viewportHeight > 0 ? viewportHeight / CROPPED_HEIGHT : 0;
  const displayWidth = CROPPED_WIDTH * scale;
  const imageDisplayHeight = IMAGE_HEIGHT * scale;
  const imageTopOffset = -(CROP_TOP * scale);

  const pins = useMemo(() => {
    const raw = parks.map((park) => {
      const { x, y } = projectPark(park.id, park.lat, park.lng, park.state);
      return { park, x: x * scale, y: y * scale };
    });
    return resolveOverlaps(raw, PIN_SIZE + 6);
  }, [parks, scale]);

  return (
    <GestureDetector gesture={pinchGesture}>
      <View style={styles.viewport} onLayout={onLayout}>
        {scale > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scroll}
            contentContainerStyle={{ width: displayWidth }}
          >
            <Animated.View style={[{ width: displayWidth, height: viewportHeight, overflow: 'hidden' }, zoomStyle]}>
              <Image
                source={require('@/assets/maps/us-map.png')}
                style={{ width: displayWidth, height: imageDisplayHeight, marginTop: imageTopOffset }}
                resizeMode="stretch"
              />
              {pins.map(({ park, x, y }) => (
                <Pin key={park.id} park={park} x={x} y={y} onPress={() => onPressPark(park.id)} />
              ))}
            </Animated.View>
          </ScrollView>
        )}
        <LinearGradient
          pointerEvents="none"
          colors={[colors.background, `${colors.background}00`]}
          style={styles.fadeTop}
        />
        <LinearGradient
          pointerEvents="none"
          colors={[`${colors.background}00`, colors.background]}
          style={styles.fadeBottom}
        />
      </View>
    </GestureDetector>
  );
}

const FADE_HEIGHT = 28;

const styles = StyleSheet.create({
  viewport: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  scroll: {
    flex: 1,
  },
  fadeTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: FADE_HEIGHT,
  },
  fadeBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: FADE_HEIGHT,
  },
  pin: {
    position: 'absolute',
    width: PIN_SIZE,
    height: PIN_SIZE,
    borderRadius: PIN_SIZE / 2,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  pinImageClip: {
    width: PIN_SIZE - 4,
    height: PIN_SIZE - 4,
    borderRadius: (PIN_SIZE - 4) / 2,
    overflow: 'hidden',
  },
  pinImage: {
    width: PIN_SIZE - 4,
    height: PIN_SIZE - 4,
    // Source park-icon art is a circular badge that only fills ~66% of its
    // square canvas (measured directly from the art); scale up so the badge
    // itself fills this circular clip edge-to-edge instead of leaving a
    // visible ring of the canvas background.
    transform: [{ scale: 1.55 }],
  },
  badge: {
    position: 'absolute',
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    borderRadius: BADGE_SIZE / 2,
    bottom: -3,
    right: -3,
    borderWidth: 1.5,
    borderColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
