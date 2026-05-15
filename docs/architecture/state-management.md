# State Management

## State categories

- **Local UI state**: sheet open/closed, selected tab, loading flags
- **Session state**: signed-in user, active household, locale
- **Server state**: chores, points, progress, histories, settings
- **Optimistic state**: immediate completion feedback before the server round-trip resolves

## Guidance

- Keep transient UI state close to the component that needs it
- Keep shared server state in a predictable data layer
- Optimistically update the main chore flow where safe
- Persist only meaningful state to the database

## Mobile-first rule

State transitions should feel instant and should not force the user through unnecessary screens.

