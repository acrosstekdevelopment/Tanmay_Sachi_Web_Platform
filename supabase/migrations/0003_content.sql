-- 0003 Content: pillars, projects (cost lines, giving tiers, objectives,
-- objective additions), articles, article feedback, pages, with their typed
-- translation tables (TDD v2.0 §7.1, §7.3; commitments 2 and 3 in §7.4).

-- Pillars ----------------------------------------------------------------

create table public.pillars (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  status text not null default 'planned' check (status in ('active', 'design', 'planned')),
  position int not null default 0,
  hero_media_id uuid references public.media (id),
  is_published boolean not null default false,
  published_at timestamptz,
  created_by uuid references public.admin_users (id),
  updated_by uuid references public.admin_users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Projects ---------------------------------------------------------------

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  pillar_id uuid references public.pillars (id),
  status text not null default 'upcoming' check (status in ('upcoming', 'active', 'completed')),
  progress_percent int check (progress_percent between 0 and 100),
  location jsonb,
  hero_media_id uuid references public.media (id),
  is_featured boolean not null default false,
  is_published boolean not null default false,
  published_at timestamptz,
  created_by uuid references public.admin_users (id),
  updated_by uuid references public.admin_users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- The budget the giving tiers are generated from. Money in whole paise (§7.1).
create table public.project_cost_lines (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  position int not null default 0,
  label jsonb not null,
  unit_label jsonb,
  unit_cost_paise bigint not null check (unit_cost_paise > 0),
  quantity int not null default 1 check (quantity > 0),
  note jsonb,
  created_by uuid references public.admin_users (id),
  updated_by uuid references public.admin_users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Commitment 3: tiers derive from a cost line; an adjustment needs the amount,
-- a reason, the person and the time, all four or none, and is shown publicly
-- as "adjusted".
create table public.giving_tiers (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  cost_line_id uuid not null references public.project_cost_lines (id),
  position int not null default 0,
  units int not null default 1 check (units > 0),
  amount_override_paise bigint check (amount_override_paise > 0),
  override_reason text,
  overridden_by uuid references public.admin_users (id),
  overridden_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint override_is_complete check (
    num_nulls(amount_override_paise, override_reason, overridden_by, overridden_at) in (0, 4))
);

-- §7.5: only an Administrator adjusts a giving tier.
create function app.guard_tier_override() returns trigger
language plpgsql set search_path = '' as $$
begin
  if (tg_op = 'INSERT' and new.amount_override_paise is not null)
     or (tg_op = 'UPDATE' and (new.amount_override_paise, new.override_reason, new.overridden_by)
                              is distinct from (old.amount_override_paise, old.override_reason, old.overridden_by)) then
    if auth.uid() is not null and not app.is_admin() then
      raise exception 'only an administrator can adjust a giving tier';
    end if;
  end if;
  return new;
end $$;

create trigger giving_tiers_override_guard before insert or update on public.giving_tiers
  for each row execute function app.guard_tier_override();

-- Commitment 2: objectives lock at publication; additions are new dated rows.
create table public.project_objectives (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id),
  position int not null default 0,
  body jsonb not null,
  locked_at timestamptz,
  created_at timestamptz not null default now()
);

create function app.forbid_locked_mutation() returns trigger
language plpgsql set search_path = '' as $$
begin
  if old.locked_at is not null then
    raise exception 'locked objective rows are append-only (id=%)', old.id;
  end if;
  return coalesce(new, old);
end $$;

create trigger project_objectives_lock
  before update or delete on public.project_objectives
  for each row execute function app.forbid_locked_mutation();

-- Once a project is published its objective list is closed: anything new is a
-- dated addition, so it cannot be slipped in as an original objective.
create function app.forbid_objective_after_publish() returns trigger
language plpgsql set search_path = '' as $$
begin
  if exists (select 1 from public.projects p where p.id = new.project_id and p.is_published) then
    raise exception 'project % is published; record a dated addition instead', new.project_id;
  end if;
  return new;
end $$;

create trigger project_objectives_closed_after_publish
  before insert on public.project_objectives
  for each row execute function app.forbid_objective_after_publish();

create table public.project_objective_additions (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id),
  body jsonb not null,
  added_at timestamptz not null default now(),
  added_by uuid not null references public.admin_users (id)
);

create trigger project_objective_additions_append_only
  before update or delete on public.project_objective_additions
  for each row execute function app.forbid_mutation();

-- Publishing a project locks its objectives in the same transaction (§7.4).
create function app.publish_project(p_id uuid) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not (app.is_staff() or auth.role() = 'service_role') then
    raise exception 'only staff can publish a project';
  end if;
  update public.project_objectives
     set locked_at = now()
   where project_id = p_id and locked_at is null;
  update public.projects
     set is_published = true, published_at = coalesce(published_at, now())
   where id = p_id;
