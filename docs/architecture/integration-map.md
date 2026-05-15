# Integration Map

## Planned integrations

- **Supabase**: authentication, data storage, policies, and backend functions
- **Vercel**: deployment and runtime hosting
- **Resend**: sign-in, invitation, and notification emails
- **GitHub**: source control, issues, pull requests, and workflow
- **Porkbun**: domain purchase and DNS management

## Integration principles

- Each integration needs one clear owner document
- Keep environment variables documented in `.env.example`
- Avoid hard dependency on any provider-specific feature unless it is required
- Use adapters or wrappers where the system might change later

