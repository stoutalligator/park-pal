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

---

## Moose mascot + Park Pals roster (replacing the bear)

The fixed brand mascot is being redesigned from a bear to a moose — partly a style refresh, partly to move away from the current ranger-hat-and-vest look reading too close to Smokey Bear (whose likeness is protected by its own federal statute, the Smokey Bear Act). A moose sidesteps that entirely.

The moose replaces every file in `src/assets/mascot/` and stays the one consistent "face of the app" on branding surfaces (welcome, profile hero, log-trip header, empty states). The activity avatar picker (`AVATAR_OPTIONS` in `ProfileScreen.tsx`, currently 15 bear-doing-an-activity poses) is being redone as an assortment of different animals — "Park Pals" — one species per activity, so users pick a companion rather than just a pose of the same character. See the **Park Pals roster** section below for that. `badge-adventure-awaits.png` is left as-is for now — it's a plain generic bear illustration, not tied to the mascot's specific design, so there's less pressure to swap it in this pass.

**Base character block — paste into every prompt in this section, unedited, so the moose stays the same character across all 8 mascot images:**

> Warm, hand-drawn vintage national-park-poster illustration style. Flat color fills only, no gradients, no photorealism, no drop shadows baked into the art. Consistent medium-weight rounded outline in dark brown (#8B6340) or forest green (#2D5016). Palette limited to: forest #2D5016, sage #6B8C5A, sky #A8C5D4, tan #C9A96E, orange #D4845A, rose #C4847A, brown #8B6340, cream #F5F0E8, dark brown #5C4028. No text, no emoji, no generic vector-icon-font look.
>
> Character: a friendly cartoon moose mascot for a national-parks app, matching the same soft plush-toy appeal as this app's existing bear mascot art. Broad flat brown antlers, warm brown fur, lighter tan muzzle and chest patch, a small warm smile, stocky rounded toddler-like proportions (not realistic moose anatomy — cute and huggable, like a plush toy). Eyes are large, round, solid black, set close together and slightly forward on the face, each with a single small white highlight dot/glint near the upper edge — soft and big-eyed, not almond-shaped or realistic. Wears a tan flat-brim ranger hat with a forest-green band and a small pine-tree badge pin, plus a forest-green neckerchief. The hat sits back on the head / the antlers come up and out through cutouts in the brim, so both the hat and the full antler silhouette stay visible and read clearly. Keep proportions, fur color, eyes, hat, and neckerchief identical across every image in this batch.

**Reference sheet (generate this one first, use it as your visual anchor/reference image for every batch below):**

> [base character block] + Character turnaround sheet on a fully transparent background (no background color, no ground shadow, no scenery): three full-body poses of the moose side by side — front view, 3/4 view, and side view — standing neutrally, arms at sides, no props. This is a model sheet for maintaining consistency, not a final in-app asset.

### Expressions → `src/assets/mascot/mascot-<pose>.png`

**Spec per cell:** head-and-shoulders bust crop, transparent background, roughly square-ish (~94x114px final, but generate large and downscale).

Generate in **two batches of 3** (mirrors the park-icons batch workflow — one wide image with multiple bordered/transparent cells side by side, then crop each cell out and resize/pad to match the existing mascot file dimensions before saving over the old bear version).

**Batch 1 — happy / excited / thinking:**

> [base character block] + Compose a single wide image containing 3 separate cells side by side, evenly spaced, each on its own transparent background, no dividers or borders drawn between them. Cell 1: head-and-shoulders bust of the moose smiling warmly, a calm happy expression. Cell 2: head-and-shoulders bust of the moose with a big excited open-mouth smile and bright eyes. Cell 3: head-and-shoulders bust of the moose with one eyebrow raised and hoof-equivalent touching its chin, a thoughtful expression. Identical proportions, fur color, hat, and neckerchief in all 3 cells.

**Batch 2 — exploring / success / tip:**

> [base character block] + Compose a single wide image containing 3 separate cells side by side, evenly spaced, each on its own transparent background, no dividers or borders drawn between them. Cell 1: head-and-shoulders bust of the moose looking off to one side with a curious, alert expression, as if spotting something in the distance. Cell 2: head-and-shoulders bust of the moose with eyes closed and a proud, satisfied smile, as if celebrating an accomplishment. Cell 3: head-and-shoulders bust of the moose with a raised eyebrow and a knowing half-smile, one hoof-equivalent raised near its face as if about to share a helpful tip. Identical proportions, fur color, hat, and neckerchief in all 3 cells.

Map cells back to files in this order: Batch 1 → `mascot-happy.png`, `mascot-excited.png`, `mascot-thinking.png`. Batch 2 → `mascot-exploring.png`, `mascot-success.png`, `mascot-tip.png`.

### Full-body ranger pose → `mascot-ranger-full.png`

**Spec:** tall portrait crop, transparent background, standing on a small ground shadow (~241x415px final).

> [base character block] + Full-body standing pose, one arm raised in a friendly wave, the other at its side. Forest-green ranger vest with a small badge over the chest, tan flat-brim hat with antlers coming through, neckerchief. Standing on a small soft ground shadow, transparent background, single subject only.

### Hero/title scene → `bear-title-scene.png` (rename to `moose-title-scene.png`)

**Spec:** portrait scene, opaque background, roughly 2:3 (e.g. 1024x1536).

> [base character block] + Full illustrated landscape scene, portrait orientation: the moose standing on a mountain trail holding an open paper map in one hoof-equivalent, a small canvas backpack on its back, tall pine trees framing both sides of the frame, a calm lake and a snow-capped mountain peak in the background, warm golden-hour lighting. Single subject, no other animals or characters in frame.

### Cropping workflow for the moose set above (same as the park-icons batch swap)

1. Generate each batch image (one request per batch, per the grids above).
2. Crop each cell out by its transparent-alpha bounding box (`Image.getbbox()` per column works well when cells are laid out in a single row with clear gaps).
3. Pad to a square/target aspect if needed, then resize to match the existing file's original dimensions so nothing shifts in the app's layout.
4. Save over the corresponding file path, renaming `bear-*` → `moose-*` and updating the `require(...)` paths in `ProfileScreen.tsx` (`AVATAR_OPTIONS`) and wherever `bear-title-scene.png` is referenced.

---

## Park Pals roster (activity avatar picker → assortment of animals)

Replaces `src/assets/activities/bear-<activity>.png` (all 15 files) with a roster of different animal companions, one species per activity, instead of 15 poses of the same character. The moose above stays the one fixed mascot for branding surfaces; this roster is specifically for the picker in `AVATAR_OPTIONS`.

**Shared style block — paste into every prompt below, unedited, so every animal reads as part of the same family despite being different species:**

> Warm, hand-drawn vintage national-park-poster illustration style. Flat color fills only, no gradients, no photorealism, no drop shadows baked into the art. Consistent medium-weight rounded outline in dark brown (#8B6340) or forest green (#2D5016). Palette limited to: forest #2D5016, sage #6B8C5A, sky #A8C5D4, tan #C9A96E, orange #D4845A, rose #C4847A, brown #8B6340, cream #F5F0E8, dark brown #5C4028 (plus natural fur/feather tones within that same warm, muted family — no saturated or neon colors). No text, no emoji, no generic vector-icon-font look. Every animal shares the same cute character-design language: stocky rounded toddler-like proportions (not realistic animal anatomy — cute and huggable, like a plush toy), and large round solid-black eyes set close together and slightly forward on the face, each with a single small white highlight dot/glint near the upper edge. Full-body pose. Background must be fully transparent (alpha 0) outside of the character and the specific pose objects named per cell (e.g. a tent, a kayak, a rock face, a picnic blanket) — no sky, no ground plane or horizon line, no filler scenery behind the subject, and no drop shadow floating separately underneath.

**Roster — species assigned per activity:**

| Activity | Species | Pose |
|---|---|---|
| hiking | Mountain goat | walking a trail with a wooden hiking staff, small canvas backpack |
| camping | Raccoon | sitting beside a small pitched tent and a glowing campfire |
| wildlife-viewing | Fox | holding a pair of binoculars up, looking off to one side |
| kayaking | River otter | sitting in a small orange kayak, paddle in hand, life vest on |
| scenic-drive | Chipmunk | sitting in the driver's seat of a small vintage car, top down |
| photography | Owl | holding a vintage camera up to one eye, about to take a photo |
| backpacking | Bison | walking with a large full-size hiking backpack and rolled sleeping mat |
| stargazing | Porcupine | lying on its back on a small blanket, looking up at a few stars |
| fishing | Bear | standing at a riverbank holding a fishing rod, line cast into the water |
| horseback-riding | Badger | walking and leading a small brown horse by its reins, walking beside it |
| nature-walk | Squirrel | walking calmly on a flat path, one paw gesturing at a flower beside the trail |
| waterfall-hike | Heron | standing at the base of a small waterfall looking up, light mist around its feet |
| picnic | Beaver | sitting behind a small picnic blanket with a basket and an apple |
| rock-climbing | Bighorn sheep | mid-climb on a small rock face, sure-footed pose |
| winter-activity | Snowshoe hare | wearing a knit scarf, standing in light snow, small snowshoes on its feet |

Generate in **4 batches of ~4**, same wide-grid-then-crop workflow as the moose sets — each cell in a batch is a *different* species this time, so call out each animal by name in its own cell description:

**Batch 1 — hiking (mountain goat) / camping (raccoon) / wildlife-viewing (fox) / kayaking (otter):**

> [shared style block] + Compose a single wide image containing 4 separate cells side by side, evenly spaced, each on its own fully transparent background (alpha 0 outside the character and its named pose object — no sky, no ground plane, no filler scenery, no separate drop shadow), no dividers or borders. Cell 1: a mountain goat with shaggy white fur, small black horns, walking a trail with a wooden hiking staff and a small canvas backpack. Cell 2: a brown-and-tan raccoon with its signature dark eye mask, sitting beside a small pitched tent and a glowing campfire. Cell 3: an orange-and-cream fox holding a pair of binoculars up, looking off to one side with a curious expression. Cell 4: a brown river otter with a lighter tan belly, sitting in a small orange kayak, paddle in hand, wearing a life vest. Each animal keeps its own natural coloring, but all four share the same big-eyed cute proportions and line-weight style.

**Batch 2 — scenic-drive (chipmunk) / photography (owl) / backpacking (bison) / stargazing (porcupine):**

> [shared style block] + Compose a single wide image containing 4 separate cells side by side, evenly spaced, each on its own fully transparent background (alpha 0 outside the character and its named pose object — no sky, no ground plane, no filler scenery, no separate drop shadow), no dividers or borders. Cell 1: a small brown-and-tan striped chipmunk sitting in the driver's seat of a small vintage car with the top down, one paw resting on the door. Cell 2: a tan-and-brown owl holding a vintage camera up to one eye, about to take a photo. Cell 3: a sturdy brown bison walking with a large full-size hiking backpack and a rolled sleeping mat strapped to it. Cell 4: a round brown porcupine with soft-looking tan-tipped quills, lying on its back on a small blanket, looking up at a few small stars. Each animal keeps its own natural coloring, but all four share the same big-eyed cute proportions and line-weight style.

**Batch 3 — fishing (bear) / horseback-riding (badger) / nature-walk (squirrel) / waterfall-hike (heron):**

> [shared style block] + Compose a single wide image containing 4 separate cells side by side, evenly spaced, each on its own fully transparent background (alpha 0 outside the character and its named pose object — no sky, no ground plane, no filler scenery, no separate drop shadow), no dividers or borders. Cell 1: a brown bear standing at a riverbank holding a fishing rod, line cast into the water. Cell 2: a gray-and-black badger walking and leading a small brown horse by its reins, walking beside it rather than riding it. Cell 3: a reddish-brown squirrel with a big fluffy tail, walking calmly on a flat nature path, one paw gesturing at a small flower beside the trail. Cell 4: a blue-gray heron standing at the base of a small waterfall, looking up at it, a light mist effect around its feet. Each animal keeps its own natural coloring, but all four share the same big-eyed cute proportions and line-weight style.

**Batch 4 — picnic (beaver) / rock-climbing (bighorn sheep) / winter-activity (snowshoe hare):**

> [shared style block] + Compose a single wide image containing 3 separate cells side by side, evenly spaced, each on its own fully transparent background (alpha 0 outside the character and its named pose object — no sky, no ground plane, no filler scenery, no separate drop shadow), no dividers or borders. Cell 1: a brown beaver with a flat tail, sitting behind a small picnic blanket with a basket and an apple. Cell 2: a cream-and-brown bighorn sheep with large curled horns, mid-climb on a small rock face. Cell 3: a white snowshoe hare wearing a knit scarf, standing in light snow, small snowshoes on its feet. Each animal keeps its own natural coloring, but all three share the same big-eyed cute proportions and line-weight style.

Map cells back to files in this order: Batch 1 → `pal-hiking.png`, `pal-camping.png`, `pal-wildlife-viewing.png`, `pal-kayaking.png`. Batch 2 → `pal-scenic-drive.png`, `pal-photography.png`, `pal-backpacking.png`, `pal-stargazing.png`. Batch 3 → `pal-fishing.png`, `pal-horseback-riding.png`, `pal-nature-walk.png`, `pal-waterfall-hike.png`. Batch 4 → `pal-picnic.png`, `pal-rock-climbing.png`, `pal-winter-activity.png`.

### Cropping workflow (same as the park-icons batch swap)

1. Generate each batch image (one request per batch, per the grids above).
2. Crop each cell out by its transparent-alpha bounding box (`Image.getbbox()` per column works well when cells are laid out in a single row with clear gaps).
3. Pad to a square/target aspect if needed, then resize to match the existing activity-icon dimensions (~246x273px) so nothing shifts in the avatar-picker layout.
4. Save to `src/assets/activities/pal-<activity>.png`, replacing the old `bear-<activity>.png` files, and update the `require(...)` paths in `ProfileScreen.tsx`'s `AVATAR_OPTIONS`.

---

## Bonus / badge-unlocked pals

Beyond the default 15-activity roster, some pals are unlocked by earning a specific badge instead of being available from the start — a reward layer on top of the picker. These need their own distinct design so they read as a "get" rather than a reskin of an existing default pal.

**Spec:** same as the roster above — full-body pose, fully transparent background (alpha 0 outside the character and its named pose object, no sky/ground/scenery/drop shadow), target ~240x250px to match the other `pal-*.png` files.

### Channel Island Fox → `src/assets/activities/pal-channel-islands-fox.png`

Unlocked by the existing `channel-islands-fox` badge ("Island Fox Friend"). Must be visibly distinct from the default `wildlife-viewing` pal, which is already a bright orange-and-cream fox holding binoculars — this one needs different coloring and a different pose/prop so the unlock feels like a real reward, not a duplicate.

Real Channel Island foxes (Urocyon littoralis) are notably smaller and grayer than a typical red fox: a gray back, rusty-orange sides and legs, cream/white throat and belly, and a bushy tail with a dark tip — distinct from a standard orange fox. `src/assets/badges/badge-channel-islands-fox.png` already shows this coloring/coastal vibe for reference.

> [shared style block from the Park Pals roster above] + A gray-and-tan Channel Island fox — grayer back, rusty-orange sides and legs, cream throat and belly, bushy dark-tipped tail, clearly different coloring from a standard orange fox. Standing or sitting beside a small coastal prop (a piece of driftwood, a tuft of coastal grass, or a small seashell) to tie it to a Channel Islands setting. Same big-eyed cute plush-toy proportions and line-weight style as the rest of the roster.

---

## App Icon, Splash & Adaptive Icon (moose face)

These live in `assets/` at the project root — **not** `src/assets/` — so they were missed by the mascot swap and still show the old bear-in-a-ranger-hat. This is the single most visible asset in the whole app (App Store listing thumbnail, home screen icon, splash screen), so it's worth getting right.

Files to replace, what each needs, and Apple/Android's actual constraints:

| File | Size | Alpha? | Notes |
|---|---|---|---|
| `assets/icon.png` | 1024x1024 | **No** — must be fully opaque | This is the App Store / iOS home-screen icon. Apple applies its own rounded-corner mask, so don't round the corners yourself, and don't rely on transparency — flatten it onto a solid background. No text (App Store rejects icons with baked-in text/UI chrome). Must read clearly at very small sizes (down to ~40px), so keep it to one simple, centered subject. |
| `assets/splash-icon.png` | 1024x1024 | Yes — transparent | Shown centered over a solid `#F5F0E8` background per `app.json`'s `expo-splash-screen` config, at 200px wide. Just the character, no background art. |
| `assets/android-icon-foreground.png` | 512x512 | Yes — transparent | The foreground layer of Android's adaptive icon; pairs with `assets/android-icon-background.png` (a plain cream `#EAD9B7` fill — no change needed there). Keep the subject within the center ~66% of the frame — Android crops adaptive icon foregrounds more aggressively than a normal square icon (circle/squircle/rounded-square masks vary by launcher). |
| `assets/favicon.png` | 48x48 | Yes — transparent | Web favicon. Small enough that it can just be a downscaled crop of the same source art rather than a separate generation. |
| `assets/android-icon-monochrome.png` | 432x432 | Yes — transparent, single color | Optional (Android 13+ themed-icon support only). A plain white silhouette of the same subject, no color/shading — lowest priority of this set, fine to skip for now. |

**Base prompt (generate one clean, centered moose face/bust — this single source image can be cropped/re-exported for every file above except the monochrome one):**

> Warm, hand-drawn vintage national-park-poster illustration style, **flat color fills only — no hatching, no fur-texture linework, no cross-hatching, no shading strokes inside the fur**, no gradients, no photorealism. Consistent medium-weight rounded outline in dark brown (#8B6340), the same simple flat-shaded rendering used in the existing files `src/assets/mascot/mascot-happy.png` and `src/assets/mascot/mascot-excited.png` — match that exact flatness, not a more detailed/illustrated style. Palette limited to: forest #2D5016, sage #6B8C5A, tan #C9A96E, brown #8B6340, cream #F5F0E8, dark brown #5C4028 (plus the moose's own warm brown fur tones, as flat blocks of color, not textured strokes).
>
> A friendly cartoon moose mascot head-and-shoulders bust, facing forward, perfectly centered — broad flat brown antlers, warm brown fur, lighter tan muzzle and chest patch, a small warm smile, large round solid-black eyes set close together and slightly forward on the face, each with a single small white highlight dot/glint. Forest-green neckerchief. No hat (the antlers are the focal silhouette).
>
> **Composition — this is the part to get exactly right:** the background must be a single, completely flat, solid color filling the ENTIRE square canvas edge to edge — no circle, no badge shape, no vignette, no framing device, no gradient, no mountains, no lake, no pine trees, no scenery of any kind behind the character. Just flat color and the moose, nothing else. Leave generous empty background margin on all four sides — the moose (including the antler tips) should occupy roughly the center 70% of the frame, with at least 12-15% clear background padding on every side, so nothing touches or crowds the edges. Square canvas, 1024x1024. No text, no other characters, no logos.

Generate it twice — once with the background as **solid cream (#F5F0E8)** (crops straight to `assets/icon.png`, no alpha needed), and once with a **fully transparent background** instead of the solid color (crops to `assets/splash-icon.png`, `assets/android-icon-foreground.png`, and `assets/favicon.png`).

After generating, check before cropping: (1) the background is one flat color/transparent with zero scenery or framing shapes, (2) there's real breathing room between the antlers and every edge — if either of those isn't true, regenerate rather than trying to crop around it, since padding can't be added after the fact without shrinking the subject relative to the frame. Once confirmed, center the bust on the target canvas size for each file (contain-fit, not stretched), and for `icon.png` specifically, flatten onto the solid cream background if any transparency slipped in — the App Store rejects icons with an alpha channel.

---

## Animal rarity hero scenes (Compendium upgrade placeholder)

Part of the planned Animal Compendium detail-page upgrade (currently just a concept — nothing in the app references these files yet). Instead of a bespoke illustration per animal (516 entries, not realistic to hand-draw individually), each animal detail page's hero banner falls back to one of **3 shared scene images**, chosen by the animal's existing `rarity` field (`Common` | `Uncommon` | `Rare` — see `AnimalRarity` in `src/types/index.ts`). The scene should telegraph "how special this sighting is" through mood/lighting rather than depicting any specific species, since one image has to sit behind dozens of different animals.

These reuse the same rarity accent colors already live in the app's UI (`RARITY_COLOR` in `ParkAnimalsScreen.tsx`): sage for Common, orange for Uncommon, rose for Rare.

**Spec:** 1024x480px (wide banner, ~2.13:1), **opaque background** (this is a full-bleed banner behind a name/stat overlay, not a floating character — no transparency needed). No animal, no character, no text — just an illustrated landscape/atmosphere scene.

**Base style block — paste into every prompt below, unedited:**

> Illustrated landscape scene in a hand-drawn field-journal / vintage-national-park-poster style. Flat color fills only, no gradients, no photorealism, no photographic texture. Palette limited to: forest #2D5016, sage #6B8C5A, sky #A8C5D4, tan #C9A96E, orange #D4845A, rose #C4847A, brown #8B6340, cream #F5F0E8, dark brown #5C4028. Wide landscape banner, 1024x480, fully opaque background filling the entire frame edge to edge. No animals, no people, no text, no logos — atmosphere and scenery only, generic enough to sit behind any park's wildlife.

**Common → `rarity-common.png`** (sage-toned, everyday/easygoing mood):

> [base style block] + A calm, sunlit meadow at midday: rolling grassy hills, a few scattered wildflowers, a light scattering of trees at the horizon, soft even daylight. Dominant color family: sage green and cream, with tan accents. Approachable and ordinary — the kind of place you'd casually spot common wildlife.

**Uncommon → `rarity-uncommon.png`** (orange-toned, golden-hour mood):

> [base style block] + A golden-hour hillside or ridge at sunset: warm orange sky, long soft shadows, a tree line silhouetted against the glow. Dominant color family: orange and tan, with touches of brown. A little more dramatic and specific in timing than the Common scene — the kind of moment you'd have to be in the right place at the right time to catch.

**Rare → `rarity-rare.png`** (rose-toned, dusk/night mood):

> [base style block] + A dusk or nighttime wilderness scene: a deep rose-and-purple sky, a few stars or a crescent moon, misty mountain silhouettes layered in the distance. Dominant color family: rose and dark brown, with small hints of sky blue. The most atmospheric and moody of the three — reserved, elusive, worth the wait.

### Usage once ready

Save all three to a new `src/assets/animals/` folder (opaque scene art, matching the `src/assets/textures/` and `src/assets/maps/` convention of not needing transparency). Nothing wires these in automatically — flag when they're ready and they'll get connected to the animal detail screen via the existing `rarity` field, once that screen exists.