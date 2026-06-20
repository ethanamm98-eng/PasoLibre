import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSupabaseAdmin } from "../../lib/supabase/supabaseAdmin";

export async function POST(req: Request) {
  const supabaseAdmin = getSupabaseAdmin();
  
  try {
    const body = await req.json();

    const {
      firstName,
      lastName,
      username,
      email,
      phone,
      password,
      confirmPassword,
      languagePreference, // add it
    } = body as {
      firstName: string;
      lastName: string;
      username: string;
      email: string;
      phone?: string | null;
      password: string;
      confirmPassword: string;
      languagePreference?: string;
    };

    const cleanFirstName = String(firstName || "").trim();
    const cleanLastName = String(lastName || "").trim();
    const cleanUsername = String(username || "").trim();
    const cleanEmail = String(email || "")
      .trim()
      .toLowerCase();
    const cleanPhone = phone ? String(phone).trim() : null;

    if (
      !cleanFirstName ||
      !cleanLastName ||
      !cleanUsername ||
      !cleanEmail ||
      !password ||
      !confirmPassword
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required fields.",
        },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email address.",
        },
        { status: 400 }
      );
    }

    if (!/^[a-zA-Z0-9._-]+$/.test(cleanUsername) || cleanUsername.length < 3) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Username must be at least 3 characters and only contain letters, numbers, dots, underscores, and hyphens.",
        },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 6 characters.",
        },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Passwords do not match.",
        },
        { status: 400 }
      );
    }

    const { data: existingProfileByEmail, error: profileEmailError } =
      await supabaseAdmin
        .from("profiles")
        .select("id, is_approved")
        .eq("email", cleanEmail)
        .maybeSingle();

    if (profileEmailError) throw profileEmailError;

    if (existingProfileByEmail) {
      return NextResponse.json(
        {
          success: false,
          code: "ACCOUNT_EXISTS",
          message: existingProfileByEmail.is_approved
            ? "An account with this email already exists."
            : "Your account is pending admin approval.",
        },
        { status: 409 }
      );
    }

    const { data: existingProfileByUsername, error: profileUsernameError } =
      await supabaseAdmin
        .from("profiles")
        .select("id")
        .eq("username", cleanUsername)
        .maybeSingle();

    if (profileUsernameError) throw profileUsernameError;

    if (existingProfileByUsername) {
      return NextResponse.json(
        {
          success: false,
          code: "USERNAME_EXISTS",
          message: "That username is already taken.",
        },
        { status: 409 }
      );
    }

    const { data: existingPendingByEmail, error: pendingEmailError } =
      await supabaseAdmin
        .from("pending_signups")
        .select("id")
        .eq("email", cleanEmail)
        .eq("status", "pending")
        .maybeSingle();

    if (pendingEmailError) throw pendingEmailError;

    if (existingPendingByEmail) {
      return NextResponse.json(
        {
          success: false,
          code: "PENDING_EXISTS",
          message: "You already have a signup request pending approval.",
        },
        { status: 409 }
      );
    }

    const { data: existingPendingByUsername, error: pendingUsernameError } =
      await supabaseAdmin
        .from("pending_signups")
        .select("id")
        .eq("username", cleanUsername)
        .eq("status", "pending")
        .maybeSingle();

    if (pendingUsernameError) throw pendingUsernameError;

    if (existingPendingByUsername) {
      return NextResponse.json(
        {
          success: false,
          code: "USERNAME_EXISTS",
          message: "That username is already taken.",
        },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const { error: insertError } = await supabaseAdmin
      .from("pending_signups")
      .insert({
        first_name: cleanFirstName,
        last_name: cleanLastName,
        username: cleanUsername,
        email: cleanEmail,
        phone: cleanPhone,
        password_hash: passwordHash,
        role: "member",
        status: "pending",
        language_preference: languagePreference || "en",
      });

    if (insertError) throw insertError;

    const notifyBase =
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const notifyResponse = await fetch(`${notifyBase}/api/notify-admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: cleanEmail,
        firstName: cleanFirstName,
        lastName: cleanLastName,
        username: cleanUsername,
        phone: cleanPhone,
      }),
    });

    let notifyJson = null;
    try {
      notifyJson = await notifyResponse.json();
    } catch {
      notifyJson = null;
    }

    if (!notifyResponse.ok) {
      throw new Error(notifyJson?.message || "Failed to notify admin.");
    }

    return NextResponse.json(
      {
        success: true,
        message: "Signup request submitted successfully.",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("signup-request error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          (error as Error)?.message || "Failed to submit signup request.",
      },
      { status: 500 }
    );
  }
}
