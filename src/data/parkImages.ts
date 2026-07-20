const PARK_IMAGES: Record<string, number> = {
  acadia: require('@/assets/parks/park-acadia.png'),
  shenandoah: require('@/assets/parks/park-shenandoah.png'),
  'new-river-gorge': require('@/assets/parks/park-new-river-gorge.png'),
  'great-smoky': require('@/assets/parks/park-great-smoky.png'),
  biscayne: require('@/assets/parks/park-biscayne.png'),
  'dry-tortugas': require('@/assets/parks/park-dry-tortugas.png'),
  everglades: require('@/assets/parks/park-everglades.png'),
  congaree: require('@/assets/parks/park-congaree.png'),
  'mammoth-cave': require('@/assets/parks/park-mammoth-cave.png'),
  'virgin-islands': require('@/assets/parks/park-virgin-islands.png'),
  'cuyahoga-valley': require('@/assets/parks/park-cuyahoga-valley.png'),
  'indiana-dunes': require('@/assets/parks/park-indiana-dunes.png'),
  'isle-royale': require('@/assets/parks/park-isle-royale.png'),
  voyageurs: require('@/assets/parks/park-voyageurs.png'),
  'wind-cave': require('@/assets/parks/park-wind-cave.png'),
  badlands: require('@/assets/parks/park-badlands.png'),
  'theodore-roosevelt': require('@/assets/parks/park-theodore-roosevelt.png'),
  'big-bend': require('@/assets/parks/park-big-bend.png'),
  'guadalupe-mountains': require('@/assets/parks/park-guadalupe-mountains.png'),
  'hot-springs': require('@/assets/parks/park-hot-springs.png'),
  ozark: require('@/assets/parks/park-ozark.png'),
  'rocky-mountain': require('@/assets/parks/park-rocky-mountain.png'),
  'black-canyon': require('@/assets/parks/park-black-canyon.png'),
  'great-sand-dunes': require('@/assets/parks/park-great-sand-dunes.png'),
  'mesa-verde': require('@/assets/parks/park-mesa-verde.png'),
  arches: require('@/assets/parks/park-arches.png'),
  'bryce-canyon': require('@/assets/parks/park-bryce-canyon.png'),
  canyonlands: require('@/assets/parks/park-canyonlands.png'),
  'capitol-reef': require('@/assets/parks/park-capitol-reef.png'),
  zion: require('@/assets/parks/park-zion.png'),
  'grand-teton': require('@/assets/parks/park-grand-teton.png'),
  yellowstone: require('@/assets/parks/park-yellowstone.png'),
  glacier: require('@/assets/parks/park-glacier.png'),
  'glacier-bay': require('@/assets/parks/park-glacier-bay.png'),
  'grand-canyon': require('@/assets/parks/park-grand-canyon.png'),
  'petrified-forest': require('@/assets/parks/park-petrified-forest.png'),
  saguaro: require('@/assets/parks/park-saguaro.png'),
  'carlsbad-caverns': require('@/assets/parks/park-carlsbad-caverns.png'),
  'white-sands': require('@/assets/parks/park-white-sands.png'),
  'great-basin': require('@/assets/parks/park-great-basin.png'),
  yosemite: require('@/assets/parks/park-yosemite.png'),
  sequoia: require('@/assets/parks/park-sequoia.png'),
  'kings-canyon': require('@/assets/parks/park-kings-canyon.png'),
  'death-valley': require('@/assets/parks/park-death-valley.png'),
  'joshua-tree': require('@/assets/parks/park-joshua-tree.png'),
  'channel-islands': require('@/assets/parks/park-channel-islands.png'),
  pinnacles: require('@/assets/parks/park-pinnacles.png'),
  redwood: require('@/assets/parks/park-redwood.png'),
  'lassen-volcanic': require('@/assets/parks/park-lassen-volcanic.png'),
  olympic: require('@/assets/parks/park-olympic.png'),
  'mount-rainier': require('@/assets/parks/park-mount-rainier.png'),
  'north-cascades': require('@/assets/parks/park-north-cascades.png'),
  'crater-lake': require('@/assets/parks/park-crater-lake.png'),
  haleakala: require('@/assets/parks/park-haleakala.png'),
  'hawaii-volcanoes': require('@/assets/parks/park-hawaii-volcanoes.png'),
  'national-park-samoa': require('@/assets/parks/park-national-park-samoa.png'),
  denali: require('@/assets/parks/park-denali.png'),
  katmai: require('@/assets/parks/park-katmai.png'),
  'kenai-fjords': require('@/assets/parks/park-kenai-fjords.png'),
  'kobuk-valley': require('@/assets/parks/park-kobuk-valley.png'),
  'lake-clark': require('@/assets/parks/park-lake-clark.png'),
  'wrangell-st-elias': require('@/assets/parks/park-wrangell-st-elias.png'),
  'gates-arctic': require('@/assets/parks/park-gates-arctic.png'),
  'nps-guam': require('@/assets/parks/park-nps-guam.png'),
};

const FALLBACK_IMAGE = require('@/assets/parks/park-yellowstone.png');

export function getParkImage(parkId: string): number {
  return PARK_IMAGES[parkId] ?? FALLBACK_IMAGE;
}

// Placeholder until each park has its own bespoke scene illustration — for
// now, deterministically assign one of the existing scene backgrounds per
// park (stable across re-renders) rather than a true random pick.
const PARK_SCENES: number[] = [
  require('@/assets/scenes/scene-mountain-lake.png'),
  require('@/assets/scenes/scene-forest.png'),
  require('@/assets/scenes/scene-arches.png'),
  require('@/assets/scenes/scene-mountain-gate.png'),
  require('@/assets/scenes/scene-night-camping.png'),
];

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function getParkScene(parkId: string): number {
  return PARK_SCENES[hashString(parkId) % PARK_SCENES.length];
}
