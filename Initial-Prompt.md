# Claude Agent Build Prompt: Park Pal National Park Tracker Mobile App

You are building a mobile-first application called **Park Pal**, a cozy, cute, interactive National Park Tracker.

The app allows users to track U.S. National Parks they have visited, wishlist future parks, log trips, save photos, write memories, collect digital passport stamps, earn badges, view progress, and revisit past adventures.

This should feel like a polished mobile app, not just a prototype.

---

# Primary Design Source

The app design must closely match the inspiration reference images located at:

`C:\Stout-Alligator\national-park-tracker\docs\reference-images`

Treat this PDF as the **primary product and visual design specification**.

The reference images includes a complete mobile app design board with:

- Welcome / landing screen.
- Explore screen.
- Park map view.
- Park detail screen.
- Log a Trip screen.
- Profile/dashboard screen.
- Recent trips section.
- Collection preview.
- Progress tracking.
- Badge/stamp collection.
- Style guide.
- Color palette.
- Typography examples.
- Button styles.
- Bottom navigation.
- Cute mascot / adventure companion.

Do not create a generic SaaS dashboard, corporate tracker, plain travel planner, or Material UI-looking app.

The final app should visually match the provided inspiration as closely as possible.

---

# App Personality

The app should feel like:

- A cozy digital National Park Passport.
- A playful outdoor adventure journal.
- A collectible badge/stamp tracker.
- A memory scrapbook.
- A cute travel companion.
- A soft, illustrated mobile game-like experience.

Design keywords:

- Cozy
- Cute
- Whimsical
- Illustrated
- Adventure journal
- National Park Passport
- Vintage park poster
- Scrapbook
- Collectible
- Friendly
- Warm
- Playful
- Nature-inspired
- Gamified

The app should make users smile when they open it.

---

# Visual Style Requirements

Match the inspiration PDF’s visual style closely.

## Color Palette

Use a soft nature-inspired palette:

- Warm cream / parchment background.
- Deep forest green primary color.
- Sage green secondary accents.
- Light sky blue.
- Warm tan / beige.
- Soft orange.
- Muted rose.
- Earthy brown mascot/details.

Avoid:

- Neon colors.
- Harsh dark themes.
- Corporate gray dashboards.
- Sterile white screens.
- Overly technical UI.

## Typography

Use playful rounded fonts.

Recommended:

- Headings: Fredoka, Baloo, Nunito Sans ExtraBold, or similar.
- Body: Nunito, Inter, or similar rounded readable font.

Headings should feel chunky, friendly, and slightly whimsical.

## UI Style

Use:

- Large rounded cards.
- Pill buttons.
- Soft shadows.
- Sticker-like badges.
- Illustrated icons.
- Rounded image thumbnails.
- Cozy empty states.
- Bottom tab navigation.
- Floating center action button.
- Gentle animations.
- Cream backgrounds with forest green accents.

## Illustration Style

Use soft illustrated assets, not realistic photography.

Visual inspiration:

- National park posters.
- Children’s field guides.
- Cute camping stickers.
- Cozy adventure games.
- Hand-drawn maps.
- Passport stamps.

Include a cute mascot, such as:

- Bear ranger.
- Raccoon explorer.
- Fox hiker.
- Otter camper.

The mascot should appear on onboarding, home/profile, empty states, and success moments.

---

# Platform Requirement

Build this as a **mobile-first application**.

Recommended stack:

- React Native.
- Expo.
- TypeScript.
- NativeWind or styled-components.
- React Navigation.
- Local mock data/state for v1.
- Clean architecture that can later support Supabase, Firebase, or another backend.

If implementing as a web prototype first, keep the layout strictly mobile-sized and app-like.

---

# Core Navigation

Use a bottom mobile tab bar inspired by the PDF.

Primary bottom tabs:

1. Home
2. Parks
3. Log Trip / Plus Button
4. Trips
5. Profile

The center action should be a larger floating `+` button used to quickly log a trip.

Additional screens should be accessible through cards, buttons, or secondary navigation:

- Passport
- Memories
- Collection
- Achievements
- Stats
- Settings
- Wishlist

---

# Full Screen List

Build or scaffold the following screens.

---

## 1. Welcome / Landing Screen

Create a charming onboarding/landing screen matching the reference.

Include:

