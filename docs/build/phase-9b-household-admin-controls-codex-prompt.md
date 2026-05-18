# Phase 9B Codex Prompt - Household admin controls and week settings

Create a new branch:

- `codex/phase9b-household-admin-controls`

Before changing files, read `AGENTS.md` and the Phase 9B blueprint in `docs/build/phase-9b-household-admin-controls-blueprint.md`.

Goal:

- Implement the narrow household admin controls foundation needed for real beta use
- Keep the work mobile-first, household-scoped, and safe

What to inspect first:

- Current schema and table specs
- Current RLS plan
- Existing household settings, member list, and chore management code
- Existing weekly score / leaderboard calculation code

Implementation guidance:

- Inspect the current schema before adding migrations
- Add a narrow migration only if the current schema truly needs it
- Prefer `household_settings` for the household week-start setting if it already fits
- Implement owner/admin member display-name editing
- Implement owner/admin chore editing
- Implement chore archive / deactivate flow instead of hard delete
- Update weekly score calculations to use the household week-start day
- Update leaderboard and rewards wording to reflect the selected week start
- Keep normal members read-only
- Preserve RLS and household scoping
- Keep copy concise, friendly, and future i18n-friendly

Boundaries:

- Do not implement destructive member deletion
- Do not implement destructive chore deletion
- Do not add complex recurring scheduling
- Do not add advanced reports or charts
- Do not add Resend email invites or email summaries
- Do not add payments or subscriptions
- Do not add achievements, streaks, or photo proof
- Do not add push notifications
- Do not add Expo or App Store work
- Do not use service role logic in app source

Required outputs:

- Update docs and logs to reflect the new admin controls and week-start setting
- Run validation
- Run local and hosted smoke tests if practical
- Commit and push the branch
- Do not merge into `main`

Validation:

- `npm run lint`
- `npm run build`
- `git diff --check`
- run the conflict-marker search from the task notes
- `git ls-files .env.local`

Smoke test expectations:

- Owner/admin can edit member display names
- Owner/admin can edit or archive chores
- Week start changes update the leaderboard window
- Normal members cannot access admin controls
- Archived chores do not remain active
- Existing history and points remain intact
