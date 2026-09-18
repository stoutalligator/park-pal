// Every badge now has its own illustration under src/assets/badges/ — the
// hash-based fallback below is kept only as a defensive default in case a
// new badge id is added to src/data/badges.ts before its art is ready.
const BADGE_IMAGES: Record<string, number> = {
  'first-park': require('@/assets/badges/badge-first-park.png'),
  'parks-5': require('@/assets/badges/badge-parks-5.png'),
  'parks-10': require('@/assets/badges/badge-parks-10.png'),
  'parks-25': require('@/assets/badges/badge-parks-25.png'),
  'parks-50': require('@/assets/badges/badge-parks-50.png'),
  'parks-all': require('@/assets/badges/badge-parks-all.png'),
  hiker: require('@/assets/badges/badge-hiker.png'),
  camper: require('@/assets/badges/badge-camper.png'),
  wildlife: require('@/assets/badges/badge-wildlife.png'),
  photographer: require('@/assets/badges/badge-photographer.png'),
  sunrise: require('@/assets/badges/badge-sunrise.png'),
  'road-tripper': require('@/assets/badges/badge-road-tripper.png'),
  'mountain-region': require('@/assets/badges/badge-mountain-region.png'),
  'northeast-region': require('@/assets/badges/badge-northeast-region.png'),
  'utah-five': require('@/assets/badges/badge-utah-five.png'),
  coastal: require('@/assets/badges/badge-coastal.png'),
  'memory-keeper': require('@/assets/badges/badge-memory-keeper.png'),
  'adventure-awaits': require('@/assets/badges/badge-adventure-awaits.png'),
  'miles-25': require('@/assets/badges/badge-miles-25.png'),
  'miles-100': require('@/assets/badges/badge-miles-100.png'),
  'miles-250': require('@/assets/badges/badge-miles-250.png'),
  'miles-500': require('@/assets/badges/badge-miles-500.png'),
  'miles-1000': require('@/assets/badges/badge-miles-1000.png'),
  'elevation-1000': require('@/assets/badges/badge-elevation-1000.png'),
  'elevation-5000': require('@/assets/badges/badge-elevation-5000.png'),
  'elevation-15000': require('@/assets/badges/badge-elevation-15000.png'),
  'elevation-30000': require('@/assets/badges/badge-elevation-30000.png'),
  'elevation-60000': require('@/assets/badges/badge-elevation-60000.png'),
  'channel-islands-fox': require('@/assets/badges/badge-channel-islands-fox.png'),
  'acadia-puffin': require('@/assets/badges/badge-acadia-puffin.png'),
  'yellowstone-wolf': require('@/assets/badges/badge-yellowstone-wolf.png'),
  'pinnacles-condor': require('@/assets/badges/badge-pinnacles-condor.png'),
  'everglades-manatee': require('@/assets/badges/badge-everglades-manatee.png'),
  'near-death': require('@/assets/badges/badge-near-death.png'),
  'night-owl': require('@/assets/badges/badge-night-owl.png'),
  'globe-trotter': require('@/assets/badges/badge-globe-trotter.png'),
  'perfect-trip': require('@/assets/badges/badge-perfect-trip.png'),
};

const REAL_IMAGE_LIST = Object.values(BADGE_IMAGES);

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

// Any badge id missing from BADGE_IMAGES (shouldn't happen once art is kept
// in sync with src/data/badges.ts) borrows a stable, hashed pick from the
// existing set rather than showing a single generic placeholder.
export function getBadgeImage(badgeId: string): number {
  if (BADGE_IMAGES[badgeId]) return BADGE_IMAGES[badgeId];
  return REAL_IMAGE_LIST[hashString(badgeId) % REAL_IMAGE_LIST.length];
}
