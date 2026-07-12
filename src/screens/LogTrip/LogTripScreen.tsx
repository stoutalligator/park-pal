import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useApp } from '@/context/AppContext';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import { ActivityType } from '@/types';
import PrimaryButton from '@/components/PrimaryButton';

const ACTIVITIES: { label: ActivityType; icon: string }[] = [
  { label: 'Hiking', icon: '🥾' },
  { label: 'Camping', icon: '⛺' },
  { label: 'Wildlife', icon: '🦌' },
  { label: 'Kayaking', icon: '🚣' },
  { label: 'Scenic Drive', icon: '🚗' },
  { label: 'Photography', icon: '📷' },
  { label: 'Stargazing', icon: '🌠' },
  { label: 'Other', icon: '•••' },
];

export default function LogTripScreen() {
  const { parks, logTrip } = useApp();
  const [selectedParkId, setSelectedParkId] = useState<string>('yellowstone');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedActivities, setSelectedActivities] = useState<ActivityType[]>([]);
  const [notes, setNotes] = useState('');
  const [showParkPicker, setShowParkPicker] = useState(false);

  const selectedPark = parks.find((p) => p.id === selectedParkId);

  const toggleActivity = (a: ActivityType) => {
    setSelectedActivities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );
  };

  const handleSave = () => {
    if (!selectedParkId || !startDate) {
      Alert.alert('Missing info', 'Please select a park and start date.');
      return;
    }
    logTrip({
      parkId: selectedParkId,
      startDate,
      endDate: endDate || startDate,
      activities: selectedActivities,
      notes,
      photos: [],
    });
    Alert.alert('🐻 Adventure saved!', 'Your passport is growing.', [{ text: 'Awesome!' }]);
    setStartDate('');
    setEndDate('');
    setNotes('');
    setSelectedActivities([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header illustration */}
        <View style={styles.heroArea}>
          <View style={styles.illustrationBg}>
            <Text style={styles.illustrationEmoji}>🏕️</Text>
          </View>
          <View style={styles.mascotOverlay}>
            <Text style={styles.mascotEmoji}>🐻</Text>
          </View>
        </View>

        <Text style={styles.screenTitle}>Log a Trip</Text>

        {/* Park selector */}
        <View style={styles.field}>
          <Text style={styles.label}>Which park?</Text>
          <TouchableOpacity style={styles.selector} onPress={() => setShowParkPicker(!showParkPicker)}>
            <Text style={styles.selectorText}>{selectedPark?.name ?? 'Select a park'}</Text>
            <Text style={styles.selectorIcon}>▾</Text>
          </TouchableOpacity>
          {showParkPicker && (
            <View style={styles.dropdown}>
              <ScrollView style={{ maxHeight: 200 }} nestedScrollEnabled>
                {parks.map((p) => (
                  <TouchableOpacity key={p.id} style={styles.dropdownItem} onPress={() => { setSelectedParkId(p.id); setShowParkPicker(false); }}>
                    <Text style={[styles.dropdownText, selectedParkId === p.id && styles.dropdownTextActive]}>{p.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        {/* Date */}
        <View style={styles.field}>
          <Text style={styles.label}>When did you go?</Text>
          <View style={styles.dateRow}>
            <View style={styles.dateInput}>
              <Text style={styles.dateIcon}>📅</Text>
              <TextInput
                style={styles.dateText}
                placeholder="Start date (YYYY-MM-DD)"
                placeholderTextColor={colors.textMuted}
                value={startDate}
                onChangeText={setStartDate}
              />
            </View>
            <Text style={styles.dateDash}>–</Text>
            <View style={styles.dateInput}>
              <TextInput
                style={styles.dateText}
                placeholder="End date"
                placeholderTextColor={colors.textMuted}
                value={endDate}
                onChangeText={setEndDate}
              />
            </View>
          </View>
        </View>

        {/* Activities */}
        <View style={styles.field}>
          <Text style={styles.label}>What did you do?</Text>
          <View style={styles.activityGrid}>
            {ACTIVITIES.map(({ label, icon }) => {
              const active = selectedActivities.includes(label);
              return (
                <TouchableOpacity
                  key={label}
                  style={[styles.activityChip, active && styles.activityChipActive]}
                  onPress={() => toggleActivity(label)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.activityIcon}>{icon}</Text>
                  <Text style={[styles.activityLabel, active && styles.activityLabelActive]}>{label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Notes */}
        <View style={styles.field}>
          <Text style={styles.label}>Notes / Memories</Text>
          <View style={styles.notesBox}>
            <TextInput
              style={styles.notesInput}
              placeholder="Amazing views! We saw elk and hiked to the waterfall."
              placeholderTextColor={colors.textMuted}
              multiline
              maxLength={200}
              value={notes}
              onChangeText={setNotes}
            />
            <Text style={styles.charCount}>{notes.length}/200</Text>
          </View>
        </View>

        {/* Add Photos placeholder */}
        <View style={styles.field}>
          <Text style={styles.label}>Add Photos</Text>
          <View style={styles.photoRow}>
            <View style={styles.photoThumb}><Text style={{ fontSize: 20 }}>🏔️</Text></View>
            <View style={styles.photoThumb}><Text style={{ fontSize: 20 }}>🌿</Text></View>
            <TouchableOpacity style={[styles.photoThumb, styles.photoAdd]}>
              <Text style={styles.photoAddIcon}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <PrimaryButton label="🌲 Save Trip" onPress={handleSave} style={styles.saveBtn} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingBottom: spacing['5xl'] },

  heroArea: { height: 160, position: 'relative', marginBottom: spacing.md },
  illustrationBg: { flex: 1, backgroundColor: '#C5DEBA', alignItems: 'center', justifyContent: 'center' },
  illustrationEmoji: { fontSize: 52, opacity: 0.5 },
  mascotOverlay: { position: 'absolute', bottom: -20, alignSelf: 'center', width: 60, height: 60, borderRadius: 30, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', ...shadows.md },
  mascotEmoji: { fontSize: 32 },

  screenTitle: { ...typography.h3, color: colors.textPrimary, textAlign: 'center', marginTop: spacing['2xl'], marginBottom: spacing.lg },

  field: { paddingHorizontal: spacing.xl, marginBottom: spacing.xl },
  label: { ...typography.labelBold, color: colors.textPrimary, marginBottom: spacing.sm },

  selector: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, ...shadows.sm },
  selectorText: { ...typography.body, color: colors.textPrimary },
  selectorIcon: { fontSize: 16, color: colors.textSecondary },

  dropdown: { backgroundColor: colors.surface, borderRadius: radius.lg, marginTop: spacing.xs, ...shadows.md, overflow: 'hidden' },
  dropdownItem: { padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.divider },
  dropdownText: { ...typography.body, color: colors.textPrimary },
  dropdownTextActive: { color: colors.primary, fontFamily: 'Nunito_700Bold' },

  dateRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  dateInput: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, gap: spacing.sm, ...shadows.sm },
  dateIcon: { fontSize: 16 },
  dateText: { flex: 1, ...typography.body, color: colors.textPrimary },
  dateDash: { ...typography.body, color: colors.textMuted },

  activityGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  activityChip: { width: '28%', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 2, borderColor: colors.border, paddingVertical: spacing.md, ...shadows.sm },
  activityChipActive: { borderColor: colors.primary, backgroundColor: '#EEF5E8' },
  activityIcon: { fontSize: 22 },
  activityLabel: { ...typography.caption, color: colors.textSecondary, textAlign: 'center' },
  activityLabelActive: { color: colors.primary },

  notesBox: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, ...shadows.sm },
  notesInput: { ...typography.body, color: colors.textPrimary, minHeight: 80, textAlignVertical: 'top' },
  charCount: { ...typography.caption, color: colors.textMuted, textAlign: 'right', marginTop: spacing.xs },

  photoRow: { flexDirection: 'row', gap: spacing.md },
  photoThumb: { width: 72, height: 72, borderRadius: radius.md, backgroundColor: colors.surfaceWarm, alignItems: 'center', justifyContent: 'center' },
  photoAdd: { borderWidth: 2, borderColor: colors.border, borderStyle: 'dashed' },
  photoAddIcon: { fontSize: 24, color: colors.textMuted },

  saveBtn: { marginHorizontal: spacing.xl },
});
