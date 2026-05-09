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
                  body: "Believers are encouraged toward maturity through church centers, ministry life, spiritual gifts, and practical service.",
                },
              ].map((item) => (
                <Motion
                  key={item.label}
                  className="rounded-[1.35rem] border border-(--border-default) bg-(--surface-page) p-5"
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.42, ease }}
                >
                  <p className="font-display text-[0.68rem] tracking-[0.24em] uppercase text-(--text-accent)">
                    {item.label}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-(--text-secondary)">
                    {item.body}
                  </p>
                </Motion>
              ))}
            </div>
            <div className="space-y-5 pt-1">
              <Link
                href="/about#leadership"
                className="font-display inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-(--text-accent)"
              >
                Meet our leadership
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href="/devotionals"
                className="group relative flex flex-col justify-between gap-4 overflow-hidden rounded-3xl border border-(--border-default) bg-(--surface-page-elevated) p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-(--border-brand)"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute right-0 top-0 h-full w-28 opacity-70"
                  style={{ background: "var(--gradient-support-card-overlay)" }}
                />
                <div className="relative space-y-3">
                  <p className="font-display text-[0.68rem] tracking-[0.24em] uppercase text-(--text-accent)">
                    Daily Devotional
                  </p>
                  <h3 className="text-3xl">Start your day with God.</h3>
                  <p className="max-w-2xl text-sm leading-7 text-(--text-secondary)">
                    Open today&apos;s devotional for a focused word of faith,
                    hope, and encouragement shaped for everyday obedience.
                  </p>
                </div>
                <span className="relative font-display inline-flex items-center gap-2 text-[0.68rem] tracking-[0.24em] uppercase text-(--text-accent)">
                  Read today&apos;s devotional
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
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
          <div className="relative mb-8 flex items-end justify-between gap-4 border-b border-(--border-default) pb-6">
            <div>
              <p className="font-display text-[0.68rem] tracking-[0.24em] uppercase text-(--text-accent)">
                Our vision
              </p>
              <h3 className="mt-2 text-3xl md:text-4xl">
                {visionContent.title}
              </h3>
            </div>
            <div className="hidden rounded-full border border-(--border-default) px-4 py-2 md:block">
              <span className="font-display text-[0.65rem] tracking-[0.22em] uppercase text-(--text-secondary)">
                North America
              </span>
            </div>
          </div>
          <Motion
            as="ul"
            className="relative space-y-4 text-lg leading-8 text-(--text-secondary)"
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
                  className="mt-2.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-(--interactive-default)"
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
