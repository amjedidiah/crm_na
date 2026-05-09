"use server";

import { slugsForContactEmail } from "@/lib/contact-delivery";
import { buildContactFormSuccessMessage } from "@/lib/contact-submitted-summary";
import type { ContactFormState } from "@/lib/types";
import {
  sendContactConfirmationEmail,
  sendContactEmail,
} from "@/lib/email";
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
    eventSlug: formData.get("eventSlug"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Please review the form.",
    };
  }

  const {
    churchSlug: churchSlugForEmail,
    ministrySlug: ministrySlugForEmail,
    eventSlug: eventSlugForEmail,
  } = slugsForContactEmail(
    parsed.data.purpose,
    parsed.data.churchSlug,
    parsed.data.ministrySlug,
    parsed.data.eventSlug,
  );

  const mail = await sendContactEmail({
    fromEmail: parsed.data.email,
    fromName: parsed.data.name,
    purpose: parsed.data.purpose,
    message: parsed.data.message,
    churchSlug: churchSlugForEmail,
    ministrySlug: ministrySlugForEmail,
    eventSlug: eventSlugForEmail,
  });

  if (!mail.delivered) {
    return {
      success: false,
      message:
        mail.preview ??
        "We could not send your message right now. Please try again later.",
    };
  }

  let confirmationSent = false;
  try {
    const confirm = await sendContactConfirmationEmail({
      to: parsed.data.email,
      name: parsed.data.name,
      purpose: parsed.data.purpose,
      message: parsed.data.message,
      churchSlug: churchSlugForEmail,
      ministrySlug: ministrySlugForEmail,
      eventSlug: eventSlugForEmail,
    });
    confirmationSent = confirm.sent;
  } catch {
    confirmationSent = false;
  }

  return {
    success: true,
    message: buildContactFormSuccessMessage(
      parsed.data.purpose,
      confirmationSent,
      parsed.data.email,
      churchSlugForEmail,
      ministrySlugForEmail,
      eventSlugForEmail,
    ),
  };
}
