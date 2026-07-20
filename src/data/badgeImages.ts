// Only 12 bespoke badge illustrations exist so far (each with its name baked
// into the art), but there are more badge definitions than that — badges
// without a matching illustration fall back to the generic Junior Ranger
// badge rather than showing mismatched text.
const BADGE_IMAGES: Record<string, number> = {
  'first-park': require('@/assets/badges/badge-first-park.png'),
  'parks-10': require('@/assets/badges/badge-10-parks.png'),
  'parks-25': require('@/assets/badges/badge-25-parks.png'),
  'parks-50': require('@/assets/badges/badge-50-parks.png'),
  hiker: require('@/assets/badges/badge-mountain-master.png'),
  camper: require('@/assets/badges/badge-forest-discoverer.png'),
  wildlife: require('@/assets/badges/badge-forest-discoverer.png'),
  photographer: require('@/assets/badges/badge-sunrise-seeker.png'),
  sunrise: require('@/assets/badges/badge-sunrise-seeker.png'),
  'road-tripper': require('@/assets/badges/badge-coast-to-coast.png'),
  'mountain-region': require('@/assets/badges/badge-mountain-master.png'),
  'northeast-region': require('@/assets/badges/badge-state-explorer.png'),
  'utah-five': require('@/assets/badges/badge-desert-explorer.png'),
  coastal: require('@/assets/badges/badge-waterfall-chaser.png'),
};

const BADGE_FALLBACK_IMAGE = require('@/assets/badges/badge-junior-ranger.png');

export function getBadgeImage(badgeId: string): number {
  return BADGE_IMAGES[badgeId] ?? BADGE_FALLBACK_IMAGE;
}
