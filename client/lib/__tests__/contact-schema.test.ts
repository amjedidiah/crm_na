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

  test("accepts ministries purpose with ministry slug", () => {
    const result = contactSchema.safeParse({
      name: "CRM Visitor",
      email: "visitor@example.com",
      purpose: "ministries",
      message: "I would like to volunteer with the youth ministry when you reply.",
      ministrySlug: "youths",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.ministrySlug).toBe("youths");
    }
  });

  test("rejects invalid ministry slug", () => {
    const result = contactSchema.safeParse({
      name: "CRM Visitor",
      email: "visitor@example.com",
      purpose: "ministries",
      message: "I would like to volunteer with the youth ministry when you reply.",
      ministrySlug: "Bad Slug",
    });

    expect(result.success).toBe(false);
  });

  test("accepts events purpose with event slug", () => {
    const result = contactSchema.safeParse({
      name: "CRM Visitor",
      email: "visitor@example.com",
      purpose: "events",
      message: "I would like more information about this gathering when you reply.",
      eventSlug: "crm-usa-national-convention-2026",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.eventSlug).toBe("crm-usa-national-convention-2026");
    }
  });

  test("rejects invalid event slug", () => {
    const result = contactSchema.safeParse({
      name: "CRM Visitor",
      email: "visitor@example.com",
      purpose: "events",
      message: "I would like more information about this gathering when you reply.",
      eventSlug: "Bad Slug",
    });

    expect(result.success).toBe(false);
  });
});
