# Session Handoff

Use this file to leave a concise handoff for the next working session.

## Active Project

- Active project: Chore Wars
- Current phase: Phase 3 runtime smoke test complete
- Current branch: codex/phase3-auth-household-foundation
- Repo status: Phase 1 and Phase 2 merged; Phase 3 auth foundation smoke-tested and lightly hardened
- Supabase status: project created, migration and seed applied successfully
- Next branch planned: codex/phase4-chore-engine-foundation
- Next task: prepare Phase 4 chore engine planning from the validated auth/onboarding base
- Implementation status: app scaffold, database foundation, and auth/onboarding foundation complete locally; runtime smoke test passed
- Current blockers: none
- Security note: secrets must remain outside git and only in `.env.local` / deployment env vars

## Phase 1 summary

- Next.js App Router scaffold created with TypeScript and Tailwind CSS
- Mobile-first app shell added with bottom navigation
- Placeholder routes added for landing, auth, setup, home, chores, leaderboard, reports, and settings
- Reusable UI primitives added for future feature work
- Supabase placeholder helpers added without real auth or database logic
- Route structure reviewed and confirmed to use visible `/auth/*` and `/setup/*` segments plus the `(app)` shell group

## Phase 2 summary

- Phase 2 blueprint prepared for the Supabase database foundation
- Core relational tables, RLS, seed data, and migration strategy are planned
- A Codex-ready prompt is prepared for the next database implementation task
- Core migration and seed SQL files have been created
- Database docs have been aligned to the implemented table set
- Validation available in this environment is limited to repo-level checks
- Chore Wars Supabase dev project exists
- Supabase credentials must be stored only in `.env.local`
- Do not commit or store secrets in tracked files
- The migration has now been applied successfully in Supabase SQL Editor
- The seed has now been applied successfully in Supabase SQL Editor
- Phase 2 database foundation has been manually validated in Supabase SQL Editor
- The seed file now contains only global starter categories and templates

## Phase 3 summary

- Phase 3 blueprint prepared for Supabase Auth and household onboarding
- Phase 3 will connect auth sessions to profile bootstrap and household creation
- Protected routes and onboarding redirects are planned before chore engine work
- A Codex-ready prompt is prepared for the next auth implementation task
- Supabase Auth sign-in, sign-up, sign-out, callback, and household onboarding actions are implemented
- The protected app shell now redirects unauthenticated users and users without a household
- Profile bootstrap and household creation are wired to the Phase 2 database foundation
- Server Supabase cookie writes are now guarded so server-rendered auth reads stay safer
- Runtime auth smoke test passed with a disposable test user in the local Supabase project
- Landing, auth, redirect, household creation, owner-member creation, and sign-out flows all passed in the local runtime check

## Include

- What changed
- What is still missing
- Assumptions made
- Risks or open questions
- Suggested next step
