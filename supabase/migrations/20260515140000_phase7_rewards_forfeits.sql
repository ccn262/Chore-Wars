alter table public.household_settings
  add column if not exists winner_reward_text text,
  add column if not exists bottom_forfeit_text text;
