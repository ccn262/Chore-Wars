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
- Phase 5 atomic duplicate-completion protection has now been validated at the database level
- Hosted auth sign-up still rate-limits fresh disposable users, so browser-based auth smoke testing remains environment-limited

## App Store readiness notes

- App Store implementation not started
- Apple Developer account status unknown
- Privacy policy, terms, and account deletion are not yet implemented
- App icon, splash screen, and screenshot assets are not yet created
- Production custom domain is not yet connected
- Hosted Vercel real-phone smoke testing still needs confirmation if not already done

## Phase 6 notes

- Hosted Vercel retest still needs confirmation after the chore visibility and leaderboard fixes are deployed
- Legal, privacy, and terms pages exist as drafts but still need final review
- Account deletion path exists as a draft placeholder but still needs a final implementation
- Custom domain not yet connected
- App Store implementation not started
- Hosted production verification remains pending even though the local draft-page smoke test passed

## Hosted smoke follow-up notes

- The custom chore visibility issue was caused by missing client refresh after successful chore creation, not by a database insert failure
- The leaderboard score issue was caused by the weekly score window cutoff not lining up cleanly with the household timezone boundary
- Local smoke verification passed after the narrow fix, but the hosted Vercel deployment should be retested after merge

## Entry format

- Issue
- Severity
- Current workaround
- Target fix

## Hosted smoke fix note

- Custom chores can be missing from Home quick actions if the quick-action limit is filled by earlier chores; this has now been fixed in the current branch
- Repeat completions are allowed after the short duplicate-tap window; only rapid accidental duplicates are blocked
- Hosted Vercel retest is still recommended after merge to confirm the quick-action ordering in production
