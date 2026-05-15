# Known Issues

Track unresolved issues that are understood and accepted for now.

## Current state

- No known implementation blockers
- Supabase credentials must be configured locally or in deployment env vars before Phase 3 can be tested end to end
- Future Phase 3 verification may require local `.env.local` values or deployment environment variables
- RLS policies must be tested carefully before production use
- Local validation is limited to repo-level checks until Supabase is connected
- Phase 1 scaffold is in place and validation passed
- Competitor pricing and app-store availability need deeper research before monetisation is finalised
- Brand name, domain, trademark, and app-store availability still need validation
- Phase 2 database foundation has now been manually validated in Supabase SQL Editor
- Earlier exposed credentials should be rotated before real app connection if not already done
- Phase 3 auth foundation runtime smoke test passed with a disposable local Supabase account
- No current runtime blockers remain for the Phase 3 auth and household onboarding foundation
- No known implementation blockers
- Chore engine not yet implemented
- Runtime testing will require Supabase env vars and an authenticated household user
- RLS policies may need narrow follow-up fixes once chore completion is tested
- Phase 4 runtime smoke test passed locally after a narrow profile bootstrap race fix
- Phase 4 runtime smoke test passed locally after an atomic profile bootstrap fix
- No current implementation blockers remain for the Phase 4 chore engine foundation

## Phase 5 notes

- The MVP core loop works but needs usability polish
- Runtime testing for Phase 5 will require Supabase env vars and an authenticated household user
- RLS policies may still require follow-up as more member and role flows are added
- Repeated local auth sign-up attempts can hit Supabase email rate limits during smoke testing, so a disposable admin-created test user may be needed for reliable validation
- Phase 5 runtime smoke testing completed successfully after using a disposable confirmed user and cleaning up the test data
- Local review smoke retest hit Supabase email rate limiting on fresh sign-up attempts
- The current local `.env.local` does not expose a service-role key, so disposable admin-created smoke-test users are not available from the local env alone
- Full repeatable end-to-end auth smoke testing is therefore currently environment-limited rather than code-blocked

## Entry format

- Issue
- Severity
- Current workaround
- Target fix