- Illustrated mountain/forest background.
- Cute mascot holding a map or backpack.
- App title: `National Park Tracker` or `Park Pal`.
- Subtitle: `Collect memories. Explore more.`
- Primary button: `Start Exploring`
- Secondary button: `Log In / Sign Up`

The screen should feel like a cute national park poster.

---

## 2. Onboarding Flow

Create a short onboarding flow after the welcome screen.

Screens can include:

### Choose Your Explorer Style

Options:

- Casual Explorer
- Road Tripper
- Hiker
- Photographer
- Camper
- Completionist

### Set Your Goal

Options:

- Visit 5 parks this year.
- Complete one region.
- Track past trips.
- Visit all 63 National Parks.

### Pick Favorite Parks

Allow users to select favorite/wishlist parks.

The onboarding should be light, playful, and optional.

---

## 3. Home Dashboard

Main landing screen after opening the app.

Include:

- Hero card with mascot.
- Greeting: `Hey, Explorer!`
- Subtitle: `Keep exploring. The outdoors is calling.`
- Visited parks count.
- To-go parks count.
- Bucket list count.
- Completion percentage.
- Progress ring.
- Recent trips preview.
- Latest badge earned.
- Next adventure goal.

Example layout:

- `23 / 63`
- `National Parks Visited`
- `36% Complete`

Use cozy illustrated cards, not chart-heavy dashboard styling.

---

## 4. Parks Explorer Screen

Create the primary browsing screen for all National Parks.

Include:

- Header: `Explore`
- Search bar.
- Filter pills:
  - All Parks
  - Visited
  - Bucket List
  - Favorites
  - Not Visited
- Toggle between card/list/map view.
- Park cards with:
  - Illustrated thumbnail.
  - Park name.
  - State.
  - Status badge.
  - Small stamp icon.
  - Favorite heart.

Statuses:

- Visited
- Bucket List
- Planned
- Not Visited

Park cards should feel collectible and playful.

---

## 5. Interactive Park Map Screen

Create a map-style screen inspired by the PDF’s map view.

The map should show park pins/stamps across the U.S.

Marker colors:

- Green = Visited.
- Orange/Gold = Bucket List.
- Blue = Planned.
- Gray = Not Visited.

Tapping a park marker should open a bottom preview card with:

- Park name.
- State.
- Status.
- Small illustration.
- Button to view details.

Include bottom progress card:

- `Your Progress`
- `23 / 63`
- `National Parks Visited`
- `36%`

The map can use mock/static data in v1, but the UI should be built as if it will become fully interactive.

---

## 6. Park Detail Screen

Create a detailed park page.

Include:

- Large illustrated park hero image.
- Back button.
- Favorite button.
- Park name.
- Park type label: `National Park`.
- Status badge: `Visited`, `Bucket List`, or `Not Visited`.
- Short description.
- Park facts:
  - Established year.
  - State.
  - Acres.
- User memories section.
- Trip history.
- Photos preview.
- Activity tags.
- Button: `Log Another Trip`, `Log This Park`, or `Add to Bucket List`.

Example content:

- `Grand Teton`
- `National Park`
- `Jagged peaks, crystal clear lakes, and abundant wildlife. Adventure is always calling.`

This screen should closely match the Grand Teton detail screen in the design PDF.

---

## 7. Log a Trip Screen

This is one of the most important screens.

Match the PDF’s `Log a Trip` screen closely.

Include:

- Header: `Log a Trip`
- Cute mascot/trip illustration.
- Park selector.
- Question: `When did you go?`
- Date range picker.
- Question: `What did you do?`
- Activity selection cards.
- Notes/memories text box.
- Character count.
- Add photos section.
- Primary button: `Save Trip`

Activity cards:

- Hiking
- Camping
- Wildlife
- Kayaking
- Scenic Drive
- Photography
- Stargazing
- Other

Optional fields:

- Weather.
- Favorite trail.
- Miles hiked.
- Campsite.
- Wildlife sightings.
- Rating.
- Travel companions.

After saving, show a delightful success animation.

Example success copy:

- `Another memory saved!`
- `Your passport is growing.`

---

## 8. Trips Screen

Create a trips list/timeline screen.

Include:

- Recent trips.
- All trips.
- Search/filter.
- Cards grouped by year or month.
- Park thumbnail.
- Trip date range.
- Short memory preview.
- Activity icons.
- Chevron to open trip detail.

Example trip card:

