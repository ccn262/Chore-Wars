# Chore Wars

Chore Wars is a mobile-first household chore competition app for families, couples, flatmates, and shared homes.

## Current stage

- Phase 1 scaffold is in place
- Planning docs remain the source of truth
- App implementation is foundation-only so far

## What this repo is for

- Product and implementation planning
- Mobile-first app foundation
- Thumb-first interactions
- International-ready copy, dates, time, and currency handling

## Core product rules

- The home screen is the hero screen
- A user should open the app, tap a chore, and get points within 3 seconds
- Keep the UI minimal, clear, colourful, and uncluttered
- Make reporting visual, card-based, and easy to scan
- Avoid desktop-style dashboards and dense tables in the main experience
- Write user-facing text to support internationalisation from day one

## Initial stack

- Next.js
- TypeScript
- Tailwind CSS
- Supabase
- Vercel
- Resend
- GitHub
- Porkbun domain
- Expo later for an App Store wrapper

## Repo map

- `docs/product/` product direction and scope
- `docs/architecture/` technical shape and boundaries
- `docs/ui/` design and interaction rules
- `docs/database/` schema and data governance
- `docs/engineering/` build and delivery rules
- `docs/market/` positioning and go-to-market notes
- `docs/prompts/` reusable Codex task prompts
- `docs/build/` implementation blueprints and next-task prompts
- `docs/logs/` decision and change tracking
- `docs/operations/` service setup and release flow
- `supabase/` database migrations, functions, and policies
- `emails/` email templates later
- `public/` static assets later
- `tests/` test fixtures and future automated checks

## Phase 1 scaffold

- App Router routes for landing, auth, setup, and dashboard placeholders
- Mobile-first shell with bottom navigation
- Reusable UI primitives for later features
- Supabase placeholders without real auth or data logic

