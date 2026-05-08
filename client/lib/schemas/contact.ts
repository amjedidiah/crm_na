import { z } from "zod";

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
});

export type ContactSchema = z.infer<typeof contactSchema>;
