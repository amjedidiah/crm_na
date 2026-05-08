"use client";

import Link from "next/link";
import { ArrowRight, HandHeart } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import Motion from "@/components/shared/Motion";

const ease = [0.22, 1, 0.36, 1] as const;

function PrayerRequestBanner() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-padding py-14 md:py-20">
      <div className="container-shell">
        <Motion
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.55, ease }}
        >
          <Link
            href="/contact?purpose=prayer-request"
            className={cn(
              "group relative flex flex-col items-center gap-5 overflow-hidden rounded-[1.75rem] border border-(--color-border-subtle)",
              "bg-(--color-bg-emphasis-strong) px-8 py-8 transition-[transform,box-shadow,border-color] duration-300",
              "md:flex-row md:items-center md:gap-10 md:p-10",
              "shadow-panel-hover-emphasis hover:-translate-y-0.5 hover:border-(--color-border-accent)",
            )}
          >
            {/* Ambient accent glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute right-0 top-0 h-full w-64 transition-opacity duration-300 group-hover:opacity-150"
              style={{ background: "var(--gradient-prayer-accent-glow)" }}
            />

            {/* Icon */}
            <Motion
              className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-(--color-bg-accent-soft)"
              whileHover={reduceMotion ? undefined : { scale: 1.08, rotate: -4 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
            >
              <HandHeart
                className="size-8 text-(--color-fg-accent-strong)"
                aria-hidden
              />
            </Motion>

            {/* Text */}
            <div className="relative flex-1 text-center md:text-left">
              <h3 className="text-2xl text-(--color-fg-inverse) md:text-3xl">
                We would love to pray with you
              </h3>
              <p className="mt-3 max-w-2xl text-base leading-7 text-(--color-fg-inverse-soft)">
                When life is heavy, tender, or full of thanksgiving, our
                leaders and intercessors are honored to stand with you in
                faith. Share a request and we will carry it to the Lord
                together.
              </p>
            </div>

            {/* CTA text */}
            <span className="relative flex shrink-0 items-center gap-2 font-display text-xs tracking-[0.2em] uppercase text-(--color-fg-inverse) transition-transform duration-300 group-hover:translate-x-1">
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
