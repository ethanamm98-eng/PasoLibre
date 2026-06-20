import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY.");
  }

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
    const resend = getResend();

    const body = await req.json();

    const pendingSignupId = String(body.pendingSignupId || "").trim();
    const email = String(body.email || "")
      .trim()
      .toLowerCase();
    const firstName = String(body.firstName || "").trim();
    const lastName = String(body.lastName || "").trim();
    const username = String(body.username || "").trim();
    const phone = body.phone ? String(body.phone).trim() : "";
    const language = String(body.languagePreference || "en")
      .trim()
      .toLowerCase();

    const isSpanish = language === "es";

    const copy = {
      missingFields: isSpanish
        ? "Faltan campos requeridos."
        : "Missing required fields.",
      missingResendKey: isSpanish
        ? "Falta RESEND_API_KEY."
        : "Missing RESEND_API_KEY.",
      banner: isSpanish
        ? "Nueva solicitud de creación de cuenta"
        : "New Account Sign-Up Request",
      title: isSpanish
        ? "¡Una nueva persona quiere unirse!"
        : "A new member wants to join!",
      intro: isSpanish
        ? "Una persona ha enviado una solicitud para crear una cuenta de Paso Libre. Revisa su información a continuación y aprueba o da seguimiento según sea necesario."
        : "A user has submitted a request to create a new Paso Libre account. Review their information below and approve or follow up as needed.",
      firstName: isSpanish ? "Nombre" : "First Name",
      lastName: isSpanish ? "Apellido" : "Last Name",
      username: isSpanish ? "Nombre de usuario" : "Username",
      email: isSpanish ? "Correo electrónico" : "Email",
      phone: isSpanish ? "Teléfono" : "Phone",
      notProvided: isSpanish ? "No provisto" : "Not provided",
      pendingSignupId: isSpanish
        ? "ID de solicitud pendiente"
        : "Pending Signup ID",
      reviewButton: isSpanish ? "Revisar solicitud" : "Review Request",
      footer: isSpanish
        ? "Este mensaje fue generado automáticamente desde Paso Libre."
        : "This message was generated automatically from Paso Libre.",
      rights: isSpanish ? "Todos los derechos reservados." : "All rights reserved.",
      subject: isSpanish
        ? `Nueva persona pendiente de aprobación: ${firstName} ${lastName}`
        : `New User Pending Approval: ${firstName} ${lastName}`,
      failedSend: isSpanish
        ? "No se pudo enviar la notificación al administrador."
        : "Failed to send admin notification.",
      unableSend: isSpanish
        ? "No se pudo enviar la notificación al administrador."
        : "Unable to send admin notification.",
    };

    if (!pendingSignupId || !email || !firstName || !lastName || !username) {
      return NextResponse.json(
        {
          success: false,
          message: copy.missingFields,
        },
        { status: 400 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl) {
      throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL.");
    }

    const adminDashboardUrl = `${siteUrl}/account-manager`;

    const logoUrl = `${supabaseUrl}/storage/v1/object/public/email-assets/logo-title_nobg.png`;

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
                      ${copy.banner}
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:32px 40px;">
                    <h2 style="margin:0 0 12px;font-size:20px;font-weight:700;color:#111827;">
                      ${copy.title}
                    </h2>

                    <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#4b5563;">
                      ${copy.intro}
                    </p>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f9fafb;border-radius:12px;padding:16px;">
                      <tr>
                        <td style="padding:6px 0;font-size:13px;color:#374151;">
                          <strong>${copy.firstName}:</strong> ${escapeHtml(firstName)}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:13px;color:#374151;">
                          <strong>${copy.lastName}:</strong> ${escapeHtml(lastName)}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:13px;color:#374151;">
                          <strong>${copy.username}:</strong> ${escapeHtml(username)}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:13px;color:#374151;">
                          <strong>${copy.email}:</strong> ${escapeHtml(email)}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:13px;color:#374151;">
                          <strong>${copy.phone}:</strong> ${escapeHtml(
                            phone || copy.notProvided
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:13px;color:#374151;">
                          <strong>${copy.pendingSignupId}:</strong> ${escapeHtml(
                            pendingSignupId
                          )}
                        </td>
                      </tr>
                    </table>

                    <div style="text-align:center;margin-top:28px;">
                      <a href="${adminDashboardUrl}" target="_blank"
                        style="display:inline-block;padding:14px 36px;background:linear-gradient(90deg,#3b82f6,#1d4ed8);color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;border-radius:10px;">
                        ${copy.reviewButton}
                      </a>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style="padding:24px 40px;text-align:center;background-color:#f3f4f6;border-top:1px solid #e5e7eb;">
                    <p style="margin:0;font-size:11px;color:#6b7280;">
                      ${copy.footer}
                    </p>
                    <p style="margin:6px 0 0;font-size:11px;color:#6b7280;">
                      © ${new Date().getFullYear()} Paso Libre. ${copy.rights}
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
      to: process.env.ADMIN_APPROVAL_EMAIL || "ethan.a.mm98@gmail.com",
      subject: copy.subject,
      html,
    });

    if (error) {
      throw new Error(error.message || copy.failedSend);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("notify-admin error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          (error instanceof Error && error.message) ||
          "Unable to send admin notification.",
      },
      { status: 500 }
    );
  }
}