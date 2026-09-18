# Park Pals roster (activity avatar picker → assortment of animals)

Replaces `src/assets/activities/bear-<activity>.png` (all 15 files) with a roster of different animal companions, one species per activity, instead of 15 poses of the same character. The moose in [moose-mascot.md](moose-mascot.md) stays the one fixed mascot for branding surfaces; this roster is specifically for the picker in `AVATAR_OPTIONS`.

Badge-unlocked pals (Island Fox, Puffin, ...) are a separate reward layer — see [unlockable-pals.md](unlockable-pals.md). They reuse the shared style block below.

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

Generate in **4 batches of ~4**, wide-grid-then-crop workflow — each cell in a batch is a *different* species, so call out each animal by name in its own cell description:

**Batch 1 — hiking (mountain goat) / camping (raccoon) / wildlife-viewing (fox) / kayaking (otter):**

> [shared style block] + Compose a single wide image containing 4 separate cells side by side, evenly spaced, each on its own fully transparent background (alpha 0 outside the character and its named pose object — no sky, no ground plane, no filler scenery, no separate drop shadow), no dividers or borders. Cell 1: a mountain goat with shaggy white fur, small black horns, walking a trail with a wooden hiking staff and a small canvas backpack. Cell 2: a brown-and-tan raccoon with its signature dark eye mask, sitting beside a small pitched tent and a glowing campfire. Cell 3: an orange-and-cream fox holding a pair of binoculars up, looking off to one side with a curious expression. Cell 4: a brown river otter with a lighter tan belly, sitting in a small orange kayak, paddle in hand, wearing a life vest. Each animal keeps its own natural coloring, but all four share the same big-eyed cute proportions and line-weight style.

**Batch 2 — scenic-drive (chipmunk) / photography (owl) / backpacking (bison) / stargazing (porcupine):**

> [shared style block] + Compose a single wide image containing 4 separate cells side by side, evenly spaced, each on its own fully transparent background (alpha 0 outside the character and its named pose object — no sky, no ground plane, no filler scenery, no separate drop shadow), no dividers or borders. Cell 1: a small brown-and-tan striped chipmunk sitting in the driver's seat of a small vintage car with the top down, one paw resting on the door. Cell 2: a tan-and-brown owl holding a vintage camera up to one eye, about to take a photo. Cell 3: a sturdy brown bison walking with a large full-size hiking backpack and a rolled sleeping mat strapped to it. Cell 4: a round brown porcupine with soft-looking tan-tipped quills, lying on its back on a small blanket, looking up at a few small stars. Each animal keeps its own natural coloring, but all four share the same big-eyed cute proportions and line-weight style.

**Batch 3 — fishing (bear) / horseback-riding (badger) / nature-walk (squirrel) / waterfall-hike (heron):**

> [shared style block] + Compose a single wide image containing 4 separate cells side by side, evenly spaced, each on its own fully transparent background (alpha 0 outside the character and its named pose object — no sky, no ground plane, no filler scenery, no separate drop shadow), no dividers or borders. Cell 1: a brown bear standing at a riverbank holding a fishing rod, line cast into the water. Cell 2: a gray-and-black badger walking and leading a small brown horse by its reins, walking beside it rather than riding it. Cell 3: a reddish-brown squirrel with a big fluffy tail, walking calmly on a flat nature path, one paw gesturing at a small flower beside the trail. Cell 4: a blue-gray heron standing at the base of a small waterfall, looking up at it, a light mist effect around its feet. Each animal keeps its own natural coloring, but all four share the same big-eyed cute proportions and line-weight style.

**Batch 4 — picnic (beaver) / rock-climbing (bighorn sheep) / winter-activity (snowshoe hare):**

> [shared style block] + Compose a single wide image containing 3 separate cells side by side, evenly spaced, each on its own fully transparent background (alpha 0 outside the character and its named pose object — no sky, no ground plane, no filler scenery, no separate drop shadow), no dividers or borders. Cell 1: a brown beaver with a flat tail, sitting behind a small picnic blanket with a basket and an apple. Cell 2: a cream-and-brown bighorn sheep with large curled horns, mid-climb on a small rock face. Cell 3: a white snowshoe hare wearing a knit scarf, standing in light snow, small snowshoes on its feet. Each animal keeps its own natural coloring, but all three share the same big-eyed cute proportions and line-weight style.

Map cells back to files in this order: Batch 1 → `pal-hiking.png`, `pal-camping.png`, `pal-wildlife-viewing.png`, `pal-kayaking.png`. Batch 2 → `pal-scenic-drive.png`, `pal-photography.png`, `pal-backpacking.png`, `pal-stargazing.png`. Batch 3 → `pal-fishing.png`, `pal-horseback-riding.png`, `pal-nature-walk.png`, `pal-waterfall-hike.png`. Batch 4 → `pal-picnic.png`, `pal-rock-climbing.png`, `pal-winter-activity.png`.

## Cropping workflow

1. Generate each batch image (one request per batch, per the grids above).
2. Crop each cell out by its transparent-alpha bounding box (`Image.getbbox()` per column works well when cells are laid out in a single row with clear gaps).
3. Pad to a square/target aspect if needed, then resize to match the existing activity-icon dimensions (~246x273px) so nothing shifts in the avatar-picker layout.
4. Save to `src/assets/activities/pal-<activity>.png`, replacing the old `bear-<activity>.png` files, and update the `require(...)` paths in `ProfileScreen.tsx`'s `AVATAR_OPTIONS`.
