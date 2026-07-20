import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '@/context/AppContext';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import TripCard from '@/components/TripCard';
import { ProfileBackground, ProfileAvatar } from '@/types';
import { getBadgeImage } from '@/data/badgeImages';

const BACKGROUND_OPTIONS: { key: ProfileBackground; label: string; source: number }[] = [
  { key: 'mountain-lake', label: 'Mountain Lake', source: require('@/assets/scenes/scene-mountain-lake.png') },
  { key: 'forest', label: 'Redwood Forest', source: require('@/assets/scenes/scene-forest.png') },
  { key: 'arches', label: 'Desert Arch', source: require('@/assets/scenes/scene-arches.png') },
  { key: 'mountain-gate', label: 'Trailhead', source: require('@/assets/scenes/scene-mountain-gate.png') },
  { key: 'night-camping', label: 'Starry Camp', source: require('@/assets/scenes/scene-night-camping.png') },
];

const BACKGROUND_BY_KEY = Object.fromEntries(BACKGROUND_OPTIONS.map((o) => [o.key, o.source])) as Record<
  ProfileBackground,
  number
>;

const AVATAR_OPTIONS: { key: ProfileAvatar; label: string; source: number }[] = [
  { key: 'hiking', label: 'Hiking', source: require('@/assets/activities/bear-hiking.png') },
  { key: 'camping', label: 'Camping', source: require('@/assets/activities/bear-camping.png') },
  { key: 'wildlife-viewing', label: 'Wildlife', source: require('@/assets/activities/bear-wildlife-viewing.png') },
  { key: 'kayaking', label: 'Kayaking', source: require('@/assets/activities/bear-kayaking.png') },
  { key: 'scenic-drive', label: 'Scenic Drive', source: require('@/assets/activities/bear-scenic-drive.png') },
  { key: 'photography', label: 'Photography', source: require('@/assets/activities/bear-photography.png') },
  { key: 'backpacking', label: 'Backpacking', source: require('@/assets/activities/bear-backpacking.png') },
  { key: 'stargazing', label: 'Stargazing', source: require('@/assets/activities/bear-stargazing.png') },
  { key: 'fishing', label: 'Fishing', source: require('@/assets/activities/bear-fishing.png') },
  { key: 'horseback-riding', label: 'Horseback', source: require('@/assets/activities/bear-horseback-riding.png') },
  { key: 'nature-walk', label: 'Nature Walk', source: require('@/assets/activities/bear-nature-walk.png') },
  { key: 'waterfall-hike', label: 'Waterfall Hike', source: require('@/assets/activities/bear-waterfall-hike.png') },
  { key: 'picnic', label: 'Picnic', source: require('@/assets/activities/bear-picnic.png') },
  { key: 'rock-climbing', label: 'Rock Climbing', source: require('@/assets/activities/bear-rock-climbing.png') },
  { key: 'winter-activity', label: 'Winter', source: require('@/assets/activities/bear-winter-activity.png') },
];

const AVATAR_BY_KEY = Object.fromEntries(AVATAR_OPTIONS.map((o) => [o.key, o.source])) as Record<
  ProfileAvatar,
  number
>;

const SHORTCUTS = [
  { label: 'Passport', screen: 'Passport', icon: require('@/assets/icons/icon-passport.png') },
  { label: 'Stats', screen: 'Stats', icon: require('@/assets/icons/icon-explore.png') },
  { label: 'Bucket List', screen: 'Wishlist', icon: require('@/assets/icons/icon-favorites.png') },
  { label: 'Settings', screen: 'Settings', icon: require('@/assets/icons/icon-settings.png') },
];

// Every scene option is a 1536x1024 (or equivalent 1.5:1) landscape — size
// the hero to that same ratio so the image fills it exactly, no cropping
// and no leftover letterbox space.
const HERO_IMAGE_ASPECT = 1.5;
const SCREEN_WIDTH = Dimensions.get('window').width;
const HERO_HEIGHT = SCREEN_WIDTH / HERO_IMAGE_ASPECT;

