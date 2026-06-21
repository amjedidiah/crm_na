import { describe, expect, test } from "bun:test";
import { mockContactListings } from "@/lib/__tests__/contact-test-fixtures";
import {
  normalizeContactPurpose,
  parseKebabSlugParam,
  resolveContactPageQuery,
  type ContactPageQueryState,
  type ContactPageSearchParamsInput,
} from "@/lib/contact-query";

function resolveQuery(
  params: ContactPageSearchParamsInput,
): ContactPageQueryState {
  return resolveContactPageQuery(params, mockContactListings);
}

function expectQuery(
  params: ContactPageSearchParamsInput,
  expected: Partial<ContactPageQueryState>,
) {
  expect(resolveQuery(params)).toMatchObject(expected);
}

describe("normalizeContactPurpose", () => {
  test("defaults missing or invalid to general", () => {
    expect(normalizeContactPurpose(undefined)).toBe("general");
    expect(normalizeContactPurpose("")).toBe("general");
    expect(normalizeContactPurpose("nope")).toBe("general");
    expect(normalizeContactPurpose(123)).toBe("general");
  });

  test("accepts each supported purpose", () => {
    expect(normalizeContactPurpose("general")).toBe("general");
    expect(normalizeContactPurpose("plan-visit")).toBe("plan-visit");
    expect(normalizeContactPurpose("prayer-request")).toBe("prayer-request");
    expect(normalizeContactPurpose("churches")).toBe("churches");
    expect(normalizeContactPurpose("ministries")).toBe("ministries");
    expect(normalizeContactPurpose("events")).toBe("events");
  });
});

describe("parseKebabSlugParam", () => {
  test("returns undefined for invalid", () => {
    expect(parseKebabSlugParam(undefined)).toBeUndefined();
    expect(parseKebabSlugParam("Bad Slug")).toBeUndefined();
    expect(parseKebabSlugParam("")).toBeUndefined();
  });

  test("returns trimmed slug", () => {
    expect(parseKebabSlugParam("  crm-ottawa  ")).toBe("crm-ottawa");
  });
});

describe("resolveContactPageQuery", () => {
  test("invalid purpose falls back to general and drops contextual slugs", () => {
    expectQuery(
      {
        purpose: "unknown",
        churchSlug: "crm-ottawa",
        ministrySlug: "youths",
        eventSlug: "crm-usa-national-convention-2026",
      },
      {
        purpose: "general",
        churchSlug: undefined,
        ministrySlug: undefined,
        eventSlug: undefined,
        churchSlugUnresolved: undefined,
        ministrySlugUnresolved: undefined,
        eventSlugUnresolved: undefined,
      },
    );
  });

  test("ministries resolves slug from canonical and short param keys", () => {
    const expected = {
      purpose: "ministries" as const,
      ministrySlug: "youths",
      ministryContextLabel: "CRM NA Youth Ministry",
    };
    expectQuery({ purpose: "ministries", ministry: "youths" }, expected);
    expectQuery({ purpose: "ministries", ministrySlug: "youths" }, expected);
  });

  test("churches resolves slug from canonical and short param keys", () => {
    const expected = {
      purpose: "churches" as const,
      churchSlug: "crm-ottawa",
      churchContextLabel: "CRM Ottawa",
    };
    expectQuery({ purpose: "churches", church: "crm-ottawa" }, expected);
    expectQuery({ purpose: "churches", churchSlug: "crm-ottawa" }, expected);
  });

  test("events resolves title from canonical and short param keys", () => {
    const expected = {
      purpose: "events" as const,
      eventSlug: "crm-usa-national-convention-2026",
      eventContextLabel: "CRM USA National Convention 2026",
    };
    expectQuery(
      { purpose: "events", eventSlug: "crm-usa-national-convention-2026" },
      expected,
    );
    expectQuery(
      { purpose: "events", event: "crm-usa-national-convention-2026" },
      expected,
    );
  });

  test("events with unknown slug omits slug and label", () => {
    expectQuery(
      { purpose: "events", eventSlug: "not-an-event" },
      {
        eventSlug: undefined,
        eventContextLabel: undefined,
        eventSlugUnresolved: "not-an-event",
      },
    );
  });

  test("contextual slugs are ignored when purpose does not match", () => {
    expectQuery(
      { purpose: "general", eventSlug: "crm-usa-national-convention-2026" },
      { eventSlug: undefined },
    );
    expectQuery(
      { purpose: "general", churchSlug: "crm-ottawa" },
      { churchSlug: undefined },
    );
    expectQuery(
      { purpose: "events", ministrySlug: "youths" },
      { ministrySlug: undefined },
    );
  });

  test("churches with unknown slug omits slug and label", () => {
    expectQuery(
      { purpose: "churches", churchSlug: "not-a-real-church-slug" },
      {
        purpose: "churches",
        churchSlug: undefined,
        churchContextLabel: undefined,
        churchSlugUnresolved: "not-a-real-church-slug",
      },
    );
  });

  test("churches with malformed slug omits slug", () => {
    expectQuery(
      { purpose: "churches", churchSlug: "Bad!!!" },
      {
        purpose: "churches",
        churchSlug: undefined,
        churchSlugUnresolved: undefined,
      },
    );
  });

  test("ministries with invalid slug degrades cleanly", () => {
    expectQuery(
      { purpose: "ministries", ministrySlug: "unknown-ministry" },
      {
        purpose: "ministries",
        ministrySlug: undefined,
        ministryContextLabel: undefined,
        ministrySlugUnresolved: "unknown-ministry",
      },
    );
  });

  test("plan-visit and prayer-request normalize without contextual slugs", () => {
    expectQuery(
      { purpose: "plan-visit" },
      { purpose: "plan-visit", churchSlug: undefined },
    );
    expectQuery(
      { purpose: "prayer-request" },
      { purpose: "prayer-request", eventSlug: undefined },
    );
  });

  test("plan-visit ignores listing slugs in query", () => {
    expectQuery(
      {
        purpose: "plan-visit",
        churchSlug: "crm-ottawa",
        ministrySlug: "youths",
        eventSlug: "crm-usa-national-convention-2026",
      },
      {
        purpose: "plan-visit",
        churchSlug: undefined,
        ministrySlug: undefined,
        eventSlug: undefined,
      },
    );
  });
});
