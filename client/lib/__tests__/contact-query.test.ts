import { describe, expect, test } from "bun:test";
import {
  normalizeContactPurpose,
  parseKebabSlugParam,
  resolveContactPageQuery,
} from "@/lib/contact-query";

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
    const r = resolveContactPageQuery({
      purpose: "unknown",
      churchSlug: "crm-ottawa",
      ministrySlug: "youths",
      eventSlug: "crm-usa-national-convention-2026",
    });
    expect(r.purpose).toBe("general");
    expect(r.churchSlug).toBeUndefined();
    expect(r.ministrySlug).toBeUndefined();
    expect(r.eventSlug).toBeUndefined();
    expect(r.churchSlugUnresolved).toBeUndefined();
    expect(r.ministrySlugUnresolved).toBeUndefined();
    expect(r.eventSlugUnresolved).toBeUndefined();
  });

  test("ministries accepts ministry short param alias", () => {
    const r = resolveContactPageQuery({
      purpose: "ministries",
      ministry: "youths",
    });
    expect(r.ministrySlug).toBe("youths");
    expect(r.ministryContextLabel).toBe("CRM NA Youth Ministry");
  });

  test("churches accepts church short param alias", () => {
    const r = resolveContactPageQuery({
      purpose: "churches",
      church: "crm-ottawa",
    });
    expect(r.churchSlug).toBe("crm-ottawa");
    expect(r.churchContextLabel).toBe("CRM Ottawa");
  });

  test("events with valid slug resolves title", () => {
    const r = resolveContactPageQuery({
      purpose: "events",
      eventSlug: "crm-usa-national-convention-2026",
    });
    expect(r.purpose).toBe("events");
    expect(r.eventSlug).toBe("crm-usa-national-convention-2026");
    expect(r.eventContextLabel).toBe("CRM USA National Convention 2026");
  });

  test("events accepts event short param alias", () => {
    const r = resolveContactPageQuery({
      purpose: "events",
      event: "crm-usa-national-convention-2026",
    });
    expect(r.eventSlug).toBe("crm-usa-national-convention-2026");
  });

  test("events with unknown slug omits slug and label", () => {
    const r = resolveContactPageQuery({
      purpose: "events",
      eventSlug: "not-an-event",
    });
    expect(r.eventSlug).toBeUndefined();
    expect(r.eventContextLabel).toBeUndefined();
    expect(r.eventSlugUnresolved).toBe("not-an-event");
  });

  test("event slug ignored when purpose is not events", () => {
    const r = resolveContactPageQuery({
      purpose: "general",
      eventSlug: "crm-usa-national-convention-2026",
    });
    expect(r.eventSlug).toBeUndefined();
  });

  test("churches with valid slug resolves label", () => {
    const r = resolveContactPageQuery({
      purpose: "churches",
      churchSlug: "crm-ottawa",
    });
    expect(r.purpose).toBe("churches");
    expect(r.churchSlug).toBe("crm-ottawa");
    expect(r.churchContextLabel).toBe("CRM Ottawa");
  });

  test("churches with unknown slug omits slug and label", () => {
    const r = resolveContactPageQuery({
      purpose: "churches",
      churchSlug: "not-a-real-church-slug",
    });
    expect(r.purpose).toBe("churches");
    expect(r.churchSlug).toBeUndefined();
    expect(r.churchContextLabel).toBeUndefined();
    expect(r.churchSlugUnresolved).toBe("not-a-real-church-slug");
  });

  test("churches with malformed slug omits slug", () => {
    const r = resolveContactPageQuery({
      purpose: "churches",
      churchSlug: "Bad!!!",
    });
    expect(r.purpose).toBe("churches");
    expect(r.churchSlug).toBeUndefined();
    expect(r.churchSlugUnresolved).toBeUndefined();
  });

  test("ministries with valid slug resolves label", () => {
    const r = resolveContactPageQuery({
      purpose: "ministries",
      ministrySlug: "youths",
    });
    expect(r.purpose).toBe("ministries");
    expect(r.ministrySlug).toBe("youths");
    expect(r.ministryContextLabel).toBe("CRM NA Youth Ministry");
  });

  test("ministries with invalid slug degrades cleanly", () => {
    const r = resolveContactPageQuery({
      purpose: "ministries",
      ministrySlug: "unknown-ministry",
    });
    expect(r.purpose).toBe("ministries");
    expect(r.ministrySlug).toBeUndefined();
    expect(r.ministryContextLabel).toBeUndefined();
    expect(r.ministrySlugUnresolved).toBe("unknown-ministry");
  });

  test("church slug ignored when purpose is not churches", () => {
    const r = resolveContactPageQuery({
      purpose: "general",
      churchSlug: "crm-ottawa",
    });
    expect(r.churchSlug).toBeUndefined();
  });

  test("ministry slug ignored when purpose is not ministries", () => {
    const r = resolveContactPageQuery({
      purpose: "events",
      ministrySlug: "youths",
    });
    expect(r.ministrySlug).toBeUndefined();
  });

  test("plan-visit and prayer-request normalize without contextual slugs", () => {
    const visit = resolveContactPageQuery({ purpose: "plan-visit" });
    expect(visit.purpose).toBe("plan-visit");
    expect(visit.churchSlug).toBeUndefined();

    const prayer = resolveContactPageQuery({ purpose: "prayer-request" });
    expect(prayer.purpose).toBe("prayer-request");
    expect(prayer.eventSlug).toBeUndefined();
  });

  test("plan-visit ignores listing slugs in query", () => {
    const r = resolveContactPageQuery({
      purpose: "plan-visit",
      churchSlug: "crm-ottawa",
      ministrySlug: "youths",
      eventSlug: "crm-usa-national-convention-2026",
    });
    expect(r.purpose).toBe("plan-visit");
    expect(r.churchSlug).toBeUndefined();
    expect(r.ministrySlug).toBeUndefined();
    expect(r.eventSlug).toBeUndefined();
  });
});
