# Session Handoff

Use this file to leave a concise handoff for the next working session.

## Active Project

- Active project: Chore Wars
- Current phase: Phase 5 hosted smoke-fix branch in progress
- Current branch: codex/fix-hosted-chore-visibility-leaderboard
- Repo status: Phases 1-5 merged; hosted smoke-test follow-up branch in progress; App Store readiness planned
- Supabase status: migrations, seed, and atomic completion RPC applied
- Auth status: Phase 3 smoke-tested and merged
- Chore engine status: Phase 4 smoke-tested and merged
- Next branch planned: none yet
- Next task: commit and push the hosted chore visibility and leaderboard fixes, then retest the deployed Vercel build after merge
- Implementation status: app scaffold, database, auth, household onboarding, core chore loop, and usability polish are complete; duplicate-tap protection now uses an atomic database RPC and the hosted chore visibility / leaderboard follow-up is being fixed
- Current blockers: hosted Vercel retest still needs confirmation after the fix is deployed
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
- Phase 4 review confirmed the chore engine stays in scope and the runtime smoke test passes after the atomic profile bootstrap fix
- The home and chores pages now render household chores, quick actions, weekly scores, and recent activity
- Advanced reporting, streaks, rewards, and photo proof remain out of scope for this phase

## Phase 5 summary

- Phase 5 blueprint prepared for MVP usability, leaderboard clarity, and polish
- Phase 5 will refine the existing chore loop rather than add major new features
- A Codex-ready prompt is prepared for the next usability implementation task
- Duplicate-tap protection, completion feedback, and clearer score/readability surfaces are planned
- Advanced reports, charts, rewards, streaks, and photo proof remain out of scope
- Phase 5 implementation now includes clearer Home hierarchy, improved chores usability, a simple leaderboard surface, duplicate-tap protection, and stronger empty/loading/error states
- Phase 5 runtime smoke test passed locally against the Chore Wars Supabase project with a disposable admin-created test user
- Test data from the smoke run was cleaned up after verification
- Sign-out now returns to the public landing page as intended
- Phase 5 review confirmed the UI and data flow still align with the blueprint, and no code changes were needed during review
- The latest local smoke attempt hit Supabase email rate limiting on fresh sign-up, so full auth retesting is currently environment-limited
- The Phase 5 duplicate-tap fix now routes chore completion through an atomic RPC with an advisory lock and the database-level duplicate test passed
- The hosted auth service still rate-limits fresh sign-ups, so browser-based smoke testing remains limited even though the database-level atomic completion test passed

## App Store readiness note

- App Store readiness is planned as a later phase after the hosted MVP proves stable on real phones
- The recommended approach is an Expo plus React Native WebView wrapper around the production web app
- Apple Developer, App Store Connect, privacy policy, terms, support, account deletion, screenshots, and app metadata work are still pending
- Vercel production and Supabase production readiness should be confirmed before any wrapper or store submission work starts

## Phase 6 planning note

- Phase 6 will focus on production readiness for hosted testing, not on new gameplay features
- Hosted smoke testing, mobile browser QA, legal/support placeholders, and account deletion guidance are the main deliverables
- The next branch should be `codex/phase6-production-readiness`
- App Store wrapper work remains later than Phase 6

## Phase 6 implementation note

- Draft privacy, terms, support, and account deletion pages now exist
- Public and authenticated discovery links now point to the draft production-basics pages
- Local smoke testing confirmed the new public pages render and `/settings` still redirects unauthenticated visitors to sign-in
- Final legal review and hosted verification still remain before this phase can be considered complete

## Hosted smoke fix note

- Hosted Vercel smoke testing exposed a custom chore visibility gap and a weekly leaderboard score gap after Phase 5
- Custom chore and template creation now force a client refresh after success so the active chore list updates immediately
- Weekly score calculations now respect the household timezone boundary more carefully so current-week points appear when expected
- Local smoke verification passed with a disposable Supabase account, direct DB setup, and sign-out confirmation

## Include

- What changed
- What is still missing
- Assumptions made
- Risks or open questions
- Suggested next step

## Hosted smoke fix note

- Current phase: Phase 5 hosted quick-actions follow-up complete; ready to retest hosted deployment after merge
- Current branch: codex/fix-custom-chores-quick-actions
- Repo status: Phase 1-6 planning and implementation are present; this branch contains a narrow Home quick-actions fix
- Next branch planned: none yet
- Next task: commit, push, and open the PR for the quick-actions fix, then retest the Vercel-hosted deployment after merge
- Implementation status: Home quick actions now prefer active custom chores first; repeat completions remain allowed after the short duplicate window
- Current blockers: none
- Security note: secrets must remain outside git and only in `.env.local` or deployment env vars
