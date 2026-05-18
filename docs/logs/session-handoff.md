# Session Handoff

Use this file to leave a concise handoff for the next working session.

## Active Project

- Active project: Chore Wars
- Current phase: Phase 9B household admin controls implementation
- Current branch: `codex/phase9b-household-admin-controls`
- Repo status: Phases 1-9 merged and hosted MVP working, with Phase 9B controls in branch
- Vercel status: hosted MVP deployed and working for early testing
- Supabase status: migrations, seed, atomic completion RPC, rewards/forfeits migration, and household invites applied and verified
- Auth status: Phase 3 smoke-tested and merged
- Chore engine status: Phase 4 smoke-tested and merged
- Next branch planned: none yet
- Next task: finish household admin controls and week settings from the Phase 9B branch
- Implementation status: hosted multi-user MVP working; member names, chore editing, chore archiving, and week-start controls are being added
- Latest fix: Phase 9B week-start fallback now stays on Monday when unset, so the leaderboard window and reward summaries use a stable default
- Latest planning update: retention insights strategy added so future reporting can focus on fairness, habit trends, and weekly summaries
- Latest fix: invite auth return flow now preserves real invite tokens and rejects `/invite/undefined`
- Latest fix: invite sign-up now treats confirmation-required no-session sign-ups as a friendly success state
- Latest fix: invite sign-up now persists the entered display name into auth metadata so it survives email confirmation
- Latest fix: invite confirmation now preserves the pending invite return path across Supabase email confirmation and avoids falling back to create-household when an invite path exists
- Latest fix: invite management now exposes cancel controls for pending invites and clearer duplicate-invite guidance
- Current blockers: none known
- Known limitations:
  - legal pages are placeholders
  - support email is placeholder
  - account deletion is request/instructions only
  - custom domain not connected
  - Resend not configured
  - App Store/Expo not started
  - advanced reports not implemented
  - photo proof not implemented
  - invite emails are not implemented
- invite links are copyable/manual only for now
- household member management is still basic, with archive-only flow and member renaming still being tightened up
- archived members are paused rather than deleted, and invite rejoin should reactivate the same household member row so history stays attached
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
- Local smoke testing confirmed the new public pages render and the auth pages still load
- Support now uses a configurable placeholder contact value for early testing
- Final legal review and hosted verification still remain before this phase can be considered complete

## Phase 7 planning note

- Rewards and forfeits are the next product layer after hosted MVP readiness
- The rules should stay manual, playful, and household-configurable
- Weekly winner and bottom-place displays should use existing score data where possible
- Automatic enforcement, email notifications, payments, and advanced reporting remain out of scope
- The next branch should be `codex/phase7-rewards-forfeits`

## Phase 8 planning note

- Household invites are the next step after rewards and forfeits
- The first invite flow should use copyable links before email automation
- Invite acceptance must remain household-scoped and RLS-safe
- Invite tokens must be secure and unguessable
- Email invitations remain future work
- The next branch should be `codex/phase8-household-invites`

## Phase 9 planning note

- Real household beta polish is the next priority after invite links are live
- The app should be tested with a small real household before adding larger features
- Member visibility and invite clarity matter more now than advanced reporting
- Resend email invites remain future work
- Member removal should prefer archive or deactivate over destructive deletion
- The next branch should be `codex/phase9-real-household-beta-polish`

## Phase 9B planning note

- Household admin controls should stay narrow and mobile-first
- Owners and admins should be able to edit member display names, chore settings, and the household week start day
- Chore and member management should prefer pause or archive over delete
- Weekly scores, rewards/forfeits, and future insights should respect the selected household week start
- The next branch should be `codex/phase9b-household-admin-controls`

## Hosted smoke fix note

- Hosted Vercel smoke testing exposed a custom chore visibility gap and a weekly leaderboard score gap after Phase 5
- Custom chore and template creation now force a client refresh after success so the active chore list updates immediately
- Weekly score calculations now respect the household timezone boundary more carefully so current-week points appear when expected
- Local smoke verification passed with a disposable Supabase account, direct DB setup, and sign-out confirmation
