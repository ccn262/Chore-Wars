# Phase 8 Codex Prompt - Household invites and member joining foundation

Use this prompt for the next implementation task.

## Branch

- Create and work on `codex/phase8-household-invites`

## Read first

- `AGENTS.md`
- `docs/build/phase-8-household-invites-blueprint.md`
- `docs/database/schema-overview.md`
- `docs/database/table-specs.md`
- `docs/database/rls-plan.md`

## Task

Implement the Phase 8 household invite and member joining foundation.

## Required approach

- Inspect the existing `household_invites` table and policies before adding any migration
- Prefer the existing table and policies if they already support the MVP flow
- Add a narrow migration only if the existing schema cannot support the required invite flow safely
- Implement owner/admin invite creation for the current household
- Implement a copyable invite link
- Implement `/invite/[token]`
- Implement new-user and existing-user accept flows
- Ensure joining is household-scoped and RLS-safe
- Ensure household member creation uses the correct default role
- Add clear expired, invalid, revoked, already-used, and already-member states
- Keep the UI mobile-first and simple
- Avoid Resend and other email automation

## Required boundaries

- Do not add email invitations
- Do not add SMS or WhatsApp flows
- Do not add payments or subscriptions
- Do not add advanced reporting or charts
- Do not add achievements or streaks
- Do not add photo proof
- Do not add push notifications
- Do not add Expo or App Store work
- Do not add complex family or child account management
- Do not expand permissions beyond owner, admin, and member

## Implementation notes

- Invite tokens must be secure and unguessable
- Invite acceptance must not allow a user to join an arbitrary household
- If a signed-in user needs to authenticate first, return them to the invite flow afterwards
- Preserve mobile-first design and concise copy
- Do not use service-role logic in app source
- Keep changes narrow and readable

## Documentation and logs

- Update the relevant docs and logs to reflect Phase 8
- Keep the roadmap in sync with the new phase order
- Update known issues only if something remains unresolved

## Validation

- Run `npm run lint`
- Run `npm run build`
- Run `git diff --check`
- Run the merge-conflict marker search across `docs`, `src`, and `supabase`
- Run `git ls-files .env.local`
- If local Supabase env vars are available, run a local smoke test for invite creation and acceptance

## Deliverable

- Commit and push the branch
- Do not merge into `main`
