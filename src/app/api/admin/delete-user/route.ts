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

    const { profileId } = await req.json();

    if (!profileId) {
      return NextResponse.json(
        { success: false, message: "Missing profileId." },
        { status: 400 }
      );
    }

    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("id, email, role")
      .eq("id", profileId)
      .maybeSingle();

    if (profileError) throw profileError;

    if (!profile) {
      return NextResponse.json(
        { success: false, message: "Profile not found." },
        { status: 404 }
      );
    }

    if (profile.role === "super_admin") {
      return NextResponse.json(
        { success: false, message: "Super admin accounts cannot be deleted." },
        { status: 403 }
      );
    }

    await supabaseAdmin
      .from("user_approval_audit")
      .update({ profile_id: null })
      .eq("profile_id", profile.id);

    if (profile.email) {
      await supabaseAdmin
        .from("pending_signups")
        .delete()
        .eq("email", profile.email);
    }

    const { error: deleteProfileError } = await supabaseAdmin
      .from("profiles")
      .delete()
      .eq("id", profile.id);

    if (deleteProfileError) throw deleteProfileError;

    const { error: deleteAuthError } =
      await supabaseAdmin.auth.admin.deleteUser(profile.id);

    if (deleteAuthError) throw deleteAuthError;

    return NextResponse.json({
      success: true,
      message: "User permanently deleted.",
    });
  } catch (error: unknown) {
    console.error("delete-user error:", error);

    const message =
      error instanceof Error ? error.message : "Unable to delete user.";

    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 500 }
    );
  }
}