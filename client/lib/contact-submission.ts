import { slugsForContactEmail } from "@/lib/contact-delivery";
import { buildContactFormSuccessMessage } from "@/lib/contact-submitted-summary";
import {
  sendContactConfirmationEmail,
  sendContactEmail,
} from "@/lib/email";
import { contactSchema, type ContactSchema } from "@/lib/schemas/contact";
import type { ContactFormState } from "@/lib/types";
import { getContactListings } from "@/lib/wordpress";

function contactFieldsFromFormData(formData: FormData) {
  return {
    name: formData.get("name"),
    email: formData.get("email"),
    purpose: formData.get("purpose"),
    message: formData.get("message"),
    churchSlug: formData.get("churchSlug"),
    ministrySlug: formData.get("ministrySlug"),
    eventSlug: formData.get("eventSlug"),
  };
}

async function trySendConfirmation(
  data: ContactSchema,
  slugs: ReturnType<typeof slugsForContactEmail>,
): Promise<boolean> {
  try {
    const confirm = await sendContactConfirmationEmail({
      to: data.email,
      name: data.name,
      purpose: data.purpose,
      message: data.message,
      churchSlug: slugs.churchSlug,
      ministrySlug: slugs.ministrySlug,
      eventSlug: slugs.eventSlug,
    });
    return confirm.sent;
  } catch {
    return false;
  }
}

export async function processContactSubmission(
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse(contactFieldsFromFormData(formData));

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Please review the form.",
    };
  }

  const slugs = slugsForContactEmail(
    parsed.data.purpose,
    parsed.data.churchSlug,
    parsed.data.ministrySlug,
    parsed.data.eventSlug,
  );

  const listings = await getContactListings();

  const mail = await sendContactEmail({
    fromEmail: parsed.data.email,
    fromName: parsed.data.name,
    purpose: parsed.data.purpose,
    message: parsed.data.message,
    churchSlug: slugs.churchSlug,
    ministrySlug: slugs.ministrySlug,
    eventSlug: slugs.eventSlug,
  });

  if (!mail.delivered) {
    return {
      success: false,
      message:
        mail.preview ??
        "We could not send your message right now. Please try again later.",
    };
  }

  const confirmationSent = await trySendConfirmation(parsed.data, slugs);

  return {
    success: true,
    message: buildContactFormSuccessMessage(
      parsed.data.purpose,
      listings,
      confirmationSent,
      parsed.data.email,
      slugs.churchSlug,
      slugs.ministrySlug,
      slugs.eventSlug,
    ),
  };
}
