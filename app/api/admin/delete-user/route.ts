import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
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

    await supabaseAdmin
      .from("pending_signups")
      .delete()
      .eq("email", profile.email);

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

    return NextResponse.json(
      {
        success: false,
        message:
          (error as { message?: string })?.message || "Unable to delete user.",
      },
      { status: 500 }
    );
  }
}
