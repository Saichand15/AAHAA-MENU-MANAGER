-- Run once in the Supabase SQL editor. Create manager accounts in Authentication
-- first, then approve their user UUIDs as described in README.md.
begin;
create table if not exists public.menu_managers (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.menu_managers enable row level security;
create policy "Managers can check their approval" on public.menu_managers
  for select to authenticated using (user_id = auth.uid());

create table if not exists public.shared_menu (
  id text primary key check (id = 'main'),
  document jsonb not null check (document->>'version' = '2'),
  revision bigint not null check (revision > 0),
  updated_at timestamptz not null default now(),
  updated_by uuid not null references auth.users(id)
);
alter table public.shared_menu enable row level security;
create policy "Approved managers can read menu" on public.shared_menu
  for select to authenticated using (
    exists (select 1 from public.menu_managers where user_id = auth.uid())
  );
create policy "Approved managers can create menu" on public.shared_menu
  for insert to authenticated with check (
    exists (select 1 from public.menu_managers where user_id = auth.uid())
    and updated_by = auth.uid()
  );
create policy "Approved managers can update menu" on public.shared_menu
  for update to authenticated using (
    exists (select 1 from public.menu_managers where user_id = auth.uid())
  ) with check (
    exists (select 1 from public.menu_managers where user_id = auth.uid())
    and updated_by = auth.uid()
  );

-- Clients may read, but all writes go through the revision-checked function.
grant select on public.menu_managers, public.shared_menu to authenticated;
revoke all on public.menu_managers, public.shared_menu from anon;
revoke insert, update, delete on public.menu_managers from authenticated;
revoke insert, update, delete on public.shared_menu from authenticated;

create or replace function public.save_shared_menu(expected_revision bigint, menu_document jsonb)
returns setof public.shared_menu
language plpgsql security definer set search_path = ''
as $$
declare current_revision bigint;
begin
  if auth.uid() is null or not exists (
    select 1 from public.menu_managers where user_id = auth.uid()
  ) then
    raise exception 'Manager approval required' using errcode = '42501';
  end if;
  if expected_revision is null or expected_revision < 0
    or menu_document is null or menu_document->>'version' is distinct from '2'
    or jsonb_typeof(menu_document->'sections') is distinct from 'array'
    or jsonb_typeof(menu_document->'pages') is distinct from 'array'
    or octet_length(menu_document::text) > 2000000 then
    raise exception 'Invalid menu document' using errcode = '22023';
  end if;
  perform pg_catalog.pg_advisory_xact_lock(71420983);
  select revision into current_revision from public.shared_menu where id = 'main';
  if coalesce(current_revision, 0) <> expected_revision then
    raise exception 'Another manager saved a newer menu. Load the shared menu before saving.'
      using errcode = '40001';
  end if;
  return query
    insert into public.shared_menu (id, document, revision, updated_by)
    values ('main', menu_document, 1, auth.uid())
    on conflict (id) do update set document = excluded.document,
      revision = public.shared_menu.revision + 1,
      updated_at = now(), updated_by = auth.uid()
    returning *;
end;
$$;
revoke all on function public.save_shared_menu(bigint, jsonb) from public, anon;
grant execute on function public.save_shared_menu(bigint, jsonb) to authenticated;
commit;
