import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Svg, { Polygon, Rect, Line, Circle } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import ScreenHeader from '@/components/ScreenHeader';

function BootIcon({ color }: { color: string }) {
  return (
    <Svg width={32} height={32} viewBox="0 0 24 24">
      <Polygon points="4,3 11,3 11,9 19,9 19,12 22,12 22,17 4,17" fill={color} />
    </Svg>
  );
}

function CalendarIcon({ color }: { color: string }) {
  return (
    <Svg width={32} height={32} viewBox="0 0 24 24">
      <Rect x={3} y={5} width={18} height={16} rx={2.5} fill="none" stroke={color} strokeWidth={1.8} />
      <Line x1={3} y1={10} x2={21} y2={10} stroke={color} strokeWidth={1.8} />
      <Line x1={7.5} y1={2.5} x2={7.5} y2={6.5} stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Line x1={16.5} y1={2.5} x2={16.5} y2={6.5} stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Circle cx={8.5} cy={14} r={1.3} fill={color} />
      <Circle cx={13} cy={14} r={1.3} fill={color} />
      <Circle cx={8.5} cy={17.5} r={1.3} fill={color} />
    </Svg>
  );
}

interface ChoiceCardProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  subtitle: string;
  onPress: () => void;
}

function ChoiceCard({ icon, iconBg, title, subtitle, onPress }: ChoiceCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={[styles.iconCircle, { backgroundColor: iconBg }]}>{icon}</View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
}

export default function TripChooserScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="New Adventure" onBack={() => navigation.goBack()} />
      <View style={styles.cards}>
        <ChoiceCard
          icon={<BootIcon color={colors.primary} />}
          iconBg={colors.surfaceWarm}
          title="Log a Trip"
          subtitle="Record a trip you've already taken"
          onPress={() => navigation.navigate('LogTripForm', { initialTripType: 'logged' })}
        />
        <ChoiceCard
          icon={<CalendarIcon color={colors.sky} />}
          iconBg={colors.surfaceWarm}
          title="Plan a Trip"
          subtitle="Save the dates for a trip you're dreaming up"
          onPress={() => navigation.navigate('LogTripForm', { initialTripType: 'planned' })}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  cards: { paddingHorizontal: spacing.xl, paddingTop: spacing['3xl'], gap: spacing.xl },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing['2xl'],
    alignItems: 'center',
    ...shadows.md,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  cardTitle: { ...typography.h4, color: colors.textPrimary, marginBottom: spacing.xs },
  cardSubtitle: { ...typography.bodySmall, color: colors.textSecondary, textAlign: 'center' },
});
