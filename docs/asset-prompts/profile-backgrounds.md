# Profile backgrounds + trail-unlocked backgrounds

The profile hero ("Choose a Background" picker in `ProfileScreen.tsx`) currently has 5 always-available scenes in `src/assets/scenes/`: `scene-mountain-lake`, `scene-forest`, `scene-arches`, `scene-mountain-gate`, `scene-night-camping`. This file covers (1) the style to match when generating more, and (2) the plan for **trail-unlocked backgrounds**: finishing a signature trail earns a badge sticker *and* a background painted from that trail.

**These are a different style from everything else in `docs/asset-prompts/`.** Pals, badges and icons are flat, outlined, plush-toy art. The backgrounds are lush painterly vintage travel-poster scenes with real depth and atmosphere. Do NOT paste the flat-fill style blocks from the other files here — use the block below.

## What the existing five have in common

- Painted "WPA park poster meets modern digital gouache": layered shapes, visible brush and grain texture, crisp shape edges, no outlines.
- Strong directional light with a mood (golden sunrise, sunset glow, misty god-rays, Milky Way night) and layered atmospheric haze for depth.
- A winding dirt trail leading the eye into the scene (4 of 5).
- Framing elements at the left and right edges (conifers, boulders, cacti, ferns, wooden gate posts) and a distant landmark peak, arch or lake.
- Small touches of life: wildflowers, tiny wildlife (elk, deer) far off. No people, no text (the trailhead sign is blank).
- Rich, warm, saturated but earthy color; nothing neon.

## Spec

- **1536x1024 px (3:2 landscape), fully opaque**, no transparency, no frame or border. The profile hero renders at exactly 3:2, so nothing is cropped.
- **Composition for the hero:** the user's avatar and a blurred "Hey, name!" panel sit in the **center** of the image, a round edit button sits in the **top-right corner**, and the stats cards overlap the **bottom edge**. So put the main landmark **off-center (left or right third, or high in the frame)**, keep the very center relatively calm (foreground trail, soft haze, or open sky is fine), and keep small key details out of the top-right corner and the bottom ~12%.
- Files: `src/assets/scenes/scene-<slug>.png`. Existing files are ~2 MB; keep new ones in that range.

## Base style block — paste into every background prompt, unedited

> Richly painted vintage national-park travel-poster illustration with a modern digital gouache finish. Layered, semi-flat color shapes with subtle painterly brush texture and fine grain, crisp shape edges, no outlines, no photorealism, no 3D-render look. Strong directional light with a clear mood, atmospheric haze layered for depth, and warm, saturated but earthy colors (deep forest greens, burnt sienna, golden ochre, dusty teal skies) — nothing neon. Wide landscape composition, 1536x1024 (3:2), fully opaque, filling the entire frame edge to edge with no border or vignette frame. A winding footpath leads the eye into the scene; framing elements (trees, rocks, plants) at the left and right edges; one main landmark placed off-center to the left or right third of the frame, with the center of the frame calm and uncluttered. Any wildlife is tiny and far away. No people, no text, no signage lettering, no logos.

## Trail-unlocked backgrounds — candidates

Each unlock is a **pair**: a badge sticker (see [badges.md](badges.md), same generate-and-crop workflow) plus a background. Earning the badge (completing the trail, which the app already tracks via `completedTrailIds`) unlocks the background in the picker, the same way badges already unlock pals. The scene shows part of the trail itself so it feels like a memory of the hike.

| Trail id | Park | Badge idea | Background subject |
|---|---|---|---|
| `zion-angels-landing` | Zion | **existing** `near-death` ("Near Death") — background only | the narrow ridge spine with chain handholds climbing toward the summit, sheer red canyon walls on both sides, the Virgin River glinting far below, warm late-afternoon light |
| `yosemite-half-dome` | Yosemite | Half Dome Hiker — Half Dome's granite face with the cables | the cable route climbing the granite dome's back, the valley and Clouds Rest opening out behind, hazy golden light |
| `grand-canyon-bright-angel` | Grand Canyon | Canyon Descender — switchbacks into layered canyon walls | trail switchbacks cut into layered red canyon walls at sunrise, the Colorado River a thin green ribbon far below |
| `acadia-cadillac-mountain` | Acadia | First Light — sunrise over an island bay | pink-granite summit ledges at dawn, Frenchman Bay and its islands beyond, a soft coral sky, stunted spruce framing the path |
| `glacier-grinnell-glacier` | Glacier | Glacier Gazer — a glacier above a turquoise lake | ledge trail above a milky turquoise lake with the glacier and jagged peaks ahead, wildflower slopes, a couple of tiny mountain goats |
| `mount-rainier-skyline` | Mount Rainier | Meadow Wanderer — a volcano over wildflowers | wildflower meadows in full bloom with the snow-draped volcano filling the sky, a boardwalk-like trail curving through |
| `sequoia-moro-rock` | Sequoia | Rock Stair Climber — carved stairs up a granite dome | the carved stairway and railing on a granite dome above a sea of giant sequoias and the Great Western Divide at golden hour |
| `hawaii-volcanoes-kilauea-iki` | Hawaii Volcanoes | Crater Crosser — crater floor with steam vents | trail crossing a steaming black crater floor, lush fern forest on the rim, a soft glow and drifting steam |

