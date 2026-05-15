# Schema Overview

## Data design goals

- Support multiple people in one household
- Keep chore completion fast to write and easy to read
- Preserve audit history for points and completions
- Support locale-aware display without storing presentation logic
- Keep Supabase Auth users separate from app profiles and household members
- Use household-scoped identity for scoring and household access

## Core entities

- Profiles
- Households
- Household members
- Household invites
- Chore categories
- Chore templates
- Chores
- Chore completions
- Points ledger entries
- Household settings
- Audit log

## Schema rules

- Model household ownership and membership clearly
- Keep references explicit
- Use UUID primary keys where practical
- Store timestamps with timezone awareness
- Treat display formatting as a UI concern, not a schema concern
- Seed templates for starter chores rather than hardcoding them in the UI
- Use an atomic chore-completion RPC to guard the short duplicate-tap window

## Operational functions

- `complete_chore_atomically(target_chore_id uuid)` performs one atomic completion attempt
- The function validates the caller's current household membership before writing
- The function serialises concurrent completion attempts for the same member and chore
- The existing completion trigger still writes the corresponding points ledger entry
