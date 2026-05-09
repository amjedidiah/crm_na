import type { ContactFormPurpose } from "@/lib/types";
import {
  buildContactSearchString,
  type ContactUrlSlugState,
} from "@/lib/contact-url";

const CONTACT_PATH = "/contact";

/**
 * Site-generated href into `/contact` using canonical query keys
 * (same encoding as client URL sync via `buildContactSearchString`).
 */
export function contactHref(
  purpose: ContactFormPurpose,
  slugs: ContactUrlSlugState = {},
): string {
  return `${CONTACT_PATH}?${buildContactSearchString(purpose, slugs)}`;
}

export function contactHrefForChurchListing(slug: string): string {
  return contactHref("churches", { churchSlug: slug });
}

export function contactHrefForMinistry(slug: string): string {
  return contactHref("ministries", { ministrySlug: slug });
}

export function contactHrefForEvent(slug: string): string {
  return contactHref("events", { eventSlug: slug });
}
