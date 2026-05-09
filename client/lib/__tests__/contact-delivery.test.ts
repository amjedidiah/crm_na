import { describe, expect, test } from "bun:test";
import { slugsForContactEmail } from "@/lib/contact-delivery";

describe("slugsForContactEmail", () => {
  test("keeps church slug only for churches purpose", () => {
    expect(
      slugsForContactEmail("churches", "crm-ottawa", undefined, undefined),
    ).toEqual({
      churchSlug: "crm-ottawa",
      ministrySlug: undefined,
      eventSlug: undefined,
    });
    expect(
      slugsForContactEmail("general", "crm-ottawa", undefined, undefined),
    ).toEqual({
      churchSlug: undefined,
      ministrySlug: undefined,
      eventSlug: undefined,
    });
  });

  test("keeps ministry slug only for ministries purpose", () => {
    expect(
      slugsForContactEmail("ministries", undefined, "youths", undefined),
    ).toEqual({
      churchSlug: undefined,
      ministrySlug: "youths",
      eventSlug: undefined,
    });
    expect(
      slugsForContactEmail("events", undefined, "youths", undefined),
    ).toEqual({
      churchSlug: undefined,
      ministrySlug: undefined,
      eventSlug: undefined,
    });
  });

  test("strips all listing slugs for plan-visit and prayer-request", () => {
    expect(
      slugsForContactEmail(
        "plan-visit",
        "crm-ottawa",
        "youths",
        "crm-usa-national-convention-2026",
      ),
    ).toEqual({
      churchSlug: undefined,
      ministrySlug: undefined,
      eventSlug: undefined,
    });
    expect(
      slugsForContactEmail(
        "prayer-request",
        "crm-ottawa",
        "youths",
        "crm-usa-national-convention-2026",
      ),
    ).toEqual({
      churchSlug: undefined,
      ministrySlug: undefined,
      eventSlug: undefined,
    });
  });

  test("keeps event slug only for events purpose", () => {
    expect(
      slugsForContactEmail(
        "events",
        undefined,
        undefined,
        "crm-usa-national-convention-2026",
      ),
    ).toEqual({
      churchSlug: undefined,
      ministrySlug: undefined,
      eventSlug: "crm-usa-national-convention-2026",
    });
    expect(
      slugsForContactEmail(
        "general",
        undefined,
        undefined,
        "crm-usa-national-convention-2026",
      ),
    ).toEqual({
      churchSlug: undefined,
      ministrySlug: undefined,
      eventSlug: undefined,
    });
  });
});
