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
- Phase 3 auth foundation is implemented locally, but runtime auth and onboarding are still pending because local Supabase env vars are not present in `.env.local`

## Entry format

- Issue
- Severity
- Current workaround
- Target fix
