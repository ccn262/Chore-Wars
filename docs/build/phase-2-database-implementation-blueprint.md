# Phase 2 - Supabase Database Foundation

## Phase name

Phase 2 - Supabase database foundation

## Objective

Create the core relational database base for Chore Wars in Supabase so the app can safely support households, members, chore templates, chore instances, completions, and points-ledger scoring.

## Why database foundation comes before chore UI

- The chore UI needs a stable data model before interaction logic can be trusted
- Household-scoped access rules are easier to validate before UI complexity grows
- Scoring, completion history, and invites depend on relational shape, not just screens
- A database-first phase reduces rework when the chore engine and reporting layers arrive
- RLS and membership rules should be proven before any feature UI depends on them

## What Phase 2 includes

- Core Supabase schema design
- Initial migration set
- Primary keys, foreign keys, and indexes
- Initial RLS policy structure
- Seed data for starter categories and chore templates
- Household-scoped access model
- Database validation and local verification steps
- Documentation updates for the schema and policy plan

## What Phase 2 excludes

- Chore UI feature work beyond existing placeholders
- Real auth flow implementation in the app shell
- Rewards, forfeits, achievements, and badges
- Payments
- Resend flows
- Expo or App Store work
- Full reporting tables or reporting logic
- Production domain work
- Broad product UI rewrites

## Core table list

### Identity and access

- `profiles`
- `households`
- `household_members`
- `household_invites`

### Chore system

- `chore_categories`
- `chore_templates`
- `chores`
- `chore_completions`

### Scoring

- `points_ledger`

### Optional but useful

- `household_settings`
- `audit_log`

## Table relationship overview

- `profiles` stores the app-level user profile tied to a Supabase Auth user
- `households` is the shared home container
- `household_members` links profiles to households and holds the household-scoped identity
- `household_invites` supports controlled onboarding into a household
- `chore_categories` provides global or seeded category grouping
- `chore_templates` holds reusable starter chores and suggested defaults
- `chores` stores household-created chore instances derived from templates or custom entries
- `chore_completions` records immutable completion events where practical
- `points_ledger` records score changes as auditable events instead of only mutable totals
- `household_settings` centralises household-level preferences if needed
- `audit_log` captures notable system events if the data model benefits from it

## Key design principles

- Use Supabase Auth users separately from household members
- One auth user can belong to multiple households
- Household member is the household-scoped identity used for scoring
- Children or non-email users may be supported later, so `household_members` should not assume every member has a linked auth user
- Chore completions should be immutable event records where practical
- Points should be recorded through a ledger rather than only mutable totals
- Default chore templates should seed starter content
- Household-created chores should be separate from global templates
- Soft archive chores and members where practical instead of destructive deletion
- Design with internationalisation readiness in mind
- Do not hardcode currency assumptions
- Store timestamps with timezone awareness
- Use UUID primary keys where appropriate
- Use RLS from the start
- Access should be household-scoped

## RLS approach

- Users can only access households they belong to
- Owners and admins can manage household settings, chores, and members
- Members can create their own chore completions
- Members can view household leaderboard-related data
- Only appropriate roles can edit or archive chores
- Service role or system tasks should be considered separately from end-user access
- Invite acceptance should be carefully handled and validated

## Seed strategy

- Seed starter chore categories:
  - Kitchen
  - Laundry
  - Cleaning
  - Bins and Recycling
  - Pets
  - Outdoors
  - Admin / Household
  - Other
- Seed starter chore templates:
  - Wash up
  - Empty dishwasher
  - Put bins out
  - Bring bins in
  - Put laundry on
  - Hang laundry
  - Fold laundry
  - Vacuum
  - Mop floor
  - Clean bathroom
  - Walk dog
  - Feed pet
  - Tidy living room
  - Change bedding
- Each template should include:
  - title
  - suggested category
  - suggested points
  - icon key
  - suggested cadence if useful
  - locale-ready naming approach where possible
- Seed data should remain clearly fake and easy to reset

## Migration strategy

- Use incremental migration files for each schema change
- Keep migrations small and focused
- Add constraints and indexes alongside the tables they protect
- Use reversible changes where practical
- Introduce RLS policies in the same phase as the tables they protect
- Keep seed files separate from schema migrations when that keeps review clearer
- Avoid schema churn by defining the household and scoring core before feature expansion

## Validation plan

- Review the generated SQL for table relationships and constraints
- Confirm RLS policies match the household-scoped access model
- Verify the seed data loads cleanly in a local or staging Supabase environment
- Check that UUIDs, timestamps, and indexes are consistent
- Confirm the schema supports later chore UI integration without structural rework
- Run available lint or build checks if any docs or tooling change alongside the database work

## Acceptance criteria

- Core tables exist with clear relationships
- Household-scoped access is enforced by RLS
- Points are ledger-based and auditable
- Chore templates can seed starter chores
- Household-created chores are separate from templates
- Members are separate from auth users
- Seed data demonstrates the intended starter workflow
- The database foundation is ready for chore UI integration in the next phase

## Risks and constraints

- RLS mistakes could expose cross-household data if not tested carefully
- Premature feature tables could lock in a weak relational model
- Overly broad seed data could make later localisation harder
- Changing auth and member identity rules later would be expensive
- Hidden assumptions about roles, currency, or household ownership would create rework

## Follow-up phases

- Phase 3: chore UI integration and main chore flow
- Phase 4: reporting, summaries, and visibility surfaces
- Phase 5: reminders, notifications, and retention improvements
- Phase 6: rewards, forfeits, and gamification expansion
- Phase 7: native wrapper and store-readiness work

