import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import Svg, { Path, Polygon, Circle, Line, Polyline } from 'react-native-svg';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import { useApp } from '@/context/AppContext';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import { ActivityType, TripTrailEntry, TrailDifficulty, AnimalRarity } from '@/types';
import { ALL_TRAILS } from '@/data/trails';
import { ALL_ANIMALS } from '@/data/animals';
import PrimaryButton from '@/components/PrimaryButton';
import { convertMiles, convertFeet, toMiles, toFeet, distanceLabel, elevationLabel } from '@/utils/units';

const HERO_ACTIVITY_IMAGES: number[] = [
  require('@/assets/activities/bear-hiking.png'),
  require('@/assets/activities/bear-camping.png'),
  require('@/assets/activities/bear-wildlife-viewing.png'),
  require('@/assets/activities/bear-kayaking.png'),
  require('@/assets/activities/bear-scenic-drive.png'),
  require('@/assets/activities/bear-photography.png'),
  require('@/assets/activities/bear-backpacking.png'),
  require('@/assets/activities/bear-stargazing.png'),
  require('@/assets/activities/bear-fishing.png'),
  require('@/assets/activities/bear-horseback-riding.png'),
  require('@/assets/activities/bear-nature-walk.png'),
  require('@/assets/activities/bear-waterfall-hike.png'),
  require('@/assets/activities/bear-picnic.png'),
  require('@/assets/activities/bear-rock-climbing.png'),
  require('@/assets/activities/bear-winter-activity.png'),
];

function randomHeroImage(): number {
  return HERO_ACTIVITY_IMAGES[Math.floor(Math.random() * HERO_ACTIVITY_IMAGES.length)];
}

function BackArrowIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16">
      <Path d="M10 2 4 8l6 6" fill="none" stroke={colors.textPrimary} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function BootIcon({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Polygon points="4,3 11,3 11,9 19,9 19,12 22,12 22,17 4,17" fill={color} />
    </Svg>
  );
}

function TentIcon({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Polygon points="12,4 3,20 21,20" fill={color} />
      <Polygon points="12,11 8.6,20 15.4,20" fill={colors.background} />
    </Svg>
  );
}

function PaddleIcon({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Line x1="5" y1="19" x2="19" y2="5" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <Circle cx="4.5" cy="19.5" r="3" fill={color} />
      <Circle cx="19.5" cy="4.5" r="3" fill={color} />
    </Svg>
  );
}

function CarIcon({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M4 14 5.6 9a2 2 0 0 1 1.9-1.4h9a2 2 0 0 1 1.9 1.4L20 14z" fill={color} />
      <Path d="M2.5 14h19a1.5 1.5 0 0 1 1.5 1.5V17a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-1.5A1.5 1.5 0 0 1 2.5 14z" fill={color} />
      <Circle cx="7" cy="18.5" r="1.8" fill={colors.background} stroke={color} strokeWidth={1.4} />
      <Circle cx="17" cy="18.5" r="1.8" fill={colors.background} stroke={color} strokeWidth={1.4} />
    </Svg>
  );
}

function StarIcon({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Polygon points="12,2 14.9,9 22.5,9.3 16.4,14 18.5,21.3 12,17.1 5.5,21.3 7.6,14 1.5,9.3 9.1,9" fill={color} />
    </Svg>
  );
}

function DotsIcon({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx="5" cy="12" r="2.2" fill={color} />
      <Circle cx="12" cy="12" r="2.2" fill={color} />
      <Circle cx="19" cy="12" r="2.2" fill={color} />
    </Svg>
  );
}

function TreeIcon({ color, size = 18 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Polygon points="10,2 4,10 7,10 3,15 8,15 8,18 12,18 12,15 17,15 13,10 16,10" fill={color} />
    </Svg>
  );
}

function CloseIcon({ color, size = 10 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 10 10">
      <Line x1="1" y1="1" x2="9" y2="9" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
      <Line x1="9" y1="1" x2="1" y2="9" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
    </Svg>
  );
}

