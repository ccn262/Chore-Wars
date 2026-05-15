# Codex Prompt - Phase 5 Usability, Leaderboard, and Polish

Use this prompt for the next implementation task.

## Branch

Create a new branch:

`codex/phase5-usability-polish`

## Before you start

- Read `AGENTS.md` first
- Read `docs/build/phase-5-usability-polish-blueprint.md` first
- Keep the scope narrow
- Preserve existing docs and completed phase work
- Do not widen into major new feature areas

## Task

Improve the existing MVP experience so it feels polished, clear, quick, fun, and mobile-native while keeping the current core loop intact.

## Implement

- Improve the Home screen hierarchy
- Improve the `/chores` screen usability
- Improve chore card and button clarity
- Add duplicate-tap protection on chore completion
- Add clear completion feedback
- Refine the recent activity display
- Add or refine a simple leaderboard or member score display
- Improve empty, loading, and error states
- Refine copy, spacing, and tap targets
- Keep the experience mobile-first and app-like

## Keep scope narrow

- Do not add advanced reports
- Do not add charts
- Do not add achievements
- Do not add streaks
- Do not add rewards or forfeits
- Do not add photo proof
- Do not add Resend invite emails
- Do not add payments or subscriptions
- Do not add Expo or App Store work
- Do not add a complex chore assignment engine
- Do not add push notifications
- Do not make major database schema changes unless a tiny fix is essential

## UX boundaries

- Home remains the hero interaction surface
- Completion must stay one quick tap
- Use cards, badges, clear sections, and large tap targets
- Avoid clutter and desktop-style dashboards
- Keep user-facing copy short and future i18n-friendly
- Keep motion light and non-blocking

## Security and data boundaries

- Do not use service-role logic in app source
- Do not commit secrets
- Do not hardcode default chores in the UI
- Continue using database-driven chore data
- Keep household-scoped access intact

## Update docs/logs

- Update `docs/logs/session-handoff.md`
- Update `docs/logs/change-log.md`
- Update `docs/logs/known-issues.md` if needed
- Update `docs/logs/fix-log.md` if a fix is made

## Validation

- Run `npm run lint`
- Run `npm run build`
- Run `git diff --check`
- Run the conflict-marker search from the validation checklist
- Run `git ls-files .env.local`
- If local Supabase env vars are available, run a local runtime smoke test

## Commit and push

- Commit your changes
- Push the branch
- Do not merge into `main`
