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

// Our Canyonlands trails that start in the Needles District (the rest are
// Island in the Sky).
const CANYONLANDS_NEEDLES_TRAIL_IDS = [
  'canyonlands-chesler-park',
  'canyonlands-druid-arch',
  'canyonlands-pothole-point',
  'canyonlands-slickrock',
];

const GRAND_CANYON_SOUTH_RIM_TRAIL_IDS = [
  'grand-canyon-bright-angel',
  'grand-canyon-rim-trail',
  'grand-canyon-south-kaibab',
  'grand-canyon-hermit-trail',
  'grand-canyon-shoshone-point',
  'grand-canyon-grandview-trail',
];

const GRAND_CANYON_NORTH_RIM_TRAIL_IDS = [
  'grand-canyon-north-kaibab',
  'grand-canyon-widforss',
  'grand-canyon-cape-final',
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
  'adventure-awaits': ({ parks }) => parks.filter((p) => p.isFavorite).length,

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
  'acadia-puffin': ({ spottedAnimalIds }) => (spottedAnimalIds.includes('acadia-atlantic-puffin') ? 1 : 0),
  'yellowstone-wolf': ({ spottedAnimalIds }) => (spottedAnimalIds.includes('yellowstone-gray-wolf') ? 1 : 0),
  'pinnacles-condor': ({ spottedAnimalIds }) => (spottedAnimalIds.includes('pinnacles-california-condor') ? 1 : 0),
  'everglades-manatee': ({ spottedAnimalIds }) => (spottedAnimalIds.includes('everglades-manatee') ? 1 : 0),
  'half-dome': ({ completedTrailIds }) => (completedTrailIds.includes('yosemite-half-dome') ? 1 : 0),
  'near-death': ({ completedTrailIds }) => (completedTrailIds.includes('zion-angels-landing') ? 1 : 0),
  'canyonlands-needles': ({ completedTrailIds }) =>
    CANYONLANDS_NEEDLES_TRAIL_IDS.some((id) => completedTrailIds.includes(id)) ? 1 : 0,
  'capitol-reef-apples': ({ trips }) =>
    trips.some((t) => t.parkId === 'capitol-reef' && t.activities.includes('Apple Picking')) ? 1 : 0,
  'delicate-arch': ({ completedTrailIds }) => (completedTrailIds.includes('arches-delicate-arch') ? 1 : 0),
  'hoodoo-queen': ({ completedTrailIds }) => (completedTrailIds.includes('bryce-canyon-queens-garden') ? 1 : 0),
  // One point per rim, so the badge shows 1/2 progress after the first.
  'grand-canyon-both-rims': ({ completedTrailIds }) =>
    (GRAND_CANYON_SOUTH_RIM_TRAIL_IDS.some((id) => completedTrailIds.includes(id)) ? 1 : 0) +
    (GRAND_CANYON_NORTH_RIM_TRAIL_IDS.some((id) => completedTrailIds.includes(id)) ? 1 : 0),

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
