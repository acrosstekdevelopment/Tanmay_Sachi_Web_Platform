-- Standing public-access test (TDD v2.0 §7.1, §7.2, App. B "public-access
-- lockout"). Raises, and so fails the run, if:
--   * any table in public lacks row-level security;
--   * the anonymous role can read, change or delete any base table;
--   * the anonymous role can add rows anywhere except the visitor forms;
--   * any *_public view is not readable by the anonymous role;
--   * reading a base table as the anonymous role actually succeeds.
-- Runs inside a transaction and leaves nothing behind.

begin;

do $$
declare
  bad text;
  visitor_forms constant text[] := array['leads', 'newsletter_subscribers', 'alert_subscriptions',
                                         'donation_intents', 'article_feedback'];
begin
  select string_agg(c.relname, ', ') into bad
    from pg_catalog.pg_class c
   where c.relnamespace = 'public'::regnamespace and c.relkind in ('r', 'p') and not c.relrowsecurity;
  if bad is not null then raise exception 'tables without row-level security: %', bad; end if;

  select string_agg(c.relname || ':' || p.priv, ', ') into bad
    from pg_catalog.pg_class c
   cross join unnest(array['SELECT', 'UPDATE', 'DELETE', 'TRUNCATE', 'REFERENCES', 'TRIGGER']) as p(priv)
   where c.relnamespace = 'public'::regnamespace and c.relkind in ('r', 'p')
     and has_table_privilege('anon', c.oid, p.priv);
  if bad is not null then raise exception 'anon holds privileges on base tables: %', bad; end if;

  select string_agg(c.relname, ', ') into bad
    from pg_catalog.pg_class c
   where c.relnamespace = 'public'::regnamespace and c.relkind in ('r', 'p')
     and c.relname <> all (visitor_forms)
     and has_any_column_privilege('anon', c.oid, 'INSERT');
  if bad is not null then raise exception 'anon can insert outside the visitor forms: %', bad; end if;

  select string_agg(c.relname, ', ') into bad
    from pg_catalog.pg_class c
   where c.relnamespace = 'public'::regnamespace and c.relkind = 'v'
     and c.relname like '%\_public' and not has_table_privilege('anon', c.oid, 'SELECT');
  if bad is not null then raise exception 'public views anon cannot read: %', bad; end if;

  select string_agg(c.relname, ', ') into bad
    from pg_catalog.pg_class c
   where c.relnamespace = 'public'::regnamespace and c.relkind = 'v'
     and c.relname not like '%\_public' and has_table_privilege('anon', c.oid, 'SELECT');
  if bad is not null then raise exception 'views outside the *_public set readable by anon: %', bad; end if;
end $$;

-- Try it for real as the anonymous role.
set local role anon;
do $$
declare t text;
begin
  for t in select c.relname from pg_catalog.pg_class c
            where c.relnamespace = 'public'::regnamespace and c.relkind in ('r', 'p') loop
    begin
      execute format('select 1 from public.%I limit 1', t);
      raise exception 'anon read base table % directly', t;
    exception when insufficient_privilege then
      null;  -- expected
    end;
  end loop;
end $$;
reset role;

select 'public lockout: pass' as result;

rollback;
