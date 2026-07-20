import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, shadows, typography, fontFamilies } from '@/theme';
import { MainTabParamList, HomeStackParamList, ParksStackParamList, TripsStackParamList, ProfileStackParamList } from './types';

// Screens
import HomeScreen from '@/screens/Home/HomeScreen';
import ExploreScreen from '@/screens/Explore/ExploreScreen';
import ParkDetailScreen from '@/screens/ParkDetail/ParkDetailScreen';
import ParkTrailsScreen from '@/screens/ParkDetail/ParkTrailsScreen';
import ParkAnimalsScreen from '@/screens/ParkDetail/ParkAnimalsScreen';
import LogTripScreen from '@/screens/LogTrip/LogTripScreen';
import TripsScreen from '@/screens/Trips/TripsScreen';
import TripDetailScreen from '@/screens/Trips/TripDetailScreen';
import ProfileScreen from '@/screens/Profile/ProfileScreen';
import PassportScreen from '@/screens/Passport/PassportScreen';
import CollectionScreen from '@/screens/Collection/CollectionScreen';
import StatsScreen from '@/screens/Stats/StatsScreen';
import WishlistScreen from '@/screens/Wishlist/WishlistScreen';
import SettingsScreen from '@/screens/Settings/SettingsScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const ParksStack = createNativeStackNavigator<ParksStackParamList>();
const TripsStack = createNativeStackNavigator<TripsStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

function HomeStackNav() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="ParkDetail" component={ParkDetailScreen} />
      <HomeStack.Screen name="ParkTrails" component={ParkTrailsScreen} />
      <HomeStack.Screen name="ParkAnimals" component={ParkAnimalsScreen} />
    </HomeStack.Navigator>
  );
}

function ParksStackNav() {
  return (
    <ParksStack.Navigator screenOptions={{ headerShown: false }}>
      <ParksStack.Screen name="Explore" component={ExploreScreen} />
      <ParksStack.Screen name="ParkDetail" component={ParkDetailScreen} />
      <ParksStack.Screen name="ParkTrails" component={ParkTrailsScreen} />
      <ParksStack.Screen name="ParkAnimals" component={ParkAnimalsScreen} />
    </ParksStack.Navigator>
  );
}

function TripsStackNav() {
  return (
    <TripsStack.Navigator screenOptions={{ headerShown: false }}>
      <TripsStack.Screen name="Trips" component={TripsScreen} />
      <TripsStack.Screen name="TripDetail" component={TripDetailScreen} />
    </TripsStack.Navigator>
  );
}

function ProfileStackNav() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="Passport" component={PassportScreen} />
      <ProfileStack.Screen name="Collection" component={CollectionScreen} />
      <ProfileStack.Screen name="Stats" component={StatsScreen} />
      <ProfileStack.Screen name="Wishlist" component={WishlistScreen} />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} />
    </ProfileStack.Navigator>
  );
}

function CustomTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();

  const tabConfig = [
    { key: 'HomeTab', label: 'Home', icon: require('@/assets/icons/icon-dashboard.png') },
    { key: 'ParksTab', label: 'Parks', icon: require('@/assets/icons/icon-parks.png') },
    { key: 'LogTrip', label: '', icon: null },
    { key: 'TripsTab', label: 'Trips', icon: require('@/assets/icons/icon-trips.png') },
    { key: 'ProfileTab', label: 'Profile', icon: require('@/assets/icons/icon-profile.png') },
  ];

  return (
    <View style={[styles.tabBar, { paddingBottom: insets.bottom + spacing.md }]}>
      {state.routes.map((route: any, index: number) => {
        const config = tabConfig[index];
        const isFocused = state.index === index;
        const isCenter = config.key === 'LogTrip';

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        if (isCenter) {
          return (
            <TouchableOpacity key={route.key} onPress={onPress} style={styles.fabWrapper} activeOpacity={0.85}>
              <View style={styles.fab}>
                <Text style={styles.fabIcon}>+</Text>
              </View>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity key={route.key} onPress={onPress} style={styles.tabItem} activeOpacity={0.7}>
            <Image
              source={config.icon}
              style={[styles.tabIcon, isFocused && styles.tabIconActive]}
              resizeMode="contain"
            />
            <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>{config.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="HomeTab" component={HomeStackNav} />
      <Tab.Screen name="ParksTab" component={ParksStackNav} />
      <Tab.Screen name="LogTrip" component={LogTripScreen} />
      <Tab.Screen name="TripsTab" component={TripsStackNav} />
      <Tab.Screen name="ProfileTab" component={ProfileStackNav} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.tabBackground,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
    alignItems: 'center',
    ...shadows.sm,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  tabIcon: {
    width: 22,
    height: 22,
    marginBottom: 2,
    opacity: 0.45,
  },
  tabIconActive: {
    opacity: 1,
  },
  tabLabel: {
    ...typography.caption,
    color: colors.tabInactive,
  },
  tabLabelActive: {
    color: colors.tabActive,
    fontFamily: fontFamilies.bodyBold,
  },
  fabWrapper: {
    flex: 1,
    alignItems: 'center',
    marginTop: -20,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.lg,
  },
  fabIcon: {
    fontSize: 28,
    color: colors.textInverse,
    lineHeight: 32,
  },
});
