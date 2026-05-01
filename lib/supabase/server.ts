import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase server-side com service_role.
 *
 * NUNCA exponha pro browser — bypassa RLS e tem permissão total.
 * Retorna `null` quando as env vars não estão setadas pra evitar throw em build/preview.
 */
export function createServerClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[supabase server] missing url or service_role key.");
    }
    return null;
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
