import type { Event } from "@/lib/types";

export function sortEventsByDate(events: Event[]) {
  return [...events].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
  );
}

export function getUpcomingEvents(events: Event[], now = new Date()) {
  return sortEventsByDate(events).filter(
    (event) => new Date(event.startDate).getTime() >= now.getTime(),
  );
}

export function getPastEvents(events: Event[], now = new Date()) {
  return sortEventsByDate(events).filter(
    (event) => new Date(event.startDate).getTime() < now.getTime(),
  );
}

export function getFeaturedEvent(events: Event[]) {
  return getUpcomingEvents(events)[0] ?? sortEventsByDate(events)[0] ?? null;
}

export function eventHasStaticSlugRoute(event: Event): boolean {
  return event.mode === "internal-page" || event.mode === "slug-redirect";
}

export function eventShouldAppearInSitemap(event: Event): boolean {
  return event.mode === "internal-page";
}

export function getStaticEventParamSlugs(
  events: Event[],
): { slug: string }[] {
  return sortEventsByDate(events)
    .filter(eventHasStaticSlugRoute)
    .map((event) => ({ slug: event.slug }));
}

export function assertSlugRedirectHasExternalUrl(
  event: Event,
): asserts event is Event & { externalUrl: string } {
  if (event.mode !== "slug-redirect") {
    return;
  }
  if (!event.externalUrl) {
    throw new Error(
      `Event "${event.slug}" is slug-redirect but missing external URL.`,
    );
  }
}

export function isInternalEventPage(event: Event): boolean {
  return event.mode === "internal-page";
}

export function getEventListingHref(
  event: Pick<Event, "slug" | "mode" | "externalUrl">,
): { href: string; external: boolean } {
  if (event.mode === "slug-redirect" && event.externalUrl) {
    return { href: event.externalUrl, external: true };
  }

  return { href: `/events/${event.slug}`, external: false };
}
