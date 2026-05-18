# Phase 9 - Real Household Beta Polish

## Phase Name

Phase 9 - Real Household Beta Polish

## Objective

Prepare Chore Wars for controlled testing with a real household or small group of early users by smoothing the practical multi-user experience before the product moves on to bigger feature areas.

## Why This Comes After Household Invites

Household invites are the minimum requirement for a genuine multi-user beta. Once owners can invite members and people can join safely, the next bottleneck is not core functionality but clarity, confidence, and day-to-day usability in a real home or flatshare. Phase 9 focuses on making that experience understandable and low-friction.

## What Phase 9 Includes

- clearer member display names and nicknames where needed
- a simple household member list
- owner/admin visibility into household members
- simple member role display
- basic remove/archive member planning or implementation scope if safe
- invite UX copy refinements
- clearer first-run guidance after household creation
- clearer empty states for brand new households
- better mobile QA checklist coverage
- beta feedback capture planning
- small bug fixes discovered during hosted testing
- no major feature expansion

## What Phase 9 Excludes

- Resend email invitations
- SMS or WhatsApp integrations
- payments or subscriptions
- advanced reports or charts
- achievements or streaks
- photo proof
- push notifications
- Expo or App Store implementation
- complex child/family account management
- complex permission systems beyond owner/admin/member
- destructive account deletion

## Product Behaviour

Phase 9 should make the app feel ready for a real household beta:

- owners can understand who is in the household
- members can see how they are identified in the app
- invite links and join flows are easy to understand on mobile
- first-time users are guided toward the next action
- empty states explain what to do next instead of feeling broken
- the app stays playful, simple, and non-judgemental

## Real Household Beta Goals

- Can a household owner invite someone without help?
- Can a new member join without confusion?
- Can everyone find Quick Chores?
- Do points and leaderboard make sense?
- Do rewards and forfeits feel fun rather than harsh?
- Are any screens too cluttered on mobile?
- What chores are missing from starter templates?
- What wording feels unclear?

## Invite UX Refinement Plan

- keep invite language short and clear
- show the current invite status plainly
- explain what happens when someone uses the link
- keep error states friendly for invalid, expired, or already-used invites
- avoid admin-heavy invite dashboards

## Member Display and Name Polish Plan

- prefer friendly display names over raw identifiers where possible
- support nicknames or display labels if the existing schema already allows it
- keep member identity clear on Settings, rewards/forfeits, and invite-related screens
- avoid exposing internal IDs in the UI

## Member Management Plan

- provide a simple household member list
- show role and join status clearly
- allow owner/admin visibility into the current roster
- if member removal is added, prefer archive or deactivate over hard delete
- keep destructive actions out of the default flow

## Household Settings Polish Plan

- make household information easier to scan on mobile
- keep member management alongside existing household settings
- surface invite and household status in one place
- keep copy concise and future i18n-friendly

## First-Run Guidance Plan

- give new owners a clear next step after household creation
- explain that the next step is to invite household members
- explain where Quick Chores and leaderboard information live
- avoid overloading brand new households with too much text

## Empty and Error State Polish Plan

- empty households should explain what to do next
- missing members should not feel like a broken screen
- invite and member management errors should be clear and calm
- beta feedback should be easy to capture without blocking the main flow

## Mobile QA Plan

- verify the flow on small phone screens first
- confirm member list and invite controls are readable without zooming
- keep tap targets large enough for thumb use
- avoid dense admin tables or desktop-first layouts

## Bug Capture and Feedback Plan

- capture beta issues in a lightweight, low-friction way
- prefer notes, checklist items, or a simple support path over heavy tooling
- keep feedback capture separate from core chore completion

## Required Database Considerations

- use existing household and membership records where possible
- add only small, narrow schema changes if a nickname or archive flag is truly needed
- keep all member and invite writes household-scoped
- avoid destructive deletion by default

## Required Routes, Pages, and Components

- Settings section for household member visibility and invite clarity
- household member list component
- invite copy/status component
- first-run guidance content on the onboarding and home experience
- empty-state components for brand new households
- simple beta feedback/support guidance where appropriate

## Mobile-First UI Requirements

- mobile-first remains non-negotiable
- keep screens uncluttered
- use cards, short sections, and clear hierarchy
- avoid admin-style density
- make the next action obvious

## Copy and Tone Requirements

- keep copy friendly, calm, and non-judgemental
- avoid harsh or punitive language
- keep wording short and future i18n-friendly
- explain what users should do next rather than blaming them

## Safety and Fairness Considerations

- member removal should not become destructive by default
- archive or deactivate is preferred over hard delete where possible
- avoid confusing owner/admin/member boundaries
- beta feedback should help reduce friction, not add complexity

## RLS and Security Considerations

- household member and invite data must remain household-scoped
- invite and member management must respect owner/admin permissions
- no service-role logic should appear in app source
- do not expose secrets or internal identifiers
- invite tokens and join flows must remain secure

## Validation Plan

- repo-level lint and build checks
- conflict-marker search
- `.env.local` tracking check
- route-level smoke testing for the member and invite experience
- mobile QA on real phone or browser-sized view where practical

## Runtime Smoke-Test Plan

- owner can view household members
- owner can invite or manage a household member list
- new member can join and understand the result
- invite copy and error states remain clear
- home and chores still work after beta-polish changes
- sign-out still works

## Acceptance Criteria

- a real household can understand who is in the household
- invite and member states are easy to read on mobile
- first-run guidance makes the next step obvious
- empty states and errors are helpful
- the app remains simple, playful, and low-friction

## Risks and Constraints

- member management can become too admin-heavy if overbuilt
- nickname/display-name work may depend on existing schema support
- destructive deletion is out of scope unless explicitly revisited later
- beta feedback should stay lightweight

## Follow-up Phases

- Phase 10 - App Store readiness and Expo wrapper
- future Resend email invite automation
- future advanced reporting and charts
- future photo proof

