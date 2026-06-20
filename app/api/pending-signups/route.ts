import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const getSupabaseAdmin = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL.");
  }

  if (!serviceRoleKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY.");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

export async function POST(req: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin();

    const body = await req.json();

    const cleanEmail = String(body.email || "")
      .trim()
      .toLowerCase();

    const cleanUsername = String(body.username || "").trim();

    if (
      !cleanEmail ||
      !cleanUsername ||
      !body.firstName ||
      !body.lastName ||
      !body.password
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required signup fields.",
        },
        { status: 400 }
      );
    }

    // Check existing approved profile
    const { data: existingProfile, error: existingProfileError } =
      await supabaseAdmin
        .from("profiles")
        .select("id")
        .or(`email.eq.${cleanEmail},username.eq.${cleanUsername}`)
        .maybeSingle();

    if (existingProfileError) {
      throw existingProfileError;
    }

    if (existingProfile) {
      return NextResponse.json(
        {
          success: false,
          error: "Account already exists.",
        },
        { status: 409 }
      );
    }

    // Check existing pending signup
    const { data: existingPending, error: existingPendingError } =
      await supabaseAdmin
        .from("pending_signups")
        .select("id")
        .eq("status", "pending")
        .or(`email.eq.${cleanEmail},username.eq.${cleanUsername}`)
        .maybeSingle();

    if (existingPendingError) {
      throw existingPendingError;
    }

    if (existingPending) {
      return NextResponse.json(
        {
          success: false,
          error: "Signup already pending.",
        },
        { status: 409 }
      );
    }

    // Insert pending signup
    const { data: pendingSignup, error: insertError } = await supabaseAdmin
      .from("pending_signups")
      .insert({
        first_name: body.firstName,
        last_name: body.lastName,
        username: cleanUsername,
        email: cleanEmail,
        phone: body.phone || null,
        password_hash: body.password,
        role: "member",
        status: "pending",
        language_preference: body.languagePreference || "en",
      })
      .select(
        `
        id,
        first_name,
        last_name,
        username,
        email,
        phone,
        language_preference
      `
      )
      .single();

    if (insertError) {
      throw insertError;
    }

    return NextResponse.json({
      success: true,
      pendingSignup,
    });
  } catch (error: unknown) {
    console.error("pending-signups error:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unknown error occurred";

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}