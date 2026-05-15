# Session Handoff

Use this file to leave a concise handoff for the next working session.

## Active Project

- Active project: Chore Wars
- Current phase: Phase 2 database foundation fix in progress
- Current branch: codex/phase2-database-foundation
- Repo status: Phase 2 database scaffold created locally; migration ordering fix applied
- Next branch planned: codex/phase2-database-foundation
- Next task: validate, commit, and push the migration ordering fix
- Implementation status: Supabase SQL files and database docs updated; migration file corrected
- Current blockers: none

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
- Manual Supabase SQL Editor migration retry is pending after fixing the `public.profiles` ordering issue
- The migration has now been applied successfully in Supabase SQL Editor
- The seed file failed because it contained fake household/demo rows that violated foreign key constraints
- The seed file has been corrected to include only global starter categories and templates
- Manual Supabase seed retry is pending

## Include

- What changed
- What is still missing
- Assumptions made
- Risks or open questions
- Suggested next step
