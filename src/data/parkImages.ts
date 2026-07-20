// ---------------------------------------------------------------------------
// Real, bespoke park art — added one park at a time.
//
// To add a park once its real assets exist:
//   1. Drop the icon into  src/assets/parks-icons/parks-icon-<id>.png
//   2. Drop the scene into src/assets/parks-scenes/parks-scene-<id>.png
//   3. Add one line to REAL_PARK_ICONS and one line to REAL_PARK_SCENES below,
//      keyed by the park's `id` from src/data/parks.ts.
//
// Any park not yet listed here automatically falls back to a rotating pick
// from whatever real art already exists (see getParkImage/getParkScene), so
// nothing needs to change anywhere else in the app when a new park is added.
// ---------------------------------------------------------------------------
const REAL_PARK_ICONS: Record<string, number> = {
  acadia: require('@/assets/parks-icons/parks-icon-acadia.png'),
  arches: require('@/assets/parks-icons/parks-icon-arches.png'),
  badlands: require('@/assets/parks-icons/parks-icon-badlands.png'),
};

const REAL_PARK_SCENES: Record<string, number> = {
  acadia: require('@/assets/parks-scenes/parks-scene-acadia.png'),
  arches: require('@/assets/parks-scenes/parks-scene-arches.png'),
  badlands: require('@/assets/parks-scenes/parks-scene-badlands.png'),
};

const REAL_ICON_LIST = Object.values(REAL_PARK_ICONS);
const REAL_SCENE_LIST = Object.values(REAL_PARK_SCENES);

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

// Parks without their own real icon/scene yet borrow one of the existing
// real ones (stable per park id) instead of a generic placeholder, so the
// app always shows genuine illustrated art.
export function getParkImage(parkId: string): number {
  if (REAL_PARK_ICONS[parkId]) return REAL_PARK_ICONS[parkId];
  return REAL_ICON_LIST[hashString(parkId) % REAL_ICON_LIST.length];
}

export function getParkScene(parkId: string): number {
  if (REAL_PARK_SCENES[parkId]) return REAL_PARK_SCENES[parkId];
  return REAL_SCENE_LIST[hashString(`${parkId}-scene`) % REAL_SCENE_LIST.length];
}
