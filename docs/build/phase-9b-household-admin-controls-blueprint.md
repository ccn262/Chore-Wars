# Phase 9B - Household admin controls and week settings

## Phase name

Phase 9B - Household admin controls and week settings

## Objective

Give household owners and admins practical control over member display names, household chores, and the household week start day before wider beta testing.

## Why this comes after household invites and beta polish

- Household invites are already live, so the app can support real multi-user households
- Real-household beta polish has already exposed the need for clearer admin controls
- Member names, chore settings, and week start rules become more useful once a household actually has multiple active people using the app together
- These controls improve the existing MVP without moving into advanced reporting or complex scheduling

## What Phase 9B includes

- Owner/admin can edit household member display names or nicknames
- Owner/admin can view member role and status clearly
- Owner/admin can edit household chore title or name
- Owner/admin can edit chore points
- Owner/admin can edit chore cadence if supported by the existing schema
- Owner/admin can archive or deactivate household chores
- No hard delete by default
- Owner/admin can choose the household week start day
- Weekly score, leaderboard, rewards/forfeits, and future insights use the household week start day
- Simple mobile-first settings/admin UI
- Friendly empty and error states

## What Phase 9B excludes

- Destructive member deletion
- Destructive chore deletion
- Complex permissions beyond owner/admin/member
- Custom recurring schedule engine
- Advanced reports or charts
- Resend email invites
- Payments or subscriptions
- Achievements or streaks
- Photo proof
- Push notifications
- Expo or App Store implementation

## Product behaviour

- Settings should stay simple and easy to scan on a phone
- Owners and admins should be able to manage practical household-facing details without a desktop-style admin console
- Member and chore edits should stay scoped to the active household
- Chore archive should behave like a pause, not a delete
- The week start setting should be visible in plain language, such as "Your leaderboard week starts on Saturday."
- The default Monday week start should remain unchanged unless the household owner/admin edits it

## Member name / nickname management plan

- Owner/admin can edit the display name shown for a household member
- The edit should be household-scoped and only available to owners/admins
- The UI should make it clear the change affects how the member appears inside this household
- Use friendly copy that avoids admin-heavy wording
- Preserve the profile and household membership relationship

## Chore edit plan

- Owner/admin can edit chore title, points, and cadence when schema support exists
- Editing should remain mobile-first and low-friction
- The chore should continue to point at the same household chore record
- Changes should be clearly reflected in Home, Chores, and Leaderboard-related views

## Chore archive / deactivate plan

- Archive or deactivate chores instead of hard deleting them by default
- Archived chores should disappear from active quick actions and active chore lists
- Historical completions and points should remain intact
- The archive action should be clearly labelled as a pause or hide action

## Household week start day plan

- Add a household setting for the scoring week start day if the schema already supports it
- Keep the existing Monday default intact when no custom value is set
- Allow common choices such as Monday, Saturday, or Sunday
- Show the selected start day in plain English
- Keep the control simple enough for mobile settings pages

## Weekly score calculation impact

- Weekly leaderboard totals should use the household week start day
- Weekly scoring windows should match the household's own definition of a week
- Existing points ledger logic should remain the source of truth
- Avoid changing the underlying scoring model unless necessary

## Rewards / forfeits impact

- Winner and bottom-place summaries should respect the household week start day
- Rewards and forfeits should use the same weekly boundary as the leaderboard
- Rule cards should remain lightweight and readable on mobile

## Reporting / insights impact

- Future fairness reports and weekly insights should also use the household week start day
- Week-over-week comparisons should be aligned to the household's scoring week
- The phase should avoid building full reporting screens now, but the week setting should be ready for them later

## Required database considerations

- Prefer existing household-scoped tables and settings where possible
- Use `household_settings` for week start day if it already fits the schema
- Keep member and chore edits household-scoped
- Preserve row-level security
- Avoid destructive migrations unless the schema truly requires them
- Keep archived rows and history data intact

## Required routes / pages / components

- Settings screen for admin controls
- Member list or member management card
- Chore edit / archive surface
- Household week-start selector in Settings or an adjacent admin section
- Any supporting server actions needed for updates

## Mobile-first UI requirements

- Use cards, short helper text, and large tap targets
- Keep forms narrow and obvious on phone
- Avoid dense tables and desktop-style management screens
- Put the most common actions first
- Keep state feedback short and readable

## Copy / tone requirements

- Keep copy concise and future i18n-friendly
- Use friendly language rather than formal admin wording where possible
- Prefer "pause" or "archive" over "delete"
- Make the week-start setting easy to understand in a single sentence
- Avoid shame-heavy or punitive wording

## RLS / security considerations

- Owner/admin permissions must be enforced server-side, not just hidden in the UI
- Normal members should remain read-only for admin controls
- Updates must remain household-scoped
- Do not expose secrets
- Do not use service role logic in app source
- Preserve the current invite and membership security model

## Validation plan

- `npm run lint`
- `npm run build`
- `git diff --check`
- run the conflict-marker search from the task notes
- `git ls-files .env.local`

## Hosted smoke-test plan

- Sign in as household owner/admin
- Open Settings and confirm member and chore controls appear
- Edit a member display name or nickname
- Edit a chore name and points
- Archive or deactivate a chore
- Change the household week start day
- Confirm the leaderboard reflects the selected week start
- Confirm rewards and forfeits still render correctly
- Confirm normal members do not see admin controls

## Acceptance criteria

- Owner/admin can edit member-facing names within the household
- Owner/admin can edit or archive household chores without hard deleting them
- Week start is configurable at the household level
- Weekly totals and reward summaries follow the selected week start
- Normal members remain read-only for admin surfaces
- The UI stays mobile-first and uncluttered

## Risks and constraints

- Existing data may need careful migration if the week-start field is not already present
- Chore and member edits must not break active views or scoring
- The phase should not drift into complex recurrence or permission systems
- Archived rows must remain history-preserving
- The settings surface can become cluttered if too many controls are added at once

## Follow-up phases

- Phase 10 - App Store readiness and Expo wrapper
- Phase 11 - Insights, trends, and retention loops
- Later summaries, notifications, and deeper analytics should build on the week-start setting once Phase 9B is stable
