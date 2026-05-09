import nodemailer from "nodemailer";

import {
  brandBodyP,
  brandLeadP,
  brandLabeledBlock,
  escapeHtml,
  renderBrandEmailHtml,
} from "@/lib/email-brand-template";
import { contactPurposeLabel } from "@/lib/contact-purposes";
import {
  summarizeSubmittedContact,
  type SubmittedContactSummary,
} from "@/lib/contact-submitted-summary";
import { CONTACT_EMAIL, SITE_CONTACT, SITE_NAME } from "@/lib/mock-data";
import type { ContactFormPurpose } from "@/lib/types";

export interface SendContactEmailInput {
  fromEmail: string;
  fromName: string;
  purpose: string;
  message: string;
  /** Directory church slug when contacting about a specific listing. */
  churchSlug?: string;
  /** Ministry profile slug when contacting about a specific lane. */
  ministrySlug?: string;
  /** Event listing slug when contacting about a specific gathering. */
  eventSlug?: string;
}

const BRAND_EYEBROW = "Charismatic Renewal Ministries North America";

function smtpEnv() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL_TO } =
    process.env;
  return {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    CONTACT_EMAIL_TO,
  };
}

function createTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = smtpEnv();
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

function brandFooterLine(): string {
  return `${SITE_NAME} · ${SITE_CONTACT.addressLabel}`;
}

function contactFormEmailSubject(input: SendContactEmailInput): string {
  if (input.purpose === "churches" && input.churchSlug) {
    return `${SITE_NAME} contact form: churches (${input.churchSlug})`;
  }
  if (input.purpose === "ministries" && input.ministrySlug) {
    return `${SITE_NAME} contact form: ministries (${input.ministrySlug})`;
  }
  if (input.purpose === "events" && input.eventSlug) {
    return `${SITE_NAME} contact form: events (${input.eventSlug})`;
  }
  return `${SITE_NAME} contact form: ${input.purpose}`;
}

function staffNotificationText(input: SendContactEmailInput): string {
  const churchLine =
    input.purpose === "churches" && input.churchSlug
      ? `\nChurch listing slug: ${input.churchSlug}`
      : "";
  const ministryLine =
    input.purpose === "ministries" && input.ministrySlug
      ? `\nMinistry profile slug: ${input.ministrySlug}`
      : "";
  const eventLine =
    input.purpose === "events" && input.eventSlug
      ? `\nEvent listing slug: ${input.eventSlug}`
      : "";
  const slugLines = `${churchLine}${ministryLine}${eventLine}`;
  return `${input.fromName} <${input.fromEmail}>${slugLines}\n\n${input.message}`;
}

function staffNotificationHtml(input: SendContactEmailInput): string {
  const subject = contactFormEmailSubject(input);
  const parts: string[] = [
    brandLeadP(
      "A new message was submitted through the national contact form.",
    ),
    `<p style="margin:0 0 18px 0; font-size:14px; line-height:22px; color:#f5efe0;"><strong>From</strong><br/>${escapeHtml(input.fromName)} &lt;${escapeHtml(input.fromEmail)}&gt;</p>`,
  ];
  if (input.purpose === "churches" && input.churchSlug) {
    parts.push(brandBodyP(`Church listing slug: ${input.churchSlug}`));
  }
  if (input.purpose === "ministries" && input.ministrySlug) {
    parts.push(brandBodyP(`Ministry profile slug: ${input.ministrySlug}`));
  }
  if (input.purpose === "events" && input.eventSlug) {
    parts.push(brandBodyP(`Event listing slug: ${input.eventSlug}`));
  }
  parts.push(brandLabeledBlock("Message", input.message));
  return renderBrandEmailHtml({
    documentTitle: subject,
    eyebrow: BRAND_EYEBROW,
    headerDisplayTitle: SITE_NAME,
    headerSubtitle: "Website contact — team notification",
    mainContentHtml: parts.join("\n"),
    footerLine: brandFooterLine(),
  });
}

export async function sendContactEmail(input: SendContactEmailInput) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL_TO } =
    smtpEnv();

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return {
      delivered: false,
      preview: `Email not sent. Missing SMTP credentials. Message from ${input.fromName} <${input.fromEmail}>`,
    };
  }

  const transporter = createTransporter();
  const subject = contactFormEmailSubject(input);
  const text = staffNotificationText(input);
  const html = staffNotificationHtml(input);

  await transporter.sendMail({
    to: CONTACT_EMAIL_TO ?? CONTACT_EMAIL,
    from: SMTP_USER,
    replyTo: input.fromEmail,
    subject,
    text,
    html,
  });

  return { delivered: true };
}

export interface SendContactConfirmationInput {
  to: string;
  name: string;
  purpose: ContactFormPurpose;
  message: string;
  churchSlug?: string;
  ministrySlug?: string;
  eventSlug?: string;
}

