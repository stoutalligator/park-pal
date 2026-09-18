# App Icon, Splash & Adaptive Icon (moose face)

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
