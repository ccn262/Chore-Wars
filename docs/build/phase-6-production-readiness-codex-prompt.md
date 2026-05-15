# Codex Prompt: Phase 6 Production Readiness Foundation

Read `AGENTS.md` first, then read `docs/build/phase-6-production-readiness-blueprint.md`.

Create a new branch:

- `codex/phase6-production-readiness`

Goal:

- Prepare the hosted MVP for safe production-like testing before larger feature work or App Store packaging.

Scope:

- Add or refine legal/support placeholder pages
- Add an account deletion request or instructions path
- Improve release readiness docs and checklists
- Verify hosted testing notes and redirect guidance
- Update logs

Do not:

- Add major new app features
- Add rewards, forfeits, reports, charts, achievements, streaks, or photo proof
- Add Resend invite emails
- Add payments or subscriptions
- Add Expo or App Store wrapper files
- Change Supabase migrations
- Install packages
- Commit secrets

Required updates:

- `docs/product/roadmap.md`
- `docs/operations/release-checklist.md`
- `docs/operations/vercel-setup.md`
- `docs/logs/session-handoff.md`
- `docs/logs/decision-log.md`
- `docs/logs/change-log.md`
- `docs/logs/known-issues.md`

Validation:

- `git diff --check`
- Run the standard conflict-marker search across `docs`, `src`, and `supabase`
- `git ls-files .env.local`

After completion:

- Update logs
- Commit the docs-only changes
- Push the branch
- Do not merge into `main`
