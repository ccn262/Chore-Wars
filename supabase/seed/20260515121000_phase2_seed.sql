insert into public.chore_categories (id, category_key, default_name, icon_key, sort_order, is_seeded)
values
  ('00000000-0000-4000-8000-000000000101', 'kitchen', 'Kitchen', 'kitchen', 10, true),
  ('00000000-0000-4000-8000-000000000102', 'laundry', 'Laundry', 'laundry', 20, true),
  ('00000000-0000-4000-8000-000000000103', 'cleaning', 'Cleaning', 'sparkles', 30, true),
  ('00000000-0000-4000-8000-000000000104', 'bins-recycling', 'Bins & Recycling', 'recycle', 40, true),
  ('00000000-0000-4000-8000-000000000105', 'pets', 'Pets', 'paw-print', 50, true),
  ('00000000-0000-4000-8000-000000000106', 'outdoors', 'Outdoors', 'tree', 60, true),
  ('00000000-0000-4000-8000-000000000107', 'admin-household', 'Admin / Household', 'clipboard-list', 70, true),
  ('00000000-0000-4000-8000-000000000108', 'other', 'Other', 'ellipsis', 80, true)
on conflict (category_key) do update set
  default_name = excluded.default_name,
  icon_key = excluded.icon_key,
  sort_order = excluded.sort_order,
  is_seeded = excluded.is_seeded;

insert into public.chore_templates (
  id,
  category_id,
  template_key,
  default_title,
  icon_key,
  suggested_points,
  suggested_cadence,
  sort_order,
  is_seeded
)
values
  ('00000000-0000-4000-8000-000000000201', '00000000-0000-4000-8000-000000000101', 'wash-up', 'Wash up', 'kitchen', 2, 'daily', 10, true),
  ('00000000-0000-4000-8000-000000000202', '00000000-0000-4000-8000-000000000101', 'empty-dishwasher', 'Empty dishwasher', 'dishwasher', 2, 'daily', 20, true),
  ('00000000-0000-4000-8000-000000000203', '00000000-0000-4000-8000-000000000104', 'put-bins-out', 'Put bins out', 'trash', 3, 'weekly', 30, true),
  ('00000000-0000-4000-8000-000000000204', '00000000-0000-4000-8000-000000000104', 'bring-bins-in', 'Bring bins in', 'trash-2', 2, 'weekly', 40, true),
  ('00000000-0000-4000-8000-000000000205', '00000000-0000-4000-8000-000000000102', 'put-laundry-on', 'Put laundry on', 'washer', 3, 'weekly', 50, true),
  ('00000000-0000-4000-8000-000000000206', '00000000-0000-4000-8000-000000000102', 'hang-laundry', 'Hang laundry', 'clothes-hanger', 2, 'weekly', 60, true),
  ('00000000-0000-4000-8000-000000000207', '00000000-0000-4000-8000-000000000102', 'fold-laundry', 'Fold laundry', 'fold', 2, 'weekly', 70, true),
  ('00000000-0000-4000-8000-000000000208', '00000000-0000-4000-8000-000000000103', 'vacuum', 'Vacuum', 'vacuum', 3, 'weekly', 80, true),
  ('00000000-0000-4000-8000-000000000209', '00000000-0000-4000-8000-000000000103', 'mop-floor', 'Mop floor', 'mop', 3, 'weekly', 90, true),
  ('00000000-0000-4000-8000-000000000210', '00000000-0000-4000-8000-000000000103', 'clean-bathroom', 'Clean bathroom', 'bath', 4, 'weekly', 100, true),
  ('00000000-0000-4000-8000-000000000211', '00000000-0000-4000-8000-000000000105', 'walk-dog', 'Walk dog', 'dog', 3, 'daily', 110, true),
  ('00000000-0000-4000-8000-000000000212', '00000000-0000-4000-8000-000000000105', 'feed-pet', 'Feed pet', 'bowl', 2, 'daily', 120, true),
  ('00000000-0000-4000-8000-000000000213', '00000000-0000-4000-8000-000000000103', 'tidy-living-room', 'Tidy living room', 'sofa', 2, 'daily', 130, true),
  ('00000000-0000-4000-8000-000000000214', '00000000-0000-4000-8000-000000000103', 'change-bedding', 'Change bedding', 'bed', 4, 'weekly', 140, true)
