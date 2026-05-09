"use server";

import type { ContactFormState } from "@/lib/types";
import { sendContactEmail } from "@/lib/email";
import { contactSchema } from "@/lib/schemas/contact";

export async function submitContactAction(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    purpose: formData.get("purpose"),
    message: formData.get("message"),
    churchSlug: formData.get("churchSlug"),
    ministrySlug: formData.get("ministrySlug"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Please review the form.",
    };
  }

  const churchSlugForEmail =
    parsed.data.purpose === "churches" ? parsed.data.churchSlug : undefined;
  const ministrySlugForEmail =
    parsed.data.purpose === "ministries" ? parsed.data.ministrySlug : undefined;

  await sendContactEmail({
    fromEmail: parsed.data.email,
    fromName: parsed.data.name,
    purpose: parsed.data.purpose,
    message: parsed.data.message,
    churchSlug: churchSlugForEmail,
    ministrySlug: ministrySlugForEmail,
  });

  return {
    success: true,
    message: "Your message has been received. This uses the scaffold delivery flow.",
  };
}
