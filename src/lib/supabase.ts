import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Public client:
 * Uses NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.
 * Safe to be accessed by browser or public components.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabasePublic: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: { persistSession: false },
      })
    : null;

/**
 * Admin / Server-Only client:
 * Uses SUPABASE_SERVICE_ROLE_KEY.
 * NEVER expose this key to browser (no NEXT_PUBLIC_ prefix).
 * Used exclusively inside server Route Handlers and server actions.
 */
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export const getSupabaseServerClient = (): SupabaseClient => {
  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable.");
  }

  // Use service role key for privileged backend operations (bypasses RLS)
  // If service role is not set, fallback to anon key but note that RLS restrictions will apply.
  const key = supabaseServiceRoleKey || supabaseAnonKey;
  if (!key) {
    throw new Error(
      "Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable."
    );
  }

  if (!supabaseServiceRoleKey) {
    console.warn(
      "[SupabaseServerClient] Warning: SUPABASE_SERVICE_ROLE_KEY is not configured in environment. Operating with limited anon privileges."
    );
  }

  return createClient(supabaseUrl, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};

/**
 * Helper to check whether Supabase environment variables are set
 */
export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl && (supabaseServiceRoleKey || supabaseAnonKey)
  );
};
