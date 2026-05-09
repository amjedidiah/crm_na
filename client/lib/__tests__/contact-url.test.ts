import { describe, expect, test } from "bun:test";
import { buildContactSearchString } from "@/lib/contact-url";

describe("buildContactSearchString", () => {
  test("includes purpose and optional slugs when purpose matches", () => {
    const q = new URLSearchParams(
      buildContactSearchString("churches", { churchSlug: "crm-ottawa" }),
    );
    expect(q.get("purpose")).toBe("churches");
    expect(q.get("churchSlug")).toBe("crm-ottawa");
    expect(q.get("ministrySlug")).toBeNull();
    expect(q.get("eventSlug")).toBeNull();
  });

  test("omits church slug when purpose is not churches", () => {
    const q = new URLSearchParams(
      buildContactSearchString("general", { churchSlug: "crm-ottawa" }),
    );
    expect(q.get("purpose")).toBe("general");
    expect(q.get("churchSlug")).toBeNull();
  });

  test("includes ministry slug only for ministries purpose", () => {
    const q = new URLSearchParams(
      buildContactSearchString("ministries", { ministrySlug: "youths" }),
    );
    expect(q.get("purpose")).toBe("ministries");
    expect(q.get("ministrySlug")).toBe("youths");
  });

  test("includes event slug only for events purpose", () => {
    const q = new URLSearchParams(
      buildContactSearchString("events", {
        eventSlug: "crm-usa-national-convention-2026",
      }),
    );
    expect(q.get("purpose")).toBe("events");
    expect(q.get("eventSlug")).toBe("crm-usa-national-convention-2026");
  });
});
