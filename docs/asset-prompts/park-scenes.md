# Park scenes (Park Detail hero images)

The big image at the top of each Park Detail page, also used on postcards and the share recap. Parks without a scene borrow another park's art (see `getParkScene` in `src/data/parkImages.ts`).

**These are painterly, not flat.** Like [profile-backgrounds.md](profile-backgrounds.md), and unlike the outlined sticker style of icons, badges and pals. Match the existing `src/assets/parks-scenes/parks-scene-*.jpg` files: a loose impressionist oil painting with thick, visible brush and palette-knife strokes, a dappled broken-color sky, warm golden-hour light, layered atmospheric depth, and wildflowers or desert plants in the foreground.

## Spec

- **1536x1024 px (3:2 landscape), JPG, fully opaque**, no frame, border or text.
- **Composition:** the hero is shown about 320px tall and cropped to the phone's width, so keep the main landmark in the **middle two-thirds**. The top-left and top-right corners hold round back / visited / favorite buttons, so keep them simple (sky is ideal). The bottom ~10% sits under the page's rounded content card.
- **File:** `src/assets/parks-scenes/parks-scene-<park-id>.jpg`, then register it in `REAL_PARK_SCENES` in `src/data/parkImages.ts` (and the matching icon in `REAL_PARK_ICONS`).

**Base style block:**

> A loose impressionist oil painting of a U.S. national park landscape, thick visible brush and palette-knife strokes, a dappled broken-color sky with scattered clouds, warm golden-hour light with long shadows, rich earthy saturated color (nothing neon), layered atmospheric depth from a detailed foreground to hazy distant ridges. A small natural trail or wildflowers in the foreground leading the eye in. No people, no text, no frame, no border, no signature. 3:2 landscape composition, main landmark in the middle two-thirds, calm open sky in the top corners. Subject: [SUBJECT]

| Park id | Subject |
|---|---|
| chiricahua (upcoming, #64) | Chiricahua's "wonderland of rocks" in southeast Arizona at golden hour: a dense forest of tall tan, orange and gray rhyolite spires and pinnacles marching down a canyon, with one huge boulder balanced on a narrow pedestal (Big Balanced Rock) standing out in the middle ground. Apache and ponderosa pines and alligator junipers among the rocks, a dirt trail winding between the spires in the foreground with agave, bear grass and small yellow and purple wildflowers, and the distant blue sky-island ridges and Cochise Head mountain under a warm sky. |
