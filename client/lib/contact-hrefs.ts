/** Deep links into `/contact` with purpose + listing slug (canonical query keys). */

export function contactHrefForChurchListing(slug: string): string {
  const params = new URLSearchParams({
    purpose: "churches",
    churchSlug: slug,
  });
  return `/contact?${params.toString()}`;
}

export function contactHrefForMinistry(slug: string): string {
  const params = new URLSearchParams({
    purpose: "ministries",
    ministrySlug: slug,
  });
  return `/contact?${params.toString()}`;
}

export function contactHrefForEvent(slug: string): string {
  const params = new URLSearchParams({
    purpose: "events",
    eventSlug: slug,
  });
  return `/contact?${params.toString()}`;
}
