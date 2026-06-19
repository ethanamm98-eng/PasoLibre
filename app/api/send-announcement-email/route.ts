import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type Recipient = {
  id?: string;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  language_preference?: string | null;
};

type Announcement = {
  id?: string;
  title?: string | null;
  title_en?: string | null;
  title_es?: string | null;
  message?: string | null;
  message_en?: string | null;
  message_es?: string | null;
  cta_label?: string | null;
  cta_label_en?: string | null;
  cta_label_es?: string | null;
  cta_url?: string | null;
  color?: string | null;
  status?: string | null;
  variant?: string | null;
};

type EmailLanguage = "en" | "es";

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const getGradient = (color?: string | null) => {
  switch (color) {
    case "indigo":
      return "linear-gradient(135deg,#4f46e5,#1e1b4b)";
    case "emerald":
      return "linear-gradient(135deg,#059669,#064e3b)";
    case "amber":
      return "linear-gradient(135deg,#d97706,#78350f)";
    case "rose":
      return "linear-gradient(135deg,#e11d48,#881337)";
    case "slate":
      return "linear-gradient(135deg,#475569,#020617)";
    default:
      return "linear-gradient(135deg,#0d4db0,#4f46e5)";
  }
};

const getLanguage = (recipient?: Recipient): EmailLanguage => {
  const preference = String(recipient?.language_preference || "")
    .trim()
    .toLowerCase();

  if (
    preference === "es" ||
    preference === "spa" ||
    preference === "spanish" ||
    preference === "español"
  ) {
    return "es";
  }

  return "en";
};

const getCopy = (language: EmailLanguage) => {
  const isSpanish = language === "es";

  return {
    missingApiKey: isSpanish
      ? "Falta la variable de entorno RESEND_API_KEY."
      : "Missing RESEND_API_KEY environment variable.",
    requiredAnnouncement: isSpanish
      ? "El título y el mensaje del anuncio son requeridos."
      : "Announcement title and message are required.",
    noRecipients: isSpanish
      ? "No se seleccionaron destinatarios de correo válidos."
      : "No valid email recipients were selected.",
    announcement: isSpanish ? "Anuncio" : "Announcement",
    updateFromPasoLibre: isSpanish
      ? "Una nueva actualización de Paso Libre"
      : "A new update from Paso Libre",
    greetingFallback: isSpanish ? "hola" : "there",
    greeting: isSpanish ? "Hola" : "Hi",
    viewAnnouncement: isSpanish ? "Ver anuncio" : "View Announcement",
    footer: isSpanish
      ? "Recibiste este correo porque eres parte de la comunidad de Paso Libre."
      : "You received this email because you are part of the Paso Libre community.",
    sentFailed: (sent: number, failed: number) =>
      isSpanish
        ? `${sent} correos enviados, ${failed} fallaron.`
        : `${sent} emails sent, ${failed} failed.`,
    sentSuccess: (sent: number) =>
      isSpanish
        ? `${sent} correos enviados correctamente.`
        : `${sent} emails sent successfully.`,
    unableToSend: isSpanish
      ? "No se pudo enviar el correo del anuncio."
      : "Unable to send announcement email.",
  };
};

