import { describe, expect, test } from "bun:test";
import type { Event } from "@/lib/types";
import { events } from "@/lib/mock-data";
import {
  assertSlugRedirectHasExternalUrl,
  classifyEventLifecycle,
  eventOverlapsDateRange,
  eventShouldAppearInSitemap,
  filterEventsByDateRange,
  formatDateRangeSummary,
  getCalendarDateStringInTimeZone,
  getEventIntervalEndDate,
  getEventListingHref,
  getFeaturedEvent,
  getHappeningTodayEvents,
  getStaticEventParamSlugs,
  getUpcomingEvents,
  isoDateIntervalsIntersect,
  normalizeDateRange,
  partitionEventsByLifecycle,
  parseNormalizedDateRangeFromSearchParams,
} from "@/lib/event-utils";

const baseEvent: Omit<Event, "slug" | "mode" | "title"> = {
  summary: "Event summary",
  description: ["Event description"],
  startDate: "2026-07-29",
  location: "Houston, TX",
};

describe("event utils", () => {
  test("returns an upcoming event when available", () => {
    expect(getUpcomingEvents(events).length).toBeGreaterThan(0);
    expect(getFeaturedEvent(events)).not.toBeNull();
  });

  test("getStaticEventParamSlugs includes internal and redirect events", () => {
    const redirect: Event = {
      ...baseEvent,
      slug: "crm-na-external-gathering",
      mode: "slug-redirect",
      title: "External gathering",
      externalUrl: "https://events.crm-na.org/external-gathering",
    };

    expect(getStaticEventParamSlugs([...events, redirect])).toEqual([
      { slug: "crm-usa-national-convention-2026" },
      { slug: "crm-na-external-gathering" },
    ]);
  });

  test("eventShouldAppearInSitemap is internal-page only", () => {
    const internal = events[0];
    const redirect: Event = {
      ...baseEvent,
      slug: "crm-na-external-gathering",
      mode: "slug-redirect",
      title: "External gathering",
      externalUrl: "https://events.crm-na.org/external-gathering",
    };

    expect(eventShouldAppearInSitemap(internal)).toBe(true);
    expect(eventShouldAppearInSitemap(redirect)).toBe(false);
  });

  test("getEventListingHref uses the local slug for internal events", () => {
    const internal = events[0];
    expect(getEventListingHref(internal)).toEqual({
      href: "/events/crm-usa-national-convention-2026",
      external: false,
    });
  });

  test("getEventListingHref uses the external canonical site for redirect events", () => {
    const redirect: Event = {
      ...baseEvent,
      slug: "crm-na-external-gathering",
      mode: "slug-redirect",
      title: "External gathering",
      externalUrl: "https://events.crm-na.org/external-gathering",
    };

    expect(getEventListingHref(redirect)).toEqual({
      href: "https://events.crm-na.org/external-gathering",
      external: true,
    });
  });

  test("assertSlugRedirectHasExternalUrl throws when redirect lacks external URL", () => {
    const bad: Event = {
      ...baseEvent,
      slug: "bad-external-event",
      mode: "slug-redirect",
      title: "Broken redirect event",
    };

    expect(() => assertSlugRedirectHasExternalUrl(bad)).toThrow(
      /missing external URL/,
    );
  });
});

