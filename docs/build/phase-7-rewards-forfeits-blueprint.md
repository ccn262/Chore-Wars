# Phase 7 - Rewards and forfeits foundation

## Phase name

- Phase 7 - Rewards and forfeits foundation

## Objective

Add a simple, fun household competition layer on top of the existing chore and points loop. This phase makes the app feel more game-like by letting households define what the weekly winner gets and what the bottom-place member has to do.

## Why rewards and forfeits come after the hosted MVP is usable

- The core chore loop and hosted MVP already need to be stable before adding extra game rules
- Rewards and forfeits are more meaningful once weekly scores and repeat completions are reliable
- This phase should make the competition feel richer without distracting from the fast chore flow
- Manual rule editing is easier to validate after the production-readiness checkpoint

## What Phase 7 includes

- Simple household reward rule
- Simple household forfeit rule
- Owner/admin ability to set or edit reward and forfeit text
- Current week winner or leader display
- Current bottom-place member display when enough data exists
- Winner gets and bottom gets style cards
- Lightweight rules section on Settings or Leaderboard
- Friendly empty states when no scores exist
- No automatic enforcement
- No payments
- No emails
- No notifications
- No advanced achievement system

## What Phase 7 excludes

- Payments or subscriptions
- Resend emails
- Push notifications
- Automated reward fulfilment
- Advanced reports or charts
- Streaks or achievements
- Photo proof
- Complex tie-break rules
- Multi-week history
- Expo or App Store implementation

## Product behaviour

- The household can define one simple weekly reward and one simple weekly forfeit
- The weekly winner is the member currently leading the board
- The weekly loser is the member currently at the bottom of the board if enough data exists
- The language should stay playful, soft, and configurable
- The rules should feel like house banter, not punishment

## Weekly winner and loser logic

- Use the existing weekly score data where possible
- Show the current leader as the weekly winner
- Show the lowest-scoring member as the bottom-place member if at least two members have weekly scores
- Handle no-score and low-data households with a friendly empty state
- Keep tie handling simple and clearly documented

## Reward rule plan

- Store a short editable winner rule for the household
- Keep the wording simple and household-friendly
- Allow owner/admin to update the text from a lightweight settings or leaderboard surface
- Default copy can be playful but should not promise automatic delivery

## Forfeit rule plan

- Store a short editable bottom-place rule for the household
- Keep the wording light and non-shamey
- Avoid cruel, punitive, or humiliating phrasing
- Let households use gentle chores or fun household tasks as the rule text

## Household settings and rules plan

- Prefer reusing an existing household settings structure if it can hold the rule text cleanly
- Add a narrow settings table or fields only if the current structure is not enough
- Keep ownership and edit permissions limited to owner/admin
- Keep the data model simple and household-scoped

## Required database considerations

- Store reward and forfeit text as household-scoped settings
- Keep winner and loser displays derived from existing weekly score data
- Avoid introducing heavy new history tables unless a tiny rule-history record is clearly needed later
- Preserve RLS and household membership checks for all reads and writes
- Use server-side validation for owner/admin rule updates

## Required routes, pages, and components

- Settings route or lightweight rules section
- Leaderboard route or scoreboard surface
- Household rule cards for reward and forfeit text
- Simple edit form or sheet for owner/admin updates
- Empty state cards for households without scores
- Lightweight winner and bottom-place summary cards

## Mobile-first UI requirements

- Keep the rules visible without creating a dense admin screen
- Use cards, badges, and short helper text
- Keep edit interactions short and obvious
- Make the winner and bottom-place summary easy to scan on a phone
- Avoid clutter and avoid desktop-style tables

## Copy and tone requirements

- Keep wording playful, not punitive
- Avoid shame-heavy language
- Keep the app feeling fair and light
- Use configurable or softened language where possible
- Keep all strings short enough for future localisation

## Safety and fairness considerations

- Forfeits should be fun and lightweight, not mean
- The app should reduce arguments, not create them
- The rules should not imply automatic punishment
- Households should be able to soften the tone of the rule text
- Provide friendly empty states for low-data households

## RLS and security considerations

- Keep reward and forfeit settings household-scoped
- Keep owner/admin writes tightly scoped
- Do not introduce client-side service-role usage
- Preserve the existing scoring and completion security model
- Validate current user membership before edits or reads that matter

## Validation plan

- Confirm reward and forfeit settings save for owner/admin users
- Confirm non-owner members cannot edit the rules
- Confirm leader and bottom-place cards reflect existing weekly score data
- Confirm empty states are friendly when there are no scores yet
- Run lint and build after implementation
- Update logs after meaningful changes

## Runtime smoke-test plan

- Open the app on a local runtime
- Confirm the weekly leader display appears when scores exist
- Confirm the bottom-place display appears when enough data exists
- Confirm the reward and forfeit rule cards render on mobile
- Confirm owner/admin can edit the rule text
- Confirm non-owner users cannot edit the rule text
- Confirm sign-out still works

## Acceptance criteria

- Households can define a simple weekly reward and forfeit
- Owner/admin can edit the text on a mobile-friendly surface
- The app shows current winner and bottom-place information from the existing score data
- Empty states are clear and friendly
- The feature stays playful, lightweight, and household-safe

## Risks and constraints

- Overly harsh forfeit copy could create a poor household experience
- Tie handling can become complicated if scope grows too quickly
- New rule storage should not turn into a big settings system
- The feature must not become an automated enforcement engine
- The MVP should stay focused on simple, manual household rules

## Follow-up phases

- Deeper reporting or weekly history
- Gentle reminders or nudges if needed later
- App Store readiness and Expo wrapper work
