"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import Motion from "@/components/shared/Motion";

const ease = [0.22, 1, 0.36, 1] as const;

function GiveBanner() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-padding overflow-hidden text-(--text-primary)">
      <div className="container-shell">
        <Motion
          className="relative overflow-hidden rounded-4xl bg-(--surface-inverse) p-10 text-(--text-on-inverse) md:p-14 lg:p-16"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.6, ease }}
        >
          {/* Background decorations */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div
              className="absolute -left-32 -top-32 h-112 w-md rounded-full blur-3xl"
              style={{ background: "var(--gradient-give-brand-orb)" }}
            />
            <div
              className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full blur-2xl"
              style={{ background: "var(--gradient-give-depth-orb)" }}
            />
            {/* Subtle horizontal accent line */}
            <div
              className="absolute bottom-0 left-0 h-px w-full"
              style={{ backgroundImage: "var(--gradient-give-divider)" }}
            />
          </div>

          {/* Decorative vertical scripture ref */}
          <span
            aria-hidden
            className="pointer-events-none absolute right-8 top-1/2 hidden select-none font-display text-[5.5rem] leading-none tracking-widest text-(--text-on-inverse)/4 xl:block"
            style={{
              writingMode: "vertical-lr",
              transform: "translateY(-50%) rotate(180deg)",
            }}
          >
            Luke 6:38
          </span>

          <div className="relative grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            {/* Left: scripture + copy */}
            <Motion
              className="space-y-5"
              initial={reduceMotion ? false : "hidden"}
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: reduceMotion ? 0 : 0.1,
                    delayChildren: reduceMotion ? 0 : 0.06,
                  },
                },
              }}
            >
              <Motion
                as="p"
                variants={{
                  hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
                }}
                className="eyebrow text-(--text-brand-strong)"
              >
                Give
              </Motion>

              <Motion
                as="p"
                variants={{
                  hidden: { opacity: 0, y: reduceMotion ? 0 : 22 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.58, ease } },
                }}
                className="text-[clamp(1.85rem,3.8vw,3.15rem)] font-display leading-[1.12]"
              >
                &ldquo;Give, and it shall be given unto you.&rdquo;
              </Motion>

              <Motion
                as="p"
                variants={{
                  hidden: { opacity: 0, y: reduceMotion ? 0 : 12 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
                }}
                className="font-display text-[0.65rem] tracking-[0.28em] uppercase text-(--text-brand-strong)"
              >
                — Luke 6:38
              </Motion>

              <Motion
                as="p"
                variants={{
                  hidden: { opacity: 0, y: reduceMotion ? 0 : 14 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease } },
                }}
                className="max-w-2xl pt-2 text-base leading-7 text-(--text-on-inverse-soft) md:text-lg md:leading-8"
              >
                Your generosity helps local branches serve families, raise
                leaders, stream teaching, and gather believers for conferences,
                outreach, and pastoral care.
              </Motion>
            </Motion>

            {/* Right: CTA */}
            <Motion
              className="flex flex-col items-start gap-5 lg:items-end"
              initial={reduceMotion ? false : { opacity: 0, x: 22 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: reduceMotion ? 0.01 : 0.52,
                ease,
                delay: reduceMotion ? 0 : 0.3,
              }}
            >
              <Motion
                as="span"
                className="contents"
                whileHover={reduceMotion ? undefined : { y: -2 }}
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
              >
                <Link
                  href="/give"
                  className="shadow-accent-cta group inline-flex items-center gap-3 rounded-full bg-(--interactive-hover) px-8 py-4 font-display text-sm tracking-[0.15em] uppercase text-(--text-on-brand) transition-shadow duration-300"
                >
                  Support the mission
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </Link>
              </Motion>
              <p className="font-display text-[0.6rem] tracking-[0.24em] uppercase text-(--text-on-inverse-muted)">
                Secure · Online · Tax-deductible
              </p>
            </Motion>
          </div>
        </Motion>
      </div>
    </section>
  );
}

export default GiveBanner;
