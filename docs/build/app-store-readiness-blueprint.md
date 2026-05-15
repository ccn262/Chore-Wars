# App Store Readiness And Expo Wrapper

## Phase name

- App Store readiness and Expo wrapper

## Objective

Prepare Chore Wars for Apple App Store submission without turning the product back into a web-only experience. This phase should turn the stable hosted MVP into a believable mobile app package with a production web source, a native-feeling wrapper, store assets, and the compliance items Apple expects.

## Why this phase comes after web MVP stabilisation

- The core loop is already built and polished on the web
- The product should prove value on real phones before adding native packaging overhead
- App Store work is mostly release engineering, metadata, compliance, and wrapper quality
- Shipping too early would risk validating an unstable wrapper instead of the real product

## Recommended approach

- Use Expo plus a React Native WebView wrapper around the production hosted web app
- Keep the web app as the source of truth for product behaviour
- Use native shell polish around the web experience instead of rebuilding all UI twice
- Avoid a lazy browser wrapper by adding native-feeling loading, splash, offline, and error states

## What Phase 8 includes

- Expo project setup for iOS distribution
- WebView wrapper that loads the production hosted app
- App icon, splash screen, and app metadata
- TestFlight distribution preparation
- Apple Developer and App Store Connect setup
- Store listing copy, screenshots, and keyword planning
- Privacy policy, terms, support, and account deletion path planning
- Production readiness checks for Vercel, Supabase, and auth redirects
- Native-feel wrapper polish such as loading and offline fallback states

## What Phase 8 excludes

- Rebuilding the full app natively
- Major product redesign
- New chore engine logic
- New scoring logic
- Advanced reporting
- Charts
- Streaks
- Rewards or forfeits
- Photo proof
- Resend invite flows
- Payments or subscriptions
- Push notifications unless they are explicitly queued for a later native phase

## Apple Developer account checklist

- Confirm Apple Developer Program membership
- Confirm legal account ownership and billing details
- Confirm app name ownership and team access
- Confirm who can access App Store Connect

## App Store Connect checklist

- Create or confirm the app record
- Confirm bundle identifier
- Set the primary language
- Add support, privacy, and app metadata
- Configure age rating and pricing

## TestFlight checklist

- Create internal testers
- Prepare an installable build
- Verify sign-in, household onboarding, chore completion, and sign-out on real iPhones
- Capture build notes and known issues for testers

## Expo and EAS build checklist

- Create the Expo wrapper project
- Configure the iOS bundle identifier
- Set up EAS Build profiles
- Confirm environment variables for production
- Verify the production web URL is the wrapper target

## WebView wrapper requirements

- Load the production hosted web app
- Provide a branded loading state before the web content is ready
- Provide a clear offline or failed-load fallback
- Preserve session flow and authentication state safely
- Avoid exposing service-role credentials in the mobile client
- Keep wrapper navigation simple and predictable

## Native-feel requirements

- Use a polished splash screen
- Use app icon and launch assets that feel intentional
- Keep loading feedback fast and clear
- Keep wrapper chrome minimal
- Make the app feel like a mobile product, not a browser tab

## Offline and error fallback requirements

- Show a friendly offline state when the network is unavailable
- Show a clear retry path for load failures
- Avoid blank screens or cryptic browser errors
- Preserve the app identity even when content cannot load

## App icon and splash screen requirements

- Create a recognisable app icon
- Create a simple splash screen aligned with the brand
- Test light and dark contexts if supported
- Verify aspect ratios and safe areas on iPhone devices

## App Store listing asset requirements

- App icon
- Screenshot set
- Short description
- Long description
- Subtitle
- Keywords
- Support URL
- Privacy policy URL
- Terms URL

## Screenshot requirements

- Show fast household score understanding
- Show one-tap chore completion
- Show the weekly winner or simple leaderboard
- Show quick chore actions
- Show the playful but polished mobile feel
- Avoid overcrowded marketing screenshots

## Privacy policy requirements

- Explain account creation and household data usage clearly
- Match the actual data collected by the app
- Include support for account deletion requests
- Keep language consistent with the production implementation

## Terms of use requirements

- Define user responsibilities
- Explain household data sharing within a household
- State acceptable use and moderation boundaries
- Keep the terms aligned with app behaviour

## Support and contact URL requirements

- Provide a reachable support contact page or support email
- Make support discoverable from the listing
- Keep the contact details current before submission

## Account deletion requirements

- Provide an account deletion path before submission
- Ensure deletion can be requested without support friction
- Clarify what happens to household data and member records
- Confirm deletion flow matches App Store expectations

## App privacy labels and data collection planning

- Map every data type the app collects or stores
- Keep the privacy label consistent with actual app behaviour
- Separate auth, household, scoring, and support data in the planning notes
- Do not claim data is unused if the app needs it for core features

## Age rating considerations

- Expect a family-friendly rating target
- Review whether playful competition language affects content ratings
- Keep the rating aligned with the actual UX and copy

## Internationalisation considerations

- English first
- UK and US ready first
- App Store metadata can be localised later
- Avoid hardcoded currency or region assumptions
- Prepare listing copy that can be translated cleanly

## Production readiness prerequisites

- Hosted web MVP is stable on real phones
- Auth, household onboarding, chore completion, and duplicate-tap protection are reliable
- Production domain and Vercel deployment are available
- Supabase production configuration is separated from local development
- Account deletion path and policy pages exist before submission

## Vercel and domain prerequisites

- Production deployment should be the wrapper source URL
- Custom domain should be configured before submission if possible
- Production callback and redirect URLs must be correct
- Preview and local URLs should remain valid for development

## Supabase production and security prerequisites

- Production Supabase project and environment variables must be configured separately from local values
- Service-role keys must never be exposed to the client or wrapper bundle
- Auth redirects must allow production, preview, and local callback URLs
- RLS should remain the enforcement layer for household-scoped data

## Apple review risk notes

- WebView apps can be rejected if they feel like thin wrappers
- Missing privacy policy, support, or deletion flow can block review
- Broken offline handling or weak native polish can make the app feel unfinished
- Store metadata must match the real product and data usage

## Validation plan

- Verify the web MVP on a real iPhone through the production URL
- Verify sign-in, household access, chore completion, and sign-out
- Verify the wrapper loads the production app cleanly
- Verify offline and failed-load states
- Verify store assets and metadata against the live product

## Acceptance criteria

- The web MVP is stable and accessible from a production domain
- The Expo wrapper loads the hosted app and feels native enough for review
- App Store compliance pages and deletion flow exist
- Screenshots and listing text are ready
- TestFlight builds can be installed on iPhones
- Service-role secrets stay out of the client bundle

## Follow-up phases

- Native wrapper hardening
- Notification or native convenience features if needed later
- App Store listing iteration after beta feedback
- Potential deeper native polish if the wrapper approach proves insufficient
