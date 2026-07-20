import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';
import { Park, Trip, Badge, UserStats, UserProfile, ParkStatus, ActivityType, ProfileBackground, ProfileAvatar } from '@/types';
import { ALL_PARKS, TOTAL_PARKS } from '@/data/parks';
import { ALL_BADGES } from '@/data/badges';
import { ALL_ANIMALS } from '@/data/animals';
import { supabase } from '@/lib/supabase';

const DEFAULT_PROFILE: UserProfile = {
  name: 'Explorer',
  onboardingComplete: false,
  profileBackground: 'mountain-lake',
  avatar: 'hiking',
};

interface TrailCompletionRow {
  trail_id: string | null;
  trip_id: string | null;
  park_id: string;
  name: string;
  miles: number;
  elevation_gain_ft: number;
}

interface AnimalSightingRow {
  animal_id: string | null;
  trip_id: string | null;
  park_id: string;
  name: string;
}

interface AppContextValue {
  parks: Park[];
  trips: Trip[];
  badges: Badge[];
  userProfile: UserProfile;
  stats: UserStats;
  session: Session | null;
  authLoading: boolean;

  updateParkStatus: (parkId: string, status: ParkStatus) => void;
  toggleFavorite: (parkId: string) => void;
  logTrip: (trip: Omit<Trip, 'id'>) => void;
  updateTrip: (trip: Trip) => void;
  deleteTrip: (tripId: string) => void;
  completeOnboarding: (profile: Partial<UserProfile>) => void;
  updateProfileBackground: (background: ProfileBackground) => void;
  updateProfileAvatar: (avatar: ProfileAvatar) => void;
  signOut: () => Promise<void>;
  isTrailCompleted: (trailId: string) => boolean;
  isAnimalSpotted: (animalId: string) => boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [parks, setParks] = useState<Park[]>(ALL_PARKS);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [badges, setBadges] = useState<Badge[]>(ALL_BADGES);
  const [userProfile, setUserProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [trailCompletions, setTrailCompletions] = useState<TrailCompletionRow[]>([]);
  const [animalSightings, setAnimalSightings] = useState<AnimalSightingRow[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) return;
        setUserProfile({
          name: data.name,
          explorerStyle: data.explorer_style ?? undefined,
          goal: data.goal ?? undefined,
          onboardingComplete: data.onboarding_complete,
          profileBackground: data.profile_background,
          avatar: data.avatar,
        });
      });
  }, [session]);

  useEffect(() => {
    if (!session) {
      setParks(ALL_PARKS);
      return;
    }
    supabase
      .from('user_park_status')
      .select('*')
      .eq('user_id', session.user.id)
      .then(({ data, error }) => {
        if (error || !data) return;
        const statusByParkId = new Map(data.map((row) => [row.park_id, row]));
        setParks(
          ALL_PARKS.map((park) => {
            const row = statusByParkId.get(park.id);
            return {
              ...park,
              status: (row?.status as ParkStatus) ?? 'notVisited',
              isFavorite: row?.is_favorite ?? false,
            };
          })
        );
      });
  }, [session]);

  useEffect(() => {
    if (!session) {
      setTrailCompletions([]);
      setAnimalSightings([]);
      setTrips([]);
      return;
    }
    Promise.all([
      supabase
        .from('user_trail_completions')
        .select('trail_id, trip_id, park_id, name, miles, elevation_gain_ft')
        .eq('user_id', session.user.id),
      supabase
        .from('user_animal_sightings')
        .select('animal_id, trip_id, park_id, name')
        .eq('user_id', session.user.id),
      supabase
        .from('trips')
        .select('*')
        .eq('user_id', session.user.id)
        .order('start_date', { ascending: false }),
    ]).then(([trailRes, animalRes, tripRes]) => {
      const trailRows: TrailCompletionRow[] = trailRes.data ?? [];
      const animalRows: AnimalSightingRow[] = animalRes.data ?? [];
      setTrailCompletions(trailRows);
      setAnimalSightings(animalRows);
      if (!tripRes.data) return;
      setTrips(
        tripRes.data.map((row) => ({
          id: row.id,
          parkId: row.park_id,
          startDate: row.start_date,
          endDate: row.end_date,
          activities: row.activities as ActivityType[],
          notes: row.notes,
          photos: [],
          weather: row.weather ?? undefined,
          favoriteTrail: row.favorite_trail ?? undefined,
          wildlifeSightings: animalRows.filter((a) => a.trip_id === row.id).map((a) => a.name),
          trailsHiked: trailRows
            .filter((t) => t.trip_id === row.id)
            .map((t) => ({
              trailId: t.trail_id ?? undefined,
              name: t.name,
              miles: t.miles,
              elevationGainFt: t.elevation_gain_ft,
            })),
          rating: row.rating ?? undefined,
          milesHiked: row.miles_hiked ?? undefined,
          elevationGainFt: row.elevation_gain_ft ?? undefined,
        }))
      );
    });
  }, [session]);

  const isTrailCompleted = useCallback(
    (trailId: string) => trailCompletions.some((row) => row.trail_id === trailId),
    [trailCompletions]
  );

  const isAnimalSpotted = useCallback(
    (animalId: string) => animalSightings.some((row) => row.animal_id === animalId),
    [animalSightings]
  );

  const stats: UserStats = {
    totalVisited: parks.filter((p) => p.status === 'visited').length,
    totalRemaining: TOTAL_PARKS - parks.filter((p) => p.status === 'visited').length,
    bucketListCount: parks.filter((p) => p.status === 'bucketList').length,
    completionPercentage: Math.round(
      (parks.filter((p) => p.status === 'visited').length / TOTAL_PARKS) * 100
    ),
    totalTrips: trips.length,
    totalPhotos: trips.reduce((acc, t) => acc + t.photos.length, 0),
    totalMilesHiked: trailCompletions.reduce((acc, row) => acc + row.miles, 0),
    totalElevationGain: trailCompletions.reduce((acc, row) => acc + row.elevation_gain_ft, 0),
    statesVisited: new Set(
      parks.filter((p) => p.status === 'visited').map((p) => p.state)
    ).size,
    favoriteActivity: getMostCommonActivity(trips),
  };

  const persistParkStatus = useCallback(
    (parkId: string, status: ParkStatus, isFavorite: boolean) => {
      if (!session) return;
      supabase
        .from('user_park_status')
        .upsert({ park_id: parkId, status, is_favorite: isFavorite }, { onConflict: 'user_id,park_id' })
        .then();
    },
    [session]
  );

  const updateParkStatus = useCallback((parkId: string, status: ParkStatus) => {
    setParks((prev) =>
      prev.map((p) => (p.id === parkId ? { ...p, status } : p))
    );
    const isFavorite = parks.find((p) => p.id === parkId)?.isFavorite ?? false;
    persistParkStatus(parkId, status, isFavorite);
  }, [parks, persistParkStatus]);

  const toggleFavorite = useCallback((parkId: string) => {
    const current = parks.find((p) => p.id === parkId);
    const nextFavorite = !(current?.isFavorite ?? false);
    setParks((prev) =>
      prev.map((p) => (p.id === parkId ? { ...p, isFavorite: nextFavorite } : p))
    );
    persistParkStatus(parkId, current?.status ?? 'notVisited', nextFavorite);
  }, [parks, persistParkStatus]);

  const logTrip = useCallback(async (trip: Omit<Trip, 'id'>) => {
    const milesHiked = trip.trailsHiked?.reduce((acc, t) => acc + t.miles, 0) ?? trip.milesHiked;
    const elevationGainFt = trip.trailsHiked?.reduce((acc, t) => acc + t.elevationGainFt, 0) ?? trip.elevationGainFt;

    let tripId = `trip-${Date.now()}`;
    if (session) {
      const { data, error } = await supabase
        .from('trips')
        .insert({
          park_id: trip.parkId,
          start_date: trip.startDate,
          end_date: trip.endDate,
          activities: trip.activities,
          notes: trip.notes,
          weather: trip.weather ?? null,
          favorite_trail: trip.favoriteTrail ?? null,
          wildlife_sightings: trip.wildlifeSightings ?? null,
          rating: trip.rating ?? null,
          miles_hiked: milesHiked ?? null,
          elevation_gain_ft: elevationGainFt ?? null,
        })
        .select('id')
        .single();
      if (!error && data) tripId = data.id;
    }

    const newTrip: Trip = { ...trip, milesHiked, elevationGainFt, id: tripId };
    setTrips((prev) => [newTrip, ...prev]);
    setParks((prev) =>
      prev.map((p) =>
        p.id === trip.parkId ? { ...p, status: 'visited' } : p
      )
    );
    const isFavorite = parks.find((p) => p.id === trip.parkId)?.isFavorite ?? false;
    persistParkStatus(trip.parkId, 'visited', isFavorite);

    if (session) {
      if (newTrip.trailsHiked?.length) {
        const rows = newTrip.trailsHiked.map((t) => ({
          trail_id: t.trailId ?? null,
          trip_id: tripId,
          park_id: trip.parkId,
          name: t.name,
          miles: t.miles,
          elevation_gain_ft: t.elevationGainFt,
        }));
        setTrailCompletions((prev) => [...prev, ...rows]);
        supabase.from('user_trail_completions').insert(rows).then();
      }
      if (newTrip.wildlifeSightings?.length) {
        const parkAnimals = ALL_ANIMALS.filter((a) => a.parkId === trip.parkId);
        const rows = newTrip.wildlifeSightings.map((name) => ({
          animal_id: parkAnimals.find((a) => a.name.toLowerCase() === name.toLowerCase())?.id ?? null,
          trip_id: tripId,
          park_id: trip.parkId,
          name,
        }));
        setAnimalSightings((prev) => [...prev, ...rows]);
        supabase.from('user_animal_sightings').insert(rows).then();
      }
    }
  }, [parks, persistParkStatus, session]);

  const updateTrip = useCallback((trip: Trip) => {
    setTrips((prev) => prev.map((t) => (t.id === trip.id ? trip : t)));
    if (session) {
      supabase
        .from('trips')
        .update({
          park_id: trip.parkId,
          start_date: trip.startDate,
          end_date: trip.endDate,
          activities: trip.activities,
          notes: trip.notes,
          weather: trip.weather ?? null,
          favorite_trail: trip.favoriteTrail ?? null,
          wildlife_sightings: trip.wildlifeSightings ?? null,
          rating: trip.rating ?? null,
          miles_hiked: trip.milesHiked ?? null,
          elevation_gain_ft: trip.elevationGainFt ?? null,
        })
        .eq('id', trip.id)
        .then();
    }
  }, [session]);

  const deleteTrip = useCallback((tripId: string) => {
    setTrips((prev) => prev.filter((t) => t.id !== tripId));
    if (session) {
      supabase.from('trips').delete().eq('id', tripId).then();
      // Cascades server-side too; mirror locally so counts/checkmarks update immediately.
      setTrailCompletions((prev) => prev.filter((r) => r.trip_id !== tripId));
      setAnimalSightings((prev) => prev.filter((r) => r.trip_id !== tripId));
    }
  }, [session]);

  const completeOnboarding = useCallback((profile: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...profile, onboardingComplete: true }));
    if (session) {
      supabase
        .from('profiles')
        .update({
          ...(profile.name !== undefined && { name: profile.name }),
          ...(profile.explorerStyle !== undefined && { explorer_style: profile.explorerStyle }),
          ...(profile.goal !== undefined && { goal: profile.goal }),
          onboarding_complete: true,
        })
        .eq('id', session.user.id)
        .then();
    }
  }, [session]);

  const updateProfileBackground = useCallback((background: ProfileBackground) => {
    setUserProfile((prev) => ({ ...prev, profileBackground: background }));
    if (session) {
      supabase.from('profiles').update({ profile_background: background }).eq('id', session.user.id).then();
    }
  }, [session]);

  const updateProfileAvatar = useCallback((avatar: ProfileAvatar) => {
    setUserProfile((prev) => ({ ...prev, avatar }));
    if (session) {
      supabase.from('profiles').update({ avatar }).eq('id', session.user.id).then();
    }
  }, [session]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUserProfile(DEFAULT_PROFILE);
  }, []);

  return (
    <AppContext.Provider
      value={{
        parks,
        trips,
        badges,
        userProfile,
        stats,
        session,
        authLoading,
        updateParkStatus,
        toggleFavorite,
        logTrip,
        updateTrip,
        deleteTrip,
        completeOnboarding,
        updateProfileBackground,
        updateProfileAvatar,
        signOut,
        isTrailCompleted,
        isAnimalSpotted,
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