- `Yellowstone`
- `Apr 10 - Apr 14, 2024`
- `Saw geysers, bison, and sunset views.`

---

## 9. Trip Detail / Memory Screen

Create a scrapbook-style trip detail page.

Include:

- Park name.
- Date range.
- Hero photo/illustration.
- Journal entry.
- Activities.
- Weather.
- Favorite moment.
- Photos.
- Wildlife sightings.
- Trail notes.

The page should feel like a memory page, not a form.

Include edit functionality.

---

## 10. Memories / Scrapbook Screen

Create a dedicated memory journal.

Each logged trip becomes a memory card.

Include:

- Timeline view.
- Masonry/card layout.
- Filters by park, year, activity, favorites.
- Photo previews.
- Journal excerpts.
- Sticker-style activity tags.

This screen should make users want to revisit old adventures.

---

## 11. Digital Passport Screen

Create a digital National Park Passport.

Visited parks show earned stamps.

Unvisited parks show empty/locked stamp placeholders.

Each stamp should include:

- Park name.
- Date visited.
- Unique stamp/badge artwork.
- Optional favorite marker.

Include:

- Passport book/page layout.
- Grid of stamps.
- Completion progress.
- Stamp earned animation.
- Regional passport sections.

Example sections:

- Northeast
- Southeast
- Midwest
- Mountain West
- Pacific
- Alaska
- Hawaii / Pacific Islands

The passport should feel collectible and satisfying.

---

## 12. Collection Screen

Create a collection screen similar to the PDF’s `Your Collection` preview.

Include:

- Earned stamps.
- Badges.
- Favorite parks.
- Completed regions.
- Locked collectibles.

Use illustrated circular or patch-style badges.

This screen should feel like looking at stickers, patches, and passport stamps.

---

## 13. Achievements Screen

Create a gamified achievement system.

Example badges:

- First Park
- 5 Parks Visited
- 10 Parks Visited
- 25 Parks Visited
- 50 Parks Visited
- Ultimate Ranger
- Sunrise Chaser
- Wildlife Spotter
- Trail Blazer
- Camper
- Photographer
- Road Tripper
- New England Explorer
- Mighty Five Explorer
- Mountain Lover
- Desert Wanderer
- Coastal Explorer

Each achievement should have:

- Cute illustrated badge.
- Title.
- Short description.
- Earned/locked state.
- Progress bar if partially complete.

Example achievement:

- `Sunrise Chaser`
- `Watch sunrise in 5 parks.`
- `3 / 5 complete`

---

## 14. Stats Screen

Create a playful stats dashboard.

Include:

- Total parks visited.
- Completion percentage.
- Total trips.
- Total photos.
- States visited.
- Favorite region.
- Most common activity.
- Miles hiked.
- Trips by year.
- Parks by region.

Keep this visually cozy.

Use:

- Cards.
- Rings.
- Small charts.
- Playful summaries.
- Badges.
- Illustrated stat callouts.

Avoid making it look like a corporate analytics dashboard.

Example summary:

- `You are officially a Mountain Explorer.`
- `Your most logged activity is Hiking.`

---

## 15. Wishlist / Bucket List Screen

Create a wishlist screen for future adventures.

Include:

- Bucket list parks.
- Planned trip year.
- Notes.
- Dream activities.
- Priority level.
- Map preview.
- Button to convert wishlist item into logged trip.

Example wishlist notes:

- `See sunrise at Cadillac Mountain.`
- `Hike Angels Landing.`
- `Visit during wildflower season.`
- `Camp under the stars.`

---

## 16. Profile Screen

Create a friendly profile screen matching the PDF’s profile/dashboard style.

Include:

- Avatar or mascot badge.
- Greeting: `Hey, Explorer!`
- Short tagline.
- Stats:
  - Visited
  - To Go
  - Bucket List
- Recent Trips.
- Your Collection preview.
- Settings shortcut.

Use the same warm card layout, illustrated thumbnails, and bottom navigation.

---

## 17. Settings Screen

Create a simple settings screen.

Include:

- Profile settings.
- Theme selection.
- Data export.
- Backup/sync placeholder.
- Notification preferences.
- Units:
  - Miles/kilometers.
- About app.
- Privacy.

Keep the design consistent and cute.

---

## 18. Empty States

Create delightful empty states.

### No trips yet

Copy:

- `No adventures logged yet.`
- `Ready to save your first trail memory?`

Button:

- `Log First Trip`

