import { describe, expect, test } from "bun:test";
import { buildConventionHeroPanelData } from "@/lib/home-hero";

describe("buildConventionHeroPanelData", () => {
  test("returns null when the convention event is unavailable", () => {
    expect(buildConventionHeroPanelData(null)).toBeNull();
    expect(buildConventionHeroPanelData(undefined)).toBeNull();
  });

  test("preserves the promo copy and convention flyer when present", () => {
    expect(
      buildConventionHeroPanelData({
        imageSrc: "https://example.com/convention-flyer.jpg",
      }),
    ).toMatchObject({
      title: "CRM USA National Convention 2026",
      detailsHref: "/events/crm-usa-national-convention-2026",
      flyerSrc: "https://example.com/convention-flyer.jpg",
    });
  });

  test("keeps the panel data but omits flyerSrc when the event has no image", () => {
    expect(buildConventionHeroPanelData({ imageSrc: "" })).toMatchObject({
      title: "CRM USA National Convention 2026",
      flyerSrc: undefined,
      flyerAlt: "Program flyer for CRM USA National Convention 2026",
    });
  });
});
