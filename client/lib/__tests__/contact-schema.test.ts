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
});
