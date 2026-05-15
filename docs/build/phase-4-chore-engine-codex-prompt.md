# Phase 4 Codex Prompt - Chore engine foundation

Read `AGENTS.md` first, then read `docs/build/phase-4-chore-engine-blueprint.md` before making any changes.

Create a new branch:

- `codex/phase4-chore-engine-foundation`

Implement the core chore loop for Chore Wars with a narrow, mobile-first scope.

Required work:

- Use the existing Supabase auth, session, and household foundation
- Load household chores for the active household
- Load chore templates from the seeded database data where needed
- Create household chores from templates for owner/admin users
- Create a simple custom household chore flow for owner/admin users
- Complete a chore with one quick tap
- Write `chore_completions`
- Write `points_ledger` entries for completions
- Show recent activity
- Show a simple weekly score summary
- Update logs after meaningful work
- Run validation after implementation
- Perform a local runtime smoke test if env vars are available
- Commit changes
- Push the feature branch

Boundaries:

- Do not implement advanced leaderboard calculations
- Do not build charts or full reports
- Do not add photo proof
- Do not add streaks, achievements, rewards, or forfeits
- Do not add invite emails via Resend
- Do not add payments or subscriptions
- Do not add Expo or App Store work
- Do not build a complex recurring assignment engine
- Do not add push notifications
- Do not hardcode starter chores in UI; use seeded templates and database data
- Do not merge into `main`

Implementation guidance:

- Keep the Home screen as the hero interaction surface
- Use large buttons and cards for chore completion
- Keep forms short
- Prefer quick taps and optimistic feedback where safe
- Keep the UI mobile-first and uncluttered
- Keep user-facing copy short and future i18n-friendly
- Keep access household-scoped and respect RLS
- Use the ledger as the source of truth for score changes

Suggested validation:

- `npm run lint`
- `npm run build`
- `git diff --check`
- `rg -n "merge conflict markers" docs src supabase`
- `git ls-files .env.local`

If runtime env vars are available, run a local smoke test for:

- household chore loading
- template-based chore creation
- custom chore creation
- one-tap completion
- points ledger insert
- recent activity display
- weekly score summary

Update:

- `docs/logs/session-handoff.md`
- `docs/logs/change-log.md`
- `docs/logs/decision-log.md`
- `docs/logs/known-issues.md` if needed

Commit with:

- `Implement Phase 4 chore engine foundation`

Push the branch:

- `codex/phase4-chore-engine-foundation`
