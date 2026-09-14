# Park Pal — Asset Generation Prompts

Reference sheet for generating illustrated park icons and badge art outside the repo (Midjourney, DALL-E, etc.) so everything stays visually consistent. Paste the **base style block** for the category, then swap in the `[SUBJECT]` from the tables below.

Placeholder art already generated in-repo by `svg-creator` follows these same specs — use this doc when you want to replace a placeholder with something more detailed/bespoke later.

---

## Park icons (map pins / list thumbnails)

**Spec:** 512x512px, transparent background, subject centered with even padding (crops to a circle in the app — keep the subject readable inside a circular mask).

**Base style block:**

> Illustrated icon in a hand-drawn field-journal / vintage national-park-poster style. Flat color fills only, no gradients, no photorealism, no drop shadows. Consistent medium-weight rounded outline in dark brown (#8B6340) or forest green (#2D5016). Palette limited to: forest #2D5016, sage #6B8C5A, sky #A8C5D4, tan #C9A96E, orange #D4845A, rose #C4847A, brown #8B6340, cream #F5F0E8. Square canvas, 512x512, transparent background, subject centered and filling most of the frame since it will be cropped to a circle. No text, no emoji, no generic vector-icon-font look — warm and slightly whimsical. Subject: [SUBJECT]

**Already have real art (skip unless replacing):** `acadia`, `arches`, `badlands` — and `big-bend` (drawn but not yet wired into the app).

| Park id | Subject |
|---|---|
| shenandoah | layered blue ridge mountains with a winding road cutting across |
| new-river-gorge | a steel arch bridge spanning a deep river gorge |
| great-smoky | misty layered mountain ridges at sunrise |
| biscayne | a coral reef with a small fish, mostly turquoise water |
| dry-tortugas | a brick coastal fort surrounded by turquoise water |
| everglades | sawgrass marsh with a mangrove tree and a heron |
| congaree | tall bottomland trees over a wooden boardwalk |
| mammoth-cave | a cave entrance with stalactites |
| virgin-islands | a palm tree on a white-sand beach with turquoise water |
| cuyahoga-valley | a waterfall tumbling through rolling green hills |
| indiana-dunes | a sand dune rising beside a lake |
| isle-royale | a forested island in a lake with a moose silhouette |
| voyageurs | a canoe on interconnected lakes |
| wind-cave | underground boxwork cave formations |
| theodore-roosevelt | a badlands butte with a bison silhouette |
| guadalupe-mountains | a jagged fossil-reef mountain ridge |
| hot-springs | a historic bathhouse with rising steam |
| rocky-mountain | a snow-capped peak reflected in an alpine lake |
| black-canyon | a narrow, dark, dramatic river canyon |
| great-sand-dunes | a tall sand dune with mountains behind it |
| mesa-verde | an ancient cliff dwelling tucked into a canyon wall |
| bryce-canyon | a cluster of orange and white hoodoo spires |
| canyonlands | layered mesas and canyons carved by rivers |
| capitol-reef | a twisted red-rock dome formation |
| zion | towering red cliffs framing a narrow slot canyon |
| grand-teton | a jagged mountain peak reflected in a still lake |
| yellowstone | a geyser erupting against a blue sky |
| glacier | a glacier-capped peak above a turquoise lake |
| glacier-bay | a tidewater glacier calving into an emerald bay |
| grand-canyon | a deep, layered canyon with a river winding through it |
| petrified-forest | a fallen, colorfully banded petrified log |
| saguaro | a giant saguaro cactus against a desert sunset |
| carlsbad-caverns | an underground chamber with dramatic stalactites |
| white-sands | rolling white gypsum sand dunes |
| great-basin | a lone bristlecone pine on a high desert ridge |
| yosemite | a granite cliff face with a waterfall beside it |
| sequoia | the trunk and canopy of a giant sequoia tree |
| kings-canyon | a deep forested canyon with a river below |
| death-valley | cracked desert salt flats under a hot sun |
| joshua-tree | a twisted Joshua tree silhouette at dusk |
| channel-islands | sea cliffs and an island fox by the shoreline |
| pinnacles | volcanic rock spires with a condor circling above |
| redwood | tall foggy redwood trees viewed from below |
| lassen-volcanic | a steaming volcanic peak with a mud pot |
| olympic | a mossy rainforest with a glacier-capped peak behind it |
| mount-rainier | a snow-draped volcano above a wildflower meadow |
| north-cascades | jagged, glaciated mountain peaks |
| crater-lake | a deep blue caldera lake ringed by cliffs |
| haleakala | a volcanic crater glowing at sunrise |
| hawaii-volcanoes | a glowing lava flow at night |
| national-park-samoa | a tropical rainforest coastline with palm trees |
| denali | a massive snow peak above tundra with a grizzly bear |
| katmai | a brown bear catching salmon at a waterfall |
| kenai-fjords | a glacier meeting the ocean with an orca breaching |
| kobuk-valley | arctic sand dunes under a pale sky |
| lake-clark | a volcano rising above a still wilderness lake |
| wrangell-st-elias | a massive glacier winding between huge mountains |
| gates-arctic | remote, roadless tundra mountains |
| gateway-arch | a tall stainless steel arch over a riverfront skyline |

---

## Badges (achievement stickers)

**Spec:** 512x512px, transparent background, circular or shield-shaped badge centered with even padding.

**Base style block:**

> Illustrated achievement badge in a hand-drawn field-journal / vintage-park-poster style. Circular or shield-shaped sticker, flat color fills only, no gradients, no photorealism. Consistent medium-weight rounded outline in dark brown (#8B6340) or forest green (#2D5016), occasional single-tone shading only. Palette limited to: forest #2D5016, sage #6B8C5A, sky #A8C5D4, tan #C9A96E, orange #D4845A, rose #C4847A, brown #8B6340, cream #F5F0E8. Square canvas, 512x512, transparent background, badge centered and filling most of the frame. No text baked into the image, no emoji, no generic vector-icon look — collectible passport-stamp aesthetic. Subject: [SUBJECT]


| Badge id | Name | Subject |
|---|---|---|
| first-park | First Steps | beginning of a trail with boot prints |
| parks-5 | Park Hopper | two parks showing a change between the two |
| parks-10 | Trail Seeker | binocculars looking towards a trail |
| parks-25 | Ranger in Training | a ranger hat with a small cluster of stars |
| parks-50 | Park Legend | a shield with a laurel wreath |
| parks-all | Ultimate Ranger | an open passport book stamped with a mountain crest |
| hiker | Trail Blazer | a hiking boot mid-stride on a dirt trail |
| camper | Night Under Stars | a tent glowing under a starry sky |
| wildlife | Wildlife Spotter | binoculars with a paw print beside them |
| photographer | Nature Lens | a vintage camera with a mountain reflected in the lens |
| sunrise | Sunrise Chaser | the sun rising over a mountain ridge |
| road-tripper | Road Tripper | a winding road disappearing toward distant peaks |
| mountain-region | Mountain Lover | a snow-capped mountain range |
| northeast-region | New England Explorer | a pine tree beside a small lighthouse |
| utah-five | Mighty Five | five small red-rock arches in a row |
| coastal | Coastal Explorer | a cresting wave with a seashell |
| memory-keeper | Memory Keeper | an open journal with a pen resting across it |
| adventure-awaits | Adventure Awaits | the bear mascot wearing a small backpack |
| miles-25 | First Steps Forward | a small trail marker post |
| miles-100 | Century Hiker | a trail marker post with a hiking boot beside it |
| miles-250 | Long Hauler | a winding trail with distance markers |
| miles-500 | Distance Master | a mountain trail with a flag at the summit |
| miles-1000 | Thousand Mile Club | a compass rose with a trail winding through it |
| elevation-1000 | Uphill Climber | a small hill with an upward arrow |
| elevation-5000 | Peak Seeker | a mountain peak with a small flag |
| elevation-15000 | Summit Chaser | a snow-capped peak with a climbing rope |
| elevation-30000 | High Altitude Hero | a mountain summit with sun rays behind it |
| elevation-60000 | Sky Conqueror | a mountain range silhouette against a starry sky |
| channel-islands-fox | Island Fox Friend | an illustrated island fox sitting on a coastal bluff |
| near-death | Near Death | a chain-link handhold on a narrow cliffside trail |
| night-owl (secret) | Night Owl | an owl perched under a crescent moon and stars |
| globe-trotter (secret) | Globe Trotter | a globe with two location pins, one near Alaska one near Hawaii |
| perfect-trip (secret) | Perfect Trip | a five-star ribbon beside a camera and journal |