describe("lifecycle and intervals", () => {
  const multiDay: Event = {
    ...baseEvent,
    slug: "multi",
    mode: "internal-page",
    title: "Multi",
    startDate: "2026-06-10",
    endDate: "2026-06-12",
  };

  test("getEventIntervalEndDate defaults to startDate", () => {
    const e: Event = {
      ...baseEvent,
      slug: "a",
      mode: "internal-page",
      title: "A",
      startDate: "2026-01-01",
    };
    expect(getEventIntervalEndDate(e)).toBe("2026-01-01");
  });

  test("classifyEventLifecycle: happening today when interval spans today", () => {
    expect(classifyEventLifecycle(multiDay, "2026-06-11")).toBe("happening-today");
  });

  test("classifyEventLifecycle: upcoming when start is after today", () => {
    expect(classifyEventLifecycle(multiDay, "2026-06-01")).toBe("upcoming");
  });

  test("classifyEventLifecycle: past when interval ended before today", () => {
    expect(classifyEventLifecycle(multiDay, "2026-06-20")).toBe("past");
  });

  test("partitionEventsByLifecycle is mutually exclusive buckets", () => {
    const today = "2026-06-11";
    const buckets = partitionEventsByLifecycle([multiDay], today);
    expect(buckets.happeningToday).toHaveLength(1);
    expect(buckets.upcoming).toHaveLength(0);
    expect(buckets.past).toHaveLength(0);
  });

  test("getHappeningTodayEvents respects Chicago calendar day via injected now", () => {
    const dayPicker = new Date("2026-06-11T15:00:00Z");
    expect(getHappeningTodayEvents([multiDay], dayPicker)).toHaveLength(1);
  });

  test("isoDateIntervalsIntersect and empty input arrays", () => {
    expect(isoDateIntervalsIntersect("2026-01-05", "2026-01-10", "2026-01-01", "2026-01-04")).toBe(
      false,
    );
    expect(isoDateIntervalsIntersect("2026-01-05", "2026-01-10", "2026-01-10", "2026-01-15")).toBe(
      true,
    );
    expect(partitionEventsByLifecycle([], "2026-01-01")).toEqual({
      happeningToday: [],
      upcoming: [],
      past: [],
    });
  });
});

describe("date range parsing and filtering", () => {
  const e1: Event = {
    ...baseEvent,
    slug: "a",
    mode: "internal-page",
    title: "A",
    startDate: "2026-03-01",
    endDate: "2026-03-03",
  };

  test("normalizeDateRange returns null for partial or invalid params", () => {
    expect(normalizeDateRange(undefined, "2026-01-01")).toBeNull();
    expect(normalizeDateRange("2026-01-01", undefined)).toBeNull();
    expect(normalizeDateRange("2026-01-01", "not-a-date")).toBeNull();
    expect(normalizeDateRange("2026-13-01", "2026-01-02")).toBeNull();
  });

  test("normalizeDateRange swaps reversed ranges", () => {
    expect(normalizeDateRange("2026-03-10", "2026-03-01")).toEqual({
      from: "2026-03-01",
      to: "2026-03-10",
    });
  });

  test("parseNormalizedDateRangeFromSearchParams reads first array value", () => {
    expect(
      parseNormalizedDateRangeFromSearchParams(["2026-03-02", "ignored"], "2026-03-04"),
    ).toEqual({ from: "2026-03-02", to: "2026-03-04" });
  });

  test("filterEventsByDateRange: multi-day overlap and single-day", () => {
    expect(
      filterEventsByDateRange([e1], { from: "2026-03-02", to: "2026-03-02" }),
    ).toHaveLength(1);
    expect(
      filterEventsByDateRange([e1], { from: "2026-03-04", to: "2026-03-05" }),
    ).toHaveLength(0);
    const single: Event = {
      ...baseEvent,
      slug: "b",
      mode: "internal-page",
      title: "B",
      startDate: "2026-04-01",
    };
    expect(
      filterEventsByDateRange([single], { from: "2026-04-01", to: "2026-04-01" }),
    ).toHaveLength(1);
  });

  test("eventOverlapsDateRange false when no overlap", () => {
    expect(eventOverlapsDateRange(e1, "2026-04-01", "2026-04-02")).toBe(false);
  });

  test("formatDateRangeSummary", () => {
    expect(formatDateRangeSummary({ from: "2026-01-01", to: "2026-01-01" })).toBe(
      "2026-01-01",
    );
    expect(formatDateRangeSummary({ from: "2026-01-01", to: "2026-01-05" })).toContain(
      "–",
    );
  });
});

describe("calendar date string", () => {
  test("getCalendarDateStringInTimeZone formats with fixed UTC instant", () => {
    const instant = new Date("2026-07-04T06:00:00.000Z");
    const chicago = getCalendarDateStringInTimeZone(instant, "America/Chicago");
    expect(chicago).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(chicago).toBe("2026-07-04");
  });
});
