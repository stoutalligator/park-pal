// ---------------------------------------------------------------------------
// Real, bespoke park art — added one park at a time.
//
// To add a park once its real assets exist:
//   1. Drop the icon into  src/assets/parks-icons/parks-icon-<id>.png
//   2. Drop the scene into src/assets/parks-scenes/parks-scene-<id>.jpg
//      (JPEG, not PNG — these are opaque full-bleed backgrounds and PNG's
//      lossless compression made each one ~3MB; JPEG at quality 85 gets the
//      same art down to ~400KB with no visible difference)
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
  'big-bend': require('@/assets/parks-icons/parks-icon-big-bend.png'),
  shenandoah: require('@/assets/parks-icons/parks-icon-shenandoah.png'),
  'new-river-gorge': require('@/assets/parks-icons/parks-icon-new-river-gorge.png'),
  'great-smoky': require('@/assets/parks-icons/parks-icon-great-smoky.png'),
  biscayne: require('@/assets/parks-icons/parks-icon-biscayne.png'),
  'dry-tortugas': require('@/assets/parks-icons/parks-icon-dry-tortugas.png'),
  everglades: require('@/assets/parks-icons/parks-icon-everglades.png'),
  congaree: require('@/assets/parks-icons/parks-icon-congaree.png'),
  'mammoth-cave': require('@/assets/parks-icons/parks-icon-mammoth-cave.png'),
  'virgin-islands': require('@/assets/parks-icons/parks-icon-virgin-islands.png'),
  'cuyahoga-valley': require('@/assets/parks-icons/parks-icon-cuyahoga-valley.png'),
  'indiana-dunes': require('@/assets/parks-icons/parks-icon-indiana-dunes.png'),
  'isle-royale': require('@/assets/parks-icons/parks-icon-isle-royale.png'),
  voyageurs: require('@/assets/parks-icons/parks-icon-voyageurs.png'),
  'wind-cave': require('@/assets/parks-icons/parks-icon-wind-cave.png'),
  'theodore-roosevelt': require('@/assets/parks-icons/parks-icon-theodore-roosevelt.png'),
  'guadalupe-mountains': require('@/assets/parks-icons/parks-icon-guadalupe-mountains.png'),
  'hot-springs': require('@/assets/parks-icons/parks-icon-hot-springs.png'),
  'rocky-mountain': require('@/assets/parks-icons/parks-icon-rocky-mountain.png'),
  'black-canyon': require('@/assets/parks-icons/parks-icon-black-canyon.png'),
  'great-sand-dunes': require('@/assets/parks-icons/parks-icon-great-sand-dunes.png'),
  'mesa-verde': require('@/assets/parks-icons/parks-icon-mesa-verde.png'),
  'bryce-canyon': require('@/assets/parks-icons/parks-icon-bryce-canyon.png'),
  canyonlands: require('@/assets/parks-icons/parks-icon-canyonlands.png'),
  'capitol-reef': require('@/assets/parks-icons/parks-icon-capitol-reef.png'),
  zion: require('@/assets/parks-icons/parks-icon-zion.png'),
  'grand-teton': require('@/assets/parks-icons/parks-icon-grand-teton.png'),
  yellowstone: require('@/assets/parks-icons/parks-icon-yellowstone.png'),
  glacier: require('@/assets/parks-icons/parks-icon-glacier.png'),
  'glacier-bay': require('@/assets/parks-icons/parks-icon-glacier-bay.png'),
  'grand-canyon': require('@/assets/parks-icons/parks-icon-grand-canyon.png'),
  'petrified-forest': require('@/assets/parks-icons/parks-icon-petrified-forest.png'),
  saguaro: require('@/assets/parks-icons/parks-icon-saguaro.png'),
  'carlsbad-caverns': require('@/assets/parks-icons/parks-icon-carlsbad-caverns.png'),
  'white-sands': require('@/assets/parks-icons/parks-icon-white-sands.png'),
  'great-basin': require('@/assets/parks-icons/parks-icon-great-basin.png'),
  yosemite: require('@/assets/parks-icons/parks-icon-yosemite.png'),
  sequoia: require('@/assets/parks-icons/parks-icon-sequoia.png'),
  'kings-canyon': require('@/assets/parks-icons/parks-icon-kings-canyon.png'),
  'death-valley': require('@/assets/parks-icons/parks-icon-death-valley.png'),
  'joshua-tree': require('@/assets/parks-icons/parks-icon-joshua-tree.png'),
  'channel-islands': require('@/assets/parks-icons/parks-icon-channel-islands.png'),
  pinnacles: require('@/assets/parks-icons/parks-icon-pinnacles.png'),
  redwood: require('@/assets/parks-icons/parks-icon-redwood.png'),
  'lassen-volcanic': require('@/assets/parks-icons/parks-icon-lassen-volcanic.png'),
  olympic: require('@/assets/parks-icons/parks-icon-olympic.png'),
  'mount-rainier': require('@/assets/parks-icons/parks-icon-mount-rainier.png'),
  'north-cascades': require('@/assets/parks-icons/parks-icon-north-cascades.png'),
  'crater-lake': require('@/assets/parks-icons/parks-icon-crater-lake.png'),
  haleakala: require('@/assets/parks-icons/parks-icon-haleakala.png'),
  'hawaii-volcanoes': require('@/assets/parks-icons/parks-icon-hawaii-volcanoes.png'),
  'national-park-samoa': require('@/assets/parks-icons/parks-icon-national-park-samoa.png'),
  denali: require('@/assets/parks-icons/parks-icon-denali.png'),
  katmai: require('@/assets/parks-icons/parks-icon-katmai.png'),
  'kenai-fjords': require('@/assets/parks-icons/parks-icon-kenai-fjords.png'),
  'kobuk-valley': require('@/assets/parks-icons/parks-icon-kobuk-valley.png'),
  'lake-clark': require('@/assets/parks-icons/parks-icon-lake-clark.png'),
  'wrangell-st-elias': require('@/assets/parks-icons/parks-icon-wrangell-st-elias.png'),
  'gates-arctic': require('@/assets/parks-icons/parks-icon-gates-arctic.png'),
  'gateway-arch': require('@/assets/parks-icons/parks-icon-gateway-arch.png'),
};

