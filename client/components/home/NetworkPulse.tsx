"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarRange,
  Church,
  Mic2,
  PenSquare,
} from "lucide-react";
import Motion from "@/components/shared/Motion";

interface NetworkPulseProps {
  churchCount: number;
  eventCount: number;
  publicationCount: number;
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
    key: "events",
    label: "Events",
    headline: "Gathering calendar",
    href: "/events",
    icon: CalendarRange,
    accentClass: "bg-[rgba(17,32,64,0.1)]",
    count: "eventCount",
    description:
      "Track conferences, youth nights, strategy gatherings, and prayer moments across the network.",
  },
  {
    key: "media",
    label: "Media",
    headline: "Teaching archive",
    href: "/media#live",
    icon: Mic2,
    accentClass: "bg-[rgba(232,200,122,0.14)]",
    count: "live",
    description:
      "Step straight into the live section, featured sermons, and replay-driven discipleship content.",
  },
  {
    key: "corner",
    label: "Pastor's Corner",
    headline: "Pastoral reflections",
    href: "/publications",
    icon: PenSquare,
    accentClass: "bg-[rgba(11,22,40,0.08)]",
    count: "publicationCount",
    description:
      "Read long-form encouragement and conviction from CRM North America leadership.",
  },
] as const;

function resolveCount(
  key: (typeof cards)[number]["count"],
  counts: Pick<
    NetworkPulseProps,
    "churchCount" | "eventCount" | "publicationCount"
  >,
) {
  if (key === "live") {
    return "Live";
  }

  return counts[key];
}

function NetworkPulse({
  churchCount,
  eventCount,
  publicationCount,
}: Readonly<NetworkPulseProps>) {
  const counts = { churchCount, eventCount, publicationCount };

  return (
    <section className="relative z-10 -mt-18 px-4 md:-mt-24">
      <div className="container-shell">
        <div className="overflow-hidden rounded-[1.75rem] border border-(--color-border-subtle) bg-(--color-bg-canvas-elevated) shadow-[0_26px_80px_-36px_rgba(11,22,40,0.45)] backdrop-blur-xl">
          <div className="grid gap-px bg-(--color-border-subtle) lg:grid-cols-[1.15fr_0.85fr]">
            <div className="bg-(--color-bg-emphasis) px-6 py-8 text-(--color-fg-inverse) md:px-8 md:py-10">
              <Motion className="space-y-5 text-(--color-fg-inverse)">
                <p className="font-display text-[0.72rem] tracking-[0.3em] uppercase text-(--color-fg-accent-strong)">
                  Network pulse
                </p>
                <h2 className="max-w-xl text-[clamp(2rem,4vw,3.25rem)] leading-tight">
                  One homepage, multiple ways to step into the life of CRM North
                  America.
                </h2>
                <p className="max-w-2xl text-base leading-7 text-(--color-fg-inverse-soft) md:text-lg md:leading-8">
                  Move quickly from discovery to participation: locate a church,
                  catch a sermon, scan the calendar, or read a pastoral word for
                  the week.
                </p>
              </Motion>
            </div>
            <div className="grid gap-px bg-(--color-border-subtle) sm:grid-cols-2">
              {cards.map((card, index) => {
                const Icon = card.icon;

                return (
                  <Motion
                    key={card.key}
                    className="h-full text-(--color-fg-primary)"
                    transition={{
                      duration: 0.42 + index * 0.04,
                      ease: "easeOut",
                    }}
                  >
                    <Link
                      href={card.href}
                      className="group flex h-full flex-col justify-between bg-(--color-bg-canvas) p-6 transition-colors duration-300 hover:bg-(--color-bg-surface-subtle)"
                    >
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <div
                            className={`flex size-12 items-center justify-center rounded-2xl ${card.accentClass}`}
                          >
                            <Icon
                              className="size-5 text-(--color-fg-primary)"
                              aria-hidden
                            />
                          </div>
                          <span className="font-display text-[0.72rem] tracking-[0.26em] uppercase text-(--color-fg-accent)">
                            {resolveCount(card.count, counts)}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <p className="font-display text-[0.7rem] tracking-[0.26em] uppercase text-(--color-fg-accent)">
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
                      <span className="mt-6 inline-flex items-center gap-2 font-display text-[0.68rem] tracking-[0.24em] uppercase text-(--color-fg-accent)">
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
