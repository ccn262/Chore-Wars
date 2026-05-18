# Phase 10: Beta Feedback And Issue Capture

## Phase name

- Phase 10: Beta feedback and issue capture

## Objective

Prepare Chore Wars for controlled real-household beta testing by making it easy for testers to report bugs, send feedback, suggest chores, and see what they should try, without building a heavy feedback system yet.

## Why this phase comes after Phase 9B

- Phase 9B completed the main household admin controls and week settings
- The hosted MVP now has enough practical flows to test with real households
- Feedback capture only becomes useful once invited members can complete the core household loop
- This phase should help the team learn from real testers before adding larger feature areas

## What Phase 10 includes

- Improve the support page for beta feedback
- Add or refine `Send feedback` flow
- Add or refine `Report a bug` flow
- Add or refine `Suggest a chore` flow
- Use mailto links or a simple support contact for now
- Add a beta tester checklist page or section if appropriate
- Add clear guidance for what testers should try
- Keep the support email configurable
- Update docs, logs, and the release checklist

## What Phase 10 excludes

- Resend email sending
- Database-heavy feedback inbox unless explicitly justified
- Analytics or tracking
- Payments or subscriptions
- Advanced reports or charts
- Achievements or streaks
- Photo proof
- Push notifications
- Expo or App Store implementation
- AI feedback analysis

## Product behaviour

- Testers should be able to report issues in a few taps
- Support should feel like a lightweight help path, not a ticketing system
- Feedback prompts should be visible from the app and easy to find during beta
- The app should clearly frame these flows as early-testing support, not a mature help desk

## Feedback/support route plan

- Keep the support page as the main support and beta feedback entry point
- Surface short actions for feedback, bug reports, and chore suggestions
- Prefer mailto links or direct support contact links for now
- Avoid long forms or extra fields unless they are essential
- Keep the route and wording short and phone-friendly

## Bug report plan

- Let testers quickly say what broke and where it happened
- Encourage a short description and the route or screen name
- Tell testers not to include passwords or private information
- Prefer a simple support email or mailto flow over a database inbox

## Suggest-a-chore plan

- Let testers suggest starter chores, missing chores, or better chore wording
- Keep the flow lightweight and friendly
- Avoid making the suggestion path feel like a product feature request system
- Use the support page or a simple mailto link

## Beta tester checklist plan

- Add a small checklist that explains what to test
- Include the important household flows that matter in beta
- Keep the checklist easy to scan on a phone

Suggested beta checklist:

- Create or join a household
- Invite another member
- Create a custom chore
- Complete quick chores
- Check the leaderboard
- Set a reward or forfeit
- Change the week start day
- Edit a chore
- Archive a chore
- Edit a member name
- Check normal member restrictions
- Report anything confusing

## Support/contact copy plan

- Use friendly copy like `Found something odd?`
- Use short CTAs like `Send beta feedback`, `Report a bug`, and `Suggest a chore`
- Keep the support contact configurable through the existing site config
- Avoid exposing a private personal email unless intentionally configured
- Make it clear the app is still in beta or early testing

## Data/privacy considerations

- Do not ask testers for passwords or private data
- Keep feedback paths simple and low-friction
- Do not collect more than is needed to understand the issue
- Be clear about what contact details are visible to testers
- Keep any future feedback capture scoped to the household or support channel that needs it

## Future database feedback capture considerations

- If feedback needs to be stored later, keep it very small and purposeful
- Only add storage if it clearly improves beta operations
- Avoid creating a full support inbox system too early
- Keep any future model aligned with the app’s household-scoped structure

## Future Resend/email considerations

- Resend email sending remains future work
- Any later email automation should build on proven in-app feedback flows
- Do not add email automation until the beta feedback loop is useful and stable

## Mobile-first UI requirements

- Keep support and feedback surfaces compact and thumb-friendly
- Use cards, buttons, and short labels
- Avoid large forms and dense settings-style layouts
- Keep actions visible on phone screens without hunting

## Copy and tone requirements

- Friendly
- Playful
- Brief
- Polished
- Clear
- Avoid childish copy
- Avoid asking for sensitive information
- Keep text future i18n-friendly

## Validation plan

- Confirm public feedback and support routes load on mobile and desktop browsers
- Confirm the support page shows clear beta feedback actions
- Confirm the tester checklist is easy to scan
- Confirm copy and contact details are readable and not overwhelming

## Hosted smoke-test plan

- Open the support page from the public app
- Confirm beta feedback actions are visible
- Confirm bug-report and chore-suggestion paths are easy to find
- Confirm the tester checklist is visible if included
- Confirm the copy is clear on phone-sized screens

## Acceptance criteria

- Testers can find a support or feedback path quickly
- Testers can report bugs, send feedback, and suggest chores without a heavy form
- The beta checklist tells testers what to try
- The wording is friendly and clear
- Sensitive data is not requested
- Support contact remains configurable

## Risks and constraints

- A heavy feedback system could slow the product down too early
- A long form could reduce beta participation
- A public email address could become stale if it is hardcoded
- The feature should stay lightweight until real tester patterns are understood

## Follow-up phases

- Small database-backed feedback capture, if justified
- Resend-based beta summaries later
- Broader insights and retention loops
- App Store readiness after the web beta is stable
