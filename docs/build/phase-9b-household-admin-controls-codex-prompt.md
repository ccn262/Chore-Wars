# Phase 9B Household Admin Controls - Codex Prompt

Create a new branch:

- `codex/phase9b-household-admin-controls`

Read first:

- `AGENTS.md`
- `docs/build/phase-9b-household-admin-controls-blueprint.md`
- `docs/database/schema-overview.md`
- `docs/database/table-specs.md`
- `docs/database/rls-plan.md`
- `docs/logs/session-handoff.md`

Task objective:

Implement the Phase 9B household admin controls foundation so owners and admins can manage member-facing names, household chores, and the household week start day.

Required scope:

- owner/admin member display-name editing
- owner/admin chore editing
- chore archive or deactivate flow
- household week start day setting
- weekly score calculation update
- leaderboard and rewards wording update where needed
- mobile-first Settings UI
- preserve RLS and household scoping

Implementation guidance:

- inspect the current schema before adding any migration
- use `household_settings` for week start day if the current schema already supports it
- add a narrow migration only if a required field or constraint is missing
- keep member display names separate from auth identity
- prefer archive or deactivate over destructive delete
- keep normal members read-only
- keep the UI simple and phone-friendly
- keep copy concise and future i18n-friendly
- do not use Resend
- do not add payments, charts, reports, App Store work, or complex recurring scheduling
- do not weaken security or invite/member permissions

Validation:

- run `npm run lint`
- run `npm run build`
- run `git diff --check`
- run a conflict-marker search across `docs`, `src`, and `supabase`
- run `git ls-files .env.local`

Smoke test if practical:

- owner/admin can open Settings and edit member-facing names
- owner/admin can edit chore title and points
- owner/admin can archive or deactivate a chore
- owner/admin can set the household week start day
- leaderboard and rewards wording reflect the selected week start
- member account remains read-only for admin controls
- home, chores, leaderboard, and rewards still render correctly after edits

Logs:

- update `docs/logs/session-handoff.md`
- update `docs/logs/change-log.md`
- update `docs/logs/decision-log.md`
- update `docs/logs/known-issues.md`

Commit:

- `Add Phase 9B household admin controls blueprint`

Push:

- push the branch `codex/phase9b-household-admin-controls`

Boundaries:

- no destructive member deletion
- no destructive chore deletion
- no complex permissions beyond owner/admin/member
- no email invite automation
- no App Store or Expo work
- no broad rewrites
- no secrets
