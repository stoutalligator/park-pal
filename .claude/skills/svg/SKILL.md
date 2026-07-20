---
name: svg
description: Use when creating, editing, or theming any icon, illustration, badge, or mascot asset for Park Pal. Defines the illustrated visual style, palette, and file conventions so new assets match the app's hand-drawn adventure-journal look instead of generic vector-icon or emoji styling.
---

# Park Pal SVG / illustration style

Park Pal's visuals are illustrated, not iconographic. Every asset should look hand-drawn and warm — think field-journal sketches and vintage park-poster art, not a flat icon font.

## Palette — pull only from `src/theme/colors.ts`

```
background:  #F5F0E8  (cream — never used as a fill for line art, only backgrounds)
surface:     #FFFFFF
primary:     #2D5016  (forest green — main line color / fills for active states)
primaryLight:#3D6B20
sage:        #6B8C5A
sky:         #A8C5D4
tan:         #C9A96E
orange:      #D4845A
rose:        #C4847A
brown:       #8B6340  (mascot outlines, earthy details)
brownDark:   #5C4028
textPrimary: #1C2B13
```

Never introduce a new hex value outside this palette. If a design genuinely needs a new color, flag it for a check-in rather than inventing one.

## Style rules

- **Line weight**: consistent medium stroke (roughly 2–2.5px at a 24x24–48x48 viewBox), rounded line caps/joins — no hairlines, no razor-sharp corners.
- **Fill style**: flat color fills with the outline in `brown` or `primary`, occasional single-tone shading — no gradients, no drop shadows baked into the SVG itself (shadows are applied at the component/card level per `src/theme/`).
- **No photorealism, no photography** — everything is illustrated, ever.
- **No emoji, ever**, as a stand-in for a missing asset. If something's missing, create it properly.
- **No generic vector-icon-font look** (e.g. plain Material/Ionicons-style glyphs) for anything that represents a park, badge, mascot, or featured UI element — those must be custom. `@expo/vector-icons` is fine only for small utility chrome (e.g. a plain chevron or close button), not for anything visible/decorative.
- **Mascot consistency**: the bear mascot's proportions, line weight, and palette must stay consistent across every pose — check `docs/reference-images/style-guide.png` and existing files in `src/assets/scenes/` before drawing a new pose.
- **Badges**: sticker-style, circular or shield-shaped, illustrated line art with a flat-color fill — match the tone of existing badge assets if any exist in `src/assets/`.
- **Map pins / park thumbnails**: circular illustrated thumbnail with a small checkmark badge overlay for visited status (per `explore-screen.png`).

## File conventions

- Icons (small, single-color-ish, reusable) → `src/assets/icons/`, inline SVG preferred so they can be themed/recolored via props rather than baked-in colors where reasonable.
- Larger illustrated scenes (empty states, mascot poses, hero art) → `src/assets/scenes/`, PNG is fine if the illustration has richer shading/detail than a clean SVG can express well.
- Name files descriptively and consistently with what's already there (kebab-case, e.g. `favorite-heart.png`, `mountain.png`) — check the existing folder contents before naming a new file to avoid near-duplicates.

## Workflow when a new asset is needed

1. Check `src/assets/icons/` and `src/assets/scenes/` first — it may already exist under a different name.
2. Check `docs/reference-images/style-guide.png` for the closest visual reference.
3. Draw the asset following the palette and line-weight rules above.
4. Save to the correct folder, then report the exact path back so it can be wired into the component/screen that needed it.
