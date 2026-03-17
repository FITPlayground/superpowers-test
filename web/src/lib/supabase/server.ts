import { createClient, type SupabaseClient } from "@supabase/supabase-js";

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

export function getServiceSupabaseClient(): SupabaseClient<any, any> {
  const url = normalizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error("Supabase service role client is not configured");
  }

  return createClient(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }) as SupabaseClient<any, any>;
}

export async function getServerUser(): Promise<{
  user: { id: string } | null;
  client: SupabaseClient<any, any>;
}> {
  const url = normalizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Supabase server client is not configured");
  }

  const client = createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }) as SupabaseClient<any, any>;

  // For now, return null user; client-side auth will handle redirects.
  return { user: null, client };
}


