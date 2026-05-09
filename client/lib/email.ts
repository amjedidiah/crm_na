import nodemailer from "nodemailer";

export interface SendContactEmailInput {
  fromEmail: string;
  fromName: string;
  purpose: string;
  message: string;
}

export async function sendContactEmail(input: SendContactEmailInput) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL_TO } =
    process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return {
      delivered: false,
      preview: `Email not sent. Missing SMTP credentials. Message from ${input.fromName} <${input.fromEmail}>`,
    };
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transporter.sendMail({
    to: CONTACT_EMAIL_TO ?? "info@crm-na.org",
    from: SMTP_USER,
    replyTo: input.fromEmail,
    subject: `CRM NA contact form: ${input.purpose}`,
    text: `${input.fromName} <${input.fromEmail}>\n\n${input.message}`,
  });

  return { delivered: true };
}
