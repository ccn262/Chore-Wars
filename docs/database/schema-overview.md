# Schema Overview

## Data design goals

- Support multiple people in one household
- Keep chore completion fast to write and easy to read
- Preserve audit history for points and completions
- Support locale-aware display without storing presentation logic

## Likely core entities

- Users
- Households
- Household members
- Chores
- Chore schedules or cycles
- Completions
- Points ledger entries
- Notifications or reminders
- User preferences

## Schema rules

- Model household ownership and membership clearly
- Keep references explicit
- Store timestamps in UTC
- Treat display formatting as a UI concern, not a schema concern

