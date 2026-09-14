import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors, spacing, radius, typography, shadows } from '@/theme';

interface Props {
  startDate: string;
  endDate: string;
  onChange: (startDate: string, endDate: string) => void;
}

const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTH_LABELS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  const d = direction === 'left' ? 'M9 3 5 7l4 4' : 'M5 3l4 4-4 4';
  return (
    <Svg width={14} height={14} viewBox="0 0 14 14">
      <Path d={d} fill="none" stroke={colors.textPrimary} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

// Renders inline, right inside its parent accordion's body — deliberately
// not a Modal. React Native Web's Modal portals to document.body, which
// escapes the phone-sized frame App.tsx boxes the web preview in, so a
// calendar overlay would visually blow out past the app's own edges. Inline
// content can never do that, and the outer accordion already provides the
// open/close affordance this needs.
export default function DateRangePicker({ startDate, endDate, onChange }: Props) {
  const [viewMonth, setViewMonth] = useState(() => {
    const base = startDate ? new Date(startDate) : new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  const handleDayPress = (key: string) => {
    if (!startDate || endDate) {
      onChange(key, '');
      return;
    }
    if (key < startDate) {
      onChange(key, '');
      return;
    }
    onChange(startDate, key);
  };

  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];

  const rangeEnd = endDate || startDate;

  return (
    <View>
      <View style={styles.monthHeader}>
        <TouchableOpacity
          hitSlop={10}
          onPress={() => setViewMonth(new Date(year, month - 1, 1))}
          style={styles.monthArrow}
        >
          <ArrowIcon direction="left" />
        </TouchableOpacity>
        <Text style={styles.monthLabel}>{MONTH_LABELS[month]} {year}</Text>
        <TouchableOpacity
          hitSlop={10}
          onPress={() => setViewMonth(new Date(year, month + 1, 1))}
          style={styles.monthArrow}
        >
          <ArrowIcon direction="right" />
        </TouchableOpacity>
      </View>

      <View style={styles.weekdayRow}>
        {WEEKDAY_LABELS.map((label, i) => (
          <Text key={i} style={styles.weekdayLabel}>{label}</Text>
        ))}
      </View>

      <View style={styles.grid}>
        {cells.map((date, i) => {
          if (!date) return <View key={i} style={styles.dayCell} />;
          const key = toDateKey(date);
          const isStart = key === startDate;
          const isEnd = key === rangeEnd;
          const inRange = !!startDate && key >= startDate && key <= rangeEnd;
          return (
            <TouchableOpacity
              key={i}
              style={[
                styles.dayCell,
                inRange ? styles.dayCellInRange : undefined,
                isStart && styles.dayCellStart,
                isEnd && !isStart && styles.dayCellEnd,
              ]}
              onPress={() => handleDayPress(key)}
              activeOpacity={0.75}
            >
              <Text style={[styles.dayText, (isStart || isEnd) && styles.dayTextSelected]}>
                {date.getDate()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  monthArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceWarm,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  monthLabel: { ...typography.labelBold, color: colors.textPrimary },

  weekdayRow: { flexDirection: 'row', marginBottom: spacing.sm },
  weekdayLabel: {
    width: `${100 / 7}%`,
    textAlign: 'center',
    ...typography.caption,
    color: colors.textMuted,
  },

  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCellInRange: { backgroundColor: `${colors.sage}33` },
  dayCellStart: { backgroundColor: colors.primary, borderRadius: radius.full },
  dayCellEnd: { backgroundColor: colors.primary, borderRadius: radius.full },
  dayText: { ...typography.bodySmall, color: colors.textPrimary },
  dayTextSelected: { color: colors.textInverse, fontFamily: typography.labelBold.fontFamily },
});
