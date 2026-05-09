"use client";

import { useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import Button from "@/components/shared/Button";
import { Church } from "lucide-react";
import Motion from "@/components/shared/Motion";

const ease = [0.22, 1, 0.36, 1] as const;

const inverseOutlineClass =
  "border-(--color-fg-inverse-soft) text-(--color-fg-inverse) hover:bg-(--color-bg-accent-strong) hover:text-(--color-fg-on-accent)";

function MotionButtonWrap({ children }: Readonly<{ children: ReactNode }>) {
  const reduceMotion = useReducedMotion();
  return (
    <Motion
      as="span"
      className="contents"
      whileHover={reduceMotion ? undefined : { y: -2 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
    >
      {children}
    </Motion>
  );
}

function PlanYourVisit() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      <div className="bg-(--color-bg-emphasis-strong) absolute inset-0" />
      <Motion
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        animate={
          reduceMotion
            ? undefined
            : {
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 28, repeat: Infinity, ease: "linear" }
        }
        style={{
          backgroundImage: "var(--gradient-plan-sheen)",
          backgroundSize: "200% 200%",
        }}
      />

      <Motion
        className="text-(--color-fg-inverse-muted) pointer-events-none absolute -right-16 -bottom-16 rotate-[8deg] opacity-[0.07] md:-right-24 md:-bottom-24"
        aria-hidden
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, -14, 0],
                rotate: [8, 10, 8],
              }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 16, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <Church strokeWidth={0.85} size={340} />
      </Motion>

      <div className="section-padding relative text-center">
        <div className="container-shell">
          <Motion
            initial={reduceMotion ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: reduceMotion ? 0 : 0.11,
                  delayChildren: reduceMotion ? 0 : 0.04,
                },
              },
            }}
            className="space-y-6"
          >
            <Motion
              as="p"
              variants={{
                hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: reduceMotion ? 0.01 : 0.48, ease },
                },
              }}
              className="eyebrow text-(--color-fg-accent-strong)"
            >
              Plan your visit
            </Motion>
            <Motion
              as="h2"
              variants={{
                hidden: { opacity: 0, y: reduceMotion ? 0 : 22 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: reduceMotion ? 0.01 : 0.55, ease },
                },
              }}
              className="max-w-3xl text-[clamp(2rem,4vw,2.75rem)] leading-tight"
            >
              Across North America, a CRM church family is praying for God to
              move in your story.
            </Motion>
            <Motion
              as="p"
              variants={{
                hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: reduceMotion ? 0.01 : 0.48, ease },
                },
              }}
              className="text-(--color-fg-inverse) mx-auto max-w-2xl text-lg leading-8"
            >
              Whether you are new to charismatic worship or reconnecting after
              time away, we will welcome you with clarity, warmth, and room to
              encounter the Holy Spirit inside a local revival community.
            </Motion>
            <Motion
              variants={{
                hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: reduceMotion ? 0.01 : 0.45, ease },
                },
              }}
              className="flex flex-col justify-center gap-4 pt-4 sm:flex-row sm:flex-wrap"
            >
              <MotionButtonWrap>
                <Button href="/churches">Find a church near you</Button>
              </MotionButtonWrap>
              <MotionButtonWrap>
                <Button
                  href="/contact?purpose=plan-visit"
                  variant="outline"
                  className={inverseOutlineClass}
                >
                  Plan my first visit
                </Button>
              </MotionButtonWrap>
              <MotionButtonWrap>
                <Button
                  href="/about"
                  variant="outline"
                  className={inverseOutlineClass}
                >
                  Our story &amp; convictions
                </Button>
              </MotionButtonWrap>
            </Motion>
          </Motion>
        </div>
      </div>
    </section>
  );
}

export default PlanYourVisit;
