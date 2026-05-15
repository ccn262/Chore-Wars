create or replace function public.complete_chore_atomically(target_chore_id uuid)
returns table (
  status text,
  completion_id uuid,
  chore_id uuid,
  household_id uuid,
  household_member_id uuid,
  points_awarded integer,
  completed_at timestamptz,
  chore_title text
)
language plpgsql
security definer
set search_path = public
as $$
declare
  viewer_profile_id uuid;
  target_member_id uuid;
  target_household_id uuid;
  target_points integer;
  target_title text;
  recent_completion public.chore_completions%rowtype;
  completion_window interval := interval '10 seconds';
begin
  viewer_profile_id := public.current_profile_id();

  if viewer_profile_id is null then
    raise exception 'sign in to complete chores';
  end if;

  select hm.id, hm.household_id
  into target_member_id, target_household_id
  from public.household_members hm
  where hm.profile_id = viewer_profile_id
    and hm.status = 'active'
    and hm.archived_at is null
  order by hm.joined_at asc
  limit 1;

  if target_member_id is null then
    raise exception 'join a household before completing chores';
  end if;

  select c.title, c.points
  into target_title, target_points
  from public.chores c
  where c.id = target_chore_id
    and c.household_id = target_household_id
    and c.status = 'active'
    and c.archived_at is null
  limit 1;

  if target_points is null then
    raise exception 'that chore is not available';
  end if;

  perform pg_advisory_xact_lock(
    hashtext(target_household_id::text),
    hashtext(target_member_id::text || ':' || target_chore_id::text)
  );

  select cc.*
  into recent_completion
  from public.chore_completions cc
  where cc.household_id = target_household_id
    and cc.chore_id = target_chore_id
    and cc.completed_by_member_id = target_member_id
  order by cc.completed_at desc
  limit 1;

  if recent_completion.id is not null
     and recent_completion.completed_at > now() - completion_window then
    status := 'already_completed';
    completion_id := recent_completion.id;
    chore_id := recent_completion.chore_id;
    household_id := recent_completion.household_id;
    household_member_id := recent_completion.completed_by_member_id;
    points_awarded := recent_completion.points_awarded;
    completed_at := recent_completion.completed_at;
    chore_title := target_title;
    return next;
    return;
  end if;

  insert into public.chore_completions as cc (
    household_id,
    chore_id,
    completed_by_member_id,
    points_awarded
  )
  values (
    target_household_id,
    target_chore_id,
    target_member_id,
    target_points
  )
  returning
    cc.id,
    cc.chore_id,
    cc.household_id,
    cc.completed_by_member_id,
    cc.points_awarded,
    cc.completed_at
  into
    completion_id,
    chore_id,
    household_id,
    household_member_id,
    points_awarded,
    completed_at;

  status := 'inserted';
  chore_title := target_title;
  return next;
end;
$$;
