# Roadmap

## Phase 0: Planning

- Planning docs
- Repo setup
- GitHub remote setup
- Market and brand planning
- UI principles
- Database design
- Codex guardrails
- Vercel / Supabase / Resend preparation

## Phase 1: MVP build

- Auth and household setup
- Chore completion flow
- Points and basic rewards
- Household activity summary
- Notification/email foundations

## Phase 2: Supabase database foundation

- Core schema
- RLS
- Seed starter chores
- Database validation
- No UI feature work beyond placeholders

## Phase 3: Auth and household onboarding foundation

- Supabase Auth connection
- Sign up and sign in
- Protected app routes
- Profile bootstrap
- Create household
- Create owner household member
- No chore engine yet

## Phase 4: Chore engine foundation

- Household chores
- Starter templates
- Custom chores
- One-tap completion
- Chore completion events
- Points ledger entries
- Simple recent activity
- Simple weekly score summary
- No advanced reports yet

## Phase 5: MVP usability, leaderboard, and polish

- Home screen polish
- Chore card polish
- Duplicate-tap protection
- Completion feedback
- Simple leaderboard refinement
- Recent activity polish
- Empty, loading, and error states
- Mobile-first UI refinement
- No advanced reports yet

## Phase 6: Production readiness foundation

- Hosted Vercel smoke test
- Mobile browser QA
- Privacy policy placeholder
- Terms placeholder
- Support/contact page
- Account deletion request path
- Production env var checks
- Supabase Auth redirect checks
- Release checklist updates
- No major feature expansion

## Phase 7: Rewards and forfeits foundation

- Simple household reward rule
- Simple household forfeit rule
- Owner/admin edit
- Winner/leader display
- Bottom-place display
- Lightweight rule cards
- No payments, emails, or notifications yet

## Phase 8: Household invites and member joining foundation

- Invite creation
- Copyable invite link
- Accept invite route
- Signed-in accept flow
- Sign-up/sign-in then return to invite flow
- Member role default
- Invite status and expiry handling
- No Resend yet

## Phase 9: Real household beta polish

- Member display polish
- Household member list
- Invite UX refinements
- First-run guidance
- Empty state polish
- Mobile QA
- Beta feedback capture
- No Resend yet

## Phase 10: App Store readiness and Expo wrapper

- Expo wrapper
- TestFlight
- App Store Connect
- Apple Developer setup
- Privacy policy
- Terms
- Support/contact page
- Account deletion path
- App icon and splash screen
- Screenshots
- App Store listing copy
- Production Vercel/domain checks
- Supabase production checks

## Note

- Phase 6 is the production-readiness phase for hosted testing.
- Phase 7 is the next product phase after the hosted MVP readiness checkpoint.
- Phase 8 is household invites and member joining.
- Phase 9 is the real-household beta-polish phase and should focus on making the multi-user MVP clear and low-friction for a small real household.
- Phase 10 is the future release-readiness phase for App Store and Expo work and should not become the next implementation step unless the hosted web MVP is stable on real phones and the release prerequisites are in place.
- Phase 11 is the insights and retention phase and should focus on making the app worth returning to each week through fairness reports, trends, and playful summaries.

## Phase 11: Insights, trends, and retention loops

- Fairness reports
- Household habit trends
- Weekly summaries
- Personal stats
- Retention loops
- Later email summaries
- Later push notifications
- No heavy dashboards
- No boring task-manager feel
