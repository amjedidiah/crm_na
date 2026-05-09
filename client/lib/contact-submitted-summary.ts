import { contactPurposeLabel } from "@/lib/contact-purposes";
import { churches, events, ministries } from "@/lib/mock-data";
import type { ContactFormPurpose } from "@/lib/types";

export type SubmittedContactSummary = Readonly<{
  purposeLabel: string;
  /** Set for churches / ministries / events only. */
  listingSummary?: string;
}>;

function churchListingSummary(churchSlug?: string): string {
  if (churchSlug) {
    const row = churches.find((c) => c.slug === churchSlug);
    return row
      ? `Specific church: ${row.name} (${row.city}, ${row.stateOrProvince})`
      : `Church listing reference: ${churchSlug}`;
  }
  return "No specific church selected in the directory.";
}

function ministryListingSummary(ministrySlug?: string): string {
  if (ministrySlug) {
    const row = ministries.find((m) => m.slug === ministrySlug);
    return row
      ? `Specific ministry: ${row.name}`
      : `Ministry listing reference: ${ministrySlug}`;
  }
  return "No specific ministry selected.";
}

function eventListingSummary(eventSlug?: string): string {
  if (eventSlug) {
    const row = events.find((ev) => ev.slug === eventSlug);
    return row
      ? `Specific event: ${row.title}`
      : `Event listing reference: ${eventSlug}`;
  }
  return "No specific event selected.";
}

export function summarizeSubmittedContact(
  purpose: ContactFormPurpose,
  churchSlug?: string,
  ministrySlug?: string,
  eventSlug?: string,
): SubmittedContactSummary {
  const purposeLabel = contactPurposeLabel(purpose);

  if (purpose === "churches") {
    return { purposeLabel, listingSummary: churchListingSummary(churchSlug) };
  }
  if (purpose === "ministries") {
    return { purposeLabel, listingSummary: ministryListingSummary(ministrySlug) };
  }
  if (purpose === "events") {
    return { purposeLabel, listingSummary: eventListingSummary(eventSlug) };
  }

  return { purposeLabel };
}

function teamAckLine(purpose: ContactFormPurpose): string {
  switch (purpose) {
    case "general":
      return "Your general inquiry is with our team.";
    case "plan-visit":
      return "Your visit-planning note is with our team.";
    case "prayer-request":
      return "Your prayer request is with our team.";
    case "churches":
      return "Your churches message is with our team.";
    case "ministries":
      return "Your ministries message is with our team.";
    case "events":
      return "Your events message is with our team.";
  }
}

/** Short on-page success copy after submit (mirrors email intent per purpose). */
export function buildContactFormSuccessMessage(
  purpose: ContactFormPurpose,
  confirmationSent: boolean,
  visitorEmail: string,
  churchSlug?: string,
  ministrySlug?: string,
  eventSlug?: string,
): string {
  const s = summarizeSubmittedContact(
    purpose,
    churchSlug,
    ministrySlug,
    eventSlug,
  );
  const listingNote = s.listingSummary ? ` ${s.listingSummary}` : "";
  const open = teamAckLine(purpose);
  if (confirmationSent) {
    return `${open}${listingNote} A confirmation that includes what you submitted has been sent to ${visitorEmail}.`;
  }
  return `${open}${listingNote} We could not send a confirmation email automatically — please keep your own copy of what you sent.`;
}
