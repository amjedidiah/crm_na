"use server";

import { processContactSubmission } from "@/lib/contact-submission";
import type { ContactFormState } from "@/lib/types";

export async function submitContactAction(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  return processContactSubmission(formData);
}