on conflict (template_key) do update set
  category_id = excluded.category_id,
  default_title = excluded.default_title,
  icon_key = excluded.icon_key,
  suggested_points = excluded.suggested_points,
  suggested_cadence = excluded.suggested_cadence,
  sort_order = excluded.sort_order,
  is_seeded = excluded.is_seeded;

insert into public.profiles (id, auth_user_id, email, display_name, avatar_url, locale, timezone)
values
  ('10000000-0000-4000-8000-000000000001', null, 'alex@example.com', 'Alex', null, 'en-GB', 'Europe/London'),
  ('10000000-0000-4000-8000-000000000002', null, 'sam@example.com', 'Sam', null, 'en-GB', 'Europe/London'),
  ('10000000-0000-4000-8000-000000000003', null, 'casey@example.com', 'Casey', null, 'en-GB', 'Europe/London'),
  ('10000000-0000-4000-8000-000000000004', null, 'quinn@example.com', 'Quinn', null, 'en-GB', 'Europe/London'),
  ('10000000-0000-4000-8000-000000000005', null, 'guest-roomie@example.com', 'Guest Roomie', null, 'en-GB', 'Europe/London')
on conflict (id) do update set
  auth_user_id = excluded.auth_user_id,
  email = excluded.email,
  display_name = excluded.display_name,
  avatar_url = excluded.avatar_url,
  locale = excluded.locale,
  timezone = excluded.timezone;

insert into public.households (id, name, created_by_profile_id, locale, timezone, status)
values
  ('20000000-0000-4000-8000-000000000001', 'The Example Flat', '10000000-0000-4000-8000-000000000001', 'en-GB', 'Europe/London', 'active'),
  ('20000000-0000-4000-8000-000000000002', 'The Example Family', '10000000-0000-4000-8000-000000000003', 'en-US', 'America/New_York', 'active')
on conflict (id) do update set
  name = excluded.name,
  created_by_profile_id = excluded.created_by_profile_id,
  locale = excluded.locale,
  timezone = excluded.timezone,
  status = excluded.status;

insert into public.household_members (id, household_id, profile_id, display_name, role, status)
values
  ('30000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000001', 'Alex', 'owner', 'active'),
  ('30000000-0000-4000-8000-000000000002', '20000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000002', 'Sam', 'admin', 'active'),
  ('30000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000005', 'Guest Roomie', 'member', 'active'),
  ('30000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000002', '10000000-0000-4000-8000-000000000003', 'Casey', 'owner', 'active'),
  ('30000000-0000-4000-8000-000000000005', '20000000-0000-4000-8000-000000000002', '10000000-0000-4000-8000-000000000004', 'Quinn', 'member', 'active')
on conflict (household_id, profile_id) do update set
  display_name = excluded.display_name,
  role = excluded.role,
  status = excluded.status,
  archived_at = null;

insert into public.household_invites (
  id,
  household_id,
  invited_by_member_id,
  invite_email,
  role,
  token,
  status,
  expires_at,
  accepted_at,
  accepted_by_profile_id
)
values
  ('40000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', '30000000-0000-4000-8000-000000000001', 'newroomie@example.com', 'member', 'invite-newroomie', 'pending', now() + interval '7 days', null, null),
  ('40000000-0000-4000-8000-000000000002', '20000000-0000-4000-8000-000000000002', '30000000-0000-4000-8000-000000000004', 'visitor@example.com', 'member', 'invite-visitor', 'pending', now() + interval '7 days', null, null)
on conflict (token) do update set
  status = excluded.status,
  accepted_at = excluded.accepted_at,
  accepted_by_profile_id = excluded.accepted_by_profile_id;

