import type { ContactFormPurpose } from "@/lib/types";

/** Contextual listing slugs reflected in the contact page query string. */
export type ContactUrlSlugState = {
  churchSlug?: string;
  ministrySlug?: string;
  eventSlug?: string;
};

/** Builds the contact page query string for the given form routing state. */
export function buildContactSearchString(
  purpose: ContactFormPurpose,
  slugs: ContactUrlSlugState = {},
): string {
  const params = new URLSearchParams();
  params.set("purpose", purpose);
  const { churchSlug, ministrySlug, eventSlug } = slugs;
  if (purpose === "churches" && churchSlug) {
    params.set("churchSlug", churchSlug);
  }
  if (purpose === "ministries" && ministrySlug) {
    params.set("ministrySlug", ministrySlug);
  }
  if (purpose === "events" && eventSlug) {
    params.set("eventSlug", eventSlug);
  }
  return params.toString();
}

/** Updates the address bar without a navigation (keeps RSC + client form state stable). */
export function replaceContactUrlFromState(
  pathname: string,
  purpose: ContactFormPurpose,
  slugs: ContactUrlSlugState = {},
): void {
  if (globalThis.window === undefined) return;
  const search = buildContactSearchString(purpose, slugs);
  const loc = globalThis.location;
  const hash = loc.hash;
  const queryPart = search ? `?${search}` : "";
  const next = `${pathname}${queryPart}${hash}`;
  const current = `${loc.pathname}${loc.search}${hash}`;
  if (next === current) return;
  globalThis.history.replaceState(globalThis.history.state, "", next);
}
