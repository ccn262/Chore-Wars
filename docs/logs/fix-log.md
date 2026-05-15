# Fix Log

Track notable fixes, especially anything that affects core flows.

## Entry format

- Date
- Issue
- Root cause
- Fix
- Verification

## 2026-05-15

- Issue: Phase 2 migration failed in the manual Supabase SQL Editor with `ERROR: 42P01: relation "public.profiles" does not exist`
- Root cause: helper functions that queried `public.profiles` and `public.household_members` were defined before the core tables existed in the migration file
- Fix: moved the table-querying helper functions below the core table creation block so `public.profiles` exists before any function or policy references it
- Affected file: [`/C:/Users/Chris/OneDrive/Documents/Chore Wars/supabase/migrations/20260515120000_phase2_database_foundation.sql`](C:/Users/Chris/OneDrive/Documents/Chore%20Wars/supabase/migrations/20260515120000_phase2_database_foundation.sql)
- Verification: repo-level validation pending; manual Supabase SQL Editor retry still needed after this fix
