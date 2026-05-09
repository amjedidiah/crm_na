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
          "rounded-lg px-3 py-2 text-sm transition-[background-color,border-color,color,box-shadow] duration-200 md:px-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--border-emphasis)] focus-visible:ring-offset-2 focus-visible:ring-offset-(--surface-page)";
        const idle =
          "border border-(--border-default) bg-(--surface-input) text-(--text-secondary) shadow-sm hover:border-[var(--border-emphasis)] hover:bg-(--surface-muted) hover:text-(--text-primary)";
        const active =
          "border border-emphasis bg-(--surface-muted) font-medium text-(--text-primary) shadow-sm";
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
