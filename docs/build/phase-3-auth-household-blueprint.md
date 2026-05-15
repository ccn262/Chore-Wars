# Phase 3 - Auth and household onboarding foundation

## Phase name

Phase 3 - Auth and household onboarding foundation

## Objective

Connect the app foundation to Supabase Auth and establish the first household onboarding flow so a signed-in user can create or reach a household safely before the chore engine exists.

## Why auth and household onboarding comes before chore engine

- Chore features need a reliable signed-in identity and active household context
- Household-scoped access is only meaningful once auth sessions and member bootstrap are in place
- The chore engine depends on a profile, household membership, and protected routes
- Onboarding must be proven before the product grows into chore, scoring, and reporting flows
- A clean auth base reduces rework across future features and permissions

## What Phase 3 includes

- Supabase Auth connection in the app foundation
- Sign-up foundation
- Sign-in foundation
- Sign-out foundation
- Session handling and route protection
- Profile bootstrap and profile existence checks
- Create household flow
- Create owner household member record
- Create household_settings where appropriate
- Basic onboarding redirects
- Simple success and error states
- Mobile-first, clean, functional auth and onboarding UI

## What Phase 3 excludes

- Household invites via email
- Resend integration
- Adding extra members beyond placeholder or manual later work
- Chore engine
- Chore completion flow
- Points scoring UI
- Leaderboard calculations
- Reports
- Rewards, forfeits, and achievements
- Payments or subscriptions
- Expo wrapper or App Store work

## Required app routes

- `/auth/sign-in`
- `/auth/sign-up`
- `/auth/callback` or equivalent auth return route if needed
- `/setup/create-household`
- Protected app routes under the existing app shell
- Redirect targets for first-run onboarding and authenticated home entry

## Required Supabase client/server patterns

- Use a narrow browser client helper for client-side auth interaction
- Use server-side helpers for session reads and route protection
- Keep Supabase usage isolated behind documented wrappers
- Avoid leaking service credentials to the browser
- Keep auth and profile checks easy to audit

## Environment variable requirements

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` for server-only paths if needed later
- `NEXT_PUBLIC_APP_URL` for redirects and auth flow consistency
- Do not hardcode secrets
- Do not commit `.env.local`

## Auth flow plan

- User signs up or signs in through the mobile-first auth screens
- Session state is established through Supabase Auth
- App checks whether a profile already exists for the signed-in user
- If no profile exists, create or bootstrap one through the defined server path
- Redirect users to household onboarding when they do not yet belong to a household
- Redirect users into the app shell once household membership exists

## Profile bootstrap plan

- Check for an existing profile linked to the current Supabase Auth user
- Create or bootstrap the profile when absent
- Keep profile creation separate from household membership
- Preserve locale and display-name readiness
- Do not overbuild profile settings in this phase

## Household creation plan

- Provide a simple mobile-first create-household flow
- Collect only the minimum fields required to establish a household
- Create the household record
- Optionally create household_settings where the schema expects it
- Keep the flow fast and understandable

## Owner member creation plan

- When a household is created, create the first `household_member` record for the creator
- The first member should be the household owner
- Link the owner member to the creator profile
- Keep the member as the household-scoped identity for future scoring

## Protected route plan

- Keep app routes behind a signed-in session check
- Redirect unauthenticated users to sign-in
- Redirect signed-in users without a profile or household to onboarding
- Keep protected route handling predictable and centralised

## Onboarding redirect plan

- Signed-out users go to sign-in or sign-up
- Signed-in users with no profile complete profile bootstrap
- Signed-in users with a profile but no household go to create-household
- Signed-in users with household membership land in the app shell
- Keep redirects simple and explicit

## RLS considerations

- Auth and onboarding flows must respect household-scoped access
- Household creation should only allow the creator to establish their own first household
- Owner/member records must align with the RLS model from Phase 2
- Invite handling remains out of scope for this phase
- Server-side checks should mirror the database contract rather than bypass it

## Validation plan

- Confirm auth sign-up and sign-in work end to end in a local or preview environment
- Confirm profile bootstrap happens only when needed
- Confirm household creation produces an owner member record
- Confirm protected routes redirect correctly
- Confirm onboarding redirects are mobile-friendly and predictable
- Run the available build and lint checks after implementation
- Update logs after meaningful validation

## Acceptance criteria

- A user can sign up and sign in using the app foundation
- A profile is bootstrapped or detected correctly for the signed-in user
- A household can be created through a simple onboarding flow
- The creator becomes the first household owner member
- Protected routes keep unauthenticated users out of the app shell
- Users without a household are redirected to onboarding
- The flow stays mobile-first and uncluttered

## Risks and constraints

- Auth session handling can become brittle if browser and server helpers diverge
- Overly complex onboarding would slow the first-use path
- Incorrect redirects could trap users outside the app shell
- Security errors could leak household data if checks are too loose
- Business logic should stay narrow until the first household path is stable

## Follow-up phases

- Phase 4: chore engine and quick completion flow
- Phase 5: reporting and visual summaries
- Phase 6: reminders, rewards, and retention polish
- Phase 7: native wrapper and store-readiness work
