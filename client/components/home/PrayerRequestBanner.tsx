"use client";

import Link from "next/link";
import { contactHref } from "@/lib/contact-hrefs";
import { ArrowRight, HandHeart } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import Motion from "@/components/shared/Motion";

const ease = [0.22, 1, 0.36, 1] as const;

function PrayerRequestBanner() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-padding pt-8 md:pt-10">
      <div className="container-shell">
        <Motion
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.55, ease }}
        >
          <Link
            href={contactHref("prayer-request")}
            className="group bg-(--color-bg-surface-subtle) text-(--color-fg-primary) flex flex-col items-start gap-4 rounded-3xl border border-(--color-border-subtle) px-6 py-5 transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-(--color-border-accent) md:flex-row md:items-center md:justify-between"
          >
            <div className="flex items-center gap-4">
              <Motion
                className="bg-(--color-bg-accent-soft) flex size-12 shrink-0 items-center justify-center rounded-2xl"
                whileHover={
                  reduceMotion ? undefined : { scale: 1.04, rotate: -3 }
                }
                transition={{ type: "spring", stiffness: 380, damping: 22 }}
              >
                <HandHeart
                  className="size-6 text-(--color-fg-accent-text)"
                  aria-hidden
                />
              </Motion>
              <div className="space-y-1">
                <p className="text-base md:text-lg">
                  We would love to pray with you.
                </p>
                <p className="text-(--color-fg-secondary) text-sm leading-6">
                  Share a request and our leaders will stand with you in faith.
                </p>
              </div>
            </div>
            <span className="font-display text-(--color-fg-accent-text) inline-flex shrink-0 items-center gap-2 text-xs tracking-[0.2em] uppercase transition-transform duration-300 group-hover:translate-x-1">
              Submit a prayer request
              <ArrowRight className="size-4" aria-hidden />
            </span>
          </Link>
        </Motion>
      </div>
    </section>
  );
}

export default PrayerRequestBanner;
