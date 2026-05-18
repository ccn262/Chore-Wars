# Phase 9B - Household admin controls and week settings

## Phase name

Phase 9B - Household admin controls and week settings

## Objective

Give household owners and admins practical control over member-facing names, household chores, and the household scoring week start day before wider beta testing.

## Why this comes after household invites and beta polish

Household invites and beta polish make the app usable with real people. The next friction point is household maintenance: owners need to correct names, tidy chores, and choose a week start that matches how the household thinks about the week. Phase 9B keeps that control simple and mobile-first before the product moves toward broader beta or store-readiness work.

## What Phase 9B includes

- owner/admin can edit household member display names or nicknames
- owner/admin can view member role and status clearly
- owner/admin can edit household chore title or name
- owner/admin can edit chore points
- owner/admin can edit chore cadence if the current schema supports it safely
- owner/admin can archive or deactivate household chores
- no hard delete by default
- owner/admin can choose the household week start day
- weekly score, leaderboard, and rewards/forfeits use the household week start day
- simple mobile-first Settings or admin UI
- friendly empty and error states

## What Phase 9B excludes

- destructive member deletion
- destructive chore deletion
- complex permissions beyond owner, admin, and member
- custom recurring schedule engine
- advanced reports or charts
- Resend email invites
- payments or subscriptions
- achievements or streaks
- photo proof
- push notifications
- Expo or App Store implementation

## Product behaviour

- owners and admins can manage the household-facing labels and chores from a small settings surface
- members stay read-only for admin controls
- chore edits should keep the app playful and practical, not admin-heavy
- week start changes should update household scoring consistently
- archive or deactivate is preferred over delete
- the UI should explain the current household week in plain language

## Member name and nickname management plan

- allow owner/admin users to update the display name used for a household member
- keep the auth account separate from the household-facing label
- preserve the underlying profile and membership record
- show role and status alongside the display name so the roster stays understandable
- keep any nickname text short and future i18n-friendly

## Chore edit plan

- allow owner/admin users to rename an existing household chore
- allow owner/admin users to update the points value
- allow owner/admin users to update cadence only if the schema and logic already support it safely
- keep edit forms short and mobile-friendly
- surface validation errors clearly and avoid destructive side effects

## Chore archive and deactivate plan

- prefer archive or deactivate over delete
- keep archived chores out of the active quick-action surface
- preserve historical scoring and completion history
- show archived state clearly so owners understand why a chore no longer appears

## Household week start day plan

- let the owner/admin choose the weekday the household considers the start of the scoring week
- default to the current Monday-based behaviour unless the household changes it
- keep the control clear, for example: “Your leaderboard week starts on Saturday”
- explain that the household week affects leaderboard, winner/bottom summaries, and rewards/forfeits

## Weekly score calculation impact

- use the selected household week start day when calculating the current scoring window
- keep timezone-aware week boundaries
- make sure leaderboard and weekly summaries match the household setting
- avoid drifting between score surfaces

## Rewards and forfeits impact

- rewards and forfeits should respect the same household week start setting
- weekly winner and bottom-place summaries should continue to use the household-scoped scoring window
- keep wording consistent across leaderboard and settings surfaces

## Required database considerations

- prefer existing household, household_settings, household_members, and chore records
- inspect the current schema before any migration
- add only narrow schema changes if a display-name, chore-edit, archive, or week-start field is missing
- keep updates household-scoped and RLS-safe
- avoid destructive deletion by default
- keep historical scoring data intact when chores are archived or renamed

## Required routes, pages, and components

- Settings section for household member editing
- Settings section for household chore editing
- Settings section for household week start day
- simple member edit controls
- simple chore edit and archive controls
- short empty and error state cards

## Mobile-first UI requirements

- keep Settings simple and readable on phone
- avoid desktop-style admin screens
- use cards, short forms, and clear primary actions
- keep tap targets large and spacing generous
- make the current household week obvious at a glance

## Copy and tone requirements

- keep copy concise and friendly
- avoid jargon and admin-heavy wording
- keep labels clear, for example “Week starts on Saturday”
- keep strings short and future i18n-friendly
- avoid language that feels punitive or bureaucratic

## RLS and security considerations

- owner/admin checks must be enforced server-side
- normal members must not see or use edit controls
- all writes must remain household-scoped
- do not expose secrets
- do not use service role in app source
- keep the current membership and invite security model intact

## Validation plan

- confirm owner/admin users can edit member names and chores
- confirm archive/deactivate keeps chores out of active surfaces
- confirm week start changes affect leaderboard calculations consistently
- confirm normal members remain read-only
- run lint and build after implementation
- update logs after meaningful changes

## Hosted smoke-test plan

- owner opens Settings and sees member, chore, and week controls
- owner updates a member-facing name and a chore title
- owner archives a chore and it disappears from active surfaces
- owner changes the household week start day and leaderboard wording updates
- member account stays read-only for admin controls
- home, chores, leaderboard, and rewards/forfeits still work after the edits

## Acceptance criteria

- owners and admins can manage the household labels and chores they need
- chore and member controls stay simple and mobile-first
- week start is configurable and reflected in scoring surfaces
- no destructive delete is added by default
- the app remains easy for a real household to understand

## Risks and constraints

- chore and member management can become admin-heavy if overbuilt
- week start changes can affect scoring expectations, so copy must be clear
- cadence editing may depend on existing schema support
- destructive deletion should stay out of scope unless explicitly revisited later

## Follow-up phases

- Phase 10 - App Store readiness and Expo wrapper
- future Resend email invite automation
- future advanced reporting and charts
- future richer beta tooling if needed
