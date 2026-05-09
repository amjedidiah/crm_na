import type { ContactFormPurpose } from "@/lib/types";

export const CONTACT_FORM_PURPOSES: readonly ContactFormPurpose[] = [
  "general",
  "plan-visit",
  "prayer-request",
  "churches",
  "ministries",
  "events",
] as const;

/** Human-readable purpose labels for tabs, summaries, and related UI. */
export const CONTACT_PURPOSE_LABELS: Record<ContactFormPurpose, string> = {
  general: "General",
  "plan-visit": "Plan a visit",
  "prayer-request": "Prayer request",
  churches: "Churches",
  ministries: "Ministries",
  events: "Events",
};

export function contactPurposeLabel(purpose: ContactFormPurpose): string {
  return CONTACT_PURPOSE_LABELS[purpose];
}
