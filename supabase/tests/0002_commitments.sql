-- The seven commitments as database tests (TDD v2.0 App. B, DB column).
-- Each block expects the database to refuse a forbidden change. Runs inside a
-- transaction and rolls everything back.

begin;

-- A staff member to attribute rows to.
insert into auth.users (id, email) values ('00000000-0000-4000-8000-000000000001', 'test-editor@example.invalid');
insert into public.admin_users (id, email, display_name, role)
  values ('00000000-0000-4000-8000-000000000001', 'test-editor@example.invalid', 'Test Editor', 'editor');

create function pg_temp.expect_refusal(label text, stmt text) returns void language plpgsql as $$
begin
  execute stmt;
  raise exception 'commitment test failed: % was allowed', label;
exception
  when check_violation or not_null_violation or raise_exception or foreign_key_violation then
    if sqlerrm like 'commitment test failed%' then raise; end if;
end $$;

-- 1. No figure without provenance; no unverified figure published.
select pg_temp.expect_refusal('metric without provenance',
  $q$insert into public.metrics (key, value) values ('t1', 42)$q$);
select pg_temp.expect_refusal('unverified metric published',
  $q$insert into public.metrics (key, is_published) values ('t2', true)$q$);

-- 2. Objectives lock at publication; additions are append-only.
insert into public.projects (id, slug) values ('00000000-0000-4000-8000-0000000000a1', 'test-project');
insert into public.project_objectives (id, project_id, body)
  values ('00000000-0000-4000-8000-0000000000b1', '00000000-0000-4000-8000-0000000000a1', '{"en": "Objective"}');
update public.projects set is_published = true where id = '00000000-0000-4000-8000-0000000000a1';
do $$ begin
  if exists (select 1 from public.project_objectives where id = '00000000-0000-4000-8000-0000000000b1' and locked_at is null) then
    raise exception 'commitment test failed: publishing did not lock the objective';
  end if;
end $$;
select pg_temp.expect_refusal('edit of a locked objective',
  $q$update public.project_objectives set body = '{"en": "Changed"}' where id = '00000000-0000-4000-8000-0000000000b1'$q$);
select pg_temp.expect_refusal('delete of a locked objective',
  $q$delete from public.project_objectives where id = '00000000-0000-4000-8000-0000000000b1'$q$);
select pg_temp.expect_refusal('new original objective after publish',
  $q$insert into public.project_objectives (project_id, body) values ('00000000-0000-4000-8000-0000000000a1', '{"en": "Late"}')$q$);
insert into public.project_objective_additions (id, project_id, body, added_by)
  values ('00000000-0000-4000-8000-0000000000c1', '00000000-0000-4000-8000-0000000000a1',
          '{"en": "Dated addition"}', '00000000-0000-4000-8000-000000000001');
select pg_temp.expect_refusal('edit of an addition',
  $q$update public.project_objective_additions set body = '{}' where id = '00000000-0000-4000-8000-0000000000c1'$q$);

-- 3. Tiers need a cost line; an adjustment needs all four details.
insert into public.project_cost_lines (id, project_id, label, unit_cost_paise)
  values ('00000000-0000-4000-8000-0000000000d1', '00000000-0000-4000-8000-0000000000a1', '{"en": "Kit"}', 250000);
select pg_temp.expect_refusal('tier without a cost line',
  $q$insert into public.giving_tiers (project_id) values ('00000000-0000-4000-8000-0000000000a1')$q$);
select pg_temp.expect_refusal('incomplete adjustment',
  $q$insert into public.giving_tiers (project_id, cost_line_id, amount_override_paise)
     values ('00000000-0000-4000-8000-0000000000a1', '00000000-0000-4000-8000-0000000000d1', 100000)$q$);

-- 4. Staleness is derived from the verification date.
insert into public.schemes (slug, title, is_published, verified_at, verifying_editor, source_name, source_url)
  values ('test-stale', 'Stale', true, now() - interval '91 days', '00000000-0000-4000-8000-000000000001', 'Src', 'https://example.invalid'),
         ('test-fresh', 'Fresh', true, now() - interval '89 days', '00000000-0000-4000-8000-000000000001', 'Src', 'https://example.invalid');
do $$ begin
  if not (select is_stale from public.schemes_public where slug = 'test-stale')
     or (select is_stale from public.schemes_public where slug = 'test-fresh') then
    raise exception 'commitment test failed: is_stale did not flip at 90 days';
  end if;
end $$;
select pg_temp.expect_refusal('unverified scheme published',
  $q$insert into public.schemes (slug, title, is_published) values ('test-unverified', 'X', true)$q$);

-- 5. A credential is held only with its certificate.
select pg_temp.expect_refusal('credential held without certificate',
  $q$insert into public.credentials (key, is_granted, value, granted_at) values ('80g', true, 'AAA', current_date)
     on conflict (key) do update set is_granted = true, value = 'AAA', granted_at = current_date$q$);

-- 7. No image published without consent; no Hindi publish without Hindi alt text.
select pg_temp.expect_refusal('image published without consent',
  $q$insert into public.media (storage_path, public_path, alt_text, is_published)
     values ('a', '/m/a', '{"en": "A"}', true)$q$);
select pg_temp.expect_refusal('Hindi publish without Hindi alt text',
  $q$insert into public.media (storage_path, alt_text, published_locales)
     values ('b', '{"en": "B"}', '{hi}')$q$);
select pg_temp.expect_refusal('media with blank English alt text',
  $q$insert into public.media (storage_path, alt_text) values ('c', '{"en": " "}')$q$);
select pg_temp.expect_refusal('media with no English alt text at all',
  $q$insert into public.media (storage_path, alt_text) values ('d', '{"hi": "चित्र"}')$q$);

-- Drafts never leak through the views.
insert into public.pillars (slug) values ('test-draft-pillar');
do $$ begin
  if exists (select 1 from public.pillars_public where slug = 'test-draft-pillar') then
    raise exception 'commitment test failed: a draft pillar is visible publicly';
  end if;
end $$;

select 'seven commitments: pass' as result;

rollback;
