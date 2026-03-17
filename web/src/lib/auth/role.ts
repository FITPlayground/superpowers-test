import { getServiceSupabaseClient } from "@/lib/supabase/server";

export type UserRole = "client" | "admin" | null;

export async function getUserRole(userId: string | undefined): Promise<UserRole> {
  if (!userId) return null;

  const supabase = getServiceSupabaseClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  const role = data.role as string | null;
  if (role === "admin" || role === "client") return role;
  return null;
}

