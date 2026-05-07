"use client";

import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="font-display inline-flex items-center justify-center bg-(--gold) px-5 py-3 text-xs tracking-[0.24em] uppercase text-(--navy) disabled:opacity-60"
    >
      {pending ? "Sending..." : "Send message"}
    </button>
  );
}

export default SubmitButton;
