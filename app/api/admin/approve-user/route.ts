import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type EmailLanguage = "en" | "es";

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

const getLanguage = (value?: string | null): EmailLanguage => {
  const normalized = String(value || "").trim().toLowerCase();

  return ["es", "spa", "spanish", "español"].includes(normalized) ? "es" : "en";
};

const getCopy = (language: EmailLanguage) => {
  const isSpanish = language === "es";

  return {
    missingResend: isSpanish ? "Falta RESEND_API_KEY." : "Missing RESEND_API_KEY.",
    missingPendingSignupId: isSpanish ? "Falta pendingSignupId." : "Missing pendingSignupId.",
    pendingNotFound: isSpanish
      ? "La solicitud pendiente no fue encontrada o ya fue revisada."
      : "Pending signup not found or already reviewed.",
    authResolveError: isSpanish
      ? "El usuario Auth existe pero no pudo resolverse por correo."
      : "Auth user exists but could not be resolved by email.",
    authUserMissing: isSpanish
      ? "No se pudo resolver el ID del usuario Auth."
      : "Auth user ID could not be resolved.",
    successMessage: isSpanish
      ? "Usuario aprobado correctamente y correo enviado."
      : "User approved successfully and approval email sent.",
    unableApprove: isSpanish
      ? "No se pudo aprobar el usuario."
      : "Unable to approve user.",
    failedSend: isSpanish
      ? "No se pudo enviar el correo de aprobación."
      : "Failed to send approval email.",
    approvalSubject: isSpanish
      ? "Tu Cuenta de Paso Libre Ha Sido Aprobada"
      : "Your Paso Libre Account Has Been Approved",
    approvedHeader: isSpanish ? "Tu Cuenta Ha Sido Aprobada" : "Your Account Has Been Approved",
    welcome: isSpanish ? "¡Bienvenido a Paso Libre!" : "Welcome to Paso Libre!",
    greeting: isSpanish ? "Hola" : "Hi",
    approvedMessage: isSpanish
      ? "Buenas noticias — tu solicitud para unirte a <strong>Paso Libre</strong> ha sido aprobada. Tu cuenta ya está activa y lista para usarse."
      : "Great news — your request to join <strong>Paso Libre</strong> has been approved. Your account is now active and ready to use.",
    accountEmail: isSpanish ? "Correo de la Cuenta" : "Account Email",
    status: isSpanish ? "Estado" : "Status",
    active: isSpanish ? "Activo" : "Active",
    signInInstruction: isSpanish
      ? "Haz clic en el botón de abajo para iniciar sesión y comenzar a explorar tu panel."
      : "Click the button below to sign in and start exploring your dashboard.",
    signInButton: isSpanish ? "Iniciar Sesión en Paso Libre" : "Sign In to Paso Libre",
    supportMessage: isSpanish
      ? "Si tienes alguna pregunta, simplemente responde a este correo — estaremos felices de ayudarte."
      : "If you have any questions, just reply to this email — we’re happy to help.",
    rightsReserved: isSpanish ? "Todos los derechos reservados." : "All rights reserved.",
  };
};

async function findAuthUserByEmail(supabaseAdmin: ReturnType<typeof getSupabaseAdmin>, email: string) {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });

  if (error) throw error;

  return data.users.find((u) => u.email?.toLowerCase() === email.toLowerCase()) || null;
}

async function sendApprovalEmail({
  email,
  firstName,
  languagePreference,
}: {
  email: string;
  firstName: string;
  languagePreference?: string | null;
}) {
  const resend = getResend();
  const language = getLanguage(languagePreference);
  const copy = getCopy(language);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const loginUrl = `${siteUrl}/login`;
  const logoUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/email-assets/logo-title.png`;

  const html = `
    <div style="margin:0;padding:0;background-color:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f3f4f6;">
        <tr>
          <td align="center" style="padding:40px 20px;">
            <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.08);">
              <tr>
                <td style="padding:30px 40px;text-align:center;background:linear-gradient(90deg,#3b82f6,#1d4ed8);">
                  <img src="${logoUrl}" alt="Paso Libre" width="320" style="display:block;margin:0 auto;height:auto;max-width:100%;" />
                  <p style="margin:10px 0 0;font-size:12px;color:#dbeafe;">${copy.approvedHeader}</p>
                </td>
              </tr>

              <tr>
                <td style="padding:32px 40px;">
                  <h2 style="margin:0 0 12px;font-size:22px;font-weight:700;color:#111827;">${copy.welcome}</h2>
                  <p style="margin:0 0 18px;font-size:14px;line-height:1.6;color:#4b5563;">${copy.greeting} ${escapeHtml(firstName)},</p>
                  <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#4b5563;">${copy.approvedMessage}</p>

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

                  <p style="margin:0 0 26px;font-size:14px;line-height:1.6;color:#4b5563;">${copy.signInInstruction}</p>

                  <div style="text-align:center;">
                    <a href="${loginUrl}" target="_blank" style="display:inline-block;padding:14px 40px;background:linear-gradient(90deg,#3b82f6,#1d4ed8);color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;border-radius:10px;">
                      ${copy.signInButton}
                    </a>
                  </div>
                </td>
              </tr>

              <tr>
                <td style="padding:24px 40px;text-align:center;background-color:#f3f4f6;border-top:1px solid #e5e7eb;">
                  <p style="margin:0;font-size:11px;color:#6b7280;">${copy.supportMessage}</p>
                  <p style="margin:6px 0 0;font-size:11px;color:#6b7280;">© ${new Date().getFullYear()} Paso Libre. ${copy.rightsReserved}</p>
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
    subject: copy.approvalSubject,
    html,
  });

  if (error) throw new Error(error.message || copy.failedSend);
}

