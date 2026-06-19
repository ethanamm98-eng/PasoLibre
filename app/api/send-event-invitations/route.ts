import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type EmailLanguage = "en" | "es";

type Recipient = {
  email?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  language_preference?: string | null;
};

const escapeHtml = (value: string) =>
  String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const sanitizeRichHtml = (value?: string | null) => {
  const html = String(value || "").trim();

  if (!html) return "";

  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "")
    .replace(/\son\w+=\{[^}]*\}/gi, "")
    .replace(/javascript:/gi, "");
};

const stripHtml = (value?: string | null) =>
  String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

const looksSpanish = (value?: string | null) => {
  const text = stripHtml(value);

  if (!text) return false;

  return (
    /[áéíóúñü¿¡]/i.test(text) ||
    /\b(el|la|los|las|un|una|unos|unas|de|del|para|por|con|sin|que|este|esta|estos|estas|espacio|seguro|divertido|gente|comunidad|asistencia|evento|invitadx|jangueo|próximo|proximo)\b/i.test(
      text
    )
  );
};

const looksEnglish = (value?: string | null) => {
  const text = stripHtml(value);

  if (!text) return false;

  return /\b(the|a|an|and|or|for|with|without|safe|fun|space|people|folks|community|event|invited|hangout|upcoming|attendance|check)\b/i.test(
    text
  );
};

const getLanguage = (value?: string | null): EmailLanguage => {
  const normalized = String(value || "")
    .trim()
    .toLowerCase();

  if (
    normalized === "es" ||
    normalized === "spa" ||
    normalized === "spanish" ||
    normalized === "español"
  ) {
    return "es";
  }

  return "en";
};

const getCopy = (language: EmailLanguage) => {
  const isSpanish = language === "es";

  return {
    tbd: isSpanish ? "Por confirmar" : "TBD",
    eventInvitation: isSpanish ? "Invitación a Evento" : "Event Invitation",
    defaultDescription: isSpanish
      ? "Has sido invitadx a un próximo evento de Paso Libre."
      : "You have been invited to an upcoming Paso Libre event.",
    date: isSpanish ? "Fecha" : "Date",
    time: isSpanish ? "Hora" : "Time",
    address: isSpanish ? "Dirección" : "Address",
    viewLocation: isSpanish
      ? "Ver ubicación del evento"
      : "View Event Location",
    viewEvent: isSpanish ? "Ver Evento / Check In" : "View Event / Check In",
    footer: isSpanish
      ? "Recibiste esta invitación porque eres parte de Paso Libre."
      : "You received this invitation because you are part of Paso Libre.",
    rights: isSpanish
      ? "Todos los derechos reservados."
      : "All rights reserved.",
    subject: isSpanish ? "Estás invitadx" : "You're invited",
    missingResend: isSpanish
      ? "Falta RESEND_API_KEY."
      : "Missing RESEND_API_KEY.",
    noRecipients: isSpanish
      ? "No se proporcionaron destinatarios."
      : "No recipients provided.",
    eventNameRequired: isSpanish
      ? "El nombre del evento es requerido."
      : "Event name is required.",
    unableToSend: isSpanish
      ? "No se pudieron enviar las invitaciones."
      : "Unable to send invitations.",
    sentSuccess: isSpanish
      ? "Invitaciones enviadas correctamente."
      : "Invitations sent successfully.",
  };
};

