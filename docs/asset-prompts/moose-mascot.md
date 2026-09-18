# Moose mascot (replacing the bear)

The fixed brand mascot is being redesigned from a bear to a moose — partly a style refresh, partly to move away from the current ranger-hat-and-vest look reading too close to Smokey Bear (whose likeness is protected by its own federal statute, the Smokey Bear Act). A moose sidesteps that entirely.

The moose replaces every file in `src/assets/mascot/` and stays the one consistent "face of the app" on branding surfaces (welcome, profile hero, log-trip header, empty states). The activity avatar picker (`AVATAR_OPTIONS` in `ProfileScreen.tsx`) is a separate set — an assortment of different animals, see [park-pals.md](park-pals.md). `badge-adventure-awaits.png` is left as-is for now — it's a plain generic bear illustration, not tied to the mascot's specific design, so there's less pressure to swap it in this pass.

**Base character block — paste into every prompt in this file, unedited, so the moose stays the same character across all 8 mascot images:**

> Warm, hand-drawn vintage national-park-poster illustration style. Flat color fills only, no gradients, no photorealism, no drop shadows baked into the art. Consistent medium-weight rounded outline in dark brown (#8B6340) or forest green (#2D5016). Palette limited to: forest #2D5016, sage #6B8C5A, sky #A8C5D4, tan #C9A96E, orange #D4845A, rose #C4847A, brown #8B6340, cream #F5F0E8, dark brown #5C4028. No text, no emoji, no generic vector-icon-font look.
>
> Character: a friendly cartoon moose mascot for a national-parks app, matching the same soft plush-toy appeal as this app's existing bear mascot art. Broad flat brown antlers, warm brown fur, lighter tan muzzle and chest patch, a small warm smile, stocky rounded toddler-like proportions (not realistic moose anatomy — cute and huggable, like a plush toy). Eyes are large, round, solid black, set close together and slightly forward on the face, each with a single small white highlight dot/glint near the upper edge — soft and big-eyed, not almond-shaped or realistic. Wears a tan flat-brim ranger hat with a forest-green band and a small pine-tree badge pin, plus a forest-green neckerchief. The hat sits back on the head / the antlers come up and out through cutouts in the brim, so both the hat and the full antler silhouette stay visible and read clearly. Keep proportions, fur color, eyes, hat, and neckerchief identical across every image in this batch.

**Reference sheet (generate this one first, use it as your visual anchor/reference image for every batch below):**

> [base character block] + Character turnaround sheet on a fully transparent background (no background color, no ground shadow, no scenery): three full-body poses of the moose side by side — front view, 3/4 view, and side view — standing neutrally, arms at sides, no props. This is a model sheet for maintaining consistency, not a final in-app asset.

## Expressions → `src/assets/mascot/mascot-<pose>.png`

**Spec per cell:** head-and-shoulders bust crop, transparent background, roughly square-ish (~94x114px final, but generate large and downscale).

Generate in **two batches of 3** (one wide image with multiple bordered/transparent cells side by side, then crop each cell out and resize/pad to match the existing mascot file dimensions before saving over the old bear version).

**Batch 1 — happy / excited / thinking:**

> [base character block] + Compose a single wide image containing 3 separate cells side by side, evenly spaced, each on its own transparent background, no dividers or borders drawn between them. Cell 1: head-and-shoulders bust of the moose smiling warmly, a calm happy expression. Cell 2: head-and-shoulders bust of the moose with a big excited open-mouth smile and bright eyes. Cell 3: head-and-shoulders bust of the moose with one eyebrow raised and hoof-equivalent touching its chin, a thoughtful expression. Identical proportions, fur color, hat, and neckerchief in all 3 cells.

**Batch 2 — exploring / success / tip:**

> [base character block] + Compose a single wide image containing 3 separate cells side by side, evenly spaced, each on its own transparent background, no dividers or borders drawn between them. Cell 1: head-and-shoulders bust of the moose looking off to one side with a curious, alert expression, as if spotting something in the distance. Cell 2: head-and-shoulders bust of the moose with eyes closed and a proud, satisfied smile, as if celebrating an accomplishment. Cell 3: head-and-shoulders bust of the moose with a raised eyebrow and a knowing half-smile, one hoof-equivalent raised near its face as if about to share a helpful tip. Identical proportions, fur color, hat, and neckerchief in all 3 cells.

Map cells back to files in this order: Batch 1 → `mascot-happy.png`, `mascot-excited.png`, `mascot-thinking.png`. Batch 2 → `mascot-exploring.png`, `mascot-success.png`, `mascot-tip.png`.

## Full-body ranger pose → `mascot-ranger-full.png`

**Spec:** tall portrait crop, transparent background, standing on a small ground shadow (~241x415px final).

> [base character block] + Full-body standing pose, one arm raised in a friendly wave, the other at its side. Forest-green ranger vest with a small badge over the chest, tan flat-brim hat with antlers coming through, neckerchief. Standing on a small soft ground shadow, transparent background, single subject only.

## Hero/title scene → `bear-title-scene.png` (rename to `moose-title-scene.png`)

**Spec:** portrait scene, opaque background, roughly 2:3 (e.g. 1024x1536).

> [base character block] + Full illustrated landscape scene, portrait orientation: the moose standing on a mountain trail holding an open paper map in one hoof-equivalent, a small canvas backpack on its back, tall pine trees framing both sides of the frame, a calm lake and a snow-capped mountain peak in the background, warm golden-hour lighting. Single subject, no other animals or characters in frame.

## Cropping workflow

1. Generate each batch image (one request per batch, per the grids above).
2. Crop each cell out by its transparent-alpha bounding box (`Image.getbbox()` per column works well when cells are laid out in a single row with clear gaps).
3. Pad to a square/target aspect if needed, then resize to match the existing file's original dimensions so nothing shifts in the app's layout.
4. Save over the corresponding file path, renaming `bear-*` → `moose-*` and updating the `require(...)` paths in `ProfileScreen.tsx` (`AVATAR_OPTIONS`) and wherever `bear-title-scene.png` is referenced.
