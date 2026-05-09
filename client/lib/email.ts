import nodemailer from "nodemailer";

export interface SendContactEmailInput {
  fromEmail: string;
  fromName: string;
  purpose: string;
  message: string;
  /** Directory church slug when contacting about a specific listing. */
  churchSlug?: string;
  /** Ministry profile slug when contacting about a specific lane. */
  ministrySlug?: string;
}

function contactFormEmailSubject(input: SendContactEmailInput): string {
  if (input.purpose === "churches" && input.churchSlug) {
    return `CRM NA contact form: churches (${input.churchSlug})`;
  }
  if (input.purpose === "ministries" && input.ministrySlug) {
    return `CRM NA contact form: ministries (${input.ministrySlug})`;
  }
  return `CRM NA contact form: ${input.purpose}`;
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

  const churchLine =
    input.purpose === "churches" && input.churchSlug
      ? `\nChurch listing slug: ${input.churchSlug}`
      : "";
  const ministryLine =
    input.purpose === "ministries" && input.ministrySlug
      ? `\nMinistry profile slug: ${input.ministrySlug}`
      : "";
  const slugLines = `${churchLine}${ministryLine}`;
  const subject = contactFormEmailSubject(input);

  await transporter.sendMail({
    to: CONTACT_EMAIL_TO ?? "info@crm-na.org",
    from: SMTP_USER,
    replyTo: input.fromEmail,
    subject,
    text: `${input.fromName} <${input.fromEmail}>${slugLines}\n\n${input.message}`,
  });

  return { delivered: true };
}
