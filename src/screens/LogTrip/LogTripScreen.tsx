import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Svg, { Path, Polygon, Circle, Line, Polyline } from 'react-native-svg';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import { useApp } from '@/context/AppContext';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import { ActivityType, TripTrailEntry, TrailDifficulty, AnimalRarity } from '@/types';
import { ALL_TRAILS } from '@/data/trails';
import { ALL_ANIMALS } from '@/data/animals';
import PrimaryButton from '@/components/PrimaryButton';
import DateRangePicker from '@/components/DateRangePicker';
import { convertMiles, convertFeet, toMiles, toFeet, distanceLabel, elevationLabel } from '@/utils/units';
import { formatDateRange } from '@/utils/dates';

type FormMode = 'plan' | 'log' | 'complete';

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
      <Path
        d="M8.5 2.5v7.8c0 .9-.4 1.7-1.1 2.3l-2.6 2c-1 .8-1.6 2-1.6 3.3v1.6c0 .8.6 1.5 1.5 1.5h14.6c.8 0 1.5-.7 1.5-1.5v-1.9c0-1.5-1-2.8-2.4-3.3l-4.9-1.7c-1-.3-1.6-1.3-1.6-2.3V2.5"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M8.5 2.5h4.4" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M6.2 16.6h12.4" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M9.4 6.2 12.9 7.4M9.4 9 12.9 10.2" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
    </Svg>
  );
}

