import { describe, expect, it, afterEach } from "bun:test";
import {
  buildConventionRegistrationUrl,
  CONVENTION_REGISTRATION_URL,
  toAbsoluteSiteUrl,
} from "@/lib/convention-public";

describe("convention public URLs", () => {
  const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  afterEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
  });

  it("resolves site-relative paths against the public site URL", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://crm-na.org";

    expect(toAbsoluteSiteUrl("/events/crm-usa-national-convention-2026")).toBe(
      "https://crm-na.org/events/crm-usa-national-convention-2026",
    );
  });

  it("preserves absolute URLs", () => {
    expect(
      toAbsoluteSiteUrl(
        "https://crm-na.org/events/crm-usa-national-convention-2026",
      ),
    ).toBe("https://crm-na.org/events/crm-usa-national-convention-2026");
  });

  it("appends a return target ahead of the register hash", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://crm-na.org";

    expect(
      buildConventionRegistrationUrl({
        returnTo: "/events/crm-usa-national-convention-2026",
      }),
    ).toBe(
      "https://crmusa2026-convention.crm-na.org/?returnTo=https%3A%2F%2Fwww.crm-na.org%2Fevents%2Fcrm-usa-national-convention-2026#register",
    );
  });

  it("leaves the base URL unchanged when no return target is provided", () => {
    expect(buildConventionRegistrationUrl()).toBe(CONVENTION_REGISTRATION_URL);
  });
});