const getLocalizedAnnouncementField = (
  announcement: Announcement,
  field: "title" | "message" | "cta_label",
  language: EmailLanguage
) => {
  const preferred = announcement[
    `${field}_${language}` as keyof Announcement
  ] as string | null | undefined;

  const fallback = announcement[
    `${field}_${language === "es" ? "en" : "es"}` as keyof Announcement
  ] as string | null | undefined;

  const legacy = announcement[field] as string | null | undefined;

  return preferred || fallback || legacy || "";
};

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing RESEND_API_KEY environment variable.",
          message_en: "Missing RESEND_API_KEY environment variable.",
          message_es: "Falta la variable de entorno RESEND_API_KEY.",
        },
        { status: 500 }
      );
    }

    const body = await req.json();
    const announcement: Announcement = body?.announcement;
    const recipients: Recipient[] = Array.isArray(body?.recipients)
      ? body.recipients
      : [];

    const hasTitle =
      !!announcement?.title?.trim() ||
      !!announcement?.title_en?.trim() ||
      !!announcement?.title_es?.trim();

    const hasMessage =
      !!announcement?.message?.trim() ||
      !!announcement?.message_en?.trim() ||
      !!announcement?.message_es?.trim();

    if (!hasTitle || !hasMessage) {
      return NextResponse.json(
        {
          success: false,
          message: "Announcement title and message are required.",
          message_en: "Announcement title and message are required.",
          message_es: "El título y el mensaje del anuncio son requeridos.",
        },
        { status: 400 }
      );
    }

    const validRecipients = recipients.filter((recipient) =>
      String(recipient?.email || "").includes("@")
    );

    if (validRecipients.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No valid email recipients were selected.",
          message_en: "No valid email recipients were selected.",
          message_es: "No se seleccionaron destinatarios de correo válidos.",
        },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pasolibre.org";

    const ctaUrl = announcement.cta_url
      ? announcement.cta_url.startsWith("http")
        ? announcement.cta_url
        : `${appUrl}${announcement.cta_url.startsWith("/") ? "" : "/"}${
            announcement.cta_url
          }`
      : appUrl;

    const gradient = getGradient(announcement.color);

    const results = await Promise.allSettled(
      validRecipients.map((recipient) => {
        const emailLanguage = getLanguage(recipient);
        const copy = getCopy(emailLanguage);

        const localizedTitle = getLocalizedAnnouncementField(
          announcement,
          "title",
          emailLanguage
        );

        const localizedMessage = getLocalizedAnnouncementField(
          announcement,
          "message",
          emailLanguage
        );

        const localizedCtaLabel =
          getLocalizedAnnouncementField(
            announcement,
            "cta_label",
            emailLanguage
          ) || copy.viewAnnouncement;

        const safeTitle = escapeHtml(localizedTitle.trim());
        const safeMessage = escapeHtml(localizedMessage.trim()).replaceAll(
          "\n",
          "<br />"
        );
        const safeCtaLabel = escapeHtml(localizedCtaLabel.trim());

        const fullName =
          `${recipient.first_name || ""} ${recipient.last_name || ""}`.trim() ||
          copy.greetingFallback;

        const safeName = escapeHtml(fullName);

        return resend.emails.send({
          from: "Paso Libre <team@pasolibre.org>",
          to: recipient.email as string,
          subject: safeTitle,
          html: `
            <div style="margin:0;padding:0;background-color:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f3f4f6;">
                <tr>
                  <td align="center" style="padding:40px 20px;">
                    <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 18px 45px rgba(15,23,42,0.14);">
                      <tr>
                        <td style="padding:34px 36px;text-align:center;background:${gradient};">
                          <div style="display:inline-block;margin-bottom:14px;padding:7px 12px;border-radius:999px;background:rgba(255,255,255,0.14);border:1px solid rgba(255,255,255,0.18);color:#dbeafe;font-size:11px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;">
                            ${copy.announcement}
                          </div>

                          <h1 style="margin:0;color:#ffffff;font-size:27px;line-height:1.25;font-weight:850;">
                            ${safeTitle}
                          </h1>

                          <p style="margin:12px 0 0;color:#dbeafe;font-size:14px;line-height:1.6;">
                            ${copy.updateFromPasoLibre}
                          </p>
                        </td>
                      </tr>

                      <tr>
                        <td style="padding:34px 36px;">
                          <p style="margin:0 0 16px;color:#334155;font-size:15px;line-height:1.7;">
                            ${copy.greeting} ${safeName},
                          </p>

                          <p style="margin:0;color:#334155;font-size:15px;line-height:1.8;">
                            ${safeMessage}
                          </p>

                          <div style="margin-top:30px;text-align:center;">
                            <a href="${ctaUrl}" style="display:inline-block;background:${gradient};color:#ffffff;text-decoration:none;border-radius:14px;padding:13px 24px;font-size:14px;font-weight:800;box-shadow:0 12px 24px rgba(13,77,176,0.22);">
                              ${safeCtaLabel}
                            </a>
                          </div>

                          <p style="margin:30px 0 0;color:#64748b;font-size:12px;line-height:1.6;text-align:center;">
                            ${copy.footer}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
          `,
        });
      })
    );

    const sent = results.filter((result) => result.status === "fulfilled");
    const failed = results.filter((result) => result.status === "rejected");

    return NextResponse.json({
      success: failed.length === 0,
      sent: sent.length,
      failed: failed.length,
      message:
        failed.length > 0
          ? `${sent.length} emails sent, ${failed.length} failed.`
          : `${sent.length} emails sent successfully.`,
      message_en:
        failed.length > 0
          ? getCopy("en").sentFailed(sent.length, failed.length)
          : getCopy("en").sentSuccess(sent.length),
      message_es:
        failed.length > 0
          ? getCopy("es").sentFailed(sent.length, failed.length)
          : getCopy("es").sentSuccess(sent.length),
      errors: failed.map((item) => item?.reason?.message || String(item)),
    });
  } catch (error: unknown) {
    console.error("Send announcement email error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to send announcement email.",
        message_en:
          error instanceof Error ? error.message : getCopy("en").unableToSend,
        message_es:
          error instanceof Error ? error.message : getCopy("es").unableToSend,
      },
      { status: 500 }
    );
  }
}
