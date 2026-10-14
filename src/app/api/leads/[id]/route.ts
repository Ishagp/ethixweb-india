import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase";
import { createServerSupabaseClient } from "@/lib/supabase-server";

const VALID_STATUSES = ["new", "contacted", "in_progress", "closed"] as const;

/**
 * PATCH /api/leads/[id]
 * Updates lead status. Protected: Requires authenticated admin session.
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // 1. Verify authenticated admin
    const supabaseAuth = await createServerSupabaseClient();
    const {
      data: { user },
      error: authError,
    } = await supabaseAuth.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized. Admin credentials required." },
        { status: 401 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: "Database not configured." },
        { status: 503 }
      );
    }

    // 2. Parse body
    const body = await request.json().catch(() => null);
    if (!body || typeof body.status !== "string") {
      return NextResponse.json(
        { error: "Invalid payload. 'status' is required." },
        { status: 400 }
      );
    }

    const { status } = body;
    if (!VALID_STATUSES.includes(status as (typeof VALID_STATUSES)[number])) {
      return NextResponse.json(
        {
          error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}`,
        },
        { status: 422 }
      );
    }

    // 3. Update in Supabase
    const supabase = getSupabaseServerClient();
    const { data: updatedLead, error: updateError } = await supabase
      .from("leads")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      console.error("[PATCH /api/leads/[id]] Database Error:", updateError);
      return NextResponse.json(
        { error: "Failed to update lead status." },
        { status: 500 }
      );
    }

    if (!updatedLead) {
      return NextResponse.json(
        { error: "Lead not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Lead status updated successfully.",
      data: updatedLead,
    });
  } catch (err) {
    console.error("[PATCH /api/leads/[id]] Server Error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

/**
 * GET /api/leads/[id]
 * Retrieve single lead by ID. Protected: Requires authenticated admin session.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const supabaseAuth = await createServerSupabaseClient();
    const {
      data: { user },
      error: authError,
    } = await supabaseAuth.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized. Admin credentials required." },
        { status: 401 }
      );
    }

    const supabase = getSupabaseServerClient();
    const { data: lead, error: fetchError } = await supabase
      .from("leads")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !lead) {
      return NextResponse.json(
        { error: "Lead not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: lead,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
