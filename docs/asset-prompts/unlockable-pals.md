# Unlockable pals + badges (badge-unlocked bonus pals)

Beyond the default 15-activity roster ([park-pals.md](park-pals.md)), some pals are unlocked by earning a specific badge instead of being available from the start — a reward layer on top of the picker. Each unlockable is a **pair** of images that should be generated together so they match: a badge sticker and a pal avatar. They need their own distinct design so they read as a "get" rather than a reskin of an existing default pal.

**Prompt blocks used below:**
- Badge sticker → the base style block in [badges.md](badges.md)
- Pal avatar → the shared style block in [park-pals.md](park-pals.md)

**Specs:**
- **Badge:** `src/assets/badges/badge-<badge-id>.png`, 512x512 transparent (see badges.md).
- **Pal:** `src/assets/activities/pal-<badge-id>.png`, full-body pose, fully transparent background (alpha 0 outside the character and its named pose object, no sky/ground/scenery/drop shadow), target ~240x250px to match the other `pal-*.png` files.

**Wiring checklist for a new unlockable** (code side, not part of image generation): `src/types/index.ts` (activity/pal id) · `src/data/badges.ts` (definition) · `src/data/badgeRules.ts` (unlock rule) · `src/data/badgeImages.ts` (badge image) · `AVATAR_OPTIONS` in `ProfileScreen.tsx` (pal image + unlock badge id). The `badge-dev` agent handles the badge files.

---

## Channel Island Fox

**Files:** `src/assets/badges/badge-channel-islands-fox.png` (exists) and `src/assets/activities/pal-channel-islands-fox.png`

Unlocked by the existing `channel-islands-fox` badge ("Island Fox Friend"). Must be visibly distinct from the default `wildlife-viewing` pal, which is already a bright orange-and-cream fox holding binoculars — this one needs different coloring and a different pose/prop so the unlock feels like a real reward, not a duplicate.

Real Channel Island foxes (Urocyon littoralis) are notably smaller and grayer than a typical red fox: a gray back, rusty-orange sides and legs, cream/white throat and belly, and a bushy tail with a dark tip — distinct from a standard orange fox. `src/assets/badges/badge-channel-islands-fox.png` already shows this coloring/coastal vibe for reference.

**Pal (activity avatar):**

> [shared style block from park-pals.md] + A gray-and-tan Channel Island fox — grayer back, rusty-orange sides and legs, cream throat and belly, bushy dark-tipped tail, clearly different coloring from a standard orange fox. Standing or sitting beside a small coastal prop (a piece of driftwood, a tuft of coastal grass, or a small seashell) to tie it to a Channel Islands setting. Same big-eyed cute plush-toy proportions and line-weight style as the rest of the roster.

---

## Atlantic Puffin (Acadia)

**Files:** `src/assets/badges/badge-acadia-puffin.png` and `src/assets/activities/pal-acadia-puffin.png` (both exist)

Unlocked by the `acadia-puffin` badge ("Puffin Pal") in `src/data/badges.ts` ("Spot the Atlantic Puffin at Acadia."). There's no `wildlife-viewing` overlap risk since no other pal in the roster is a puffin, but the design should still read as a distinct "get" — a real Atlantic Puffin (Fratercula arctica), not a generic seabird — since the whole point of the badge is that specific species callout.

Atlantic Puffins have a distinctive look worth calling out explicitly: black back/wings, white chest and face, a large triangular bill banded orange-yellow-blue-gray (their signature feature), bright orange legs and feet, and small dark eye patches that give them a slightly sad/serious expression even though the overall silhouette is round and comical — lean into that contrast for the cute plush-toy treatment.

**Badge (sticker):**

> [badge base style block from badges.md] + Subject: an illustrated Atlantic Puffin perched on a rocky coastal outcrop, black back and wings, white chest, and its signature large triangular bill banded orange-yellow-blue-gray, bright orange feet visible on the rock.

**Pal (activity avatar):**

> [shared style block from park-pals.md] + A black-and-white Atlantic Puffin with its signature large triangular bill banded orange-yellow-blue-gray and bright orange legs and feet. Standing on a small rocky coastal ledge, wings slightly out to the sides as if balancing, small dark eye patches giving a serious little expression that contrasts with its round, cute plush-toy body. Same big-eyed cute proportions and line-weight style as the rest of the roster.

---

## Gray Wolf (Yellowstone)

**Files:** `src/assets/badges/badge-yellowstone-wolf.png` and `src/assets/activities/pal-yellowstone-wolf.png`

