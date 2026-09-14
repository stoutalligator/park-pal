import React, { createContext, useContext, useState, useCallback, useEffect, useMemo, useRef } from 'react';
import type { Session } from '@supabase/supabase-js';
import { Park, Trip, TripType, TripTrailEntry, Badge, UserStats, UserProfile, ParkStatus, ActivityType, ProfileBackground, ProfileAvatar, Units } from '@/types';
import { ALL_PARKS, TOTAL_PARKS } from '@/data/parks';
import { ALL_BADGES } from '@/data/badges';
import { BADGE_PROGRESS } from '@/data/badgeRules';
import { ALL_ANIMALS } from '@/data/animals';
import { supabase } from '@/lib/supabase';
import { showToast } from '@/components/Toast';

// Logs the failure and surfaces a toast so a failed save is never silent —
// `action` should read naturally after "Couldn't ", e.g. "save your trip".
function reportError(action: string, error: unknown) {
  console.error(`Failed to ${action}:`, error);
  showToast(`Couldn't ${action}. Please try again.`, 'error');
}

const DEFAULT_PROFILE: UserProfile = {
  name: 'Explorer',
  onboardingComplete: false,
  profileBackground: 'mountain-lake',
  avatar: 'hiking',
  units: 'mi',
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

const TRIP_PHOTOS_BUCKET = 'trip-photos';

function storagePathFromPublicUrl(url: string): string | null {
  const marker = `/storage/v1/object/public/${TRIP_PHOTOS_BUCKET}/`;
  const index = url.indexOf(marker);
  return index === -1 ? null : url.slice(index + marker.length);
}

function publicUrlFromStoragePath(path: string): string {
  return supabase.storage.from(TRIP_PHOTOS_BUCKET).getPublicUrl(path).data.publicUrl;
}

// Reconciles a trip's desired photo list (a mix of already-uploaded public
// URLs and freshly-picked local file URIs, capped at 3 by the schema) against
// what's stored. Local URIs get uploaded; public URLs are re-linked without
// re-uploading; anything dropped from the list is deleted from Storage too.
async function syncTripPhotos(tripId: string, userId: string, photos: string[]): Promise<string[]> {
  const { data: existingRows } = await supabase
    .from('trip_photos')
    .select('storage_path')
    .eq('trip_id', tripId);

  const keptPaths = new Set<string>();
  const finalPaths: string[] = [];
  for (const photo of photos.slice(0, 3)) {
    const existingPath = storagePathFromPublicUrl(photo);
    if (existingPath) {
      finalPaths.push(existingPath);
      keptPaths.add(existingPath);
      continue;
    }
    const path = `${userId}/${tripId}/${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`;
    const response = await fetch(photo);
    const arrayBuffer = await response.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from(TRIP_PHOTOS_BUCKET)
      .upload(path, arrayBuffer, { contentType: 'image/jpeg' });
    if (uploadError) throw uploadError;
    finalPaths.push(path);
  }

  const orphanedPaths = (existingRows ?? [])
    .map((row) => row.storage_path)
    .filter((path) => !keptPaths.has(path));
  if (orphanedPaths.length) {
    const { error: removeError } = await supabase.storage.from(TRIP_PHOTOS_BUCKET).remove(orphanedPaths);
    if (removeError) throw removeError;
  }

  const { error: deleteError } = await supabase.from('trip_photos').delete().eq('trip_id', tripId);
  if (deleteError) throw deleteError;
  if (finalPaths.length) {
    const { error: insertError } = await supabase
      .from('trip_photos')
      .insert(finalPaths.map((storage_path, slot) => ({ trip_id: tripId, storage_path, slot })));
    if (insertError) throw insertError;
  }

  return finalPaths.map(publicUrlFromStoragePath);
}

// Shared row-building for user_trail_completions / user_animal_sightings
// inserts — used by both logTrip and completeTrip so the two stay in sync.
function buildTrailRows(trailsHiked: TripTrailEntry[], tripId: string, parkId: string): TrailCompletionRow[] {
  return trailsHiked.map((t) => ({
    trail_id: t.trailId ?? null,
    trip_id: tripId,
    park_id: parkId,
    name: t.name,
    miles: t.miles,
    elevation_gain_ft: t.elevationGainFt,
  }));
}

function buildAnimalRows(wildlifeSightings: string[], tripId: string, parkId: string): AnimalSightingRow[] {
  const parkAnimals = ALL_ANIMALS.filter((a) => a.parkId === parkId);
  return wildlifeSightings.map((name) => ({
    animal_id: parkAnimals.find((a) => a.name.toLowerCase() === name.toLowerCase())?.id ?? null,
    trip_id: tripId,
    park_id: parkId,
    name,
  }));
}

interface AppContextValue {
  parks: Park[];
  trips: Trip[];
  badges: Badge[];
  userProfile: UserProfile;
  stats: UserStats;
  session: Session | null;
  authLoading: boolean;
  dataLoading: boolean;

  updateParkStatus: (parkId: string, status: ParkStatus) => void;
  toggleFavorite: (parkId: string) => void;
  logTrip: (trip: Omit<Trip, 'id'>) => void;
  updateTrip: (trip: Trip) => void;
  completeTrip: (trip: Trip) => void;
  deleteTrip: (tripId: string) => void;
  completeOnboarding: (profile: Partial<UserProfile>) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  updateProfileBackground: (background: ProfileBackground) => void;
  updateProfileAvatar: (avatar: ProfileAvatar) => void;
  updateUnits: (units: Units) => void;
  signOut: () => Promise<void>;
  isTrailCompleted: (trailId: string) => boolean;
  isAnimalSpotted: (animalId: string) => boolean;
  markTrailCompleted: (trailId: string, parkId: string, name: string) => void;
  unmarkTrailCompleted: (trailId: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [parks, setParks] = useState<Park[]>(ALL_PARKS);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [earnedDates, setEarnedDates] = useState<Record<string, string>>({});
  const earnedIdsRef = useRef<Set<string>>(new Set());
  const [userProfile, setUserProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [trailCompletions, setTrailCompletions] = useState<TrailCompletionRow[]>([]);
  const [animalSightings, setAnimalSightings] = useState<AnimalSightingRow[]>([]);
  // Tracks whether the signed-in user's own parks/profile/badges/trips have
  // finished loading from Supabase, so the UI can hold a spinner instead of
  // briefly showing zeroed-out stats for a returning user with real history.
  const [parksLoaded, setParksLoaded] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [badgesLoaded, setBadgesLoaded] = useState(false);
  const [tripsLoaded, setTripsLoaded] = useState(false);
  const dataLoading = !!session && !(parksLoaded && profileLoaded && badgesLoaded && tripsLoaded);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) => {
        setSession(data.session);
      })
      .catch((error) => {
        console.error('Failed to get Supabase session:', error);
      })
      .finally(() => {
        setAuthLoading(false);
      });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) {
      setUserProfile(DEFAULT_PROFILE);
      setProfileLoaded(false);
      return;
    }
    setProfileLoaded(false);
    supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          setUserProfile(DEFAULT_PROFILE);
          return;
        }
        setUserProfile({
          name: data.name,
          explorerStyle: data.explorer_style ?? undefined,
          goal: data.goal ?? undefined,
          onboardingComplete: data.onboarding_complete,
          profileBackground: data.profile_background,
          avatar: data.avatar,
          units: (data.units as Units) ?? 'mi',
        });
      })
      .then(() => setProfileLoaded(true));
  }, [session]);

  useEffect(() => {
    if (!session) {
      setParks(ALL_PARKS);
      setParksLoaded(false);
      return;
    }
    setParksLoaded(false);
    supabase
      .from('user_park_status')
      .select('*')
      .eq('user_id', session.user.id)
      .then(({ data, error }) => {
        if (error || !data) {
          setParks(ALL_PARKS);
          return;
        }
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
      })
      .then(() => setParksLoaded(true));
  }, [session]);

  useEffect(() => {
    if (!session) {
      setEarnedDates({});
      earnedIdsRef.current = new Set();
      setBadgesLoaded(false);
      return;
    }
    setBadgesLoaded(false);
    supabase
      .from('user_badges')
      .select('badge_id, earned_date')
      .eq('user_id', session.user.id)
      .eq('earned', true)
      .then(({ data, error }) => {
        if (error || !data) {
          setEarnedDates({});
          earnedIdsRef.current = new Set();
          return;
        }
        const dates: Record<string, string> = {};
        data.forEach((row) => {
          if (row.earned_date) dates[row.badge_id] = row.earned_date;
        });
        setEarnedDates(dates);
        earnedIdsRef.current = new Set(Object.keys(dates));
      })
      .then(() => setBadgesLoaded(true));
  }, [session]);

  useEffect(() => {
    if (!session) {
      setTrailCompletions([]);
      setAnimalSightings([]);
      setTrips([]);
      setTripsLoaded(false);
      return;
    }
    setTripsLoaded(false);
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
      supabase
        .from('trip_photos')
        .select('trip_id, storage_path, slot')
        .eq('user_id', session.user.id),
    ]).then(([trailRes, animalRes, tripRes, photoRes]) => {
      const trailRows: TrailCompletionRow[] = trailRes.data ?? [];
      const animalRows: AnimalSightingRow[] = animalRes.data ?? [];
      const photoRows = photoRes.data ?? [];
      setTrailCompletions(trailRows);
      setAnimalSightings(animalRows);
      if (!tripRes.data) {
        setTrips([]);
        return;
      }
      setTrips(
        tripRes.data.map((row) => ({
          id: row.id,
          parkId: row.park_id,
          tripType: (row.trip_type as TripType) ?? 'logged',
          startDate: row.start_date,
          endDate: row.end_date,
          activities: row.activities as ActivityType[],
          notes: row.notes,
          photos: photoRows
            .filter((p) => p.trip_id === row.id)
            .sort((a, b) => a.slot - b.slot)
            .map((p) => publicUrlFromStoragePath(p.storage_path)),
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
    })
      .catch((error) => {
        console.error('Failed to load trips/trail completions/animal sightings:', error);
        setTrailCompletions([]);
        setAnimalSightings([]);
        setTrips([]);
      })
      .finally(() => setTripsLoaded(true));
  }, [session]);

  const isTrailCompleted = useCallback(
    (trailId: string) => trailCompletions.some((row) => row.trail_id === trailId),
    [trailCompletions]
  );

  const isAnimalSpotted = useCallback(
    (animalId: string) => animalSightings.some((row) => row.animal_id === animalId),
    [animalSightings]
  );

  const badges: Badge[] = useMemo(() => {
    // Only actually-taken trips count toward badge progress — a planned trip
    // hasn't happened yet, so it must not be able to trigger e.g. 'camper' or
    // 'perfect-trip' before the user has actually gone.
    const loggedTrips = trips.filter((t) => t.tripType === 'logged');
    const completedTrailIds = trailCompletions.map((row) => row.trail_id).filter((id): id is string => !!id);
    const spottedAnimalIds = animalSightings.map((row) => row.animal_id).filter((id): id is string => !!id);
    return ALL_BADGES.map((badge) => {
      const goal = badge.goal ?? 1;
      const rawProgress = BADGE_PROGRESS[badge.id]?.({ parks, trips: loggedTrips, completedTrailIds, spottedAnimalIds }) ?? 0;
      const progress = Math.min(rawProgress, goal);
      const earned = progress >= goal;
      return { ...badge, progress, goal, earned, earnedDate: earned ? earnedDates[badge.id] : undefined };
    });
  }, [parks, trips, trailCompletions, animalSightings, earnedDates]);

  // The first time a badge's live-computed progress clears its goal, freeze
  // an earned_date server-side so "earned N days ago" stays stable rather
  // than recalculating to "today" on every load.
  useEffect(() => {
    if (!session) return;
    const newlyEarned = badges.filter((b) => b.earned && !earnedIdsRef.current.has(b.id));
    if (newlyEarned.length === 0) return;
    const earnedAt = new Date().toISOString();
    newlyEarned.forEach((b) => earnedIdsRef.current.add(b.id));
    supabase
      .from('user_badges')
      .upsert(
        newlyEarned.map((b) => ({ badge_id: b.id, earned: true, earned_date: earnedAt, progress: b.progress ?? 0 })),
        { onConflict: 'user_id,badge_id' }
      )
      .then(({ error }) => {
        if (error) reportError('save your new badge', error);
      });
    setEarnedDates((prev) => {
      const next = { ...prev };
      newlyEarned.forEach((b) => {
        next[b.id] = earnedAt;
      });
      return next;
    });
  }, [badges, session]);

  // Lets a user hand-check a trail that was part of a custom/combined route
  // they logged rather than picked from the catalog. Recorded as a
  // trip_id-less completion row with zero miles/elevation so it flips the
  // "completed" indicator without touching mileage stats.
  const markTrailCompleted = useCallback((trailId: string, parkId: string, name: string) => {
    if (trailCompletions.some((row) => row.trail_id === trailId)) return;
    const row: TrailCompletionRow = { trail_id: trailId, trip_id: null, park_id: parkId, name, miles: 0, elevation_gain_ft: 0 };
    setTrailCompletions((prev) => [...prev, row]);
    if (session) {
      supabase
        .from('user_trail_completions')
        .insert(row)
        .then(({ error }) => {
          if (error) reportError('save this trail as completed', error);
        });
    }
  }, [trailCompletions, session]);

  // Only clears the manual (trip_id-less) completion — a completion earned
  // by an actual logged trip is left alone, since that's real history.
  const unmarkTrailCompleted = useCallback((trailId: string) => {
    setTrailCompletions((prev) => prev.filter((row) => !(row.trail_id === trailId && row.trip_id === null)));
    if (session) {
      supabase
        .from('user_trail_completions')
        .delete()
        .eq('trail_id', trailId)
        .is('trip_id', null)
        .then(({ error }) => {
          if (error) reportError('undo this trail completion', error);
        });
    }
  }, [session]);

  // Same reasoning as the badges useMemo above — stats represent things that
  // actually happened, so a merely-planned trip must not count toward them.
  const loggedTrips = trips.filter((t) => t.tripType === 'logged');

  const stats: UserStats = {
    totalVisited: parks.filter((p) => p.status === 'visited').length,
    totalRemaining: TOTAL_PARKS - parks.filter((p) => p.status === 'visited').length,
    bucketListCount: parks.filter((p) => p.status === 'bucketList').length,
    completionPercentage: Math.round(
      (parks.filter((p) => p.status === 'visited').length / TOTAL_PARKS) * 100
    ),
    totalTrips: loggedTrips.length,
    totalPhotos: loggedTrips.reduce((acc, t) => acc + t.photos.length, 0),
    totalMilesHiked: loggedTrips.reduce((acc, t) => acc + (t.milesHiked ?? 0), 0),
    totalElevationGain: loggedTrips.reduce((acc, t) => acc + (t.elevationGainFt ?? 0), 0),
    statesVisited: new Set(
      parks.filter((p) => p.status === 'visited').map((p) => p.state)
    ).size,
    favoriteActivity: getMostCommonActivity(loggedTrips),
  };

  const persistParkStatus = useCallback(
    (parkId: string, status: ParkStatus, isFavorite: boolean) => {
      if (!session) return;
      supabase
        .from('user_park_status')
        .upsert({ park_id: parkId, status, is_favorite: isFavorite }, { onConflict: 'user_id,park_id' })
        .then(({ error }) => {
          if (error) reportError('save that park update', error);
        });
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
          trip_type: trip.tripType,
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
      if (error || !data) {
        // Don't fabricate a trip in local state that never actually saved —
        // that's exactly the "looks saved but isn't" trust problem we're fixing.
        reportError('save your trip', error);
        return;
      }
      tripId = data.id;
    }

    let photos = trip.photos;
    if (session && photos.length) {
      try {
        photos = await syncTripPhotos(tripId, session.user.id, photos);
      } catch (error) {
        // The trip row itself already saved — don't lose the whole trip over
        // a photo failure, just warn and keep the original local photo URIs.
        reportError('upload your trip photos', error);
      }
    }

    const newTrip: Trip = { ...trip, photos, milesHiked, elevationGainFt, id: tripId };
    setTrips((prev) => [newTrip, ...prev]);

    // Logging a trip always means "I went" — 'visited', as before. Planning
    // one sets 'planned' unless the park is already 'visited' (don't
    // downgrade a park you've actually been to just because you're planning
    // a return trip).
    const currentStatus = parks.find((p) => p.id === trip.parkId)?.status ?? 'notVisited';
    const isFavorite = parks.find((p) => p.id === trip.parkId)?.isFavorite ?? false;
    const nextStatus: ParkStatus =
      trip.tripType === 'logged' ? 'visited' : currentStatus === 'visited' ? 'visited' : 'planned';
    if (nextStatus !== currentStatus) {
      setParks((prev) => prev.map((p) => (p.id === trip.parkId ? { ...p, status: nextStatus } : p)));
      persistParkStatus(trip.parkId, nextStatus, isFavorite);
    }

    if (session) {
      if (newTrip.trailsHiked?.length) {
        const rows = buildTrailRows(newTrip.trailsHiked, tripId, trip.parkId);
        setTrailCompletions((prev) => [...prev, ...rows]);
        supabase
          .from('user_trail_completions')
          .insert(rows)
          .then(({ error }) => {
            if (error) reportError('save the trails from this trip', error);
          });
      }
      if (newTrip.wildlifeSightings?.length) {
        const rows = buildAnimalRows(newTrip.wildlifeSightings, tripId, trip.parkId);
        setAnimalSightings((prev) => [...prev, ...rows]);
        supabase
          .from('user_animal_sightings')
          .insert(rows)
          .then(({ error }) => {
            if (error) reportError('save the wildlife sightings from this trip', error);
          });
      }
    }
  }, [parks, persistParkStatus, session]);

  const updateTrip = useCallback(async (trip: Trip) => {
    let photos = trip.photos;
    if (session) {
      try {
        photos = await syncTripPhotos(trip.id, session.user.id, trip.photos);
      } catch (error) {
        reportError('sync your trip photos', error);
      }
      const { error } = await supabase
        .from('trips')
        .update({
          park_id: trip.parkId,
          trip_type: trip.tripType,
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
        .eq('id', trip.id);
      if (error) {
        // Don't reflect unsaved edits as if they'd gone through.
        reportError('save your changes', error);
        return;
      }
    }
    const updatedTrip = { ...trip, photos };
    setTrips((prev) => prev.map((t) => (t.id === trip.id ? updatedTrip : t)));
  }, [session]);

  // Converts a planned trip to logged in place (same row id, not a new
  // insert) — fills in the "what actually happened" fields (photos, trails,
  // wildlife, rating, weather) and always sets the park to 'visited', unlike
  // the conditional plan-time status in logTrip.
  const completeTrip = useCallback(async (trip: Trip) => {
    const milesHiked = trip.trailsHiked?.reduce((acc, t) => acc + t.miles, 0) ?? trip.milesHiked;
    const elevationGainFt = trip.trailsHiked?.reduce((acc, t) => acc + t.elevationGainFt, 0) ?? trip.elevationGainFt;
    let photos = trip.photos;

    if (session) {
      if (photos.length) {
        try {
          photos = await syncTripPhotos(trip.id, session.user.id, photos);
        } catch (error) {
          reportError('upload your trip photos', error);
        }
      }
      const { error } = await supabase
        .from('trips')
        .update({
          trip_type: 'logged',
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
        .eq('id', trip.id);
      if (error) {
        reportError('save this trip as completed', error);
        return;
      }
    }

    const completedTrip: Trip = { ...trip, tripType: 'logged', photos, milesHiked, elevationGainFt };
    setTrips((prev) => prev.map((t) => (t.id === trip.id ? completedTrip : t)));

    setParks((prev) => prev.map((p) => (p.id === trip.parkId ? { ...p, status: 'visited' } : p)));
    const isFavorite = parks.find((p) => p.id === trip.parkId)?.isFavorite ?? false;
    persistParkStatus(trip.parkId, 'visited', isFavorite);

    if (session) {
      if (completedTrip.trailsHiked?.length) {
        const rows = buildTrailRows(completedTrip.trailsHiked, trip.id, trip.parkId);
        setTrailCompletions((prev) => [...prev, ...rows]);
        supabase
          .from('user_trail_completions')
          .insert(rows)
          .then(({ error }) => {
            if (error) reportError('save the trails from this trip', error);
          });
      }
      if (completedTrip.wildlifeSightings?.length) {
        const rows = buildAnimalRows(completedTrip.wildlifeSightings, trip.id, trip.parkId);
        setAnimalSightings((prev) => [...prev, ...rows]);
        supabase
          .from('user_animal_sightings')
          .insert(rows)
          .then(({ error }) => {
            if (error) reportError('save the wildlife sightings from this trip', error);
          });
      }
    }
  }, [parks, persistParkStatus, session]);

  const deleteTrip = useCallback((tripId: string) => {
    setTrips((prev) => prev.filter((t) => t.id !== tripId));
    if (session) {
      // trip_photos rows cascade with the trip, but the underlying Storage
      // objects don't — remove those explicitly before the row disappears.
      supabase
        .from('trip_photos')
        .select('storage_path')
        .eq('trip_id', tripId)
        .then(({ data, error }) => {
          if (error) {
            reportError('clean up this trip’s photos', error);
            return;
          }
          if (data?.length) {
            supabase
              .storage.from(TRIP_PHOTOS_BUCKET)
              .remove(data.map((row) => row.storage_path))
              .then(({ error: removeError }) => {
                if (removeError) reportError('clean up this trip’s photos', removeError);
              });
          }
        });
      supabase
        .from('trips')
        .delete()
        .eq('id', tripId)
        .then(({ error }) => {
          if (error) reportError('delete this trip — it may still show up after a refresh', error);
        });
      // Cascades server-side too; mirror locally so counts/checkmarks update immediately.
      setTrailCompletions((prev) => prev.filter((r) => r.trip_id !== tripId));
      setAnimalSightings((prev) => prev.filter((r) => r.trip_id !== tripId));
    }
  }, [session]);

  // Patches profile fields without touching onboarding_complete — used by
  // Settings screens editing an already-onboarded profile. completeOnboarding
  // below is the one place that's allowed to flip onboarding_complete to true.
  const updateProfile = useCallback((profile: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...profile }));
    if (session) {
      supabase
        .from('profiles')
        .update({
          ...(profile.name !== undefined && { name: profile.name }),
          ...(profile.explorerStyle !== undefined && { explorer_style: profile.explorerStyle }),
          ...(profile.goal !== undefined && { goal: profile.goal }),
        })
        .eq('id', session.user.id)
        .then(({ error }) => {
          if (error) reportError('save your profile', error);
        });
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
        .then(({ error }) => {
          if (error) reportError('save your profile', error);
        });
    }
  }, [session]);

  const updateProfileBackground = useCallback((background: ProfileBackground) => {
    setUserProfile((prev) => ({ ...prev, profileBackground: background }));
    if (session) {
      supabase
        .from('profiles')
        .update({ profile_background: background })
        .eq('id', session.user.id)
        .then(({ error }) => {
          if (error) reportError('save your profile background', error);
        });
    }
  }, [session]);

  const updateProfileAvatar = useCallback((avatar: ProfileAvatar) => {
    setUserProfile((prev) => ({ ...prev, avatar }));
    if (session) {
      supabase
        .from('profiles')
        .update({ avatar })
        .eq('id', session.user.id)
        .then(({ error }) => {
          if (error) reportError('save your avatar', error);
        });
    }
  }, [session]);

  const updateUnits = useCallback((units: Units) => {
    setUserProfile((prev) => ({ ...prev, units }));
    if (session) {
      supabase
        .from('profiles')
        .update({ units })
        .eq('id', session.user.id)
        .then(({ error }) => {
          if (error) reportError('save your units preference', error);
        });
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
        dataLoading,
        updateParkStatus,
        toggleFavorite,
        logTrip,
        updateTrip,
        completeTrip,
        deleteTrip,
        completeOnboarding,
        updateProfile,
        updateProfileBackground,
        updateProfileAvatar,
        updateUnits,
        signOut,
        isTrailCompleted,
        isAnimalSpotted,
        markTrailCompleted,
        unmarkTrailCompleted,
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
