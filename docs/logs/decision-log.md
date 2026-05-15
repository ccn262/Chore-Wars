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

## Entry format

- Date
- Decision
- Reasoning
- Impact
- Follow-up
