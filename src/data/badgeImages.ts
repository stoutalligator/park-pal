// Badges without a matching illustration borrow one of the ones below as a
// placeholder (see getBadgeImage) rather than showing mismatched text. Ask
// the badge-dev agent for the full list of filenames still needed under
// src/assets/badges/.
const BADGE_IMAGES: Record<string, number> = {
  'first-park': require('@/assets/badges/badge-first-park.png'),
  'parks-5': require('@/assets/badges/badge-parks-5.png'),
  'parks-10': require('@/assets/badges/badge-parks-10.png'),
};

const REAL_IMAGE_LIST = Object.values(BADGE_IMAGES);

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

// Badges without their own real illustration yet borrow one of the existing
// real ones (stable per badge id, same approach as getParkScene in
// parkImages.ts) instead of a single generic placeholder, so the Collection
// screen still shows varied art in the current target style while the rest
// of the badge revamp is in progress.
export function getBadgeImage(badgeId: string): number {
  if (BADGE_IMAGES[badgeId]) return BADGE_IMAGES[badgeId];
  return REAL_IMAGE_LIST[hashString(badgeId) % REAL_IMAGE_LIST.length];
}
