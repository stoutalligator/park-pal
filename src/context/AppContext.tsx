import React, { createContext, useContext, useState, useCallback } from 'react';
import { Park, Trip, Badge, UserStats, UserProfile, ParkStatus, ActivityType, ProfileBackground } from '@/types';
import { ALL_PARKS, TOTAL_PARKS } from '@/data/parks';
import { MOCK_TRIPS } from '@/data/trips';
import { ALL_BADGES } from '@/data/badges';

interface AppContextValue {
  parks: Park[];
  trips: Trip[];
  badges: Badge[];
  userProfile: UserProfile;
  stats: UserStats;

  updateParkStatus: (parkId: string, status: ParkStatus) => void;
  toggleFavorite: (parkId: string) => void;
  logTrip: (trip: Omit<Trip, 'id'>) => void;
  updateTrip: (trip: Trip) => void;
  deleteTrip: (tripId: string) => void;
  completeOnboarding: (profile: Partial<UserProfile>) => void;
  updateProfileBackground: (background: ProfileBackground) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [parks, setParks] = useState<Park[]>(ALL_PARKS);
  const [trips, setTrips] = useState<Trip[]>(MOCK_TRIPS);
  const [badges, setBadges] = useState<Badge[]>(ALL_BADGES);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Explorer',
    onboardingComplete: false,
    profileBackground: 'mountain-lake',
  });

  const stats: UserStats = {
    totalVisited: parks.filter((p) => p.status === 'visited').length,
    totalRemaining: TOTAL_PARKS - parks.filter((p) => p.status === 'visited').length,
    bucketListCount: parks.filter((p) => p.status === 'bucketList').length,
    completionPercentage: Math.round(
      (parks.filter((p) => p.status === 'visited').length / TOTAL_PARKS) * 100
    ),
    totalTrips: trips.length,
    totalPhotos: trips.reduce((acc, t) => acc + t.photos.length, 0),
    totalMilesHiked: trips.reduce((acc, t) => acc + (t.milesHiked ?? 0), 0),
    statesVisited: new Set(
      parks.filter((p) => p.status === 'visited').map((p) => p.state)
    ).size,
    favoriteActivity: getMostCommonActivity(trips),
  };

  const updateParkStatus = useCallback((parkId: string, status: ParkStatus) => {
    setParks((prev) =>
      prev.map((p) => (p.id === parkId ? { ...p, status } : p))
    );
  }, []);

  const toggleFavorite = useCallback((parkId: string) => {
    setParks((prev) =>
      prev.map((p) => (p.id === parkId ? { ...p, isFavorite: !p.isFavorite } : p))
    );
  }, []);

  const logTrip = useCallback((trip: Omit<Trip, 'id'>) => {
    const newTrip: Trip = { ...trip, id: `trip-${Date.now()}` };
    setTrips((prev) => [newTrip, ...prev]);
    setParks((prev) =>
      prev.map((p) =>
        p.id === trip.parkId ? { ...p, status: 'visited' } : p
      )
    );
  }, []);

  const updateTrip = useCallback((trip: Trip) => {
    setTrips((prev) => prev.map((t) => (t.id === trip.id ? trip : t)));
  }, []);

  const deleteTrip = useCallback((tripId: string) => {
    setTrips((prev) => prev.filter((t) => t.id !== tripId));
  }, []);

  const completeOnboarding = useCallback((profile: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...profile, onboardingComplete: true }));
  }, []);

  const updateProfileBackground = useCallback((background: ProfileBackground) => {
    setUserProfile((prev) => ({ ...prev, profileBackground: background }));
  }, []);

  return (
    <AppContext.Provider
      value={{
        parks,
        trips,
        badges,
        userProfile,
        stats,
        updateParkStatus,
        toggleFavorite,
        logTrip,
        updateTrip,
        deleteTrip,
        completeOnboarding,
        updateProfileBackground,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

function getMostCommonActivity(trips: Trip[]): string {
  const counts: Record<string, number> = {};
  trips.forEach((t) =>
    t.activities.forEach((a) => {
      counts[a] = (counts[a] ?? 0) + 1;
    })
  );
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return sorted[0]?.[0] ?? 'Hiking';
}
