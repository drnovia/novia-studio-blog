import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

// Call at the top of every admin page and Server Action; proxy.ts alone is not authorization.
export async function requireAdmin() {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) redirect("/admin/login");

  const { data: isAdmin, error } = await supabase.rpc("is_admin");
  if (error || !isAdmin) redirect("/admin/login");

  return { supabase, email: data.claims.email ?? "" };
}
