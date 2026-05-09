"use client";

import { CheckCircle2 } from "lucide-react";

function ContactSuccessPanel({
  message,
  onSendAnother,
}: Readonly<{
  message: string;
  onSendAnother: () => void;
}>) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-5 py-4 text-center">
      <div className="flex size-14 items-center justify-center rounded-full border border-emphasis bg-(--surface-muted) text-(--text-brand)">
        <CheckCircle2 className="size-8" aria-hidden />
      </div>
      <div className="space-y-2">
        <h2 className="font-display text-2xl tracking-tight text-(--text-primary) md:text-3xl">
          Message sent
        </h2>
        <p className="text-sm leading-relaxed text-(--text-secondary) md:text-base">
          {message}
        </p>
      </div>
      <button
        type="button"
        className="font-display inline-flex items-center justify-center border border-emphasis bg-(--surface-input) px-5 py-3 text-xs tracking-[0.2em] uppercase text-(--text-primary) transition-colors hover:bg-(--surface-muted)"
        onClick={onSendAnother}
      >
        Send another message
      </button>
    </div>
  );
}

export default ContactSuccessPanel;
