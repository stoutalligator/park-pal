# App Store / Play Store Submission Reference

Copy-paste source for store listings and the privacy questionnaires. Not app documentation — working content for App Store Connect / Google Play Console.

---

## Closed Beta Plan (retired)

The app previously gated sign-up behind a shared Beta Key (`supabase/functions/beta-signup`) while it was friends-and-family only. That gate has been removed — `AuthScreen.tsx` now calls `supabase.auth.signUp()` directly and the `beta-signup` Edge Function has been deleted. If a `BETA_SIGNUP_KEY` secret is still set on the Supabase project, it's inert and can be removed with `npx supabase secrets unset BETA_SIGNUP_KEY`.

**Before opening sign-ups publicly, double-check in the Supabase dashboard (Authentication → Providers → Email):**
- Whether "Confirm email" is on. If it is, new users get a confirmation email before they can log in (the app already handles this — see `confirmEmailSent` in `AuthScreen.tsx`). If it's off, `signUp()` returns a live session immediately and users land straight in onboarding.
- The **Site URL** / redirect URLs are set to something reasonable, since confirmation and reset-password emails link out to them.

---

## 0. Full Path From Here to Live (ordered)

**Accounts (do these first — they gate everything else)**
1. Enroll in the **Apple Developer Program** — developer.apple.com/programs, $99/year, needs a real name + address, approval can take a few hours to a day or two.
2. Create a **Google Play Console** account — play.google.com/console, one-time $25 fee, approval is usually fast (sometimes instant, sometimes ~1 day for identity verification).

**iOS: get a build onto your phone**
3. `npx eas login` (or `eas login`) — link the project to your Expo account if not already.
4. `eas build --platform ios --profile preview` — first run will prompt to create/link iOS credentials (signing certificate + provisioning profile); let EAS manage these automatically unless you already have your own.
5. `eas submit --platform ios --latest` — uploads that build to App Store Connect / TestFlight.
6. Install **TestFlight** from the App Store on your phone, accept the invite, install the build, actually use the app end to end on real hardware (not just launch it) — this is where you'd catch anything Expo Go's sandbox hid, like the Sentry native module.

**Android: get a build onto your phone (optional but cheap to do in parallel)**
7. `eas build --platform android --profile preview` — produces an installable `.apk` directly (per your `eas.json` preview profile), no store account needed yet — EAS gives you a download link/QR code you can install straight onto an Android phone for testing.
8. Once happy, `eas build --platform android --profile production` (`.aab`) + `eas submit --platform android --latest` to get it into Play Console's internal testing track.

**Store listing setup (can happen anytime after accounts exist, in parallel with testing)**
9. In App Store Connect: create the app record (bundle ID `com.parkpal.app` already matches `app.json`), fill in listing copy, keywords, category, age rating, and the App Privacy questionnaire — all drafted in sections 1–4 below.
10. In Play Console: create the app, fill in the Data Safety form and content rating questionnaire, store listing text — also drafted below.
11. Take the actual screenshots (section 6 below is not done yet) and upload them to both consoles.
12. Set Support URL → `https://parks-pal.com/support` and Privacy Policy URL → `https://parks-pal.com/privacy` in both consoles.

**Final checks before hitting submit**
13. Confirm the Supabase SQL migrations in `supabase/schema.sql` have actually been run against the live project (trip_type column, delete_own_account function) — the file has them, but confirm the live DB does too.
14. Walk the account-deletion flow once for real on the TestFlight build, since Apple reviewers specifically test this.
15. Decide the Sentry auth token / custom SMTP items now, since "first real production build" is now — or explicitly keep deferring them, that's fine too, just a conscious choice at this point rather than a default.

