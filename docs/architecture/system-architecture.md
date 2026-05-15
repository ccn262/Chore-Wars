# System Architecture

## High-level shape

- Next.js provides the web application and initial UI
- Supabase provides authentication, database, and backend primitives
- Vercel hosts the web app and related server features
- Resend handles email delivery
- GitHub stores code, docs, and review history
- Porkbun manages the primary domain
- Expo is reserved for a later native wrapper path

## Architecture goals

- Keep the first product loop extremely fast
- Minimise moving parts in the early phase
- Make shared-home data models explicit
- Keep localisation and currency concerns central, not bolted on

## Core system boundaries

- UI should stay thin and depend on documented data contracts
- Database rules should live in schema, migrations, and policies
- Business logic should not be scattered across the UI
- External services should be isolated behind integration points

