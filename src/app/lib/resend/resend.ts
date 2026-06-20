import { Resend } from "resend";
import { userEmailTemplate } from "../../components/UserEmailTemplate";
import { adminEmailTemplate } from "../../components/AdminEmailTemplate";

const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY.");
  }

  return new Resend(apiKey);
};

const getAppUrl = () => {
  return process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
};

export const sendAdminNotification = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}) => {
  const resend = getResend();

  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    throw new Error("Missing ADMIN_EMAIL.");
  }

  const appUrl = getAppUrl();

  const approveUrl = `${appUrl}/admin/approve/${encodeURIComponent(data.email)}`;
  const denyUrl = `${appUrl}/admin/deny/${encodeURIComponent(data.email)}`;

  await resend.emails.send({
    from: process.env.EMAIL_FROM || "Paso Libre <no-reply@pasolibre.com>",
    to: adminEmail,
    subject: "New User Signup",
    html: adminEmailTemplate({
      ...data,
      signupDate: new Date().toLocaleString(),
      approveUrl,
      denyUrl,
    }),
  });
};

export const sendUserConfirmation = async (data: {
  email: string;
  firstName: string;
}) => {
  const resend = getResend();
  const appUrl = getAppUrl();

  const loginUrl = `${appUrl}/login`;

  await resend.emails.send({
    from: process.env.EMAIL_FROM || "Paso Libre <no-reply@pasolibre.com>",
    to: data.email,
    subject: "Your Account Has Been Approved",
    html: userEmailTemplate({ firstName: data.firstName, loginUrl }),
  });
};