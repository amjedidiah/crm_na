import { describe, expect, test } from "bun:test";
import {
  resolveContactEmailRecipients,
  slugsForContactEmail,
} from "@/lib/contact-delivery";

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

  test("keeps the national inbox as primary and cc's a church-specific address", () => {
    expect(
      resolveContactEmailRecipients(
        "churches",
        "crm-praise-center",
        undefined,
        undefined,
      ),
    ).toEqual({
      to: "info@crm-na.org",
      cc: ["crmpraisecenter@gmail.com"],
    });
  });

  test("does not cc a church when it already uses the national inbox", () => {
    expect(
      resolveContactEmailRecipients(
        "churches",
        "crm-ottawa",
        undefined,
        undefined,
      ),
    ).toEqual({
      to: "info@crm-na.org",
    });
  });

  test("does not cc a missing ministry or event contact email", () => {
    expect(
      resolveContactEmailRecipients("ministries", undefined, "youths", undefined),
    ).toEqual({
      to: "info@crm-na.org",
    });

    expect(
      resolveContactEmailRecipients(
        "events",
        undefined,
        undefined,
        "crm-usa-national-convention-2026",
      ),
    ).toEqual({
      to: "info@crm-na.org",
    });
  });

  test("does not duplicate the local recipient when the national inbox is overridden", () => {
    expect(
      resolveContactEmailRecipients(
        "churches",
        "crm-rhode-island",
        undefined,
        undefined,
        "ops@crm-na.org",
      ),
    ).toEqual({
      to: "ops@crm-na.org",
    });
  });
});
