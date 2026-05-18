# Testing Strategy

## Test priorities

- Chore completion flow
- Household membership permissions
- Locale-aware formatting
- Points allocation correctness
- Core navigation and onboarding

## Test style

- Test the smallest useful behaviour
- Focus on user-visible outcomes
- Keep fixtures understandable
- Add regression tests when fixing bugs

## Playwright smoke coverage

- Use `npm run test:e2e` for browser smoke testing
- Public route smoke tests should cover `/`, `/auth/sign-in`, `/auth/sign-up`, `/privacy`, `/terms`, `/support`, and `/account-deletion`
- Protected route smoke tests should confirm unauthenticated users are redirected to sign in for `/home`, `/settings`, `/chores`, and `/leaderboard`
- Invite route smoke tests should cover friendly invalid states like `/invite/undefined` and basic invalid-token handling
- Public and protected smoke tests do not require the Supabase service role or real household data
- Authenticated owner/member browser tests are a later extension and may need disposable Supabase test users
- Keep `.env.local` untracked and never print secrets in test output
- If Playwright browsers are missing locally, run `npx playwright install chromium`

