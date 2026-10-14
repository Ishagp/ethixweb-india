import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { checkRateLimit } from "@/lib/rate-limit";

// Maximum allowable JSON payload length in characters (~20 KB)
const MAX_PAYLOAD_LENGTH = 20 * 1024;

// Email RFC 5322 simplified pattern
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

interface LeadPayload {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  service?: unknown;
  message?: unknown;
  website_honeypot?: unknown; // Anti-bot honeypot field
}

/**
 * GET /api/leads
 * Protected endpoint: Strictly requires an authenticated admin session via Supabase Auth cookies.
 */
export async function GET() {
  try {
    const supabaseAuthClient = await createServerSupabaseClient();
    const {
      data: { user },
      error: authError,
    } = await supabaseAuthClient.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized. Admin authentication required." },
        { status: 401 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: "Database not configured." },
        { status: 503 }
      );
    }

    // Fetch leads ordered by newest first
    const supabase = getSupabaseServerClient();
    const { data: leads, error: dbError } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (dbError) {
      console.error("[GET /api/leads] Database Error:", dbError);
      return NextResponse.json(
        { error: "Failed to retrieve leads." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: leads || [],
    });
  } catch (err) {
    console.error("[GET /api/leads] Server Error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

/**
 * POST /api/leads
 * Public endpoint: Used by the website contact form to submit inquiries.
 */
export async function POST(request: NextRequest) {
  // 1. Client IP Identification & Rate Limiting
  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

  // Rate limit: Max 5 submissions per minute per IP
  const rateLimitResult = checkRateLimit(`leads_${clientIp}`, 5, 60 * 1000);
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      {
        error: "Too many requests. Please wait a moment before submitting another inquiry.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": "60",
        },
      }
    );
  }

  // 2. Parse and Validate Raw Payload Size
  let rawBodyText: string;
  try {
    rawBodyText = await request.text();
  } catch {
    return NextResponse.json(
      { error: "Unable to read request payload." },
      { status: 400 }
    );
  }

  if (rawBodyText.length > MAX_PAYLOAD_LENGTH) {
    return NextResponse.json(
      { error: "Request payload exceeds maximum allowed size (20KB)." },
      { status: 413 }
    );
  }

  let body: LeadPayload;
  try {
    body = JSON.parse(rawBodyText);
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON format in request." },
      { status: 400 }
    );
  }

  // 3. Anti-bot Mechanism: Honeypot Check
  if (body.website_honeypot && String(body.website_honeypot).trim() !== "") {
    return NextResponse.json({
      success: true,
      message: "Inquiry received.",
    });
  }

  // 4. Strict Server-Side Field Validation
  const errors: Record<string, string> = {};

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const service = typeof body.service === "string" ? body.service.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  // Validate Name (2 - 120 chars)
  if (!name) {
    errors.name = "Full name is required.";
  } else if (name.length < 2 || name.length > 120) {
    errors.name = "Name must be between 2 and 120 characters.";
  }

  // Validate Email (valid format, max 255 chars)
  if (!email) {
    errors.email = "Business email is required.";
  } else if (email.length > 255 || !EMAIL_REGEX.test(email)) {
    errors.email = "Please provide a valid email address.";
  }

  // Validate Company (2 - 160 chars)
  if (!company) {
    errors.company = "Company name is required.";
  } else if (company.length < 2 || company.length > 160) {
    errors.company = "Company name must be between 2 and 160 characters.";
  }

  // Validate Service (max 120 chars)
  if (!service) {
    errors.service = "Please select a required service.";
  } else if (service.length > 120) {
    errors.service = "Selected service value is invalid.";
  }

  // Validate Message (15 - 5000 chars)
  if (!message) {
    errors.message = "Project message is required.";
  } else if (message.length < 15) {
    errors.message = "Project message must contain at least 15 characters.";
  } else if (message.length > 5000) {
    errors.message = "Project message exceeds maximum length of 5000 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      {
        error: "Validation failed. Please verify the submitted information.",
        details: errors,
      },
      { status: 422 }
    );
  }

  // 5. Store in Supabase PostgreSQL
  try {
    if (!isSupabaseConfigured()) {
      console.warn(
        "[API /api/leads] Supabase credentials not configured in environment."
      );
      return NextResponse.json(
        {
          error:
            "Database service is currently unconfigured. Please configure NEXT_PUBLIC_SUPABASE_URL and keys.",
        },
        { status: 503 }
      );
    }

    const supabase = getSupabaseServerClient();
    const { data, error: dbError } = await supabase
      .from("leads")
      .insert([
        {
          name,
          email,
          company,
          service,
          message,
          status: "new",
        },
      ])
      .select("id, created_at")
      .single();

    if (dbError) {
      console.error("[API /api/leads] Supabase Insert Error:", dbError);
      return NextResponse.json(
        {
          error:
            "An error occurred while saving your inquiry. Please try again or reach out directly at contact@ethixweb.com.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out. Your inquiry has been received.",
        leadId: data?.id,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[API /api/leads] Unexpected Server Error:", err);
    return NextResponse.json(
      {
        error: "Internal server error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
