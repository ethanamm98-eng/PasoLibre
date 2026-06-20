// app/api/notify-user/route.ts
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

    const email = String(body.email || "")
      .trim()
      .toLowerCase();

    const firstName = String(body.firstName || "").trim();

    const languagePreference = String(body.languagePreference || "en")
      .trim()
      .toLowerCase();

    if (!email || !firstName) {
      return NextResponse.json(
        { success: false, message: "Missing email or firstName." },
        { status: 400 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (!supabaseUrl) {
      throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL.");
    }

    const loginUrl = `${siteUrl}/login`;
    const logoUrl = `${supabaseUrl}/storage/v1/object/public/email-assets/logo-title_nobg.png`;

    const isSpanish = languagePreference === "es";

    const copy = {
      subject: isSpanish
        ? "Tu cuenta de Paso Libre ha sido aprobada"
        : "Your Paso Libre Account Has Been Approved",

      banner: isSpanish
        ? "Tu cuenta ha sido aprobada"
        : "Your Account Has Been Approved",

      title: isSpanish
        ? "¡Bienvenido(a) a Paso Libre!"
        : "Welcome to Paso Libre!",

      greeting: isSpanish
        ? `Hola ${escapeHtml(firstName)},`
        : `Hi ${escapeHtml(firstName)},`,

      approvalMessage: isSpanish
        ? `Excelentes noticias: tu solicitud para unirte a <strong>Paso Libre</strong> ha sido aprobada.
       Tu cuenta ya está activa y lista para usar.`
        : `Great news — your request to join <strong>Paso Libre</strong> has been approved.
       Your account is now active and ready to use.`,

      accountEmail: isSpanish ? "Correo electrónico" : "Account Email",

      status: isSpanish ? "Estado" : "Status",

      active: isSpanish ? "Activo" : "Active",

      loginMessage: isSpanish
        ? "Haz clic en el botón a continuación para iniciar sesión y comenzar a explorar tu cuenta."
        : "Click the button below to sign in and start exploring your dashboard.",

      loginButton: isSpanish
        ? "Iniciar sesión en Paso Libre"
        : "Sign In to Paso Libre",

      footer: isSpanish
        ? "Si tienes alguna pregunta, simplemente responde a este correo electrónico. Estaremos encantados de ayudarte."
        : "If you have any questions, just reply to this email — we’re happy to help.",

      rights: isSpanish ? "Todos los derechos reservados." : "All rights reserved.",

      failedSend: isSpanish
        ? "No se pudo enviar el correo de aprobación."
        : "Failed to send approval email.",

      unableSend: isSpanish
        ? "No se pudo enviar el correo de aprobación."
        : "Unable to send approval email.",
    };

    const html = `
  <div style="margin:0;padding:0;background-color:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f3f4f6;">
      <tr>
        <td align="center" style="padding:40px 20px;">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.08);">
            <tr>
              <td style="padding:30px 40px;text-align:center;background:linear-gradient(90deg,#3b82f6,#1d4ed8);">
                <img src="${logoUrl}" alt="Paso Libre" width="320" style="display:block;margin:0 auto;height:auto;">
                <p style="margin:10px 0 0;font-size:12px;color:#dbeafe;">
                  ${copy.banner}
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:32px 40px;">
                <h2 style="margin:0 0 12px;font-size:22px;font-weight:700;color:#111827;">
                  ${copy.title}
                </h2>

                <p style="margin:0 0 18px;font-size:14px;line-height:1.6;color:#4b5563;">
                  ${copy.greeting}
                </p>

                <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#4b5563;">
                  ${copy.approvalMessage}
                </p>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f9fafb;border-radius:12px;padding:16px;margin-bottom:24px;">
                  <tr>
                    <td style="padding:6px 0;font-size:13px;color:#374151;">
                      <strong>${copy.accountEmail}:</strong> ${escapeHtml(email)}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;font-size:13px;color:#374151;">
                      <strong>${copy.status}:</strong> ${copy.active}
                    </td>
                  </tr>
                </table>

                <p style="margin:0 0 26px;font-size:14px;line-height:1.6;color:#4b5563;">
                  ${copy.loginMessage}
                </p>

                <div style="text-align:center;">
                  <a href="${loginUrl}" target="_blank"
                    style="display:inline-block;padding:14px 40px;background:linear-gradient(90deg,#3b82f6,#1d4ed8);color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;border-radius:10px;">
                    ${copy.loginButton}
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
      to: email,
      subject: copy.subject,
      html,
    });

    if (error) {
      console.error("Error sending approval email:", error);

      return NextResponse.json(
        { success: false, message: copy.failedSend },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Approval email sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("notify-user error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          (error instanceof Error && error.message) ||
          "Unable to send approval email.",
      },
      { status: 500 }
    );
  }
}