import { describe, expect, test } from "bun:test";
import { givingContent } from "@/lib/giving-data";
import {
  filterValidGivingMethods,
  getPrimaryZeffyHref,
  isAllowedGivingMethodId,
  isFullyEmptyGivingContent,
  isGivingMethodValid,
  type GivingMethod,
} from "@/lib/giving";

describe("isAllowedGivingMethodId", () => {
  test("accepts zeffy and zelle", () => {
    expect(isAllowedGivingMethodId("zeffy")).toBe(true);
    expect(isAllowedGivingMethodId("zelle")).toBe(true);
  });

  test("rejects other ids", () => {
    expect(isAllowedGivingMethodId("paypal")).toBe(false);
    expect(isAllowedGivingMethodId("")).toBe(false);
  });
});

describe("isGivingMethodValid", () => {
  const baseZeffy: GivingMethod = {
    id: "zeffy",
    title: "Zeffy",
    description: "Card",
    icon: "credit-card",
    ctaHref: "https://www.zeffy.com/en-US/donation-form/example",
  };

  const baseZelle: GivingMethod = {
    id: "zelle",
    title: "Zelle",
    description: "Bank",
    icon: "smartphone",
    detailLines: ["Recipient email: treasury@example.com"],
  };

  test("zeffy requires https cta", () => {
    expect(isGivingMethodValid(baseZeffy)).toBe(true);
    expect(isGivingMethodValid({ ...baseZeffy, ctaHref: undefined })).toBe(false);
    expect(isGivingMethodValid({ ...baseZeffy, ctaHref: "http://insecure.example" })).toBe(
      false,
    );
  });

  test("zelle requires non-empty detail lines", () => {
    expect(isGivingMethodValid(baseZelle)).toBe(true);
    expect(isGivingMethodValid({ ...baseZelle, detailLines: [] })).toBe(false);
    expect(isGivingMethodValid({ ...baseZelle, detailLines: ["  ", ""] })).toBe(false);
  });
});

describe("filterValidGivingMethods", () => {
  test("drops invalid entries and keeps order of valid ones", () => {
    const methods: GivingMethod[] = [
      {
        id: "zeffy",
        title: "Bad",
        description: "x",
        icon: "credit-card",
      },
      {
        id: "zelle",
        title: "Good",
        description: "x",
        icon: "smartphone",
        detailLines: ["email@example.com"],
      },
    ];
    const v = filterValidGivingMethods(methods);
    expect(v).toHaveLength(1);
    expect(v[0]?.id).toBe("zelle");
  });
});

describe("getPrimaryZeffyHref", () => {
  test("returns https href from valid zeffy method", () => {
    const href = getPrimaryZeffyHref(givingContent.methods);
    expect(href).toMatch(/^https:\/\/www\.zeffy\.com\//);
  });
});

describe("isFullyEmptyGivingContent", () => {
  test("true only when all sections are empty", () => {
    expect(
      isFullyEmptyGivingContent({ methods: [], categories: [], faq: [] }),
    ).toBe(true);
    expect(
      isFullyEmptyGivingContent({
        methods: [],
        categories: [{ id: "a", title: "A", description: "b" }],
        faq: [],
      }),
    ).toBe(false);
  });
});
