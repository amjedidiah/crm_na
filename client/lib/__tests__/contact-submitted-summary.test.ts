import { describe, expect, test } from "bun:test";
import { mockContactListings } from "@/lib/__tests__/contact-test-fixtures";
import {
  buildContactFormSuccessMessage,
  summarizeSubmittedContact,
} from "@/lib/contact-submitted-summary";

describe("summarizeSubmittedContact", () => {
  test("general purpose has no listing line", () => {
    const s = summarizeSubmittedContact("general", mockContactListings);
    expect(s.purposeLabel).toBe("General");
    expect(s.listingSummary).toBeUndefined();
  });

  test("churches with known slug includes church name", () => {
    const s = summarizeSubmittedContact(
      "churches",
      mockContactListings,
      "crm-word-of-life",
    );
    expect(s.purposeLabel).toBe("Churches");
    expect(s.listingSummary).toContain("CRM Word of Life");
  });

  test("churches without slug notes none selected", () => {
    const s = summarizeSubmittedContact("churches", mockContactListings);
    expect(s.listingSummary).toContain("No specific church");
  });
});

describe("buildContactFormSuccessMessage", () => {
  test("mentions purpose and email when confirmation sent", () => {
    const msg = buildContactFormSuccessMessage(
      "prayer-request",
      mockContactListings,
      true,
      "u@example.com",
    );
    expect(msg).toContain("prayer");
    expect(msg).toContain("u@example.com");
  });
});
