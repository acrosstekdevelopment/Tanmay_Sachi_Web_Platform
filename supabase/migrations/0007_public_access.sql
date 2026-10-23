-- 0007 Public access: the named views the public site reads, and the few
-- tables visitors may add a row to (TDD v2.0 §7.2, §7.5).
--
-- security_invoker = false is deliberate: each view runs with its owner's
-- privileges, which is how a visitor with no table permission can still read
-- published rows, and only published rows. Every view filters to what is
-- published, consented and verified, and lists only the columns a visitor may
-- see. Adding a view here is not enough: grant it at the bottom too.

-- Re-assert the lockout from 0001 before granting anything, in case a table was
-- created under different default privileges.
revoke all on all tables in schema public from anon;
revoke all on all sequences in schema public from anon;

-- Organisation and trust ---------------------------------------------------

create view public.media_public with (security_invoker = false) as
  select m.id, m.public_path, m.variants, m.width, m.height, m.alt_text, m.caption, m.published_locales
    from public.media m
   where m.is_published and m.consent_status = 'held';

-- Every credential is listed so the page can say "not held" honestly (commitment 5);
-- the number, date and certificate appear only once it is held.
create view public.credentials_public with (security_invoker = false) as
  select c.key, c.is_granted, c.public_note,
         case when c.is_granted then c.value end as value,
         case when c.is_granted then c.granted_at end as granted_at,
         case when c.is_granted then m.public_path end as certificate_path
    from public.credentials c
    left join public.media m on m.id = c.certificate_media_id and m.is_published and m.consent_status = 'held';

create view public.team_members_public with (security_invoker = false) as
  select t.id, t.name, t.role, t.credential_line, t.declared_interests, t.is_grievance_officer, t.position,
         m.public_path as photo_path, m.alt_text as photo_alt
    from public.team_members t
    left join public.media m on m.id = t.photo_media_id and m.is_published and m.consent_status = 'held'
   where t.is_published;

create view public.values_public with (security_invoker = false) as
  select v.id, v.title, v.description, v.position from public.values v where v.is_published;

-- Commitment 1: only verified figures are published; the page shows "—" for any key missing here.
create view public.metrics_public with (security_invoker = false) as
  select m.key, m.label, m.value, m.unit, m.source_name, m.source_url, m.verified_at
    from public.metrics m
   where m.is_published and m.verified_at is not null;

create view public.documents_public with (security_invoker = false) as
  select d.id, d.kind, d.title, d.period, m.public_path as file_path
    from public.documents d
    join public.media m on m.id = d.media_id and m.is_published
   where d.is_published;

create view public.unproven_claims_public with (security_invoker = false) as
  select u.id, u.claim, u.why, u.position from public.unproven_claims u where u.is_published;

-- Content: one row per published item and published translation ---------------

create view public.pillars_public with (security_invoker = false) as
  select p.id, p.slug, p.status, p.position, t.locale, t.title, t.spine, t.summary, t.body
    from public.pillars p
    join public.pillar_translations t on t.pillar_id = p.id and t.status = 'published'
   where p.is_published;

create view public.projects_public with (security_invoker = false) as
  select p.id, p.slug, pl.slug as pillar_slug, p.status, p.progress_percent, p.location, p.is_featured,
         p.published_at, t.locale, t.title, t.summary, t.body, t.unknowns
    from public.projects p
    join public.project_translations t on t.project_id = p.id and t.status = 'published'
    left join public.pillars pl on pl.id = p.pillar_id and pl.is_published
   where p.is_published;

create view public.project_objectives_public with (security_invoker = false) as
  select o.id, o.project_id, o.position, o.body, o.locked_at
    from public.project_objectives o
    join public.projects p on p.id = o.project_id and p.is_published;

-- The dated public history of additions (commitment 2).
create view public.project_objective_additions_public with (security_invoker = false) as
  select a.id, a.project_id, a.body, a.added_at
    from public.project_objective_additions a
    join public.projects p on p.id = a.project_id and p.is_published;

create view public.project_cost_lines_public with (security_invoker = false) as
  select c.id, c.project_id, c.position, c.label, c.unit_label, c.unit_cost_paise, c.quantity, c.note
    from public.project_cost_lines c
    join public.projects p on p.id = c.project_id and p.is_published;

-- Commitment 3: the amount is derived from the cost line; an adjustment is shown as such.
create view public.giving_tiers_public with (security_invoker = false) as
  select g.id, g.project_id, g.position, g.units, c.label, c.unit_label,
         coalesce(g.amount_override_paise, c.unit_cost_paise * g.units) as amount_paise,
         g.amount_override_paise is not null as is_adjusted,
         g.override_reason as adjustment_reason,
         g.overridden_at as adjusted_at
    from public.giving_tiers g
    join public.project_cost_lines c on c.id = g.cost_line_id
    join public.projects p on p.id = g.project_id and p.is_published;

