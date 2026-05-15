# Phase 6 - Production Readiness Foundation

## Phase name

- Phase 6 - Production readiness foundation

## Objective

Prepare Chore Wars for safe hosted testing with real users before adding larger feature areas such as rewards, forfeits, reports, photo proof, or App Store wrapper work.

## Why production readiness comes after MVP usability polish

- The core web MVP must be clear and fast before real users test it
- Production readiness is about confidence, safety, and communication rather than new gameplay
- Hosted testing surfaces deployment, redirect, policy, and support gaps that are easier to fix before wider sharing
- This phase should reduce launch risk without expanding product scope

## What Phase 6 includes

- Hosted Vercel smoke testing
- Mobile browser QA on real phones
- Privacy policy placeholder page or draft
- Terms of use placeholder page or draft
- Support/contact page or draft
- Basic account deletion request path or instructions
- Production environment variable checks
- Supabase Auth redirect URL checks
- Production deployment checklist updates
- Clearer production error and empty-state review
- Release checklist updates
- No major new product feature areas

## What Phase 6 excludes

- Rewards or forfeits
- Advanced reports
- Charts
- Achievements
- Streaks
- Photo proof
- Resend invite emails
- Payments or subscriptions
- Expo or App Store wrapper implementation
- Push notifications
- Complex chore assignment or recurrence engine

## Hosted Vercel smoke-test plan

- Verify the deployed production URL loads on desktop and mobile
- Verify sign-in and sign-out work against the hosted environment
- Verify household onboarding still works on the hosted deployment
- Verify chore completion still reaches the database
- Verify basic errors are understandable when something fails

## Mobile browser QA plan

- Test the hosted app on iPhone-sized browsers
- Confirm tap targets remain easy to use
- Confirm bottom navigation remains usable on a phone
- Confirm the app still feels mobile-first when served from Vercel
- Confirm loading, empty, and error states still read clearly on small screens

## Privacy policy placeholder plan

- Create a simple placeholder or draft policy page if the final policy is not yet approved
- Mark it clearly as draft where appropriate
- Keep the language honest about current data use
- Avoid promising privacy claims that are not true yet

## Terms of use placeholder plan

- Create a simple placeholder or draft terms page if the final terms are not yet approved
- Mark it clearly as draft where appropriate
- Keep the copy concise and reviewable
- Avoid legal overreach or hidden product commitments

## Support and contact page plan

- Add a simple support/contact page or instructions page
- Provide a clear contact route for production testers
- Avoid exposing private personal details unnecessarily
- Keep support guidance short and easy to scan

## Account deletion request path plan

- Add a basic account deletion request or instructions path
- Start with a clear request form or support instruction page if a full automated flow is not yet ready
- Make the path discoverable from the app or support page
- Preserve the option to build a more robust deletion process later

## Production env var checklist

- Confirm production `NEXT_PUBLIC_APP_URL`
- Confirm production Supabase URL and anon key
- Confirm any server-only secrets remain server-side only
- Confirm preview and development values remain separated
- Confirm `.env.local` stays untracked

## Supabase Auth URL and redirect checklist

- Confirm local redirect URLs still work for development
- Confirm preview URLs are allowed where needed
- Confirm production hosted URLs are allowed
- Confirm callback routes are aligned with the deployed app URL

## Supabase RLS and security checklist

- Keep household-scoped data access enforced by RLS
- Avoid broadening permissions just to make production testing easier
- Keep service-role usage server-side only
- Review any new support or deletion routes for access control impact

## Error and loading state review plan

- Review production error copy on key routes
- Confirm loading states still feel intentional and mobile-friendly
- Confirm empty states help real users understand what to do next
- Avoid technical language in user-facing fallback states

## Logging and observability plan

- Confirm release notes and logs reflect the current production readiness state
- Capture notable hosted smoke-test results in the handoff notes
- Track any production-only blockers separately from implementation bugs
- Keep operational notes short and actionable

## Real-user beta readiness criteria

- Hosted app is stable on the production URL
- Mobile browser flows work on real phones
- Auth and household onboarding remain reliable in the hosted environment
- Legal/support/account-deletion placeholders are visible and understandable
- No secrets are exposed in public pages or client code

## Data privacy considerations

- Match policy pages to the current data model
- Avoid collecting data you do not need yet
- Make any placeholder legal text clearly temporary
- Keep account deletion and support instructions discoverable

## Internationalisation considerations

- Keep copy concise and translation-friendly
- Avoid hardcoded region or currency assumptions
- Keep hosted test copy English-first and UK/US ready
- Prepare for later localisation without blocking production readiness

## Validation plan

- Run repo-level validation after doc changes
- Verify the hosted app in a phone browser if practical
- Confirm redirect URLs and environment variable notes are accurate
- Update logs with any production-readiness findings

## Acceptance criteria

- The hosted Vercel deployment is ready for controlled real-user testing
- Mobile browser QA guidance is documented
- Legal/support/account deletion placeholders are planned
- Production env, redirect, and security notes are clear
- The phase does not introduce major new product features

## Risks and constraints

- Placeholder legal pages must not be mistaken for final legal review
- Production testing can expose redirect and environment mistakes
- Account deletion instructions may need follow-up before App Store work
- Support/contact pages must avoid exposing private personal data
- This phase must not become a backdoor for feature expansion

## Follow-up phases

- App Store readiness and Expo wrapper
- Additional native polish if needed
- Deeper production analytics or observability if later required
