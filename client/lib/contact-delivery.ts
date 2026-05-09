import { CONTACT_EMAIL, churches, events, ministries } from "@/lib/mock-data";
import type { ContactFormPurpose } from "@/lib/types";

/** Slugs included in outbound contact email only when purpose matches. */
export function slugsForContactEmail(
  purpose: ContactFormPurpose,
  churchSlug: string | undefined,
  ministrySlug: string | undefined,
  eventSlug: string | undefined,
): {
  churchSlug?: string;
  ministrySlug?: string;
  eventSlug?: string;
} {
  return {
    churchSlug: purpose === "churches" ? churchSlug : undefined,
    ministrySlug: purpose === "ministries" ? ministrySlug : undefined,
    eventSlug: purpose === "events" ? eventSlug : undefined,
  };
}

function normalizeEmail(email: string | undefined): string | undefined {
  return email?.trim().toLowerCase() || undefined;
}

function localContactEmailForContext(
  purpose: ContactFormPurpose,
  churchSlug: string | undefined,
  ministrySlug: string | undefined,
  eventSlug: string | undefined,
): string | undefined {
  if (purpose === "churches" && churchSlug) {
    return churches.find((church) => church.slug === churchSlug)?.email;
  }

  if (purpose === "ministries" && ministrySlug) {
    return ministries.find((ministry) => ministry.slug === ministrySlug)?.email;
  }

  if (purpose === "events" && eventSlug) {
    return events.find((event) => event.slug === eventSlug)?.email;
  }

  return undefined;
}

export function resolveContactEmailRecipients(
  purpose: ContactFormPurpose,
  churchSlug: string | undefined,
  ministrySlug: string | undefined,
  eventSlug: string | undefined,
  nationalRecipient = CONTACT_EMAIL,
): {
  to: string;
  cc?: string[];
} {
  const to = nationalRecipient.trim() || CONTACT_EMAIL;
  const localEmail = localContactEmailForContext(
    purpose,
    churchSlug,
    ministrySlug,
    eventSlug,
  )?.trim();

  const excluded = new Set([
    normalizeEmail(CONTACT_EMAIL),
    normalizeEmail(to),
  ]);

  if (!localEmail || excluded.has(normalizeEmail(localEmail))) {
    return { to };
  }

  return { to, cc: [localEmail] };
}