**Plan:** the first batch is **Angels Landing** (badge already exists, so it only needs a background) and **Half Dome**. The rest of the table is for later — Bright Angel and Cadillac are the natural next two. Half Dome needs a permit lottery, so it's a high-effort unlock; that's fine, since users can also mark trails done manually.

## First batch (generated and wired)

Angels Landing and Half Dome are done and unlock in the picker (locked with a lock icon until the badge is earned). Two backgrounds, one new badge. Files:

| Unlock | Background file | Badge file |
|---|---|---|
| Angels Landing, via the existing `near-death` badge ("Near Death") | `src/assets/scenes/scene-angels-landing.png` | none — the badge already exists |
| Half Dome (`yosemite-half-dome`), via a new `half-dome` badge ("Cable Climber") | `src/assets/scenes/scene-half-dome.png` | `src/assets/badges/badge-half-dome.png` |

### Angels Landing background

> [base style block above] + Subject: the final ridge of Angels Landing at Zion, seen from partway up the trail. A narrow, exposed footpath climbs a knife-edge sandstone spine toward the summit, with a chain handrail strung along posts on the left side of the path. Sheer red-and-cream canyon walls fall away on both sides, and far below a ribbon of green riverbed winds through the canyon floor. Across the canyon rise massive pale sandstone monoliths and cliff faces. Warm late-afternoon golden-hour light, a glowing amber-to-peach sky with a few soft clouds, long shadows across the rock, small hardy pines and desert shrubs clinging to the ledges. The ridge and summit sit in the right third of the frame, the canyon and distant walls open to the left, and the center is calm haze and open air.

### Half Dome background

> [base style block above] + Subject: the granite dome of Half Dome at Yosemite, seen from the trail as it nears the base of the final ascent. Its huge, smooth, sheared-off face and rounded back rise on the left third of the frame, with the two steel cables and their wooden plank rungs running up the rounded back toward the summit. A dusty granite footpath winds through sparse pines and boulders in the foreground. Beyond, the open Yosemite Valley drops away, with layered blue-hazed ridges and distant waterfalls in the far distance. Golden morning light, a soft peach-to-pale-blue sky with a few thin clouds, crisp shadows on the granite. The center of the frame is open sky and valley haze.

### Half Dome badge — "Cable Climber" (`half-dome`)

Attach the finished Half Dome background as a reference image so the sticker matches it.

> [badge base style block from badges.md] + Subject: a circular sticker showing Half Dome's sheer granite face and rounded back, with the two steel cables running up it and a small sun behind, pine trees at the base.

### Background prompt template (for later unlocks)

> [base style block above] + Subject: [BACKGROUND SUBJECT from the table]. Time of day / light: [match the table]. The landmark sits in the [left / right] third of the frame.

### Badge prompt for each pair

Use the badge base style block in [badges.md](badges.md), and attach the finished background as a reference image so the sticker matches it:

> [badge base style block from badges.md] + Subject: a circular sticker showing the same scene in a simplified, flat, outlined form — [ONE-LINE BADGE IDEA from the table].

## Wiring (code side, after the images exist)

Requiring a missing image breaks the Expo bundle, so wire this only once the files are in place: `ProfileBackground` in `src/types/index.ts` · `BACKGROUND_OPTIONS` in `ProfileScreen.tsx` gets an `unlockedByBadgeId` (same lock overlay and "Earn X to unlock" toast the Choose Your Pal picker already uses) · badge definitions/rules/images in `badges.ts`, `badgeRules.ts` (`completedTrailIds.includes('<trail-id>') ? 1 : 0`, like `near-death`) and `badgeImages.ts`. The database column `profile_background` is plain text, so no migration is needed.
