import React, { useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, LayoutChangeEvent, PanResponder } from 'react-native';
import Svg, { Polygon, Polyline, Circle, Line } from 'react-native-svg';
import { colors, spacing, radius, typography } from '@/theme';
import { ElevationPoint, Units } from '@/types';
import { formatDistance, formatElevation } from '@/utils/units';

interface Props {
  profile: ElevationPoint[];
  units: Units;
}

const CHART_HEIGHT = 140;
const TOP_PAD = 16;
const BOTTOM_PAD = 8;

function interpolateElevation(profile: ElevationPoint[], mile: number): { elevationFt: number; label?: string } {
  if (mile <= profile[0].mile) return profile[0];
  const last = profile[profile.length - 1];
  if (mile >= last.mile) return last;
  for (let i = 0; i < profile.length - 1; i++) {
    const a = profile[i];
    const b = profile[i + 1];
    if (mile >= a.mile && mile <= b.mile) {
      const t = b.mile === a.mile ? 0 : (mile - a.mile) / (b.mile - a.mile);
      const elevationFt = a.elevationFt + (b.elevationFt - a.elevationFt) * t;
      const nearest = t < 0.5 ? a : b;
      const label = Math.abs(mile - nearest.mile) < (b.mile - a.mile) * 0.15 ? nearest.label : undefined;
      return { elevationFt, label };
    }
  }
  return last;
}

export default function ElevationProfileChart({ profile, units }: Props) {
  const [width, setWidth] = useState(0);
  const [dragMile, setDragMile] = useState<number | null>(null);
  const widthRef = useRef(0);

  const maxMile = profile[profile.length - 1].mile;
  const maxElevation = Math.max(...profile.map((p) => p.elevationFt), 1);

  const toX = (mile: number) => (width <= 0 ? 0 : (mile / maxMile) * width);
  const toY = (elevationFt: number) =>
    TOP_PAD + (1 - elevationFt / maxElevation) * (CHART_HEIGHT - TOP_PAD - BOTTOM_PAD);

  const linePoints = useMemo(
    () => profile.map((p) => `${toX(p.mile)},${toY(p.elevationFt)}`).join(' '),
    [profile, width, maxMile, maxElevation]
  );
  const fillPoints = `${toX(0)},${CHART_HEIGHT} ${linePoints} ${toX(maxMile)},${CHART_HEIGHT}`;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => updateFromTouch(e.nativeEvent.locationX),
      onPanResponderMove: (e) => updateFromTouch(e.nativeEvent.locationX),
      onPanResponderRelease: () => {},
    })
  ).current;

  function updateFromTouch(x: number) {
    if (widthRef.current <= 0) return;
    const clampedX = Math.max(0, Math.min(widthRef.current, x));
    const mile = (clampedX / widthRef.current) * maxMile;
    setDragMile(mile);
  }

  function onLayout(e: LayoutChangeEvent) {
    const w = e.nativeEvent.layout.width;
    widthRef.current = w;
    setWidth(w);
  }

  const activeMile = dragMile ?? profile[0].mile;
  const activePoint = interpolateElevation(profile, activeMile);
  const handleX = toX(activeMile);
  const handleY = toY(activePoint.elevationFt);

  return (
    <View style={styles.wrap}>
      <View style={styles.readoutRow}>
        <Text style={styles.readoutValue}>{formatDistance(activeMile, units)}</Text>
        <Text style={styles.readoutDivider}>·</Text>
        <Text style={styles.readoutValue}>{formatElevation(activePoint.elevationFt, units)}</Text>
        {activePoint.label ? <Text style={styles.readoutLabel} numberOfLines={1}>{activePoint.label}</Text> : null}
      </View>
      <View style={styles.chartArea} onLayout={onLayout} {...panResponder.panHandlers}>
        {width > 0 && (
          <Svg width={width} height={CHART_HEIGHT}>
            <Polygon points={fillPoints} fill={colors.sage} fillOpacity={0.18} />
            <Polyline points={linePoints} fill="none" stroke={colors.primary} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
            {profile
              .filter((p) => p.label)
              .map((p) => (
                <Circle key={p.mile} cx={toX(p.mile)} cy={toY(p.elevationFt)} r={3} fill={colors.brown} />
              ))}
            <Line x1={handleX} y1={TOP_PAD - 4} x2={handleX} y2={CHART_HEIGHT - BOTTOM_PAD} stroke={colors.orange} strokeWidth={1.5} strokeDasharray="3,3" />
            <Circle cx={handleX} cy={handleY} r={7} fill={colors.orange} stroke={colors.surface} strokeWidth={2} />
          </Svg>
        )}
      </View>
      <Text style={styles.dragHint}>Drag along the trail to explore elevation</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: colors.surfaceWarm, borderRadius: radius.lg, padding: spacing.md, gap: spacing.xs },
  readoutRow: { flexDirection: 'row', alignItems: 'baseline', gap: spacing.xs },
  readoutValue: { ...typography.labelBold, color: colors.textPrimary, fontSize: 16 },
  readoutDivider: { color: colors.textMuted },
  readoutLabel: { ...typography.bodySmall, color: colors.textSecondary, flexShrink: 1, marginLeft: spacing.xs },
  chartArea: { height: CHART_HEIGHT, width: '100%' },
  dragHint: { ...typography.caption, color: colors.textMuted, textAlign: 'center' },
});
