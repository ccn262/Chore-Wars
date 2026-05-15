# Phase 5 - MVP usability, leaderboard, and polish

## Phase name

Phase 5 - MVP usability, leaderboard, and polish

## Objective

Make the existing MVP feel polished, clear, quick, fun, and mobile-native without expanding into major new feature areas. The product goal is simple: open app -> immediately understand household score -> tap chores quickly -> get clear feedback -> see who is winning -> understand what to do next.

## Why usability polish comes after the chore engine

- The core chore loop must exist before it can be refined
- Usability issues are easier to spot once real chore completion is working end to end
- Leaderboard clarity, feedback, and empty states depend on the actual data flow already in place
- This phase should improve the current loop, not replace it
- Polish work should reduce friction without introducing new product scope

## What Phase 5 includes

- Improve the mobile-first Home screen hierarchy
- Make quick chore buttons and cards clearer and more satisfying
- Improve the `/chores` screen layout and grouping
- Add or refine a simple leaderboard or member score display
- Improve recent activity readability
- Add better empty states for no chores, no activity, and no weekly scores
- Add better loading and error states
- Add duplicate-tap protection on chore completion buttons
- Add clear completion feedback such as success states, toasts, or lightweight messages
- Refine button labels, helper copy, and playful tone
- Improve visual hierarchy, spacing, and tap targets
- Add light celebratory polish if it stays simple and non-intrusive
- Keep reports basic and avoid advanced charts for now

## What Phase 5 excludes

- Advanced reporting dashboards
- Charts
- Achievements
- Streaks
- Rewards or forfeits
- Photo proof
- Resend invites or emails
- Payments or subscriptions
- Expo wrapper or App Store work
- Complex chore assignment or recurrence engine
- Push notifications
- Major database schema changes unless a tiny fix is essential

## Required routes to improve

- `/home`
- `/chores`
- `/leaderboard` or the existing simple score surface if that is the active route
- Any lightweight feedback or completion surface used by the chore flow
- Existing empty/loading/error presentation surfaces

## Required components to improve

- Home summary cards
- Quick chore cards and buttons
- Chore list cards
- Member score or leaderboard cards
- Activity feed items
- Empty state cards
- Loading skeletons
- Error states
- Completion feedback component or pattern
- Duplicate-tap disabled state pattern

## Home screen polish plan

- Keep Home as the hero interaction surface
- Make the household score and current winner instantly visible
- Surface the most actionable chores first
- Reduce visual noise around quick completion actions
- Use cards, badges, and short helper text to guide the user
- Preserve large tap targets and one-handed use

## Chores screen polish plan

- Group chores clearly by status or type
- Make active chores and templates easy to distinguish
- Reduce scanning effort with simpler hierarchy and spacing
- Keep creation and completion actions obvious
- Ensure the screen still feels app-like rather than administrative

## Simple leaderboard plan

- Show a lightweight member score summary that is easy to understand on a phone
- Keep the view simple enough to scan in one glance
- Make clear who is leading without overexplaining
- Avoid heavy ranking systems or deep stats

## Completion feedback plan

- Confirm completion immediately with lightweight feedback
- Show a clear success state after tap-to-complete
- Keep feedback playful but not intrusive
- Avoid blocking modals unless a real failure needs attention
- Make duplicate taps difficult during the in-flight action state

## Duplicate-tap protection plan

- Disable completion controls while a write is in progress
- Prevent double submissions from rapid taps
- Keep the disabled state visible enough to explain what happened
- Re-enable controls cleanly after success or error

## Empty/loading/error state plan

- Provide helpful empty states for no chores, no activity, and no scores
- Make loading states feel intentional but lightweight
- Keep errors concise, specific, and recoverable
- Avoid technical jargon in user-facing fallback states

## Mobile-first layout refinements

- Preserve bottom-navigation-first navigation
- Keep the layout thumb-friendly and full-height
- Use large rounded cards and buttons
- Avoid dense tables or desktop-style panels
- Prioritise fast scanning and obvious touch targets

## Friendly copy and tone plan

- Keep copy short, playful, and polished
- Use helpful hints instead of long explanations
- Avoid childish or sarcastic language
- Keep strings future i18n-friendly and easy to translate

## Accessibility considerations

- Maintain readable contrast
- Keep tap targets large
- Preserve visible disabled and loading states
- Use semantic labels for score and completion controls
- Keep motion subtle and non-blocking

## RLS and security considerations

- Preserve the existing household-scoped access model
- Keep chore completion and score reads household-scoped
- Do not add client-side service-role usage
- Keep duplicate-tap handling in the UI and server flow, not through looser permissions
- Avoid introducing any new secret handling patterns

## Validation plan

- Confirm the Home screen is clearer and still fast to use
- Confirm the Chores screen remains easy to scan on a phone
- Confirm quick completion still works with one tap
- Confirm duplicate-tap protection prevents double writes
- Confirm empty, loading, and error states are useful
- Run lint and build checks after implementation
- Update logs after meaningful changes

## Runtime smoke-test plan

- Open the app on a local runtime
- Confirm the Home screen shows the score and next action clearly
- Confirm `/chores` is easy to scan and act on
- Confirm one-tap chore completion still works
- Confirm completion feedback appears immediately
- Confirm duplicate taps do not create duplicate completion writes
- Confirm recent activity and simple score feedback remain visible
- Confirm sign-out still works

## Acceptance criteria

- The MVP feels more polished without becoming more complex
- Users can quickly understand their household score and next action
- Chore completion remains one quick tap
- Duplicate taps are controlled safely
- Empty and loading states help rather than confuse
- The interface remains mobile-first, clean, and uncluttered

## Risks and constraints

- Over-polishing could distract from the core chore loop
- Adding too much feedback could slow the main action
- Leaderboard clarity should stay simple rather than becoming a reporting feature
- Duplicate-tap protection must not create confusing disabled states
- UI improvements must not drift into desktop-style dashboards

## Follow-up phases

- Phase 6: reminders and retention
- Phase 7: rewards, forfeits, and lightweight gamification
- Phase 8: deeper reporting and visual summaries
- Phase 9: native wrapper and store-readiness work