function TentIcon({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M12 3.3 2.6 19.5h18.8L12 3.3z" fill="none" stroke={color} strokeWidth={1.8} strokeLinejoin="round" strokeLinecap="round" />
      <Path d="M12 3.3 8.5 19.5" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
      <Path d="M12 3.3 15.5 19.5" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
      <Path d="M10.2 19.5 12 12.3l1.8 7.2" fill="none" stroke={color} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M1.5 19.5h21" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

function PawIcon({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx="12" cy="15.7" r="5" fill={color} />
      <Circle cx="5.3" cy="9.6" r="2.3" fill={color} />
      <Circle cx="10.6" cy="5.3" r="2.2" fill={color} />
      <Circle cx="15.6" cy="5.3" r="2.2" fill={color} />
      <Circle cx="18.7" cy="9.6" r="2.3" fill={color} />
    </Svg>
  );
}

function PaddleIcon({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M5.2 18.8 18.8 5.2" stroke={color} strokeWidth={2.1} strokeLinecap="round" />
      <Path
        d="M2.3 21.7c1.7 0 3.8-.8 4.9-1.9s1.9-3.2 1.9-4.9"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21.7 2.3c0 1.7-.8 3.8-1.9 4.9s-3.2 1.9-4.9 1.9"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="12" cy="12" r="1.3" fill={color} />
    </Svg>
  );
}

function CarIcon({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M4.4 14.6 5.9 9.4a2.2 2.2 0 0 1 2.1-1.6h7.9a2.2 2.2 0 0 1 2.1 1.6l1.5 5.2"
        fill="none"
        stroke={color}
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.7 18.9h-.9a1 1 0 0 1-1-1v-2.3a1 1 0 0 1 1-1h20.4a1 1 0 0 1 1 1v2.3a1 1 0 0 1-1 1h-.9"
        fill="none"
        stroke={color}
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M7.9 11.1h8.2" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Circle cx="7" cy="18.9" r="1.9" fill="none" stroke={color} strokeWidth={1.7} />
      <Circle cx="17" cy="18.9" r="1.9" fill="none" stroke={color} strokeWidth={1.7} />
    </Svg>
  );
}

function CameraIcon({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M3 8.3A1.8 1.8 0 0 1 4.8 6.5h2.1l1-1.6a1.6 1.6 0 0 1 1.4-.8h5.4a1.6 1.6 0 0 1 1.4.8l1 1.6h2.1A1.8 1.8 0 0 1 21 8.3v9A1.8 1.8 0 0 1 19.2 19H4.8A1.8 1.8 0 0 1 3 17.3z"
        fill="none"
        stroke={color}
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="12" cy="12.8" r="3.5" fill="none" stroke={color} strokeWidth={1.7} />
      <Circle cx="17.3" cy="9" r="0.6" fill={color} />
    </Svg>
  );
}

function StarIcon({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12 2.4c.4 3.3 1.1 5.4 2.1 6.4s3.1 1.7 6.5 2.1c-3.4.4-5.5 1.1-6.5 2.1s-1.7 3.1-2.1 6.5c-.4-3.4-1.1-5.5-2.1-6.5s-3.1-1.7-6.5-2.1c3.4-.4 5.5-1.1 6.5-2.1s1.7-3.1 2.1-6.4z"
        fill={color}
      />
      <Circle cx="19.3" cy="5" r="1.1" fill={color} />
      <Circle cx="4.3" cy="16.7" r="0.9" fill={color} />
    </Svg>
  );
}

function SunriseIcon({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M2 18.6h20" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M6 18.6a6 6 0 0 1 12 0" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path
        d="M12 3.4v3.1M5.6 8 7.7 10.1M18.4 8 16.3 10.1"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path d="M9.2 15.3 12 12.5l2.8 2.8" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function SunsetIcon({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M2 18.6h20" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M6 18.6a6 6 0 0 1 12 0" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path
        d="M12 3.4v3.1M5.6 8 7.7 10.1M18.4 8 16.3 10.1"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path d="M9.2 12.5 12 15.3l2.8-2.8" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function CompassIcon({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx="12" cy="12" r="9" fill="none" stroke={color} strokeWidth={1.8} />
      <Path d="M15.3 8.7 13 13l-4.3 2.3L11 11z" fill={color} />
      <Circle cx="12" cy="12" r="1.1" fill={color} />
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

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <Svg width={14} height={14} viewBox="0 0 14 14" style={expanded ? styles.chevronExpanded : undefined}>
      <Path d="M3 5l4 4 4-4" fill="none" stroke={colors.textSecondary} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

interface AccordionProps {
  title: string;
  summary: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

// Each field group (Park, Dates, Activities, Trails, Wildlife, Notes,
// Photos) collapses into a one-line summary until tapped — the form used to
// show everything at once, which made it feel long and hard to scan.
function Accordion({ title, summary, expanded, onToggle, children }: AccordionProps) {
  return (
    <View style={styles.accordionCard}>
      <TouchableOpacity style={styles.accordionHeader} onPress={onToggle} activeOpacity={0.75}>
        <View style={styles.accordionHeaderText}>
          <Text style={styles.accordionTitle}>{title}</Text>
          <Text style={styles.accordionSummary} numberOfLines={1}>{summary}</Text>
        </View>
        <ChevronIcon expanded={expanded} />
      </TouchableOpacity>
      {expanded && <View style={styles.accordionBody}>{children}</View>}
    </View>
  );
}

const MAX_PHOTOS = 3;

const DIFFICULTY_RANK: Record<TrailDifficulty, number> = { Easy: 0, Moderate: 1, Hard: 2 };
const RARITY_RANK: Record<AnimalRarity, number> = { Common: 0, Uncommon: 1, Rare: 2 };

const ACTIVITIES: { label: ActivityType; render: (color: string) => React.ReactElement }[] = [
  { label: 'Hiking', render: (c) => <BootIcon color={c} /> },
  { label: 'Camping', render: (c) => <TentIcon color={c} /> },
  { label: 'Wildlife', render: (c) => <PawIcon color={c} /> },
  { label: 'Kayaking', render: (c) => <PaddleIcon color={c} /> },
  { label: 'Scenic Drive', render: (c) => <CarIcon color={c} /> },
  { label: 'Photography', render: (c) => <CameraIcon color={c} /> },
  { label: 'Stargazing', render: (c) => <StarIcon color={c} /> },
  { label: 'Sunrise', render: (c) => <SunriseIcon color={c} /> },
  { label: 'Sunset', render: (c) => <SunsetIcon color={c} /> },
  { label: 'Other', render: (c) => <CompassIcon color={c} /> },
];

export default function LogTripScreen() {
  const { parks, trips, logTrip, updateTrip, completeTrip, userProfile } = useApp();
  const units = userProfile.units;
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const editingTrip = route.params?.tripId ? trips.find((t) => t.id === route.params.tripId) : undefined;
  const completingTrip = route.params?.completeTripId ? trips.find((t) => t.id === route.params.completeTripId) : undefined;
  const mode: FormMode = completingTrip
    ? 'complete'
    : editingTrip
      ? (editingTrip.tripType === 'planned' ? 'plan' : 'log')
      : (route.params?.initialTripType === 'planned' ? 'plan' : 'log');
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
  const [photos, setPhotos] = useState<string[]>(editingTrip?.photos ?? []);
  const [customTrailName, setCustomTrailName] = useState('');
  const [customTrailMiles, setCustomTrailMiles] = useState('');
  const [customTrailElevation, setCustomTrailElevation] = useState('');
  const [editingTrailKey, setEditingTrailKey] = useState<string | null>(null);
  const [editMiles, setEditMiles] = useState('');
  const [editElevation, setEditElevation] = useState('');
  // Park and dates start open since they're required first; everything else
  // stays tucked away until tapped, so the form doesn't read as one long list.
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ park: true, when: true });
  const toggleSection = (key: string) => setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

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
  const completeTripId: string | undefined = route.params?.completeTripId;
  const requestedParkId: string | undefined = route.params?.parkId;
  useEffect(() => {
    const trip = editingTripId
      ? trips.find((t) => t.id === editingTripId)
      : completeTripId
        ? trips.find((t) => t.id === completeTripId)
        : undefined;
    if (trip) {
      setSelectedParkId(trip.parkId);
      setStartDate(trip.startDate);
      setEndDate(trip.endDate);
      setSelectedActivities(trip.activities);
      setNotes(trip.notes);
      setWildlifeSightings(trip.wildlifeSightings ?? []);
      setSelectedTrails(trip.trailsHiked ?? []);
      setPhotos(trip.photos ?? []);
    } else {
      setSelectedParkId(requestedParkId ?? 'yellowstone');
      setStartDate('');
      setEndDate('');
      setSelectedActivities([]);
      setNotes('');
      setWildlifeSightings([]);
      setSelectedTrails([]);
      setPhotos([]);
    }
    setWildlifeInput('');
    setCustomTrailName('');
    setCustomTrailMiles('');
    setCustomTrailElevation('');
    setEditingTrailKey(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingTripId, completeTripId, requestedParkId]);

  const selectedPark = parks.find((p) => p.id === selectedParkId);
  const sortedParks = [...parks].sort((a, b) => a.name.localeCompare(b.name));
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

  const pickPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Photo access needed', 'Allow photo library access to add trip photos.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.7,
    });
    if (result.canceled) return;
    setPhotos((prev) => [...prev, result.assets[0].uri].slice(0, MAX_PHOTOS));
  };

  const removePhoto = (uri: string) => {
    setPhotos((prev) => prev.filter((p) => p !== uri));
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

    if (mode === 'complete' && completingTrip) {
      const milesHiked = selectedTrails.length > 0
        ? selectedTrails.reduce((acc, t) => acc + t.miles, 0)
        : completingTrip.milesHiked;
      const elevationGainFt = selectedTrails.length > 0
        ? selectedTrails.reduce((acc, t) => acc + t.elevationGainFt, 0)
        : completingTrip.elevationGainFt;
      completeTrip({
        ...completingTrip,
        parkId: selectedParkId,
        startDate,
        endDate: endDate || startDate,
        activities: selectedActivities,
        notes,
        photos,
        wildlifeSightings,
        trailsHiked: selectedTrails,
        milesHiked,
        elevationGainFt,
      });
      Alert.alert('Trip completed!', 'Your passport is growing.', [{ text: 'Awesome!' }]);
      navigation.goBack();
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
        tripType: mode === 'plan' ? 'planned' : 'logged',
        parkId: selectedParkId,
        startDate,
        endDate: endDate || startDate,
        activities: selectedActivities,
        notes,
        photos,
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
      tripType: mode === 'plan' ? 'planned' : 'logged',
      startDate,
      endDate: endDate || startDate,
      activities: selectedActivities,
      notes,
      photos,
      wildlifeSightings,
      trailsHiked: selectedTrails,
    });
    Alert.alert(
      mode === 'plan' ? 'Trip planned!' : 'Adventure saved!',
      mode === 'plan' ? 'We’ll be ready when you are.' : 'Your passport is growing.',
      [{ text: mode === 'plan' ? 'Nice!' : 'Awesome!' }]
    );
    setStartDate('');
    setEndDate('');
    setNotes('');
    setSelectedActivities([]);
    setWildlifeSightings([]);
    setWildlifeInput('');
    setSelectedTrails([]);
    setPhotos([]);
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
          <Text style={styles.screenTitle}>
            {mode === 'complete' ? 'Mark as Completed' : editingTrip ? 'Edit Trip' : mode === 'plan' ? 'Plan a Trip' : 'Log a Trip'}
          </Text>
          <View style={styles.backBtn} />
        </View>

        {/* Header illustration */}
        <View style={styles.heroArea}>
          <Image source={heroImage} style={styles.heroImage} resizeMode="contain" />
        </View>

        {/* Park selector */}
        <Accordion
          title="Which park?"
          summary={selectedPark?.name ?? 'Select a park'}
          expanded={!!expanded.park}
          onToggle={() => toggleSection('park')}
        >
          <TouchableOpacity style={styles.selector} onPress={() => setShowParkPicker(!showParkPicker)}>
            <Text style={styles.selectorText}>{selectedPark?.name ?? 'Select a park'}</Text>
            <Text style={styles.selectorIcon}>{'▾'}</Text>
          </TouchableOpacity>
          {showParkPicker && (
            <View style={styles.dropdown}>
              <ScrollView style={{ maxHeight: 200 }} nestedScrollEnabled>
                {sortedParks.map((p) => (
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
        </Accordion>

        {/* Date */}
        <Accordion
          title={mode === 'plan' ? 'When are you planning to go?' : 'When did you go?'}
          summary={startDate ? formatDateRange(startDate, endDate || startDate) : 'Not set'}
          expanded={!!expanded.when}
          onToggle={() => toggleSection('when')}
        >
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onChange={(s, e) => {
              setStartDate(s);
              setEndDate(e);
            }}
          />
        </Accordion>

        {/* Activities */}
        <Accordion
          title={mode === 'plan' ? 'What are you hoping to do?' : 'What did you do?'}
          summary={selectedActivities.length ? selectedActivities.join(', ') : 'None selected yet'}
          expanded={!!expanded.activities}
          onToggle={() => toggleSection('activities')}
        >
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
        </Accordion>

        {mode !== 'plan' && (
        <>
        {/* Trails */}
        <Accordion
          title="Trails"
          summary={selectedTrails.length ? `${selectedTrails.length} selected` : 'None yet'}
          expanded={!!expanded.trails}
          onToggle={() => toggleSection('trails')}
        >
          {parkTrails.length > 0 && (
            <>
            <Text style={styles.sublabel}>Which trails did you hike?</Text>
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
            </>
          )}

          {/* Custom trail entry */}
          <Text style={[styles.sublabel, styles.sublabelSpaced]}>Add a trail we don't have</Text>
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

          {/* Selected trails — tap to log a partial distance */}
          {selectedTrails.length > 0 && (
            <>
            <Text style={[styles.sublabel, styles.sublabelSpaced]}>Your Trails</Text>
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
            </>
          )}
        </Accordion>

        {/* Wildlife */}
        <Accordion
          title="Wildlife Spotted"
          summary={wildlifeSightings.length ? `${wildlifeSightings.length} spotted` : 'None yet'}
          expanded={!!expanded.wildlife}
          onToggle={() => toggleSection('wildlife')}
        >
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
        </Accordion>
        </>
        )}

        {/* Notes */}
        <Accordion
          title="Notes / Memories"
          summary={notes.trim() ? notes.trim() : 'Add notes'}
          expanded={!!expanded.notes}
          onToggle={() => toggleSection('notes')}
        >
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
        </Accordion>

        {/* Add Photos */}
        {mode !== 'plan' && (
        <Accordion
          title="Add Photos"
          summary={photos.length ? `${photos.length} of ${MAX_PHOTOS} added` : 'Add photos'}
          expanded={!!expanded.photos}
          onToggle={() => toggleSection('photos')}
        >
          <View style={styles.photoRow}>
            {photos.map((uri) => (
              <TouchableOpacity key={uri} style={styles.photoThumbWrap} onPress={() => removePhoto(uri)} activeOpacity={0.8}>
                <Image source={{ uri }} style={styles.photoThumb} resizeMode="cover" />
                <View style={styles.photoRemoveBadge}>
                  <CloseIcon color={colors.textInverse} />
                </View>
              </TouchableOpacity>
            ))}
            {photos.length < MAX_PHOTOS && (
              <TouchableOpacity style={[styles.photoThumb, styles.photoAdd]} onPress={pickPhoto} activeOpacity={0.8}>
                <Text style={styles.photoAddIcon}>+</Text>
              </TouchableOpacity>
            )}
          </View>
        </Accordion>
        )}

        <PrimaryButton
          label={mode === 'complete' ? 'MARK AS COMPLETED' : mode === 'plan' ? 'SAVE PLAN' : editingTrip ? 'SAVE CHANGES' : 'SAVE TRIP'}
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

  accordionCard: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: 'hidden',
    ...shadows.sm,
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    gap: spacing.md,
  },
  accordionHeaderText: { flex: 1 },
  accordionTitle: { ...typography.labelBold, color: colors.textPrimary },
  accordionSummary: { ...typography.bodySmall, color: colors.textSecondary, marginTop: 2 },
  accordionBody: { paddingHorizontal: spacing.lg, paddingBottom: spacing.lg },
  chevronExpanded: { transform: [{ rotate: '180deg' }] },

  sublabel: { ...typography.labelBold, color: colors.textPrimary, marginBottom: spacing.sm },
  sublabelSpaced: { marginTop: spacing.md },

  selector: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, ...shadows.sm },
  selectorText: { ...typography.body, color: colors.textPrimary },
  selectorIcon: { fontSize: 16, color: colors.textSecondary },

  dropdown: { backgroundColor: colors.surface, borderRadius: radius.lg, marginTop: spacing.xs, ...shadows.md, overflow: 'hidden' },
  dropdownItem: { padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.divider },
  dropdownText: { ...typography.body, color: colors.textPrimary },
  dropdownTextActive: { color: colors.primary, fontFamily: typography.labelBold.fontFamily },


  activityGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  activityChip: { width: '28%', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 2, borderColor: colors.border, paddingVertical: spacing.md, ...shadows.sm },
  activityChipActive: { borderColor: colors.primary, backgroundColor: colors.primary },
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
  photoThumbWrap: { width: 72, height: 72 },
  photoThumb: { width: 72, height: 72, borderRadius: radius.md, backgroundColor: colors.surfaceWarm },
  photoAdd: { alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: colors.border, borderStyle: 'dashed' },
  photoAddIcon: { fontSize: 24, color: colors.textMuted },
  photoRemoveBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },

  saveBtn: { marginHorizontal: spacing.xl },
});
