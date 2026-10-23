-- 0006 Operations: job runs, site settings and feature flags, SEO fields,
-- redirects, link-scan results, rate limits, search documents, cache refresh
-- queue (TDD v2.0 §7.3).

create table public.job_runs (
  id uuid primary key default gen_random_uuid(),
  job text not null,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  status text not null default 'running' check (status in ('running', 'succeeded', 'failed', 'skipped')),
  detail jsonb not null default '{}'
);

create table public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_by uuid references public.admin_users (id),
  updated_at timestamptz not null default now()
);

-- Outbound alerts, live ingestion and search indexing are off by default (§12).
create table public.feature_flags (
  key text primary key,
  enabled boolean not null default false,
  note text,
  updated_by uuid references public.admin_users (id),
  updated_at timestamptz not null default now()
);

create table public.seo_fields (
  id uuid primary key default gen_random_uuid(),
  path text not null check (path like '/%'),
  locale public.locale not null,
  title text check (length(title) <= 70),
  description text check (length(description) <= 170),
  og_media_id uuid references public.media (id),
  noindex boolean not null default false,
  updated_by uuid references public.admin_users (id),
  updated_at timestamptz not null default now(),
  unique (path, locale)
);

create table public.redirects (
  id uuid primary key default gen_random_uuid(),
  from_path text not null unique check (from_path like '/%'),
  to_path text not null,
  status_code int not null default 308 check (status_code in (301, 302, 307, 308)),
  is_active boolean not null default true,
  created_by uuid references public.admin_users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint not_a_loop check (from_path <> to_path)
);

create table public.link_scan_results (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  found_on text not null,
  status_code int,
  error text,
  checked_at timestamptz not null default now()
);

-- Identifiers are hashed in rate-limit keys (§12).
create table public.rate_limits (
  bucket text not null,
  key_hash text not null,
  window_start timestamptz not null,
  hits int not null default 1 check (hits > 0),
  primary key (bucket, key_hash, window_start)
);

create table public.search_documents (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null check (entity_type in ('scheme', 'article', 'project', 'pillar', 'page')),
  entity_id uuid not null,
  locale public.locale not null,
  path text not null,
  title text not null,
  body text not null default '',
  search_vector tsvector generated always as (
    setweight(to_tsvector('simple', title), 'A') || setweight(to_tsvector('simple', body), 'B')) stored,
  updated_at timestamptz not null default now(),
  unique (entity_type, entity_id, locale)
);

create index search_documents_vector on public.search_documents using gin (search_vector);

-- Pages to re-render after a publish or a staleness sweep; drained at a limited rate.
create table public.cache_refresh_queue (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  reason text not null,
  requested_at timestamptz not null default now(),
  processed_at timestamptz
);

do $$
declare t text;
begin
  foreach t in array array['site_settings', 'feature_flags', 'seo_fields', 'redirects',
                           'search_documents'] loop
    execute format('create trigger %I before update on public.%I
                    for each row execute function app.touch_updated_at()', t || '_touch', t);
  end loop;
end $$;

select app.secure_table('public.job_runs', 'staff', 'none');
select app.secure_table('public.site_settings', 'staff', 'admin');
select app.secure_table('public.feature_flags', 'staff', 'admin');
select app.secure_table('public.seo_fields', 'staff', 'staff');
select app.secure_table('public.redirects', 'staff', 'admin');
select app.secure_table('public.link_scan_results', 'staff', 'none');
select app.secure_table('public.rate_limits', 'none', 'none');
select app.secure_table('public.search_documents', 'staff', 'none');
select app.secure_table('public.cache_refresh_queue', 'staff', 'staff');
