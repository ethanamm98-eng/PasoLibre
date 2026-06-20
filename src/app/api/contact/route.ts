import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

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

const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) throw new Error("Missing RESEND_API_KEY.");

  return new Resend(apiKey);
};

const escapeHtml = (value: string) =>
  String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

export async function POST(req: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const resend = getResend();

    const body = await req.json();

    const firstName = String(body.firstName || "").trim();
    const lastName = String(body.lastName || "").trim();
    const phone = String(body.phone || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const subject = String(body.subject || "").trim();
    const message = String(body.message || "").trim();

    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    const { error: insertError } = await supabaseAdmin
      .from("contact_messages")
      .insert({
        first_name: firstName,
        last_name: lastName,
        phone: phone || null,
        email,
        subject,
        message,
      });

    if (insertError) throw insertError;

    const adminEmail =
      process.env.ADMIN_CONTACT_EMAIL || "ethan.a.mm98@gmail.com";

    const safeFirstName = escapeHtml(firstName);
    const safeLastName = escapeHtml(lastName);
    const safePhone = escapeHtml(phone || "Not provided");
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message);

    const { error: emailError } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "Paso Libre <questions@pasolibre.org>",
      to: adminEmail,
      replyTo: email,
      subject: `New Contact Message: ${subject}`,
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#f3f4f6;padding:32px;">
          <div style="max-width:620px;margin:0 auto;background:white;border-radius:18px;overflow:hidden;box-shadow:0 14px 40px rgba(15,23,42,0.12);">
            <div style="background:linear-gradient(90deg,#3b82f6,#1d4ed8);padding:28px 36px;text-align:center;color:white;">
              <h2 style="margin:0;font-size:22px;">New Contact Form Message</h2>
              <p style="margin:8px 0 0;color:#dbeafe;font-size:13px;">Paso Libre Website</p>
            </div>

            <div style="padding:30px 36px;color:#111827;">
              <p><strong>Name:</strong> ${safeFirstName} ${safeLastName}</p>
              <p><strong>Email:</strong> ${safeEmail}</p>
              <p><strong>Phone:</strong> ${safePhone}</p>
              <p><strong>Subject:</strong> ${safeSubject}</p>

              <div style="margin-top:22px;padding:18px;background:#f9fafb;border-radius:14px;border:1px solid #e5e7eb;">
                <p style="margin:0;white-space:pre-line;line-height:1.6;color:#374151;">${safeMessage}</p>
              </div>
            </div>
          </div>
        </div>
      `,
    });

    if (emailError) {
      throw new Error(emailError.message || "Failed to send email.");
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error: unknown) {
    console.error("contact route error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Unable to send message.",
      },
      { status: 500 }
    );
  }
}