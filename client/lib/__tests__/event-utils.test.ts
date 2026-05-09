import { describe, expect, test } from "bun:test";
import type { Event } from "@/lib/types";
import { events } from "@/lib/mock-data";
import {
  assertSlugRedirectHasExternalUrl,
  eventShouldAppearInSitemap,
  getEventListingHref,
  getFeaturedEvent,
  getStaticEventParamSlugs,
  getUpcomingEvents,
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
