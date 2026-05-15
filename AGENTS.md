# Codex Guidance for Chore Wars

This file is the operating guide for Codex and collaborators working in this repo.

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

