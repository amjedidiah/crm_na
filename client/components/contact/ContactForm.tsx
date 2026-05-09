"use client";

import { useActionState } from "react";
import { submitContactAction } from "@/app/contact/actions";
import FormField from "@/components/contact/FormField";
import SubmitButton from "@/components/contact/SubmitButton";
import SuccessMessage from "@/components/contact/SuccessMessage";

const initialState = {
  success: false,
  message: "",
};

const PURPOSE_OPTIONS = [
  "general",
  "plan-visit",
  "prayer-request",
  "churches",
  "ministries",
  "events",
] as const;

type PurposeOption = (typeof PURPOSE_OPTIONS)[number];

function normalizePurpose(raw: unknown): PurposeOption | undefined {
  if (typeof raw !== "string") return undefined;
  return PURPOSE_OPTIONS.includes(raw as PurposeOption)
    ? (raw as PurposeOption)
    : undefined;
}

function ContactForm({
  initialPurpose,
  initialChurchSlug,
  initialMinistrySlug,
}: Readonly<{
  initialPurpose?: string;
  initialChurchSlug?: string;
  initialMinistrySlug?: string;
}>) {
  const [state, formAction] = useActionState(submitContactAction, initialState);
  const purposeDefault = normalizePurpose(initialPurpose) ?? "general";

  return (
    <form action={formAction} className="card-surface grid gap-5 p-6">
      {state.message ? <SuccessMessage message={state.message} /> : null}
      {initialChurchSlug ? (
        <input type="hidden" name="churchSlug" value={initialChurchSlug} />
      ) : null}
      {initialMinistrySlug ? (
        <input type="hidden" name="ministrySlug" value={initialMinistrySlug} />
      ) : null}
      <FormField label="Name" name="name" required />
      <FormField label="Email" name="email" type="email" required />
      <label className="grid gap-2">
        <span className="text-sm text-(--color-fg-secondary)">Purpose</span>
        <select
          name="purpose"
          defaultValue={purposeDefault}
          className="border border-(--color-border-subtle) bg-(--color-bg-input) px-4 py-3"
        >
          <option value="general">General</option>
          <option value="plan-visit">Plan a visit</option>
          <option value="prayer-request">Prayer request</option>
          <option value="churches">Churches</option>
          <option value="ministries">Ministries</option>
          <option value="events">Events</option>
        </select>
      </label>
      <FormField label="Message" name="message" textarea required />
      <SubmitButton />
    </form>
  );
}

export default ContactForm;
