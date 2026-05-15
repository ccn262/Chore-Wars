create extension if not exists pgcrypto;
create extension if not exists citext;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique,
  email citext unique,
  display_name text not null,
  avatar_url text,
  locale text,
  timezone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.households (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_by_profile_id uuid not null references public.profiles(id) on delete restrict,
  locale text,
  timezone text,
  status text not null default 'active' check (status in ('active', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.household_members (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete set null,
  display_name text not null,
  role text not null default 'member' check (role in ('owner', 'admin', 'member')),
  status text not null default 'active' check (status in ('active', 'archived')),
  joined_at timestamptz not null default now(),
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (household_id, profile_id)
);

create table if not exists public.household_invites (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  invited_by_member_id uuid references public.household_members(id) on delete set null,
  invite_email citext not null,
  role text not null default 'member' check (role in ('owner', 'admin', 'member')),
  token text not null unique,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'revoked', 'expired')),
  expires_at timestamptz not null,
  accepted_at timestamptz,
  accepted_by_profile_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.chore_categories (
  id uuid primary key default gen_random_uuid(),
  category_key text not null unique,
  default_name text not null,
  icon_key text not null,
  sort_order integer not null default 0,
  is_seeded boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.chore_templates (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.chore_categories(id) on delete set null,
  template_key text not null unique,
  default_title text not null,
  icon_key text not null,
  suggested_points integer not null default 1 check (suggested_points > 0),
  suggested_cadence text,
  sort_order integer not null default 0,
  is_seeded boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.chores (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  template_id uuid references public.chore_templates(id) on delete set null,
  category_id uuid references public.chore_categories(id) on delete set null,
  created_by_member_id uuid references public.household_members(id) on delete set null,
  title text not null,
  icon_key text not null,
  points integer not null default 1 check (points > 0),
  cadence text,
  source text not null default 'custom' check (source in ('custom', 'template')),
  status text not null default 'active' check (status in ('active', 'archived')),
  archived_at timestamptz,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.chore_completions (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  chore_id uuid not null references public.chores(id) on delete cascade,
  completed_by_member_id uuid not null references public.household_members(id) on delete restrict,
  points_awarded integer not null default 0 check (points_awarded >= 0),
  completed_at timestamptz not null default now(),
  proof_url text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.points_ledger (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  household_member_id uuid not null references public.household_members(id) on delete cascade,
  chore_completion_id uuid references public.chore_completions(id) on delete set null,
  entry_type text not null check (entry_type in ('completion', 'adjustment', 'seed')),
  points_delta integer not null,
  reason text,
  metadata jsonb not null default '{}'::jsonb,
  created_by_profile_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create unique index if not exists points_ledger_chore_completion_id_key
  on public.points_ledger (chore_completion_id)
  where chore_completion_id is not null;

create table if not exists public.household_settings (
  household_id uuid primary key references public.households(id) on delete cascade,
  locale text,
  timezone text,
  week_starts_on integer check (week_starts_on between 0 and 6),
  allow_photo_proof boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  household_id uuid references public.households(id) on delete cascade,
  actor_profile_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists households_created_by_profile_id_idx
  on public.households (created_by_profile_id);

create index if not exists household_members_household_id_idx
  on public.household_members (household_id);

create index if not exists household_members_profile_id_idx
  on public.household_members (profile_id);

create index if not exists household_members_household_role_idx
  on public.household_members (household_id, role);

create index if not exists household_invites_household_id_idx
  on public.household_invites (household_id);

create unique index if not exists household_invites_pending_unique_idx
  on public.household_invites (household_id, invite_email)
  where status = 'pending';

create index if not exists chore_categories_sort_order_idx
  on public.chore_categories (sort_order);

create index if not exists chore_templates_category_id_idx
  on public.chore_templates (category_id);

create index if not exists chore_templates_sort_order_idx
  on public.chore_templates (sort_order);

create index if not exists chores_household_id_idx
  on public.chores (household_id);

create index if not exists chores_status_idx
  on public.chores (status);

create index if not exists chores_sort_order_idx
  on public.chores (household_id, sort_order);

create index if not exists chore_completions_household_id_idx
  on public.chore_completions (household_id);

create index if not exists chore_completions_completed_by_member_id_idx
  on public.chore_completions (completed_by_member_id);

create index if not exists chore_completions_completed_at_idx
  on public.chore_completions (completed_at desc);

create index if not exists points_ledger_household_id_idx
  on public.points_ledger (household_id);

create index if not exists points_ledger_household_member_id_idx
  on public.points_ledger (household_member_id);

create index if not exists points_ledger_created_at_idx
  on public.points_ledger (created_at desc);

create index if not exists audit_log_household_id_idx
  on public.audit_log (household_id);

create index if not exists audit_log_created_at_idx
  on public.audit_log (created_at desc);

create or replace function public.current_profile_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select p.id
  from public.profiles p
  where p.auth_user_id = auth.uid()
  limit 1;
$$;

create or replace function public.is_household_member(target_household_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.household_members hm
    where hm.household_id = target_household_id
      and hm.profile_id = public.current_profile_id()
      and hm.status = 'active'
      and hm.archived_at is null
  );
$$;

create or replace function public.is_household_admin(target_household_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.household_members hm
    where hm.household_id = target_household_id
      and hm.profile_id = public.current_profile_id()
      and hm.status = 'active'
      and hm.archived_at is null
      and hm.role in ('owner', 'admin')
  );
$$;

create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger set_households_updated_at
before update on public.households
for each row execute function public.set_updated_at();

create trigger set_household_members_updated_at
before update on public.household_members
for each row execute function public.set_updated_at();

create trigger set_household_invites_updated_at
before update on public.household_invites
for each row execute function public.set_updated_at();

create trigger set_chore_categories_updated_at
before update on public.chore_categories
for each row execute function public.set_updated_at();

create trigger set_chore_templates_updated_at
before update on public.chore_templates
for each row execute function public.set_updated_at();

create trigger set_chores_updated_at
before update on public.chores
for each row execute function public.set_updated_at();

create trigger set_household_settings_updated_at
before update on public.household_settings
for each row execute function public.set_updated_at();

create or replace function public.create_owner_member_for_household()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  owner_name text;
begin
  select p.display_name
  into owner_name
  from public.profiles p
  where p.id = new.created_by_profile_id;

  insert into public.household_members (
    household_id,
    profile_id,
    display_name,
    role,
    status
  )
  values (
    new.id,
    new.created_by_profile_id,
    owner_name,
    'owner',
    'active'
  )
  on conflict (household_id, profile_id)
  do update set
    display_name = excluded.display_name,
    role = 'owner',
    status = 'active',
    archived_at = null,
    updated_at = now();

  return new;
end;
$$;

create trigger create_owner_member_after_household_insert
after insert on public.households
for each row execute function public.create_owner_member_for_household();

create or replace function public.accept_household_invite()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  accepted_name text;
begin
  if new.status = 'accepted'
     and old.status = 'pending'
     and new.accepted_by_profile_id is not null then
    select p.display_name
    into accepted_name
    from public.profiles p
    where p.id = new.accepted_by_profile_id;

    insert into public.household_members (
      household_id,
      profile_id,
      display_name,
      role,
      status
    )
    values (
      new.household_id,
      new.accepted_by_profile_id,
      accepted_name,
      new.role,
      'active'
    )
    on conflict (household_id, profile_id)
    do update set
      display_name = excluded.display_name,
      role = excluded.role,
      status = 'active',
      archived_at = null,
      updated_at = now();
  end if;

  return new;
end;
$$;

create trigger accept_household_invite_after_update
after update on public.household_invites
for each row execute function public.accept_household_invite();

create or replace function public.validate_completion_context()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  chore_points integer;
begin
  select c.points
  into chore_points
  from public.chores c
  where c.id = new.chore_id
    and c.household_id = new.household_id
    and c.status = 'active';

  if chore_points is null then
    raise exception 'completion must reference an active chore in the same household';
  end if;

  if not exists (
    select 1
    from public.household_members hm
    where hm.id = new.completed_by_member_id
      and hm.household_id = new.household_id
      and hm.status = 'active'
      and hm.archived_at is null
  ) then
    raise exception 'completion must reference an active household member in the same household';
  end if;

  new.points_awarded := chore_points;
  return new;
end;
$$;

create trigger validate_completion_context_before_insert
before insert on public.chore_completions
for each row execute function public.validate_completion_context();

create or replace function public.apply_completion_points()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  completion_reason text;
begin
  select c.title
  into completion_reason
  from public.chores c
  where c.id = new.chore_id;

  insert into public.points_ledger (
    household_id,
    household_member_id,
    chore_completion_id,
    entry_type,
    points_delta,
    reason,
    metadata,
    created_by_profile_id
  )
  values (
    new.household_id,
    new.completed_by_member_id,
    new.id,
    'completion',
    new.points_awarded,
    coalesce(completion_reason, 'Chore completion'),
    jsonb_build_object(
      'chore_id', new.chore_id,
      'completed_at', new.completed_at
    ),
    (select profile_id from public.household_members where id = new.completed_by_member_id)
  );

  return new;
end;
$$;

create trigger apply_completion_points_after_insert
after insert on public.chore_completions
for each row execute function public.apply_completion_points();

alter table public.profiles enable row level security;
alter table public.households enable row level security;
alter table public.household_members enable row level security;
alter table public.household_invites enable row level security;
alter table public.chore_categories enable row level security;
alter table public.chore_templates enable row level security;
alter table public.chores enable row level security;
alter table public.chore_completions enable row level security;
alter table public.points_ledger enable row level security;
alter table public.household_settings enable row level security;
alter table public.audit_log enable row level security;

create policy profiles_select_own
on public.profiles
for select
using (auth_user_id = auth.uid());

create policy profiles_insert_own
on public.profiles
for insert
with check (auth_user_id = auth.uid());

create policy profiles_update_own
on public.profiles
for update
using (auth_user_id = auth.uid())
with check (auth_user_id = auth.uid());

create policy households_select_member
on public.households
for select
using (public.is_household_member(id));

create policy households_insert_own
on public.households
for insert
with check (created_by_profile_id = public.current_profile_id());

create policy households_update_admin
on public.households
for update
using (public.is_household_admin(id))
with check (public.is_household_admin(id));

create policy household_members_select_member
on public.household_members
for select
using (public.is_household_member(household_id));

create policy household_members_insert_admin
on public.household_members
for insert
with check (public.is_household_admin(household_id));

create policy household_members_update_admin
on public.household_members
for update
using (public.is_household_admin(household_id))
with check (public.is_household_admin(household_id));

create policy household_members_delete_admin
on public.household_members
for delete
using (public.is_household_admin(household_id));

create policy household_invites_select_member_or_invitee
on public.household_invites
for select
using (
  public.is_household_member(household_id)
  or lower(invite_email::text) = lower(coalesce((select email::text from public.profiles where id = public.current_profile_id()), ''))
);

create policy household_invites_insert_admin
on public.household_invites
for insert
with check (public.is_household_admin(household_id));

create policy household_invites_update_admin
on public.household_invites
for update
using (public.is_household_admin(household_id))
with check (public.is_household_admin(household_id));

create policy household_invites_update_invitee_accept
on public.household_invites
for update
using (
  status = 'pending'
  and lower(invite_email::text) = lower(coalesce((select email::text from public.profiles where id = public.current_profile_id()), ''))
)
with check (
  status = 'accepted'
  and accepted_by_profile_id = public.current_profile_id()
);

create policy household_invites_delete_admin
on public.household_invites
for delete
using (public.is_household_admin(household_id));

create policy chore_categories_select_authenticated
on public.chore_categories
for select
using (auth.uid() is not null);

create policy chore_templates_select_authenticated
on public.chore_templates
for select
using (auth.uid() is not null);

create policy chores_select_member
on public.chores
for select
using (public.is_household_member(household_id));

create policy chores_insert_admin
on public.chores
for insert
with check (public.is_household_admin(household_id));

create policy chores_update_admin
on public.chores
for update
using (public.is_household_admin(household_id))
with check (public.is_household_admin(household_id));

create policy chores_delete_admin
on public.chores
for delete
using (public.is_household_admin(household_id));

create policy chore_completions_select_member
on public.chore_completions
for select
using (public.is_household_member(household_id));

create policy chore_completions_insert_self
on public.chore_completions
for insert
with check (
  public.is_household_member(household_id)
  and completed_by_member_id in (
    select hm.id
    from public.household_members hm
    where hm.household_id = household_id
      and hm.profile_id = public.current_profile_id()
      and hm.status = 'active'
      and hm.archived_at is null
  )
);

create policy points_ledger_select_member
on public.points_ledger
for select
using (public.is_household_member(household_id));

create policy household_settings_select_member
on public.household_settings
for select
using (public.is_household_member(household_id));

create policy household_settings_insert_admin
on public.household_settings
for insert
with check (public.is_household_admin(household_id));

create policy household_settings_update_admin
on public.household_settings
for update
using (public.is_household_admin(household_id))
with check (public.is_household_admin(household_id));

create policy household_settings_delete_admin
on public.household_settings
for delete
using (public.is_household_admin(household_id));

create policy audit_log_select_admin
on public.audit_log
for select
using (coalesce(public.is_household_admin(household_id), false));