insert into public.chores (
  id,
  household_id,
  template_id,
  category_id,
  created_by_member_id,
  title,
  icon_key,
  points,
  cadence,
  source,
  status,
  archived_at,
  sort_order
)
values
  ('50000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000201', '00000000-0000-4000-8000-000000000101', '30000000-0000-4000-8000-000000000001', 'Wash up', 'kitchen', 2, 'daily', 'template', 'active', null, 10),
  ('50000000-0000-4000-8000-000000000002', '20000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000203', '00000000-0000-4000-8000-000000000104', '30000000-0000-4000-8000-000000000002', 'Put bins out', 'trash', 3, 'weekly', 'template', 'active', null, 20),
  ('50000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000001', null, '00000000-0000-4000-8000-000000000103', '30000000-0000-4000-8000-000000000001', 'Clean fridge shelf', 'sparkles', 4, 'weekly', 'custom', 'active', null, 30),
  ('50000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000002', '00000000-0000-4000-8000-000000000211', '00000000-0000-4000-8000-000000000105', '30000000-0000-4000-8000-000000000004', 'Walk dog', 'dog', 3, 'daily', 'template', 'active', null, 10)
on conflict (id) do update set
  household_id = excluded.household_id,
  template_id = excluded.template_id,
  category_id = excluded.category_id,
  created_by_member_id = excluded.created_by_member_id,
  title = excluded.title,
  icon_key = excluded.icon_key,
  points = excluded.points,
  cadence = excluded.cadence,
  source = excluded.source,
  status = excluded.status,
  archived_at = excluded.archived_at,
  sort_order = excluded.sort_order;

insert into public.chore_completions (
  id,
  household_id,
  chore_id,
  completed_by_member_id,
  points_awarded,
  completed_at,
  proof_url,
  notes
)
values
  ('60000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', '50000000-0000-4000-8000-000000000001', '30000000-0000-4000-8000-000000000001', 0, now() - interval '2 days', null, 'Starter demo completion'),
  ('60000000-0000-4000-8000-000000000002', '20000000-0000-4000-8000-000000000001', '50000000-0000-4000-8000-000000000002', '30000000-0000-4000-8000-000000000002', 0, now() - interval '1 day', null, 'Starter demo completion'),
  ('60000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000002', '50000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000004', 0, now() - interval '12 hours', null, 'Starter demo completion')
on conflict (id) do update set
  household_id = excluded.household_id,
  chore_id = excluded.chore_id,
  completed_by_member_id = excluded.completed_by_member_id,
  points_awarded = excluded.points_awarded,
  completed_at = excluded.completed_at,
  proof_url = excluded.proof_url,
  notes = excluded.notes;

insert into public.household_settings (
  household_id,
  locale,
  timezone,
  week_starts_on,
  allow_photo_proof
)
values
  ('20000000-0000-4000-8000-000000000001', 'en-GB', 'Europe/London', 1, true),
  ('20000000-0000-4000-8000-000000000002', 'en-US', 'America/New_York', 0, true)
on conflict (household_id) do update set
  locale = excluded.locale,
  timezone = excluded.timezone,
  week_starts_on = excluded.week_starts_on,
  allow_photo_proof = excluded.allow_photo_proof;

insert into public.audit_log (
  id,
  household_id,
  actor_profile_id,
  action,
  entity_type,
  entity_id,
  details
)
values
  ('70000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000001', 'seed_loaded', 'household', '20000000-0000-4000-8000-000000000001', jsonb_build_object('source', 'phase-2-seed')),
  ('70000000-0000-4000-8000-000000000002', '20000000-0000-4000-8000-000000000002', '10000000-0000-4000-8000-000000000003', 'seed_loaded', 'household', '20000000-0000-4000-8000-000000000002', jsonb_build_object('source', 'phase-2-seed'))
on conflict (id) do update set
  action = excluded.action,
  entity_type = excluded.entity_type,
  entity_id = excluded.entity_id,
  details = excluded.details;
