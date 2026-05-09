import nodemailer from "nodemailer";

export interface SendContactEmailInput {
  fromEmail: string;
  fromName: string;
  purpose: string;
  message: string;
  /** Directory church slug when contacting about a specific listing. */
  churchSlug?: string;
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

  const slugLine =
    input.purpose === "churches" && input.churchSlug
      ? `\nChurch listing slug: ${input.churchSlug}`
      : "";

  await transporter.sendMail({
    to: CONTACT_EMAIL_TO ?? "info@crm-na.org",
    from: SMTP_USER,
    replyTo: input.fromEmail,
    subject:
      input.purpose === "churches" && input.churchSlug
        ? `CRM NA contact form: churches (${input.churchSlug})`
        : `CRM NA contact form: ${input.purpose}`,
    text: `${input.fromName} <${input.fromEmail}>${slugLine}\n\n${input.message}`,
  });

  return { delivered: true };
}
