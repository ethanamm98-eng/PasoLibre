import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../lib/supabase/supabaseAdmin";

export async function POST(req: Request) {
  const supabaseAdmin = getSupabaseAdmin();
  
  try {
    const body = await req.json();
    const profileId = String(body.profileId || "").trim();

    if (!profileId) {
      return NextResponse.json(
        { success: false, message: "profileId is required." },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from("profiles")
      .update({
        account_status: "suspended",
      })
      .eq("id", profileId);

    if (error) throw error;

    return NextResponse.json(
      {
        success: true,
        message: "User suspended.",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("suspend-user error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to suspend user.",
      },
      { status: 500 }
    );
  }
}