const REAL_PARK_SCENES: Record<string, number> = {
  'acadia': require('@/assets/parks-scenes/parks-scene-acadia.jpg'),
  'arches': require('@/assets/parks-scenes/parks-scene-arches.jpg'),
  'badlands': require('@/assets/parks-scenes/parks-scene-badlands.jpg'),
  'big-bend': require('@/assets/parks-scenes/parks-scene-big-bend.jpg'),
  'biscayne': require('@/assets/parks-scenes/parks-scene-biscayne.jpg'),
  'black-canyon': require('@/assets/parks-scenes/parks-scene-black-canyon.jpg'),
  'bryce-canyon': require('@/assets/parks-scenes/parks-scene-bryce-canyon.jpg'),
  'canyonlands': require('@/assets/parks-scenes/parks-scene-canyonlands.jpg'),
  'capitol-reef': require('@/assets/parks-scenes/parks-scene-capitol-reef.jpg'),
  'carlsbad-caverns': require('@/assets/parks-scenes/parks-scene-carlsbad-caverns.jpg'),
  'channel-islands': require('@/assets/parks-scenes/parks-scene-channel-islands.jpg'),
  'congaree': require('@/assets/parks-scenes/parks-scene-congaree.jpg'),
  'crater-lake': require('@/assets/parks-scenes/parks-scene-crater-lake.jpg'),
  'cuyahoga-valley': require('@/assets/parks-scenes/parks-scene-cuyahoga-valley.jpg'),
  'death-valley': require('@/assets/parks-scenes/parks-scene-death-valley.jpg'),
  'denali': require('@/assets/parks-scenes/parks-scene-denali.jpg'),
  'dry-tortugas': require('@/assets/parks-scenes/parks-scene-dry-tortugas.jpg'),
  'everglades': require('@/assets/parks-scenes/parks-scene-everglades.jpg'),
  'gates-arctic': require('@/assets/parks-scenes/parks-scene-gates-arctic.jpg'),
  'gateway-arch': require('@/assets/parks-scenes/parks-scene-gateway-arch.jpg'),
  'glacier': require('@/assets/parks-scenes/parks-scene-glacier.jpg'),
  'glacier-bay': require('@/assets/parks-scenes/parks-scene-glacier-bay.jpg'),
  'grand-canyon': require('@/assets/parks-scenes/parks-scene-grand-canyon.jpg'),
  'grand-teton': require('@/assets/parks-scenes/parks-scene-grand-teton.jpg'),
  'great-basin': require('@/assets/parks-scenes/parks-scene-great-basin.jpg'),
  'great-sand-dunes': require('@/assets/parks-scenes/parks-scene-great-sand-dunes.jpg'),
  'great-smoky': require('@/assets/parks-scenes/parks-scene-great-smoky.jpg'),
  'guadalupe-mountains': require('@/assets/parks-scenes/parks-scene-guadalupe-mountains.jpg'),
  'haleakala': require('@/assets/parks-scenes/parks-scene-haleakala.jpg'),
  'hawaii-volcanoes': require('@/assets/parks-scenes/parks-scene-hawaii-volcanoes.jpg'),
  'hot-springs': require('@/assets/parks-scenes/parks-scene-hot-springs.jpg'),
  'indiana-dunes': require('@/assets/parks-scenes/parks-scene-indiana-dunes.jpg'),
  'isle-royale': require('@/assets/parks-scenes/parks-scene-isle-royale.jpg'),
  'joshua-tree': require('@/assets/parks-scenes/parks-scene-joshua-tree.jpg'),
  'katmai': require('@/assets/parks-scenes/parks-scene-katmai.jpg'),
  'kenai-fjords': require('@/assets/parks-scenes/parks-scene-kenai-fjords.jpg'),
  'kings-canyon': require('@/assets/parks-scenes/parks-scene-kings-canyon.jpg'),
  'kobuk-valley': require('@/assets/parks-scenes/parks-scene-kobuk-valley.jpg'),
  'lake-clark': require('@/assets/parks-scenes/parks-scene-lake-clark.jpg'),
  'lassen-volcanic': require('@/assets/parks-scenes/parks-scene-lassen-volcanic.jpg'),
  'mammoth-cave': require('@/assets/parks-scenes/parks-scene-mammoth-cave.jpg'),
  'mesa-verde': require('@/assets/parks-scenes/parks-scene-mesa-verde.jpg'),
  'mount-rainier': require('@/assets/parks-scenes/parks-scene-mount-rainier.jpg'),
  'national-park-samoa': require('@/assets/parks-scenes/parks-scene-national-park-samoa.jpg'),
  'new-river-gorge': require('@/assets/parks-scenes/parks-scene-new-river-gorge.jpg'),
  'north-cascades': require('@/assets/parks-scenes/parks-scene-north-cascades.jpg'),
  'olympic': require('@/assets/parks-scenes/parks-scene-olympic.jpg'),
  'petrified-forest': require('@/assets/parks-scenes/parks-scene-petrified-forest.jpg'),
  'pinnacles': require('@/assets/parks-scenes/parks-scene-pinnacles.jpg'),
  'redwood': require('@/assets/parks-scenes/parks-scene-redwood.jpg'),
  'rocky-mountain': require('@/assets/parks-scenes/parks-scene-rocky-mountain.jpg'),
  'saguaro': require('@/assets/parks-scenes/parks-scene-saguaro.jpg'),
  'sequoia': require('@/assets/parks-scenes/parks-scene-sequoia.jpg'),
  'shenandoah': require('@/assets/parks-scenes/parks-scene-shenandoah.jpg'),
  'theodore-roosevelt': require('@/assets/parks-scenes/parks-scene-theodore-roosevelt.jpg'),
  'virgin-islands': require('@/assets/parks-scenes/parks-scene-virgin-islands.jpg'),
  'voyageurs': require('@/assets/parks-scenes/parks-scene-voyageurs.jpg'),
  'white-sands': require('@/assets/parks-scenes/parks-scene-white-sands.jpg'),
  'wind-cave': require('@/assets/parks-scenes/parks-scene-wind-cave.jpg'),
  'wrangell-st-elias': require('@/assets/parks-scenes/parks-scene-wrangell-st-elias.jpg'),
  'yellowstone': require('@/assets/parks-scenes/parks-scene-yellowstone.jpg'),
  'yosemite': require('@/assets/parks-scenes/parks-scene-yosemite.jpg'),
  'zion': require('@/assets/parks-scenes/parks-scene-zion.jpg'),
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
