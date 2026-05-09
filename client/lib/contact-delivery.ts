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
