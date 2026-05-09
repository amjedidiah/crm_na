import { describe, expect, test } from "bun:test";
import type { Church } from "@/lib/types";
import {
  assertExternalLinkOnlyHasWebsite,
  assertSlugRedirectHasWebsite,
  churchShouldAppearInSitemap,
  filterChurchesByDirectoryRegion,
  getChurchListingHref,
  getFeaturedChurchesForHome,
  getSecondaryChurches,
  getSpotlightChurches,
  getStaticParamSlugs,
  isDirectoryBranchLinkChurch,
  sortChurchesByDirectoryOrder,
} from "@/lib/church-utils";
import { churches } from "@/lib/mock-data";

const base = {
  name: "Test",
  region: "USA" as const,
  city: "X",
  stateOrProvince: "Y",
  country: "Z",
  summary: "S",
  story: [] as string[],
  address: "A",
  phone: "P",
  email: "e@e.org",
  serviceTimes: [] as Church["serviceTimes"],
  programs: [] as Church["programs"],
  directoryOrder: 1,
};

describe("church utils", () => {
  test("sortChurchesByDirectoryOrder orders ascending", () => {
    const a: Church = {
      ...base,
      slug: "a",
      mode: "internal-page",
      directoryOrder: 10,
    };
    const b: Church = {
      ...base,
      slug: "b",
      mode: "internal-page",
      directoryOrder: 2,
    };
    const sorted = sortChurchesByDirectoryOrder([a, b]);
    expect(sorted.map((c) => c.slug)).toEqual(["b", "a"]);
  });

  test("getStaticParamSlugs includes internal and slug-redirect only", () => {
    const params = getStaticParamSlugs(churches);
    const slugs = params.map((p) => p.slug);
    expect(slugs).toContain("crm-word-of-life");
    expect(slugs).toContain("crm-praise-center");
    expect(slugs).toContain("crm-brampton");
    expect(slugs).not.toContain("crm-ottawa");
    expect(slugs).not.toContain("crm-north-bay");
    expect(slugs).not.toContain("crm-mexico-city");
  });

  test("churchShouldAppearInSitemap is internal-page only", () => {
    const internal = churches.find((c) => c.slug === "crm-word-of-life");
    const redirect = churches.find((c) => c.slug === "crm-praise-center");
    expect(internal && churchShouldAppearInSitemap(internal)).toBe(true);
    expect(redirect && churchShouldAppearInSitemap(redirect)).toBe(false);
  });

  test("getSpotlightChurches excludes listing-only and external-link-only", () => {
    const spot = getSpotlightChurches(churches);
    expect(spot.every((c) => c.mode !== "listing-only")).toBe(true);
    expect(spot.every((c) => c.mode !== "external-link-only")).toBe(true);
  });

  test("getSecondaryChurches is external-link-only and listing-only", () => {
    const sec = getSecondaryChurches(churches);
    expect(sec.every((c) => c.mode === "external-link-only" || c.mode === "listing-only")).toBe(
      true,
    );
  });

  test("isDirectoryBranchLinkChurch matches spotlight modes", () => {
    const internal = churches.find((c) => c.slug === "crm-word-of-life")!;
    const redirect = churches.find((c) => c.slug === "crm-brampton")!;
    const external = churches.find((c) => c.slug === "crm-ottawa")!;
    const listing = churches.find((c) => c.slug === "crm-north-bay")!;
    expect(isDirectoryBranchLinkChurch(internal)).toBe(true);
    expect(isDirectoryBranchLinkChurch(redirect)).toBe(true);
    expect(isDirectoryBranchLinkChurch(external)).toBe(false);
    expect(isDirectoryBranchLinkChurch(listing)).toBe(false);
  });

  test("filterChurchesByDirectoryRegion All returns full list", () => {
    expect(filterChurchesByDirectoryRegion(churches, "All").length).toBe(
      churches.length,
    );
  });

  test("filterChurchesByDirectoryRegion Mexico includes Mexico City", () => {
    const mx = filterChurchesByDirectoryRegion(churches, "Mexico");
    expect(mx.some((c) => c.slug === "crm-mexico-city")).toBe(true);
  });

  test("getFeaturedChurchesForHome returns first four internal or redirect by order", () => {
    const home = getFeaturedChurchesForHome(churches);
    expect(home.length).toBeLessThanOrEqual(4);
    expect(home[0]?.slug).toBe("crm-word-of-life");
    expect(home.every((c) => c.mode === "internal-page" || c.mode === "slug-redirect")).toBe(
      true,
    );
  });

  test("getChurchListingHref internal uses local path", () => {
    const c = churches.find((x) => x.slug === "crm-word-of-life")!;
    expect(getChurchListingHref(c)).toEqual({
      href: "/churches/crm-word-of-life",
      external: false,
    });
  });

  test("getChurchListingHref slug-redirect uses the external canonical site", () => {
    const c = churches.find((x) => x.slug === "crm-praise-center")!;
    expect(getChurchListingHref(c)).toEqual({
      href: "https://www.crmpraisecenter.org/",
      external: true,
    });
  });

  test("getChurchListingHref external-link-only uses external site", () => {
    const c = churches.find((x) => x.slug === "crm-ottawa")!;
    expect(getChurchListingHref(c)).toEqual({
      href: "https://crm-can.org/",
      external: true,
    });
  });

  test("getChurchListingHref listing-only returns null", () => {
    const c = churches.find((x) => x.slug === "crm-north-bay")!;
    expect(getChurchListingHref(c)).toBeNull();
  });

  test("assertSlugRedirectHasWebsite throws when redirect lacks website", () => {
    const bad: Church = {
      ...base,
      slug: "bad",
      mode: "slug-redirect",
      directoryOrder: 1,
      website: undefined,
      story: ["x"],
      pastorId: "p",
      serviceTimes: [{ label: "Sun", day: "Sunday", time: "10" }],
      programs: [],
    };
    expect(() => assertSlugRedirectHasWebsite(bad)).toThrow(
      /missing website URL/,
    );
  });

  test("assertExternalLinkOnlyHasWebsite throws when external lacks website", () => {
    const bad: Church = {
      ...base,
      slug: "bad",
      mode: "external-link-only",
      directoryOrder: 1,
      story: [],
    };
    expect(() => assertExternalLinkOnlyHasWebsite(bad)).toThrow(
      /missing website URL/,
    );
  });
});