const formatDate = (date?: string, language: EmailLanguage = "en") => {
  const copy = getCopy(language);

  if (!date) return copy.tbd;

  const parsed = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString(language === "es" ? "es-PR" : "en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (time?: string, language: EmailLanguage = "en") => {
  const copy = getCopy(language);

  if (!time) return copy.tbd;

  const [hours, minutes] = time.split(":").map(Number);

  const parsed = new Date();
  parsed.setHours(hours || 0, minutes || 0, 0, 0);

  if (Number.isNaN(parsed.getTime())) return time;

  return parsed.toLocaleTimeString(language === "es" ? "es-PR" : "en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const getLocalizedValue = ({
  language,
  en,
  es,
  fallback,
}: {
  language: EmailLanguage;
  en?: string | null;
  es?: string | null;
  fallback?: string | null;
}) => {
  const enValue = String(en || "").trim();
  const esValue = String(es || "").trim();
  const fallbackValue = String(fallback || "").trim();

  if (language === "es") {
    if (esValue && looksSpanish(esValue)) return esValue;
    if (enValue && looksSpanish(enValue)) return enValue;
    if (esValue && !looksEnglish(esValue)) return esValue;
    if (fallbackValue && looksSpanish(fallbackValue)) return fallbackValue;
    return esValue || fallbackValue || enValue || "";
  }

  if (enValue && looksEnglish(enValue)) return enValue;
  if (esValue && looksEnglish(esValue)) return esValue;
  if (enValue && !looksSpanish(enValue)) return enValue;
  if (fallbackValue && looksEnglish(fallbackValue)) return fallbackValue;
  return enValue || fallbackValue || esValue || "";
};

const buildEventUrl = ({
  siteUrl,
  eventId,
}: {
  siteUrl: string;
  eventId?: string;
}) => {
  return eventId ? `${siteUrl}/check-in/${eventId}` : siteUrl;
};

const buildAddress = ({
  streetAddress,
  city,
  country,
  zipCode,
  location,
  address,
}: {
  streetAddress?: string | null;
  city?: string | null;
  country?: string | null;
  zipCode?: string | null;
  location?: string | null;
  address?: string | null;
}) => {
  const fullAddress = [streetAddress, city, country, zipCode]
    .map((item) => String(item || "").trim())
    .filter(Boolean)
    .join(", ");

  return fullAddress || String(address || location || "").trim();
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      eventId,
      eventNameEn,
      eventNameEs,
      eventName,
      descriptionEn,
      descriptionEs,
      description,
      date,
      time,
      locationUrl,
      address,
      location,
      streetAddress,
      street_address,
      city,
      country,
      zipCode,
      zip_code,
      recipients,
      eventImage,
    } = body;

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: getCopy("en").missingResend,
          error_en: getCopy("en").missingResend,
          error_es: getCopy("es").missingResend,
        },
        { status: 500 }
      );
    }

    const validRecipients: Recipient[] = Array.isArray(recipients)
      ? recipients.filter((recipient) =>
          typeof recipient === "string"
            ? recipient.includes("@")
            : String(recipient?.email || "").includes("@")
        )
      : [];

    if (validRecipients.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: getCopy("en").noRecipients,
          error_en: getCopy("en").noRecipients,
          error_es: getCopy("es").noRecipients,
        },
        { status: 400 }
      );
    }

    const hasEventName =
      !!String(eventNameEn || "").trim() ||
      !!String(eventNameEs || "").trim() ||
      !!String(eventName || "").trim();

    if (!hasEventName) {
      return NextResponse.json(
        {
          success: false,
          error: getCopy("en").eventNameRequired,
          error_en: getCopy("en").eventNameRequired,
          error_es: getCopy("es").eventNameRequired,
        },
        { status: 400 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const logoUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/email-assets/logo-title.png`;

    const eventUrl = buildEventUrl({
      siteUrl,
      eventId,
    });

    const eventAddress = buildAddress({
      streetAddress: streetAddress || street_address,
      city,
      country,
      zipCode: zipCode || zip_code,
      location,
      address,
    });

    const gradient =
      "linear-gradient(135deg,#38bdf8 0%, #2563eb 55%, #1d4ed8 100%)";

    const results = await Promise.allSettled(
      validRecipients.map((recipient) => {
        const recipientEmail =
          typeof recipient === "string"
            ? recipient
            : String(recipient.email || "").trim();

        const language =
          typeof recipient === "string"
            ? "en"
            : getLanguage(recipient.language_preference);

        const copy = getCopy(language);

        const localizedEventName = getLocalizedValue({
          language,
          en: eventNameEn,
          es: eventNameEs,
          fallback: eventName,
        });

        const localizedDescription =
          getLocalizedValue({
            language,
            en: descriptionEn,
            es: descriptionEs,
            fallback: description,
          }) || copy.defaultDescription;

        const safeEventName = escapeHtml(localizedEventName);
        const safeDescription = sanitizeRichHtml(localizedDescription);
        const safeEventImage = escapeHtml(eventImage || "");
        const safeLocationUrl = escapeHtml(locationUrl || "");
        const safeAddress = escapeHtml(eventAddress || "");

        return resend.emails.send({
          from: process.env.EMAIL_FROM || "Paso Libre <team@pasolibre.org>",
          to: recipientEmail,
          subject: `${copy.subject}: ${localizedEventName}`,
          html: `
            <div style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
              <table width="100%" cellspacing="0" cellpadding="0" style="background:#f3f4f6;padding:32px 16px;">
                <tr>
                  <td align="center">
                    <table width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 18px 45px rgba(15,23,42,0.12);">
                      <tr>
                        <td style="padding:36px 34px;text-align:center;background:${gradient};">
                          <img 
                            src="${logoUrl}" 
                            alt="Paso Libre" 
                            width="320"
                            style="display:block;margin:0 auto;height:auto;max-width:100%;"
                          />

                          <p style="margin:12px 0 0;color:#dbeafe;font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">
                            ${copy.eventInvitation}
                          </p>
                        </td>
                      </tr>

                      <tr>
                        <td style="padding:34px;">
                          <h2 style="margin:0 0 14px;color:#0f172a;font-size:26px;line-height:1.25;font-weight:800;">
                            ${safeEventName}
                          </h2>

                          <div style="margin:0 0 24px;color:#475569;font-size:15px;line-height:1.75;">
                            ${
                              safeDescription ||
                              escapeHtml(copy.defaultDescription)
                            }
                          </div>

                          ${
                            safeEventImage
                              ? `
                                <div style="margin-bottom:24px;">
                                  <img
                                    src="${safeEventImage}"
                                    alt="${safeEventName}"
                                    style="width:100%;height:auto;max-height:320px;object-fit:cover;border-radius:20px;display:block;border:1px solid #e2e8f0;box-shadow:0 10px 30px rgba(15,23,42,0.10);"
                                  />
                                </div>
                              `
                              : ""
                          }

                          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:18px;padding:20px;margin-bottom:24px;">
                            <div style="margin-bottom:12px;">
                              <p style="margin:0 0 4px;color:#64748b;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">
                                ${copy.date}
                              </p>

                              <p style="margin:0;color:#0f172a;font-size:15px;font-weight:600;">
                                ${formatDate(date, language)}
                              </p>
                            </div>

                            <div style="${
                              safeAddress
                                ? "margin-bottom:12px;"
                                : "margin-bottom:0;"
                            }">
                              <p style="margin:0 0 4px;color:#64748b;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">
                                ${copy.time}
                              </p>

                              <p style="margin:0;color:#0f172a;font-size:15px;font-weight:600;">
                                ${formatTime(time, language)}
                              </p>
                            </div>

                            ${
                              safeAddress
                                ? `
                                  <div>
                                    <p style="margin:0 0 4px;color:#64748b;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">
                                      ${copy.address}
                                    </p>

                                    <p style="margin:0;color:#0f172a;font-size:15px;font-weight:600;">
                                      ${safeAddress}
                                    </p>
                                  </div>
                                `
                                : ""
                            }
                          </div>

                          ${
                            safeLocationUrl
                              ? `
                                <div style="margin-bottom:28px;">
                                  <a
                                    href="${safeLocationUrl}"
                                    style="color:#2563eb;font-size:14px;font-weight:700;text-decoration:none;"
                                  >
                                    ${copy.viewLocation}
                                  </a>
                                </div>
                              `
                              : ""
                          }

                          <div style="text-align:center;margin-top:10px;">
                            <a
                              href="${eventUrl}"
                              style="display:inline-block;background:${gradient};box-shadow:0 10px 25px rgba(37,99,235,0.28);color:#ffffff;text-decoration:none;padding:14px 26px;border-radius:16px;font-weight:700;font-size:14px;"
                            >
                              ${copy.viewEvent}
                            </a>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td style="padding:22px 34px;background:#f8fafc;text-align:center;border-top:1px solid #e2e8f0;">
                          <p style="margin:0;color:#64748b;font-size:12px;line-height:1.6;">
                            ${copy.footer}
                          </p>

                          <p style="margin:8px 0 0;color:#94a3b8;font-size:11px;">
                            © ${new Date().getFullYear()} Paso Libre. ${
            copy.rights
          }
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
        failed.length === 0
          ? getCopy("en").sentSuccess
          : `${sent.length} sent, ${failed.length} failed.`,
      message_en:
        failed.length === 0
          ? getCopy("en").sentSuccess
          : `${sent.length} sent, ${failed.length} failed.`,
      message_es:
        failed.length === 0
          ? getCopy("es").sentSuccess
          : `${sent.length} enviados, ${failed.length} fallaron.`,
      errors: failed.map((item) => item?.reason?.message || String(item)),
    });
  } catch (error: unknown) {
    console.error("Invitation email error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : getCopy("en").unableToSend,
        error_en:
          error instanceof Error ? error.message : getCopy("en").unableToSend,
        error_es:
          error instanceof Error ? error.message : getCopy("es").unableToSend,
      },
      { status: 500 }
    );
  }
}
