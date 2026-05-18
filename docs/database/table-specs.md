# Table Specs

## Table guidance

This document now tracks the core Phase 2 database contract.

## Tables to define first

- `profiles`
- `households`
- `household_members`
- `household_invites`
- `chore_categories`
- `chore_templates`
- `chores`
- `chore_completions`
- `points_ledger`
- `household_settings`
- `audit_log`

## Design rules

- Use stable UUID primary keys
- Store foreign keys explicitly
- Keep `profiles.auth_user_id` separate from household membership
- Keep `household_members` as the household-scoped identity for scoring
- Include created and updated timestamps where useful
- Keep soft archive decisions deliberate, not accidental
- Treat archived members as paused, not deleted; invite rejoin should restore the same household member row so historical points and completions stay attached
- Use immutable completion rows and ledger-based scoring where practical
- Store simple household reward and forfeit text in `household_settings`
