# RLS Plan

## Principle

Every household record must only be visible to authorised members.

## RLS goals

- Prevent cross-household data leaks
- Limit member access to relevant rows only
- Support safe reads for the current user
- Protect write paths for points and completions

## Policy approach

- Start from least privilege
- Allow access through explicit membership checks
- Separate user-owned settings from household-scoped data
- Review any service-role usage carefully

