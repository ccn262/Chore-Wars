# RLS Plan

## Principle

Every household record must only be visible to authorised members.

## RLS goals

- Prevent cross-household data leaks
- Limit member access to relevant rows only
- Support safe reads for the current user
- Protect write paths for points and completions
- Keep invite acceptance and owner/admin actions tightly scoped

## Policy approach

- Start from least privilege
- Allow access through explicit membership checks
- Separate user-owned profiles from household-scoped data
- Allow only owners or admins to manage households, chores, members, and settings
- Allow members to create their own completions
- Let invitees accept their own pending invites by email match
- Review any service-role usage carefully
