import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '@/context/AppContext';
import { colors, spacing, typography } from '@/theme';
import { Units } from '@/types';
import ScreenHeader from '@/components/ScreenHeader';
import SegmentedToggle from '@/components/SegmentedToggle';

const UNIT_OPTIONS: Units[] = ['mi', 'km'];

export default function UnitsScreen() {
  const { userProfile, updateUnits } = useApp();
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Units" onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <Text style={styles.label}>Distance &amp; Elevation</Text>
        <SegmentedToggle options={UNIT_OPTIONS} value={userProfile.units} onChange={updateUnits} />
        <Text style={styles.hint}>
          {userProfile.units === 'mi'
            ? 'Trail distances and elevation gain show in miles and feet.'
            : 'Trail distances and elevation gain show in kilometers and meters.'}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: spacing.xl, paddingTop: spacing.md, gap: spacing.md },
  label: { ...typography.labelBold, color: colors.textPrimary },
  hint: { ...typography.bodySmall, color: colors.textSecondary },
});
