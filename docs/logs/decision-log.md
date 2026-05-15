# Decision Log

Record major product and technical decisions here.

## Confirmed decisions

- Use one GitHub repo as the source of truth
- Keep ChatGPT Project for thinking, planning, strategy, UX, market research, architecture, and Codex prompt creation
- Keep repo docs as the permanent Codex build rails
- Use Codex for implementation
- Build a mobile-first Next.js web app first
- Use Supabase for auth, database, storage, and RLS
- Use Vercel for hosting and preview deployments
- Use Resend for transactional email
- Use GitHub for version control
- Use Porkbun for domain management
- Add Expo later as an App Store wrapper path
- Home screen is the main interaction surface
- Chore completion must be extremely fast and possible from the main screen
- Users should be able to tap a chore button and instantly log completion
- Photo proof is useful but should not slow down the core interaction
- Auth users and household members should be separate database concepts
- Points should use a ledger rather than only a mutable score field
- The app should support families, couples, flatmates, shared homes, and international users
- Internationalisation readiness should be built in from the start
- Marketing and brand strategy must be considered alongside product build

## Phase 1 decisions

- Phase 1 is foundation-only
- Business logic is excluded
- Feature work starts after the app shell is stable
- Feature branches should be used for implementation work
- Use the existing repo as the Next.js App Router codebase rather than creating a separate app
- Use actual `/auth/*` and `/setup/*` URL segments for placeholder routes
- Keep Supabase helpers as lazy placeholders until real integration is needed
- Keep the foundation minimal and validation-focused before moving to feature development

## Phase 2 decisions

- Phase 2 is database foundation only
- Database schema comes before chore UI integration
- RLS must be included from the start
- Points use ledger-based scoring
- Household member identity remains separate from auth profile
- Rewards, forfeits, achievements, and payments remain future phases
- Default chores are seeded as templates, not hardcoded in UI
- Profiles are app records with optional auth linkage rather than auth-user primary keys
- Household creation auto-provisions the owner member via database trigger
- Accepted invites materialize household members through the database layer
- Chore completions write to the points ledger through a trigger so scoring stays centralised
- Starter chore categories and templates are seeded in SQL

## Entry format

- Date
- Decision
- Reasoning
- Impact
- Follow-up