create view public.articles_public with (security_invoker = false) as
  select a.id, a.slug, a.kind, a.read_minutes, a.related_article_ids, a.published_at,
         t.locale, t.title, t.summary, t.body, t.toc, t.sources
    from public.articles a
    join public.article_translations t on t.article_id = a.id and t.status = 'published'
   where a.is_published;

create view public.pages_public with (security_invoker = false) as
  select p.key, t.locale, t.title, t.body
    from public.pages p
    join public.page_translations t on t.page_id = p.id and t.status = 'published'
   where p.is_published;

-- Schemes -------------------------------------------------------------------

-- Commitment 4: staleness is derived, never typed.
create view public.schemes_public with (security_invoker = false) as
  select s.id, s.slug, s.title, s.summary, s.status, s.state, s.category, s.fields,
         s.source_name, s.source_url, s.licence, s.fetched_at, s.verified_at, s.women_relevance,
         (s.verified_at is null or s.verified_at < now() - interval '90 days') as is_stale
    from public.schemes s
   where s.is_published;

create view public.scheme_translations_public with (security_invoker = false) as
  select t.scheme_id, t.locale, t.title, t.summary, t.body
    from public.scheme_translations t
    join public.schemes s on s.id = t.scheme_id and s.is_published
   where t.status = 'published';

create view public.scheme_tranches_public with (security_invoker = false) as
  select b.id, b.scheme_id, b.position, b.label, b.min_paise, b.max_paise, b.raw_text
    from public.scheme_tranches b
    join public.schemes s on s.id = b.scheme_id and s.is_published;

create view public.attributions_public with (security_invoker = false) as
  select a.scheme_id, a.source_name, a.source_url, a.licence, a.fetched_at
    from public.attributions a
    join public.schemes s on s.id = a.scheme_id and s.is_published;

-- Operations ----------------------------------------------------------------

create view public.redirects_public with (security_invoker = false) as
  select r.from_path, r.to_path, r.status_code from public.redirects r where r.is_active;

create view public.seo_fields_public with (security_invoker = false) as
  select f.path, f.locale, f.title, f.description, f.noindex, m.public_path as og_image_path
    from public.seo_fields f
    left join public.media m on m.id = f.og_media_id and m.is_published and m.consent_status = 'held';

-- Read grants: the views alone ------------------------------------------------

do $$
declare v text;
begin
  for v in select c.relname from pg_catalog.pg_class c
            where c.relnamespace = 'public'::regnamespace and c.relkind = 'v' and c.relname like '%\_public' loop
    execute format('grant select on public.%I to anon, authenticated', v);
  end loop;
end $$;

-- Write grants: a visitor may add a row, never read one back -------------------

grant insert (source_page, locale, enquiry_type, name, organisation, email, phone, message,
              consent_notice_version)
  on public.leads to anon;
create policy leads_visitor_insert on public.leads
  for insert to anon with check (status = 'new' and assigned_owner is null);

grant insert (email, locale, consent_notice_version, confirm_token_hash, token_expires_at)
  on public.newsletter_subscribers to anon;
create policy newsletter_subscribers_visitor_insert on public.newsletter_subscribers
  for insert to anon with check (confirmed_at is null and unsubscribed_at is null);

grant insert (channel, address, locale, states, categories, consent_notice_version,
              confirm_token_hash, token_expires_at)
  on public.alert_subscriptions to anon;
create policy alert_subscriptions_visitor_insert on public.alert_subscriptions
  for insert to anon with check (not double_opt_in_confirmed and confirmed_at is null);

grant insert (amount_paise, frequency, project_id, giving_tier_id, name, email, pan_ciphertext,
              pan_key_version, address, marketing_consent, consent_notice_version, locale)
  on public.donation_intents to anon;
create policy donation_intents_visitor_insert on public.donation_intents
  for insert to anon with check (true);

grant insert (article_id, locale, helpful, comment) on public.article_feedback to anon;
create policy article_feedback_visitor_insert on public.article_feedback
  for insert to anon with check (
    exists (select 1 from public.articles_public a where a.id = article_id));

-- Double opt-in (§7.5): the one function that reads a token row, and only the
-- row matching the presented token while it is unexpired.
create function public.confirm_subscription(p_token_hash text) returns boolean
language plpgsql security definer set search_path = '' as $$
declare hit int;
begin
  update public.newsletter_subscribers
     set confirmed_at = now(), confirm_token_hash = null, token_expires_at = null
   where confirm_token_hash = p_token_hash and token_expires_at > now() and confirmed_at is null;
  get diagnostics hit = row_count;
  if hit = 0 then
    update public.alert_subscriptions
       set double_opt_in_confirmed = true, confirmed_at = now(),
           confirm_token_hash = null, token_expires_at = null
     where confirm_token_hash = p_token_hash and token_expires_at > now() and not double_opt_in_confirmed;
    get diagnostics hit = row_count;
  end if;
  return hit > 0;
end $$;

revoke all on function public.confirm_subscription(text) from public;
grant execute on function public.confirm_subscription(text) to anon, authenticated;
