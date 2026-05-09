"use client";

import { useFormStatus } from "react-dom";

function SubmitButton({
  pending: pendingProp,
}: Readonly<{ pending?: boolean }> = {}) {
  const { pending: formPending } = useFormStatus();
  const pending = pendingProp ?? formPending;

  return (
    <button
      type="submit"
      disabled={pending}
      className="font-display inline-flex items-center justify-center bg-(--color-bg-accent) px-5 py-3 text-xs tracking-[0.24em] uppercase text-(--color-fg-on-accent) disabled:opacity-60"
    >
      {pending ? "Sending..." : "Send message"}
    </button>
  );
}

export default SubmitButton;
