"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CalendarRange,
  Church,
  HandCoins,
  Shapes,
} from "lucide-react";
import Motion from "@/components/shared/Motion";

interface NetworkPulseProps {
  churchCount: number;
  eventCount: number;
  ministryCount: number;
}

const cards = [
  {
    key: "churches",
    label: "Churches",
    headline: "Revival communities",
    href: "/churches",
    icon: Church,
    accentClass: "bg-(--color-bg-accent-soft)",
    count: "churchCount",
    description:
      "Browse branch communities across North America and find pastors, service times, and local rhythms.",
  },
  {
    key: "ministries",
    label: "Ministries",
    headline: "Serve with a team",
    href: "/ministries",
    icon: Shapes,
    accentClass: "bg-(--color-bg-overlay-accent-spotlight)",
    count: "ministryCount",
    description:
      "Move quickly into youth, women, men, and other discipleship pathways where service and growth meet.",
  },
  {
    key: "events",
    label: "Events",
    headline: "Gathering calendar",
    href: "/events",
    icon: CalendarRange,
    accentClass: "bg-(--color-bg-overlay-emphasis-soft)",
    count: "eventCount",
    description:
      "Track conferences, youth nights, strategy gatherings, and prayer moments across the network.",
  },
  {
    key: "give",
    label: "Give",
    headline: "Support the mission",
    href: "/give",
    icon: HandCoins,
    accentClass: "bg-(--color-bg-overlay-emphasis-subtle)",
    count: "support",
    description:
      "Back church life, outreach, media, and pastoral care through clear generosity pathways.",
  },
] as const;

function CountUp({ to }: Readonly<{ to: number }>) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView || reduceMotion) {
      if (ref.current) ref.current.textContent = to.toString();
      return;
    }
    const controls = animate(0, to, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v).toString();
      },
    });
    return () => controls.stop();
  }, [inView, to, reduceMotion]);

  return <span ref={ref}>0</span>;
}

function resolveCount(
  key: (typeof cards)[number]["count"],
  counts: Pick<
    NetworkPulseProps,
    "churchCount" | "eventCount" | "ministryCount"
  >,
  reduceMotion: boolean | null,
) {
  if (key === "support") return "Care";
  const n = counts[key];
  return reduceMotion ? n.toString() : <CountUp to={n} />;
}

function NetworkPulse({
  churchCount,
  eventCount,
  ministryCount,
}: Readonly<NetworkPulseProps>) {
  const counts = { churchCount, eventCount, ministryCount };
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="explore"
      className="relative z-10 scroll-mt-[calc(var(--nav-height)+0.75rem)] -mt-18 px-4 md:-mt-24"
    >
      <div className="container-shell">
        <div className="shadow-overlap-panel overflow-hidden rounded-[1.75rem] border border-(--color-border-subtle) bg-(--color-bg-canvas-elevated) backdrop-blur-xl">
          <div className="grid gap-px bg-(--color-border-subtle) lg:grid-cols-[1.15fr_0.85fr]">
            {/* Left: heading panel */}
            <div className="bg-(--color-bg-emphasis) px-6 py-8 text-(--color-fg-inverse) md:px-8 md:py-10">
              <div className="space-y-5 text-(--color-fg-inverse)">
                <p className="font-display text-[0.72rem] tracking-[0.3em] uppercase text-(--color-fg-accent-strong)">
                  Network pulse
                </p>
                <h2 className="max-w-xl text-[clamp(2rem,4vw,3.25rem)] leading-tight">
                  One homepage, multiple ways to step into the life of CRM North
                  America.
                </h2>
                <p className="max-w-2xl text-base leading-7 text-(--color-fg-inverse-soft) md:text-lg md:leading-8">
                  Move quickly from discovery to participation: locate a church,
                  join a ministry lane, scan the calendar, or support the work
                  happening across the network.
                </p>
              </div>
            </div>

            {/* Right: card grid */}
            <div className="grid gap-px bg-(--color-border-subtle) sm:grid-cols-2">
              {cards.map((card) => {
                const Icon = card.icon;
                return (
                  <Motion
                    key={card.key}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            y: -3,
                            transition: {
                              type: "spring",
                              stiffness: 380,
                              damping: 22,
                            },
                          }
                    }
                    className="h-full"
                  >
                    <Link
                      href={card.href}
                      className="shadow-card-hover-subtle group flex h-full flex-col justify-between bg-(--color-bg-canvas) p-6 transition-[background-color,box-shadow] duration-300 hover:bg-(--color-bg-surface-subtle)"
                    >
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <div
                            className={`flex size-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105 ${card.accentClass}`}
                          >
                            <Icon
                              className="size-5 text-(--color-fg-primary)"
                              aria-hidden
                            />
                          </div>
                          <span className="font-display text-[0.72rem] tracking-[0.26em] uppercase text-(--color-fg-accent-text) tabular-nums">
                            {resolveCount(card.count, counts, reduceMotion)}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <p className="font-display text-[0.7rem] tracking-[0.26em] uppercase text-(--color-fg-accent-text)">
                            {card.label}
                          </p>
                          <h3 className="text-2xl leading-tight">
                            {card.headline}
                          </h3>
                          <p className="text-sm leading-7 text-(--color-fg-secondary)">
                            {card.description}
                          </p>
                        </div>
                      </div>
                      <span className="mt-6 inline-flex items-center gap-2 font-display text-[0.68rem] tracking-[0.24em] uppercase text-(--color-fg-accent-text)">
                        Open
                        <ArrowRight
                          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                          aria-hidden
                        />
                      </span>
                    </Link>
                  </Motion>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NetworkPulse;
