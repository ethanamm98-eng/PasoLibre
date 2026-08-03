import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const getSupabaseAdmin = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL.");
  }

  if (!serviceRoleKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY.");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

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
    const supabaseAdmin = getSupabaseAdmin();
    const resend = getResend();

    const body = await req.json();

    const firstName = String(body.firstName || "").trim();
    const lastName = String(body.lastName || "").trim();
    const phone = String(body.phone || "").trim();
    const email = String(body.email || "")
      .trim()
      .toLowerCase();
    const subject = String(body.subject || "").trim();
    const message = String(body.message || "").trim();

    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields.",
        },
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

    if (insertError) {
      throw insertError;
    }

    const adminEmail =
      process.env.ADMIN_CONTACT_EMAIL || "ethan.a.mm98@gmail.com";

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (!supabaseUrl) {
      throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL.");
    }

    const logoUrl = `${supabaseUrl}/storage/v1/object/public/email-assets/logo-title.png`;

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
        <div
          style="
            margin:0;
            padding:0;
            background-color:#f3f4f6;
            font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
          "
        >
          <table
            role="presentation"
            width="100%"
            cellspacing="0"
            cellpadding="0"
            border="0"
            style="background-color:#f3f4f6;"
          >
            <tr>
              <td align="center" style="padding:40px 20px;">
                <table
                  role="presentation"
                  width="620"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  style="
                    width:100%;
                    max-width:620px;
                    background-color:#ffffff;
                    border-radius:18px;
                    overflow:hidden;
                    box-shadow:0 14px 40px rgba(15,23,42,0.12);
                  "
                >
                  <tr>
                    <td
                      style="
                        padding:28px 36px;
                        text-align:center;
                        background:linear-gradient(90deg,#3b82f6,#1d4ed8);
                      "
                    >
                      <img
                        src="${logoUrl}"
                        alt="Paso Libre"
                        width="320"
                        style="
                          display:block;
                          width:100%;
                          max-width:320px;
                          height:auto;
                          margin:0 auto;
                          border:0;
                        "
                      />

                      <p
                        style="
                          margin:10px 0 0;
                          color:#dbeafe;
                          font-size:13px;
                          line-height:1.5;
                        "
                      >
                        New Contact Form Message
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:30px 36px;color:#111827;">
                      <h2
                        style="
                          margin:0 0 22px;
                          font-size:22px;
                          line-height:1.3;
                          color:#111827;
                        "
                      >
                        New Website Inquiry
                      </h2>

                      <table
                        role="presentation"
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        style="
                          width:100%;
                          margin:0 0 22px;
                          background-color:#f9fafb;
                          border:1px solid #e5e7eb;
                          border-radius:14px;
                        "
                      >
                        <tr>
                          <td
                            style="
                              padding:18px;
                              font-size:14px;
                              line-height:1.6;
                              color:#374151;
                            "
                          >
                            <p style="margin:0 0 8px;">
                              <strong>Name:</strong>
                              ${safeFirstName} ${safeLastName}
                            </p>

                            <p style="margin:0 0 8px;">
                              <strong>Email:</strong>
                              <a
                                href="mailto:${safeEmail}"
                                style="color:#1d4ed8;text-decoration:none;"
                              >
                                ${safeEmail}
                              </a>
                            </p>

                            <p style="margin:0 0 8px;">
                              <strong>Phone:</strong>
                              ${safePhone}
                            </p>

                            <p style="margin:0;">
                              <strong>Subject:</strong>
                              ${safeSubject}
                            </p>
                          </td>
                        </tr>
                      </table>

                      <div
                        style="
                          padding:18px;
                          background-color:#f9fafb;
                          border-radius:14px;
                          border:1px solid #e5e7eb;
                        "
                      >
                        <p
                          style="
                            margin:0 0 10px;
                            font-size:13px;
                            font-weight:700;
                            color:#111827;
                          "
                        >
                          Message
                        </p>

                        <p
                          style="
                            margin:0;
                            white-space:pre-line;
                            line-height:1.7;
                            font-size:14px;
                            color:#374151;
                          "
                        >
                          ${safeMessage}
                        </p>
                      </div>

                      <div style="margin-top:26px;text-align:center;">
                        <a
                          href="mailto:${safeEmail}?subject=${encodeURIComponent(
                            `Re: ${subject}`
                          )}"
                          style="
                            display:inline-block;
                            padding:13px 32px;
                            background:linear-gradient(90deg,#3b82f6,#1d4ed8);
                            color:#ffffff;
                            text-decoration:none;
                            font-size:14px;
                            font-weight:600;
                            border-radius:10px;
                          "
                        >
                          Reply to ${safeFirstName}
                        </a>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding:22px 36px;
                        text-align:center;
                        background-color:#f3f4f6;
                        border-top:1px solid #e5e7eb;
                      "
                    >
                      <p
                        style="
                          margin:0;
                          font-size:11px;
                          line-height:1.5;
                          color:#6b7280;
                        "
                      >
                        This message was submitted through the Paso Libre
                        website contact form.
                      </p>

                      <p
                        style="
                          margin:6px 0 0;
                          font-size:11px;
                          color:#6b7280;
                        "
                      >
                        © ${new Date().getFullYear()} Paso Libre. All rights
                        reserved.
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