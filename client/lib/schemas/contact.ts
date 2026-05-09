import { z } from "zod";

const optionalChurchSlug = z.preprocess(
  (v) => {
    if (v === "" || v === null || v === undefined) return undefined;
    return typeof v === "string" ? v.trim() : v;
  },
  z
    .string()
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid church identifier.")
    .optional(),
);

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required."),
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
  churchSlug: optionalChurchSlug,
});

export type ContactSchema = z.infer<typeof contactSchema>;
