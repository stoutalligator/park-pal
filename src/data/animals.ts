import { Animal } from '@/types';

export const ALL_ANIMALS: Animal[] = [
  // --- Yellowstone ---
  { id: 'yellowstone-gray-wolf', parkId: 'yellowstone', name: 'Gray Wolf', description: 'Reintroduced in 1995, packs roam the Lamar Valley — one of the best places on Earth to spot wild wolves.', rarity: 'Rare' },
  { id: 'yellowstone-bison', parkId: 'yellowstone', name: 'American Bison', description: 'The park is home to the largest wild bison population in the country, often seen grazing near the road.', rarity: 'Common' },
  { id: 'yellowstone-grizzly', parkId: 'yellowstone', name: 'Grizzly Bear', description: 'Distinguished by a shoulder hump, grizzlies roam the park\'s backcountry meadows and forests.', rarity: 'Rare' },
  { id: 'yellowstone-elk', parkId: 'yellowstone', name: 'Elk', description: 'Large herds gather in open valleys, especially dramatic during the fall rut.', rarity: 'Common' },
  { id: 'yellowstone-bald-eagle', parkId: 'yellowstone', name: 'Bald Eagle', description: 'Often spotted soaring above the Yellowstone River and lake shorelines.', rarity: 'Uncommon' },

  // --- Zion ---
  { id: 'zion-bighorn-sheep', parkId: 'zion', name: 'Desert Bighorn Sheep', description: 'Sure-footed climbers often seen along steep canyon walls near the East Entrance.', rarity: 'Uncommon' },
  { id: 'zion-mule-deer', parkId: 'zion', name: 'Mule Deer', description: 'Common throughout Zion Canyon, especially at dawn and dusk.', rarity: 'Common' },
  { id: 'zion-california-condor', parkId: 'zion', name: 'California Condor', description: 'One of the rarest birds in North America, occasionally seen soaring near Angels Landing.', rarity: 'Rare' },
  { id: 'zion-canyon-treefrog', parkId: 'zion', name: 'Canyon Treefrog', description: 'A well-camouflaged amphibian found near the Narrows and other seasonal pools.', rarity: 'Uncommon' },
  { id: 'zion-collared-lizard', parkId: 'zion', name: 'Collared Lizard', description: 'A strikingly colored lizard often spotted sunning on slickrock.', rarity: 'Common' },

  // --- Rocky Mountain ---
  { id: 'rocky-mountain-elk', parkId: 'rocky-mountain', name: 'Elk', description: 'The park\'s signature animal, with thousands gathering in meadows each fall rut.', rarity: 'Common' },
  { id: 'rocky-mountain-moose', parkId: 'rocky-mountain', name: 'Moose', description: 'Found in willow-lined valleys, especially around the Kawuneeche Valley.', rarity: 'Uncommon' },
  { id: 'rocky-mountain-bighorn', parkId: 'rocky-mountain', name: 'Bighorn Sheep', description: 'Best spotted at Sheep Lakes during spring migration to mineral licks.', rarity: 'Uncommon' },
  { id: 'rocky-mountain-black-bear', parkId: 'rocky-mountain', name: 'Black Bear', description: 'Roams forested slopes, generally shy and elusive.', rarity: 'Rare' },
  { id: 'rocky-mountain-pika', parkId: 'rocky-mountain', name: 'American Pika', description: 'A tiny, vocal alpine mammal found among rockslides above treeline.', rarity: 'Uncommon' },

  // --- Yosemite ---
  { id: 'yosemite-black-bear', parkId: 'yosemite', name: 'Black Bear', description: 'The park\'s largest predator, found throughout the valley and high country.', rarity: 'Uncommon' },
  { id: 'yosemite-mule-deer', parkId: 'yosemite', name: 'Mule Deer', description: 'Frequently grazing in meadows throughout Yosemite Valley.', rarity: 'Common' },
  { id: 'yosemite-peregrine-falcon', parkId: 'yosemite', name: 'Peregrine Falcon', description: 'The fastest animal on Earth, nesting on the park\'s granite cliffs.', rarity: 'Rare' },
  { id: 'yosemite-bighorn', parkId: 'yosemite', name: 'Sierra Nevada Bighorn Sheep', description: 'An endangered subspecies found only in the high alpine country.', rarity: 'Rare' },
  { id: 'yosemite-marmot', parkId: 'yosemite', name: 'Yellow-Bellied Marmot', description: 'A sun-loving rodent commonly seen sunbathing on granite boulders.', rarity: 'Common' },

  // --- Grand Canyon ---
  { id: 'grand-canyon-california-condor', parkId: 'grand-canyon', name: 'California Condor', description: 'Massive endangered scavengers, sometimes seen soaring near the South Rim.', rarity: 'Rare' },
  { id: 'grand-canyon-bighorn-sheep', parkId: 'grand-canyon', name: 'Desert Bighorn Sheep', description: 'Navigates the canyon\'s steep terrain with remarkable agility.', rarity: 'Uncommon' },
  { id: 'grand-canyon-elk', parkId: 'grand-canyon', name: 'Elk', description: 'Common on the forested South Rim, especially around the village area.', rarity: 'Common' },
  { id: 'grand-canyon-mountain-lion', parkId: 'grand-canyon', name: 'Mountain Lion', description: 'Elusive apex predator rarely seen but present throughout the canyon.', rarity: 'Rare' },
  { id: 'grand-canyon-rock-squirrel', parkId: 'grand-canyon', name: 'Rock Squirrel', description: 'A bold, common sight along the rim trails and viewpoints.', rarity: 'Common' },

  // --- Grand Teton ---
  { id: 'grand-teton-moose', parkId: 'grand-teton', name: 'Moose', description: 'Frequently seen browsing in willow flats near Jenny Lake and the Snake River.', rarity: 'Uncommon' },
  { id: 'grand-teton-grizzly', parkId: 'grand-teton', name: 'Grizzly Bear', description: 'Present throughout the park, especially near berry patches in late summer.', rarity: 'Rare' },
  { id: 'grand-teton-pronghorn', parkId: 'grand-teton', name: 'Pronghorn', description: 'The fastest land animal in North America, common on the sagebrush flats.', rarity: 'Common' },
  { id: 'grand-teton-bald-eagle', parkId: 'grand-teton', name: 'Bald Eagle', description: 'Nests along the Snake River, often seen fishing from riverside perches.', rarity: 'Uncommon' },
  { id: 'grand-teton-elk', parkId: 'grand-teton', name: 'Elk', description: 'Large herds winter in the nearby National Elk Refuge and roam the park in summer.', rarity: 'Common' },

  // --- Acadia ---
  { id: 'acadia-peregrine-falcon', parkId: 'acadia', name: 'Peregrine Falcon', description: 'Nests on Precipice cliffs, which close seasonally to protect them.', rarity: 'Rare' },
  { id: 'acadia-harbor-seal', parkId: 'acadia', name: 'Harbor Seal', description: 'Often spotted lounging on rocky ledges along the coastline.', rarity: 'Uncommon' },
  { id: 'acadia-white-tailed-deer', parkId: 'acadia', name: 'White-Tailed Deer', description: 'Common throughout the island\'s forests and carriage roads.', rarity: 'Common' },
  { id: 'acadia-loon', parkId: 'acadia', name: 'Common Loon', description: 'Known for its haunting call, found on the park\'s quieter ponds.', rarity: 'Uncommon' },
  { id: 'acadia-red-squirrel', parkId: 'acadia', name: 'Red Squirrel', description: 'A chattering, energetic presence in the spruce-fir forests.', rarity: 'Common' },

  // --- Great Smoky Mountains ---
  { id: 'great-smoky-black-bear', parkId: 'great-smoky', name: 'Black Bear', description: 'The park\'s most iconic resident, with one of the densest populations in the East.', rarity: 'Uncommon' },
  { id: 'great-smoky-synchronous-fireflies', parkId: 'great-smoky', name: 'Synchronous Fireflies', description: 'A rare species that flashes in unison for a few weeks each June.', rarity: 'Rare' },
  { id: 'great-smoky-elk', parkId: 'great-smoky', name: 'Elk', description: 'Reintroduced to the Cataloochee Valley, often seen grazing at dawn and dusk.', rarity: 'Uncommon' },
  { id: 'great-smoky-white-tailed-deer', parkId: 'great-smoky', name: 'White-Tailed Deer', description: 'Common in open fields like Cades Cove.', rarity: 'Common' },
  { id: 'great-smoky-wild-turkey', parkId: 'great-smoky', name: 'Wild Turkey', description: 'Frequently seen foraging along roadsides and forest edges.', rarity: 'Common' },

  // --- Arches ---
  { id: 'arches-desert-bighorn', parkId: 'arches', name: 'Desert Bighorn Sheep', description: 'Reintroduced to the park, sometimes seen near Cache Valley.', rarity: 'Rare' },
  { id: 'arches-collared-lizard', parkId: 'arches', name: 'Collared Lizard', description: 'A vividly colored lizard common on sunny slickrock in warmer months.', rarity: 'Common' },
  { id: 'arches-kit-fox', parkId: 'arches', name: 'Kit Fox', description: 'A small, nocturnal fox rarely seen but present throughout the desert.', rarity: 'Rare' },
  { id: 'arches-jackrabbit', parkId: 'arches', name: 'Black-Tailed Jackrabbit', description: 'Common at dusk, recognizable by its oversized ears.', rarity: 'Common' },
  { id: 'arches-golden-eagle', parkId: 'arches', name: 'Golden Eagle', description: 'Soars above the park\'s sandstone fins hunting for small mammals.', rarity: 'Uncommon' },

  // --- Shenandoah ---
  { id: 'shenandoah-black-bear', parkId: 'shenandoah', name: 'Black Bear', description: 'One of the densest populations in the East, roaming the Blue Ridge forests.', rarity: 'Uncommon' },
  { id: 'shenandoah-white-tailed-deer', parkId: 'shenandoah', name: 'White-Tailed Deer', description: 'Common in meadows like Big Meadows, especially at dawn and dusk.', rarity: 'Common' },
  { id: 'shenandoah-wild-turkey', parkId: 'shenandoah', name: 'Wild Turkey', description: 'A common roadside forager along Skyline Drive.', rarity: 'Common' },
  { id: 'shenandoah-peregrine-falcon', parkId: 'shenandoah', name: 'Peregrine Falcon', description: 'Nests on the cliffs of Old Rag and other rocky summits.', rarity: 'Rare' },
  { id: 'shenandoah-timber-rattlesnake', parkId: 'shenandoah', name: 'Timber Rattlesnake', description: 'Found basking among rocky outcrops on sunny ridgelines.', rarity: 'Uncommon' },

  // --- New River Gorge ---
  { id: 'new-river-gorge-black-bear', parkId: 'new-river-gorge', name: 'Black Bear', description: 'Found throughout the forested slopes surrounding the gorge.', rarity: 'Uncommon' },
  { id: 'new-river-gorge-timber-rattlesnake', parkId: 'new-river-gorge', name: 'Timber Rattlesnake', description: 'Basks on sunny sandstone outcrops along the gorge rim.', rarity: 'Uncommon' },
  { id: 'new-river-gorge-osprey', parkId: 'new-river-gorge', name: 'Osprey', description: 'Fishes along the New River below the gorge bridge.', rarity: 'Uncommon' },
  { id: 'new-river-gorge-river-otter', parkId: 'new-river-gorge', name: 'River Otter', description: 'Reintroduced and occasionally seen playing along the river.', rarity: 'Rare' },
  { id: 'new-river-gorge-wild-turkey', parkId: 'new-river-gorge', name: 'Wild Turkey', description: 'Common in the surrounding Appalachian forest.', rarity: 'Common' },

  // --- Biscayne ---
  { id: 'biscayne-american-crocodile', parkId: 'biscayne', name: 'American Crocodile', description: 'Found in mangrove shallows, one of the few U.S. populations.', rarity: 'Rare' },
  { id: 'biscayne-manatee', parkId: 'biscayne', name: 'Manatee', description: "Grazes seagrass beds in the bay's calm waters.", rarity: 'Uncommon' },
  { id: 'biscayne-loggerhead-turtle', parkId: 'biscayne', name: 'Loggerhead Sea Turtle', description: "Nests on the park's barrier islands.", rarity: 'Rare' },
  { id: 'biscayne-osprey', parkId: 'biscayne', name: 'Osprey', description: 'Nests atop channel markers throughout the bay.', rarity: 'Uncommon' },
  { id: 'biscayne-rainbow-parrotfish', parkId: 'biscayne', name: 'Rainbow Parrotfish', description: 'Brightly colored reef fish seen while snorkeling.', rarity: 'Common' },

  // --- Dry Tortugas ---
  { id: 'dry-tortugas-sooty-tern', parkId: 'dry-tortugas', name: 'Sooty Tern', description: 'Nests by the thousands on Bush Key each spring.', rarity: 'Common' },
  { id: 'dry-tortugas-loggerhead-turtle', parkId: 'dry-tortugas', name: 'Loggerhead Sea Turtle', description: "Nests on the park's remote beaches.", rarity: 'Rare' },
  { id: 'dry-tortugas-frigatebird', parkId: 'dry-tortugas', name: 'Magnificent Frigatebird', description: 'Soars above the fort on massive wingspans.', rarity: 'Uncommon' },
  { id: 'dry-tortugas-goliath-grouper', parkId: 'dry-tortugas', name: 'Goliath Grouper', description: "Massive fish seen around the fort's pilings while snorkeling.", rarity: 'Rare' },
  { id: 'dry-tortugas-green-sea-turtle', parkId: 'dry-tortugas', name: 'Green Sea Turtle', description: 'Grazes seagrass beds around the surrounding reefs.', rarity: 'Uncommon' },

  // --- Everglades ---
  { id: 'everglades-alligator', parkId: 'everglades', name: 'American Alligator', description: "The park's signature reptile, common along the Anhinga Trail.", rarity: 'Common' },
  { id: 'everglades-crocodile', parkId: 'everglades', name: 'American Crocodile', description: 'Rare overlap zone with alligators near the coast.', rarity: 'Rare' },
  { id: 'everglades-florida-panther', parkId: 'everglades', name: 'Florida Panther', description: 'Elusive, endangered big cat, one of the rarest sights in the park.', rarity: 'Rare' },
  { id: 'everglades-roseate-spoonbill', parkId: 'everglades', name: 'Roseate Spoonbill', description: 'Striking pink wading bird seen in coastal marshes.', rarity: 'Uncommon' },
  { id: 'everglades-manatee', parkId: 'everglades', name: 'Manatee', description: 'Grazes canals and coastal waters near Flamingo.', rarity: 'Uncommon' },

  // --- Congaree ---
  { id: 'congaree-barred-owl', parkId: 'congaree', name: 'Barred Owl', description: 'Common call heard echoing through the old-growth canopy.', rarity: 'Uncommon' },
  { id: 'congaree-white-tailed-deer', parkId: 'congaree', name: 'White-Tailed Deer', description: 'Common throughout the floodplain forest.', rarity: 'Common' },
  { id: 'congaree-river-otter', parkId: 'congaree', name: 'River Otter', description: 'Seen along Cedar Creek and the Congaree River.', rarity: 'Uncommon' },
  { id: 'congaree-wild-turkey', parkId: 'congaree', name: 'Wild Turkey', description: 'Forages the forest floor among the towering trees.', rarity: 'Common' },
  { id: 'congaree-cottonmouth', parkId: 'congaree', name: 'Cottonmouth', description: "Found near the park's sloughs and wetlands.", rarity: 'Uncommon' },

  // --- Mammoth Cave ---
  { id: 'mammoth-cave-gray-bat', parkId: 'mammoth-cave', name: 'Gray Bat', description: 'Endangered species roosting in the cave system.', rarity: 'Rare' },
  { id: 'mammoth-cave-box-turtle', parkId: 'mammoth-cave', name: 'Eastern Box Turtle', description: 'Common in the surface forests above the cave.', rarity: 'Common' },
  { id: 'mammoth-cave-white-tailed-deer', parkId: 'mammoth-cave', name: 'White-Tailed Deer', description: "Common throughout the park's woodlands.", rarity: 'Common' },
  { id: 'mammoth-cave-cave-salamander', parkId: 'mammoth-cave', name: 'Cave Salamander', description: 'Found near cave entrances and spring outlets.', rarity: 'Uncommon' },
  { id: 'mammoth-cave-wild-turkey', parkId: 'mammoth-cave', name: 'Wild Turkey', description: "Forages along the park's ridge trails.", rarity: 'Common' },

  // --- Virgin Islands ---
  { id: 'virgin-islands-hawksbill-turtle', parkId: 'virgin-islands', name: 'Hawksbill Sea Turtle', description: "Nests on the park's protected beaches.", rarity: 'Rare' },
  { id: 'virgin-islands-brown-pelican', parkId: 'virgin-islands', name: 'Brown Pelican', description: 'Dives for fish along the coastline.', rarity: 'Common' },
  { id: 'virgin-islands-bananaquit', parkId: 'virgin-islands', name: 'Bananaquit', description: 'Small, sugar-loving songbird common at picnic areas.', rarity: 'Common' },
  { id: 'virgin-islands-reef-squid', parkId: 'virgin-islands', name: 'Reef Squid', description: 'Seen while snorkeling in Trunk Bay.', rarity: 'Uncommon' },
  { id: 'virgin-islands-mongoose', parkId: 'virgin-islands', name: 'Mongoose', description: 'Introduced species often glimpsed darting through underbrush.', rarity: 'Common' },

  // --- Cuyahoga Valley ---
  { id: 'cuyahoga-valley-white-tailed-deer', parkId: 'cuyahoga-valley', name: 'White-Tailed Deer', description: "Abundant throughout the valley's forests.", rarity: 'Common' },
  { id: 'cuyahoga-valley-great-blue-heron', parkId: 'cuyahoga-valley', name: 'Great Blue Heron', description: 'Nests in a large rookery visible from the Towpath Trail.', rarity: 'Uncommon' },
  { id: 'cuyahoga-valley-coyote', parkId: 'cuyahoga-valley', name: 'Coyote', description: 'Heard howling at dusk, occasionally seen crossing meadows.', rarity: 'Uncommon' },
  { id: 'cuyahoga-valley-river-otter', parkId: 'cuyahoga-valley', name: 'River Otter', description: 'Reintroduced, now thriving along the Cuyahoga River.', rarity: 'Rare' },
  { id: 'cuyahoga-valley-beaver', parkId: 'cuyahoga-valley', name: 'Beaver', description: "Dams found along the park's creeks and wetlands.", rarity: 'Common' },

  // --- Indiana Dunes ---
  { id: 'indiana-dunes-karner-blue', parkId: 'indiana-dunes', name: 'Karner Blue Butterfly', description: 'Endangered butterfly found in oak savanna habitat.', rarity: 'Rare' },
  { id: 'indiana-dunes-sandhill-crane', parkId: 'indiana-dunes', name: 'Sandhill Crane', description: 'Migrates through the marshes each spring and fall.', rarity: 'Uncommon' },
  { id: 'indiana-dunes-massasauga', parkId: 'indiana-dunes', name: 'Eastern Massasauga Rattlesnake', description: 'Rare, secretive snake of the wetlands.', rarity: 'Rare' },
  { id: 'indiana-dunes-white-tailed-deer', parkId: 'indiana-dunes', name: 'White-Tailed Deer', description: 'Common throughout the dunes and forest.', rarity: 'Common' },
  { id: 'indiana-dunes-great-egret', parkId: 'indiana-dunes', name: 'Great Egret', description: 'Wades the marshes hunting for fish.', rarity: 'Uncommon' },

  // --- Isle Royale ---
  { id: 'isle-royale-gray-wolf', parkId: 'isle-royale', name: 'Gray Wolf', description: 'Island population studied in one of the longest predator-prey studies on Earth.', rarity: 'Rare' },
  { id: 'isle-royale-moose', parkId: 'isle-royale', name: 'Moose', description: 'Swims between islands and browses aquatic plants in ponds.', rarity: 'Uncommon' },
  { id: 'isle-royale-common-loon', parkId: 'isle-royale', name: 'Common Loon', description: "Nests on the island's quiet inland lakes.", rarity: 'Uncommon' },
  { id: 'isle-royale-red-fox', parkId: 'isle-royale', name: 'Red Fox', description: 'Den sites found near Rock Harbor and Windigo.', rarity: 'Uncommon' },
  { id: 'isle-royale-beaver', parkId: 'isle-royale', name: 'Beaver', description: "Dams and lodges dot the island's interior waterways.", rarity: 'Common' },

  // --- Voyageurs ---
  { id: 'voyageurs-gray-wolf', parkId: 'voyageurs', name: 'Gray Wolf', description: "Resident packs roam the peninsula's boreal forest.", rarity: 'Rare' },
  { id: 'voyageurs-bald-eagle', parkId: 'voyageurs', name: 'Bald Eagle', description: 'One of the highest nesting densities in the Midwest.', rarity: 'Uncommon' },
  { id: 'voyageurs-beaver', parkId: 'voyageurs', name: 'Beaver', description: 'Extensive dam networks visible from park waterways.', rarity: 'Common' },
  { id: 'voyageurs-black-bear', parkId: 'voyageurs', name: 'Black Bear', description: "Forages the forest edges near park lakes.", rarity: 'Uncommon' },
  { id: 'voyageurs-common-loon', parkId: 'voyageurs', name: 'Common Loon', description: "Iconic call echoes across the park's interconnected lakes.", rarity: 'Common' },

  // --- Wind Cave ---
  { id: 'wind-cave-bison', parkId: 'wind-cave', name: 'American Bison', description: "Free-roaming herd across the park's mixed-grass prairie.", rarity: 'Common' },
  { id: 'wind-cave-prairie-dog', parkId: 'wind-cave', name: 'Black-Tailed Prairie Dog', description: 'Extensive "towns" visible near park roads.', rarity: 'Common' },
  { id: 'wind-cave-elk', parkId: 'wind-cave', name: 'Elk', description: 'Found in prairie and ponderosa pine habitat.', rarity: 'Uncommon' },
  { id: 'wind-cave-pronghorn', parkId: 'wind-cave', name: 'Pronghorn', description: 'Fast-moving prairie grazer often seen at dawn.', rarity: 'Uncommon' },
  { id: 'wind-cave-big-eared-bat', parkId: 'wind-cave', name: "Townsend's Big-Eared Bat", description: "Roosts within the cave's passages.", rarity: 'Rare' },

  // --- Badlands ---
  { id: 'badlands-bighorn-sheep', parkId: 'badlands', name: 'Bighorn Sheep', description: "Reintroduced, seen along the park's steep buttes.", rarity: 'Uncommon' },
  { id: 'badlands-black-footed-ferret', parkId: 'badlands', name: 'Black-Footed Ferret', description: 'One of the rarest mammals in North America, reintroduced here.', rarity: 'Rare' },
  { id: 'badlands-bison', parkId: 'badlands', name: 'American Bison', description: 'Roams the Sage Creek Wilderness Area.', rarity: 'Common' },
  { id: 'badlands-prairie-rattlesnake', parkId: 'badlands', name: 'Prairie Rattlesnake', description: 'Found among rock outcrops and grasslands.', rarity: 'Uncommon' },
  { id: 'badlands-swift-fox', parkId: 'badlands', name: 'Swift Fox', description: 'Small nocturnal fox of the mixed-grass prairie.', rarity: 'Rare' },

  // --- Theodore Roosevelt ---
  { id: 'theodore-roosevelt-bison', parkId: 'theodore-roosevelt', name: 'American Bison', description: 'Reintroduced herds roam the badlands grasslands.', rarity: 'Common' },
  { id: 'theodore-roosevelt-wild-horse', parkId: 'theodore-roosevelt', name: 'Wild Horse', description: 'Feral herds descended from ranch stock roam the South Unit.', rarity: 'Uncommon' },
  { id: 'theodore-roosevelt-bighorn-sheep', parkId: 'theodore-roosevelt', name: 'Bighorn Sheep', description: 'Found on rugged terrain in the North Unit.', rarity: 'Uncommon' },
  { id: 'theodore-roosevelt-prairie-dog', parkId: 'theodore-roosevelt', name: 'Prairie Dog', description: 'Large "towns" visible along park roads.', rarity: 'Common' },
  { id: 'theodore-roosevelt-elk', parkId: 'theodore-roosevelt', name: 'Elk', description: "Reintroduced, found in the park's North Unit.", rarity: 'Uncommon' },

  // --- Big Bend ---
  { id: 'big-bend-roadrunner', parkId: 'big-bend', name: 'Roadrunner', description: 'Iconic desert bird often seen darting along trails.', rarity: 'Common' },
  { id: 'big-bend-black-bear', parkId: 'big-bend', name: 'Black Bear', description: 'Found in the higher elevations of the Chisos Mountains.', rarity: 'Rare' },
  { id: 'big-bend-javelina', parkId: 'big-bend', name: 'Javelina', description: 'Herds of these pig-like mammals forage the desert scrub.', rarity: 'Common' },
  { id: 'big-bend-mountain-lion', parkId: 'big-bend', name: 'Mountain Lion', description: 'Elusive predator of the Chisos backcountry.', rarity: 'Rare' },
  { id: 'big-bend-colima-warbler', parkId: 'big-bend', name: 'Colima Warbler', description: 'Rare songbird found nowhere else in the U.S. outside the Chisos.', rarity: 'Rare' },

  // --- Guadalupe Mountains ---
  { id: 'guadalupe-mountains-elk', parkId: 'guadalupe-mountains', name: 'Elk', description: "Reintroduced herds roam the park's high country.", rarity: 'Uncommon' },
  { id: 'guadalupe-mountains-mule-deer', parkId: 'guadalupe-mountains', name: 'Mule Deer', description: "Common throughout the park's canyons and desert.", rarity: 'Common' },
  { id: 'guadalupe-mountains-mountain-lion', parkId: 'guadalupe-mountains', name: 'Mountain Lion', description: 'Present but rarely seen in the rugged backcountry.', rarity: 'Rare' },
  { id: 'guadalupe-mountains-golden-eagle', parkId: 'guadalupe-mountains', name: 'Golden Eagle', description: "Soars above the park's high peaks and cliffs.", rarity: 'Uncommon' },
  { id: 'guadalupe-mountains-horned-lizard', parkId: 'guadalupe-mountains', name: 'Texas Horned Lizard', description: "Found in the park's lower desert elevations.", rarity: 'Uncommon' },

  // --- Hot Springs ---
  { id: 'hot-springs-white-tailed-deer', parkId: 'hot-springs', name: 'White-Tailed Deer', description: 'Common throughout the Ouachita Mountain forest.', rarity: 'Common' },
  { id: 'hot-springs-wild-turkey', parkId: 'hot-springs', name: 'Wild Turkey', description: "Forages the park's wooded slopes.", rarity: 'Common' },
  { id: 'hot-springs-box-turtle', parkId: 'hot-springs', name: 'Eastern Box Turtle', description: 'Frequently spotted along shaded forest trails.', rarity: 'Common' },
  { id: 'hot-springs-barred-owl', parkId: 'hot-springs', name: 'Barred Owl', description: 'Heard calling through the forest at dusk.', rarity: 'Uncommon' },
  { id: 'hot-springs-copperhead', parkId: 'hot-springs', name: 'Copperhead', description: "Found among leaf litter on the park's forested trails.", rarity: 'Uncommon' },


  // --- Gateway Arch ---
  { id: 'gateway-arch-peregrine-falcon', parkId: 'gateway-arch', name: 'Peregrine Falcon', description: 'Nests on the arch itself, one of the tallest urban nest sites in the country.', rarity: 'Rare' },
  { id: 'gateway-arch-mallard', parkId: 'gateway-arch', name: 'Mallard', description: 'Common along the Mississippi riverfront.', rarity: 'Common' },
  { id: 'gateway-arch-gray-squirrel', parkId: 'gateway-arch', name: 'Eastern Gray Squirrel', description: "Common throughout the arch grounds' lawns.", rarity: 'Common' },
  { id: 'gateway-arch-great-blue-heron', parkId: 'gateway-arch', name: 'Great Blue Heron', description: 'Occasionally seen fishing along the riverbank.', rarity: 'Uncommon' },
  { id: 'gateway-arch-monarch-butterfly', parkId: 'gateway-arch', name: 'Monarch Butterfly', description: "Passes through the grounds' native plantings during migration.", rarity: 'Uncommon' },

  // --- Black Canyon of the Gunnison ---
  { id: 'black-canyon-peregrine-falcon', parkId: 'black-canyon', name: 'Peregrine Falcon', description: "Nests on the canyon's sheer cliff walls.", rarity: 'Rare' },
  { id: 'black-canyon-golden-eagle', parkId: 'black-canyon', name: 'Golden Eagle', description: "Soars along the canyon's rim thermals.", rarity: 'Uncommon' },
  { id: 'black-canyon-mule-deer', parkId: 'black-canyon', name: 'Mule Deer', description: "Common throughout the rim's pinyon-juniper woodlands.", rarity: 'Common' },
  { id: 'black-canyon-black-bear', parkId: 'black-canyon', name: 'Black Bear', description: "Forages the canyon's oak brush in late summer.", rarity: 'Rare' },
  { id: 'black-canyon-bighorn-sheep', parkId: 'black-canyon', name: 'Desert Bighorn Sheep', description: "Reintroduced, navigates the canyon's steep walls.", rarity: 'Uncommon' },

  // --- Great Sand Dunes ---
  { id: 'great-sand-dunes-kangaroo-rat', parkId: 'great-sand-dunes', name: 'Kangaroo Rat', description: 'Burrows in the dunefield, active only after dark.', rarity: 'Uncommon' },
  { id: 'great-sand-dunes-pronghorn', parkId: 'great-sand-dunes', name: 'Pronghorn', description: 'Grazes the grasslands surrounding the dunes.', rarity: 'Common' },
  { id: 'great-sand-dunes-elk', parkId: 'great-sand-dunes', name: 'Elk', description: 'Found in the surrounding mountain forests.', rarity: 'Uncommon' },
  { id: 'great-sand-dunes-tiger-beetle', parkId: 'great-sand-dunes', name: 'Great Sand Dunes Tiger Beetle', description: 'Found nowhere else on Earth, endemic to the dunefield.', rarity: 'Rare' },
  { id: 'great-sand-dunes-black-bear', parkId: 'great-sand-dunes', name: 'Black Bear', description: 'Forages the foothill forests bordering the dunes.', rarity: 'Rare' },

  // --- Mesa Verde ---
  { id: 'mesa-verde-mule-deer', parkId: 'mesa-verde', name: 'Mule Deer', description: 'Common throughout the mesa-top pinyon-juniper forest.', rarity: 'Common' },
  { id: 'mesa-verde-wild-turkey', parkId: 'mesa-verde', name: 'Wild Turkey', description: 'Descendants of birds raised by ancestral Puebloans, still common.', rarity: 'Common' },
  { id: 'mesa-verde-golden-eagle', parkId: 'mesa-verde', name: 'Golden Eagle', description: "Nests on the park's canyon cliff walls.", rarity: 'Uncommon' },
  { id: 'mesa-verde-collared-lizard', parkId: 'mesa-verde', name: 'Collared Lizard', description: 'Basks on sunny rock outcrops near the cliff dwellings.', rarity: 'Common' },
  { id: 'mesa-verde-black-bear', parkId: 'mesa-verde', name: 'Black Bear', description: "Occasionally forages the mesa's oak brush.", rarity: 'Rare' },

  // --- Bryce Canyon ---
  { id: 'bryce-canyon-prairie-dog', parkId: 'bryce-canyon', name: 'Utah Prairie Dog', description: 'Endangered species found nowhere else, common in meadows near the visitor center.', rarity: 'Uncommon' },
  { id: 'bryce-canyon-mule-deer', parkId: 'bryce-canyon', name: 'Mule Deer', description: "Common throughout the park's forests and meadows.", rarity: 'Common' },
  { id: 'bryce-canyon-pronghorn', parkId: 'bryce-canyon', name: 'Pronghorn', description: "Occasionally seen in the park's high plateau grasslands.", rarity: 'Rare' },
  { id: 'bryce-canyon-peregrine-falcon', parkId: 'bryce-canyon', name: 'Peregrine Falcon', description: "Nests among the park's hoodoo cliffs.", rarity: 'Rare' },
  { id: 'bryce-canyon-great-horned-owl', parkId: 'bryce-canyon', name: 'Great Horned Owl', description: 'Roosts in ponderosa pines along the rim.', rarity: 'Uncommon' },

  // --- Canyonlands ---
  { id: 'canyonlands-bighorn-sheep', parkId: 'canyonlands', name: 'Desert Bighorn Sheep', description: "Navigates the park's canyon walls and mesas.", rarity: 'Uncommon' },
  { id: 'canyonlands-collared-lizard', parkId: 'canyonlands', name: 'Collared Lizard', description: 'Common on sunny slickrock throughout the park.', rarity: 'Common' },
  { id: 'canyonlands-golden-eagle', parkId: 'canyonlands', name: 'Golden Eagle', description: "Soars above the park's mesas and canyons.", rarity: 'Uncommon' },
  { id: 'canyonlands-kit-fox', parkId: 'canyonlands', name: 'Kit Fox', description: 'Small nocturnal fox of the desert backcountry.', rarity: 'Rare' },
  { id: 'canyonlands-pronghorn', parkId: 'canyonlands', name: 'Pronghorn', description: 'Occasionally seen in the Island in the Sky grasslands.', rarity: 'Rare' },

  // --- Capitol Reef ---
  { id: 'capitol-reef-mule-deer', parkId: 'capitol-reef', name: 'Mule Deer', description: "Common throughout the park's orchards and canyons.", rarity: 'Common' },
  { id: 'capitol-reef-bighorn-sheep', parkId: 'capitol-reef', name: 'Desert Bighorn Sheep', description: "Found on the park's steep canyon terrain.", rarity: 'Uncommon' },
  { id: 'capitol-reef-peregrine-falcon', parkId: 'capitol-reef', name: 'Peregrine Falcon', description: "Nests on the park's sandstone cliffs.", rarity: 'Rare' },
  { id: 'capitol-reef-collared-lizard', parkId: 'capitol-reef', name: 'Collared Lizard', description: 'Common on slickrock in warmer months.', rarity: 'Common' },
  { id: 'capitol-reef-ringtail', parkId: 'capitol-reef', name: 'Ringtail', description: "Nocturnal, raccoon-like mammal rarely seen in the park's canyons.", rarity: 'Rare' },

  // --- Glacier ---
  { id: 'glacier-grizzly', parkId: 'glacier', name: 'Grizzly Bear', description: "Iconic resident of the park's high alpine meadows.", rarity: 'Rare' },
  { id: 'glacier-mountain-goat', parkId: 'glacier', name: 'Mountain Goat', description: 'Navigates cliffs along the Highline Trail.', rarity: 'Common' },
  { id: 'glacier-gray-wolf', parkId: 'glacier', name: 'Gray Wolf', description: 'Present in remote valleys throughout the park.', rarity: 'Rare' },
  { id: 'glacier-bighorn-sheep', parkId: 'glacier', name: 'Bighorn Sheep', description: 'Found near Logan Pass and high mountain slopes.', rarity: 'Uncommon' },
  { id: 'glacier-moose', parkId: 'glacier', name: 'Moose', description: "Browses willow flats in the park's valley wetlands.", rarity: 'Uncommon' },

  // --- Glacier Bay ---
  { id: 'glacier-bay-humpback-whale', parkId: 'glacier-bay', name: 'Humpback Whale', description: "Feeds in the bay's nutrient-rich waters each summer.", rarity: 'Uncommon' },
  { id: 'glacier-bay-brown-bear', parkId: 'glacier-bay', name: 'Brown Bear', description: 'Fishes along salmon streams and forages the shoreline.', rarity: 'Rare' },
  { id: 'glacier-bay-sea-otter', parkId: 'glacier-bay', name: 'Sea Otter', description: "Floats among the bay's calm coastal waters.", rarity: 'Uncommon' },
  { id: 'glacier-bay-orca', parkId: 'glacier-bay', name: 'Orca', description: "Pods occasionally seen hunting in the bay's deep channels.", rarity: 'Rare' },
  { id: 'glacier-bay-bald-eagle', parkId: 'glacier-bay', name: 'Bald Eagle', description: "Nests throughout the park's coastal forest.", rarity: 'Common' },

  // --- Petrified Forest ---
  { id: 'petrified-forest-pronghorn', parkId: 'petrified-forest', name: 'Pronghorn', description: "Grazes the park's grasslands, the fastest land animal in North America.", rarity: 'Common' },
  { id: 'petrified-forest-collared-lizard', parkId: 'petrified-forest', name: 'Collared Lizard', description: 'Common on rocky badlands terrain.', rarity: 'Common' },
  { id: 'petrified-forest-coyote', parkId: 'petrified-forest', name: 'Coyote', description: "Frequently seen trotting across the park's open grassland.", rarity: 'Uncommon' },
  { id: 'petrified-forest-raven', parkId: 'petrified-forest', name: 'Raven', description: 'Common scavenger seen throughout the Painted Desert.', rarity: 'Common' },
  { id: 'petrified-forest-bullsnake', parkId: 'petrified-forest', name: 'Bullsnake', description: "Found in the park's grassland and badlands habitat.", rarity: 'Uncommon' },

  // --- Saguaro ---
  { id: 'saguaro-gila-monster', parkId: 'saguaro', name: 'Gila Monster', description: "Venomous lizard found among the park's rocky desert slopes.", rarity: 'Rare' },
  { id: 'saguaro-javelina', parkId: 'saguaro', name: 'Javelina', description: 'Herds forage the desert scrub near saguaro stands.', rarity: 'Common' },
  { id: 'saguaro-roadrunner', parkId: 'saguaro', name: 'Roadrunner', description: 'Iconic desert bird common along low-elevation trails.', rarity: 'Common' },
  { id: 'saguaro-gila-woodpecker', parkId: 'saguaro', name: 'Gila Woodpecker', description: 'Nests in cavities carved into saguaro cacti.', rarity: 'Common' },
  { id: 'saguaro-desert-tortoise', parkId: 'saguaro', name: 'Desert Tortoise', description: "Slow-moving reptile found in the park's rocky desert.", rarity: 'Uncommon' },

  // --- Carlsbad Caverns ---
  { id: 'carlsbad-caverns-free-tailed-bat', parkId: 'carlsbad-caverns', name: 'Brazilian Free-Tailed Bat', description: 'Famous evening bat flight emerges from the cavern entrance.', rarity: 'Common' },
  { id: 'carlsbad-caverns-cave-swallow', parkId: 'carlsbad-caverns', name: 'Cave Swallow', description: "Nests near the cavern's natural entrance.", rarity: 'Uncommon' },
  { id: 'carlsbad-caverns-mule-deer', parkId: 'carlsbad-caverns', name: 'Mule Deer', description: "Found in the park's surface desert habitat.", rarity: 'Common' },
  { id: 'carlsbad-caverns-ringtail', parkId: 'carlsbad-caverns', name: 'Ringtail', description: 'Nocturnal mammal occasionally seen near cave entrances.', rarity: 'Rare' },
  { id: 'carlsbad-caverns-golden-eagle', parkId: 'carlsbad-caverns', name: 'Golden Eagle', description: "Soars above the park's rugged desert canyons.", rarity: 'Uncommon' },

  // --- White Sands ---
  { id: 'white-sands-earless-lizard', parkId: 'white-sands', name: 'Bleached Earless Lizard', description: 'Pale lizard evolved to match the white gypsum sand.', rarity: 'Uncommon' },
  { id: 'white-sands-kit-fox', parkId: 'white-sands', name: 'Kit Fox', description: 'Small nocturnal fox that dens within the dunefield.', rarity: 'Rare' },
  { id: 'white-sands-pronghorn', parkId: 'white-sands', name: 'Pronghorn', description: 'Grazes the grasslands surrounding the dunes.', rarity: 'Common' },
  { id: 'white-sands-roadrunner', parkId: 'white-sands', name: 'Roadrunner', description: 'Leaves distinctive tracks across the gypsum sand.', rarity: 'Common' },
  { id: 'white-sands-sandhill-crane', parkId: 'white-sands', name: 'Sandhill Crane', description: 'Rests in nearby wetlands during migration.', rarity: 'Uncommon' },

  // --- Great Basin ---
  { id: 'great-basin-pronghorn', parkId: 'great-basin', name: 'Pronghorn', description: 'Grazes the sagebrush valleys surrounding the park.', rarity: 'Common' },
  { id: 'great-basin-mountain-goat', parkId: 'great-basin', name: 'Mountain Goat', description: "Found along Wheeler Peak's rocky upper slopes.", rarity: 'Uncommon' },
  { id: 'great-basin-marmot', parkId: 'great-basin', name: 'Yellow-Bellied Marmot', description: 'Common sunbathing on rocks near alpine lakes.', rarity: 'Common' },
  { id: 'great-basin-golden-eagle', parkId: 'great-basin', name: 'Golden Eagle', description: "Soars above the park's high desert ridges.", rarity: 'Uncommon' },
  { id: 'great-basin-big-eared-bat', parkId: 'great-basin', name: "Townsend's Big-Eared Bat", description: 'Roosts within Lehman Caves.', rarity: 'Rare' },

  // --- Sequoia ---
  { id: 'sequoia-black-bear', parkId: 'sequoia', name: 'Black Bear', description: "Common throughout the park's forests and meadows.", rarity: 'Uncommon' },
  { id: 'sequoia-mule-deer', parkId: 'sequoia', name: 'Mule Deer', description: 'Frequently seen grazing in Crescent Meadow.', rarity: 'Common' },
  { id: 'sequoia-bighorn-sheep', parkId: 'sequoia', name: 'Sierra Nevada Bighorn Sheep', description: "Endangered subspecies found in the park's high alpine terrain.", rarity: 'Rare' },
  { id: 'sequoia-pacific-fisher', parkId: 'sequoia', name: 'Pacific Fisher', description: 'Rare forest carnivore found among the giant sequoia groves.', rarity: 'Rare' },
  { id: 'sequoia-stellers-jay', parkId: 'sequoia', name: "Steller's Jay", description: 'Bold blue-crested bird common at campgrounds and trailheads.', rarity: 'Common' },

  // --- Kings Canyon ---
  { id: 'kings-canyon-black-bear', parkId: 'kings-canyon', name: 'Black Bear', description: "Forages throughout the canyon's forests and meadows.", rarity: 'Uncommon' },
  { id: 'kings-canyon-mule-deer', parkId: 'kings-canyon', name: 'Mule Deer', description: 'Common in Zumwalt Meadow and along canyon trails.', rarity: 'Common' },
  { id: 'kings-canyon-peregrine-falcon', parkId: 'kings-canyon', name: 'Peregrine Falcon', description: "Nests on the canyon's granite cliffs.", rarity: 'Rare' },
  { id: 'kings-canyon-marmot', parkId: 'kings-canyon', name: 'Yellow-Bellied Marmot', description: 'Sunbathes on granite boulders in the high country.', rarity: 'Common' },
  { id: 'kings-canyon-pika', parkId: 'kings-canyon', name: 'American Pika', description: "Found among talus slopes in the park's alpine zones.", rarity: 'Uncommon' },

  // --- Death Valley ---
  { id: 'death-valley-bighorn-sheep', parkId: 'death-valley', name: 'Desert Bighorn Sheep', description: "Navigates the park's steep canyon terrain.", rarity: 'Rare' },
  { id: 'death-valley-roadrunner', parkId: 'death-valley', name: 'Roadrunner', description: 'Dashes across desert flats near the valley floor.', rarity: 'Common' },
  { id: 'death-valley-kit-fox', parkId: 'death-valley', name: 'Kit Fox', description: 'Small nocturnal fox adapted to extreme desert heat.', rarity: 'Uncommon' },
  { id: 'death-valley-desert-tortoise', parkId: 'death-valley', name: 'Desert Tortoise', description: "Found in the park's lower desert scrub.", rarity: 'Rare' },
  { id: 'death-valley-sidewinder', parkId: 'death-valley', name: 'Sidewinder', description: 'Distinctive rattlesnake that moves in a sideways motion across dunes.', rarity: 'Uncommon' },

  // --- Joshua Tree ---
  { id: 'joshua-tree-desert-tortoise', parkId: 'joshua-tree', name: 'Desert Tortoise', description: "Threatened species found among the park's low desert scrub.", rarity: 'Rare' },
  { id: 'joshua-tree-roadrunner', parkId: 'joshua-tree', name: 'Roadrunner', description: 'Common sight darting between boulders and Joshua trees.', rarity: 'Common' },
  { id: 'joshua-tree-chuckwalla', parkId: 'joshua-tree', name: 'Chuckwalla', description: 'Large lizard that wedges itself into rock crevices when threatened.', rarity: 'Uncommon' },
  { id: 'joshua-tree-bighorn-sheep', parkId: 'joshua-tree', name: 'Desert Bighorn Sheep', description: "Found in the park's rugged Little San Bernardino Mountains.", rarity: 'Rare' },
  { id: 'joshua-tree-jackrabbit', parkId: 'joshua-tree', name: 'Black-Tailed Jackrabbit', description: 'Common at dusk throughout the desert scrub.', rarity: 'Common' },

  // --- Channel Islands ---
  { id: 'channel-islands-island-fox', parkId: 'channel-islands', name: 'Island Fox', description: 'Tiny fox found nowhere else on Earth, unique to the Channel Islands.', rarity: 'Rare' },
  { id: 'channel-islands-sea-lion', parkId: 'channel-islands', name: 'California Sea Lion', description: 'Hauls out on rocky shorelines throughout the islands.', rarity: 'Common' },
  { id: 'channel-islands-scrub-jay', parkId: 'channel-islands', name: 'Island Scrub-Jay', description: 'Endemic bird found only on Santa Cruz Island.', rarity: 'Rare' },
  { id: 'channel-islands-gray-whale', parkId: 'channel-islands', name: 'Gray Whale', description: 'Migrates past the islands each winter and spring.', rarity: 'Uncommon' },
  { id: 'channel-islands-garibaldi', parkId: 'channel-islands', name: 'Garibaldi', description: "California's bright orange state fish, seen while snorkeling.", rarity: 'Common' },

  // --- Pinnacles ---
  { id: 'pinnacles-california-condor', parkId: 'pinnacles', name: 'California Condor', description: "Reintroduced population soars above the park's rock spires.", rarity: 'Rare' },
  { id: 'pinnacles-big-eared-bat', parkId: 'pinnacles', name: "Townsend's Big-Eared Bat", description: "Roosts in the park's talus caves.", rarity: 'Uncommon' },
  { id: 'pinnacles-prairie-falcon', parkId: 'pinnacles', name: 'Prairie Falcon', description: "Nests on the pinnacles' volcanic rock formations.", rarity: 'Uncommon' },
  { id: 'pinnacles-bobcat', parkId: 'pinnacles', name: 'Bobcat', description: "Occasionally seen prowling the park's chaparral.", rarity: 'Rare' },
  { id: 'pinnacles-horned-lizard', parkId: 'pinnacles', name: 'Coast Horned Lizard', description: 'Found among rocky, sunny slopes.', rarity: 'Uncommon' },

  // --- Redwood ---
  { id: 'redwood-roosevelt-elk', parkId: 'redwood', name: 'Roosevelt Elk', description: "Massive herds graze the park's coastal prairies.", rarity: 'Common' },
  { id: 'redwood-banana-slug', parkId: 'redwood', name: 'Banana Slug', description: 'Bright yellow decomposer common on the forest floor.', rarity: 'Common' },
  { id: 'redwood-black-bear', parkId: 'redwood', name: 'Black Bear', description: 'Forages the redwood forest understory.', rarity: 'Uncommon' },
  { id: 'redwood-marbled-murrelet', parkId: 'redwood', name: 'Marbled Murrelet', description: 'Rare seabird that nests high in old-growth redwood canopies.', rarity: 'Rare' },
  { id: 'redwood-spotted-owl', parkId: 'redwood', name: 'Northern Spotted Owl', description: "Threatened species found in the park's old-growth forest.", rarity: 'Rare' },

  // --- Lassen Volcanic ---
  { id: 'lassen-volcanic-black-bear', parkId: 'lassen-volcanic', name: 'Black Bear', description: "Forages the park's forests and meadows.", rarity: 'Uncommon' },
  { id: 'lassen-volcanic-mule-deer', parkId: 'lassen-volcanic', name: 'Mule Deer', description: "Common throughout the park's mixed conifer forest.", rarity: 'Common' },
  { id: 'lassen-volcanic-coyote', parkId: 'lassen-volcanic', name: 'Mountain Coyote', description: 'Frequently heard howling near park meadows.', rarity: 'Uncommon' },
  { id: 'lassen-volcanic-nutcracker', parkId: 'lassen-volcanic', name: "Clark's Nutcracker", description: 'Bold gray bird common near the Lassen Peak trailhead.', rarity: 'Common' },
  { id: 'lassen-volcanic-pika', parkId: 'lassen-volcanic', name: 'American Pika', description: "Found among the park's volcanic talus slopes.", rarity: 'Uncommon' },

  // --- Olympic ---
  { id: 'olympic-roosevelt-elk', parkId: 'olympic', name: 'Roosevelt Elk', description: "The park's namesake herds roam the rainforest valleys.", rarity: 'Common' },
  { id: 'olympic-marmot', parkId: 'olympic', name: 'Olympic Marmot', description: "Found only in the park's high alpine meadows.", rarity: 'Rare' },
  { id: 'olympic-banana-slug', parkId: 'olympic', name: 'Banana Slug', description: 'Common decomposer on the rainforest floor.', rarity: 'Common' },
  { id: 'olympic-bald-eagle', parkId: 'olympic', name: 'Bald Eagle', description: "Nests along the park's rugged coastline.", rarity: 'Uncommon' },
  { id: 'olympic-sea-otter', parkId: 'olympic', name: 'Sea Otter', description: "Floats in kelp beds off the park's Pacific shore.", rarity: 'Uncommon' },

  // --- Mount Rainier ---
  { id: 'mount-rainier-black-bear', parkId: 'mount-rainier', name: 'Black Bear', description: "Forages the park's forests and subalpine meadows.", rarity: 'Uncommon' },
  { id: 'mount-rainier-mountain-goat', parkId: 'mount-rainier', name: 'Mountain Goat', description: "Found on the peak's rocky upper slopes.", rarity: 'Uncommon' },
  { id: 'mount-rainier-hoary-marmot', parkId: 'mount-rainier', name: 'Hoary Marmot', description: "Whistles from rockslides in the park's high meadows.", rarity: 'Common' },
  { id: 'mount-rainier-douglas-squirrel', parkId: 'mount-rainier', name: 'Douglas Squirrel', description: "Common in the park's dense conifer forests.", rarity: 'Common' },
  { id: 'mount-rainier-pika', parkId: 'mount-rainier', name: 'American Pika', description: 'Found among talus slopes near Paradise and Sunrise.', rarity: 'Uncommon' },

  // --- North Cascades ---
  { id: 'north-cascades-gray-wolf', parkId: 'north-cascades', name: 'Gray Wolf', description: 'Present in remote valleys throughout the park.', rarity: 'Rare' },
  { id: 'north-cascades-mountain-goat', parkId: 'north-cascades', name: 'Mountain Goat', description: "Navigates the park's rugged alpine terrain.", rarity: 'Uncommon' },
  { id: 'north-cascades-black-bear', parkId: 'north-cascades', name: 'Black Bear', description: "Forages the park's forests and berry patches.", rarity: 'Uncommon' },
  { id: 'north-cascades-cascade-fox', parkId: 'north-cascades', name: 'Cascade Red Fox', description: 'Elusive high-elevation fox subspecies.', rarity: 'Rare' },
  { id: 'north-cascades-pika', parkId: 'north-cascades', name: 'American Pika', description: 'Found among rockslides near Cascade Pass.', rarity: 'Uncommon' },

  // --- Crater Lake ---
  { id: 'crater-lake-black-bear', parkId: 'crater-lake', name: 'Black Bear', description: "Forages the park's surrounding forests.", rarity: 'Uncommon' },
  { id: 'crater-lake-nutcracker', parkId: 'crater-lake', name: "Clark's Nutcracker", description: 'Bold bird common at overlooks and picnic areas.', rarity: 'Common' },
  { id: 'crater-lake-pika', parkId: 'crater-lake', name: 'American Pika', description: 'Found among rockslides near the caldera rim.', rarity: 'Uncommon' },
  { id: 'crater-lake-rubber-boa', parkId: 'crater-lake', name: 'Rubber Boa', description: "Docile, rarely seen snake found in the park's forests.", rarity: 'Rare' },
  { id: 'crater-lake-elk', parkId: 'crater-lake', name: 'Elk', description: 'Found in meadows and forests bordering the caldera.', rarity: 'Uncommon' },

  // --- Haleakalā ---
  { id: 'haleakala-nene', parkId: 'haleakala', name: 'Nene', description: "Hawaii's state bird, an endangered goose found near the summit.", rarity: 'Rare' },
  { id: 'haleakala-petrel', parkId: 'haleakala', name: 'Hawaiian Petrel', description: "Endangered seabird that nests in the volcano's crater walls.", rarity: 'Rare' },
  { id: 'haleakala-kamehameha-butterfly', parkId: 'haleakala', name: 'Kamehameha Butterfly', description: 'One of only two butterfly species native to Hawaii.', rarity: 'Rare' },
  { id: 'haleakala-pueo', parkId: 'haleakala', name: 'Pueo (Hawaiian Short-Eared Owl)', description: "Hunts over the summit's open grasslands.", rarity: 'Uncommon' },
  { id: 'haleakala-axis-deer', parkId: 'haleakala', name: 'Axis Deer', description: "Introduced species seen grazing in the park's lower slopes.", rarity: 'Common' },

  // --- Hawaiʻi Volcanoes ---
  { id: 'hawaii-volcanoes-nene', parkId: 'hawaii-volcanoes', name: 'Nene', description: 'Endangered native goose, found grazing near the summit.', rarity: 'Rare' },
  { id: 'hawaii-volcanoes-hoary-bat', parkId: 'hawaii-volcanoes', name: 'Hawaiian Hoary Bat', description: 'The only native land mammal in Hawaii.', rarity: 'Rare' },
  { id: 'hawaii-volcanoes-iiwi', parkId: 'hawaii-volcanoes', name: "I'iwi", description: "Vivid scarlet honeycreeper found in the park's native forest.", rarity: 'Uncommon' },
  { id: 'hawaii-volcanoes-kamehameha-butterfly', parkId: 'hawaii-volcanoes', name: 'Kamehameha Butterfly', description: "Native butterfly found among the park's ohia forests.", rarity: 'Rare' },
  { id: 'hawaii-volcanoes-feral-pig', parkId: 'hawaii-volcanoes', name: 'Feral Pig', description: 'Introduced species that roots through native rainforest understory.', rarity: 'Common' },

  // --- National Park of American Samoa ---
  { id: 'national-park-samoa-flying-fox', parkId: 'national-park-samoa', name: 'Flying Fox (Samoan Fruit Bat)', description: 'Large fruit bat seen gliding over the rainforest canopy.', rarity: 'Uncommon' },
  { id: 'national-park-samoa-pacific-boa', parkId: 'national-park-samoa', name: 'Pacific Boa', description: "Samoa's only native snake, found in the park's lowland forest.", rarity: 'Rare' },
  { id: 'national-park-samoa-spinner-dolphin', parkId: 'national-park-samoa', name: 'Spinner Dolphin', description: 'Seen leaping in the waters surrounding the park.', rarity: 'Uncommon' },
  { id: 'national-park-samoa-fruit-dove', parkId: 'national-park-samoa', name: 'Many-Colored Fruit Dove', description: 'Brilliantly colored native bird of the rainforest canopy.', rarity: 'Rare' },
  { id: 'national-park-samoa-hawksbill-turtle', parkId: 'national-park-samoa', name: 'Hawksbill Sea Turtle', description: "Nests on the park's remote beaches.", rarity: 'Rare' },


  // --- Denali ---
  { id: 'denali-grizzly', parkId: 'denali', name: 'Grizzly Bear', description: "Roams the park's vast open tundra, one of the \"Big Five\" species.", rarity: 'Rare' },
  { id: 'denali-moose', parkId: 'denali', name: 'Moose', description: "Browses willow thickets throughout the park's valleys.", rarity: 'Uncommon' },
  { id: 'denali-caribou', parkId: 'denali', name: 'Caribou', description: 'Migrates in large herds across the tundra.', rarity: 'Uncommon' },
  { id: 'denali-gray-wolf', parkId: 'denali', name: 'Gray Wolf', description: 'Present in remote packs throughout the wilderness.', rarity: 'Rare' },
  { id: 'denali-dall-sheep', parkId: 'denali', name: 'Dall Sheep', description: 'Navigates the steep slopes of the Alaska Range.', rarity: 'Uncommon' },

  // --- Katmai ---
  { id: 'katmai-brown-bear', parkId: 'katmai', name: 'Brown Bear', description: 'Famous for fishing sockeye salmon at Brooks Falls.', rarity: 'Common' },
  { id: 'katmai-bald-eagle', parkId: 'katmai', name: 'Bald Eagle', description: "Gathers along salmon streams alongside the park's famous bears.", rarity: 'Uncommon' },
  { id: 'katmai-moose', parkId: 'katmai', name: 'Moose', description: "Found in the park's lowland willow and birch forests.", rarity: 'Uncommon' },
  { id: 'katmai-red-fox', parkId: 'katmai', name: 'Red Fox', description: 'Often seen scavenging near Brooks Camp.', rarity: 'Uncommon' },
  { id: 'katmai-sockeye-salmon', parkId: 'katmai', name: 'Sockeye Salmon', description: "Massive summer runs draw the park's famous bear population.", rarity: 'Common' },

  // --- Kenai Fjords ---
  { id: 'kenai-fjords-humpback-whale', parkId: 'kenai-fjords', name: 'Humpback Whale', description: "Feeds in the park's fjords each summer.", rarity: 'Uncommon' },
  { id: 'kenai-fjords-orca', parkId: 'kenai-fjords', name: 'Orca', description: 'Pods hunt in the deep coastal waters.', rarity: 'Rare' },
  { id: 'kenai-fjords-sea-lion', parkId: 'kenai-fjords', name: 'Steller Sea Lion', description: 'Hauls out on rocky islands near the fjords.', rarity: 'Uncommon' },
  { id: 'kenai-fjords-mountain-goat', parkId: 'kenai-fjords', name: 'Mountain Goat', description: 'Navigates steep cliffs above the coastline.', rarity: 'Uncommon' },
  { id: 'kenai-fjords-puffin', parkId: 'kenai-fjords', name: 'Horned Puffin', description: "Nests on cliffside colonies throughout the park's coast.", rarity: 'Common' },

  // --- Kobuk Valley ---
  { id: 'kobuk-valley-caribou', parkId: 'kobuk-valley', name: 'Caribou', description: 'Massive herds cross the Kobuk River each fall migration.', rarity: 'Common' },
  { id: 'kobuk-valley-grizzly', parkId: 'kobuk-valley', name: 'Grizzly Bear', description: "Roams the valley's tundra and riverbanks.", rarity: 'Rare' },
  { id: 'kobuk-valley-moose', parkId: 'kobuk-valley', name: 'Moose', description: "Found in the park's boreal forest lowlands.", rarity: 'Uncommon' },
  { id: 'kobuk-valley-gray-wolf', parkId: 'kobuk-valley', name: 'Gray Wolf', description: 'Present throughout the remote river valley.', rarity: 'Rare' },
  { id: 'kobuk-valley-arctic-grayling', parkId: 'kobuk-valley', name: 'Arctic Grayling', description: "Common game fish in the park's clear rivers.", rarity: 'Common' },

  // --- Lake Clark ---
  { id: 'lake-clark-brown-bear', parkId: 'lake-clark', name: 'Brown Bear', description: "Famous for fishing along Silver Salmon Creek's tidal flats.", rarity: 'Common' },
  { id: 'lake-clark-moose', parkId: 'lake-clark', name: 'Moose', description: "Browses the park's lowland forests and wetlands.", rarity: 'Uncommon' },
  { id: 'lake-clark-bald-eagle', parkId: 'lake-clark', name: 'Bald Eagle', description: "Nests along the park's lakeshores and rivers.", rarity: 'Common' },
  { id: 'lake-clark-dall-sheep', parkId: 'lake-clark', name: 'Dall Sheep', description: "Found on the park's rugged Chigmit Mountains.", rarity: 'Uncommon' },
  { id: 'lake-clark-beluga-whale', parkId: 'lake-clark', name: 'Beluga Whale', description: 'Occasionally seen in nearby Cook Inlet waters.', rarity: 'Rare' },

  // --- Wrangell–St. Elias ---
  { id: 'wrangell-st-elias-dall-sheep', parkId: 'wrangell-st-elias', name: 'Dall Sheep', description: "Navigates the park's dramatic mountain terrain.", rarity: 'Uncommon' },
  { id: 'wrangell-st-elias-grizzly', parkId: 'wrangell-st-elias', name: 'Grizzly Bear', description: 'Roams the largest wilderness park in the U.S.', rarity: 'Rare' },
  { id: 'wrangell-st-elias-caribou', parkId: 'wrangell-st-elias', name: 'Caribou', description: "Migrates across the park's vast tundra and valleys.", rarity: 'Uncommon' },
  { id: 'wrangell-st-elias-mountain-goat', parkId: 'wrangell-st-elias', name: 'Mountain Goat', description: 'Found on the steep slopes near Kennecott.', rarity: 'Uncommon' },
  { id: 'wrangell-st-elias-bald-eagle', parkId: 'wrangell-st-elias', name: 'Bald Eagle', description: "Nests along the park's glacial rivers.", rarity: 'Common' },

  // --- Gates of the Arctic ---
  { id: 'gates-arctic-caribou', parkId: 'gates-arctic', name: 'Caribou', description: "The Western Arctic Herd migrates through the park's vast wilderness.", rarity: 'Common' },
  { id: 'gates-arctic-grizzly', parkId: 'gates-arctic', name: 'Grizzly Bear', description: 'Roams the remote Brooks Range tundra.', rarity: 'Rare' },
  { id: 'gates-arctic-dall-sheep', parkId: 'gates-arctic', name: 'Dall Sheep', description: "Found throughout the park's rugged mountain terrain.", rarity: 'Uncommon' },
  { id: 'gates-arctic-gray-wolf', parkId: 'gates-arctic', name: 'Gray Wolf', description: 'Present in some of the last truly wild wolf packs in North America.', rarity: 'Rare' },
  { id: 'gates-arctic-ground-squirrel', parkId: 'gates-arctic', name: 'Arctic Ground Squirrel', description: "Common on tundra slopes throughout the park.", rarity: 'Common' },
];
