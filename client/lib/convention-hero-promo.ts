/**
 * Home hero convention spotlight — copy and sunset so the promo cannot linger past the event.
 */

export const CONVENTION_EVENT_SLUG = "crm-usa-national-convention-2026" as const;
export const CONVENTION_EVENT_DETAIL_PATH =
  `/events/${CONVENTION_EVENT_SLUG}` as const;

export const conventionHeroPromoCopy = {
  eyebrow: "National Convention",
  title: "CRM USA National Convention 2026",
  locationDates: "Houston · Jul 29–Aug 2, 2026",
  supporting:
    "Join the network for worship, teaching, and fellowship. Registration is open on the official convention site.",
  registerLabel: "Register",
  detailsLabel: "Event details",
} as const;

/** First instant after the convention window we hide the hero promo (UTC). Adjust if needed. */
export const CONVENTION_HERO_PROMO_END_MS = Date.UTC(2026, 7, 4, 6, 0, 0);

export function isConventionHeroPromoEnabled(nowMs = Date.now()): boolean {
  if (process.env.NEXT_PUBLIC_FORCE_HIDE_CONVENTION_PROMO === "true") {
    return false;
  }
  if (process.env.NEXT_PUBLIC_SHOW_CONVENTION_HERO_PROMO === "false") {
    return false;
  }
  return nowMs < CONVENTION_HERO_PROMO_END_MS;
}
