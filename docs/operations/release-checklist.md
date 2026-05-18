# Release Checklist

## Before release

- Confirm build passes
- Confirm environment variables are set
- Check core mobile flows
- Review internationalised copy
- Verify domain and email setup
- Update logs if there are meaningful changes

## App Store readiness

- Confirm Apple Developer account access
- Confirm App Store Connect app record exists
- Confirm bundle identifier is decided
- Confirm Expo and EAS build setup is complete
- Confirm TestFlight build can be generated
- Confirm screenshots are ready
- Confirm app icon is ready
- Confirm splash screen is ready
- Confirm privacy policy URL is live
- Confirm terms URL is live
- Confirm support URL is live
- Confirm account deletion route exists
- Confirm production domain is configured
- Confirm production Supabase project and env vars are configured
- Confirm Vercel production env vars are set
- Confirm final smoke test passes on real iPhones

## Production readiness

- Confirm hosted Vercel smoke test passes
- Confirm mobile browser QA passes on iPhone-sized devices
- Confirm auth callback routes work on production and preview deployments
- Confirm Supabase redirect URLs include production, preview, and local callback URLs
- Confirm environment variable scopes are correct for Production, Preview, and Development
- Confirm privacy, terms, support, and account deletion pages or placeholders exist
- Confirm pre-beta readiness notes are updated

## Beta feedback readiness

- Confirm support or beta feedback route exists
- Confirm bug-report flow exists
- Confirm suggest-a-chore flow exists
- Confirm beta tester checklist exists or is linked
- Confirm copy tells testers not to include passwords or sensitive data
- Confirm support contact is configurable and current
