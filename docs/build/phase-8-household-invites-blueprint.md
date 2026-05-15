# Phase 8 - Household invites and member joining foundation

## Phase name

- Phase 8 - Household invites and member joining foundation

## Objective

Let households become genuinely multi-user by allowing owners and admins to create shareable invite links or codes so family members, partners, and flatmates can join the household safely.

## Why household invites come after rewards and forfeits

- The hosted MVP is already usable, and rewards/forfeits made the household competition layer clearer before invites
- Household invites matter most once the app already has a visible team score, a basic game loop, and working household rules
- Invite flows are easier to validate after membership, settings, and score data are all stable
- This phase keeps the join flow simple before any email automation or richer onboarding arrives later

## What Phase 8 includes

- Owner/admin can create an invite for the current household
- Invite has a token or code, status, and expiry if supported by the current schema
- Owner/admin can copy an invite link
- Accept invite route or page
- Signed-in user can accept an invite and become a household member
- New user can sign up or sign in and then return to accept the invite
- Member role defaults to `member`
- Invite cannot be reused if it is single-use, or it follows clearly documented multi-use rules if that is chosen
- Invite expiry and status are respected
- Basic invite management view if it stays low-risk
- Mobile-first, clear copy
- No email sending yet

## What Phase 8 excludes

- Resend email invitations
- SMS or WhatsApp integrations
- Payments or subscriptions
- Advanced reports or charts
- Achievements or streaks
- Photo proof
- Push notifications
- Expo or App Store wrapper implementation
- Complex family or child account management
- Granular permissions beyond owner, admin, and member

## Product behaviour

- Owners and admins create an invite from a household-scoped settings or management surface
- The app generates a secure, unguessable token and a shareable link
- The link is copied and shared manually
- The recipient opens the link, signs in or signs up if needed, and accepts the invite
- The app creates a household member row for that user with the default `member` role
- The user is then sent into the household experience
- Errors should be explicit and friendly: expired invite, used invite, invalid invite, or already a member

## Invite creation plan

- Reuse the existing `household_invites` table if it already supports the flow
- Create a new invite only for the active household
- Capture the intended invitee email if the schema requires it
- Generate a secure random token that is not guessable
- Store status as pending on creation
- Store an expiry if the current schema supports it
- Keep the creation UI short and mobile-friendly

## Invite sharing and link plan

- Offer a copyable invite link
- Keep the URL simple and token-based, such as `/invite/[token]`
- Do not require email sending for the MVP
- Make it obvious that the link should be shared only with the intended person
- Keep the invite view readable on a phone

## Accept invite flow

- If the user is not signed in, send them to sign up or sign in and return them to the invite URL
- If the user is signed in, validate the token, invite status, expiry, and target email match if applicable
- If the user is already a member, show a friendly already-joined state
- If the invite is expired or revoked, show a clear error state
- If the invite is valid, create or activate the household member entry safely

## Existing user flow

- Signed-in users should be able to accept an invite directly
- If they are already in another household, the product should follow the schema and household membership rules rather than silently moving them
- The UI should explain what happened in plain language

## New user flow

- New users should be able to sign up or sign in first
- After authentication, they should return to the invite page automatically
- The accept step should still be explicit after sign-in
- The flow should remain mobile-first and not feel like an admin process

## Role and permission plan

- Invite creation is restricted to owner and admin users
- Invite acceptance is available to the intended recipient
- The resulting household member should default to `member`
- Keep role handling simple for this phase
- Avoid introducing more granular permissions than the app already needs

## Invite expiry and status plan

- Respect existing invite status values such as pending, accepted, revoked, and expired
- Use expiry to keep links from living forever if the schema already supports it
- Do not let accepted or revoked invites be reused
- Provide clear messages for each status

## Required database considerations

- Prefer the existing `household_invites` table
- Inspect the current schema before adding any migration
- Add a narrow migration only if the existing table cannot support the MVP invite flow
- Keep invite tokens secure and unguessable
- Keep all household membership writes household-scoped and RLS-safe
- Do not let the client pass arbitrary household IDs or member IDs to join another household
- Make invite acceptance atomic if the flow can race

## Required routes, pages, and components

- `/invite/[token]`
- Settings section for invite creation and management
- Copy invite link button
- Invite status card
- Accept invite action or form
- Error states for invalid, expired, already used, and already joined invites
- Optional low-risk invite management list

## Mobile-first UI requirements

- Keep the invite UI short and obvious
- Use cards and clear primary actions
- Avoid admin-heavy dashboards
- Show a clear join path and a clear back path
- Avoid clutter and dense forms
- Keep the main action reachable with one thumb

## Copy and tone requirements

- Keep the copy friendly and clear
- Use phrases like "Invite your household" and "Join household"
- Avoid technical or punitive wording
- Keep the error copy direct but not harsh
- Keep strings short enough for future localisation

## Safety and abuse considerations

- Invite tokens must be hard to guess
- Keep invite acceptance constrained to valid tokens and matching household membership rules
- Make it clear when a link is expired or already used
- Avoid exposing household internals in error states
- Do not make the invite flow look like a public open-join system unless that is explicitly intended later

## RLS and security considerations

- Keep all invite reads and writes household-scoped
- Only owner and admin users should create or manage invites
- Only the intended invitee should be able to accept a pending invite
- Do not use service-role logic in app source
- Preserve the existing membership and household access rules

## Validation plan

- Confirm invite creation works for owner/admin users
- Confirm invite links copy correctly
- Confirm invite acceptance creates or activates the expected household member
- Confirm expired, revoked, used, and invalid invites are handled clearly
- Confirm non-owner users cannot create invites
- Run lint and build after implementation
- Update logs after meaningful changes

## Runtime smoke-test plan

- Create an invite as an owner or admin
- Copy the invite link
- Open the invite link in a local browser
- Sign in or sign up and return to the invite
- Accept the invite successfully
- Confirm the user appears as a household member
- Confirm invalid or expired invite states are readable
- Confirm sign-out still works

## Acceptance criteria

- Owners and admins can create and share household invites
- A valid invite can be accepted by the intended user
- The accepted user becomes a household member with the correct default role
- Invalid, used, or expired invites fail clearly
- The flow works on mobile and does not feel heavy

## Risks and constraints

- Invite token handling must remain secure
- The phase must not drift into email automation
- Household membership edge cases can get complex quickly
- Open invite semantics need to stay clear and intentional
- The flow must remain simple enough for real households to use without friction

## Follow-up phases

- Invite email automation with Resend
- Better invite management and resend/revoke UX
- App Store readiness and Expo wrapper
