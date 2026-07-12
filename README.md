# Park Pal — National Park Tracker

A cozy, illustrated mobile app for tracking U.S. National Parks you've visited: log trips, save memories and photos, collect digital passport stamps, earn badges, and wishlist parks you want to see next.

> The app is named **Park Pal**, but the welcome screen displays the title **"National Park Tracker"** — this is intentional, see `docs/reference-images/login-screen.png`.

## Tech Stack

- **Framework**: React Native + Expo (managed workflow), Expo SDK 57
- **Language**: TypeScript (strict mode)
- **Navigation**: React Navigation v6 — bottom tabs + native stack per tab
- **State**: React Context (`src/context/AppContext.tsx`) with local mock data — architected to swap in a real backend later
- **Data**: All 63 U.S. National Parks stubbed in `src/data/parks.ts`
- **Fonts**: Fredoka Bold (headings), Nunito (body) via `expo-font` / `@expo-google-fonts`
- **Styling**: Theme tokens in `src/theme/` (colors, typography, spacing) — no hardcoded colors or font names in components

See [CLAUDE.md](./CLAUDE.md) for the full design system, color palette, and codebase conventions.

## Prerequisites

- [Node.js](https://nodejs.org/) 20+ and npm
- [Expo Go](https://expo.dev/go) app on your phone (easiest way to run the app), or Xcode / Android Studio for a simulator/emulator

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npx expo start
```

Scan the QR code with Expo Go (iOS/Android), or press `i` / `a` in the terminal to launch a simulator/emulator.

## Scripts

```bash
npx expo start            # Start the dev server
npx expo start --ios      # Run on iOS simulator
npx expo start --android  # Run on Android emulator
npx expo start --web      # Run in a browser
npx expo install --check  # Verify dependency versions match the installed Expo SDK
npx tsc --noEmit          # Type-check
npx eslint src --ext .ts,.tsx  # Lint
```

Run `npx tsc --noEmit` before committing — the project keeps strict mode clean.

## Project Structure

```
src/
  assets/         # Illustrations, mascot images, badge art, map assets
  components/     # Shared UI components (cards, buttons, badges, mascot)
  context/        # AppContext — visited parks, trips, wishlist, badges
  data/           # Mock park data, trip data, badge definitions
  navigation/      # Tab navigator, stack navigators
  screens/        # One folder per screen
  theme/          # Colors, typography, spacing tokens
  types/          # Shared TypeScript interfaces (Park, Trip, Badge, etc.)
docs/
  reference-images/  # Design reference PNGs — the visual source of truth
```

## Design Reference

Before building or modifying any screen, check `docs/reference-images/` — these PNGs (login, explore, park detail, log trip, profile, style guide) are the visual source of truth for layout, color, and typography.

## Contributing

This project is developed with an AI coding assistant (Claude Code) alongside human contributors. [CLAUDE.md](./CLAUDE.md) documents the working agreement — coding conventions, what requires sign-off before changing (navigation structure, `AppContext` shape, new dependencies), and features intentionally deferred past v1 (backend integration, push notifications, dark mode, etc.). Read it before making structural changes.

Key rules for any contributor:

- Use theme tokens from `src/theme/` — never hardcode colors or font names
- No real photography — all visuals are illustrated assets
- Keep changes scoped to what was asked; avoid drive-by refactors
- Run `npx tsc --noEmit` before opening a PR