function CheckIcon({ color, size = 14 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 12 12">
      <Polyline points="2,6 5,9 10,3" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

const DIFFICULTY_RANK: Record<TrailDifficulty, number> = { Easy: 0, Moderate: 1, Hard: 2 };
const RARITY_RANK: Record<AnimalRarity, number> = { Common: 0, Uncommon: 1, Rare: 2 };

const ACTIVITIES: { label: ActivityType; render: (color: string) => React.ReactElement }[] = [
  { label: 'Hiking', render: (c) => <BootIcon color={c} /> },
  { label: 'Camping', render: (c) => <TentIcon color={c} /> },
  {
    label: 'Wildlife',
    render: (c) => (
      <Image source={require('@/assets/icons/icon-hikes.png')} style={[styles.activityIconImg, { tintColor: c }]} resizeMode="contain" />
    ),
  },
  { label: 'Kayaking', render: (c) => <PaddleIcon color={c} /> },
  { label: 'Scenic Drive', render: (c) => <CarIcon color={c} /> },
  {
    label: 'Photography',
    render: (c) => (
      <Image source={require('@/assets/icons/icon-photos.png')} style={[styles.activityIconImg, { tintColor: c }]} resizeMode="contain" />
    ),
  },
  { label: 'Stargazing', render: (c) => <StarIcon color={c} /> },
  { label: 'Other', render: (c) => <DotsIcon color={c} /> },
];

export default function LogTripScreen() {
  const { parks, trips, logTrip, updateTrip, userProfile } = useApp();
  const units = userProfile.units;
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const editingTrip = route.params?.tripId ? trips.find((t) => t.id === route.params.tripId) : undefined;
  const [heroImage, setHeroImage] = useState<number>(randomHeroImage);
  const [selectedParkId, setSelectedParkId] = useState<string>(editingTrip?.parkId ?? route.params?.parkId ?? 'yellowstone');
  const [startDate, setStartDate] = useState(editingTrip?.startDate ?? '');
  const [endDate, setEndDate] = useState(editingTrip?.endDate ?? '');
  const [selectedActivities, setSelectedActivities] = useState<ActivityType[]>(editingTrip?.activities ?? []);
  const [notes, setNotes] = useState(editingTrip?.notes ?? '');
  const [showParkPicker, setShowParkPicker] = useState(false);
  const [wildlifeSightings, setWildlifeSightings] = useState<string[]>(editingTrip?.wildlifeSightings ?? []);
  const [wildlifeInput, setWildlifeInput] = useState('');
  const [selectedTrails, setSelectedTrails] = useState<TripTrailEntry[]>(editingTrip?.trailsHiked ?? []);
  const [customTrailName, setCustomTrailName] = useState('');
  const [customTrailMiles, setCustomTrailMiles] = useState('');
  const [customTrailElevation, setCustomTrailElevation] = useState('');
  const [editingTrailKey, setEditingTrailKey] = useState<string | null>(null);
  const [editMiles, setEditMiles] = useState('');
  const [editElevation, setEditElevation] = useState('');

  useFocusEffect(
    useCallback(() => {
      setHeroImage(randomHeroImage());
    }, [])
  );

  // The LogTrip tab stays mounted once visited, so useState's initial value
  // above only ever applies to the very first time this screen is opened.
  // Re-navigating here later — to edit a different trip, or to log a fresh
  // trip after having just edited one — leaves stale fields from whatever
  // was last shown unless we resync whenever the requested trip/park
  // actually changes. Keyed on the param values (not focus) so it doesn't
  // wipe an in-progress "create" form just from switching tabs and back.
  const editingTripId: string | undefined = route.params?.tripId;
  const requestedParkId: string | undefined = route.params?.parkId;
  useEffect(() => {
    const trip = editingTripId ? trips.find((t) => t.id === editingTripId) : undefined;
    if (trip) {
      setSelectedParkId(trip.parkId);
      setStartDate(trip.startDate);
      setEndDate(trip.endDate);
      setSelectedActivities(trip.activities);
      setNotes(trip.notes);
      setWildlifeSightings(trip.wildlifeSightings ?? []);
      setSelectedTrails(trip.trailsHiked ?? []);
    } else {
      setSelectedParkId(requestedParkId ?? 'yellowstone');
      setStartDate('');
      setEndDate('');
      setSelectedActivities([]);
      setNotes('');
      setWildlifeSightings([]);
      setSelectedTrails([]);
    }
    setWildlifeInput('');
    setCustomTrailName('');
    setCustomTrailMiles('');
    setCustomTrailElevation('');
    setEditingTrailKey(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingTripId, requestedParkId]);

  const selectedPark = parks.find((p) => p.id === selectedParkId);
  const parkTrails = ALL_TRAILS.filter((t) => t.parkId === selectedParkId).sort(
    (a, b) => DIFFICULTY_RANK[a.difficulty] - DIFFICULTY_RANK[b.difficulty]
  );
  const parkAnimals = ALL_ANIMALS.filter((a) => a.parkId === selectedParkId).sort(
    (a, b) => RARITY_RANK[a.rarity] - RARITY_RANK[b.rarity]
  );

  const toggleActivity = (a: ActivityType) => {
    setSelectedActivities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );
  };

  const addWildlifeSighting = () => {
    const trimmed = wildlifeInput.trim();
    if (!trimmed || wildlifeSightings.some((w) => w.toLowerCase() === trimmed.toLowerCase())) {
      setWildlifeInput('');
      return;
    }
    setWildlifeSightings((prev) => [...prev, trimmed]);
    setWildlifeInput('');
  };

  const removeWildlifeSighting = (sighting: string) => {
    setWildlifeSightings((prev) => prev.filter((w) => w !== sighting));
  };

  const toggleAnimal = (name: string) => {
    setWildlifeSightings((prev) =>
      prev.some((w) => w.toLowerCase() === name.toLowerCase())
        ? prev.filter((w) => w.toLowerCase() !== name.toLowerCase())
        : [...prev, name]
    );
  };

  const trailKeyOf = (entry: { trailId?: string; name: string }) => entry.trailId ?? entry.name;

  const toggleTrail = (trailId: string, name: string, miles: number, elevationGainFt: number) => {
    const active = selectedTrails.some((t) => t.trailId === trailId);
    if (active) {
      setSelectedTrails((prev) => prev.filter((t) => t.trailId !== trailId));
      if (editingTrailKey === trailId) setEditingTrailKey(null);
      return;
    }
    // Pre-fill with the trail's full distance — most hikes cover the whole
    // trail, but the fields stay open so a partial hike can be dialed down.
    setSelectedTrails((prev) => [...prev, { trailId, name, miles, elevationGainFt }]);
    setEditingTrailKey(trailId);
    setEditMiles(convertMiles(miles, units).toFixed(1));
    setEditElevation(Math.round(convertFeet(elevationGainFt, units)).toString());
  };

  const addCustomTrail = () => {
    const name = customTrailName.trim();
    const enteredDistance = parseFloat(customTrailMiles);
    if (!name || Number.isNaN(enteredDistance)) return;
    const miles = toMiles(enteredDistance, units);
    const elevationGainFt = toFeet(parseFloat(customTrailElevation) || 0, units);
    setSelectedTrails((prev) => [...prev, { name, miles, elevationGainFt }]);
    setCustomTrailName('');
    setCustomTrailMiles('');
    setCustomTrailElevation('');
  };

  const removeTrail = (entry: TripTrailEntry) => {
    setSelectedTrails((prev) =>
      prev.filter((t) => (entry.trailId ? t.trailId !== entry.trailId : t.name !== entry.name))
    );
    if (editingTrailKey === trailKeyOf(entry)) setEditingTrailKey(null);
  };

  const startEditTrail = (entry: TripTrailEntry) => {
    setEditingTrailKey(trailKeyOf(entry));
    setEditMiles(convertMiles(entry.miles, units).toFixed(1));
    setEditElevation(Math.round(convertFeet(entry.elevationGainFt, units)).toString());
  };

  const saveEditTrail = (entry: TripTrailEntry) => {
    const enteredDistance = parseFloat(editMiles);
    const miles = Number.isNaN(enteredDistance) ? entry.miles : toMiles(enteredDistance, units);
    const elevationGainFt = toFeet(parseFloat(editElevation) || 0, units);
    setSelectedTrails((prev) =>
      prev.map((t) => (trailKeyOf(t) === trailKeyOf(entry) ? { ...t, miles, elevationGainFt } : t))
    );
    setEditingTrailKey(null);
  };

  const handleSave = () => {
    if (!selectedParkId || !startDate) {
      Alert.alert('Missing info', 'Please select a park and start date.');
      return;
    }

    if (editingTrip) {
      const milesHiked = selectedTrails.length > 0
        ? selectedTrails.reduce((acc, t) => acc + t.miles, 0)
        : editingTrip.milesHiked;
      const elevationGainFt = selectedTrails.length > 0
        ? selectedTrails.reduce((acc, t) => acc + t.elevationGainFt, 0)
        : editingTrip.elevationGainFt;
      updateTrip({
        ...editingTrip,
        parkId: selectedParkId,
        startDate,
        endDate: endDate || startDate,
        activities: selectedActivities,
        notes,
        wildlifeSightings,
        trailsHiked: selectedTrails,
        milesHiked,
        elevationGainFt,
      });
      Alert.alert('Trip updated!', 'Your changes have been saved.', [{ text: 'Nice!' }]);
      navigation.goBack();
      return;
    }

    logTrip({
      parkId: selectedParkId,
      startDate,
      endDate: endDate || startDate,
      activities: selectedActivities,
      notes,
      photos: [],
      wildlifeSightings,
      trailsHiked: selectedTrails,
    });
    Alert.alert('Adventure saved!', 'Your passport is growing.', [{ text: 'Awesome!' }]);
    setStartDate('');
    setEndDate('');
    setNotes('');
    setSelectedActivities([]);
    setWildlifeSightings([]);
    setWildlifeInput('');
    setSelectedTrails([]);
    setCustomTrailName('');
    setCustomTrailMiles('');
    setCustomTrailElevation('');
    setEditingTrailKey(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} hitSlop={10}>
            <BackArrowIcon />
          </TouchableOpacity>
          <Text style={styles.screenTitle}>{editingTrip ? 'Edit Trip' : 'Log a Trip'}</Text>
          <View style={styles.backBtn} />
        </View>

        {/* Header illustration */}
        <View style={styles.heroArea}>
          <Image source={heroImage} style={styles.heroImage} resizeMode="contain" />
        </View>

        {/* Park selector */}
        <View style={styles.field}>
          <Text style={styles.label}>Which park?</Text>
          <TouchableOpacity style={styles.selector} onPress={() => setShowParkPicker(!showParkPicker)}>
            <Text style={styles.selectorText}>{selectedPark?.name ?? 'Select a park'}</Text>
            <Text style={styles.selectorIcon}>{'▾'}</Text>
          </TouchableOpacity>
          {showParkPicker && (
            <View style={styles.dropdown}>
              <ScrollView style={{ maxHeight: 200 }} nestedScrollEnabled>
                {parks.map((p) => (
                  <TouchableOpacity
                    key={p.id}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedParkId(p.id);
                      setShowParkPicker(false);
                      setSelectedTrails([]);
                      setEditingTrailKey(null);
                    }}
                  >
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
              <Image source={require('@/assets/icons/icon-calendar.png')} style={styles.dateIcon} resizeMode="contain" />
              <TextInput
                style={styles.dateText}
                placeholder="Start date"
                placeholderTextColor={colors.textMuted}
                value={startDate}
                onChangeText={setStartDate}
                numberOfLines={1}
              />
            </View>
            <Text style={styles.dateDash}>{'–'}</Text>
            <View style={styles.dateInput}>
              <TextInput
                style={styles.dateText}
                placeholder="End date"
                placeholderTextColor={colors.textMuted}
                value={endDate}
                onChangeText={setEndDate}
                numberOfLines={1}
              />
            </View>
          </View>
          <Text style={styles.dateHint}>Format: YYYY-MM-DD</Text>
        </View>

        {/* Activities */}
        <View style={styles.field}>
          <Text style={styles.label}>What did you do?</Text>
          <View style={styles.activityGrid}>
            {ACTIVITIES.map(({ label, render }) => {
              const active = selectedActivities.includes(label);
              const iconColor = active ? colors.textInverse : colors.brown;
              return (
                <TouchableOpacity
                  key={label}
                  style={[styles.activityChip, active && styles.activityChipActive]}
                  onPress={() => toggleActivity(label)}
                  activeOpacity={0.8}
                >
                  {render(iconColor)}
                  <Text style={[styles.activityLabel, active && styles.activityLabelActive]}>{label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Trails */}
        {parkTrails.length > 0 && (
          <View style={styles.field}>
            <Text style={styles.label}>Which trails did you hike?</Text>
            <View style={styles.trailList}>
              {parkTrails.map((trail) => {
                const active = selectedTrails.some((t) => t.trailId === trail.id);
                return (
                  <TouchableOpacity
                    key={trail.id}
                    style={[styles.trailChip, active && styles.trailChipActive]}
                    onPress={() => toggleTrail(trail.id, trail.name, trail.miles, trail.elevationGainFt)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.trailChipName, active && styles.trailChipNameActive]}>{trail.name}</Text>
                    <Text style={[styles.trailChipMeta, active && styles.trailChipMetaActive]}>
                      {convertMiles(trail.miles, units).toFixed(1)} {distanceLabel(units)} · {Math.round(convertFeet(trail.elevationGainFt, units)).toLocaleString()} {elevationLabel(units)} gain
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* Custom trail entry */}
        <View style={styles.field}>
          <Text style={styles.label}>Add a trail we don't have</Text>
          <TextInput
            style={[styles.wildlifeInput, styles.customTrailNameInput]}
            placeholder="Trail name"
            placeholderTextColor={colors.textMuted}
            value={customTrailName}
            onChangeText={setCustomTrailName}
          />
          <View style={styles.customTrailRow}>
            <TextInput
              style={[styles.wildlifeInput, styles.customTrailNumberInput]}
              placeholder={distanceLabel(units) === 'mi' ? 'Miles' : 'Kilometers'}
              placeholderTextColor={colors.textMuted}
              keyboardType="numeric"
              value={customTrailMiles}
              onChangeText={setCustomTrailMiles}
            />
            <TextInput
              style={[styles.wildlifeInput, styles.customTrailNumberInput]}
              placeholder={`Elev. ${elevationLabel(units)}`}
              placeholderTextColor={colors.textMuted}
              keyboardType="numeric"
              value={customTrailElevation}
              onChangeText={setCustomTrailElevation}
            />
            <TouchableOpacity style={styles.wildlifeAddBtn} onPress={addCustomTrail} activeOpacity={0.8}>
              <Text style={styles.wildlifeAddBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Selected trails — tap to log a partial distance */}
        {selectedTrails.length > 0 && (
          <View style={styles.field}>
            <Text style={styles.label}>Your Trails</Text>
            <View style={styles.trailSummaryList}>
              {selectedTrails.map((entry) => {
                const editing = editingTrailKey === trailKeyOf(entry);
                return (
                  <View key={trailKeyOf(entry)} style={styles.trailSummaryCard}>
                    {editing ? (
                      <>
                        <Text style={styles.trailSummaryName}>{entry.name}</Text>
                        <View style={styles.customTrailRow}>
                          <TextInput
                            style={[styles.wildlifeInput, styles.customTrailNumberInput]}
                            placeholder={distanceLabel(units) === 'mi' ? 'Miles' : 'Kilometers'}
                            placeholderTextColor={colors.textMuted}
                            keyboardType="numeric"
                            value={editMiles}
                            onChangeText={setEditMiles}
                            autoFocus
                          />
                          <TextInput
                            style={[styles.wildlifeInput, styles.customTrailNumberInput]}
                            placeholder={`Elev. ${elevationLabel(units)}`}
                            placeholderTextColor={colors.textMuted}
                            keyboardType="numeric"
                            value={editElevation}
                            onChangeText={setEditElevation}
                          />
                          <TouchableOpacity style={styles.wildlifeAddBtn} onPress={() => saveEditTrail(entry)} activeOpacity={0.8}>
                            <CheckIcon color={colors.textInverse} />
                          </TouchableOpacity>
                        </View>
                      </>
                    ) : (
                      <TouchableOpacity style={styles.trailSummaryRow} onPress={() => startEditTrail(entry)} activeOpacity={0.7}>
                        <View style={styles.trailSummaryText}>
                          <Text style={styles.trailSummaryName}>{entry.name}</Text>
                          <Text style={styles.trailSummaryMeta}>
                            {convertMiles(entry.miles, units).toFixed(1)} {distanceLabel(units)} · {Math.round(convertFeet(entry.elevationGainFt, units)).toLocaleString()} {elevationLabel(units)} gain
                          </Text>
                        </View>
                        <Text style={styles.trailSummaryEdit}>Edit</Text>
                        <TouchableOpacity onPress={() => removeTrail(entry)} hitSlop={8}>
                          <CloseIcon color={colors.orange} />
                        </TouchableOpacity>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* Wildlife */}
        <View style={styles.field}>
          <Text style={styles.label}>Wildlife Spotted</Text>
          {parkAnimals.length > 0 && (
            <View style={styles.animalChipRow}>
              {parkAnimals.map((animal) => {
                const active = wildlifeSightings.some((w) => w.toLowerCase() === animal.name.toLowerCase());
                return (
                  <TouchableOpacity
                    key={animal.id}
                    style={[styles.animalChip, active && styles.animalChipActive]}
                    onPress={() => toggleAnimal(animal.name)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.animalChipText, active && styles.animalChipTextActive]}>{animal.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
          <View style={styles.wildlifeInputRow}>
            <TextInput
              style={styles.wildlifeInput}
              placeholder="e.g. Elk, Moose, Bald Eagle..."
              placeholderTextColor={colors.textMuted}
              value={wildlifeInput}
              onChangeText={setWildlifeInput}
              onSubmitEditing={addWildlifeSighting}
              returnKeyType="done"
            />
            <TouchableOpacity style={styles.wildlifeAddBtn} onPress={addWildlifeSighting} activeOpacity={0.8}>
              <Text style={styles.wildlifeAddBtnText}>+</Text>
            </TouchableOpacity>
          </View>
          {wildlifeSightings.length > 0 && (
            <View style={styles.wildlifeTagRow}>
              {wildlifeSightings.map((sighting) => (
                <View key={sighting} style={styles.wildlifeTag}>
                  <Text style={styles.wildlifeTagText}>{sighting}</Text>
                  <TouchableOpacity onPress={() => removeWildlifeSighting(sighting)} hitSlop={8}>
                    <CloseIcon color={colors.orange} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
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
            <Image source={require('@/assets/scenes/scene-mountain-lake.png')} style={styles.photoThumb} resizeMode="cover" />
            <Image source={require('@/assets/scenes/scene-forest.png')} style={styles.photoThumb} resizeMode="cover" />
            <TouchableOpacity style={[styles.photoThumb, styles.photoAdd]}>
              <Text style={styles.photoAddIcon}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <PrimaryButton
          label={editingTrip ? 'SAVE CHANGES' : 'SAVE TRIP'}
          icon={<TreeIcon color={colors.textInverse} />}
          onPress={handleSave}
          style={styles.saveBtn}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingBottom: spacing['5xl'] },

  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.xl, paddingTop: spacing['2xl'] },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', ...shadows.sm },
  screenTitle: { ...typography.h3, color: colors.textPrimary },

  heroArea: { height: 190, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md },
  heroImage: { width: 220, height: 190 },

  field: { paddingHorizontal: spacing.xl, marginBottom: spacing.xl },
  label: { ...typography.labelBold, color: colors.textPrimary, marginBottom: spacing.sm },

  selector: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, ...shadows.sm },
  selectorText: { ...typography.body, color: colors.textPrimary },
  selectorIcon: { fontSize: 16, color: colors.textSecondary },

  dropdown: { backgroundColor: colors.surface, borderRadius: radius.lg, marginTop: spacing.xs, ...shadows.md, overflow: 'hidden' },
  dropdownItem: { padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.divider },
  dropdownText: { ...typography.body, color: colors.textPrimary },
  dropdownTextActive: { color: colors.primary, fontFamily: typography.labelBold.fontFamily },

  dateRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  dateInput: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.lg, paddingVertical: spacing.md, paddingHorizontal: spacing.sm, gap: 6, ...shadows.sm, minWidth: 0 },
  dateIcon: { width: 15, height: 15 },
  dateText: { flex: 1, minWidth: 0, ...typography.bodySmall, color: colors.textPrimary },
  dateDash: { ...typography.body, color: colors.textMuted },
  dateHint: { ...typography.caption, color: colors.textMuted, marginTop: spacing.xs },

  activityGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  activityChip: { width: '28%', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 2, borderColor: colors.border, paddingVertical: spacing.md, ...shadows.sm },
  activityChipActive: { borderColor: colors.primary, backgroundColor: colors.primary },
  activityIconImg: { width: 22, height: 22 },
  activityLabel: { ...typography.caption, color: colors.textSecondary, textAlign: 'center' },
  activityLabelActive: { color: colors.textInverse },

  trailList: { gap: spacing.sm },
  trailChip: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 2, borderColor: colors.border, padding: spacing.md, ...shadows.sm },
  trailChipActive: { borderColor: colors.primary, backgroundColor: colors.primary },
  trailChipName: { ...typography.labelSemiBold, color: colors.textPrimary },
  trailChipNameActive: { color: colors.textInverse },
  trailChipMeta: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
  trailChipMetaActive: { color: colors.textInverse },

  customTrailRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.sm },
  customTrailNameInput: { width: '100%' },
  customTrailNumberInput: { flex: 1, minWidth: 0 },

  trailSummaryList: { gap: spacing.sm },
  trailSummaryCard: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, ...shadows.sm },
  trailSummaryRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  trailSummaryText: { flex: 1 },
  trailSummaryName: { ...typography.labelSemiBold, color: colors.textPrimary },
  trailSummaryMeta: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
  trailSummaryEdit: { ...typography.labelSmall, color: colors.sage },

  animalChipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.md },
  animalChip: { backgroundColor: colors.surface, borderRadius: radius.full, borderWidth: 1.5, borderColor: colors.border, paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  animalChipActive: { borderColor: colors.primary, backgroundColor: colors.primary },
  animalChipText: { ...typography.labelSmall, color: colors.textSecondary },
  animalChipTextActive: { color: colors.textInverse },

  wildlifeInputRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  wildlifeInput: { flex: 1, backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, ...typography.body, color: colors.textPrimary, ...shadows.sm },
  wildlifeAddBtn: { width: 44, height: 44, borderRadius: radius.lg, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', ...shadows.sm },
  wildlifeAddBtnText: { fontSize: 22, lineHeight: 24, color: colors.textInverse },
  wildlifeTagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md },
  wildlifeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.surfaceWarm,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  wildlifeTagText: { ...typography.labelSmall, color: colors.orange },

  notesBox: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, ...shadows.sm },
  notesInput: { ...typography.body, color: colors.textPrimary, minHeight: 80, textAlignVertical: 'top' },
  charCount: { ...typography.caption, color: colors.textMuted, textAlign: 'right', marginTop: spacing.xs },

  photoRow: { flexDirection: 'row', gap: spacing.md },
  photoThumb: { width: 72, height: 72, borderRadius: radius.md, backgroundColor: colors.surfaceWarm },
  photoAdd: { alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: colors.border, borderStyle: 'dashed' },
  photoAddIcon: { fontSize: 24, color: colors.textMuted },

  saveBtn: { marginHorizontal: spacing.xl },
});