**Submit**
16. In App Store Connect, select the TestFlight-tested build, complete the submission questionnaire (export compliance — already answered via `ITSAppUsesNonExemptEncryption: false` in `app.json`), and submit for review. Typical review time: 1–3 days.
17. In Play Console, promote the tested build from internal testing to production (or go through Google's closed/open testing track first if you want more real-world testers before a full release). Review time: usually a few hours to 1 day.

---

## 1. Listing Copy

### App name
**Parks Pal** (the internal bundle identifier stays `com.parkpal.app` — that's not user-visible and doesn't need to change; only the display name shown on the store listing and home screen is "Parks Pal")

### iOS Subtitle (30 char limit)
`Your National Park Passport`

### iOS Promotional Text (170 char limit, editable without a new build)
`Track every trip to all 63 U.S. National Parks. Plan visits, log memories and photos, collect passport stamps, and earn badges along the way.`

### iOS Keywords (100 char limit, comma-separated, no spaces needed after commas)
`national park,hiking,trip planner,travel journal,passport,badges,camping,outdoors,nature,trail log`

### Google Play Short Description (80 char limit)
`Track, plan, and log your visits to all 63 U.S. National Parks.`

### Full Description (works for both stores, ~1500 chars — well under either 4000-char cap)
```
Parks Pal is your cozy companion for exploring America's National Parks.

Whether you're checking parks off your bucket list or reliving trips you've already taken, Parks Pal helps you track it all:

COLLECT
Mark every park you've visited and watch your progress fill in toward all 63 U.S. National Parks.

EXPLORE
Plan upcoming trips with dates and activities, then browse each park's trails and wildlife.

REMEMBER
Log completed trips with photos, notes, trail hikes, and wildlife sightings — build a real travel journal you'll want to look back on.

Along the way, collect digital passport stamps and earn badges for milestones like your first hike, your first camping trip, or reaching a new region.

Parks Pal keeps your data private and synced to your own account — no ads, no tracking, no selling your data. Just a simple, illustrated way to keep your park adventures organized.

COLLECT. EXPLORE. REMEMBER.
```

### Category
Primary: **Travel**. Secondary (iOS only, optional): **Lifestyle**

---

## 2. Age Rating

**Apple (App Privacy → Age Rating questionnaire):** No objectionable content in any category (violence, mature themes, gambling, etc. all "None") → resolves to **4+**.

**Google Play (Content rating questionnaire, via IARC):** Answer "No" to every mature-content question (violence, sexual content, drugs, gambling, user-generated text shared publicly — trip notes are private to the account, not public/social) → resolves to **Everyone**.

---

## 3. Apple "App Privacy" (Data Collection) answers

Go to App Store Connect → App Privacy → and declare:

| Category | Data type | Collected? | Linked to identity? | Used for tracking? | Purpose |
|---|---|---|---|---|---|
| Contact Info | Email Address | Yes | Yes | No | App Functionality (account login) |
| User Content | Photos or Videos | Yes | Yes | No | App Functionality (trip photos) |
| User Content | Other User Content | Yes | Yes | No | App Functionality (trip notes, activities, trail/wildlife logs) |
| Identifiers | User ID | Yes | Yes | No | App Functionality (account/session) |
| Diagnostics | Crash Data | Yes | **No** | No | App Functionality (Sentry crash reporting — no email/user ID attached, see note below) |

Everything else (Location, Financial Info, Health & Fitness, Contacts, Browsing History, Search History, Usage Data, Purchases, Messages) → **not collected**.

**Note on Diagnostics / Sentry:** the code never calls `Sentry.setUser()`, so crash reports carry device/OS info but no email or account identifier — that's why Diagnostics is "not linked to identity." If a `setUser` call is ever added later, this answer needs to flip to "linked."

**"Data Used to Track You"**: answer **No** across the board — nothing is used for cross-app/cross-site tracking, no ad networks, no data brokers. This also means no App Tracking Transparency (ATT) prompt is needed.

---

## 4. Google Play "Data Safety" answers

| Section | Answer |
|---|---|
| Does your app collect or share any of the required user data types? | Yes |
| Data types collected | Personal info → Email address · Photos and videos → Photos · App activity → App interactions (trip/park data) · App info and performance → Crash logs |
| Is all collected data encrypted in transit? | Yes (HTTPS/TLS to Supabase) |
| Do you provide a way for users to request data deletion? | Yes — in-app (Settings → Delete Account), immediate and permanent |
| Is data shared with third parties? | No |
| Is data collection optional for any of these types? | No — email is required to create an account; photos are optional (user chooses whether to attach them) |

Privacy Policy URL for both stores: **https://parks-pal.com/privacy**
Support URL for both stores: **https://parks-pal.com/support**

---

## 5. iOS Privacy Manifest

No manual `PrivacyInfo.xcprivacy` file is needed in this project. The only dependency that touches an Apple "required reason" API is `@react-native-async-storage/async-storage`, and it already ships its own manifest (`node_modules/@react-native-async-storage/async-storage/ios/PrivacyInfo.xcprivacy`), which Xcode auto-merges at build time via EAS Build. No other dependency (Supabase, Sentry, expo-image-picker) touches a required-reason API directly. Nothing to author here — just confirm App Store Connect doesn't flag a missing manifest after the first build upload, since new SDK versions occasionally add new required-reason usage.

---

## 6. Screenshots

**Not yet generated** — `.tmp-screenshots/out` is empty. Required sizes:

- iOS: 6.9" display (iPhone 16 Pro Max class, 1320×2868 or 2868×1320) — **required**. 6.5" and 5.5" are optional now that Apple auto-scales, but including them avoids relying on that.
- Android: phone screenshots, minimum 320px, recommended 1080×1920 or similar 16:9/9:16.

Recommended shots (5–6, in this order): Explore/map screen, a Park Detail sheet, Log/Plan a Trip, Trip Detail with photos, Profile/passport stamps screen. Since there's no real device farm set up, the fastest path is running the iOS Simulator (6.9" class device) and Android Emulator locally and capturing each screen with the demo account populated with a few trips so the screens don't look empty.
