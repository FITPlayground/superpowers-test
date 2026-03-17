import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let browserClient: SupabaseClient<any, any> | null = null;

function normalizeSupabaseUrl(raw: string | undefined): string {
  if (!raw) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set");
  }
  const cleaned = raw.trim().replace(/^['"]+|['"]+$/g, "");
  try {
    const parsed = new URL(cleaned);
    return `${parsed.protocol}//${parsed.host}`;
  } catch {
    return cleaned;
  }
}

export function getBrowserSupabaseClient(): SupabaseClient<any, any> {
  if (browserClient) return browserClient;

  const url = normalizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Supabase client is not configured in the environment");
  }

  browserClient = createClient(url, anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }) as SupabaseClient<any, any>;

  return browserClient;
}


