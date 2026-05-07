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

function ContactForm() {
  const [state, formAction] = useActionState(submitContactAction, initialState);

  return (
    <form action={formAction} className="card-surface grid gap-5 p-6">
      {state.message ? <SuccessMessage message={state.message} /> : null}
      <FormField label="Name" name="name" required />
      <FormField label="Email" name="email" type="email" required />
      <label className="grid gap-2">
        <span className="text-sm text-(--muted)">Purpose</span>
        <select
          name="purpose"
          defaultValue="general"
          className="border border-(--border) bg-white px-4 py-3"
        >
          <option value="general">General</option>
          <option value="prayer-request">Prayer Request</option>
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
