# Codex Guidance for Chore Wars

This file is the operating guide for Codex and collaborators working in this repo.

## Non-negotiable rules

- Codex must read `AGENTS.md` before every task
- Codex must check relevant docs before changing files
- Work in small, scoped tasks only
- Do not create implementation files unless explicitly asked
- Do not perform broad rewrites unless requested
- Mobile-first is non-negotiable
- The app should feel like a phone app, not a desktop website
- Desktop is secondary
- Design for thumb-first interactions
- The home screen is the core product surface
- A user should be able to open the app, tap a chore, and receive points within 3 seconds
- UI must be minimal, clear, colourful, uncluttered, and app-like
- Use quick press button selections for chores
- Avoid dense dashboards, desktop tables, admin-heavy layouts, and unnecessary friction
- Reporting must be smart, visual, colourful, card-based, and easy to understand
- The app tone is friendly, funny, and playful, but still professional and polished
- The app is a game-like household fairness tool, not a corporate task manager
- Design for families, couples, flatmates, shared homes, and international users
- Build internationalisation readiness from the start
- Avoid hardcoded user-facing text where practical
- Avoid hardcoded currency assumptions
- Use locale-aware dates and times
- Keep auth users separate from household members
- Use a points ledger for scoring
- Keep scoring logic centralised and auditable
- Use Supabase Row Level Security from the start
- Keep logs updated after meaningful changes
- Update decision, change, fix, and handoff logs when relevant

## Working rules

- Treat this as a planning-first repository until implementation is explicitly requested
- Do not add app code unless the task specifically asks for code
- Prefer small, reviewable changes that preserve the current structure
- Keep content mobile-first, thumb-first, and easy to scan on a phone
- Keep language international-ready and avoid assumptions about locale, currency, or naming
- Prefer clear docs over speculative implementation details

## Product rules

- Home screen is the hero screen
- The primary action should be fast enough to complete in seconds
- Chore completion and points awarding should feel immediate and playful
- Reporting should be visual and card-based, not spreadsheet-like
- The experience should work well for families, couples, flatmates, and shared homes

## UI rules

- Design for one-handed use
- Keep tap targets large and spacing generous
- Avoid crowded layouts and dense navigation
- Favor cards, chips, counters, progress, and simple summaries
- Use humour lightly; keep the product polished and trustworthy

## Data and localisation rules

- Avoid hardcoded user-facing text where possible
- Avoid hardcoded currency assumptions
- Use locale-aware dates and times
- Plan for translated content and regional differences early

## Engineering rules

- Next.js is the web front end
- Supabase is the initial backend and database layer
- Vercel is the initial deployment target
- Resend is the initial email provider
- GitHub is the source control and review system
- Porkbun is the domain registrar
- Expo is a later wrapper option for native app distribution

## When editing docs

- Keep each document focused on a single topic
- Write actionable guidance, not marketing fluff
- Prefer checklists, rules, and simple examples over long essays
- Update related log files when making meaningful decisions

## Suggested Codex workflow

1. Read the relevant docs first
2. Confirm the user request and its constraints
3. Make the smallest safe change
4. Update logs or handoff notes when the change matters
5. Summarise assumptions clearly at the end
