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

## Phase 3 decisions

- Auth and household onboarding should be built before chore engine
- The first household member created during household creation should be the owner
- Supabase credentials must only live in local or deployment environment variables
- Additional member invites and Resend emails remain a later phase
- Phase 3 should keep UI functional and mobile-first rather than final-polished
- Protected route handling should stay narrow and predictable before chore features are added
- Sign-in, sign-up, sign-out, and household creation should use server actions to keep session handling simple
- Supabase auth callback handling should complete sign-up confirmation redirects without introducing extra UI
- Profile bootstrap should happen before household creation and remain separate from household membership
- Core chore loop is the next priority after auth and household onboarding
- One-tap chore completion is the central product interaction
- Starter chores must come from seeded templates and database data, not hardcoded UI
- Points must be written to `points_ledger` when a chore is completed
- Recent activity and simple weekly totals are enough for Phase 4
- Advanced reporting, streaks, rewards, and photo proof remain future phases

## Phase 5 decisions

- Phase 5 should polish the existing MVP loop before adding major new features
- Simple leaderboard or member score clarity is allowed in Phase 5
- Advanced reports, charts, streaks, achievements, rewards, photo proof, and notifications remain later phases
- Duplicate-tap protection is required before heavier usage
- Completion feedback should be clear, fast, and playful but not intrusive

## App Store readiness decisions

- App Store work will be a later phase after the web MVP stabilises
- The recommended App Store route is Expo plus a React Native WebView wrapper
- The wrapper must include native-feeling loading, offline, and error states
- Privacy policy, terms, support URL, and account deletion are required before App Store submission
- App Store privacy labels must match the actual data collection and retention model
- Service-role keys must not be exposed to mobile or client code

## Phase 6 decisions

- Production readiness should come before adding larger feature areas
- Early legal and support pages may be placeholders for testing but must be clear and reviewable
- Account deletion must be planned before App Store submission and should start in Phase 6 as a basic request or instructions path
- Hosted Vercel smoke testing is required before wider beta sharing
- Custom domain work can follow after hosted Vercel testing is stable
- Draft production-basics pages can be linked from public and authenticated screens while legal review is pending

## Phase 7 decisions

- Rewards and forfeits are the next product layer after hosted MVP readiness
- Rewards and forfeits should remain simple and manually configured in the MVP
- Forfeits should be playful and not shame-heavy
- Automatic enforcement, email notifications, and payments remain future work
- Weekly winner and bottom display should use existing weekly score data where possible
- Household settings are the right place for simple reward and forfeit rule text
- Weekly winner and bottom-place summaries should stay lightweight and derived from current score data
- Owner/admin rule editing should remain household-scoped and mobile-first
- Archived household members should be paused, not deleted, and invite rejoin should reactivate the same household member row so points and completions stay attached to history

## Phase 8 decisions

- Household invites are the next priority because the app becomes most valuable with multiple household members
- Phase 8 should use copyable invite links before adding Resend email automation
- Invite tokens must be secure and unguessable
- Invite acceptance must be household-scoped and RLS-safe
- New users should be able to sign up or sign in and return to the invite flow
- Resend email invitations remain future work
- Copyable invite links are the MVP invite mechanism for now, with email automation left to a later phase
- Invite acceptance should rely on the existing database trigger to materialize the household member row
- Invite management should stay lightweight and owner/admin-scoped until more household controls are needed

## Phase 9 decisions

- Real household beta polish is the next priority after invite links are live
- The app should be tested with a small real household before adding larger features
- Member visibility and invite clarity matter more now than advanced reporting
- Resend email invites remain future work
- Member removal should prefer archive or deactivate over destructive deletion
- Chore Wars needs insight and retention loops beyond basic points
- Reporting should focus on fairness, household habits, and playful weekly summaries
- Points are the core mechanic, but insights are the long-term value
- Email and push summaries should come later after in-app insights prove useful

## Entry format

- Date
- Decision
- Reasoning
- Impact
- Follow-up
