import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const getSupabaseAdmin = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL.");
  if (!serviceRoleKey) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY.");

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

export async function GET() {
  try {
    const supabaseAdmin = getSupabaseAdmin();

    const { data: profiles, error: profilesError } = await supabaseAdmin
      .from("profiles")
      .select(
        `
        id,
        first_name,
        last_name,
        username,
        email,
        phone,
        role,
        gender,
        pronouns,
        dob,
        city,
        country,
        sexual_orientation,
        occupation,
        race,
        nationality,
        profile_picture,
        is_approved,
        account_status,
        created_at,
        updated_at,
        language_preference
      `
      )
      .order("created_at", { ascending: false });

    if (profilesError) throw profilesError;

    const { data: pendingSignups, error: pendingError } = await supabaseAdmin
      .from("pending_signups")
      .select(
        `
        id,
        first_name,
        last_name,
        username,
        email,
        phone,
        role,
        gender,
        pronouns,
        dob,
        sexual_orientation,
        occupation,
        profile_picture,
        status,
        denial_reason,
        reviewed_at,
        created_at,
        updated_at,
        language_preference
      `
      )
      .eq("status", "pending")
      .order("created_at", { ascending: false });

    if (pendingError) throw pendingError;

    const profileUsers =
      profiles?.map((profile) => ({
        id: profile.id,
        profileId: profile.id,
        source: "profile",
        firstName: profile.first_name,
        lastName: profile.last_name,
        username: profile.username,
        email: profile.email,
        phone: profile.phone || "",
        status:
          profile.account_status === "suspended" ? "suspended" : "active",
        role: profile.role || "member",
        gender: profile.gender || "",
        pronouns: profile.pronouns || "",
        dob: profile.dob || "",
        city: profile.city || "",
        country: profile.country || "",
        sexualOrientation: profile.sexual_orientation || "",
        occupation: profile.occupation || "",
        race: profile.race || "",
        nationality: profile.nationality || "",
        profilePicture: profile.profile_picture || "",
        isApproved: !!profile.is_approved,
        language_preference: profile.language_preference || "en",
        createdAt: profile.created_at,
        reviewedAt: null,
        denialReason: null,
        eventsCount: 0,
        formsCount: 0,
        events: [],
        formResponses: [],
      })) || [];

    const pendingUsers =
      pendingSignups?.map((pending) => ({
        id: pending.id,
        pendingSignupId: pending.id,
        source: "pending_signup",
        firstName: pending.first_name,
        lastName: pending.last_name,
        username: pending.username,
        email: pending.email,
        phone: pending.phone || "",
        status: "pending",
        role: pending.role || "member",
        gender: pending.gender || "",
        pronouns: pending.pronouns || "",
        dob: pending.dob || "",
        sexualOrientation: pending.sexual_orientation || "",
        occupation: pending.occupation || "",
        profilePicture: pending.profile_picture || "",
        isApproved: false,
        language_preference: pending.language_preference || "en",
        createdAt: pending.created_at,
        reviewedAt: pending.reviewed_at,
        denialReason: pending.denial_reason,
        eventsCount: 0,
        formsCount: 0,
        events: [],
        formResponses: [],
      })) || [];

    return NextResponse.json({
      success: true,
      users: [...pendingUsers, ...profileUsers],
    });
  } catch (error) {
    console.error("admin/users error:", error);

    const message =
      error instanceof Error ? error.message : "Failed to load users.";

    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 500 }
    );
  }
}