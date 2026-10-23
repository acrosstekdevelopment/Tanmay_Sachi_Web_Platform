-- 0001 Foundation: extensions, the app schema, staff roles, shared helpers and
-- the public-access lockout (TDD v2.0 §7.1, §7.2, §7.4).
--
-- Forward-only. Never edit a migration that has been applied; add a new one.

-- gen_random_uuid() is built into PostgreSQL 13+, so no extension is needed.

-- Private schema for helpers and privileged functions. Not exposed over the
-- Data API, and the anonymous role cannot use it.
create schema if not exists app;
revoke all on schema app from public, anon;
grant usage on schema app to authenticated, service_role;

-- Public access lockout (§7.2): the anonymous role has no permission on any
-- base table. Published content is read only through the *_public views,
-- which are granted one by one in 0007. Revoked, not merely filtered.
revoke all on all tables in schema public from anon;
revoke all on all sequences in schema public from anon;
alter default privileges in schema public revoke all on tables from anon;
alter default privileges in schema public revoke all on sequences from anon;
alter default privileges in schema public revoke all on functions from anon;

-- Staff ------------------------------------------------------------------

-- Two roles in Phase 1 (§7.5). Approval gates arrive in Phase 2.
create type public.staff_role as enum ('administrator', 'editor');

-- The locales the site publishes. Content rows carry one translation per locale.
create type public.locale as enum ('en', 'hi');

-- Per-language state of a translation (§7.1).
create type public.translation_status as enum ('draft', 'reviewed', 'published');

create table public.admin_users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  display_name text not null,
  role public.staff_role not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- The signed-in person's staff role, or null for anyone who is not active staff.
-- security definer so policies can call it without granting reads on admin_users.
create function app.staff_role() returns public.staff_role
language sql stable security definer set search_path = '' as $$
  select u.role from public.admin_users u where u.id = auth.uid() and u.is_active
$$;

create function app.is_staff() returns boolean
language sql stable set search_path = '' as $$
  select app.staff_role() is not null
$$;

create function app.is_admin() returns boolean
language sql stable set search_path = '' as $$
  select app.staff_role() = 'administrator'::public.staff_role
$$;

revoke all on all functions in schema app from public, anon;
grant execute on all functions in schema app to authenticated, service_role;

-- Keeps updated_at honest on every content table.
create function app.touch_updated_at() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.updated_at := now();
  return new;
end $$;

-- Rows that are history, never edits: revisions, versions, additions.
create function app.forbid_mutation() returns trigger
language plpgsql set search_path = '' as $$
begin
  raise exception '% rows are append-only (id=%)', tg_table_name, old.id;
end $$;

-- Turns on row-level security for a table and gives staff the access the
-- matrix in §7.5 allows. who: 'staff' (editors and administrators), 'admin'
-- (administrators only) or 'none' (background service only, which bypasses
-- RLS with its own key). The anonymous role gets nothing here; public reads
-- go through views and public writes are granted per table in 0007.
create function app.secure_table(tbl regclass, read_by text, write_by text) returns void
language plpgsql set search_path = '' as $$
declare
  check_for constant jsonb := '{"staff": "app.is_staff()", "admin": "app.is_admin()"}';
  name text := (select c.relname from pg_catalog.pg_class c where c.oid = tbl);
begin
  if read_by not in ('staff', 'admin', 'none') or write_by not in ('staff', 'admin', 'none') then
    raise exception 'secure_table: unknown audience % / %', read_by, write_by;
  end if;
  execute format('alter table %s enable row level security', tbl);
  if read_by <> 'none' then
    execute format('create policy %I on %s for select to authenticated using (%s)',
                   name || '_read', tbl, check_for ->> read_by);
  end if;
  if write_by <> 'none' then
    execute format('create policy %I on %s for insert to authenticated with check (%s)',
                   name || '_insert', tbl, check_for ->> write_by);
    execute format('create policy %I on %s for update to authenticated using (%s) with check (%s)',
                   name || '_update', tbl, check_for ->> write_by, check_for ->> write_by);
    execute format('create policy %I on %s for delete to authenticated using (%s)',
                   name || '_delete', tbl, check_for ->> write_by);
  end if;
end $$;

revoke all on function app.secure_table(regclass, text, text) from public, authenticated;

create trigger admin_users_touch before update on public.admin_users
  for each row execute function app.touch_updated_at();

alter table public.admin_users enable row level security;

-- Staff can see who their colleagues are; only administrators manage users.
create policy admin_users_staff_read on public.admin_users
  for select to authenticated using (app.is_staff());
create policy admin_users_admin_write on public.admin_users
  for all to authenticated using (app.is_admin()) with check (app.is_admin());