Planned badge id `yellowstone-wolf` ("Wolf Watcher"), unlocked by spotting `yellowstone-gray-wolf` (Rare — reintroduced in 1995, Lamar Valley is one of the best places on Earth to see wild wolves). Must not read as a second fox or a dog: the default roster already has an orange-and-cream fox and a bear, so lean on a larger, heavier build with a broad muzzle.

Real gray wolves have a thick gray-and-cream coat with a darker gray "saddle" over the back and shoulders, lighter cream muzzle, chest and legs, and a bushy black-tipped tail. Keep the eyes in the shared solid-black style (not the wolf's real amber).

**Badge (sticker):**

> [badge base style block from badges.md] + Subject: an illustrated gray wolf sitting with its head raised in a gentle howl toward a crescent moon, gray-and-cream coat with a darker gray saddle, on a small grassy ridge with a few pine silhouettes behind it.

**Pal (activity avatar):**

> [shared style block from park-pals.md] + A gray-and-cream gray wolf sitting upright with its muzzle tilted up in a soft, friendly howl, thick gray coat with a darker gray saddle across the back, cream chest and legs, bushy black-tipped tail curled beside it, a small crescent moon and two tiny stars floating above its head. Broad muzzle and sturdy build so it reads as a wolf and not a fox, but the same big-eyed cute plush-toy proportions and line-weight style as the rest of the roster.

---

## California Condor (Pinnacles)

**Files:** `src/assets/badges/badge-pinnacles-condor.png` and `src/assets/activities/pal-pinnacles-condor.png`

Planned badge id `pinnacles-condor` ("Condor Companion"), unlocked by spotting `pinnacles-california-condor` (Rare — a reintroduced population; the species was down to 22 birds in the 1980s). Distinct from the default owl: this one is a big, dark, broad-winged bird, so the read is silhouette and wingspan.

Real California Condors have glossy black plumage, a featherless pink-orange head (keep it soft and rounded, not gaunt — the cute treatment should make it endearing), a ruff of black feathers around the neck, a pale hooked bill, and bold white triangular patches on the underside of the wings. Pinnacles condors wear small plain colored wing tags — include one on each wing, with no numbers or text.

**Badge (sticker):**

> [badge base style block from badges.md] + Subject: an illustrated California condor with its broad wings spread wide, glossy black feathers, white triangular patches under the wings, pink-orange featherless head, soaring above a pair of jagged volcanic rock spires.

**Pal (activity avatar):**

> [shared style block from park-pals.md] + A stocky black California condor standing on a small rocky perch with its wings held half-open, white triangular underwing patches showing, a soft rounded pink-orange featherless head, a ruff of black feathers around its neck, a pale hooked bill, and a small plain colored wing tag on each wing (no numbers or text). Round, chunky plush-toy body, the same big-eyed cute proportions and line-weight style as the rest of the roster.

---

## Florida Manatee (Everglades)

**Files:** `src/assets/badges/badge-everglades-manatee.png` and `src/assets/activities/pal-everglades-manatee.png`

Planned badge id `everglades-manatee` ("Seeking Sea Cows"), unlocked by spotting `everglades-manatee` (Uncommon — grazes canals and coastal waters near Flamingo). Biscayne also has a manatee entry; the badge is deliberately tied to the Everglades one, the marquee park for it.

Manatees are already round and plush, so this should be the cutest of the set: gray-brown rounded body, slightly lighter belly, a wide paddle-shaped tail, two small flippers, and a whiskered, wrinkly snout. Since it's an aquatic animal and the style block forbids scenery, the pal floats in place (no water plane), with only its named props. Don't show it being fed by a person.

**Badge (sticker):**

> [badge base style block from badges.md] + Subject: an illustrated Florida manatee gliding through turquoise water past a few strands of seagrass, gray-brown rounded body, wide paddle tail, whiskered snout, with a mangrove root visible at the edge of the sticker.

**Pal (activity avatar):**

> [shared style block from park-pals.md] + A gray-brown Florida manatee floating gently in a three-quarter view, round chubby body with a slightly lighter belly, wide paddle-shaped tail curled up behind, two small flippers, whiskered wrinkly snout, holding a small strand of seagrass in one flipper and munching contentedly, with two or three tiny bubbles near its snout. No water surface or background — only the manatee, the seagrass and the bubbles. Same big-eyed cute plush-toy proportions and line-weight style as the rest of the roster.

---

## Status

Gray Wolf, California Condor and Florida Manatee are generated and wired (badge id = pal id: `yellowstone-wolf`, `pinnacles-condor`, `everglades-manatee`). Generating a badge and its pal as one side-by-side image (badge left, pal right) worked well — the two match — then split and fit to 512x512 (badge) and 250x250 (pal).
