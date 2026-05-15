# Codex Prompt: App Store Readiness And Expo Wrapper

Read `AGENTS.md` first, then read `docs/build/app-store-readiness-blueprint.md`.

Create a new branch:

- `codex/app-store-readiness`

Goal:

- Prepare the project for future App Store submission after the web MVP is stable on real phones.

Scope:

- Update roadmap and release-readiness docs only
- Capture the App Store readiness checklist
- Capture the Expo plus WebView wrapper recommendation
- Capture production prerequisites for Vercel, Supabase, auth redirects, privacy policy, terms, support, and account deletion
- Capture App Store listing, screenshot, privacy label, and TestFlight planning

Do not:

- Create Expo app files
- Create iOS-specific config
- Create App Store assets
- Change app implementation
- Change Supabase migrations
- Install packages
- Commit secrets

Required updates:

- `docs/product/roadmap.md`
- `docs/market/app-store-strategy.md`
- `docs/operations/release-checklist.md`
- `docs/operations/vercel-setup.md`
- `docs/market/internationalisation-plan.md`
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
