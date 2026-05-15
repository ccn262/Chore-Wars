# Phase 3 Codex Prompt - Auth and household onboarding foundation

You are working in the Chore Wars repo.

Create a new branch:

`codex/phase3-auth-household-foundation`

Before changing files, read:

- `AGENTS.md`
- `docs/build/phase-3-auth-household-blueprint.md`
- `docs/product/mvp-scope.md`
- `docs/product/roadmap.md`
- `docs/architecture/system-architecture.md`
- `docs/architecture/routing-map.md`
- `docs/architecture/state-management.md`
- `docs/architecture/integration-map.md`
- `docs/database/schema-overview.md`
- `docs/database/table-specs.md`
- `docs/database/rls-plan.md`
- `docs/engineering/build-rules.md`
- `docs/engineering/security-checklist.md`
- `docs/logs/session-handoff.md`

Task objective:

Implement the Phase 3 auth and household onboarding foundation in the existing mobile-first Next.js app, connecting it to Supabase Auth and the Phase 2 database foundation.

Required scope:

- Wire Supabase client and server helpers to real environment variables
- Implement sign-up foundation
- Implement sign-in foundation
- Implement sign-out foundation
- Implement session handling and protected route behaviour
- Implement profile bootstrap/check against `profiles`
- Implement create-household flow
- Create the owner `household_member` record when a household is created
- Create `household_settings` where appropriate
- Add simple onboarding redirect logic
- Keep success and error states clear and minimal
- Preserve the existing mobile-first shell and route structure
- Update docs and logs after completion
- Run validation and fix issues caused by the changes
- Commit changes
- Push the feature branch

Boundary rules:

- Do not implement the chore engine
- Do not implement chore completion
- Do not implement points or leaderboard logic
- Do not implement reporting
- Do not implement household invites via email
- Do not add Resend flows
- Do not add payments or subscriptions
- Do not add Expo or App Store work
- Do not create broad UI redesigns
- Do not commit secrets
- Do not modify Supabase migrations
- Do not merge into `main`

Implementation notes:

- Keep auth screens clean, mobile-first, and uncluttered
- Keep onboarding fast and friendly
- Keep user-facing copy simple and future i18n-friendly
- Keep Supabase access isolated behind thin helpers
- Keep protected routes predictable and household-scoped

Validation:

- Run the relevant lint and build commands for the repo
- Confirm auth/onboarding flows compile and route correctly
- Update `docs/logs/session-handoff.md`, `docs/logs/change-log.md`, and `docs/logs/decision-log.md` with the completed work
- Update `docs/logs/known-issues.md` if a real blocker remains

Branch:

`codex/phase3-auth-household-foundation`
