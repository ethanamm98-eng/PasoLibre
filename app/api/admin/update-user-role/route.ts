import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const profileId = String(body.profileId || "").trim();
    const role = String(body.role || "").trim();

    if (!profileId) {
      return NextResponse.json(
        { success: false, message: "profileId is required." },
        { status: 400 }
      );
    }

    if (!["member", "admin"].includes(role)) {
      return NextResponse.json(
        { success: false, message: "Role must be member or admin." },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from("profiles")
      .update({ role })
      .eq("id", profileId);

    if (error) throw error;

    return NextResponse.json(
      {
        success: true,
        message: "User role updated successfully.",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("update-user-role error:", error);

      return NextResponse.json(
        {
          success: false,
          message: error.message || "Failed to update role.",
        },
        { status: 500 }
      );
    }

    console.error("update-user-role error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update role.",
      },
      { status: 500 }
    );
  }
}
