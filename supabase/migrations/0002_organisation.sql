-- 0002 Organisation and trust: media, credentials, team, values, metrics,
-- documents, unproven claims (TDD v2.0 §7.3, commitments 1, 5 and 7 in §7.4).
--
-- Every content record carries a published flag, publication time, creator and
-- editor (§7.1). Bilingual text is stored as {"en": "...", "hi": "..."}.

-- Commitment 7: consent is required before an image can be published, and
-- Hindi alternative text before it appears in the Hindi locale.
create table public.media (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null,
  public_path text,                 -- content-addressed, set on publish
  content_hash text,
  mime_type text,
  width int check (width > 0),
  height int check (height > 0),
  variants jsonb not null default '{}',
  alt_text jsonb not null,
  caption jsonb,
  art_direction jsonb,
  album text,
  consent_status text not null default 'missing'
    check (consent_status in ('missing', 'held', 'withdrawn')),
  consent_reference text,
  is_published boolean not null default false,
  published_at timestamptz,
  published_locales public.locale[] not null default '{}',
  created_by uuid references public.admin_users (id),
  updated_by uuid references public.admin_users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- coalesce: a missing key gives NULL, and a NULL check would pass.
  constraint alt_en_required check (coalesce(length(btrim(alt_text ->> 'en')), 0) > 0),
  constraint alt_hi_required_for_hi check (
    not ('hi' = any (published_locales)) or coalesce(length(btrim(alt_text ->> 'hi')), 0) > 0),
  constraint publish_needs_consent check (
    not is_published or (consent_status = 'held' and consent_reference is not null)),
  constraint published_has_public_path check (not is_published or public_path is not null)
);

-- Commitment 5: a credential appears only when the certificate is in hand.
-- There is no "coming soon" state.
create type public.credential_key as enum ('12ab', '80g', 'csr1', 'fcra', 'cin', 'pan', 'section8');

create table public.credentials (
  key public.credential_key primary key,
  value text,
  granted_at date,
  public_note jsonb,
  is_granted boolean not null default false,
  certificate_media_id uuid references public.media (id),
  updated_by uuid references public.admin_users (id),
  updated_at timestamptz not null default now(),
  constraint granted_needs_certificate check (
    not is_granted or (value is not null and granted_at is not null
                       and certificate_media_id is not null))
);

-- A person is on the site only if they can be named (commitment 7): name is required.
create table public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(btrim(name)) > 0),
  role jsonb not null,
  credential_line jsonb,
  photo_media_id uuid references public.media (id),
  declared_interests jsonb,
  is_grievance_officer boolean not null default false,
  position int not null default 0,
  is_published boolean not null default false,
  published_at timestamptz,
  created_by uuid references public.admin_users (id),
  updated_by uuid references public.admin_users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.values (
  id uuid primary key default gen_random_uuid(),
  title jsonb not null,
  description jsonb not null,
  position int not null default 0,
  is_published boolean not null default false,
  published_at timestamptz,
  created_by uuid references public.admin_users (id),
  updated_by uuid references public.admin_users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Commitment 1: no figure without provenance; metrics are publishable content.
-- An unverified figure is shown as "—", never as a number.
create table public.metrics (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  label jsonb,
  value numeric,
  unit text,
  source_name text,
  source_url text,
  verified_at timestamptz,
  verified_by uuid references public.admin_users (id),
  is_published boolean not null default false,
  published_at timestamptz,
  created_by uuid references public.admin_users (id),
  updated_by uuid references public.admin_users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint metric_has_provenance check (
    value is null or (source_name is not null and source_url is not null
                      and verified_at is not null and verified_by is not null)),
  constraint published_metric_is_verified check (
    not is_published or verified_at is not null)
);

-- Reports and filings shown on Accountability (annual reports, audits, policies).
create table public.documents (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('annual_report', 'audited_accounts', 'policy', 'registration', 'other')),
  title jsonb not null,
  period text,
  media_id uuid references public.media (id),
  is_published boolean not null default false,
  published_at timestamptz,
  created_by uuid references public.admin_users (id),
  updated_by uuid references public.admin_users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint published_has_file check (not is_published or media_id is not null)
);

-- What the Foundation has not yet proven, said plainly (§7.3).
create table public.unproven_claims (
  id uuid primary key default gen_random_uuid(),
  claim jsonb not null,
  why jsonb,
  position int not null default 0,
  is_published boolean not null default false,
  published_at timestamptz,
  created_by uuid references public.admin_users (id),
  updated_by uuid references public.admin_users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

do $$
declare t text;
begin
  foreach t in array array['media', 'credentials', 'team_members', 'values', 'metrics',
                           'documents', 'unproven_claims'] loop
    execute format('create trigger %I before update on public.%I
                    for each row execute function app.touch_updated_at()', t || '_touch', t);
  end loop;
end $$;

select app.secure_table('public.media', 'staff', 'staff');
select app.secure_table('public.credentials', 'staff', 'admin');   -- §7.5: credentials are admin-managed
select app.secure_table('public.team_members', 'staff', 'staff');
select app.secure_table('public.values', 'staff', 'staff');
select app.secure_table('public.metrics', 'staff', 'staff');
select app.secure_table('public.documents', 'staff', 'staff');
select app.secure_table('public.unproven_claims', 'staff', 'staff');
