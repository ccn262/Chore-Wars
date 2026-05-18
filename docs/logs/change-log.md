# Change Log

Record visible project changes and notable doc updates here.

## Entries

- Initial planning scaffold created
- GitHub repo added
- Repo readiness cleanup completed
- Phase 1 implementation blueprint created
- Phase 1 app foundation scaffolded and validated
- Phase 1 route structure reviewed and confirmed
- Phase 2 database implementation blueprint created
- Phase 2 Codex prompt created
- Phase 2 database migration and seed files created
- Phase 2 database docs updated for implemented schema
- Phase 3 auth and household onboarding blueprint created
- Phase 3 Codex prompt created
- Phase 3 auth and household onboarding foundation implemented
- Phase 3 auth foundation review completed
- Phase 3 Supabase server cookie safety hardened
- Phase 3 runtime smoke test completed
- Phase 3 household creation helper updated to avoid RLS select failures on insert
- Phase 4 chore engine blueprint created
- Phase 4 Codex prompt created
- Phase 4 chore engine foundation implemented and smoke-tested
- Phase 4 profile bootstrap race fixed during runtime validation
- Phase 4 chore engine foundation reviewed and hardened
- Phase 5 usability and polish blueprint created
- Phase 5 Codex prompt created
- Phase 5 usability polish implemented and smoke-tested
- Phase 5 usability polish review completed with no code changes required
- Phase 5 runtime smoke retest was limited by Supabase email rate limiting in the local auth flow
- Phase 5 atomic chore completion migration created and applied
- Phase 5 duplicate-tap protection updated to use a database-backed atomic RPC
- App Store readiness phase added to roadmap and docs
- Phase 6 production readiness blueprint created
- Phase 6 Codex prompt created
- Phase 6 draft privacy, terms, support, and account deletion pages implemented
- Phase 6 draft legal/support pages smoke-tested locally
- Phase 6 support contact placeholder and auth-page public links added
- Phase 6 production readiness foundation implementation updated and validated locally
- Hosted chore visibility and weekly leaderboard smoke issues fixed
- Hosted MVP readiness checkpoint recorded
- Phase 6 deployed and verified
- Vercel hosted app confirmed working for early testing
- Legal/support placeholder routes confirmed live
- Phase 7 rewards and forfeits blueprint created
- Phase 7 Codex prompt created
- Phase 7 rewards and forfeits implementation started
- Phase 7 household settings rule text columns added
- Phase 7 weekly winner and bottom-place summary cards added
- Phase 7 rewards and forfeits smoke test passed locally
- Phase 8 household invites blueprint created
- Phase 8 Codex prompt created
- Phase 8 household invites implementation completed and smoke-tested
- Phase 8 invite-link flow and member join trigger validated locally
- Phase 9 real household beta polish blueprint created
- Phase 9 Codex prompt created
- Phase 9 real household beta polish implementation started
- Phase 9 household member roster and archive flow added
- Phase 9 real household beta polish implementation completed and smoke-tested
- Phase 9 first-run guidance and invite copy refinements verified
- Invite auth return token fix implemented and validated locally
- Invite sign-up verification-state fix implemented and validated locally
- Invite sign-up display name now survives confirmation-required flows through auth metadata
- Invite confirmation return flow now preserves invite intent across email confirmation and callback redirects
- Invite management now includes cancel/revoke controls for pending invites and clearer duplicate-invite guidance
- Invite token page now renders dynamically so revoked invite status is not served from stale route cache
- Phase 9B household admin controls blueprint created
- Phase 9B Codex prompt created
- Added retention, insights, and trends strategy

## Entry format

- Date
- Change
- Area
- Notes

## Hosted smoke fix note

- Issue: Custom chores could fall out of the Home quick-actions set even when they were active
- Fix: Home quick actions now prefer active custom chores first and keep the full chores list intact on the Chores page
- Repeat-completion rule: the atomic duplicate-tap guard only blocks rapid accidental repeats; later legitimate completions are still allowed
- Verification: local smoke test passed with one custom chore plus four starter chores, immediate duplicate completion was blocked, and repeat completion succeeded again after the short window
