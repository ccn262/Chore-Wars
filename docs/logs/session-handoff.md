# Session Handoff

Use this file to leave a concise handoff for the next working session.

## Active Project

- Active project: Chore Wars
- Current phase: Phase 4 chore engine foundation implemented and smoke-tested
- Current branch: codex/phase4-chore-engine-foundation
- Repo status: Phase 1, Phase 2, and Phase 3 merged; Phase 4 code is in the working tree
- Supabase status: project created, migration and seed applied successfully
- Auth status: Phase 3 smoke-tested and merged; Phase 4 runtime smoke test passed
- Next branch planned: codex/phase4-chore-engine-foundation
- Next task: finish validation, commit the Phase 4 implementation, and push the branch
- Implementation status: app scaffold, database, auth, household onboarding, and chore engine foundation are complete
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

## Phase 4 summary

- Phase 4 blueprint prepared for the chore engine foundation
- Phase 4 will focus on household chores, one-tap completion, and simple feedback
- Starter chores must come from seeded templates and database data
- A Codex-ready prompt is prepared for the next chore engine implementation task
- Phase 4 runtime smoke test passed after a narrow profile bootstrap race fix
- The home and chores pages now render household chores, quick actions, weekly scores, and recent activity
- Advanced reporting, streaks, rewards, and photo proof remain out of scope for this phase

## Include

- What changed
- What is still missing
- Assumptions made
- Risks or open questions
- Suggested next step
