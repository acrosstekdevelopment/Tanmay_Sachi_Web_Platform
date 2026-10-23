import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/*
 * The website's database client (TDD §2.2, §7.2). It holds only the public
 * (publishable) key, so it can read the *_public views and add a row to the
 * visitor forms, and nothing else: drafts, enquiries and donations are out of
 * its reach in the database itself. The privileged key never reaches the web
 * application. Server-side use only; nothing here is sent to the browser.
 */

let client: SupabaseClient | null | undefined;

// Read at run time, not build time: Next inlines `process.env.NEXT_PUBLIC_*`
// written literally, but not a dynamic lookup, so each Cloud Run environment
// supplies its own project (TDD App. C names).
const runtimeEnv = (name: string) => process.env[name];

/** The public database client, or null when this environment has no database configured. */
export function publicDb(): SupabaseClient | null {
  if (client !== undefined) return client;
  const url = runtimeEnv("NEXT_PUBLIC_SUPABASE_URL");
  const key = runtimeEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  client = url && key ? createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } }) : null;
  return client;
}
