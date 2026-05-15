# Phase 4 - Chore engine foundation

## Phase name

Phase 4 - Chore engine foundation

## Objective

Make Chore Wars functionally useful at the basic level: open the app, view chores, tap a chore, record completion, add points, and show simple feedback quickly on a phone.

## Why chore engine comes after auth and household onboarding

- Chore actions need a stable signed-in user and active household context
- Household-scoped chore data depends on the access model proven in Phases 2 and 3
- One-tap completion only works when the app already knows who the user is and which household they are in
- The chore loop should build on the onboarding path rather than compete with it
- Core chore data and scoring logic need to be trusted before reporting or polish layers are added

## What Phase 4 includes

- Load starter chore templates from seeded database data
- Allow owner or admin to create household chores from templates
- Allow owner or admin to create a simple custom household chore
- Show household chores on the Chores page
- Show quick chore buttons on Home
- One-tap chore completion
- Insert `chore_completions` event rows
- Insert `points_ledger` entries
- Show simple member score totals for the current week
- Show a recent activity feed
- Provide simple loading, error, and empty states
- Keep the UI mobile-first with cards and large buttons

## What Phase 4 excludes

- Advanced leaderboard calculations
- Charts or full reporting views
- Photo proof
- Streaks
- Achievements
- Rewards or forfeits
- Invite emails via Resend
- Payments or subscriptions
- Expo wrapper or App Store work
- Complex recurring assignment engine
- Push notifications

## Required app routes

- `/home`
- `/chores`
- `/settings`
- `/household/[id]` or an equivalent household-scoped chore surface if needed
- Any narrow chore detail or quick-add route needed for owner/admin creation

## Required components

- Quick chore button or card
- Household chore card
- Chore template picker or template chip list
- Custom chore form
- Recent activity feed item
- Weekly score summary card
- Loading skeletons
- Empty state card
- Error state card

## Required server actions/data functions

- Load household chores for the active household
- Load starter chore templates from seeded categories/templates
- Create a household chore from a template
- Create a custom household chore
- Record a chore completion
- Write a points ledger entry for each completion
- Load recent activity for the household
- Calculate or summarise weekly member scores
- Enforce household-scoped access on all write paths

## Database tables used

- `profiles`
- `households`
- `household_members`
- `chore_categories`
- `chore_templates`
- `chores`
- `chore_completions`
- `points_ledger`
- `household_settings` where needed for preferences
- `audit_log` where needed for important system events

## Chore template loading plan

- Read starter chore templates from seeded database rows, not hardcoded UI lists
- Group templates by category for simple selection
- Keep the template loader household-aware but reusable
- Use seeded templates as the default source for new household chores

## Household chore creation plan

- Owner or admin can create chores from templates
- Owner or admin can create a simple custom chore with a short form
- Save the household chore separately from the global template record
- Preserve title, icon key, points, cadence, and source metadata where the schema supports it
- Keep creation flows short and easy to use on a phone

## One-tap completion plan

- Put quick completion controls on the Home screen
- Make the default path a single tap where safe
- Record the completion event immediately
- Keep optional notes or proof secondary
- Use optimistic feedback where it does not risk incorrect state

## Points ledger plan

- Create a `points_ledger` row for each completion
- Treat the ledger as the source of truth for score changes
- Avoid relying only on mutable totals
- Keep point values auditable and tied to completion records where possible

## Recent activity plan

- Show the latest household chore completions in a simple feed
- Include who completed the chore, what they did, and when
- Keep the feed short, visual, and easy to scan
- Use the feed as confirmation that the app is alive and fair

## Basic score summary plan

- Show simple member score totals for the current week
- Keep the summary lightweight and mobile-friendly
- Avoid deep analytics or multi-axis charts in this phase
- Use the summary to reinforce fairness and momentum

## Mobile-first UI requirements

- Home is the hero interaction surface
- Use large rounded chore cards and buttons
- Keep forms short and focused
- Avoid desktop-style dashboards and dense tables
- Prefer fast scanning, quick taps, and simple feedback
- Keep copy short and future i18n-friendly

## RLS and security considerations

- All chore reads and writes must remain household-scoped
- Only owners or admins can create household chores from templates
- Only members in the household can complete chores and view the activity feed
- Completion and points writes must respect the Phase 2 RLS model
- Service role or server-only behaviour should remain isolated and auditable
- Do not bypass database permissions in the UI layer

## Validation plan

- Confirm starter templates load from seeded database rows
- Confirm owner/admin chore creation works
- Confirm a household chore can be completed with one tap
- Confirm `chore_completions` and `points_ledger` rows are written
- Confirm simple weekly score totals render correctly
- Confirm recent activity updates after completion
- Confirm empty, loading, and error states are usable on a phone
- Run lint, build, and any relevant repo checks after implementation
- Run a local runtime smoke test if Supabase env vars are available

## Acceptance criteria

- The user can open the app, see chores, tap one, and get a recorded completion quickly
- Household chores can be created from templates or as simple custom chores
- Points are written through the ledger for each completion
- The Home screen shows simple score and activity feedback
- The chore loop feels mobile-first and fast
- The implementation stays narrow and does not overbuild reporting or gamification

## Risks and constraints

- Premature reporting or scoring complexity could slow the core chore loop
- Incorrect RLS assumptions could block valid household actions
- Overly clever assignment rules could obscure the primary tap-to-complete path
- Template loading must stay database-driven so it remains localisable and editable
- The UI must not drift into desktop-style management screens

## Follow-up phases

- Phase 5: reporting and visual summaries
- Phase 6: reminders and retention polish
- Phase 7: rewards, forfeits, and lightweight gamification
- Phase 8: native wrapper and store-readiness work