export default function ProfileScreen() {
  const { stats, trips, badges, userProfile, updateProfileBackground, updateProfileAvatar } = useApp();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const [pickerVisible, setPickerVisible] = useState(false);
  const [avatarPickerVisible, setAvatarPickerVisible] = useState(false);

  const recentTrips = trips.slice(0, 3);
  const earnedBadges = badges.filter((b) => b.earned);

  const heroSource = BACKGROUND_BY_KEY[userProfile.profileBackground] ?? BACKGROUND_BY_KEY['mountain-lake'];
  const avatarSource = AVATAR_BY_KEY[userProfile.avatar] ?? AVATAR_BY_KEY['hiking'];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Image source={heroSource} style={styles.heroImage} resizeMode="cover" />

          <TouchableOpacity
            style={[styles.editBackgroundBtn, { top: insets.top + spacing.lg }]}
            onPress={() => setPickerVisible(true)}
            hitSlop={10}
            activeOpacity={0.85}
          >
            <Image source={require('@/assets/icons/icon-photos.png')} style={styles.editBackgroundIcon} />
          </TouchableOpacity>

          <View style={styles.heroContent} pointerEvents="box-none">
            <TouchableOpacity
              style={styles.avatarRing}
              onPress={() => setAvatarPickerVisible(true)}
              activeOpacity={0.85}
            >
              <Image source={avatarSource} style={styles.avatarImage} resizeMode="contain" />
            </TouchableOpacity>
            <View style={styles.blurStack}>
              <BlurView intensity={12} tint="dark" style={[StyleSheet.absoluteFill, styles.blurLayer3]} />
              <BlurView intensity={24} tint="dark" style={[StyleSheet.absoluteFill, styles.blurLayer2]} />
              <BlurView intensity={40} tint="dark" style={[StyleSheet.absoluteFill, styles.blurLayer1]} />
              <View style={styles.textContent}>
                <Text style={styles.greeting}>Hey, {userProfile.name}!</Text>
                <Text style={styles.tagline}>Keep exploring. The outdoors is calling.</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{stats.totalVisited}</Text>
            <Text style={styles.statLabel}>Visited</Text>
          </View>
          <View style={[styles.statCard, styles.statCardMid]}>
            <Text style={styles.statNum}>{stats.totalRemaining}</Text>
            <Text style={styles.statLabel}>To Go</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{stats.bucketListCount}</Text>
            <Text style={styles.statLabel}>Bucket List</Text>
          </View>
        </View>

        {/* Recent Trips */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Trips</Text>
            <TouchableOpacity onPress={() => navigation.navigate('TripsTab')}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          {recentTrips.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              onPress={() => navigation.navigate('TripsTab', { screen: 'TripDetail', params: { tripId: trip.id } })}
            />
          ))}
        </View>

        {/* Collection preview */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Collection</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Collection')}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.badgeRow}>
            {earnedBadges.slice(0, 4).map((b) => (
              <View key={b.id} style={styles.badgeBubble}>
                <Image
                  source={getBadgeImage(b.id)}
                  style={styles.badgeImage}
                  resizeMode="contain"
                />
              </View>
            ))}
          </View>
        </View>

        {/* Shortcut links */}
        <View style={styles.section}>
          {SHORTCUTS.map(({ label, screen, icon }) => (
            <TouchableOpacity key={screen} style={styles.linkRow} onPress={() => navigation.navigate(screen as any)}>
              <View style={styles.linkLeft}>
                <Image source={icon} style={styles.linkIcon} resizeMode="contain" />
                <Text style={styles.linkLabel}>{label}</Text>
              </View>
              <Text style={styles.linkChevron}>{'›'}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {avatarPickerVisible && (
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={() => setAvatarPickerVisible(false)}
          />
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>Choose Your Bear</Text>
            <ScrollView contentContainerStyle={styles.avatarGrid} showsVerticalScrollIndicator={false}>
              {AVATAR_OPTIONS.map((option) => {
                const selected = option.key === userProfile.avatar;
                return (
                  <TouchableOpacity
                    key={option.key}
                    style={styles.avatarOptionCard}
                    activeOpacity={0.85}
                    onPress={() => {
                      updateProfileAvatar(option.key);
                      setAvatarPickerVisible(false);
                    }}
                  >
                    <View style={[styles.avatarOptionThumb, selected && styles.avatarOptionThumbSelected]}>
                      <Image source={option.source} style={styles.avatarOptionImage} resizeMode="contain" />
                    </View>
                    <Text style={styles.optionLabel} numberOfLines={1}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      )}

      {pickerVisible && (
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={() => setPickerVisible(false)}
          />
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>Choose a Background</Text>
            <ScrollView contentContainerStyle={styles.modalGrid} showsVerticalScrollIndicator={false}>
              {BACKGROUND_OPTIONS.map((option) => {
                const selected = option.key === userProfile.profileBackground;
                return (
                  <TouchableOpacity
                    key={option.key}
                    style={styles.optionCard}
                    activeOpacity={0.85}
                    onPress={() => {
                      updateProfileBackground(option.key);
                      setPickerVisible(false);
                    }}
                  >
                    <Image source={option.source} style={[styles.optionThumb, selected && styles.optionThumbSelected]} />
                    <Text style={styles.optionLabel} numberOfLines={1}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingBottom: spacing['5xl'] },

  hero: {
    height: HERO_HEIGHT,
    backgroundColor: colors.primary,
    position: 'relative',
    overflow: 'hidden',
    borderBottomLeftRadius: radius['2xl'],
    borderBottomRightRadius: radius['2xl'],
  },
  heroImage: {
    width: SCREEN_WIDTH,
    height: HERO_HEIGHT,
  },
  editBackgroundBtn: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.xl,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  editBackgroundIcon: { width: 18, height: 18 },
  heroContent: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
  },
  avatarRing: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.background,
    borderWidth: 3,
    borderColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    ...shadows.md,
  },
  avatarImage: { width: 64, height: 64 },
  blurStack: { position: 'relative', zIndex: 1 },
  // The main panel (blurLayer1) matches the original single-blur size; two
  // faint, slightly larger layers behind it soften just the boundary so it
  // doesn't end in a hard edge, without spreading into a big diffuse halo.
  blurLayer1: { margin: 0, borderRadius: radius.lg, overflow: 'hidden' },
  blurLayer2: { margin: -8, borderRadius: radius.lg + 8, overflow: 'hidden' },
  blurLayer3: { margin: -16, borderRadius: radius.lg + 16, overflow: 'hidden' },
  textContent: {
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  greeting: { ...typography.h3, color: colors.textInverse },
  tagline: { ...typography.bodySmall, color: colors.textInverse, textAlign: 'center', opacity: 0.9 },

  statsRow: {
    flexDirection: 'row',
    marginHorizontal: spacing.xl,
    marginTop: -40,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    overflow: 'hidden',
    ...shadows.md,
    marginBottom: spacing.xl,
  },
  statCard: { flex: 1, padding: spacing.lg, alignItems: 'center' },
  statCardMid: { borderLeftWidth: 1, borderRightWidth: 1, borderColor: colors.divider },
  statNum: { ...typography.h3, color: colors.textPrimary },
  statLabel: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },

  section: { paddingHorizontal: spacing.xl, marginBottom: spacing.xl, gap: spacing.sm },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { ...typography.h5, color: colors.textPrimary },
  viewAll: { ...typography.labelSmall, color: colors.sage },

  badgeRow: { flexDirection: 'row', gap: spacing.md },
  badgeBubble: {
    width: 60,
    height: 68,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceWarm,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  badgeImage: { width: 48, height: 56 },

  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    ...shadows.sm,
    marginBottom: spacing.sm,
  },
  linkLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  linkIcon: { width: 22, height: 22 },
  linkLabel: { ...typography.labelSemiBold, color: colors.textPrimary },
  linkChevron: { fontSize: 20, color: colors.textMuted },

  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
    zIndex: 10,
  },
  modalSheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: radius['2xl'],
    borderTopRightRadius: radius['2xl'],
    paddingVertical: spacing.xl,
    paddingLeft: spacing.xl,
    maxHeight: '75%',
  },
  modalTitle: { ...typography.h5, color: colors.textPrimary, marginBottom: spacing.lg, paddingRight: spacing.xl },
  modalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    paddingRight: spacing.xl,
    paddingBottom: spacing.sm,
  },
  optionCard: { alignItems: 'center', gap: spacing.xs, width: 96 },
  optionThumb: {
    width: 96,
    height: 96,
    borderRadius: radius.lg,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  optionThumbSelected: { borderColor: colors.primary },
  optionLabel: { ...typography.caption, color: colors.textSecondary, textAlign: 'center' },

  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    paddingRight: spacing.xl,
    paddingBottom: spacing.sm,
  },
  avatarOptionCard: { alignItems: 'center', gap: spacing.xs, width: 76 },
  avatarOptionThumb: {
    width: 76,
    height: 76,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceWarm,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'transparent',
  },
  avatarOptionThumbSelected: { borderColor: colors.primary },
  avatarOptionImage: { width: 54, height: 54 },
});
