import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { getSupabaseServerClient } from "@/lib/supabase";
import AdminDashboard from "@/components/AdminDashboard";
import { Lead } from "@/types/lead";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Ethixweb India",
  description: "Secure lead management portal for Ethixweb India administrators.",
};

export default async function AdminPage() {
  // 1. Server-side session verification via cookies
  const supabaseAuth = await createServerSupabaseClient();
  const {
    data: { user },
    error: authError,
  } = await supabaseAuth.auth.getUser();

  // 2. Strict redirection if unauthenticated (Never rely on UI hiding)
  if (authError || !user) {
    redirect("/admin/login");
  }

  // 3. Fetch initial leads securely on the server
  let initialLeads: Lead[] = [];
  try {
    const supabase = getSupabaseServerClient();
    const { data, error: dbError } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (!dbError && data) {
      initialLeads = data as Lead[];
    }
  } catch (err) {
    console.error("[AdminPage] Error fetching leads:", err);
  }

  return (
    <div className="w-full bg-slate-50/40 min-h-[calc(100vh-160px)]">
      <AdminDashboard
        initialLeads={initialLeads}
        adminEmail={user.email || "admin@ethixweb.in"}
      />
    </div>
  );
}
