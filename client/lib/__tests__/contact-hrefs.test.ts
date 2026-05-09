import { describe, expect, test } from "bun:test";
import {
  CONTACT_CONTEXT_SLUG_COVERAGE_HREFS,
  CONTACT_PURPOSE_COVERAGE_HREFS,
} from "@/lib/contact-hrefs-coverage";
import {
  contactHref,
  contactHrefForChurchListing,
  contactHrefForEvent,
  contactHrefForMinistry,
} from "@/lib/contact-hrefs";
import { CONTACT_FORM_PURPOSES } from "@/lib/contact-purposes";

describe("contactHref", () => {
  test("purpose-only links use canonical purpose param", () => {
    expect(contactHref("general")).toBe("/contact?purpose=general");
    expect(contactHref("plan-visit")).toBe("/contact?purpose=plan-visit");
    expect(contactHref("prayer-request")).toBe("/contact?purpose=prayer-request");
    expect(contactHref("churches")).toBe("/contact?purpose=churches");
    expect(contactHref("ministries")).toBe("/contact?purpose=ministries");
    expect(contactHref("events")).toBe("/contact?purpose=events");
  });

  test("does not emit contextual slug keys when purpose does not match", () => {
    expect(contactHref("general", { churchSlug: "crm-ottawa" })).toBe(
      "/contact?purpose=general",
    );
    expect(
      contactHref("plan-visit", {
        churchSlug: "crm-ottawa",
        ministrySlug: "youths",
        eventSlug: "crm-usa-national-convention-2026",
      }),
    ).toBe("/contact?purpose=plan-visit");
    expect(contactHref("events", { churchSlug: "crm-ottawa" })).toBe(
      "/contact?purpose=events",
    );
  });

  test("emits canonical slug keys only for matching purpose", () => {
    expect(contactHref("churches", { churchSlug: "crm-ottawa" })).toBe(
      "/contact?purpose=churches&churchSlug=crm-ottawa",
    );
    expect(contactHref("ministries", { ministrySlug: "youths" })).toBe(
      "/contact?purpose=ministries&ministrySlug=youths",
    );
    expect(
      contactHref("events", { eventSlug: "crm-usa-national-convention-2026" }),
    ).toBe(
      "/contact?purpose=events&eventSlug=crm-usa-national-convention-2026",
    );
  });

  test("does not emit short alias keys in query string", () => {
    const href = contactHref("churches", { churchSlug: "crm-ottawa" });
    expect(href).not.toContain("church=");
    expect(href).not.toContain("ministry=");
    expect(href).not.toContain("event=");
  });
});

describe("contact deep links", () => {
  test("church listing href encodes purpose and slug", () => {
    expect(contactHrefForChurchListing("crm-ottawa")).toBe(
      "/contact?purpose=churches&churchSlug=crm-ottawa",
    );
  });

  test("ministry href encodes purpose and slug", () => {
    expect(contactHrefForMinistry("youths")).toBe(
      "/contact?purpose=ministries&ministrySlug=youths",
    );
  });

  test("event href encodes purpose and slug", () => {
    expect(contactHrefForEvent("crm-usa-national-convention-2026")).toBe(
      "/contact?purpose=events&eventSlug=crm-usa-national-convention-2026",
    );
  });
});

describe("contact purpose coverage map", () => {
  test("includes every supported purpose", () => {
    for (const purpose of CONTACT_FORM_PURPOSES) {
      const href = CONTACT_PURPOSE_COVERAGE_HREFS[purpose];
      expect(href).toMatch(/^\/contact\?/);
      expect(href).toContain(`purpose=${encodeURIComponent(purpose)}`);
    }
  });

  test("context slug coverage uses canonical keys only", () => {
    expect(CONTACT_CONTEXT_SLUG_COVERAGE_HREFS.churchSlug).toContain(
      "churchSlug=",
    );
    expect(CONTACT_CONTEXT_SLUG_COVERAGE_HREFS.ministrySlug).toContain(
      "ministrySlug=",
    );
    expect(CONTACT_CONTEXT_SLUG_COVERAGE_HREFS.eventSlug).toContain(
      "eventSlug=",
    );
    for (const href of Object.values(CONTACT_CONTEXT_SLUG_COVERAGE_HREFS)) {
      expect(href).not.toMatch(/(^|[?&])church=/);
      expect(href).not.toMatch(/(^|[?&])ministry=/);
      expect(href).not.toMatch(/(^|[?&])event=/);
    }
  });
});
