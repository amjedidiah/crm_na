"use client";

import { useId } from "react";
import type { ContactSelectOption } from "@/lib/contact-select-options";

function ContactListingSelect({
  name,
  label,
  value,
  onChange,
  options,
  hint,
  error,
}: Readonly<{
  name: string;
  label: string;
  value: string;
  onChange: (nextValue: string) => void;
  options: readonly ContactSelectOption[];
  hint?: string;
  error?: string;
}>) {
  const id = useId();
  const errId = error ? `${id}-error` : undefined;
  const describedBy = [hint ? `${id}-hint` : null, errId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm text-(--color-fg-secondary)">
        {label}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="text-xs text-(--color-fg-muted)">
          {hint}
        </p>
      ) : null}
      <select
        id={id}
        name={name}
        value={value}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className={`border border-(--color-border-subtle) bg-(--color-bg-input) px-4 py-3 text-(--color-fg-primary) ${error ? "border-red-800/35 bg-red-950/4" : ""}`}
      >
        {options.map((opt) => (
          <option key={opt.value || "__none__"} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error ? (
        <span id={errId} className="text-sm text-red-900/90 dark:text-red-200/90" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}

export default ContactListingSelect;
