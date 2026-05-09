import { describe, expect, test } from "bun:test";

import {
  buildContactFormSuccessMessage,
  summarizeSubmittedContact,
} from "@/lib/contact-submitted-summary";

describe("summarizeSubmittedContact", () => {
  test("general purpose has no listing line", () => {
    const s = summarizeSubmittedContact("general", undefined, undefined, undefined);
    expect(s.purposeLabel).toBe("General");
    expect(s.listingSummary).toBeUndefined();
  });

  test("churches with known slug includes church name", () => {
    const s = summarizeSubmittedContact(
      "churches",
      "crm-word-of-life",
      undefined,
      undefined,
    );
    expect(s.purposeLabel).toBe("Churches");
    expect(s.listingSummary).toContain("CRM Word of Life");
  });

  test("churches without slug notes none selected", () => {
    const s = summarizeSubmittedContact("churches", undefined, undefined, undefined);
    expect(s.listingSummary).toContain("No specific church");
  });
});

describe("buildContactFormSuccessMessage", () => {
  test("mentions purpose and email when confirmation sent", () => {
    const msg = buildContactFormSuccessMessage(
      "prayer-request",
      true,
      "u@example.com",
      undefined,
      undefined,
      undefined,
    );
    expect(msg).toContain("prayer");
    expect(msg).toContain("u@example.com");
  });
});
