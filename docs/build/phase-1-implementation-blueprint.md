# Phase 1 - App Foundation

## Phase name

Phase 1 - App foundation

## Objective

Create the mobile-first app shell and technical baseline for Chore Wars so later product features can be added on top of a stable, app-like structure.

## What Phase 1 includes

- Next.js app scaffold
- TypeScript
- Tailwind CSS
- Mobile-first app shell
- App-like full-height layout
- Bottom navigation skeleton
- Landing page placeholder
- Auth route placeholders
- Setup route placeholders
- Dashboard route placeholders
- Reusable UI primitives
- Supabase client setup placeholders
- Environment variable structure
- Build and lint baseline

## What Phase 1 explicitly excludes

- Real auth implementation
- Database migrations
- Chore creation
- Chore completion
- Points scoring
- Reporting
- Resend emails
- Payments
- Expo wrapper
- App Store work
- Production domain setup

## Required app structure

- Keep the app mobile-first from the first scaffold
- Use a full-height shell that feels like a phone app
- Make the home surface the main landing surface
- Keep the layout simple enough to support later chore, reporting, and settings flows
- Keep navigation obvious and thumb-friendly
- Make room for later household, auth, and dashboard routes without overbuilding them now

## Route groups to create later

- `/` landing or home placeholder
- `/auth/*` sign-in, sign-up, and callback placeholders
- `/setup/*` onboarding and household setup placeholders
- `/dashboard/*` app shell and future household dashboard surfaces
- `/settings/*` user and household settings surfaces

## Component groups to create later

- Layout shell
- Bottom navigation
- Header or app bar
- Card primitives
- Button primitives
- Icon button primitives
- Sheet or modal primitives
- Empty state primitives
- Loading and skeleton primitives

## Styling and UI system recommendation

- Use Tailwind CSS for the first UI layer
- Keep styling token-driven and reusable
- Use large rounded buttons and card surfaces
- Build for a phone-like full-screen experience, not a desktop page grid
- Keep the visual language simple enough to scale into the later game-like product

## Supabase setup placeholders

- Add a lightweight Supabase client wrapper
- Reserve files or folders for future auth and database wiring
- Keep the API surface narrow and isolated
- Do not add actual tables, policies, or migrations in this phase

## Environment variable plan

- Document all required public and server variables before implementation
- Separate `NEXT_PUBLIC_` values from server-only values
- Keep Supabase URL and anon key placeholders ready
- Keep future variables for auth, email, and analytics discoverable
- Avoid hardcoding locale, currency, or deployment assumptions

## Mobile-first layout requirements

- Design the shell for a single-hand phone grip
- Preserve large tap targets
- Keep the first screen visually calm and obvious
- Avoid desktop-style density
- Keep content framed as a phone app experience

## Bottom navigation requirements

- Use bottom navigation as the default navigation pattern
- Keep the number of primary destinations small
- Make the active state obvious
- Keep labels short and thumb-friendly
- Avoid burying the main home action under menus

## Validation checklist

- App scaffold exists
- TypeScript is enabled
- Tailwind CSS is configured
- Mobile-first shell renders
- Full-height app layout is present
- Bottom navigation skeleton exists
- Placeholder routes compile
- Supabase placeholders exist
- Environment variable structure is documented
- Build and lint commands run successfully

## Acceptance criteria

- The app starts with a stable shell and no missing structural pieces
- The layout feels like a mobile app rather than a desktop website
- Future chore, scoring, and reporting features have clear insertion points
- The scaffold is minimal and does not include business logic
- The baseline is ready for Phase 2 feature work

## Risks and constraints

- Overbuilding the scaffold could slow later feature work
- Desktop-first habits could creep into the shell if route density grows too fast
- Premature business logic would blur the boundary between foundation and product features
- The design system must stay simple enough to support later feature iteration
- Implementation must remain narrow so the app shell can stabilise before feature work starts

