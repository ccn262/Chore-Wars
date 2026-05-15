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