function confirmationEmailSubject(
  input: Readonly<SendContactConfirmationInput>,
): string {
  switch (input.purpose) {
    case "general":
      return `Your general inquiry — ${SITE_NAME}`;
    case "plan-visit":
      return `Your visit plans — ${SITE_NAME}`;
    case "prayer-request":
      return `We received your prayer request — ${SITE_NAME}`;
    case "churches":
      return `Your churches message — ${SITE_NAME}`;
    case "ministries":
      return `Your ministries message — ${SITE_NAME}`;
    case "events":
      return `Your events message — ${SITE_NAME}`;
  }
}

function confirmationHeaderSubtitle(purpose: ContactFormPurpose): string {
  return `Website contact — ${contactPurposeLabel(purpose)}`;
}

function confirmationLeadLines(
  first: string,
  purpose: ContactFormPurpose,
  summary: SubmittedContactSummary,
): string[] {
  const pl = summary.purposeLabel;
  switch (purpose) {
    case "general":
      return [
        `Thanks, ${first}, for reaching out through our national “${pl}” channel.`,
        "We saved your note; someone from the national contact team will follow up when they are able.",
      ];
    case "plan-visit":
      return [
        `Thanks, ${first}, for using the “${pl}” path so we can help with a first-time visit.`,
        "We will use what you wrote to route your request toward the right regional or local follow-up.",
      ];
    case "prayer-request":
      return [
        `Thanks, ${first}, for sharing a “${pl}” with us.`,
        "Your request is in front of our prayer partners; we will stand with you in faith as we are able.",
      ];
    case "churches":
      return [
        `Thanks, ${first}, for writing under “${pl}” about directory churches and connections.`,
        "Below is exactly what we stored from your submission so you can keep it for your records:",
      ];
    case "ministries":
      return [
        `Thanks, ${first}, for contacting us under “${pl}” about ministry profiles and lanes.`,
        "Below is exactly what we stored from your submission so you can keep it for your records:",
      ];
    case "events":
      return [
        `Thanks, ${first}, for writing under “${pl}” about upcoming gatherings and registrations.`,
        "Below is exactly what we stored from your submission so you can keep it for your records:",
      ];
  }
}

function confirmationText(input: SendContactConfirmationInput): string {
  const first = input.name.trim().split(/\s+/)[0] ?? "there";
  const summary = summarizeSubmittedContact(
    input.purpose,
    input.churchSlug,
    input.ministrySlug,
    input.eventSlug,
  );
  const lines: string[] = [`Hi ${first},`, "", ...confirmationLeadLines(first, input.purpose, summary), "", `Topic: ${summary.purposeLabel}`];
  if (summary.listingSummary) {
    lines.push(summary.listingSummary);
  }
  lines.push("", "Your message:", input.message, "", "This is an automated confirmation — you do not need to reply to this email.", "", `— ${SITE_NAME}`);
  return lines.join("\n");
}

function confirmationHtml(input: SendContactConfirmationInput): string {
  const first = input.name.trim().split(/\s+/)[0] ?? "there";
  const summary = summarizeSubmittedContact(
    input.purpose,
    input.churchSlug,
    input.ministrySlug,
    input.eventSlug,
  );
  const subject = confirmationEmailSubject(input);
  const mainContentHtml = [
    brandLeadP(`Hi ${first},`),
    ...confirmationLeadLines(first, input.purpose, summary).map((line) =>
      brandBodyP(line),
    ),
    brandBodyP(`Topic you chose: ${summary.purposeLabel}`),
    ...(summary.listingSummary ? [brandBodyP(summary.listingSummary)] : []),
    brandLabeledBlock("Your message", input.message),
    brandBodyP(
      "This is an automated confirmation — you do not need to reply to this email.",
    ),
    brandBodyP(`— ${SITE_NAME}`),
  ].join("\n");
  return renderBrandEmailHtml({
    documentTitle: subject,
    eyebrow: BRAND_EYEBROW,
    headerDisplayTitle: SITE_NAME,
    headerSubtitle: confirmationHeaderSubtitle(input.purpose),
    mainContentHtml,
    footerLine: brandFooterLine(),
  });
}

/** Branded HTML + plain text receipt to the visitor (purpose-specific copy and submitted details). */
export async function sendContactConfirmationEmail(
  input: SendContactConfirmationInput,
): Promise<{ sent: boolean; reason?: string }> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = smtpEnv();

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return { sent: false, reason: "SMTP not configured" };
  }

  const transporter = createTransporter();
  const text = confirmationText(input);
  const html = confirmationHtml(input);

  await transporter.sendMail({
    to: input.to,
    from: SMTP_USER,
    subject: confirmationEmailSubject(input),
    text,
    html,
  });

  return { sent: true };
}
