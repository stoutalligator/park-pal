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
  'acadia': require('@/assets/parks-scenes/parks-scene-acadia.png'),
  'arches': require('@/assets/parks-scenes/parks-scene-arches.png'),
  'badlands': require('@/assets/parks-scenes/parks-scene-badlands.png'),
  'big-bend': require('@/assets/parks-scenes/parks-scene-big-bend.png'),
  'biscayne': require('@/assets/parks-scenes/parks-scene-biscayne.png'),
  'black-canyon': require('@/assets/parks-scenes/parks-scene-black-canyon.png'),
  'bryce-canyon': require('@/assets/parks-scenes/parks-scene-bryce-canyon.png'),
  'canyonlands': require('@/assets/parks-scenes/parks-scene-canyonlands.png'),
  'capitol-reef': require('@/assets/parks-scenes/parks-scene-capitol-reef.png'),
  'carlsbad-caverns': require('@/assets/parks-scenes/parks-scene-carlsbad-caverns.png'),
  'channel-islands': require('@/assets/parks-scenes/parks-scene-channel-islands.png'),
  'congaree': require('@/assets/parks-scenes/parks-scene-congaree.png'),
  'crater-lake': require('@/assets/parks-scenes/parks-scene-crater-lake.png'),
  'cuyahoga-valley': require('@/assets/parks-scenes/parks-scene-cuyahoga-valley.png'),
  'death-valley': require('@/assets/parks-scenes/parks-scene-death-valley.png'),
  'denali': require('@/assets/parks-scenes/parks-scene-denali.png'),
  'dry-tortugas': require('@/assets/parks-scenes/parks-scene-dry-tortugas.png'),
  'everglades': require('@/assets/parks-scenes/parks-scene-everglades.png'),
  'gateway-arch': require('@/assets/parks-scenes/parks-scene-gateway-arch.png'),
  'glacier': require('@/assets/parks-scenes/parks-scene-glacier.png'),
  'glacier-bay': require('@/assets/parks-scenes/parks-scene-glacier-bay.png'),
  'grand-canyon': require('@/assets/parks-scenes/parks-scene-grand-canyon.png'),
  'grand-teton': require('@/assets/parks-scenes/parks-scene-grand-teton.png'),
  'great-basin': require('@/assets/parks-scenes/parks-scene-great-basin.png'),
  'great-sand-dunes': require('@/assets/parks-scenes/parks-scene-great-sand-dunes.png'),
  'great-smoky': require('@/assets/parks-scenes/parks-scene-great-smoky.png'),
  'guadalupe-mountains': require('@/assets/parks-scenes/parks-scene-guadalupe-mountains.png'),
  'haleakala': require('@/assets/parks-scenes/parks-scene-haleakala.png'),
  'hawaii-volcanoes': require('@/assets/parks-scenes/parks-scene-hawaii-volcanoes.png'),
  'hot-springs': require('@/assets/parks-scenes/parks-scene-hot-springs.png'),
  'indiana-dunes': require('@/assets/parks-scenes/parks-scene-indiana-dunes.png'),
  'isle-royale': require('@/assets/parks-scenes/parks-scene-isle-royale.png'),
  'joshua-tree': require('@/assets/parks-scenes/parks-scene-joshua-tree.png'),
  'katmai': require('@/assets/parks-scenes/parks-scene-katmai.png'),
  'kenai-fjords': require('@/assets/parks-scenes/parks-scene-kenai-fjords.png'),
  'kings-canyon': require('@/assets/parks-scenes/parks-scene-kings-canyon.png'),
  'kobuk-valley': require('@/assets/parks-scenes/parks-scene-kobuk-valley.png'),
  'lake-clark': require('@/assets/parks-scenes/parks-scene-lake-clark.png'),
  'lassen-volcanic': require('@/assets/parks-scenes/parks-scene-lassen-volcanic.png'),
  'mammoth-cave': require('@/assets/parks-scenes/parks-scene-mammoth-cave.png'),
  'mesa-verde': require('@/assets/parks-scenes/parks-scene-mesa-verde.png'),
  'mount-rainier': require('@/assets/parks-scenes/parks-scene-mount-rainier.png'),
  'national-park-samoa': require('@/assets/parks-scenes/parks-scene-national-park-samoa.png'),
  'new-river-gorge': require('@/assets/parks-scenes/parks-scene-new-river-gorge.png'),
  'north-cascades': require('@/assets/parks-scenes/parks-scene-north-cascades.png'),
  'olympic': require('@/assets/parks-scenes/parks-scene-olympic.png'),
  'petrified-forest': require('@/assets/parks-scenes/parks-scene-petrified-forest.png'),
  'pinnacles': require('@/assets/parks-scenes/parks-scene-pinnacles.png'),
  'redwood': require('@/assets/parks-scenes/parks-scene-redwood.png'),
  'rocky-mountain': require('@/assets/parks-scenes/parks-scene-rocky-mountain.png'),
  'saguaro': require('@/assets/parks-scenes/parks-scene-saguaro.png'),
  'sequoia': require('@/assets/parks-scenes/parks-scene-sequoia.png'),
  'shenandoah': require('@/assets/parks-scenes/parks-scene-shenandoah.png'),
  'theodore-roosevelt': require('@/assets/parks-scenes/parks-scene-theodore-roosevelt.png'),
  'virgin-islands': require('@/assets/parks-scenes/parks-scene-virgin-islands.png'),
  'voyageurs': require('@/assets/parks-scenes/parks-scene-voyageurs.png'),
  'white-sands': require('@/assets/parks-scenes/parks-scene-white-sands.png'),
  'wind-cave': require('@/assets/parks-scenes/parks-scene-wind-cave.png'),
  'wrangell-st-elias': require('@/assets/parks-scenes/parks-scene-wrangell-st-elias.png'),
  'yellowstone': require('@/assets/parks-scenes/parks-scene-yellowstone.png'),
  'yosemite': require('@/assets/parks-scenes/parks-scene-yosemite.png'),
  'zion': require('@/assets/parks-scenes/parks-scene-zion.png'),
  // gates-arctic has no real scene yet — falls back to the rotating pick below.
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