export async function POST(req: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin();

    const { pendingSignupId } = await req.json();

    if (!pendingSignupId) {
      return NextResponse.json(
        {
          success: false,
          message: getCopy("en").missingPendingSignupId,
          message_en: getCopy("en").missingPendingSignupId,
          message_es: getCopy("es").missingPendingSignupId,
        },
        { status: 400 }
      );
    }

    const { data: pendingSignup, error: pendingError } = await supabaseAdmin
      .from("pending_signups")
      .select("*")
      .eq("id", pendingSignupId)
      .eq("status", "pending")
      .maybeSingle();

    if (pendingError) throw pendingError;

    if (!pendingSignup) {
      return NextResponse.json(
        {
          success: false,
          message: getCopy("en").pendingNotFound,
          message_en: getCopy("en").pendingNotFound,
          message_es: getCopy("es").pendingNotFound,
        },
        { status: 404 }
      );
    }

    const language = getLanguage(pendingSignup.language_preference || "en");
    const copy = getCopy(language);

    const cleanEmail = String(pendingSignup.email || "").trim().toLowerCase();

    if (!cleanEmail) {
      throw new Error("Missing pending signup email.");
    }

    let authUserId: string | null = null;

    const { data: createdUser, error: createUserError } =
      await supabaseAdmin.auth.admin.createUser({
        email: cleanEmail,
        password: pendingSignup.password_hash,
        email_confirm: true,
        user_metadata: {
          first_name: pendingSignup.first_name,
          last_name: pendingSignup.last_name,
          username: pendingSignup.username,
          phone: pendingSignup.phone,
          role: pendingSignup.role,
          language_preference: pendingSignup.language_preference,
        },
      });

    if (createUserError) {
      const alreadyExists =
        createUserError.message?.toLowerCase().includes("already") ||
        createUserError.message?.toLowerCase().includes("registered") ||
        createUserError.message?.toLowerCase().includes("exists");

      if (!alreadyExists) throw createUserError;

      const existingUser = await findAuthUserByEmail(supabaseAdmin, cleanEmail);

      if (!existingUser?.id) {
        throw new Error(copy.authResolveError);
      }

      authUserId = existingUser.id;
    } else {
      authUserId = createdUser.user?.id || null;
    }

    if (!authUserId) {
      throw new Error(copy.authUserMissing);
    }

    const { error: profileError } = await supabaseAdmin.from("profiles").upsert(
      {
        id: authUserId,
        first_name: pendingSignup.first_name,
        last_name: pendingSignup.last_name,
        username: pendingSignup.username,
        email: cleanEmail,
        phone: pendingSignup.phone,
        role: pendingSignup.role || "member",
        gender: pendingSignup.gender,
        pronouns: pendingSignup.pronouns,
        dob: pendingSignup.dob,
        sexual_orientation: pendingSignup.sexual_orientation,
        occupation: pendingSignup.occupation,
        profile_picture: pendingSignup.profile_picture,
        is_approved: true,
        account_status: "active",
        language_preference: pendingSignup.language_preference || "en",
      },
      { onConflict: "id" }
    );

    if (profileError) throw profileError;

    const { error: updatePendingError } = await supabaseAdmin
      .from("pending_signups")
      .update({
        status: "approved",
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", pendingSignup.id);

    if (updatePendingError) throw updatePendingError;

    await supabaseAdmin.from("user_approval_audit").insert({
      pending_signup_id: pendingSignup.id,
      profile_id: authUserId,
      action: "approved",
      note: "Approved from account manager.",
    });

    await sendApprovalEmail({
      email: cleanEmail,
      firstName: pendingSignup.first_name || "there",
      languagePreference: pendingSignup.language_preference || "en",
    });

    return NextResponse.json({
      success: true,
      message: copy.successMessage,
      message_en: getCopy("en").successMessage,
      message_es: getCopy("es").successMessage,
      profileId: authUserId,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : getCopy("en").unableApprove;

    console.error("approve-user error:", error);

    return NextResponse.json(
      {
        success: false,
        message,
        message_en: message || getCopy("en").unableApprove,
        message_es: message || getCopy("es").unableApprove,
      },
      { status: 500 }
    );
  }
}