end $$;

-- The same lock applies however the project is published, so a plain UPDATE of
-- is_published cannot skip it.
create function app.lock_objectives_on_publish() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if new.is_published and not old.is_published then
    update public.project_objectives
       set locked_at = now()
     where project_id = new.id and locked_at is null;
  end if;
  return new;
end $$;

create trigger projects_lock_objectives_on_publish
  after update of is_published on public.projects
  for each row execute function app.lock_objectives_on_publish();

revoke all on function app.publish_project(uuid) from public, anon;
grant execute on function app.publish_project(uuid) to authenticated, service_role;

-- Articles ---------------------------------------------------------------

create table public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  kind text not null check (kind in ('guide', 'research', 'field_note')),
  read_minutes int check (read_minutes > 0),
  related_article_ids uuid[] not null default '{}',
  hero_media_id uuid references public.media (id),
  is_published boolean not null default false,
  published_at timestamptz,
  created_by uuid references public.admin_users (id),
  updated_by uuid references public.admin_users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- "Was this useful?" on articles. Visitors may add a row, never read one.
create table public.article_feedback (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.articles (id) on delete cascade,
  locale public.locale not null,
  helpful boolean not null,
  comment text check (length(comment) <= 2000),
  created_at timestamptz not null default now()
);

-- Pages (About, Accountability, legal pages and other editable copy) -------

create table public.pages (
  id uuid primary key default gen_random_uuid(),
  key text not null unique check (key ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  is_published boolean not null default false,
  published_at timestamptz,
  created_by uuid references public.admin_users (id),
  updated_by uuid references public.admin_users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Typed translation tables (§7.1): per-language status, AI-drafted flag, approver.

create table public.pillar_translations (
  pillar_id uuid not null references public.pillars (id) on delete cascade,
  locale public.locale not null,
  title text not null,
  spine text,
  summary text,
  body jsonb,
  status public.translation_status not null default 'draft',
  ai_drafted boolean not null default false,
  approved_by uuid references public.admin_users (id),
  approved_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (pillar_id, locale),
  constraint published_is_approved check (
    status <> 'published' or (approved_by is not null and approved_at is not null))
);

create table public.project_translations (
  project_id uuid not null references public.projects (id) on delete cascade,
  locale public.locale not null,
  title text not null,
  summary text,
  body jsonb,
  unknowns jsonb,
  status public.translation_status not null default 'draft',
  ai_drafted boolean not null default false,
  approved_by uuid references public.admin_users (id),
  approved_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (project_id, locale),
  constraint published_is_approved check (
    status <> 'published' or (approved_by is not null and approved_at is not null))
);

create table public.article_translations (
  article_id uuid not null references public.articles (id) on delete cascade,
  locale public.locale not null,
  title text not null,
  summary text,
  body jsonb,
  toc jsonb,
  sources jsonb,
  status public.translation_status not null default 'draft',
  ai_drafted boolean not null default false,
  approved_by uuid references public.admin_users (id),
  approved_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (article_id, locale),
  constraint published_is_approved check (
    status <> 'published' or (approved_by is not null and approved_at is not null))
);

create table public.page_translations (
  page_id uuid not null references public.pages (id) on delete cascade,
  locale public.locale not null,
  title text not null,
  body jsonb,
  status public.translation_status not null default 'draft',
  ai_drafted boolean not null default false,
  approved_by uuid references public.admin_users (id),
  approved_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (page_id, locale),
  constraint published_is_approved check (
    status <> 'published' or (approved_by is not null and approved_at is not null))
);

do $$
declare t text;
begin
  foreach t in array array['pillars', 'projects', 'project_cost_lines', 'giving_tiers', 'articles',
                           'pages', 'pillar_translations', 'project_translations',
                           'article_translations', 'page_translations'] loop
    execute format('create trigger %I before update on public.%I
                    for each row execute function app.touch_updated_at()', t || '_touch', t);
  end loop;
end $$;

select app.secure_table('public.pillars', 'staff', 'staff');
select app.secure_table('public.projects', 'staff', 'staff');
select app.secure_table('public.project_cost_lines', 'staff', 'staff');
select app.secure_table('public.giving_tiers', 'staff', 'staff');
select app.secure_table('public.project_objectives', 'staff', 'staff');
select app.secure_table('public.project_objective_additions', 'staff', 'staff');
select app.secure_table('public.articles', 'staff', 'staff');
select app.secure_table('public.article_feedback', 'staff', 'none');
select app.secure_table('public.pages', 'staff', 'staff');
select app.secure_table('public.pillar_translations', 'staff', 'staff');
select app.secure_table('public.project_translations', 'staff', 'staff');
select app.secure_table('public.article_translations', 'staff', 'staff');
select app.secure_table('public.page_translations', 'staff', 'staff');
