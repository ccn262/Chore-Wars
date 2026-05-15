# Codex Prompt: Phase 7 Rewards and Forfeits Foundation

Read `AGENTS.md` first, then read `docs/build/phase-7-rewards-forfeits-blueprint.md`.

Create a new branch:

- `codex/phase7-rewards-forfeits`

Goal:

- Add a simple household reward and forfeit layer on top of the existing chore and points loop

Scope:

- Add owner/admin editable reward and forfeit text
- Display weekly winner and bottom-place summaries from existing score data
- Show simple reward and forfeit cards on Leaderboard and/or Settings
- Keep the experience mobile-first, playful, and lightweight

Do not:

- Add payments or subscriptions
- Add Resend emails
- Add push notifications
- Add automated reward enforcement
- Add advanced reporting, charts, streaks, achievements, or photo proof
- Add Expo or App Store wrapper files
- Add major new product areas
- Commit secrets

Implementation guidance:

- Prefer reusing the existing `household_settings` or household rules structure if it can store the rule text cleanly
- Add a narrow migration only if a small schema adjustment is truly needed
- Keep the winner and bottom-place display derived from the existing weekly score data
- Keep owner/admin edits tightly scoped and RLS-safe
- Keep copy soft, playful, and not shame-heavy
- Use existing mobile UI patterns and avoid desktop-style admin layouts

Required updates:

- `docs/product/roadmap.md`
- `docs/logs/session-handoff.md`
- `docs/logs/change-log.md`
- `docs/logs/decision-log.md`
- `docs/logs/known-issues.md`
- Any small docs needed to explain the new rules surface

Validation:

- `npm run lint`
- `npm run build`
- `git diff --check`
- Standard conflict-marker search across `docs`, `src`, and `supabase`
- `git ls-files .env.local`

Runtime smoke test if local env vars are available:

- Sign in
- Open the leaderboard or settings surface
- Confirm the reward and forfeit cards render
- Confirm owner/admin can edit the rule text
- Confirm the current weekly winner and bottom-place member display when score data exists
- Confirm the app still feels mobile-first and uncluttered

After completion:

- Update logs
- Commit the changes
- Push the branch
- Do not merge into `main`
