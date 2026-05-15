# Vercel Setup

## Planned setup notes

- Connect the repository to Vercel for deployment
- Add required environment variables
- Verify preview and production settings
- Confirm domain configuration before launch
- Production deployment URL is the source of truth for hosted smoke testing
- The Vercel production deployment should become the source URL for any future Expo wrapper
- Configure a custom domain before App Store submission if possible
- `NEXT_PUBLIC_APP_URL` should match the production or custom domain
- Environment variable scopes should be managed separately for Production, Preview, and Development
- Supabase Auth redirect URLs must include production, preview, and local callback URLs
- After merging to `main`, verify the deployed production build before wider sharing
