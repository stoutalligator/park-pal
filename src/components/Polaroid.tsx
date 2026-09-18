import React from 'react';
import { View, Image, StyleSheet, ImageStyle, StyleProp } from 'react-native';
import { colors, radius, shadows } from '@/theme';

// A little washi-tape variety across stacks/photos so the album doesn't feel
// monochrome — cycles deterministically by index rather than randomly, so a
// given trip/photo always gets the same color across re-renders.
const TAPE_COLORS = [colors.tan, colors.sky, colors.rose, colors.orange, colors.sage];
export function tapeColorForIndex(index: number): string {
  return TAPE_COLORS[index % TAPE_COLORS.length];
}

interface Props {
  uri: string;
  size: number;
  tapeColor?: string;
  rotate?: number;
  variant?: 'stack' | 'page';
  style?: StyleProp<ImageStyle>;
}

export default function Polaroid({ uri, size, tapeColor = colors.tan, rotate = 0, variant = 'page', style }: Props) {
  const framePad = variant === 'stack' ? size * 0.05 : size * 0.045;
  const bottomStrip = variant === 'stack' ? size * 0.14 : size * 0.16;
  const tapeWidth = size * 0.42;
  const tapeHeight = tapeWidth * 0.34;

  return (
    <View
      style={[
        {
          width: size,
          paddingTop: framePad,
          paddingHorizontal: framePad,
          paddingBottom: framePad + bottomStrip,
          transform: [{ rotate: `${rotate}deg` }],
        },
        styles.frame,
        style,
      ]}
    >
      <Image source={{ uri }} style={styles.photo} resizeMode="cover" />
      <View
        style={[
          styles.tape,
          {
            width: tapeWidth,
            height: tapeHeight,
            top: -tapeHeight * 0.45,
            marginLeft: -tapeWidth / 2,
            backgroundColor: tapeColor,
            transform: [{ rotate: `${rotate < 0 ? 4 : -4}deg` }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    ...shadows.md,
  },
  tape: {
    position: 'absolute',
    left: '50%',
    borderRadius: 2,
    opacity: 0.88,
  },
  photo: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 2,
    backgroundColor: colors.surfaceWarm,
  },
});
