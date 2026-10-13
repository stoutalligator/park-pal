import { ParkGuide } from '@/types';

// "Only Have a Day?" plans and park-only activities, keyed by Park.id. These
// are suggestions from our own trips and fellow pals — seasonal roads,
// permits, and closures change, so the Park Detail screen always pairs them
// with a pointer to the park's official nps.gov page.
export const PARK_GUIDES: Record<string, ParkGuide> = {
  // --- Northeast ---
  acadia: {
    npsCode: 'acad',
    oneDay: [
      { when: 'Morning', text: 'Catch sunrise from Cadillac Summit (vehicle reservations are required in peak season), then drive the Park Loop Road.' },
      { when: 'Midday', text: 'Walk the Ocean Path from Sand Beach past Thunder Hole to Otter Cliff.' },
      { when: 'Afternoon', text: 'Stroll the Jordan Pond Path and treat yourself to the famous popovers at the Jordan Pond House.' },
      { when: 'Evening', text: 'Head to the quiet side of the island for sunset at Bass Harbor Head Light.' },
    ],
  },
  shenandoah: {
    npsCode: 'shen',
    oneDay: [
      { when: 'Morning', text: 'Hike to Dark Hollow Falls near Big Meadows while the trail is quiet.' },
      { when: 'Midday', text: 'Grab a slice of blackberry pie or a blackberry milkshake at the Big Meadows Wayside.' },
      { when: 'Afternoon', text: 'Climb Stony Man for one of the best views in the park, then cruise Skyline Drive and pull over at the overlooks.' },
      { when: 'Evening', text: 'Watch the Shenandoah Valley glow at a west-facing Skyline Drive overlook, and keep an eye out for deer and black bears at dusk.' },
    ],
  },
  'new-river-gorge': {
    npsCode: 'neri',
    oneDay: [
      { when: 'Morning', text: 'Walk the boardwalk at the Canyon Rim Visitor Center for the classic New River Gorge Bridge view.' },
      { when: 'Midday', text: 'Hike the Long Point Trail to a rock outcrop facing the bridge head-on.' },
      { when: 'Afternoon', text: 'Drive down Fayette Station Road beneath the bridge, or book a whitewater trip with a local outfitter.' },
      { when: 'Evening', text: 'Watch the sun set over the gorge from Grandview or the Endless Wall Trail at Diamond Point.' },
    ],
  },

  // --- Southeast ---
  'great-smoky': {
    npsCode: 'grsm',
    oneDay: [
      { when: 'Morning', text: 'Drive the Cades Cove Loop early for deer, turkeys, maybe a black bear, and historic churches and cabins. Remember the parking tag required to park anywhere in the park.' },
      { when: 'Midday', text: 'Head up Newfound Gap Road and stand on the Tennessee–North Carolina line.' },
      { when: 'Afternoon', text: 'Walk the steep paved path to the observation tower on Kuwohi (formerly Clingmans Dome), the park\'s highest point.' },
      { when: 'Evening', text: 'Catch sunset from a Newfound Gap Road pullout as the "smoke" settles into the ridges.' },
    ],
  },
  biscayne: {
    npsCode: 'bisc',
    oneDay: [
      { when: 'Morning', text: 'Start at the Dante Fascell Visitor Center and walk the jetty for views across the bay.' },
      { when: 'Midday', text: 'Take a concessioner boat trip out to Boca Chita Key and climb its ornamental lighthouse when it\'s open.' },
      { when: 'Afternoon', text: 'Snorkel the reefs or paddle the mangrove shoreline. Rentals and guided trips run from the visitor center area.' },
      { when: 'Evening', text: 'Watch the sun go down over the bay from Convoy Point.' },
    ],
  },
  'dry-tortugas': {
    npsCode: 'drto',
    oneDay: [
      { when: 'Morning', text: 'Board the ferry (or a seaplane) from Key West, a roughly two-hour ride across open water.' },
      { when: 'Midday', text: 'Take the guided tour of Fort Jefferson, one of the largest brick masonry forts in the Americas.' },
      { when: 'Afternoon', text: 'Snorkel along the fort\'s moat wall and beaches, and look for sea turtles and coral heads.' },
      { when: 'Evening', text: 'Ride back to Key West. Camping on Garden Key is the only way to see a Tortugas sunset.' },
    ],
  },
  everglades: {
    npsCode: 'ever',
    oneDay: [
      { when: 'Morning', text: 'Walk the Anhinga Trail boardwalk at Royal Palm, where alligators, herons, and anhingas show up up-close.' },
      { when: 'Midday', text: 'Stop at the Pa-hay-okee Overlook for the "river of grass" view, then the Mahogany Hammock boardwalk.' },
      { when: 'Afternoon', text: 'Continue to Flamingo to look for manatees and crocodiles near the marina, or rent a canoe.' },
      { when: 'Evening', text: 'Watch wading birds fly to roost at sunset. Bring bug spray!' },
    ],
  },
  congaree: {
    npsCode: 'cong',
    oneDay: [
      { when: 'Morning', text: 'Walk the Boardwalk Loop through old-growth bottomland forest with some of the tallest trees in eastern North America.' },
      { when: 'Midday', text: 'Extend to the Weston Lake Loop to look for cypress knees, river otters, and barred owls.' },
      { when: 'Afternoon', text: 'Paddle the Cedar Creek Canoe Trail if water levels are good. Bring your own boat or book a guided trip.' },
      { when: 'Evening', text: 'In late May to early June, the synchronous fireflies light up the forest (viewing is by lottery).' },
    ],
  },
  'mammoth-cave': {
    npsCode: 'maca',
    oneDay: [
      { when: 'Morning', text: 'Take a ranger-led cave tour (reserve ahead). The Historic Tour shows off the giant passages of the world\'s longest known cave.' },
      { when: 'Midday', text: 'Picnic near the visitor center, then walk the River Styx Spring Trail to where the underground river emerges.' },
      { when: 'Afternoon', text: 'Hike the Cedar Sink Trail or catch a second, shorter cave tour.' },
      { when: 'Evening', text: 'Look for wild turkeys and deer at dusk along the park roads.' },
    ],
  },
  'virgin-islands': {
    npsCode: 'viis',
    oneDay: [
      { when: 'Morning', text: 'Ferry over to Cruz Bay on St. John and stop at the visitor center for the day\'s conditions.' },
      { when: 'Midday', text: 'Snorkel the underwater trail at Trunk Bay, or the turtle-friendly sea grass of Maho Bay.' },
      { when: 'Afternoon', text: 'Explore the ruins of the Annaberg Sugar Plantation and the stories of the enslaved Africans who worked there.' },
      { when: 'Evening', text: 'Find a North Shore overlook for a Caribbean sunset before the ferry back.' },
    ],
  },

  // --- Midwest ---
  'cuyahoga-valley': {
    npsCode: 'cuva',
    oneDay: [
      { when: 'Morning', text: 'See 60-foot Brandywine Falls from the boardwalk, then hike the mossy sandstone Ledges Trail.' },
      { when: 'Midday', text: 'Bike a stretch of the Ohio & Erie Canal Towpath Trail. With "Bike Aboard," the scenic railroad can carry you back.' },
      { when: 'Afternoon', text: 'Visit the Boston Mill Visitor Center and the Everett Covered Bridge.' },
      { when: 'Evening', text: 'Walk the Beaver Marsh boardwalk at dusk for beavers, herons, and turtles.' },
    ],
  },
  'indiana-dunes': {
    npsCode: 'indu',
    oneDay: [
      { when: 'Morning', text: 'Take on the 3 Dune Challenge at West Beach (552 feet of climbing in sand).' },
      { when: 'Midday', text: 'Cool off with a swim in Lake Michigan at West Beach or Lake View.' },
      { when: 'Afternoon', text: 'Walk the Cowles Bog Trail through wetlands, woods, and dunes to a quiet beach.' },
      { when: 'Evening', text: 'Watch the sun set over the lake, with the Chicago skyline visible on clear days.' },
    ],
  },
  'isle-royale': {
    npsCode: 'isro',
    oneDay: [
      { when: 'Morning', text: 'Catch the ferry or seaplane to Rock Harbor. Day trips are possible from Copper Harbor, Michigan.' },
      { when: 'Midday', text: 'Hike the Stoll Trail out to Scoville Point along rocky Lake Superior shoreline.' },
      { when: 'Afternoon', text: 'Look for moose in the coves and visit the Rock Harbor Lighthouse by boat if a tour is running.' },
      { when: 'Evening', text: 'Ride back across Lake Superior, or stay the night to listen for wolves and loons.' },
    ],
  },
  voyageurs: {
    npsCode: 'voya',
    oneDay: [
      { when: 'Morning', text: 'Start at the Rainy Lake or Kabetogama Lake visitor center. This is a water park, so plan around a boat.' },
      { when: 'Midday', text: 'Join a ranger-led boat tour, or take a water taxi to the historic Kettle Falls Hotel.' },
      { when: 'Afternoon', text: 'Visit the Ellsworth Rock Gardens or hike the Oberholtzer Trail.' },
      { when: 'Evening', text: 'Stay up for the dark skies, where the northern lights sometimes put on a show.' },
    ],
  },
  'wind-cave': {
    npsCode: 'wica',
    oneDay: [
      { when: 'Morning', text: 'Take a ranger-led cave tour to see rare boxwork formations. Check the tour status and get tickets early.' },
      { when: 'Midday', text: 'Picnic near the visitor center and walk the Prairie Vista Trail.' },
      { when: 'Afternoon', text: 'Drive the park roads for bison, pronghorn, and prairie dog towns, then hike up to the Rankin Ridge fire tower.' },
      { when: 'Evening', text: 'Watch elk come out at dusk on the prairie.' },
    ],
  },
  badlands: {
    npsCode: 'badl',
    oneDay: [
      { when: 'Morning', text: 'Hike the Door, Window, and Notch trails near the Ben Reifel Visitor Center. The Notch has a log ladder!' },
      { when: 'Midday', text: 'Walk the Fossil Exhibit Trail, then drive the Badlands Loop Road with stops at Yellow Mounds and Pinnacles Overlook.' },
      { when: 'Afternoon', text: 'Head out Sage Creek Rim Road to Roberts Prairie Dog Town and look for bison and bighorn sheep.' },
      { when: 'Evening', text: 'Stay for sunset at Pinnacles Overlook, then stargaze. Badlands skies are seriously dark.' },
    ],
  },
  'theodore-roosevelt': {
    npsCode: 'thro',
    oneDay: [
      { when: 'Morning', text: 'Stop at Painted Canyon Overlook off I-94 for your first look at the badlands.' },
      { when: 'Midday', text: 'Tour the Maltese Cross Cabin, Roosevelt\'s first ranch home, at the South Unit visitor center.' },
      { when: 'Afternoon', text: 'Drive the open portions of the South Unit Scenic Loop for bison, wild horses, and prairie dog towns.' },
      { when: 'Evening', text: 'Hike the short Wind Canyon Trail for sunset over the Little Missouri River.' },
    ],
  },

  // --- South Central ---
  'big-bend': {
    npsCode: 'bibe',
    oneDay: [
      { when: 'Morning', text: 'Hike the Lost Mine Trail in the Chisos Mountains before the heat.' },
      { when: 'Midday', text: 'Drive the Ross Maxwell Scenic Drive down to Santa Elena Canyon and walk into its 1,500-foot walls.' },
      { when: 'Afternoon', text: 'Soak in the 105°F riverside hot spring at the Hot Springs Historic District, if road access allows.' },
      { when: 'Evening', text: 'Watch sunset through the Window from the Chisos Basin, then stargaze in one of the darkest skies in the lower 48.' },
    ],
  },
  'guadalupe-mountains': {
    npsCode: 'gumo',
    oneDay: [
      { when: 'Morning', text: 'Strong hikers can summit Guadalupe Peak, the highest point in Texas (8.4 miles round trip). Start early and watch for high winds.' },
      { when: 'Midday', text: 'Or take the easier Devil\'s Hall Trail to a natural rock staircase and narrow canyon.' },
      { when: 'Afternoon', text: 'Visit the Pinery Station ruins and the Frijole Ranch with its Smith Spring loop.' },
      { when: 'Evening', text: 'Watch El Capitan glow at sunset from the pullouts along US-62/180.' },
    ],
  },
  'hot-springs': {
    npsCode: 'hosp',
    oneDay: [
      { when: 'Morning', text: 'Tour the Fordyce Bathhouse, now the visitor center, to see how Americans "took the waters" a century ago.' },
      { when: 'Midday', text: 'Book a traditional thermal bath at a working bathhouse on Bathhouse Row.' },
      { when: 'Afternoon', text: 'Walk the Grand Promenade and hike up Hot Springs Mountain. Fill a bottle at a thermal water jug fountain.' },
      { when: 'Evening', text: 'Stroll Bathhouse Row as the historic buildings light up.' },
    ],
  },
  'gateway-arch': {
    npsCode: 'jeff',
    oneDay: [
      { when: 'Morning', text: 'Ride the tram to the top of the Gateway Arch (reserve tickets ahead) for views 630 feet above St. Louis.' },
      { when: 'Midday', text: 'Explore the free Museum at the Gateway Arch beneath the legs.' },
      { when: 'Afternoon', text: 'Take a riverboat cruise on the Mississippi or stroll the Arch grounds.' },
      { when: 'Evening', text: 'Catch the Arch reflecting the sunset from the riverfront.' },
    ],
  },

  // --- Mountain ---
  'rocky-mountain': {
    npsCode: 'romo',
    oneDay: [
      { when: 'Morning', text: 'Hike the Bear Lake to Emerald Lake trail, passing Nymph and Dream Lakes, early. Check timed-entry permit rules before you go.' },
      { when: 'Midday', text: 'Drive Trail Ridge Road (seasonal) up above treeline toward the Alpine Visitor Center.' },
      { when: 'Afternoon', text: 'Walk the Tundra Communities Trail at over 12,000 feet. Watch for marmots and pikas.' },
      { when: 'Evening', text: 'Look for elk grazing in Moraine Park or Horseshoe Park at dusk. September brings the bugling rut.' },
    ],
  },
  'black-canyon': {
    npsCode: 'blca',
    oneDay: [
      { when: 'Morning', text: 'Walk out to Gunnison Point by the South Rim Visitor Center for your first dizzying look down.' },
      { when: 'Midday', text: 'Drive South Rim Road, stopping at Chasm View and the Painted Wall, Colorado\'s tallest cliff.' },
      { when: 'Afternoon', text: 'Hike the Warner Point Nature Trail, or brave the steep East Portal Road down to the river.' },
      { when: 'Evening', text: 'Watch sunset from Sunset View, then stay for some of Colorado\'s darkest night skies.' },
    ],
  },
  'great-sand-dunes': {
    npsCode: 'grsa',
    oneDay: [
      { when: 'Morning', text: 'Climb toward High Dune before the sand heats up. It can top 140°F on summer afternoons.' },
      { when: 'Midday', text: 'Splash in Medano Creek (best in late spring and early summer when it flows).' },
      { when: 'Afternoon', text: 'Sandboard or sand sled down the dunes (rent boards outside the park), or hike the shady Mosca Pass Trail.' },
      { when: 'Evening', text: 'Watch the dunes change color at sunset, then stargaze. Great Sand Dunes is a certified dark sky park.' },
    ],
  },
  'mesa-verde': {
    npsCode: 'meve',
    oneDay: [
      { when: 'Morning', text: 'Take a ranger-guided tour of Cliff Palace or Balcony House (seasonal, reserve ahead).' },
      { when: 'Midday', text: 'Visit the Chapin Mesa Archeological Museum and the Spruce Tree House overlook.' },
      { when: 'Afternoon', text: 'Drive the Mesa Top Loop for overlooks of cliff dwellings tucked into the canyon walls.' },
      { when: 'Evening', text: 'Catch sunset from Park Point, the highest spot in the park.' },
    ],
  },
  arches: {
    npsCode: 'arch',
    oneDay: [
      { when: 'Morning', text: 'Hike to Delicate Arch early to beat the heat. Check timed-entry reservation rules before you go.' },
      { when: 'Midday', text: 'Walk the Windows Section and Double Arch, then stop at Balanced Rock.' },
      { when: 'Afternoon', text: 'Hike the Devils Garden Trail to Landscape Arch, one of the longest natural arches in the world.' },
      { when: 'Evening', text: 'Watch Park Avenue\'s fins glow at sunset, then stargaze from the Windows.' },
    ],
  },
  'bryce-canyon': {
    npsCode: 'brca',
    oneDay: [
      { when: 'Morning', text: 'Watch sunrise light up the hoodoos from Sunrise Point. Bring a jacket, it\'s high and chilly.' },
      { when: 'Midday', text: 'Hike down among the hoodoos on the Queen\'s Garden–Navajo Loop combination.' },
      { when: 'Afternoon', text: 'Drive the 18-mile scenic road out to Rainbow Point and stop at the overlooks on the way back.' },
      { when: 'Evening', text: 'Catch sunset at Inspiration Point, then stay for some of the darkest skies in North America.' },
    ],
  },
  canyonlands: {
    npsCode: 'cany',
    oneDay: [
      { when: 'Morning', text: 'Watch sunrise glow beneath Mesa Arch in the Island in the Sky district.' },
      { when: 'Midday', text: 'Drive to Grand View Point and walk the rim trail over layers of canyons carved by the Colorado and Green Rivers.' },
      { when: 'Afternoon', text: 'Hike to the Upheaval Dome overlook and puzzle over how this strange crater formed.' },
      { when: 'Evening', text: 'Catch sunset over the Green River Overlook.' },
    ],
  },
  'capitol-reef': {
    npsCode: 'care',
    oneDay: [
      { when: 'Morning', text: 'Hike to Hickman Bridge, then stop at the Petroglyph Panel to see Fremont rock art along the boardwalk.' },
      { when: 'Midday', text: 'Wander the Fruita orchards and pick fruit in season, then grab a fresh-baked pie at the Gifford Homestead (they often sell out by early afternoon).' },
      { when: 'Afternoon', text: 'Drive the Scenic Drive and walk the narrows of Capitol Gorge or Grand Wash. Skip slot canyons if storms are around, since flash floods are a real risk.' },
      { when: 'Evening', text: 'Watch sunset from Panorama Point or the Goosenecks Overlook, then stargaze in a certified dark sky park.' },
    ],
    parkActivities: ['Apple Picking'],
  },
  zion: {
    npsCode: 'zion',
    oneDay: [
      { when: 'Morning', text: 'Take the first shuttles up the canyon to the Riverside Walk and wade into the Narrows (check flow and flash flood forecasts first).' },
      { when: 'Midday', text: 'Hike the Emerald Pools trails. Angels Landing requires a permit from the lottery.' },
      { when: 'Afternoon', text: 'Drive the Zion–Mount Carmel Highway through the historic tunnel and hike the short Canyon Overlook Trail.' },
      { when: 'Evening', text: 'Stroll the Pa\'rus Trail and watch sunset light up the Watchman from the Canyon Junction bridge.' },
    ],
  },
  'grand-teton': {
    npsCode: 'grte',
    oneDay: [
      { when: 'Morning', text: 'Catch the Tetons reflecting in the Snake River at Schwabacher Landing at sunrise.' },
      { when: 'Midday', text: 'Ride the Jenny Lake shuttle boat across and hike to Hidden Falls and Inspiration Point.' },
      { when: 'Afternoon', text: 'Photograph the historic barns of Mormon Row, then look for moose and pelicans at Oxbow Bend.' },
      { when: 'Evening', text: 'Drive up Signal Mountain for sunset over the whole range.' },
    ],
  },
  yellowstone: {
    npsCode: 'yell',
    oneDay: [
      { when: 'Morning', text: 'Watch Old Faithful erupt (check predicted times), then walk the Upper Geyser Basin boardwalks.' },
      { when: 'Midday', text: 'Hike the Fairy Falls Trail to the overlook above Grand Prismatic Spring for the full rainbow view.' },
      { when: 'Afternoon', text: 'Drive to the Grand Canyon of the Yellowstone and see Lower Falls from Artist Point.' },
      { when: 'Evening', text: 'Watch for bison, elk, and maybe wolves in Hayden Valley at dusk. Stay in your car and use binoculars!' },
    ],
  },
  glacier: {
    npsCode: 'glac',
    oneDay: [
      { when: 'Morning', text: 'Drive Going-to-the-Sun Road (seasonal, check vehicle reservation rules) and walk the Trail of the Cedars.' },
      { when: 'Midday', text: 'Continue up to Logan Pass and hike to the Hidden Lake Overlook. Look for mountain goats and bighorn sheep.' },
      { when: 'Afternoon', text: 'Descend the east side and stop at the Wild Goose Island Overlook on St. Mary Lake.' },
      { when: 'Evening', text: 'Watch sunset over the colorful stones at Lake McDonald\'s Apgar shoreline.' },
    ],
  },
  'grand-canyon': {
    npsCode: 'grca',
    oneDay: [
      { when: 'Morning', text: 'Watch sunrise from Mather Point, then hike down the South Kaibab Trail to Ooh Aah Point (remember: going down is optional, coming back up is mandatory).' },
      { when: 'Midday', text: 'Walk the Rim Trail\'s "Trail of Time" to Grand Canyon Village and its historic buildings.' },
      { when: 'Afternoon', text: 'Drive Desert View Drive to the Desert View Watchtower and its overlooks.' },
      { when: 'Evening', text: 'Ride the Hermit Road shuttle (seasonal) to Hopi Point or Mohave Point for sunset.' },
    ],
  },
  'petrified-forest': {
    npsCode: 'pefo',
    oneDay: [
      { when: 'Morning', text: 'Start at the Painted Desert overlooks and the historic Painted Desert Inn.' },
      { when: 'Midday', text: 'See the Route 66 marker, then the petroglyph-covered boulders at Newspaper Rock.' },
      { when: 'Afternoon', text: 'Walk the Blue Mesa loop through purple and blue badlands, then the Crystal Forest trail among the petrified logs.' },
      { when: 'Evening', text: 'Finish at the Giant Logs trail behind the Rainbow Forest Museum. Leave every piece of petrified wood where it lies!' },
    ],
  },
  saguaro: {
    npsCode: 'sagu',
    oneDay: [
      { when: 'Morning', text: 'Drive or bike the Cactus Forest Loop in the east (Rincon Mountain) district while it\'s cool.' },
      { when: 'Midday', text: 'Cross Tucson to the west (Tucson Mountain) district\'s Red Hills Visitor Center and Bajada Loop Drive.' },
      { when: 'Afternoon', text: 'Walk up Signal Hill to see ancient Hohokam petroglyphs, then the Valley View Overlook trail.' },
      { when: 'Evening', text: 'Watch saguaros silhouetted at sunset from Gates Pass, just outside the park.' },
    ],
  },
  'carlsbad-caverns': {
    npsCode: 'cave',
    oneDay: [
      { when: 'Morning', text: 'Walk down the Natural Entrance trail into the cave (reserve entry ahead), descending about 750 feet.' },
      { when: 'Midday', text: 'Follow the self-guided loop through the Big Room, one of the largest cave chambers in North America.' },
      { when: 'Afternoon', text: 'Drive the Walnut Canyon Desert Drive or hike a short desert trail above ground.' },
      { when: 'Evening', text: 'From late spring to fall, watch hundreds of thousands of bats spiral out of the cave at the Bat Flight Program.' },
    ],
  },
  'white-sands': {
    npsCode: 'whsa',
    oneDay: [
      { when: 'Morning', text: 'Hike the Alkali Flat Trail into the heart of the dunes before the heat. Bring plenty of water.' },
      { when: 'Midday', text: 'Drive Dunes Drive and walk the Interdune Boardwalk.' },
      { when: 'Afternoon', text: 'Buy a sled at the visitor center gift shop and sled down the gypsum dunes.' },
      { when: 'Evening', text: 'Watch the white sand turn pink and gold at sunset. Note that the park can briefly close for missile range testing.' },
    ],
  },
  chiricahua: {
    npsCode: 'chir',
    oneDay: [
      { when: 'Morning', text: 'Hike the Echo Canyon Loop (3.4 mi) while it\'s cool, winding through the Grottoes and the narrow Wall Street among towering rock spires. On some mornings a hikers\' shuttle runs up to the trailheads, so you can hike one way downhill.' },
      { when: 'Midday', text: 'Drive the 8-mile Bonita Canyon Scenic Drive up to Massai Point and walk the short nature trail for views of Cochise Head and a sea of pinnacles.' },
      { when: 'Afternoon', text: 'Explore the Faraway Ranch historic district and Stafford Cabin, or, if you have energy left, tackle Heart of Rocks to see Big Balanced Rock. Watch for coatis along the way.' },
      { when: 'Evening', text: 'Catch sunset from Massai Point, then stay for the stars. This remote corner of Arizona has some of the darkest skies around.' },
    ],
  },
  'great-basin': {
    npsCode: 'grba',
    oneDay: [
      { when: 'Morning', text: 'Take a ranger-led tour of Lehman Caves (reserve ahead).' },
      { when: 'Midday', text: 'Drive the Wheeler Peak Scenic Drive (seasonal) up to about 10,000 feet.' },
      { when: 'Afternoon', text: 'Hike the Bristlecone Trail to trees thousands of years old, or the Alpine Lakes Loop.' },
      { when: 'Evening', text: 'Stay for the stars. Great Basin has some of the darkest skies in the country and hosts astronomy programs in summer.' },
    ],
  },

  // --- Pacific ---
  yosemite: {
    npsCode: 'yose',
    oneDay: [
      { when: 'Morning', text: 'Hike the Mist Trail to Vernal Fall (expect spray in spring) before the crowds.' },
      { when: 'Midday', text: 'Walk the easy loop to Lower Yosemite Fall and picnic in the meadows below El Capitan.' },
      { when: 'Afternoon', text: 'Drive up to Glacier Point (seasonal) for the view across to Half Dome, and stop at Tunnel View on the way.' },
      { when: 'Evening', text: 'Watch sunset light up El Capitan from Valley View. Check for any reservation requirements before your trip.' },
    ],
  },
  sequoia: {
    npsCode: 'seki',
    oneDay: [
      { when: 'Morning', text: 'Visit General Sherman, the largest tree on Earth by volume, early before the crowds.' },
      { when: 'Midday', text: 'Walk the Congress Trail through the Giant Forest, then stop at the Giant Forest Museum.' },
      { when: 'Afternoon', text: 'Drive through Tunnel Log and stroll Crescent Meadow, which John Muir called the "gem of the Sierra."' },
      { when: 'Evening', text: 'Climb the stairway up Moro Rock for sunset over the Great Western Divide.' },
    ],
  },
  'kings-canyon': {
    npsCode: 'seki',
    oneDay: [
      { when: 'Morning', text: 'Walk the General Grant Tree Trail and step inside the Fallen Monarch.' },
      { when: 'Midday', text: 'Drive the Kings Canyon Scenic Byway (seasonal) down into one of the deepest canyons in North America.' },
      { when: 'Afternoon', text: 'See Roaring River Falls and walk the Zumwalt Meadow loop below towering granite walls.' },
      { when: 'Evening', text: 'Head back up to Panoramic Point for sunset over the High Sierra.' },
    ],
  },
  'death-valley': {
    npsCode: 'deva',
    oneDay: [
      { when: 'Morning', text: 'Watch sunrise paint the badlands at Zabriskie Point, then hike Golden Canyon while it\'s cool.' },
      { when: 'Midday', text: 'Stand at Badwater Basin, 282 feet below sea level. In summer, finish hiking by 10 a.m., because the heat is deadly.' },
      { when: 'Afternoon', text: 'Drive the one-way Artist\'s Drive past the colorful Artist\'s Palette.' },
      { when: 'Evening', text: 'Walk the Mesquite Flat Sand Dunes at sunset, then stargaze in a Gold Tier dark sky park.' },
    ],
  },
  'joshua-tree': {
    npsCode: 'jotr',
    oneDay: [
      { when: 'Morning', text: 'Walk the Hidden Valley loop among giant boulders and Joshua trees, then the Barker Dam trail.' },
      { when: 'Midday', text: 'Drive up to Keys View for a sweeping look over the Coachella Valley.' },
      { when: 'Afternoon', text: 'Stop at Skull Rock and Arch Rock, then the Cholla Cactus Garden boardwalk (don\'t touch!).' },
      { when: 'Evening', text: 'Watch the boulders glow at sunset, then stargaze. The park\'s dark skies are a big draw.' },
    ],
  },
  'channel-islands': {
    npsCode: 'chis',
    oneDay: [
      { when: 'Morning', text: 'Take the concessioner ferry from Ventura to Scorpion Anchorage on Santa Cruz Island and watch for dolphins on the way.' },
      { when: 'Midday', text: 'Hike the Cavern Point Loop for big ocean views, and look for the tiny island fox found nowhere else.' },
      { when: 'Afternoon', text: 'Kayak the sea caves with a guide, or hike out to Potato Harbor.' },
      { when: 'Evening', text: 'Ride the ferry back to the mainland at golden hour.' },
    ],
  },
  pinnacles: {
    npsCode: 'pinn',
    oneDay: [
      { when: 'Morning', text: 'From the east side, hike through Bear Gulch Cave (check seasonal closures for bat colonies) up to Bear Gulch Reservoir.' },
      { when: 'Midday', text: 'Continue up the High Peaks Trail\'s steep and narrow "Steep and Narrow" section among volcanic spires.' },
      { when: 'Afternoon', text: 'Scan the skies for California condors soaring over the High Peaks.' },
      { when: 'Evening', text: 'Stay for the evening astronomy programs when they\'re offered. The east and west entrances don\'t connect by road, so pick one side.' },
    ],
  },
  redwood: {
    npsCode: 'redw',
    oneDay: [
      { when: 'Morning', text: 'Walk the Lady Bird Johnson Grove loop through misty old-growth redwoods.' },
      { when: 'Midday', text: 'Visit Fern Canyon\'s 50-foot fern-covered walls. Check whether a summer permit is required.' },
      { when: 'Afternoon', text: 'Drive the Newton B. Drury Scenic Parkway and look for Roosevelt elk at Elk Prairie.' },
      { when: 'Evening', text: 'Catch sunset over the Pacific from the Klamath River Overlook, where whales sometimes pass by.' },
    ],
  },
  'lassen-volcanic': {
    npsCode: 'lavo',
    oneDay: [
      { when: 'Morning', text: 'Hike the Bumpass Hell Trail to boiling pools and hissing fumaroles. Stay on the boardwalk!' },
      { when: 'Midday', text: 'Strong hikers can climb Lassen Peak, the southernmost peak of the Cascades (snow often lingers into summer).' },
      { when: 'Afternoon', text: 'Stop at Sulphur Works to see bubbling mud pots right by the road.' },
      { when: 'Evening', text: 'Watch Lassen Peak reflect in Manzanita Lake at sunset.' },
    ],
  },
  olympic: {
    npsCode: 'olym',
    oneDay: [
      { when: 'Morning', text: 'Walk the Hall of Mosses in the Hoh Rain Forest, among moss-draped bigleaf maples.' },
      { when: 'Midday', text: 'Head to the coast and explore Ruby Beach\'s sea stacks and driftwood.' },
      { when: 'Afternoon', text: 'Look for tide pools at low tide, or hike to Marymere Falls near Lake Crescent.' },
      { when: 'Evening', text: 'Watch sunset at Rialto Beach. Olympic is huge, so pick one or two areas for a single day.' },
    ],
  },
  'mount-rainier': {
    npsCode: 'mora',
    oneDay: [
      { when: 'Morning', text: 'Drive to Paradise, stopping at Christine Falls and Narada Falls on the way up.' },
      { when: 'Midday', text: 'Hike the Skyline Trail (or the shorter Myrtle Falls walk) through wildflower meadows below the glaciers.' },
      { when: 'Afternoon', text: 'See the mountain reflected in Reflection Lakes, then stroll the paths around the Paradise Inn.' },
      { when: 'Evening', text: 'In summer, head over to Sunrise (seasonal) for alpenglow on Rainier\'s glaciers.' },
    ],
  },
  'north-cascades': {
    npsCode: 'noca',
    oneDay: [
      { when: 'Morning', text: 'Stop at the North Cascades Visitor Center in Newhalem and walk to Ladder Creek Falls.' },
      { when: 'Midday', text: 'Take in the turquoise water of Diablo Lake from the Diablo Lake Overlook.' },
      { when: 'Afternoon', text: 'Hike the Thunder Knob Trail, then continue over Highway 20 (seasonal) to the Washington Pass Overlook.' },
      { when: 'Evening', text: 'Watch Liberty Bell Mountain catch the last light from Washington Pass.' },
    ],
  },
  'crater-lake': {
    npsCode: 'crla',
    oneDay: [
      { when: 'Morning', text: 'Start at Rim Village for your first view of the deep-blue lake, then hike up Garfield Peak.' },
      { when: 'Midday', text: 'Drive Rim Drive (seasonal), stopping at Discovery Point, Phantom Ship Overlook, and Cloudcap Overlook.' },
      { when: 'Afternoon', text: 'Walk the easy trail to Plaikni Falls, and see the spires at the Pinnacles Overlook.' },
      { when: 'Evening', text: 'Hike up Watchman Peak for sunset over the lake and Wizard Island.' },
    ],
  },
  haleakala: {
    npsCode: 'hale',
    oneDay: [
      { when: 'Morning', text: 'Watch sunrise above the clouds from the summit (sunrise reservations required, and bring warm layers).' },
      { when: 'Midday', text: 'Hike a little way down the Keonehe\'ehe\'e (Sliding Sands) Trail into the colorful crater. The climb back up is tough at altitude.' },
      { when: 'Afternoon', text: 'Look for nēnē (Hawaiian geese) and rare silversword plants on the way down.' },
      { when: 'Evening', text: 'On another day, visit the Kīpahulu District on the Road to Hāna for the Pīpīwai Trail\'s bamboo forest and Waimoku Falls.' },
    ],
  },
  'hawaii-volcanoes': {
    npsCode: 'havo',
    oneDay: [
      { when: 'Morning', text: 'Stop at the Kīlauea Visitor Center for the current eruption status, then take in the caldera from Uēkahuna Overlook.' },
      { when: 'Midday', text: 'Walk through Nāhuku (Thurston Lava Tube) and along the steaming Sulphur Banks.' },
      { when: 'Afternoon', text: 'Drive Chain of Craters Road down to the sea and see the Hōlei Sea Arch.' },
      { when: 'Evening', text: 'If Kīlauea is erupting, watch the lava glow from an open overlook after dark.' },
    ],
  },
  'national-park-samoa': {
    npsCode: 'npsa',
    oneDay: [
      { when: 'Morning', text: 'Hike the Mount \'Alava Trail on Tutuila for views over Pago Pago Harbor.' },
      { when: 'Midday', text: 'Drive to the village of Vatia and see Pola Island\'s dramatic sea cliffs.' },
      { when: 'Afternoon', text: 'Walk the Lower Sauma Ridge Trail for coastal views and archeological sites.' },
      { when: 'Evening', text: 'Watch fruit bats fly at dusk. Ask about the homestay program to experience fa\'a Sāmoa (the Samoan way).' },
    ],
  },

  // --- Alaska ---
  'glacier-bay': {
    npsCode: 'glba',
    oneDay: [
      { when: 'Morning', text: 'Board the day boat from Bartlett Cove (arrive in Gustavus by plane or ferry).' },
      { when: 'Midday', text: 'Cruise up the bay past humpback whales, sea otters, and mountain goats to the tidewater glaciers.' },
      { when: 'Afternoon', text: 'Watch Margerie Glacier calve into the bay, then ride back down.' },
      { when: 'Evening', text: 'Walk the Forest Loop Trail and visit Xunaa Shuká Hít, the Huna Tlingit tribal house at Bartlett Cove.' },
    ],
  },
  denali: {
    npsCode: 'dena',
    oneDay: [
      { when: 'Morning', text: 'Ride a park bus as far as the Park Road is currently open, and look for grizzlies, caribou, moose, and Dall sheep.' },
      { when: 'Midday', text: 'Hike the Savage River Loop or the Horseshoe Lake Trail.' },
      { when: 'Afternoon', text: 'Visit the sled dog kennels, the only ones in the National Park System.' },
      { when: 'Evening', text: 'Hope for clear skies. Denali hides in the clouds most days, so a sighting is a real treat.' },
    ],
  },
  katmai: {
    npsCode: 'katm',
    oneDay: [
      { when: 'Morning', text: 'Fly by floatplane to Brooks Camp and attend the required bear safety orientation.' },
      { when: 'Midday', text: 'Watch brown bears catch leaping salmon from the Brooks Falls platform (best in July and September).' },
      { when: 'Afternoon', text: 'Check out the riverside platforms, or take the tour to the Valley of Ten Thousand Smokes when it\'s running.' },
      { when: 'Evening', text: 'Fly back, or stay at Brooks Camp to watch the bears fish into the long summer evening.' },
    ],
  },
  'kenai-fjords': {
    npsCode: 'kefj',
    oneDay: [
      { when: 'Morning', text: 'Walk to the Exit Glacier overlook near Seward, which has markers showing how far the ice has retreated.' },
      { when: 'Midday', text: 'Take a day cruise from Seward into the fjords to look for orcas, humpbacks, puffins, and sea otters.' },
      { when: 'Afternoon', text: 'Watch a tidewater glacier calve into the sea from the boat.' },
      { when: 'Evening', text: 'Strong hikers can tackle part of the Harding Icefield Trail on a separate day. It\'s steep but unforgettable.' },
    ],
  },
  'kobuk-valley': {
    npsCode: 'kova',
    oneDay: [
      { when: 'Morning', text: 'Fly from Kotzebue or Bettles with an air taxi. There are no roads into the park.' },
      { when: 'Midday', text: 'Land near the Great Kobuk Sand Dunes and walk on Arctic sand dunes above the Arctic Circle.' },
      { when: 'Afternoon', text: 'In late summer and fall, watch for caribou herds crossing the Kobuk River on their migration.' },
      { when: 'Evening', text: 'Fly back over the river valley. Weather can delay flights, so build in extra time.' },
    ],
  },
  'lake-clark': {
    npsCode: 'lacl',
    oneDay: [
      { when: 'Morning', text: 'Fly from Anchorage or Homer, by floatplane to Port Alsworth or to the coast for bear viewing.' },
      { when: 'Midday', text: 'On the coast, watch brown bears dig clams and graze sedges at Chinitna Bay or Silver Salmon Creek.' },
      { when: 'Afternoon', text: 'From Port Alsworth, hike the Tanalian Falls Trail through boreal forest.' },
      { when: 'Evening', text: 'Ask about flights to Twin Lakes to see Richard Proenneke\'s hand-built cabin.' },
    ],
  },
  'wrangell-st-elias': {
    npsCode: 'wrst',
    oneDay: [
      { when: 'Morning', text: 'Drive (slowly!) the gravel McCarthy Road, or fly in, then cross the footbridge toward Kennecott.' },
      { when: 'Midday', text: 'Tour the towering red Kennecott copper mill buildings (concession tour).' },
      { when: 'Afternoon', text: 'Walk the Root Glacier Trail. Go with a guide and crampons if you want to step onto the ice.' },
      { when: 'Evening', text: 'Take a flightseeing trip over the largest national park in the U.S. if weather allows.' },
    ],
  },
  'gates-arctic': {
    npsCode: 'gaar',
    oneDay: [
      { when: 'Morning', text: 'Fly from Bettles or Coldfoot with an air taxi. There are no roads or trails in the park.' },
      { when: 'Midday', text: 'Land on a lake or gravel bar and wander the open tundra.' },
      { when: 'Afternoon', text: 'Flightsee over the granite spires of the Arrigetch Peaks and the Brooks Range.' },
      { when: 'Evening', text: 'Fly back under the midnight sun in summer. A day visit is a taste, and most visitors come for multi-day trips.' },
    ],
  },
};

export const getParkGuide = (parkId: string): ParkGuide | undefined => PARK_GUIDES[parkId];
