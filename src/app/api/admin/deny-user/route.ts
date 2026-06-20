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

async function sendDeniedEmail({
  email,
  firstName,
  reason,
}: {
  email: string;
  firstName: string;
  reason?: string;
}) {
  const resend = getResend();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const contactUrl = `${siteUrl}/contact`;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL.");

  const logoUrl = `${supabaseUrl}/storage/v1/object/public/email-assets/logo-title_nobg.png`;

  const html = `
    <div style="margin:0;padding:0;background-color:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f3f4f6;">
        <tr>
          <td align="center" style="padding:40px 20px;">
            <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,.08);">
              <tr>
                <td style="padding:30px 40px;text-align:center;background:linear-gradient(90deg,#3b82f6,#1d4ed8);">
                  <img src="${logoUrl}" alt="Paso Libre" width="320" style="display:block;margin:0 auto;height:auto;">
                  <p style="margin:10px 0 0;font-size:12px;color:#dbeafe;">Account Request Update</p>
                </td>
              </tr>

              <tr>
                <td style="padding:32px 40px;">
                  <h2 style="margin:0 0 12px;font-size:22px;font-weight:700;color:#111827;">
                    Account request not approved
                  </h2>

                  <p style="margin:0 0 18px;font-size:14px;line-height:1.6;color:#4b5563;">
                    Hi ${escapeHtml(firstName)},
                  </p>

                  <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#4b5563;">
                    Thank you for your interest in joining <strong>Paso Libre</strong>.
                    After reviewing your request, we’re unable to approve the account at this time.
                  </p>

                  ${
                    reason
                      ? `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f9fafb;border-radius:12px;padding:16px;margin-bottom:24px;">
                          <tr>
                            <td style="padding:6px 0;font-size:13px;color:#374151;">
                              <strong>Reason:</strong> ${escapeHtml(reason)}
                            </td>
                          </tr>
                        </table>`
                      : ""
                  }

                  <p style="margin:0 0 26px;font-size:14px;line-height:1.6;color:#4b5563;">
                    If you believe this was a mistake or would like to follow up, you can contact us.
                  </p>

                  <div style="text-align:center;">
                    <a href="${contactUrl}" target="_blank"
                      style="display:inline-block;padding:14px 40px;background:linear-gradient(90deg,#3b82f6,#1d4ed8);color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;border-radius:10px;">
                      Contact Paso Libre
                    </a>
                  </div>
                </td>
              </tr>

              <tr>
                <td style="padding:24px 40px;text-align:center;background:#f3f4f6;border-top:1px solid #e5e7eb;">
                  <p style="margin:0;font-size:11px;color:#6b7280;">
                    This message was generated automatically from Paso Libre.
                  </p>
                  <p style="margin:6px 0 0;font-size:11px;color:#6b7280;">
                    © ${new Date().getFullYear()} Paso Libre. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM || "Paso Libre <team@pasolibre.org>",
    to: email,
    subject: "Your Paso Libre Account Request",
    html,
  });

  if (error) throw new Error(error.message || "Failed to send denial email.");
}

export async function POST(req: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin();

    const body = await req.json();

    const pendingSignupId = String(body.pendingSignupId || "").trim();
    const reason = String(body.reason || "").trim();

    if (!pendingSignupId) {
      return NextResponse.json(
        { success: false, message: "Missing pendingSignupId." },
        { status: 400 }
      );
    }

    const { data: pendingSignup, error: findError } = await supabaseAdmin
      .from("pending_signups")
      .select("*")
      .eq("id", pendingSignupId)
      .eq("status", "pending")
      .maybeSingle();

    if (findError) throw findError;

    if (!pendingSignup) {
      return NextResponse.json(
        {
          success: false,
          message: "Pending signup not found or already reviewed.",
        },
        { status: 404 }
      );
    }

    const { error: updateError } = await supabaseAdmin
      .from("pending_signups")
      .update({
        status: "denied",
        denial_reason: reason || null,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", pendingSignup.id);

    if (updateError) throw updateError;

    await supabaseAdmin.from("user_approval_audit").insert({
      pending_signup_id: pendingSignup.id,
      action: "denied",
      note: reason || null,
    });

    await sendDeniedEmail({
      email: pendingSignup.email,
      firstName: pendingSignup.first_name || "there",
      reason,
    });

    return NextResponse.json({
      success: true,
      message: "Signup request denied and user notified.",
    });
  } catch (error: unknown) {
    console.error("deny-user error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Unable to deny signup request.";

    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 500 }
    );
  }
}