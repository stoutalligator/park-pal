import { Trail } from '@/types';

export const ALL_TRAILS: Trail[] = [
  // --- Yellowstone ---
  { id: 'yellowstone-old-faithful', parkId: 'yellowstone', name: 'Old Faithful Loop', description: 'Boardwalk loop past the park\'s most famous geyser and surrounding thermal features.', miles: 1.5, elevationGainFt: 50, difficulty: 'Easy' },
  { id: 'yellowstone-fairy-falls', parkId: 'yellowstone', name: 'Fairy Falls', description: 'Flat trail to a 200-foot waterfall, with an overlook of Grand Prismatic Spring along the way.', miles: 5.4, elevationGainFt: 200, difficulty: 'Moderate' },
  { id: 'yellowstone-mount-washburn', parkId: 'yellowstone', name: 'Mount Washburn', description: 'Steady climb to a fire lookout with panoramic views of the entire park.', miles: 6.2, elevationGainFt: 1400, difficulty: 'Hard' },
  { id: 'yellowstone-lamar-valley', parkId: 'yellowstone', name: 'Lamar Valley Trail', description: 'Rolling grassland trail through prime wolf and bison territory.', miles: 4.0, elevationGainFt: 300, difficulty: 'Moderate' },
  { id: 'yellowstone-uncle-toms', parkId: 'yellowstone', name: "Uncle Tom's Trail", description: 'Steep staircase descent to a dramatic view of the Lower Falls of the Yellowstone River.', miles: 0.6, elevationGainFt: 500, difficulty: 'Hard' },

  // --- Zion ---
  { id: 'zion-narrows', parkId: 'zion', name: 'The Narrows', description: 'Wade through the Virgin River between towering slot canyon walls.', miles: 9.4, elevationGainFt: 334, difficulty: 'Hard' },
  { id: 'zion-angels-landing', parkId: 'zion', name: "Angels Landing", description: 'Exposed chain-assisted climb to a narrow summit with sweeping canyon views.', miles: 5.4, elevationGainFt: 1488, difficulty: 'Hard' },
  { id: 'zion-emerald-pools', parkId: 'zion', name: 'Emerald Pools', description: 'Family-friendly trail past a series of pools and waterfalls.', miles: 3.0, elevationGainFt: 350, difficulty: 'Easy' },
  { id: 'zion-riverside-walk', parkId: 'zion', name: 'Riverside Walk', description: 'Paved, flat path along the Virgin River to the mouth of The Narrows.', miles: 2.2, elevationGainFt: 57, difficulty: 'Easy' },
  { id: 'zion-canyon-overlook', parkId: 'zion', name: 'Canyon Overlook', description: 'Short but rewarding hike to a cliffside view of lower Zion Canyon.', miles: 1.0, elevationGainFt: 163, difficulty: 'Moderate' },

  // --- Rocky Mountain ---
  { id: 'rocky-mountain-dream-lake', parkId: 'rocky-mountain', name: 'Dream Lake', description: 'Popular trail to a glassy alpine lake framed by Hallett Peak.', miles: 2.2, elevationGainFt: 425, difficulty: 'Moderate' },
  { id: 'rocky-mountain-sky-pond', parkId: 'rocky-mountain', name: 'Sky Pond', description: 'Waterfalls, granite scrambles, and a stunning alpine tarn at trail\'s end.', miles: 9.0, elevationGainFt: 1780, difficulty: 'Hard' },
  { id: 'rocky-mountain-bear-lake', parkId: 'rocky-mountain', name: 'Bear Lake Loop', description: 'Easy, mostly flat loop around a scenic subalpine lake.', miles: 0.8, elevationGainFt: 43, difficulty: 'Easy' },
  { id: 'rocky-mountain-longs-peak', parkId: 'rocky-mountain', name: 'Longs Peak Keyhole Route', description: 'Strenuous full-day climb to the summit of the park\'s tallest peak.', miles: 14.5, elevationGainFt: 5100, difficulty: 'Hard' },
  { id: 'rocky-mountain-alberta-falls', parkId: 'rocky-mountain', name: 'Alberta Falls', description: 'Short, well-graded hike to a lively cascading waterfall.', miles: 1.6, elevationGainFt: 230, difficulty: 'Easy' },

  // --- Yosemite ---
  { id: 'yosemite-mist-trail', parkId: 'yosemite', name: 'Mist Trail to Vernal Fall', description: 'Granite-stepped trail that climbs alongside a thundering waterfall.', miles: 3.0, elevationGainFt: 1000, difficulty: 'Moderate' },
  { id: 'yosemite-half-dome', parkId: 'yosemite', name: 'Half Dome', description: 'Iconic, permit-only cable-assisted climb to the summit of Half Dome.', miles: 14.2, elevationGainFt: 4800, difficulty: 'Hard' },
  { id: 'yosemite-lower-falls', parkId: 'yosemite', name: 'Lower Yosemite Fall', description: 'Flat, paved loop to the base of Lower Yosemite Fall.', miles: 1.0, elevationGainFt: 50, difficulty: 'Easy' },
  { id: 'yosemite-sentinel-dome', parkId: 'yosemite', name: 'Sentinel Dome', description: 'Short climb to a 360-degree summit view of the valley and high country.', miles: 2.2, elevationGainFt: 500, difficulty: 'Moderate' },
  { id: 'yosemite-taft-point', parkId: 'yosemite', name: 'Taft Point', description: 'Trail to dramatic cliff-edge fissures overlooking Yosemite Valley.', miles: 2.2, elevationGainFt: 300, difficulty: 'Moderate' },

  // --- Grand Canyon ---
  { id: 'grand-canyon-bright-angel', parkId: 'grand-canyon', name: 'Bright Angel Trail', description: 'Classic switchbacking descent below the rim, turn around anytime.', miles: 6.0, elevationGainFt: 3060, difficulty: 'Hard' },
  { id: 'grand-canyon-rim-trail', parkId: 'grand-canyon', name: 'Rim Trail', description: 'Mostly paved, mostly flat trail along the South Rim with endless viewpoints.', miles: 13.0, elevationGainFt: 200, difficulty: 'Easy' },
  { id: 'grand-canyon-south-kaibab', parkId: 'grand-canyon', name: 'South Kaibab to Ooh Aah Point', description: 'Steep but short ridge-line hike with immediate, huge canyon views.', miles: 1.8, elevationGainFt: 760, difficulty: 'Moderate' },
  { id: 'grand-canyon-hermit-trail', parkId: 'grand-canyon', name: 'Hermit Trail', description: 'Quieter, unmaintained trail below the rim with fewer crowds.', miles: 5.0, elevationGainFt: 1600, difficulty: 'Hard' },
  { id: 'grand-canyon-shoshone-point', parkId: 'grand-canyon', name: 'Shoshone Point', description: 'Easy, flat forest walk to a quiet, unfenced canyon overlook.', miles: 2.0, elevationGainFt: 100, difficulty: 'Easy' },

  // --- Grand Teton ---
  { id: 'grand-teton-jenny-lake', parkId: 'grand-teton', name: 'Jenny Lake Loop', description: 'Scenic loop around a glacial lake at the base of the Teton range.', miles: 7.1, elevationGainFt: 200, difficulty: 'Moderate' },
  { id: 'grand-teton-hidden-falls', parkId: 'grand-teton', name: 'Hidden Falls & Inspiration Point', description: 'Short climb from the Jenny Lake boat dock to a waterfall and overlook.', miles: 2.0, elevationGainFt: 550, difficulty: 'Moderate' },
  { id: 'grand-teton-taggart-lake', parkId: 'grand-teton', name: 'Taggart Lake', description: 'Gentle trail through a regrowth forest to a peaceful mountain lake.', miles: 3.0, elevationGainFt: 400, difficulty: 'Easy' },
  { id: 'grand-teton-cascade-canyon', parkId: 'grand-teton', name: 'Cascade Canyon', description: 'Dramatic glacial canyon hike with towering granite walls on both sides.', miles: 9.0, elevationGainFt: 1100, difficulty: 'Hard' },
  { id: 'grand-teton-string-lake', parkId: 'grand-teton', name: 'String Lake Loop', description: 'Flat, family-friendly loop around a shallow, warm mountain lake.', miles: 3.4, elevationGainFt: 150, difficulty: 'Easy' },

  // --- Acadia ---
  { id: 'acadia-precipice', parkId: 'acadia', name: 'Precipice Trail', description: 'Exposed iron-rung and ladder climb up a sheer cliff face.', miles: 2.1, elevationGainFt: 1000, difficulty: 'Hard' },
  { id: 'acadia-cadillac-mountain', parkId: 'acadia', name: 'Cadillac Mountain North Ridge', description: 'Granite ridge climb to the highest point on the U.S. Atlantic coast.', miles: 4.4, elevationGainFt: 1100, difficulty: 'Moderate' },
  { id: 'acadia-jordan-pond', parkId: 'acadia', name: 'Jordan Pond Path', description: 'Flat loop around a crystal-clear pond framed by "the Bubbles" peaks.', miles: 3.3, elevationGainFt: 100, difficulty: 'Easy' },
  { id: 'acadia-beehive', parkId: 'acadia', name: 'The Beehive', description: 'Short, thrilling climb with iron rungs and ladders above Sand Beach.', miles: 1.5, elevationGainFt: 450, difficulty: 'Hard' },
  { id: 'acadia-ocean-path', parkId: 'acadia', name: 'Ocean Path', description: 'Easy coastal walk past Thunder Hole and Otter Cliff.', miles: 4.4, elevationGainFt: 160, difficulty: 'Easy' },

  // --- Great Smoky Mountains ---
  { id: 'great-smoky-charlies-bunion', parkId: 'great-smoky', name: "Charlies Bunion", description: 'Ridge-line hike along the Appalachian Trail to a rocky overlook.', miles: 8.1, elevationGainFt: 1640, difficulty: 'Hard' },
  { id: 'great-smoky-laurel-falls', parkId: 'great-smoky', name: 'Laurel Falls', description: 'Paved, popular trail to one of the park\'s most accessible waterfalls.', miles: 2.6, elevationGainFt: 315, difficulty: 'Easy' },
  { id: 'great-smoky-clingmans-dome', parkId: 'great-smoky', name: 'Clingmans Dome', description: 'Steep paved path to an observation tower at the park\'s highest point.', miles: 1.0, elevationGainFt: 332, difficulty: 'Moderate' },
  { id: 'great-smoky-alum-cave', parkId: 'great-smoky', name: 'Alum Cave Trail', description: 'Trail past Arch Rock and a bluff overhang, popular route up Mount LeConte.', miles: 4.4, elevationGainFt: 1200, difficulty: 'Moderate' },
  { id: 'great-smoky-rainbow-falls', parkId: 'great-smoky', name: 'Rainbow Falls', description: 'Steady climb to the tallest single-drop waterfall in the park.', miles: 5.4, elevationGainFt: 1500, difficulty: 'Hard' },

  // --- Arches ---
  { id: 'arches-delicate-arch', parkId: 'arches', name: 'Delicate Arch', description: 'Exposed slickrock climb to the park\'s iconic freestanding arch.', miles: 3.0, elevationGainFt: 480, difficulty: 'Moderate' },
  { id: 'arches-devils-garden', parkId: 'arches', name: 'Devils Garden Loop', description: 'Longest trail in the park, passing eight arches including Landscape Arch.', miles: 7.2, elevationGainFt: 1100, difficulty: 'Hard' },
  { id: 'arches-windows', parkId: 'arches', name: 'The Windows', description: 'Short loop to a cluster of large arches, easy family hike.', miles: 1.0, elevationGainFt: 150, difficulty: 'Easy' },
  { id: 'arches-landscape-arch', parkId: 'arches', name: 'Landscape Arch', description: 'Flat, easy trail to one of the longest natural stone arches in the world.', miles: 1.6, elevationGainFt: 60, difficulty: 'Easy' },
  { id: 'arches-park-avenue', parkId: 'arches', name: 'Park Avenue', description: 'Dramatic walk between towering sandstone fins.', miles: 2.0, elevationGainFt: 320, difficulty: 'Moderate' },

  // --- Shenandoah ---
  { id: 'shenandoah-old-rag', parkId: 'shenandoah', name: 'Old Rag Mountain', description: 'Strenuous rock scramble loop to one of the park\'s most famous summits.', miles: 9.4, elevationGainFt: 2415, difficulty: 'Hard' },
  { id: 'shenandoah-dark-hollow-falls', parkId: 'shenandoah', name: 'Dark Hollow Falls', description: 'The shortest route in the park to a cascading waterfall.', miles: 1.4, elevationGainFt: 440, difficulty: 'Moderate' },
  { id: 'shenandoah-hawksbill', parkId: 'shenandoah', name: 'Hawksbill Summit', description: 'Climbs to the highest point in the park with panoramic Blue Ridge views.', miles: 2.9, elevationGainFt: 850, difficulty: 'Moderate' },
  { id: 'shenandoah-whiteoak-canyon', parkId: 'shenandoah', name: 'Whiteoak Canyon', description: 'Passes a series of six cascading waterfalls along a rocky creek.', miles: 4.6, elevationGainFt: 1040, difficulty: 'Hard' },
  { id: 'shenandoah-stony-man', parkId: 'shenandoah', name: 'Stony Man', description: 'Short, easy summit walk near Skyline Drive with sweeping valley views.', miles: 1.6, elevationGainFt: 340, difficulty: 'Easy' },

  // --- New River Gorge ---
  { id: 'new-river-gorge-long-point', parkId: 'new-river-gorge', name: 'Long Point Trail', description: 'Leads to the iconic overlook of the New River Gorge Bridge.', miles: 3.2, elevationGainFt: 350, difficulty: 'Moderate' },
  { id: 'new-river-gorge-endless-wall', parkId: 'new-river-gorge', name: 'Endless Wall Trail', description: 'Cliffside trail with dramatic views down into the gorge.', miles: 2.4, elevationGainFt: 250, difficulty: 'Moderate' },
  { id: 'new-river-gorge-kaymoor', parkId: 'new-river-gorge', name: "Kaymoor Miner's Trail", description: 'Descends to the ruins of a historic coal mining operation.', miles: 2.0, elevationGainFt: 900, difficulty: 'Hard' },
  { id: 'new-river-gorge-grandview-rim', parkId: 'new-river-gorge', name: 'Grandview Rim Trail', description: 'Rim walk with sweeping views of the river\'s horseshoe bend.', miles: 3.2, elevationGainFt: 400, difficulty: 'Moderate' },
  { id: 'new-river-gorge-castle-rock', parkId: 'new-river-gorge', name: 'Castle Rock Trail', description: 'Short loop past striking sandstone boulders.', miles: 1.0, elevationGainFt: 150, difficulty: 'Easy' },

  // --- Biscayne ---
  { id: 'biscayne-spite-highway', parkId: 'biscayne', name: 'Spite Highway Trail', description: 'Overgrown old road on Elliott Key turned quiet hiking path.', miles: 7.0, elevationGainFt: 20, difficulty: 'Easy' },
  { id: 'biscayne-jetty', parkId: 'biscayne', name: 'Jetty Trail', description: 'Paved walk from the visitor center out to a rocky jetty overlooking the bay.', miles: 0.5, elevationGainFt: 10, difficulty: 'Easy' },
  { id: 'biscayne-convoy-point', parkId: 'biscayne', name: 'Convoy Point Boardwalk', description: 'Short boardwalk over mangroves near the visitor center.', miles: 0.3, elevationGainFt: 5, difficulty: 'Easy' },
  { id: 'biscayne-boca-chita', parkId: 'biscayne', name: 'Boca Chita Key Loop', description: 'Island loop past the park\'s historic ornamental lighthouse.', miles: 1.0, elevationGainFt: 10, difficulty: 'Easy' },
  { id: 'biscayne-adams-key', parkId: 'biscayne', name: 'Adams Key Trail', description: 'Quiet nature path on a former private resort island.', miles: 0.5, elevationGainFt: 5, difficulty: 'Easy' },

  // --- Dry Tortugas ---
  { id: 'dry-tortugas-fort-jefferson', parkId: 'dry-tortugas', name: 'Fort Jefferson Perimeter Walk', description: 'Circles the walls of the massive 19th-century coastal fort.', miles: 0.7, elevationGainFt: 5, difficulty: 'Easy' },
  { id: 'dry-tortugas-garden-key', parkId: 'dry-tortugas', name: 'Garden Key Nature Trail', description: 'Short loop through coastal vegetation surrounding the fort.', miles: 0.5, elevationGainFt: 5, difficulty: 'Easy' },
  { id: 'dry-tortugas-moat-wall', parkId: 'dry-tortugas', name: 'Moat Wall Walk', description: 'Walk atop the fort\'s outer moat wall with open ocean views.', miles: 0.5, elevationGainFt: 10, difficulty: 'Easy' },
  { id: 'dry-tortugas-coaling-dock', parkId: 'dry-tortugas', name: 'North Coaling Dock Trail', description: 'Short path to the ruins of an old coaling dock.', miles: 0.4, elevationGainFt: 5, difficulty: 'Easy' },
  { id: 'dry-tortugas-bush-key', parkId: 'dry-tortugas', name: 'Bush Key Sandbar Walk', description: 'Seasonal walk across a sandbar connecting to Bush Key.', miles: 1.0, elevationGainFt: 5, difficulty: 'Easy' },

  // --- Everglades ---
  { id: 'everglades-anhinga', parkId: 'everglades', name: 'Anhinga Trail', description: 'Boardwalk loop teeming with alligators and wading birds.', miles: 0.8, elevationGainFt: 5, difficulty: 'Easy' },
  { id: 'everglades-shark-valley', parkId: 'everglades', name: 'Shark Valley Loop', description: 'Paved loop to an observation tower overlooking the sawgrass prairie.', miles: 15.0, elevationGainFt: 10, difficulty: 'Moderate' },
  { id: 'everglades-pa-hay-okee', parkId: 'everglades', name: 'Pa-hay-okee Overlook', description: 'Boardwalk to a sweeping view of the River of Grass.', miles: 0.2, elevationGainFt: 5, difficulty: 'Easy' },
  { id: 'everglades-gumbo-limbo', parkId: 'everglades', name: 'Gumbo Limbo Trail', description: 'Shaded loop through a dense hardwood hammock.', miles: 0.4, elevationGainFt: 5, difficulty: 'Easy' },
  { id: 'everglades-west-lake', parkId: 'everglades', name: 'West Lake Trail', description: 'Boardwalk winding through a mangrove forest.', miles: 0.5, elevationGainFt: 5, difficulty: 'Easy' },

  // --- Congaree ---
  { id: 'congaree-boardwalk-loop', parkId: 'congaree', name: 'Boardwalk Loop Trail', description: 'Elevated boardwalk through old-growth bottomland forest.', miles: 2.4, elevationGainFt: 5, difficulty: 'Easy' },
  { id: 'congaree-weston-lake', parkId: 'congaree', name: 'Weston Lake Loop', description: 'Loop past a quiet oxbow lake beneath towering trees.', miles: 4.6, elevationGainFt: 20, difficulty: 'Moderate' },
  { id: 'congaree-oakridge', parkId: 'congaree', name: 'Oakridge Trail', description: 'Quiet backcountry loop through mixed hardwood forest.', miles: 6.6, elevationGainFt: 30, difficulty: 'Moderate' },
  { id: 'congaree-river-trail', parkId: 'congaree', name: 'River Trail', description: 'Follows the Congaree River through floodplain forest.', miles: 10.0, elevationGainFt: 20, difficulty: 'Hard' },
  { id: 'congaree-kingsnake', parkId: 'congaree', name: 'Kingsnake Trail', description: 'Connector trail passing cypress sloughs and floodplain forest.', miles: 4.9, elevationGainFt: 20, difficulty: 'Moderate' },

  // --- Mammoth Cave ---
  { id: 'mammoth-cave-green-river-bluffs', parkId: 'mammoth-cave', name: 'Green River Bluffs Trail', description: 'Rolling forest trail high above the Green River.', miles: 5.9, elevationGainFt: 400, difficulty: 'Moderate' },
  { id: 'mammoth-cave-cedar-sink', parkId: 'mammoth-cave', name: 'Cedar Sink Trail', description: 'Descends into a dramatic collapsed sinkhole.', miles: 1.7, elevationGainFt: 300, difficulty: 'Moderate' },
  { id: 'mammoth-cave-sand-cave', parkId: 'mammoth-cave', name: 'Sand Cave Trail', description: 'Short walk to a shallow rock shelter cave.', miles: 0.2, elevationGainFt: 40, difficulty: 'Easy' },
  { id: 'mammoth-cave-echo-river-spring', parkId: 'mammoth-cave', name: 'Echo River Spring Trail', description: 'Riverside walk to a spring where the cave system meets the surface.', miles: 1.0, elevationGainFt: 100, difficulty: 'Easy' },
  { id: 'mammoth-cave-heritage', parkId: 'mammoth-cave', name: 'Heritage Trail', description: 'Interpretive loop near the historic cave entrance.', miles: 0.75, elevationGainFt: 100, difficulty: 'Easy' },

  // --- Virgin Islands ---
  { id: 'virgin-islands-reef-bay', parkId: 'virgin-islands', name: 'Reef Bay Trail', description: 'Descends through tropical forest past ancient petroglyphs to a beach.', miles: 2.2, elevationGainFt: 900, difficulty: 'Moderate' },
  { id: 'virgin-islands-ram-head', parkId: 'virgin-islands', name: 'Ram Head Trail', description: 'Coastal walk to a dramatic overlook at the island\'s southern tip.', miles: 2.0, elevationGainFt: 200, difficulty: 'Moderate' },
  { id: 'virgin-islands-annaberg', parkId: 'virgin-islands', name: 'Annaberg Sugar Plantation Loop', description: 'Short loop past the ruins of a historic sugar mill.', miles: 0.3, elevationGainFt: 20, difficulty: 'Easy' },
  { id: 'virgin-islands-lind-point', parkId: 'virgin-islands', name: 'Lind Point Trail', description: 'Forest trail connecting to a secluded snorkeling beach.', miles: 1.1, elevationGainFt: 250, difficulty: 'Easy' },
  { id: 'virgin-islands-caneel-hill', parkId: 'virgin-islands', name: 'Caneel Hill Trail', description: 'Climbs to the highest point near Cruz Bay.', miles: 2.2, elevationGainFt: 719, difficulty: 'Moderate' },

  // --- Cuyahoga Valley ---
  { id: 'cuyahoga-valley-brandywine-gorge', parkId: 'cuyahoga-valley', name: 'Brandywine Gorge Trail', description: 'Loop past the park\'s tallest waterfall.', miles: 1.4, elevationGainFt: 220, difficulty: 'Moderate' },
  { id: 'cuyahoga-valley-ledges', parkId: 'cuyahoga-valley', name: 'Ledges Trail', description: 'Winds beneath towering sandstone cliffs and overlooks.', miles: 2.2, elevationGainFt: 180, difficulty: 'Easy' },
  { id: 'cuyahoga-valley-towpath', parkId: 'cuyahoga-valley', name: 'Towpath Trail', description: 'Flat historic canal towpath running alongside the Cuyahoga River.', miles: 20.5, elevationGainFt: 100, difficulty: 'Easy' },
  { id: 'cuyahoga-valley-blue-hen-falls', parkId: 'cuyahoga-valley', name: 'Blue Hen Falls Trail', description: 'Short forest walk to a secluded waterfall.', miles: 1.6, elevationGainFt: 250, difficulty: 'Easy' },
  { id: 'cuyahoga-valley-buckeye-loop', parkId: 'cuyahoga-valley', name: 'Buckeye Trail Loop', description: 'Rolling forest and meadow loop near Boston Mills.', miles: 5.0, elevationGainFt: 500, difficulty: 'Moderate' },

  // --- Indiana Dunes ---
  { id: 'indiana-dunes-mount-baldy', parkId: 'indiana-dunes', name: 'Mount Baldy Trail', description: 'Climbs a massive, slowly shifting live sand dune.', miles: 1.5, elevationGainFt: 130, difficulty: 'Moderate' },
  { id: 'indiana-dunes-west-beach', parkId: 'indiana-dunes', name: 'West Beach Dune Succession Trail', description: 'Loop illustrating the stages of dune ecology.', miles: 1.7, elevationGainFt: 200, difficulty: 'Moderate' },
  { id: 'indiana-dunes-cowles-bog', parkId: 'indiana-dunes', name: 'Cowles Bog Trail', description: 'Passes through wetlands and forest en route to Lake Michigan.', miles: 4.7, elevationGainFt: 200, difficulty: 'Moderate' },
  { id: 'indiana-dunes-great-marsh', parkId: 'indiana-dunes', name: 'Great Marsh Trail', description: 'Flat boardwalk through a restored wetland.', miles: 1.2, elevationGainFt: 5, difficulty: 'Easy' },
  { id: 'indiana-dunes-dune-ridge', parkId: 'indiana-dunes', name: 'Dune Ridge Trail', description: 'Short loop through oak savanna and dune ridges.', miles: 0.8, elevationGainFt: 100, difficulty: 'Easy' },

  // --- Isle Royale ---
  { id: 'isle-royale-greenstone-ridge', parkId: 'isle-royale', name: 'Greenstone Ridge Trail', description: 'Rugged spine trail crossing the length of the island.', miles: 40.0, elevationGainFt: 3000, difficulty: 'Hard' },
  { id: 'isle-royale-stoll', parkId: 'isle-royale', name: 'Stoll Trail', description: 'Coastal loop near Rock Harbor past historic mine pits.', miles: 4.2, elevationGainFt: 200, difficulty: 'Moderate' },
  { id: 'isle-royale-scoville-point', parkId: 'isle-royale', name: 'Scoville Point Trail', description: 'Rocky peninsula walk with wide lake views.', miles: 4.2, elevationGainFt: 150, difficulty: 'Moderate' },
  { id: 'isle-royale-lookout-louise', parkId: 'isle-royale', name: 'Lookout Louise Trail', description: 'Short climb to a sweeping view of the Canadian shoreline.', miles: 4.0, elevationGainFt: 400, difficulty: 'Moderate' },
  { id: 'isle-royale-windigo-nature', parkId: 'isle-royale', name: 'Windigo Nature Trail', description: 'Easy loop near the island\'s western entrance.', miles: 1.2, elevationGainFt: 100, difficulty: 'Easy' },

  // --- Voyageurs ---
  { id: 'voyageurs-oberholtzer', parkId: 'voyageurs', name: 'Oberholtzer Trail', description: 'Boardwalk and forest loop near Rainy Lake.', miles: 2.2, elevationGainFt: 100, difficulty: 'Easy' },
  { id: 'voyageurs-blind-ash-bay', parkId: 'voyageurs', name: 'Blind Ash Bay Trail', description: 'Forest walk along the Kabetogama Peninsula shoreline.', miles: 2.5, elevationGainFt: 150, difficulty: 'Easy' },
  { id: 'voyageurs-cruiser-lake', parkId: 'voyageurs', name: 'Cruiser Lake Trail', description: 'Backcountry trail linking several interior lakes.', miles: 9.5, elevationGainFt: 400, difficulty: 'Moderate' },
  { id: 'voyageurs-kab-ash', parkId: 'voyageurs', name: 'Kab-Ash Trail', description: 'Long forest route connecting Kabetogama and Ash River.', miles: 14.5, elevationGainFt: 500, difficulty: 'Moderate' },
  { id: 'voyageurs-locator-lake', parkId: 'voyageurs', name: 'Locator Lake Trail', description: 'Short trail to a canoe put-in on a secluded lake.', miles: 2.0, elevationGainFt: 150, difficulty: 'Easy' },

  // --- Wind Cave ---
  { id: 'wind-cave-rankin-ridge', parkId: 'wind-cave', name: 'Rankin Ridge Trail', description: 'Loop to a fire lookout tower with wide prairie views.', miles: 1.0, elevationGainFt: 220, difficulty: 'Moderate' },
  { id: 'wind-cave-centennial', parkId: 'wind-cave', name: 'Centennial Trail Segment', description: 'Rolling trail through mixed-grass prairie.', miles: 5.0, elevationGainFt: 400, difficulty: 'Moderate' },
  { id: 'wind-cave-elk-mountain', parkId: 'wind-cave', name: 'Elk Mountain Trail', description: 'Loop through ponderosa pine near the campground.', miles: 1.0, elevationGainFt: 100, difficulty: 'Easy' },
  { id: 'wind-cave-lookout-point', parkId: 'wind-cave', name: 'Lookout Point Trail', description: 'Prairie walk connecting to the Centennial Trail.', miles: 3.2, elevationGainFt: 250, difficulty: 'Moderate' },
  { id: 'wind-cave-canyon', parkId: 'wind-cave', name: 'Wind Cave Canyon Trail', description: 'Flat trail along a dry limestone canyon.', miles: 3.6, elevationGainFt: 100, difficulty: 'Easy' },

  // --- Badlands ---
  { id: 'badlands-notch', parkId: 'badlands', name: 'Notch Trail', description: 'Ladder climb through a canyon to a dramatic overlook.', miles: 1.5, elevationGainFt: 300, difficulty: 'Moderate' },
  { id: 'badlands-door', parkId: 'badlands', name: 'Door Trail', description: 'Boardwalk and rugged path into an eroded badlands opening.', miles: 0.75, elevationGainFt: 100, difficulty: 'Easy' },
  { id: 'badlands-castle', parkId: 'badlands', name: 'Castle Trail', description: 'Longest trail in the park, crossing open badlands formations.', miles: 10.0, elevationGainFt: 400, difficulty: 'Moderate' },
  { id: 'badlands-saddle-pass', parkId: 'badlands', name: 'Saddle Pass Trail', description: 'Steep, short connector climbing through the badlands wall.', miles: 0.25, elevationGainFt: 200, difficulty: 'Hard' },
  { id: 'badlands-fossil-exhibit', parkId: 'badlands', name: 'Fossil Exhibit Trail', description: 'Flat boardwalk loop past replicas of ancient fossils.', miles: 0.25, elevationGainFt: 5, difficulty: 'Easy' },

  // --- Theodore Roosevelt ---
  { id: 'theodore-roosevelt-wind-canyon', parkId: 'theodore-roosevelt', name: 'Wind Canyon Trail', description: 'Short walk to an overlook above the Little Missouri River.', miles: 0.4, elevationGainFt: 100, difficulty: 'Easy' },
  { id: 'theodore-roosevelt-petrified-forest', parkId: 'theodore-roosevelt', name: 'Petrified Forest Loop', description: 'Remote trail past scattered petrified tree stumps.', miles: 10.0, elevationGainFt: 400, difficulty: 'Moderate' },
  { id: 'theodore-roosevelt-buck-hill', parkId: 'theodore-roosevelt', name: 'Buck Hill Trail', description: 'Short climb to one of the highest points in the park.', miles: 0.2, elevationGainFt: 100, difficulty: 'Easy' },
  { id: 'theodore-roosevelt-caprock-coulee', parkId: 'theodore-roosevelt', name: 'Caprock Coulee Trail', description: 'Loop through badlands formations and coulees.', miles: 4.3, elevationGainFt: 400, difficulty: 'Moderate' },
  { id: 'theodore-roosevelt-painted-canyon', parkId: 'theodore-roosevelt', name: 'Painted Canyon Nature Trail', description: 'Short loop below the visitor center overlook.', miles: 0.9, elevationGainFt: 100, difficulty: 'Easy' },

  // --- Big Bend ---
  { id: 'big-bend-window', parkId: 'big-bend', name: 'Window Trail', description: 'Descends through desert scrub to a pour-off framing distant peaks.', miles: 5.3, elevationGainFt: 800, difficulty: 'Moderate' },
  { id: 'big-bend-south-rim', parkId: 'big-bend', name: 'South Rim Trail', description: 'Strenuous loop with sweeping views into Mexico.', miles: 12.6, elevationGainFt: 2000, difficulty: 'Hard' },
  { id: 'big-bend-santa-elena', parkId: 'big-bend', name: 'Santa Elena Canyon Trail', description: 'Short trail into a towering limestone canyon along the Rio Grande.', miles: 1.7, elevationGainFt: 250, difficulty: 'Easy' },
  { id: 'big-bend-lost-mine', parkId: 'big-bend', name: 'Lost Mine Trail', description: 'Climbs through pine-oak woodland to a Chisos Mountains overlook.', miles: 4.8, elevationGainFt: 1100, difficulty: 'Moderate' },
  { id: 'big-bend-hot-springs-historic', parkId: 'big-bend', name: 'Hot Springs Historic Trail', description: 'Easy riverside walk past historic hot spring ruins.', miles: 1.0, elevationGainFt: 50, difficulty: 'Easy' },

  // --- Guadalupe Mountains ---
  { id: 'guadalupe-mountains-peak', parkId: 'guadalupe-mountains', name: 'Guadalupe Peak Trail', description: 'Strenuous climb to the highest point in Texas.', miles: 8.4, elevationGainFt: 3000, difficulty: 'Hard' },
  { id: 'guadalupe-mountains-devils-hall', parkId: 'guadalupe-mountains', name: "Devil's Hall Trail", description: 'Scrambles up a natural rock stairway in a narrow canyon.', miles: 4.2, elevationGainFt: 600, difficulty: 'Moderate' },
  { id: 'guadalupe-mountains-mckittrick', parkId: 'guadalupe-mountains', name: 'McKittrick Canyon Trail', description: 'Famous for vivid fall foliage tucked among desert peaks.', miles: 4.8, elevationGainFt: 500, difficulty: 'Moderate' },
  { id: 'guadalupe-mountains-smith-spring', parkId: 'guadalupe-mountains', name: 'Smith Spring Trail', description: 'Short loop to a rare desert spring oasis.', miles: 2.3, elevationGainFt: 400, difficulty: 'Easy' },
  { id: 'guadalupe-mountains-el-capitan', parkId: 'guadalupe-mountains', name: 'El Capitan Trail', description: 'Long desert trail beneath the park\'s iconic cliff face.', miles: 11.3, elevationGainFt: 700, difficulty: 'Hard' },

  // --- Hot Springs ---
  { id: 'hot-springs-mountain', parkId: 'hot-springs', name: 'Hot Springs Mountain Trail', description: 'Forested loop to a historic observation tower.', miles: 1.7, elevationGainFt: 400, difficulty: 'Moderate' },
  { id: 'hot-springs-sunset', parkId: 'hot-springs', name: 'Sunset Trail', description: 'Longest trail in the park, crossing multiple Ouachita ridgelines.', miles: 10.6, elevationGainFt: 1200, difficulty: 'Hard' },
  { id: 'hot-springs-gulpha-gorge', parkId: 'hot-springs', name: 'Gulpha Gorge Trail', description: 'Creekside walk near the park\'s campground.', miles: 3.0, elevationGainFt: 300, difficulty: 'Moderate' },
  { id: 'hot-springs-dogwood', parkId: 'hot-springs', name: 'Dogwood Trail', description: 'Short, wildflower-lined loop through hardwood forest.', miles: 2.5, elevationGainFt: 250, difficulty: 'Easy' },
  { id: 'hot-springs-peak', parkId: 'hot-springs', name: 'Peak Trail', description: 'Connects downtown Hot Springs to the mountain summit.', miles: 1.5, elevationGainFt: 500, difficulty: 'Moderate' },


  // --- Gateway Arch ---
  { id: 'gateway-arch-riverfront', parkId: 'gateway-arch', name: 'Riverfront Trail', description: 'Paved path along the Mississippi riverfront beneath the arch.', miles: 2.0, elevationGainFt: 20, difficulty: 'Easy' },
  { id: 'gateway-arch-kiener-plaza', parkId: 'gateway-arch', name: 'Kiener Plaza Walk', description: 'Short walk connecting the arch grounds to downtown St. Louis.', miles: 0.5, elevationGainFt: 5, difficulty: 'Easy' },
  { id: 'gateway-arch-grounds-loop', parkId: 'gateway-arch', name: 'Arch Grounds Loop', description: 'Loop trail circling the base of the Gateway Arch.', miles: 1.0, elevationGainFt: 10, difficulty: 'Easy' },
  { id: 'gateway-arch-luther-ely-smith', parkId: 'gateway-arch', name: 'Luther Ely Smith Square Path', description: 'Landscaped path linking the Old Courthouse to the arch.', miles: 0.4, elevationGainFt: 5, difficulty: 'Easy' },
  { id: 'gateway-arch-eads-bridge', parkId: 'gateway-arch', name: 'Eads Bridge Riverwalk', description: 'Riverfront walk to the historic Eads Bridge.', miles: 1.5, elevationGainFt: 10, difficulty: 'Easy' },

  // --- Black Canyon of the Gunnison ---
  { id: 'black-canyon-warner-point', parkId: 'black-canyon', name: 'Warner Point Nature Trail', description: 'Rim loop overlooking the deepest, narrowest section of the canyon.', miles: 1.5, elevationGainFt: 200, difficulty: 'Easy' },
  { id: 'black-canyon-oak-flat', parkId: 'black-canyon', name: 'Oak Flat Loop Trail', description: 'Below-rim trail through Gambel oak forest.', miles: 2.0, elevationGainFt: 400, difficulty: 'Moderate' },
  { id: 'black-canyon-chasm-view', parkId: 'black-canyon', name: 'Chasm View Nature Trail', description: 'Short walk to the canyon\'s narrowest overlook.', miles: 0.3, elevationGainFt: 50, difficulty: 'Easy' },
  { id: 'black-canyon-uplands', parkId: 'black-canyon', name: 'Uplands Trail', description: 'Rolling trail through pinyon-juniper along the North Rim.', miles: 4.5, elevationGainFt: 350, difficulty: 'Moderate' },
  { id: 'black-canyon-gunnison-route', parkId: 'black-canyon', name: 'Gunnison Route', description: 'Steep, unmaintained scramble to the canyon floor.', miles: 1.5, elevationGainFt: 1800, difficulty: 'Hard' },

  // --- Great Sand Dunes ---
  { id: 'great-sand-dunes-high-dune', parkId: 'great-sand-dunes', name: 'High Dune Trail', description: 'Strenuous climb up shifting sand to a panoramic summit.', miles: 2.5, elevationGainFt: 650, difficulty: 'Hard' },
  { id: 'great-sand-dunes-star-dune', parkId: 'great-sand-dunes', name: 'Star Dune Trail', description: 'Longest dune hike, reaching the tallest dune in North America.', miles: 6.0, elevationGainFt: 750, difficulty: 'Hard' },
  { id: 'great-sand-dunes-mosca-pass', parkId: 'great-sand-dunes', name: 'Mosca Pass Trail', description: 'Forested trail climbing from the dunefield into the mountains.', miles: 3.5, elevationGainFt: 1400, difficulty: 'Moderate' },
  { id: 'great-sand-dunes-montville', parkId: 'great-sand-dunes', name: 'Montville Nature Trail', description: 'Short interpretive loop near the visitor center.', miles: 0.5, elevationGainFt: 100, difficulty: 'Easy' },
  { id: 'great-sand-dunes-medano-lake', parkId: 'great-sand-dunes', name: 'Medano Lake Trail', description: 'Alpine trail to a lake beneath the Sangre de Cristo peaks.', miles: 6.0, elevationGainFt: 2000, difficulty: 'Hard' },

  // --- Mesa Verde ---
  { id: 'mesa-verde-petroglyph-point', parkId: 'mesa-verde', name: 'Petroglyph Point Trail', description: 'Cliffside loop past ancient rock art.', miles: 2.4, elevationGainFt: 300, difficulty: 'Moderate' },
  { id: 'mesa-verde-cliff-palace', parkId: 'mesa-verde', name: 'Cliff Palace Trail', description: 'Ranger-guided descent to the largest cliff dwelling in North America.', miles: 0.25, elevationGainFt: 100, difficulty: 'Moderate' },
  { id: 'mesa-verde-balcony-house', parkId: 'mesa-verde', name: 'Balcony House Trail', description: 'Ladder-and-tunnel guided tour of a dramatic cliff dwelling.', miles: 0.6, elevationGainFt: 150, difficulty: 'Hard' },
  { id: 'mesa-verde-spruce-canyon', parkId: 'mesa-verde', name: 'Spruce Canyon Trail', description: 'Forested loop below the museum with canyon views.', miles: 2.4, elevationGainFt: 500, difficulty: 'Moderate' },
  { id: 'mesa-verde-point-lookout', parkId: 'mesa-verde', name: 'Point Lookout Trail', description: 'Climbs to a mesa-top overlook of the surrounding valley.', miles: 2.2, elevationGainFt: 425, difficulty: 'Moderate' },

  // --- Bryce Canyon ---
  { id: 'bryce-canyon-navajo-loop', parkId: 'bryce-canyon', name: 'Navajo Loop Trail', description: "Descends switchbacks past towering hoodoos including Thor's Hammer.", miles: 1.3, elevationGainFt: 550, difficulty: 'Moderate' },
  { id: 'bryce-canyon-queens-garden', parkId: 'bryce-canyon', name: "Queens Garden Trail", description: 'Gentlest below-rim trail, winding among red rock spires.', miles: 1.8, elevationGainFt: 320, difficulty: 'Moderate' },
  { id: 'bryce-canyon-fairyland-loop', parkId: 'bryce-canyon', name: 'Fairyland Loop', description: 'Long, less-crowded loop through a dramatic hoodoo amphitheater.', miles: 8.0, elevationGainFt: 1700, difficulty: 'Hard' },
  { id: 'bryce-canyon-rim-trail', parkId: 'bryce-canyon', name: 'Rim Trail', description: "Paved path connecting the park's main overlooks.", miles: 5.5, elevationGainFt: 350, difficulty: 'Easy' },
  { id: 'bryce-canyon-peekaboo-loop', parkId: 'bryce-canyon', name: 'Peekaboo Loop Trail', description: 'Below-rim loop through the "Wall of Windows" formation.', miles: 5.5, elevationGainFt: 1500, difficulty: 'Hard' },

  // --- Canyonlands ---
  { id: 'canyonlands-mesa-arch', parkId: 'canyonlands', name: 'Mesa Arch Trail', description: 'Short loop to a famous sunrise arch overlook.', miles: 0.5, elevationGainFt: 100, difficulty: 'Easy' },
  { id: 'canyonlands-grand-view-point', parkId: 'canyonlands', name: 'Grand View Point Trail', description: 'Rim walk with sweeping views over the entire park.', miles: 2.0, elevationGainFt: 100, difficulty: 'Easy' },
  { id: 'canyonlands-chesler-park', parkId: 'canyonlands', name: 'Chesler Park Loop', description: 'Iconic Needles district loop through sandstone spires.', miles: 11.0, elevationGainFt: 1000, difficulty: 'Hard' },
  { id: 'canyonlands-upheaval-dome', parkId: 'canyonlands', name: 'Upheaval Dome Overlook Trail', description: 'Short trail to a mysterious crater-like formation.', miles: 1.6, elevationGainFt: 300, difficulty: 'Moderate' },
  { id: 'canyonlands-syncline-loop', parkId: 'canyonlands', name: 'Syncline Loop Trail', description: 'Strenuous loop circling Upheaval Dome.', miles: 8.3, elevationGainFt: 1500, difficulty: 'Hard' },

  // --- Capitol Reef ---
  { id: 'capitol-reef-hickman-bridge', parkId: 'capitol-reef', name: 'Hickman Bridge Trail', description: 'Short trail to a massive natural stone bridge.', miles: 1.8, elevationGainFt: 400, difficulty: 'Moderate' },
  { id: 'capitol-reef-cassidy-arch', parkId: 'capitol-reef', name: 'Cassidy Arch Trail', description: 'Climbs slickrock to an arch named for outlaw Butch Cassidy.', miles: 3.4, elevationGainFt: 670, difficulty: 'Hard' },
  { id: 'capitol-reef-capitol-gorge', parkId: 'capitol-reef', name: 'Capitol Gorge Trail', description: 'Flat canyon walk past historic pioneer inscriptions.', miles: 2.0, elevationGainFt: 100, difficulty: 'Easy' },
  { id: 'capitol-reef-chimney-rock', parkId: 'capitol-reef', name: 'Chimney Rock Loop', description: 'Loop trail circling a striking red rock spire.', miles: 3.6, elevationGainFt: 660, difficulty: 'Moderate' },
  { id: 'capitol-reef-cohab-canyon', parkId: 'capitol-reef', name: 'Cohab Canyon Trail', description: 'Switchbacks into a hidden canyon above the campground.', miles: 3.4, elevationGainFt: 800, difficulty: 'Moderate' },

  // --- Glacier ---
  { id: 'glacier-highline', parkId: 'glacier', name: 'Highline Trail', description: 'Dramatic ledge trail along the Continental Divide from Logan Pass.', miles: 11.8, elevationGainFt: 830, difficulty: 'Hard' },
  { id: 'glacier-hidden-lake', parkId: 'glacier', name: 'Hidden Lake Overlook', description: 'Boardwalk and trail from Logan Pass to an alpine lake view.', miles: 2.7, elevationGainFt: 460, difficulty: 'Moderate' },
  { id: 'glacier-avalanche-lake', parkId: 'glacier', name: 'Avalanche Lake Trail', description: 'Forested trail to a lake ringed by waterfalls.', miles: 4.5, elevationGainFt: 730, difficulty: 'Moderate' },
  { id: 'glacier-grinnell-glacier', parkId: 'glacier', name: 'Grinnell Glacier Trail', description: 'Strenuous hike to a receding glacier and turquoise lake.', miles: 10.6, elevationGainFt: 1700, difficulty: 'Hard' },
  { id: 'glacier-trail-of-cedars', parkId: 'glacier', name: 'Trail of the Cedars', description: 'Flat boardwalk loop through an old-growth cedar grove.', miles: 0.9, elevationGainFt: 20, difficulty: 'Easy' },

  // --- Glacier Bay ---
  { id: 'glacier-bay-forest', parkId: 'glacier-bay', name: 'Forest Trail', description: 'Short loop through coastal rainforest near the lodge.', miles: 1.0, elevationGainFt: 100, difficulty: 'Easy' },
  { id: 'glacier-bay-tlingit', parkId: 'glacier-bay', name: 'Tlingit Trail', description: 'Interpretive path connecting Bartlett Cove landmarks.', miles: 1.0, elevationGainFt: 50, difficulty: 'Easy' },
  { id: 'glacier-bay-bartlett-river', parkId: 'glacier-bay', name: 'Bartlett River Trail', description: 'Trail through spruce forest to a tidal river estuary.', miles: 3.0, elevationGainFt: 100, difficulty: 'Moderate' },
  { id: 'glacier-bay-point-gustavus', parkId: 'glacier-bay', name: 'Point Gustavus Beach Walk', description: 'Coastal walk along a wide tidal beach.', miles: 4.0, elevationGainFt: 20, difficulty: 'Easy' },
  { id: 'glacier-bay-bartlett-lake', parkId: 'glacier-bay', name: 'Bartlett Lake Trail', description: 'Forested route to a quiet backcountry lake.', miles: 4.0, elevationGainFt: 300, difficulty: 'Moderate' },

  // --- Petrified Forest ---
  { id: 'petrified-forest-blue-mesa', parkId: 'petrified-forest', name: 'Blue Mesa Trail', description: 'Loop descending into striking blue-gray badlands.', miles: 1.0, elevationGainFt: 200, difficulty: 'Moderate' },
  { id: 'petrified-forest-giant-logs', parkId: 'petrified-forest', name: 'Giant Logs Trail', description: 'Short loop past massive petrified log sections.', miles: 0.4, elevationGainFt: 20, difficulty: 'Easy' },
  { id: 'petrified-forest-crystal-forest', parkId: 'petrified-forest', name: 'Crystal Forest Trail', description: 'Paved loop through a dense scatter of petrified wood.', miles: 0.75, elevationGainFt: 20, difficulty: 'Easy' },
  { id: 'petrified-forest-painted-desert-rim', parkId: 'petrified-forest', name: 'Painted Desert Rim Trail', description: 'Short walk with sweeping views of colorful badlands.', miles: 1.0, elevationGainFt: 50, difficulty: 'Easy' },
  { id: 'petrified-forest-long-logs', parkId: 'petrified-forest', name: 'Long Logs Trail', description: 'Loop past one of the largest concentrations of petrified wood.', miles: 1.6, elevationGainFt: 30, difficulty: 'Easy' },

  // --- Saguaro ---
  { id: 'saguaro-cactus-forest', parkId: 'saguaro', name: 'Cactus Forest Loop Trail', description: 'Path through a dense forest of towering saguaro cacti.', miles: 2.5, elevationGainFt: 100, difficulty: 'Easy' },
  { id: 'saguaro-douglas-spring', parkId: 'saguaro', name: 'Douglas Spring Trail', description: 'Desert trail to a seasonal spring in the Rincon foothills.', miles: 6.0, elevationGainFt: 1900, difficulty: 'Hard' },
  { id: 'saguaro-hugh-norris', parkId: 'saguaro', name: 'Hugh Norris Trail', description: 'Long ridgeline climb with panoramic desert views.', miles: 10.0, elevationGainFt: 2400, difficulty: 'Hard' },
  { id: 'saguaro-freeman-homestead', parkId: 'saguaro', name: 'Freeman Homestead Trail', description: 'Short loop past an old homestead site among saguaros.', miles: 1.0, elevationGainFt: 100, difficulty: 'Easy' },
  { id: 'saguaro-signal-hill', parkId: 'saguaro', name: 'Signal Hill Trail', description: 'Short walk to ancient petroglyphs carved by the Hohokam.', miles: 0.3, elevationGainFt: 50, difficulty: 'Easy' },

  // --- Carlsbad Caverns ---
  { id: 'carlsbad-caverns-natural-entrance', parkId: 'carlsbad-caverns', name: 'Natural Entrance Trail', description: 'Steep paved switchbacks descending into the cavern mouth.', miles: 1.25, elevationGainFt: 750, difficulty: 'Hard' },
  { id: 'carlsbad-caverns-big-room', parkId: 'carlsbad-caverns', name: 'Big Room Trail', description: "Nearly flat loop through the cavern's massive central chamber.", miles: 1.25, elevationGainFt: 100, difficulty: 'Easy' },
  { id: 'carlsbad-caverns-chihuahuan-desert', parkId: 'carlsbad-caverns', name: 'Chihuahuan Desert Nature Trail', description: 'Surface loop through desert scrub near the visitor center.', miles: 0.5, elevationGainFt: 50, difficulty: 'Easy' },
  { id: 'carlsbad-caverns-rattlesnake-canyon', parkId: 'carlsbad-caverns', name: 'Rattlesnake Canyon Trail', description: "Rugged desert canyon route in the park's backcountry.", miles: 6.0, elevationGainFt: 700, difficulty: 'Hard' },
  { id: 'carlsbad-caverns-old-guano-road', parkId: 'carlsbad-caverns', name: 'Old Guano Road Trail', description: 'Historic desert route once used to haul bat guano.', miles: 3.5, elevationGainFt: 750, difficulty: 'Moderate' },

  // --- White Sands ---
  { id: 'white-sands-alkali-flat', parkId: 'white-sands', name: 'Alkali Flat Trail', description: 'Strenuous loop across the heart of the gypsum dunefield.', miles: 5.0, elevationGainFt: 200, difficulty: 'Hard' },
  { id: 'white-sands-dune-life', parkId: 'white-sands', name: 'Dune Life Nature Trail', description: 'Loop showing plant and animal adaptations to the dunes.', miles: 1.0, elevationGainFt: 100, difficulty: 'Easy' },
  { id: 'white-sands-interdune-boardwalk', parkId: 'white-sands', name: 'Interdune Boardwalk', description: 'Accessible boardwalk over stable interdune areas.', miles: 0.4, elevationGainFt: 5, difficulty: 'Easy' },
  { id: 'white-sands-backcountry-loop', parkId: 'white-sands', name: 'Backcountry Camping Loop Trail', description: 'Loop trail connecting primitive dune campsites.', miles: 2.0, elevationGainFt: 150, difficulty: 'Moderate' },
  { id: 'white-sands-playa', parkId: 'white-sands', name: 'Playa Trail', description: 'Short walk to a seasonal dry lakebed among the dunes.', miles: 0.5, elevationGainFt: 20, difficulty: 'Easy' },

  // --- Great Basin ---
  { id: 'great-basin-bristlecone-pine', parkId: 'great-basin', name: 'Bristlecone Pine Trail', description: 'Climbs to a grove of trees over 3,000 years old.', miles: 2.8, elevationGainFt: 600, difficulty: 'Moderate' },
  { id: 'great-basin-wheeler-peak', parkId: 'great-basin', name: 'Wheeler Peak Summit Trail', description: "Strenuous alpine climb to the park's highest point.", miles: 8.6, elevationGainFt: 2900, difficulty: 'Hard' },
  { id: 'great-basin-alpine-lakes-loop', parkId: 'great-basin', name: 'Alpine Lakes Loop', description: 'Loop past two glacial lakes beneath Wheeler Peak.', miles: 2.7, elevationGainFt: 600, difficulty: 'Moderate' },
  { id: 'great-basin-lexington-arch', parkId: 'great-basin', name: 'Lexington Arch Trail', description: 'Remote trail to a rare limestone natural arch.', miles: 3.4, elevationGainFt: 1100, difficulty: 'Hard' },
  { id: 'great-basin-mountain-view', parkId: 'great-basin', name: 'Mountain View Nature Trail', description: 'Short interpretive loop near the visitor center.', miles: 0.3, elevationGainFt: 50, difficulty: 'Easy' },

  // --- Sequoia ---
  { id: 'sequoia-congress', parkId: 'sequoia', name: 'Congress Trail', description: 'Paved loop past the General Sherman Tree and other giants.', miles: 2.9, elevationGainFt: 200, difficulty: 'Easy' },
  { id: 'sequoia-moro-rock', parkId: 'sequoia', name: 'Moro Rock Trail', description: 'Steep stone staircase to a granite dome summit view.', miles: 0.5, elevationGainFt: 300, difficulty: 'Moderate' },
  { id: 'sequoia-tokopah-falls', parkId: 'sequoia', name: 'Tokopah Falls Trail', description: 'Canyon trail to a dramatic granite waterfall.', miles: 3.8, elevationGainFt: 600, difficulty: 'Moderate' },
  { id: 'sequoia-crescent-meadow', parkId: 'sequoia', name: 'Crescent Meadow Loop', description: 'Gentle loop through a meadow John Muir called the "gem of the Sierra".', miles: 1.6, elevationGainFt: 200, difficulty: 'Easy' },
  { id: 'sequoia-alta-peak', parkId: 'sequoia', name: 'Alta Peak Trail', description: 'Strenuous climb to a summit above the giant sequoia groves.', miles: 13.8, elevationGainFt: 4000, difficulty: 'Hard' },

  // --- Kings Canyon ---
  { id: 'kings-canyon-zumwalt-meadow', parkId: 'kings-canyon', name: 'Zumwalt Meadow Trail', description: 'Flat loop through a lush meadow beneath granite walls.', miles: 1.5, elevationGainFt: 50, difficulty: 'Easy' },
  { id: 'kings-canyon-mist-falls', parkId: 'kings-canyon', name: 'Mist Falls Trail', description: 'Canyon trail to one of the largest waterfalls in the Sierra.', miles: 8.0, elevationGainFt: 800, difficulty: 'Moderate' },
  { id: 'kings-canyon-general-grant', parkId: 'kings-canyon', name: 'General Grant Tree Trail', description: "Paved loop past the nation's second-largest tree.", miles: 0.6, elevationGainFt: 50, difficulty: 'Easy' },
  { id: 'kings-canyon-rae-lakes-loop', parkId: 'kings-canyon', name: 'Rae Lakes Loop', description: 'Multi-day backcountry loop through the high Sierra.', miles: 41.4, elevationGainFt: 6700, difficulty: 'Hard' },
  { id: 'kings-canyon-don-cecil', parkId: 'kings-canyon', name: 'Don Cecil Trail', description: 'Strenuous climb from the canyon floor to a fire lookout.', miles: 8.0, elevationGainFt: 4000, difficulty: 'Hard' },

  // --- Death Valley ---
  { id: 'death-valley-golden-canyon', parkId: 'death-valley', name: 'Golden Canyon Trail', description: 'Colorful badlands canyon walk near Zabriskie Point.', miles: 3.0, elevationGainFt: 400, difficulty: 'Moderate' },
  { id: 'death-valley-mosaic-canyon', parkId: 'death-valley', name: 'Mosaic Canyon Trail', description: 'Polished marble narrows in the Panamint foothills.', miles: 3.5, elevationGainFt: 500, difficulty: 'Moderate' },
  { id: 'death-valley-badwater-basin', parkId: 'death-valley', name: 'Badwater Basin Salt Flat Walk', description: 'Flat walk onto the lowest point in North America.', miles: 1.0, elevationGainFt: 5, difficulty: 'Easy' },
  { id: 'death-valley-telescope-peak', parkId: 'death-valley', name: 'Telescope Peak Trail', description: "Strenuous climb to the park's highest summit.", miles: 14.0, elevationGainFt: 3000, difficulty: 'Hard' },
  { id: 'death-valley-natural-bridge', parkId: 'death-valley', name: 'Natural Bridge Canyon Trail', description: 'Short walk to a large natural rock bridge.', miles: 1.4, elevationGainFt: 200, difficulty: 'Easy' },

  // --- Joshua Tree ---
  { id: 'joshua-tree-hidden-valley', parkId: 'joshua-tree', name: 'Hidden Valley Trail', description: 'Loop through a boulder-ringed valley once used by cattle rustlers.', miles: 1.0, elevationGainFt: 100, difficulty: 'Easy' },
  { id: 'joshua-tree-ryan-mountain', parkId: 'joshua-tree', name: 'Ryan Mountain Trail', description: 'Steep climb to panoramic desert views.', miles: 3.0, elevationGainFt: 1050, difficulty: 'Hard' },
  { id: 'joshua-tree-barker-dam', parkId: 'joshua-tree', name: 'Barker Dam Trail', description: 'Loop past a historic water tank and petroglyphs.', miles: 1.3, elevationGainFt: 100, difficulty: 'Easy' },
  { id: 'joshua-tree-lost-palms-oasis', parkId: 'joshua-tree', name: 'Lost Palms Oasis Trail', description: "Desert trail to the park's largest fan palm oasis.", miles: 7.2, elevationGainFt: 550, difficulty: 'Moderate' },
  { id: 'joshua-tree-skull-rock', parkId: 'joshua-tree', name: 'Skull Rock Trail', description: 'Short loop past a boulder resembling a skull.', miles: 1.7, elevationGainFt: 100, difficulty: 'Easy' },

  // --- Channel Islands ---
  { id: 'channel-islands-cavern-point', parkId: 'channel-islands', name: 'Cavern Point Loop', description: 'Coastal bluff loop with whale-watching views.', miles: 1.5, elevationGainFt: 200, difficulty: 'Easy' },
  { id: 'channel-islands-inspiration-point', parkId: 'channel-islands', name: 'Inspiration Point Trail', description: 'Short climb to a sweeping island overlook.', miles: 2.5, elevationGainFt: 400, difficulty: 'Moderate' },
  { id: 'channel-islands-potato-harbor', parkId: 'channel-islands', name: 'Potato Harbor Trail', description: 'Cliffside walk overlooking a dramatic sea cove.', miles: 5.0, elevationGainFt: 400, difficulty: 'Moderate' },
  { id: 'channel-islands-cherry-canyon', parkId: 'channel-islands', name: 'Cherry Canyon Trail', description: 'Descends through island scrub to Prisoners Harbor.', miles: 3.5, elevationGainFt: 500, difficulty: 'Moderate' },
  { id: 'channel-islands-water-canyon', parkId: 'channel-islands', name: 'Water Canyon Trail', description: 'Beach and canyon trail on Santa Rosa Island.', miles: 6.0, elevationGainFt: 500, difficulty: 'Moderate' },

  // --- Pinnacles ---
  { id: 'pinnacles-high-peaks', parkId: 'pinnacles', name: 'High Peaks Trail', description: 'Steep, exposed trail with carved steps through volcanic spires.', miles: 5.3, elevationGainFt: 1500, difficulty: 'Hard' },
  { id: 'pinnacles-bear-gulch-cave', parkId: 'pinnacles', name: 'Bear Gulch Cave Trail', description: 'Talus cave trail home to roosting bats.', miles: 2.2, elevationGainFt: 550, difficulty: 'Moderate' },
  { id: 'pinnacles-condor-gulch', parkId: 'pinnacles', name: 'Condor Gulch Trail', description: 'Climbs to an overlook popular for spotting condors.', miles: 4.7, elevationGainFt: 1140, difficulty: 'Hard' },
  { id: 'pinnacles-balconies-cave', parkId: 'pinnacles', name: 'Balconies Cave Trail', description: 'Rock scramble through a dark talus cave.', miles: 2.4, elevationGainFt: 200, difficulty: 'Moderate' },
  { id: 'pinnacles-moses-spring', parkId: 'pinnacles', name: 'Moses Spring Trail', description: 'Short loop past a reservoir and cave entrance.', miles: 2.2, elevationGainFt: 400, difficulty: 'Moderate' },

  // --- Redwood ---
  { id: 'redwood-tall-trees-grove', parkId: 'redwood', name: 'Tall Trees Grove Trail', description: "Permit-only trail to some of the world's tallest trees.", miles: 4.0, elevationGainFt: 800, difficulty: 'Moderate' },
  { id: 'redwood-fern-canyon', parkId: 'redwood', name: 'Fern Canyon Loop', description: 'Walls draped in ferns made famous by film productions.', miles: 1.0, elevationGainFt: 50, difficulty: 'Easy' },
  { id: 'redwood-lady-bird-johnson-grove', parkId: 'redwood', name: 'Lady Bird Johnson Grove Trail', description: 'Easy loop through old-growth redwoods.', miles: 1.4, elevationGainFt: 200, difficulty: 'Easy' },
  { id: 'redwood-boy-scout-tree', parkId: 'redwood', name: 'Boy Scout Tree Trail', description: 'Quiet trail through dense old-growth forest.', miles: 5.6, elevationGainFt: 400, difficulty: 'Moderate' },
  { id: 'redwood-coastal-demartin', parkId: 'redwood', name: 'Coastal Trail: DeMartin Section', description: 'Coastal bluff walk high above the Pacific.', miles: 11.0, elevationGainFt: 1200, difficulty: 'Hard' },

  // --- Lassen Volcanic ---
  { id: 'lassen-volcanic-bumpass-hell', parkId: 'lassen-volcanic', name: 'Bumpass Hell Trail', description: "Boardwalk through the park's largest hydrothermal area.", miles: 3.0, elevationGainFt: 300, difficulty: 'Moderate' },
  { id: 'lassen-volcanic-lassen-peak', parkId: 'lassen-volcanic', name: 'Lassen Peak Trail', description: 'Strenuous climb to the summit of a still-active volcano.', miles: 5.0, elevationGainFt: 2000, difficulty: 'Hard' },
  { id: 'lassen-volcanic-kings-creek-falls', parkId: 'lassen-volcanic', name: 'Kings Creek Falls Trail', description: 'Forest trail to a scenic cascading waterfall.', miles: 2.3, elevationGainFt: 700, difficulty: 'Moderate' },
  { id: 'lassen-volcanic-manzanita-lake', parkId: 'lassen-volcanic', name: 'Manzanita Lake Loop', description: 'Flat loop around a lake with views of Lassen Peak.', miles: 1.5, elevationGainFt: 50, difficulty: 'Easy' },
  { id: 'lassen-volcanic-cinder-cone', parkId: 'lassen-volcanic', name: 'Cinder Cone Trail', description: 'Steep climb up a symmetrical volcanic cinder cone.', miles: 4.0, elevationGainFt: 850, difficulty: 'Hard' },

  // --- Olympic ---
  { id: 'olympic-hoh-river', parkId: 'olympic', name: 'Hoh River Trail', description: 'Iconic trail through moss-draped temperate rainforest.', miles: 17.3, elevationGainFt: 950, difficulty: 'Hard' },
  { id: 'olympic-hurricane-hill', parkId: 'olympic', name: 'Hurricane Hill Trail', description: 'Paved climb to sweeping views of the Olympic Range.', miles: 3.2, elevationGainFt: 700, difficulty: 'Moderate' },
  { id: 'olympic-sol-duc-falls', parkId: 'olympic', name: 'Sol Duc Falls Trail', description: 'Forested trail to a powerful three-way waterfall.', miles: 1.6, elevationGainFt: 200, difficulty: 'Easy' },
  { id: 'olympic-hall-of-mosses', parkId: 'olympic', name: 'Hall of Mosses Trail', description: 'Short loop through an especially lush rainforest grove.', miles: 0.8, elevationGainFt: 100, difficulty: 'Easy' },
  { id: 'olympic-ozette-triangle', parkId: 'olympic', name: 'Ozette Triangle Trail', description: 'Boardwalk loop connecting rainforest to a wild coastline.', miles: 9.4, elevationGainFt: 200, difficulty: 'Moderate' },

  // --- Mount Rainier ---
  { id: 'mount-rainier-skyline', parkId: 'mount-rainier', name: 'Skyline Trail', description: 'Iconic loop through wildflower meadows with close-up volcano views.', miles: 5.5, elevationGainFt: 1700, difficulty: 'Hard' },
  { id: 'mount-rainier-naches-peak', parkId: 'mount-rainier', name: 'Naches Peak Loop', description: 'Subalpine loop past ponds and wildflower meadows.', miles: 3.5, elevationGainFt: 600, difficulty: 'Moderate' },
  { id: 'mount-rainier-tolmie-peak', parkId: 'mount-rainier', name: 'Tolmie Peak Trail', description: 'Climbs to a fire lookout above a reflective alpine lake.', miles: 6.5, elevationGainFt: 1100, difficulty: 'Moderate' },
  { id: 'mount-rainier-comet-falls', parkId: 'mount-rainier', name: 'Comet Falls Trail', description: "Steep climb to one of the park's tallest waterfalls.", miles: 3.8, elevationGainFt: 1200, difficulty: 'Hard' },
  { id: 'mount-rainier-trail-of-shadows', parkId: 'mount-rainier', name: 'Trail of the Shadows', description: 'Flat interpretive loop near Longmire.', miles: 0.7, elevationGainFt: 20, difficulty: 'Easy' },

  // --- North Cascades ---
  { id: 'north-cascades-cascade-pass', parkId: 'north-cascades', name: 'Cascade Pass Trail', description: 'Switchbacks to a dramatic alpine pass ringed by peaks.', miles: 7.4, elevationGainFt: 1800, difficulty: 'Hard' },
  { id: 'north-cascades-thunder-knob', parkId: 'north-cascades', name: 'Thunder Knob Trail', description: 'Short climb with views of turquoise Diablo Lake.', miles: 3.6, elevationGainFt: 635, difficulty: 'Moderate' },
  { id: 'north-cascades-maple-pass-loop', parkId: 'north-cascades', name: 'Maple Pass Loop', description: 'Alpine loop past larches and high mountain tarns.', miles: 7.2, elevationGainFt: 2000, difficulty: 'Hard' },
  { id: 'north-cascades-blue-lake', parkId: 'north-cascades', name: 'Blue Lake Trail', description: 'Forested climb to a vivid alpine lake beneath jagged peaks.', miles: 4.4, elevationGainFt: 1050, difficulty: 'Moderate' },
  { id: 'north-cascades-trail-of-cedars', parkId: 'north-cascades', name: 'Trail of the Cedars', description: 'Short loop through old-growth forest near Newhalem.', miles: 0.3, elevationGainFt: 20, difficulty: 'Easy' },

  // --- Crater Lake ---
  { id: 'crater-lake-garfield-peak', parkId: 'crater-lake', name: 'Garfield Peak Trail', description: 'Climbs to sweeping views over the caldera lake.', miles: 3.4, elevationGainFt: 1000, difficulty: 'Moderate' },
  { id: 'crater-lake-cleetwood-cove', parkId: 'crater-lake', name: 'Cleetwood Cove Trail', description: "The only trail down to the lake's edge.", miles: 2.2, elevationGainFt: 700, difficulty: 'Hard' },
  { id: 'crater-lake-watchman-peak', parkId: 'crater-lake', name: 'Watchman Peak Trail', description: 'Short climb to a historic fire lookout with panoramic views.', miles: 1.6, elevationGainFt: 420, difficulty: 'Moderate' },
  { id: 'crater-lake-plaikni-falls', parkId: 'crater-lake', name: 'Plaikni Falls Trail', description: 'Gentle forest trail to a hidden waterfall.', miles: 2.0, elevationGainFt: 130, difficulty: 'Easy' },
  { id: 'crater-lake-mount-scott', parkId: 'crater-lake', name: 'Mount Scott Trail', description: 'Climbs to the highest point in the park.', miles: 4.4, elevationGainFt: 1250, difficulty: 'Hard' },

  // --- Haleakalā ---
  { id: 'haleakala-sliding-sands', parkId: 'haleakala', name: 'Sliding Sands Trail', description: "Descends into the volcano's colorful cinder desert crater.", miles: 11.0, elevationGainFt: 2800, difficulty: 'Hard' },
  { id: 'haleakala-pipiwai', parkId: 'haleakala', name: 'Pipiwai Trail', description: 'Bamboo forest trail to a towering waterfall near Kipahulu.', miles: 4.0, elevationGainFt: 800, difficulty: 'Moderate' },
  { id: 'haleakala-halemauu', parkId: 'haleakala', name: 'Halemauu Trail', description: 'Switchbacks down the crater wall to the valley floor.', miles: 7.4, elevationGainFt: 1400, difficulty: 'Hard' },
  { id: 'haleakala-hosmer-grove', parkId: 'haleakala', name: 'Hosmer Grove Trail', description: 'Short loop through a planted forest near the summit entrance.', miles: 0.5, elevationGainFt: 100, difficulty: 'Easy' },
  { id: 'haleakala-kuloa-point', parkId: 'haleakala', name: 'Kuloa Point Trail', description: 'Coastal loop past the Pools of Oheo.', miles: 0.5, elevationGainFt: 30, difficulty: 'Easy' },

  // --- Hawaiʻi Volcanoes ---
  { id: 'hawaii-volcanoes-kilauea-iki', parkId: 'hawaii-volcanoes', name: 'Kilauea Iki Trail', description: 'Descends into a solidified lava lake crater.', miles: 3.3, elevationGainFt: 400, difficulty: 'Moderate' },
  { id: 'hawaii-volcanoes-devastation', parkId: 'hawaii-volcanoes', name: 'Devastation Trail', description: 'Paved walk through a stark landscape of volcanic cinder.', miles: 1.0, elevationGainFt: 50, difficulty: 'Easy' },
  { id: 'hawaii-volcanoes-halemaumau', parkId: 'hawaii-volcanoes', name: 'Halemaumau Trail', description: 'Trail along the rim of the summit caldera.', miles: 3.9, elevationGainFt: 500, difficulty: 'Moderate' },
  { id: 'hawaii-volcanoes-puu-loa', parkId: 'hawaii-volcanoes', name: 'Puu Loa Petroglyphs Trail', description: "Short walk to one of Hawaii's largest petroglyph fields.", miles: 1.4, elevationGainFt: 50, difficulty: 'Easy' },
  { id: 'hawaii-volcanoes-napau-crater', parkId: 'hawaii-volcanoes', name: 'Napau Crater Trail', description: 'Remote trail across lava fields to an active crater.', miles: 14.0, elevationGainFt: 900, difficulty: 'Hard' },

  // --- National Park of American Samoa ---
  { id: 'national-park-samoa-mount-alava', parkId: 'national-park-samoa', name: 'Mount Alava Trail', description: 'Ridgeline trail with sweeping views over Pago Pago Harbor.', miles: 3.5, elevationGainFt: 1600, difficulty: 'Hard' },
  { id: 'national-park-samoa-lower-sauma-ridge', parkId: 'national-park-samoa', name: 'Lower Sauma Ridge Trail', description: 'Rainforest trail with coastal overlooks.', miles: 1.75, elevationGainFt: 800, difficulty: 'Moderate' },
  { id: 'national-park-samoa-tuafanua', parkId: 'national-park-samoa', name: 'Tuafanua Trail', description: 'Steep descent through rainforest to a remote waterfall.', miles: 1.8, elevationGainFt: 800, difficulty: 'Hard' },
  { id: 'national-park-samoa-pola-island', parkId: 'national-park-samoa', name: 'Pola Island Overlook Trail', description: 'Short coastal walk to a dramatic sea stack view.', miles: 0.5, elevationGainFt: 100, difficulty: 'Easy' },
  { id: 'national-park-samoa-wwii-heritage', parkId: 'national-park-samoa', name: 'World War II Heritage Trail', description: 'Historic coastal walk past wartime gun emplacements.', miles: 0.75, elevationGainFt: 100, difficulty: 'Easy' },


  // --- Denali ---
  { id: 'denali-savage-river', parkId: 'denali', name: 'Savage River Loop', description: 'Easy trail along a glacial river popular for wildlife viewing.', miles: 2.0, elevationGainFt: 100, difficulty: 'Easy' },
  { id: 'denali-horseshoe-lake', parkId: 'denali', name: 'Horseshoe Lake Trail', description: 'Forested loop to an oxbow lake beloved by beavers.', miles: 2.1, elevationGainFt: 250, difficulty: 'Easy' },
  { id: 'denali-mount-healy', parkId: 'denali', name: 'Mount Healy Overlook Trail', description: 'Climbs above treeline for sweeping views near the entrance.', miles: 5.4, elevationGainFt: 1700, difficulty: 'Hard' },
  { id: 'denali-triple-lakes', parkId: 'denali', name: 'Triple Lakes Trail', description: 'Longest maintained trail in the park, connecting three lakes.', miles: 9.5, elevationGainFt: 1600, difficulty: 'Hard' },
  { id: 'denali-eielson-alpine', parkId: 'denali', name: 'Eielson Alpine Trail', description: 'Steep climb from the Eielson Visitor Center for Denali views.', miles: 3.0, elevationGainFt: 1000, difficulty: 'Hard' },

  // --- Katmai ---
  { id: 'katmai-brooks-falls', parkId: 'katmai', name: 'Brooks Falls Trail', description: 'Boardwalk to the world-famous bear-viewing platform.', miles: 1.2, elevationGainFt: 50, difficulty: 'Easy' },
  { id: 'katmai-dumpling-mountain', parkId: 'katmai', name: 'Dumpling Mountain Trail', description: 'Climbs above Brooks Camp for panoramic lake views.', miles: 4.5, elevationGainFt: 2400, difficulty: 'Hard' },
  { id: 'katmai-valley-ten-thousand-smokes', parkId: 'katmai', name: 'Valley of Ten Thousand Smokes Trail', description: 'Descends into an ash-filled volcanic valley.', miles: 3.5, elevationGainFt: 500, difficulty: 'Moderate' },
  { id: 'katmai-ukak-falls', parkId: 'katmai', name: 'Ukak Falls Trail', description: 'Short trail to a waterfall within the ash valley.', miles: 1.5, elevationGainFt: 200, difficulty: 'Moderate' },
  { id: 'katmai-river-lake', parkId: 'katmai', name: 'River Lake Trail', description: "Short forest walk connecting Brooks Camp's waterways.", miles: 1.5, elevationGainFt: 100, difficulty: 'Easy' },

  // --- Kenai Fjords ---
  { id: 'kenai-fjords-harding-icefield', parkId: 'kenai-fjords', name: 'Harding Icefield Trail', description: 'Strenuous climb to a vast icefield feeding dozens of glaciers.', miles: 8.2, elevationGainFt: 3500, difficulty: 'Hard' },
  { id: 'kenai-fjords-exit-glacier', parkId: 'kenai-fjords', name: 'Exit Glacier Trail', description: 'Short walk to the base of an accessible receding glacier.', miles: 1.0, elevationGainFt: 100, difficulty: 'Easy' },
  { id: 'kenai-fjords-glacier-overlook', parkId: 'kenai-fjords', name: 'Glacier Overlook Loop', description: 'Forested loop with views of Exit Glacier.', miles: 2.0, elevationGainFt: 300, difficulty: 'Moderate' },
  { id: 'kenai-fjords-marmot-meadows', parkId: 'kenai-fjords', name: 'Marmot Meadows Trail', description: 'Alpine meadow section of the Harding Icefield route.', miles: 4.0, elevationGainFt: 1900, difficulty: 'Hard' },
  { id: 'kenai-fjords-coastal-tonsina', parkId: 'kenai-fjords', name: 'Coastal Trail (Tonsina Point)', description: 'Forest and beach walk near Seward.', miles: 4.0, elevationGainFt: 200, difficulty: 'Moderate' },

  // --- Kobuk Valley ---
  { id: 'kobuk-valley-great-dunes-route', parkId: 'kobuk-valley', name: 'Great Kobuk Sand Dunes Route', description: 'Unmarked cross-country route across massive Arctic dunes.', miles: 6.0, elevationGainFt: 300, difficulty: 'Hard' },
  { id: 'kobuk-valley-salmon-river-route', parkId: 'kobuk-valley', name: 'Salmon River Route', description: 'Unmarked backcountry route along a wild Arctic river.', miles: 10.0, elevationGainFt: 200, difficulty: 'Hard' },
  { id: 'kobuk-valley-onion-portage-route', parkId: 'kobuk-valley', name: 'Onion Portage Overlook Route', description: 'Cross-country route to a historic caribou crossing.', miles: 3.0, elevationGainFt: 150, difficulty: 'Moderate' },
  { id: 'kobuk-valley-little-dunes-route', parkId: 'kobuk-valley', name: 'Little Kobuk Dunes Route', description: 'Shorter cross-country dune route near the river.', miles: 2.0, elevationGainFt: 150, difficulty: 'Moderate' },
  { id: 'kobuk-valley-kavet-creek-route', parkId: 'kobuk-valley', name: 'Kavet Creek Route', description: 'Unmarked tundra route through boreal forest.', miles: 4.0, elevationGainFt: 200, difficulty: 'Moderate' },

  // --- Lake Clark ---
  { id: 'lake-clark-tanalian-falls', parkId: 'lake-clark', name: 'Tanalian Falls Trail', description: 'Forest trail to a scenic waterfall near Port Alsworth.', miles: 4.0, elevationGainFt: 400, difficulty: 'Moderate' },
  { id: 'lake-clark-tanalian-mountain', parkId: 'lake-clark', name: 'Tanalian Mountain Trail', description: 'Strenuous climb above treeline for lake and volcano views.', miles: 6.5, elevationGainFt: 3400, difficulty: 'Hard' },
  { id: 'lake-clark-kontrashibuna-lake', parkId: 'lake-clark', name: 'Kontrashibuna Lake Trail', description: 'Forested trail to a turquoise glacial lake.', miles: 3.5, elevationGainFt: 300, difficulty: 'Moderate' },
  { id: 'lake-clark-silver-salmon-beach', parkId: 'lake-clark', name: 'Beach Route (Silver Salmon Creek)', description: 'Coastal route popular for bear viewing.', miles: 2.0, elevationGainFt: 50, difficulty: 'Easy' },
  { id: 'lake-clark-portage', parkId: 'lake-clark', name: 'Portage Trail', description: "Connector route linking the park's interior lake system.", miles: 1.5, elevationGainFt: 200, difficulty: 'Easy' },

  // --- Wrangell–St. Elias ---
  { id: 'wrangell-st-elias-root-glacier', parkId: 'wrangell-st-elias', name: 'Root Glacier Trail', description: 'Walk directly onto a massive glacier near Kennecott.', miles: 4.0, elevationGainFt: 200, difficulty: 'Moderate' },
  { id: 'wrangell-st-elias-bonanza-mine', parkId: 'wrangell-st-elias', name: 'Bonanza Mine Trail', description: 'Strenuous climb to historic copper mine ruins.', miles: 9.0, elevationGainFt: 3800, difficulty: 'Hard' },
  { id: 'wrangell-st-elias-erie-lake', parkId: 'wrangell-st-elias', name: 'Erie Lake Trail', description: 'High alpine trail past a glacial lake.', miles: 7.0, elevationGainFt: 3000, difficulty: 'Hard' },
  { id: 'wrangell-st-elias-nugget-creek', parkId: 'wrangell-st-elias', name: 'Nugget Creek Trail', description: 'Forested route to a backcountry public use cabin.', miles: 14.0, elevationGainFt: 500, difficulty: 'Hard' },
  { id: 'wrangell-st-elias-silk-stocking', parkId: 'wrangell-st-elias', name: 'Silk Stocking Trail', description: 'Short historic walk through the ghost town of Kennecott.', miles: 0.75, elevationGainFt: 50, difficulty: 'Easy' },

  // --- Gates of the Arctic ---
  { id: 'gates-arctic-arrigetch-peaks', parkId: 'gates-arctic', name: 'Arrigetch Peaks Route', description: 'Renowned cross-country route into dramatic granite spires.', miles: 12.0, elevationGainFt: 2500, difficulty: 'Hard' },
  { id: 'gates-arctic-anaktuvuk-pass', parkId: 'gates-arctic', name: 'Anaktuvuk Pass Route', description: 'Traditional cross-country route used by local Nunamiut people.', miles: 8.0, elevationGainFt: 800, difficulty: 'Hard' },
  { id: 'gates-arctic-alatna-river', parkId: 'gates-arctic', name: 'Alatna River Route', description: 'Wilderness river corridor route through the Brooks Range.', miles: 15.0, elevationGainFt: 500, difficulty: 'Hard' },
  { id: 'gates-arctic-circle-lake', parkId: 'gates-arctic', name: 'Circle Lake Route', description: 'Cross-country tundra route to a remote alpine lake.', miles: 6.0, elevationGainFt: 1200, difficulty: 'Hard' },
  { id: 'gates-arctic-summit-lake', parkId: 'gates-arctic', name: 'Summit Lake Route', description: "Cross-country route into the park's northern valleys.", miles: 10.0, elevationGainFt: 1000, difficulty: 'Hard' },
];
