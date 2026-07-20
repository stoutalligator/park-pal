---
name: design-check
description: Use after building or editing any screen or component to verify it matches Park Pal's design reference and theme-token rules before calling the work done. Checklist-driven audit against docs/reference-images/ and src/theme/.
---

# Design consistency check

Run this before declaring any UI task complete — it encodes the CLAUDE.md "Always/Never" rules as a concrete checklist instead of relying on memory.

## 1. Compare against the reference image

Match the changed screen to its file in `docs/reference-images/`:

| Screen | Reference |
|---|---|
| Welcome / landing | `login-screen.png` |
| Parks tab | `explore-screen.png` |
| Park detail sheet | `park-view.png` |
| Log a Trip modal | `log-trip-screen.png` |
| Home / Profile | `profile-screen.png` |
| Colors, fonts, buttons, mascot | `style-guide.png` |
| Tagline / value icons | `app-motto.png` |

Check layout structure, spacing rhythm, button shapes, and card treatment against it — don't just check that it "looks plausible."

## 2. Grep the diff for violations

From the repo root, check the files just touched:

```bash
git diff --name-only -- '*.tsx' '*.ts' | xargs grep -nE "#[0-9A-Fa-f]{3,8}\b" 
git diff --name-only -- '*.tsx' '*.ts' | xargs grep -nE "'(Fredoka|Nunito)[A-Za-z_0-9]*'"
```

- Any raw hex match → replace with the matching key from `src/theme/colors.ts`.
- Any raw font-family string match → replace with `fontFamilies.*` / `typography.*` from `src/theme/typography.ts`.
- Also scan for emoji characters in JSX/string literals — none are allowed anywhere in the UI; replace with an asset from `src/assets/` (or flag for `svg-creator`).

## 3. Structural rules

- Screen root background is `colors.background` (cream), not `colors.surface` or a hardcoded value.
- Primary buttons: pill-shaped (`borderRadius: 999`), forest fill. Secondary buttons: outlined pill.
- Cards: `borderRadius: 16`, soft shadow, white or cream fill — not sharp corners, not flat/no-shadow.
- No Material Design components (`react-native-paper`, MUI-style elevation buttons, etc.).
- If the screen has an empty state or feels visually bare, confirm whether the bear mascot (`MascotCallout` or similar) should be present per the reference.

## 4. Final gate

Run `npx tsc --noEmit` and confirm zero errors before reporting the task as done.
