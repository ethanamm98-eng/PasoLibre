import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const getTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("Missing SMTP configuration.");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const pendingSignupId = String(body.pendingSignupId || "").trim();
    const email = String(body.email || "")
      .trim()
      .toLowerCase();
    const firstName = String(body.firstName || "").trim();
    const lastName = String(body.lastName || "").trim();
    const username = String(body.username || "").trim();
    const phone = body.phone ? String(body.phone).trim() : "";

    if (!pendingSignupId || !email || !firstName || !lastName || !username) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const adminDashboardUrl = `${siteUrl}/account-manager`;

    const logoUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/email-assets/logo-title.png`;

    const html = `
      <div style="margin:0;padding:0;background-color:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f3f4f6;">
          <tr>
            <td align="center" style="padding:40px 20px;">
              <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.08);">
                <tr>
                  <td style="padding:30px 40px;text-align:center;background:linear-gradient(90deg,#3b82f6,#1d4ed8);">
                    <img src="${logoUrl}" alt="Paso Libre" width="320" style="display:block;margin:0 auto;height:auto;">
                    <p style="margin:6px 0 0;font-size:12px;color:#dbeafe;">
                      New Account Sign-Up Request
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:32px 40px;">
                    <h2 style="margin:0 0 12px;font-size:20px;font-weight:700;color:#111827;">
                      A new member wants to join!
                    </h2>

                    <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#4b5563;">
                      A user has submitted a request to create a new Paso Libre account.
                      Review their information below and approve or follow up as needed.
                    </p>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f9fafb;border-radius:12px;padding:16px;">
                      <tr>
                        <td style="padding:6px 0;font-size:13px;color:#374151;">
                          <strong>First Name:</strong> ${escapeHtml(firstName)}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:13px;color:#374151;">
                          <strong>Last Name:</strong> ${escapeHtml(lastName)}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:13px;color:#374151;">
                          <strong>Username:</strong> ${escapeHtml(username)}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:13px;color:#374151;">
                          <strong>Email:</strong> ${escapeHtml(email)}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:13px;color:#374151;">
                          <strong>Phone:</strong> ${escapeHtml(
                            phone || "Not provided"
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:13px;color:#374151;">
                          <strong>Pending Signup ID:</strong> ${escapeHtml(
                            pendingSignupId
                          )}
                        </td>
                      </tr>
                    </table>

                    <div style="text-align:center;margin-top:28px;">
                      <a href="${adminDashboardUrl}" target="_blank"
                        style="display:inline-block;padding:14px 36px;background:linear-gradient(90deg,#3b82f6,#1d4ed8);color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;border-radius:10px;">
                        Review Request
                      </a>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style="padding:24px 40px;text-align:center;background-color:#f3f4f6;border-top:1px solid #e5e7eb;">
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

    const transporter = getTransporter();

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || "Paso Libre <team@pasolibre.org>",
      to: process.env.ADMIN_APPROVAL_EMAIL || "ethan.a.mm98@gmail.com",
      subject: `New User Pending Approval: ${firstName} ${lastName}`,
      html,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("notify-admin error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Server error",
      },
      { status: 500 }
    );
  }
}
