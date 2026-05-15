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
- Verification: migration applied successfully in Supabase SQL Editor; manual validation complete

- Issue: Phase 2 seed failed in Supabase SQL Editor with `ERROR: 23503: insert or update on table "household_invites" violates foreign key constraint "household_invites_invited_by_member_id_fkey"`
- Root cause: the seed file inserted fake household-specific demo rows, including an invite that pointed at a household member id not present in the target table during seed execution
- Fix: reduced the seed file to safe global starter data only, limited to chore categories and chore templates
- Affected file: [`/C:/Users/Chris/OneDrive/Documents/Chore Wars/supabase/seed/20260515121000_phase2_seed.sql`](C:/Users/Chris/OneDrive/Documents/Chore%20Wars/supabase/seed/20260515121000_phase2_seed.sql)
- Verification: seed applied successfully in Supabase SQL Editor; manual validation complete

- Issue: Phase 2 database foundation needed end-to-end manual verification after the migration and seed fixes
- Root cause: the earlier migration ordering issue and seed scope issue both needed to be cleared before the database foundation could be trusted
- Fix: reran the Supabase SQL Editor flow after correcting the migration and seed file
- Affected file: [`/C:/Users/Chris/OneDrive/Documents/Chore Wars/supabase/migrations/20260515120000_phase2_database_foundation.sql`](C:/Users/Chris/OneDrive/Documents/Chore%20Wars/supabase/migrations/20260515120000_phase2_database_foundation.sql) and [`/C:/Users/Chris/OneDrive/Documents/Chore Wars/supabase/seed/20260515121000_phase2_seed.sql`](C:/Users/Chris/OneDrive/Documents/Chore%20Wars/supabase/seed/20260515121000_phase2_seed.sql)
- Verification: Phase 2 database foundation manually validated in Supabase SQL Editor

## 2026-05-15

- Issue: Phase 3 household creation helper failed during runtime smoke testing when it tried to return the inserted household row immediately after insert
- Root cause: the `insert(...).select(...)` pattern could trip household RLS during the return path, even though the insert itself was valid
- Fix: changed household creation to use a minimal insert, then query the inserted household back in a separate read before creating settings and verifying the owner member
- Affected file: [`/C:/Users/Chris/OneDrive/Documents/Chore Wars/src/lib/auth.ts`](C:/Users/Chris/OneDrive/Documents/Chore%20Wars/src/lib/auth.ts)
- Verification: runtime smoke test passed after the fix, including sign-in, household creation, owner-member creation, and sign-out

- Issue: Phase 4 runtime smoke test hit `duplicate key value violates unique constraint "profiles_auth_user_id_key"` on the first signed-in `/home` render
- Root cause: the app shell layout and the home page both call `getViewerContext()`, so profile bootstrap could race and attempt the same insert twice during the same render
- Fix: made `ensureProfileForUser()` treat the unique-constraint conflict as a harmless concurrent bootstrap and re-read the existing profile
- Affected file: [`/C:/Users/Chris/OneDrive/Documents/Chore Wars/src/lib/auth.ts`](C:/Users/Chris/OneDrive/Documents/Chore%20Wars/src/lib/auth.ts)
- Verification: Phase 4 runtime smoke test passed after the fix; /home, /chores, chore completion, points ledger, and sign-out all validated locally

- Issue: Phase 4 review still showed the same profile bootstrap race on repeated authenticated `/home` renders
- Root cause: the insert-and-recover path was still non-atomic, so two concurrent bootstrap calls could both miss the profile and race on the unique constraint
- Fix: switched profile bootstrap to a single `upsert(..., { onConflict: "auth_user_id" })` path so repeated renders converge on one profile row safely
- Affected file: [`/C:/Users/Chris/OneDrive/Documents/Chore Wars/src/lib/auth.ts`](C:/Users/Chris/OneDrive/Documents/Chore%20Wars/src/lib/auth.ts)
- Verification: Phase 4 runtime smoke test passed again after the atomic bootstrap fix; lint, build, and repository checks remained clean
