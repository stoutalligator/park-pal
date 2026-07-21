import { Park, Trip } from '@/types';

interface BadgeContext {
  parks: Park[];
  trips: Trip[];
  completedTrailIds: string[];
  spottedAnimalIds: string[];
}

// Parks that touch an ocean coastline, for the Coastal Explorer badge —
// there's no `coastal` field on Park, so this is a curated list.
const COASTAL_PARK_IDS = [
  'acadia',
  'olympic',
  'redwood',
  'channel-islands',
  'biscayne',
  'everglades',
  'dry-tortugas',
  'virgin-islands',
  'glacier-bay',
  'kenai-fjords',
  'katmai',
  'haleakala',
  'hawaii-volcanoes',
  'national-park-samoa',
];

function visitedCount(parks: Park[]): number {
  return parks.filter((p) => p.status === 'visited').length;
}

function distinctParksWithActivity(trips: Trip[], activity: Trip['activities'][number]): number {
  return new Set(trips.filter((t) => t.activities.includes(activity)).map((t) => t.parkId)).size;
}

function totalMilesHiked(trips: Trip[]): number {
  return trips.reduce((acc, t) => acc + (t.milesHiked ?? 0), 0);
}

function totalElevationGain(trips: Trip[]): number {
  return trips.reduce((acc, t) => acc + (t.elevationGainFt ?? 0), 0);
}

// One progress-calculation function per badge id, each returning a raw count
// to be compared against that badge's `goal` from src/data/badges.ts.
export const BADGE_PROGRESS: Record<string, (ctx: BadgeContext) => number> = {
  'first-park': ({ parks }) => visitedCount(parks),
  'parks-5': ({ parks }) => visitedCount(parks),
  'parks-10': ({ parks }) => visitedCount(parks),
  'parks-25': ({ parks }) => visitedCount(parks),
  'parks-50': ({ parks }) => visitedCount(parks),
  'parks-all': ({ parks }) => visitedCount(parks),
  hiker: ({ trips }) => distinctParksWithActivity(trips, 'Hiking'),
  camper: ({ trips }) => (trips.some((t) => t.activities.includes('Camping')) ? 1 : 0),
  wildlife: ({ trips }) =>
    new Set(trips.filter((t) => (t.wildlifeSightings?.length ?? 0) > 0).map((t) => t.parkId)).size,
  photographer: ({ trips }) => trips.filter((t) => t.photos.length > 0).length,
  sunrise: ({ trips }) => distinctParksWithActivity(trips, 'Sunrise'),
  'road-tripper': ({ trips }) => distinctParksWithActivity(trips, 'Scenic Drive'),
  'mountain-region': ({ parks }) =>
    parks.filter((p) => p.region === 'Mountain' && p.status === 'visited').length,
  'northeast-region': ({ parks }) =>
    parks.filter((p) => p.region === 'Northeast' && p.status === 'visited').length,
  'utah-five': ({ parks }) => parks.filter((p) => p.state === 'Utah' && p.status === 'visited').length,
  coastal: ({ parks }) =>
    parks.filter((p) => COASTAL_PARK_IDS.includes(p.id) && p.status === 'visited').length,
  'memory-keeper': ({ trips }) => trips.filter((t) => t.notes.trim().length > 0).length,
  'adventure-awaits': ({ parks }) => parks.filter((p) => p.status === 'bucketList').length,

  'miles-25': ({ trips }) => totalMilesHiked(trips),
  'miles-100': ({ trips }) => totalMilesHiked(trips),
  'miles-250': ({ trips }) => totalMilesHiked(trips),
  'miles-500': ({ trips }) => totalMilesHiked(trips),
  'miles-1000': ({ trips }) => totalMilesHiked(trips),

  'elevation-1000': ({ trips }) => totalElevationGain(trips),
  'elevation-5000': ({ trips }) => totalElevationGain(trips),
  'elevation-15000': ({ trips }) => totalElevationGain(trips),
  'elevation-30000': ({ trips }) => totalElevationGain(trips),
  'elevation-60000': ({ trips }) => totalElevationGain(trips),

  // Animal/trail specific — earned via the same completedTrailIds/spottedAnimalIds
  // lists that back isTrailCompleted/isAnimalSpotted, so a manual "mark as done"
  // and an actual logged trip both count.
  'channel-islands-fox': ({ spottedAnimalIds }) =>
    spottedAnimalIds.includes('channel-islands-island-fox') ? 1 : 0,
  'near-death': ({ completedTrailIds }) => (completedTrailIds.includes('zion-angels-landing') ? 1 : 0),

  // Secret badges
  'night-owl': ({ trips }) =>
    trips.some((t) => t.activities.includes('Camping') && t.activities.includes('Stargazing')) ? 1 : 0,
  'globe-trotter': ({ parks }) => {
    const visitedRegions = new Set(parks.filter((p) => p.status === 'visited').map((p) => p.region));
    return visitedRegions.has('Alaska') && visitedRegions.has('Hawaii') ? 1 : 0;
  },
  'perfect-trip': ({ trips }) =>
    trips.some((t) => t.rating === 5 && t.notes.trim().length > 0 && t.photos.length > 0) ? 1 : 0,
};
