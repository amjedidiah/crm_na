import { describe, expect, test } from "bun:test";
import {
  contactHrefForChurchListing,
  contactHrefForEvent,
  contactHrefForMinistry,
} from "@/lib/contact-hrefs";

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
