"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { GivingFAQItem } from "@/lib/giving";
import { cn } from "@/lib/utils";

interface GivingFAQProps {
  readonly items: readonly GivingFAQItem[];
}

function FaqRow({
  item,
  open,
  onToggle,
}: Readonly<{
  item: GivingFAQItem;
  open: boolean;
  onToggle: () => void;
}>) {
  const buttonId = `give-faq-${item.id}-button`;
  const panelId = `give-faq-${item.id}-panel`;
  const paragraphs = item.answer.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);

  return (
    <div className="border-b border-(--border-default) last:border-b-0">
      <h3 className="m-0">
        <button
          id={buttonId}
          type="button"
          className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-lg text-(--text-primary) transition-colors hover:text-(--text-brand)"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span>{item.question}</span>
          <ChevronDown
            className={cn(
              "size-5 shrink-0 text-(--text-secondary) transition-transform duration-200",
              open && "rotate-180",
            )}
            aria-hidden
          />
        </button>
      </h3>
      <div id={panelId} aria-labelledby={buttonId} hidden={!open}>
        <div className="space-y-3 pb-6 pr-2 text-base leading-7 text-(--text-secondary)">
          {paragraphs.map((p, index) => (
            <p key={`${index.toString()}`}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

function GivingFAQ({ items }: Readonly<GivingFAQProps>) {
  const [openId, setOpenId] = useState<string | null>(null);

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-section-wash-soft">
      <div className="container-shell max-w-3xl space-y-8">
        <div className="space-y-4">
          <p className="eyebrow text-(--text-brand)">FAQ</p>
          <h2 className="text-4xl font-display leading-tight text-(--text-primary) md:text-5xl">
            Common questions
          </h2>
        </div>
        <div className="card-surface divide-y divide-(--border-default) px-6 md:px-10">
          {items.map((item) => {
            const open = openId === item.id;
            return (
              <FaqRow
                key={item.id}
                item={item}
                open={open}
                onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default GivingFAQ;
