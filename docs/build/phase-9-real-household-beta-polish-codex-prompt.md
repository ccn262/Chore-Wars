# Codex Prompt - Phase 9 Real Household Beta Polish

Create a new branch:

`codex/phase9-real-household-beta-polish`

Read `AGENTS.md` and the Phase 9 blueprint first, then keep the scope narrow and focused on making the multi-user beta understandable for a real household.

Implement only the beta-polish work described in the blueprint. Prefer existing household/member/invite structures where possible. Add a narrow schema change only if it is clearly required and safe.

Core goals:

- improve member display and household member visibility
- refine invite UX copy and status handling
- improve first-run guidance after household creation
- improve empty states for brand new households
- add a simple beta feedback or support guidance path if appropriate
- keep the app mobile-first and uncluttered

Hard boundaries:

- do not add Resend
- do not add SMS or WhatsApp integrations
- do not add payments or subscriptions
- do not add advanced reports or charts
- do not add achievements or streaks
- do not add photo proof
- do not add push notifications
- do not add Expo or App Store implementation
- do not build a complex child/family account system
- do not add a complex permission system beyond owner/admin/member
- do not make member removal destructive by default
- do not commit secrets

Implementation guidance:

- keep household member visibility simple and readable
- make invite and join flows clear on mobile
- use archive or deactivate patterns over hard delete where member removal is needed and safe
- keep copy friendly, calm, and future i18n-friendly
- preserve existing chore, leaderboard, rewards, and invite behaviour
- update docs/logs with the beta-polish changes

Validation:

- run `npm run lint`
- run `npm run build`
- run `git diff --check`
- run the conflict-marker search from the repo validation checklist over `docs`, `src`, and `supabase`
- run `git ls-files .env.local`
- if local or hosted credentials are available and it is practical, run a smoke test covering owner/member invite clarity, member visibility, first-run guidance, and basic household flows

Deliverables:

- commit your changes
- push the branch
- do not merge into `main`
