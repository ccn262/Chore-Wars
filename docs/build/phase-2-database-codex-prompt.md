# Phase 2 Codex Prompt

Use this prompt for the next implementation task after the blueprint is approved.

## Prompt

Create a new branch:

`codex/phase2-database-foundation`

Read `AGENTS.md` first.
Read `docs/build/phase-2-database-implementation-blueprint.md` first.

Build the Supabase database foundation for Chore Wars only.

Scope rules:

- Create Supabase migration SQL files
- Create seed SQL or seed files as appropriate
- Define the core tables
- Define constraints and indexes
- Define initial RLS policies
- Update database docs and logs
- Run available validation
- Commit and push the branch
- Do not merge into `main`

Table scope:

Identity and access:

- `profiles`
- `households`
- `household_members`
- `household_invites`

Chore system:

- `chore_categories`
- `chore_templates`
- `chores`
- `chore_completions`

Scoring:

- `points_ledger`

Optional if needed:

- `household_settings`
- `audit_log`

Boundaries:

- Use Supabase Auth users separately from household members
- Allow one auth user to belong to multiple households
- Keep `household_members` as the household-scoped identity for scoring
- Allow for later child or non-email member support
- Keep chore completions immutable where practical
- Use points ledger entries instead of only mutable totals
- Seed starter chore templates rather than hardcoding starter chores in the UI
- Keep all access household-scoped
- Use RLS from the start
- Store timestamps with timezone awareness
- Do not hardcode currency assumptions
- Keep rewards, forfeits, achievements, payments, and app UI work out of scope

Implementation notes:

- Create migrations in a clear, incremental order
- Add indexes and foreign keys where they support access and lookup patterns
- Keep seed data fake and reset-friendly
- Verify policies carefully before considering the schema ready
- Preserve existing app scaffolding and docs

Validation expectation:

- Database files are created cleanly
- Seed data is usable for local development
- RLS policies match the blueprint
- Relevant docs and logs are updated
- The branch is committed and pushed

