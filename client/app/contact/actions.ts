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
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Please review the form.",
    };
  }

  await sendContactEmail({
    fromEmail: parsed.data.email,
    fromName: parsed.data.name,
    purpose: parsed.data.purpose,
    message: parsed.data.message,
  });

  return {
    success: true,
    message: "Your message has been received. This uses the scaffold delivery flow.",
  };
}
