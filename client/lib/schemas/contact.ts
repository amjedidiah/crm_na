import { z } from "zod";

const optionalKebabSlug = z.preprocess(
  (v) => {
    if (v === "" || v === null || v === undefined) return undefined;
    return typeof v === "string" ? v.trim() : v;
  },
  z
    .string()
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid listing identifier.")
    .optional(),
);

export const contactSchema = z.object({
  name: z.string().min(4, "Full name is required."),
  email: z.email("A valid email is required."),
  purpose: z.enum([
    "general",
    "plan-visit",
    "prayer-request",
    "churches",
    "ministries",
    "events",
  ]),
  message: z.string().min(10, "Please share a little more detail."),
  churchSlug: optionalKebabSlug,
  ministrySlug: optionalKebabSlug,
  eventSlug: optionalKebabSlug,
});

export type ContactSchema = z.infer<typeof contactSchema>;
