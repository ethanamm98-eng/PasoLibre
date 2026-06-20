// app/api/resolve-username/route.ts
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/src/app/lib/supabase/supabaseAdmin";

export async function POST(req: Request) {
  const supabaseAdmin = getSupabaseAdmin();
  
  try {
    const body = await req.json();
    const username = String(body?.username || "").trim();

    if (!username) {
      return NextResponse.json(
        { error: "Username is required." },
        { status: 400 }
      );
    }

    const { data: profile, error } = await supabaseAdmin
      .from("profiles")
      .select("email")
      .ilike("username", username)
      .maybeSingle();

    if (error) {
      console.error("Resolve username error:", error);

      return NextResponse.json(
        { error: "Unable to resolve username." },
        { status: 500 }
      );
    }

    if (!profile?.email) {
      return NextResponse.json(
        { error: "Invalid username or password." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      email: profile.email,
    });
  } catch (error) {
    console.error("Resolve username route error:", error);

    return NextResponse.json(
      { error: "Something went wrong resolving the username." },
      { status: 500 }
    );
  }
}