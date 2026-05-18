# Phase 10 Beta Feedback Codex Prompt

Create a new branch:

- `codex/phase10-beta-feedback`

Read `AGENTS.md` and `docs/build/phase-10-beta-feedback-blueprint.md` first.

Implement a narrow beta feedback and issue-capture foundation only.

## Required work

- Improve the support page for beta feedback
- Add or refine `Send feedback` flow
- Add or refine `Report a bug` flow
- Add or refine `Suggest a chore` flow
- Use mailto links or a simple support contact for now
- Add a beta tester checklist page or section if appropriate
- Keep the support email configurable through existing site config
- Update docs, logs, and the release checklist

## Constraints

- Do not add Resend or email automation
- Do not add a database-heavy feedback inbox unless clearly justified and documented
- Do not add analytics or tracking
- Do not add payments or subscriptions
- Do not add advanced reports or charts
- Do not add achievements, streaks, or photo proof
- Do not add push notifications
- Do not add Expo or App Store work
- Do not add AI feedback analysis
- Do not expose secrets
- Do not commit secrets

## Guidance

- Keep the UI simple, mobile-first, and easy to scan
- Keep feedback actions reachable in a few taps
- Make it clear the app is in early testing or beta
- Tell testers not to include passwords or private information
- Avoid long forms and admin-heavy screens
- Prefer clear, friendly copy

## Validation

- Run `npm run lint`
- Run `npm run build`
- Run `npm run test:e2e`
- Run `git diff --check`
- Run a conflict-marker search across `docs`, `src`, `supabase`, and `tests`
- Run `git ls-files .env.local`

## Smoke testing

- Run local and hosted smoke tests if practical
- Confirm the support and feedback routes load
- Confirm the tester checklist is visible if included
- Confirm the copy is readable on mobile

## Output

- Commit the changes with a clear message
- Push the branch
- Do not merge into `main`
