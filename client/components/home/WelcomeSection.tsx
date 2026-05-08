"use client";

import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { visionContent, whoWeAreIntro } from "@/lib/mock-data";
import Motion from "@/components/shared/Motion";

const ease = [0.22, 1, 0.36, 1] as const;

function WelcomeSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-padding pt-16 md:pt-24">
      <div className="container-shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <Motion
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.55, ease }}
        >
          <div className="space-y-6">
            <SectionHeader
              eyebrow="Welcome"
              title={whoWeAreIntro.title}
              description={whoWeAreIntro.summary}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  label: "Prayer",
                  body: "Intercession remains central to how branches gather, pastor, and respond to need.",
                },
                {
                  label: "Discipleship",
                  body: "Churches, ministries, and media now connect into one clearer pathway for growth.",
                },
              ].map((item) => (
                <Motion
                  key={item.label}
                  className="rounded-[1.35rem] border border-(--color-border-subtle) bg-(--color-bg-canvas) p-5"
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.42, ease }}
                >
                  <p className="font-display text-[0.68rem] tracking-[0.24em] uppercase text-(--color-fg-accent-text)">
                    {item.label}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-(--color-fg-secondary)">
                    {item.body}
                  </p>
                </Motion>
              ))}
            </div>
            <div className="flex flex-wrap gap-5 pt-1">
              <Link
                href="/who-we-are#leadership"
                className="font-display inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-(--color-fg-accent-text)"
              >
                Meet our leadership
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href="/publications"
                className="font-display inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-(--color-fg-secondary)"
              >
                Read a devotional
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </Motion>

        <Motion
          className="card-surface relative overflow-hidden rounded-[1.8rem] p-8 md:p-10"
          initial={reduceMotion ? false : { opacity: 0, y: 32, rotateX: 4 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.58, ease }}
          whileHover={
            reduceMotion
              ? undefined
              : {
                  y: -4,
                  boxShadow: "var(--shadow-welcome-lift)",
                  transition: { type: "spring", stiffness: 320, damping: 22 },
                }
          }
          style={{ transformPerspective: 980 }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -right-12 top-8 h-40 w-40 rounded-full blur-2xl"
            style={{ background: "var(--gradient-welcome-orb)" }}
          />
          <div className="relative mb-8 flex items-end justify-between gap-4 border-b border-(--color-border-subtle) pb-6">
            <div>
              <p className="font-display text-[0.68rem] tracking-[0.24em] uppercase text-(--color-fg-accent-text)">
                Our vision
              </p>
              <h3 className="mt-2 text-3xl md:text-4xl">
                {visionContent.title}
              </h3>
            </div>
            <div className="hidden rounded-full border border-(--color-border-subtle) px-4 py-2 md:block">
              <span className="font-display text-[0.65rem] tracking-[0.22em] uppercase text-(--color-fg-secondary)">
                North America
              </span>
            </div>
          </div>
          <Motion
            as="ul"
            className="relative space-y-4 text-lg leading-8 text-(--color-fg-secondary)"
            initial={reduceMotion ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: reduceMotion ? 0 : 0.09,
                  delayChildren: reduceMotion ? 0 : 0.08,
                },
              },
            }}
          >
            {visionContent.body.map((paragraph) => (
              <Motion
                as="li"
                key={paragraph}
                variants={{
                  hidden: { opacity: 0, x: reduceMotion ? 0 : -12 },
                  show: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: reduceMotion ? 0.01 : 0.42, ease },
                  },
                }}
                className="relative flex gap-3"
              >
                <span
                  aria-hidden
                  className="mt-2.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-bg-accent)"
                />
                <span>{paragraph}</span>
              </Motion>
            ))}
          </Motion>
        </Motion>
      </div>
    </section>
  );
}

export default WelcomeSection;