### No passport stamps yet

Copy:

- `Your passport is waiting for its first stamp.`

### No wishlist parks

Copy:

- `Dream up your next adventure.`

Use mascot illustrations in empty states.

---

# Data Model

Use simple mock data first.

## Park Model

Fields:

- `id`: string
- `name`: string
- `state`: string
- `region`: string
- `description`: string
- `establishedYear`: number
- `acres`: number
- `image`: string
- `status`: one of `visited`, `bucketList`, `planned`, `notVisited`
- `isFavorite`: boolean
- `visitedDates`: optional string array

## Trip Model

Fields:

- `id`: string
- `parkId`: string
- `startDate`: string
- `endDate`: string
- `activities`: string array
- `notes`: string
- `photos`: string array
- `weather`: optional string
- `favoriteTrail`: optional string
- `wildlifeSightings`: optional string array
- `rating`: optional number
- `milesHiked`: optional number

## Badge Model

Fields:

- `id`: string
- `name`: string
- `description`: string
- `category`: one of `parks`, `activity`, `region`, `memory`, `special`
- `icon`: string
- `earned`: boolean
- `earnedDate`: optional string
- `progress`: optional number
- `goal`: optional number

## UserStats Model

Fields:

- `totalVisited`: number
- `totalRemaining`: number
- `bucketListCount`: number
- `completionPercentage`: number
- `totalTrips`: number
- `totalPhotos`: number
- `totalMilesHiked`: number
- `statesVisited`: number
- `favoriteActivity`: string

---

# Mock Data Requirements

Use realistic mock data for v1.

Include sample parks:

- Grand Teton
- Yellowstone
- Yosemite
- Zion
- Acadia
- Rocky Mountain
- Olympic
- Great Smoky Mountains
- Glacier
- Arches

Include mock trips matching the design reference examples:

- Yellowstone: Apr 10 - Apr 14, 2024.
- Zion: Mar 2 - Mar 5, 2024.
- Rocky Mountain: Oct 8 - Oct 11, 2023.
- Grand Teton: Aug 12 - Aug 16, 2023.

Use visual placeholder illustrations if real assets are unavailable.

---

# Interaction Requirements

Add delightful mobile interactions:

- Button press animations.
- Card press animations.
- Smooth screen transitions.
- Progress ring animation.
- Trip saved animation.
- Passport stamp animation.
- Badge unlocked animation.
- Mascot celebration messages.
- Confetti/sparkles when milestones are reached.

Example mascot messages:

- `Nice work, Explorer!`
- `Another memory saved!`
- `Your passport is growing!`
- `Adventure awaits!`
- `You earned a new badge!`

---

# Component Architecture

Create reusable components:

- AppShell
- BottomTabBar
- Header
- HeroCard
- ParkCard
- TripCard
- MemoryCard
- StampCard
- BadgeCard
- ProgressRing
- StatCard
- ActivitySelector
- PhotoPicker
- EmptyState
- MascotCallout
- PrimaryButton
- SecondaryButton
- FilterPill

Keep styling centralized.

Create a theme file for:

- Colors.
- Typography.
- Spacing.
- Border radii.
- Shadows.
- Button styles.

---

# Development Priorities

## Phase 1

Build the visual mobile app using mock data.

Must include:

1. Welcome screen.
2. Home dashboard.
3. Parks explorer.
4. Interactive map mockup.
5. Park detail.
6. Log trip.
7. Trips list.
8. Profile.
9. Passport.
10. Collection preview.

## Phase 2

Add:

1. Memories scrapbook.
2. Achievements.
3. Stats.
4. Wishlist.
5. Settings.
6. Onboarding.

## Phase 3

Add persistence and backend readiness:

1. Local storage.
2. Photo upload placeholder.
3. Authentication placeholder.
4. Supabase/Firebase-ready service layer.
5. Data export.

---

# Quality Bar

The app should look production-ready.

Prioritize:

- Visual consistency with `docs/app-design-inspo.pdf`.
- Cute illustrated mobile-first design.
- Smooth interactions.
- Clean spacing.
- Strong component reuse.
- No clutter.
- No corporate dashboard feel.
- No generic template look.

The final result should feel like a complete cozy adventure companion app for National Park lovers.

This is not just a tracker.

This is a gamified, illustrated, scrapbook-style National Park Passport designed to help users collect parks, save memories, and celebrate outdoor adventures.