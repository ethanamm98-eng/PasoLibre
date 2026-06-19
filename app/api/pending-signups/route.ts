import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
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
        { success: false, error: "Missing required signup fields." },
        { status: 400 }
      );
    }

    // check existing profile
    const { data: existingProfile } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .or(`email.eq.${cleanEmail},username.eq.${cleanUsername}`)
      .maybeSingle();

    if (existingProfile) {
      return NextResponse.json(
        { success: false, error: "Account already exists." },
        { status: 409 }
      );
    }

    // check pending signup
    const { data: existingPending } = await supabaseAdmin
      .from("pending_signups")
      .select("id")
      .eq("status", "pending")
      .or(`email.eq.${cleanEmail},username.eq.${cleanUsername}`)
      .maybeSingle();

    if (existingPending) {
      return NextResponse.json(
        { success: false, error: "Signup already pending." },
        { status: 409 }
      );
    }

    // insert pending signup
    const { data: pendingSignup, error } = await supabaseAdmin
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
        "id, first_name, last_name, username, email, phone, language_preference"
      )
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      pendingSignup,
    });
  } catch (error: unknown) {
    console.error("pending-signups error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
