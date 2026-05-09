import { describe, expect, test } from "bun:test";
import { contactSchema } from "@/lib/schemas/contact";

describe("contact schema", () => {
  test("accepts valid input", () => {
    const result = contactSchema.safeParse({
      name: "CRM Visitor",
      email: "visitor@example.com",
      purpose: "general",
      message: "I would like to learn more about CRM NA.",
    });

    expect(result.success).toBe(true);
  });

  test("accepts churches purpose with church slug", () => {
    const result = contactSchema.safeParse({
      name: "CRM Visitor",
      email: "visitor@example.com",
      purpose: "churches",
      message: "I would like to plan a visit to this branch when you email back.",
      churchSlug: "crm-ottawa",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.churchSlug).toBe("crm-ottawa");
    }
  });

  test("rejects invalid church slug", () => {
    const result = contactSchema.safeParse({
      name: "CRM Visitor",
      email: "visitor@example.com",
      purpose: "churches",
      message: "I would like to plan a visit to this branch when you email back.",
      churchSlug: "not a slug!!!",
    });

    expect(result.success).toBe(false);
  });
});
