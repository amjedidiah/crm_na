import {
  contactHref,
  contactHrefForChurchListing,
  contactHrefForEvent,
  contactHrefForMinistry,
} from "@/lib/contact-hrefs";
import { CONTACT_FORM_PURPOSES } from "@/lib/contact-purposes";
import type { ContactFormPurpose } from "@/lib/types";

/**
 * One canonical href per contact purpose — kept in sync with `CONTACT_FORM_PURPOSES`
 * for regression coverage (see `contact-hrefs.test.ts`).
 */
export const CONTACT_PURPOSE_COVERAGE_HREFS = Object.fromEntries(
  CONTACT_FORM_PURPOSES.map((purpose) => [purpose, contactHref(purpose)]),
) as Record<ContactFormPurpose, string>;

/** Example hrefs proving each contextual slug key appears on the site contract. */
export const CONTACT_CONTEXT_SLUG_COVERAGE_HREFS = {
  churchSlug: contactHrefForChurchListing("crm-ottawa"),
  ministrySlug: contactHrefForMinistry("youths"),
  eventSlug: contactHrefForEvent("crm-usa-national-convention-2026"),
} as const;
