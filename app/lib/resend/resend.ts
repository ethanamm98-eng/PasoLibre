import { Resend } from "resend";
import { userEmailTemplate } from "../../components/UserEmailTemplate";
import { adminEmailTemplate } from "../../components/AdminEmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendAdminNotification = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}) => {
  const approveUrl = `${process.env.NEXT_PUBLIC_APP_URL}/admin/approve/${data.email}`;
  const denyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/admin/deny/${data.email}`;

  await resend.emails.send({
    from: "Paso Libre <no-reply@pasolibre.com>",
    to: process.env.ADMIN_EMAIL!,
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
  const loginUrl = `${process.env.NEXT_PUBLIC_APP_URL}/login`;

  await resend.emails.send({
    from: "Paso Libre <no-reply@pasolibre.com>",
    to: data.email,
    subject: "Your Account Has Been Approved",
    html: userEmailTemplate({ firstName: data.firstName, loginUrl }),
  });
};
