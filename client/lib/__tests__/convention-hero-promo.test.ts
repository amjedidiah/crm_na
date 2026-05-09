import { describe, expect, test } from "bun:test";
import {
  CONVENTION_HERO_PROMO_END_MS,
  isConventionHeroPromoEnabled,
} from "@/lib/convention-hero-promo";

describe("isConventionHeroPromoEnabled", () => {
  test("is true before end threshold when promo flag is not false", () => {
    expect(isConventionHeroPromoEnabled(CONVENTION_HERO_PROMO_END_MS - 1)).toBe(
      true,
    );
  });

  test("is false when the local preview flag forces the convention promo off", () => {
    const previous = process.env.NEXT_PUBLIC_FORCE_HIDE_CONVENTION_PROMO;
    process.env.NEXT_PUBLIC_FORCE_HIDE_CONVENTION_PROMO = "true";

    try {
      expect(isConventionHeroPromoEnabled(CONVENTION_HERO_PROMO_END_MS - 1)).toBe(
        false,
      );
    } finally {
      if (previous === undefined) {
        delete process.env.NEXT_PUBLIC_FORCE_HIDE_CONVENTION_PROMO;
      } else {
        process.env.NEXT_PUBLIC_FORCE_HIDE_CONVENTION_PROMO = previous;
      }
    }
  });

  test("is false at or after end threshold", () => {
    expect(isConventionHeroPromoEnabled(CONVENTION_HERO_PROMO_END_MS)).toBe(
      false,
    );
    expect(isConventionHeroPromoEnabled(CONVENTION_HERO_PROMO_END_MS + 60_000)).toBe(
      false,
    );
  });
});
