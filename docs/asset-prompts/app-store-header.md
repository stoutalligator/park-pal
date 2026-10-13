# App Store product page header

The hero artwork at the top of the App Store product page (App Store Connect → Header Asset). Apple's guidance: one clear idea, focal point in the center (it's cropped differently per device), a short phrase that adds to the image rather than describing it, and no prices, URLs, awards, or other platforms' logos.

**Required sizes (exact):** `5244 × 2950` (16:9) and `3840 × 1646` (≈2.33:1). Both are cut from one 16:9 painting, so the 3840×1646 version is the middle ~79% of the height. **Keep everything important inside the middle horizontal band**: nothing essential in the top or bottom ~11%.

**No text on the header.** Tested in App Store Connect's iPhone preview: only the middle ~50% of the width shows, the status bar / back / share buttons cover the top ~28%, and the app icon and name cover everything below ~60% of the height. That leaves no usable strip for a readable line, so the header ships as the painting alone; the screenshots carry the messaging.

**Style:** painterly, the same family as [park-scenes.md](park-scenes.md), not the flat sticker style of icons and badges.

**Generate at:** the largest 16:9 landscape size your tool offers (1792×1024 or bigger). It will be upscaled to 5244×2950; loose painterly brushwork upscales cleanly.

## Prompt

> A wide panoramic loose impressionist oil painting of America's national parks blended into one continuous landscape, flowing left to right: a rocky Atlantic coastline with a small lighthouse, misty old-growth forest with giant redwoods, a granite valley with a tall waterfall and a domed cliff, glowing red-rock canyon country with a natural stone arch and orange hoodoos, a desert with tall saguaro cacti, ending in snow-capped mountains above an alpine lake. Thick visible brush and palette-knife strokes, a dappled broken-color sky, warm golden-hour light, rich earthy saturated color (nothing neon), layered atmospheric depth. A winding dirt trail runs through the foreground with wildflowers. In the center of the image, the sky and middle distance are calm and softly lit with open space, leaving room for a short line of text to be placed over it later. All the landmarks sit in the middle horizontal band of the frame; the top and bottom edges are only sky and foreground meadow. No people, no animals, no text, no letters, no logos, no frame, no border, no signature. 16:9 landscape.
