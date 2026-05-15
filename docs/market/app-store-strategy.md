# App Store Strategy

## Positioning

- Launch web-first and only move to App Store packaging after the hosted MVP is stable on real phones
- Position Chore Wars as a playful household fairness and chore competition app, not a kids-only allowance product
- Keep the App Store story focused on quick chore completion, household score visibility, and fair competition
- Treat App Store launch as a native wrapper and release-readiness exercise, not a rewrite

## Recommended category

- Primary: Productivity or Lifestyle, depending on the final listing fit
- Secondary consideration: Family if the store review framing fits the household use case

## Subtitle ideas

- Chore competition for shared homes
- Fair chores, fast taps, friendly competition
- See who is winning the house
- Turn chores into a quick household game

## Competitor categories

- Family chore apps
- Kids allowance apps
- Family organiser apps
- Habit and task gamification apps

## Competitor examples to track

- S'moresUp
- Greenlight
- GoHenry
- BusyKid
- Cozi
- ChoreBucks
- Other chore chart and family organiser apps discovered during later research

## Screenshot story order

- Household score and winner at a glance
- One-tap chore completion
- Quick chore buttons/cards
- Weekly activity and simple score view
- Setup and household onboarding
- Friendly completion feedback

## Keyword themes

- chore chart
- household fairness
- family chores
- shared home
- chore game
- room-mates / flatmates
- rewards-free competition
- quick completion

## TestFlight beta strategy

- Use TestFlight for iPhone validation before submission
- Test household creation, chore completion, and duplicate-tap protection on real devices
- Include testers from target user groups such as families, couples, flatmates, and shared houses
- Use beta feedback to check whether the app feels native enough

## Apple review risks for WebView apps

- Thin wrapper risk if the native shell feels lazy or unfinished
- Missing loading, offline, or error states
- Weak App Store metadata or misleading screenshots
- Missing privacy policy, support, or account deletion flow
- Any exposure of secrets or service-role logic in the client bundle

## How to make the app feel native enough

- Use a branded splash screen and app icon
- Add polished loading and offline states
- Keep navigation and gestures simple
- Make the wrapper feel like a mobile app, not a browser tab
- Preserve the fast tap-first chore flow from the web MVP

## Privacy label planning

- Map auth, household, scoring, and support data accurately
- Match labels to actual collection and retention behaviour
- Do not understate data collection in the store listing
- Keep policy text aligned with the deployed product and wrapper
