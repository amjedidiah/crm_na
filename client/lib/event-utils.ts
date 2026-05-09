import type { Event } from "@/lib/types";

/**
 * Calendar comparisons for event lifecycle tabs and “happening today” use this IANA
 * timezone so “today” matches CRM NA’s primary regional context.
 */
export const EVENTS_CALENDAR_TIME_ZONE = "America/Chicago";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function getCalendarDateStringInTimeZone(
  date: Date,
  timeZone = EVENTS_CALENDAR_TIME_ZONE,
): string {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = dtf.formatToParts(date);
  const y = parts.find((p) => p.type === "year")?.value ?? "";
  const m = parts.find((p) => p.type === "month")?.value ?? "";
  const d = parts.find((p) => p.type === "day")?.value ?? "";
  return `${y}-${m}-${d}`;
}

export function isValidIsoDateString(value: string): boolean {
  if (!ISO_DATE.test(value)) {
    return false;
  }
  const [y, mo, da] = value.split("-").map((x) => Number.parseInt(x, 10));
  const dt = new Date(Date.UTC(y, mo - 1, da));
  return (
    dt.getUTCFullYear() === y &&
    dt.getUTCMonth() === mo - 1 &&
    dt.getUTCDate() === da
  );
}

export function getEventIntervalEndDate(event: Pick<Event, "startDate" | "endDate">): string {
  return event.endDate ?? event.startDate;
}

/** True iff inclusive ISO intervals [a0,a1] and [b0,b1] overlap. */
export function isoDateIntervalsIntersect(
  startA: string,
  endA: string,
  startB: string,
  endB: string,
): boolean {
  const rangeStart = startA > startB ? startA : startB;
  const rangeEnd = endA < endB ? endA : endB;
  return rangeStart <= rangeEnd;
}

export function eventOverlapsDateRange(
  event: Event,
  rangeFrom: string,
  rangeTo: string,
): boolean {
  const es = event.startDate;
  const ee = getEventIntervalEndDate(event);
  return isoDateIntervalsIntersect(es, ee, rangeFrom, rangeTo);
}

export type EventLifecycleTab = "happening-today" | "upcoming" | "past";

export function classifyEventLifecycle(
  event: Event,
  todayCalendarDate: string,
): EventLifecycleTab {
  const start = event.startDate;
  const end = getEventIntervalEndDate(event);
  if (isoDateIntervalsIntersect(start, end, todayCalendarDate, todayCalendarDate)) {
    return "happening-today";
  }
  if (start > todayCalendarDate) {
    return "upcoming";
  }
  return "past";
}

export type EventsLifecycleBuckets = {
  happeningToday: Event[];
  upcoming: Event[];
  past: Event[];
};

export function partitionEventsByLifecycle(
  events: Event[],
  todayCalendarDate: string,
): EventsLifecycleBuckets {
  const happeningToday: Event[] = [];
  const upcoming: Event[] = [];
  const past: Event[] = [];

  for (const event of events) {
    switch (classifyEventLifecycle(event, todayCalendarDate)) {
      case "happening-today":
        happeningToday.push(event);
        break;
      case "upcoming":
        upcoming.push(event);
        break;
      case "past":
        past.push(event);
        break;
      default:
        break;
    }
  }

  return {
    happeningToday: sortEventsByDate(happeningToday),
    upcoming: sortEventsByDate(upcoming),
    past: sortEventsByDateDescending(past),
  };
}

export function filterEventsByDateRange(
  events: Event[],
  range: { from: string; to: string },
): Event[] {
  return events.filter((e) => eventOverlapsDateRange(e, range.from, range.to));
}

export type NormalizedDateRange = { from: string; to: string };

export function normalizeDateRange(
  from: string | undefined,
  to: string | undefined,
): NormalizedDateRange | null {
  if (from === undefined || to === undefined) {
    return null;
  }
  const a = from.trim();
  const b = to.trim();
  if (!a || !b) {
    return null;
  }
  if (!isValidIsoDateString(a) || !isValidIsoDateString(b)) {
    return null;
  }
  if (a <= b) {
    return { from: a, to: b };
  }
  return { from: b, to: a };
}

export function parseNormalizedDateRangeFromSearchParams(
  rawFrom: string | string[] | undefined,
  rawTo: string | string[] | undefined,
): NormalizedDateRange | null {
  const from = Array.isArray(rawFrom) ? rawFrom[0] : rawFrom;
  const to = Array.isArray(rawTo) ? rawTo[0] : rawTo;
  return normalizeDateRange(from, to);
}

export function formatDateRangeSummary(range: NormalizedDateRange): string {
  if (range.from === range.to) {
    return range.from;
  }
  return `${range.from} – ${range.to}`;
}

export function sortEventsByDate(events: Event[]) {
  return [...events].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
  );
}

function sortEventsByDateDescending(events: Event[]) {
  return [...events].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  );
}

export function getUpcomingEvents(events: Event[], now = new Date()) {
  const today = getCalendarDateStringInTimeZone(now);
  return sortEventsByDate(events).filter((e) => classifyEventLifecycle(e, today) === "upcoming");
}

export function getPastEvents(events: Event[], now = new Date()) {
  const today = getCalendarDateStringInTimeZone(now);
  return sortEventsByDate(events).filter((e) => classifyEventLifecycle(e, today) === "past");
}

export function getHappeningTodayEvents(events: Event[], now = new Date()) {
  const today = getCalendarDateStringInTimeZone(now);
  return sortEventsByDate(events).filter(
    (e) => classifyEventLifecycle(e, today) === "happening-today",
  );
}

export function getFeaturedEvent(events: Event[]) {
  const today = getCalendarDateStringInTimeZone(new Date());
  const { upcoming } = partitionEventsByLifecycle(events, today);
  return upcoming[0] ?? sortEventsByDate(events)[0] ?? null;
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
