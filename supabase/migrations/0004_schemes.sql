-- 0004 Schemes: sources, source runs, source records and versions, schemes and
-- translations, tranches, revisions, change signals, attributions
-- (TDD v2.0 §7.3, §8; commitment 4 and the scheme rules in §7.4).

create table public.sources (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  base_url text not null,
  access_method text not null check (access_method in ('api', 'feed', 'html', 'manual')),
  licence text not null,
  crawl_policy text,
  adapter_key text not null unique,
  schedule text,
  health_status text not null default 'unknown' check (health_status in ('unknown', 'healthy', 'degraded', 'failing')),
  last_success_at timestamptz,
  is_enabled boolean not null default false,   -- live ingestion is off until switched on (§12)
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.source_runs (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references public.sources (id),
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  status text not null default 'running' check (status in ('running', 'succeeded', 'failed')),
  counts jsonb not null default '{}',
  error text
);

create table public.source_records (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references public.sources (id),
  external_id text not null,
  current_hash text not null,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  unique (source_id, external_id)
);

-- Raw versions are written only when a record actually changes and kept 180 days (§7.6).
create table public.source_record_versions (
  id uuid primary key default gen_random_uuid(),
  record_id uuid not null references public.source_records (id) on delete cascade,
  run_id uuid references public.source_runs (id),
  content_hash text not null,
  payload jsonb not null,
  fetched_at timestamptz not null default now(),
  unique (record_id, content_hash)
);

create type public.scheme_status as enum ('open', 'soon', 'changed', 'shut');

create table public.schemes (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null,
  summary text,
  status public.scheme_status not null default 'open',
  state text not null default 'central',       -- ISO 3166-2:IN code, or 'central'
  category text,
  fields jsonb not null default '{}',
  source_record_id uuid references public.source_records (id),
  source_name text,
  source_url text,
  licence text,
  fetched_at timestamptz,
  verified_at timestamptz,
  verifying_editor uuid references public.admin_users (id),
  women_relevance text check (women_relevance in ('women_only', 'women_priority', 'general')),
  is_published boolean not null default false,
  published_at timestamptz,
  created_by uuid references public.admin_users (id),
  updated_by uuid references public.admin_users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- Published schemes must have provenance and a named verifier.
  constraint published_is_verified check (
    not is_published or (verified_at is not null and verifying_editor is not null
                         and source_name is not null and source_url is not null))
);

create table public.scheme_translations (
  scheme_id uuid not null references public.schemes (id) on delete cascade,
  locale public.locale not null,
  title text not null,
  summary text,
  body jsonb,
  status public.translation_status not null default 'draft',
  ai_drafted boolean not null default false,
  approved_by uuid references public.admin_users (id),
  approved_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (scheme_id, locale),
  constraint published_is_approved check (
    status <> 'published' or (approved_by is not null and approved_at is not null))
);

-- Scheme amount bands, as shown in the Approved Design
-- (Shishu, Kishor, Tarun, Tarun Plus and equivalents on other schemes).
create table public.scheme_tranches (
  id uuid primary key default gen_random_uuid(),
  scheme_id uuid not null references public.schemes (id) on delete cascade,
  position int not null,
  label jsonb not null,          -- {"en": "...", "hi": "..."}
  min_paise bigint check (min_paise >= 0),
  max_paise bigint check (max_paise >= 0),
  raw_text jsonb,                -- kept when a figure cannot be parsed
  unique (scheme_id, position),
  constraint band_has_a_value check (
    min_paise is not null or max_paise is not null or raw_text is not null),
  constraint band_is_ordered check (
    min_paise is null or max_paise is null or max_paise >= min_paise)
);

-- Append-only history of every accepted or rejected change. Kept permanently.
create table public.scheme_revisions (
  id uuid primary key default gen_random_uuid(),
  scheme_id uuid not null references public.schemes (id),
  changed_fields text[] not null,
  prev jsonb,
  next jsonb,
  source_of_change text not null check (source_of_change in ('ingestion', 'editor')),
  reviewer uuid references public.admin_users (id),
  decision text not null check (decision in ('accepted', 'rejected', 'auto')),
  created_at timestamptz not null default now()
);

create trigger scheme_revisions_append_only
  before update or delete on public.scheme_revisions
  for each row execute function app.forbid_mutation();

-- The review queue: differences found by comparison, waiting for an editor (§8.8).
create table public.change_signals (
  id uuid primary key default gen_random_uuid(),
  scheme_id uuid references public.schemes (id),
  source_record_id uuid references public.source_records (id),
  kind text not null check (kind in ('new', 'changed', 'disappeared', 'conflict')),
  detail jsonb not null default '{}',
  status text not null default 'open' check (status in ('open', 'accepted', 'dismissed')),
  detected_at timestamptz not null default now(),
  reviewed_by uuid references public.admin_users (id),
  reviewed_at timestamptz,
  constraint reviewed_has_reviewer check (
    status = 'open' or (reviewed_by is not null and reviewed_at is not null))
);

create table public.attributions (
  id uuid primary key default gen_random_uuid(),
  scheme_id uuid not null references public.schemes (id) on delete cascade,
  source_name text not null,
  source_url text not null,
  licence text not null,
  fetched_at timestamptz not null
);

do $$
declare t text;
begin
  foreach t in array array['sources', 'schemes', 'scheme_translations'] loop
    execute format('create trigger %I before update on public.%I
                    for each row execute function app.touch_updated_at()', t || '_touch', t);
  end loop;
end $$;

select app.secure_table('public.sources', 'staff', 'admin');          -- integrations are admin-managed
select app.secure_table('public.source_runs', 'staff', 'none');
select app.secure_table('public.source_records', 'staff', 'none');
select app.secure_table('public.source_record_versions', 'staff', 'none');
select app.secure_table('public.schemes', 'staff', 'staff');
select app.secure_table('public.scheme_translations', 'staff', 'staff');
select app.secure_table('public.scheme_tranches', 'staff', 'staff');
select app.secure_table('public.scheme_revisions', 'staff', 'staff');
select app.secure_table('public.change_signals', 'staff', 'staff');
select app.secure_table('public.attributions', 'staff', 'staff');
