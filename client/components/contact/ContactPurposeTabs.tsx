"use client";

import type { ContactFormPurpose } from "@/lib/types";
import { CONTACT_FORM_PURPOSES, CONTACT_PURPOSE_LABELS } from "@/lib/contact-purposes";

function ContactPurposeTabs({
  ariaLabelledBy,
  activePurpose,
  onPurposeChange,
  tabPanelId,
}: Readonly<{
  ariaLabelledBy: string;
  activePurpose: ContactFormPurpose;
  onPurposeChange: (purpose: ContactFormPurpose) => void;
  tabPanelId: string;
}>) {
  return (
    <div
      role="tablist"
      aria-labelledby={ariaLabelledBy}
      aria-orientation="horizontal"
      className="flex flex-wrap gap-2 md:gap-3"
    >
      {CONTACT_FORM_PURPOSES.map((purpose) => {
        const selected = purpose === activePurpose;
        const tabId = `contact-purpose-tab-${purpose}`;
        const base =
          "rounded-lg px-3 py-2 text-sm transition-[background-color,border-color,color,box-shadow] duration-200 md:px-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-emphasis) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-canvas)";
        const idle =
          "border border-(--color-border-subtle) bg-(--color-bg-input) text-(--color-fg-secondary) shadow-sm hover:border-(--color-border-emphasis) hover:bg-(--color-bg-surface-subtle) hover:text-(--color-fg-primary)";
        const active =
          "border border-(--color-border-emphasis) bg-(--color-bg-surface-subtle) font-medium text-(--color-fg-primary) shadow-sm";
        return (
          <button
            key={purpose}
            id={tabId}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={tabPanelId}
            tabIndex={selected ? 0 : -1}
            className={`${base} ${selected ? active : idle}`}
            onClick={() => {
              onPurposeChange(purpose);
            }}
          >
            {CONTACT_PURPOSE_LABELS[purpose]}
          </button>
        );
      })}
    </div>
  );
}

export default ContactPurposeTabs;
