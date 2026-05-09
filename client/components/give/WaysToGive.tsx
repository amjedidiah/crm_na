import Image from "next/image";
import { CreditCard, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Button from "@/components/shared/Button";
import { contactHref } from "@/lib/contact-hrefs";
import type { GivingMethod } from "@/lib/giving";
import { filterValidGivingMethods } from "@/lib/giving";

const iconMap: Record<GivingMethod["icon"], LucideIcon> = {
  "credit-card": CreditCard,
  smartphone: Smartphone,
};

interface WaysToGiveProps {
  readonly methods: readonly GivingMethod[];
}

function WaysToGive({ methods }: Readonly<WaysToGiveProps>) {
  const valid = filterValidGivingMethods([...methods]);

  return (
    <section className="section-padding bg-(--color-bg-muted)/40">
      <div className="container-shell space-y-10">
        <div className="max-w-3xl space-y-4">
          <p className="eyebrow text-(--color-fg-accent)">Ways to give</p>
          <h2 className="text-4xl font-display leading-tight text-(--color-fg-primary) md:text-5xl">
            Zeffy or Zelle
          </h2>
          <p className="text-lg leading-8 text-(--color-fg-secondary)">
            Choose the option that fits you. Both rails match the 2026
            convention payment setup — Zeffy for cards, Zelle for bank-to-bank
            transfers.
          </p>
        </div>

        {valid.length === 0 ? (
          <div className="card-surface max-w-2xl space-y-4 p-8">
            <p className="eyebrow text-(--color-fg-accent)">
              Payments unavailable
            </p>
            <p className="text-lg leading-8 text-(--color-fg-secondary)">
              Online giving instructions are not available right now. Please
              reach out through our contact page — we will help you give or
              answer questions.
            </p>
            <Button href={contactHref("general")} variant="outline">
              Contact CRM NA
            </Button>
          </div>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2">
            {valid.map((method) => {
              const Icon = iconMap[method.icon];
              const showCta = Boolean(method.ctaHref);
              return (
                <li key={method.id}>
                  <article className="card-surface flex h-full flex-col gap-5 p-8">
                    <div className="flex items-start gap-4">
                      <span
                        className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-(--color-bg-emphasis) text-(--color-fg-inverse)"
                        aria-hidden
                      >
                        <Icon className="size-6" />
                      </span>
                      <div className="space-y-2">
                        <h3 className="text-xl font-display text-(--color-fg-primary)">
                          {method.title}
                        </h3>
                        <p className="text-base leading-7 text-(--color-fg-secondary)">
                          {method.description}
                        </p>
                      </div>
                    </div>
                    {method.detailLines && method.detailLines.length > 0 ? (
                      <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-(--color-fg-secondary)">
                        {method.detailLines.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    ) : null}
                    {method.id === "zelle" && method.qrImageSrc ? (
                      <div className="flex flex-col items-start gap-3 border-t border-(--color-border-subtle) pt-5">
                        <p className="font-display text-[0.6rem] tracking-[0.22em] uppercase text-(--color-fg-secondary)">
                          Scan to open Zelle
                        </p>
                        <Image
                          src={method.qrImageSrc}
                          alt={method.qrImageAlt ?? "QR code for Zelle payment"}
                          width={160}
                          height={160}
                          className="rounded-xl border border-(--color-border-subtle) bg-(--color-bg-canvas) p-2"
                        />
                      </div>
                    ) : null}
                    {showCta && method.ctaHref ? (
                      <div className="mt-auto pt-2">
                        <Button
                          href={method.ctaHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant={
                            method.id === "zeffy" ? "outline" : "primary"
                          }
                          className="w-full sm:w-auto"
                          aria-label={
                            method.id === "zeffy"
                              ? "Open Zeffy donation form in a new tab"
                              : `${method.ctaLabel ?? "Open Zelle"} (opens in a new tab)`
                          }
                        >
                          {method.ctaLabel ?? "Learn more"}
                        </Button>
                      </div>
                    ) : null}
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}

export default WaysToGive;
