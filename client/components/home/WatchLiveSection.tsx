"use client";

import { useReducedMotion } from "framer-motion";
import { PlayCircle, Radio, Tv2 } from "lucide-react";
import Button from "@/components/shared/Button";
import SectionHeader from "@/components/shared/SectionHeader";
import Motion from "@/components/shared/Motion";

const CHANNEL_URL = "https://youtube.com/@crmna";
const ease = [0.22, 1, 0.36, 1] as const;

function WatchLiveSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="dark-strip section-padding relative overflow-hidden text-(--color-fg-inverse)">
      {/* Ambient radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute left-1/2 top-0 h-56 w-200 -translate-x-1/2 blur-3xl"
          style={{ background: "var(--gradient-live-top-glow)" }}
        />
      </div>

      <div className="container-shell relative">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          {/* Left: copy */}
          <Motion
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.55, ease }}
            className="space-y-6"
          >
            <SectionHeader
              eyebrow="Watch &amp; listen"
              title="Tune in wherever this week finds you"
              description="Teaching, altar ministry, worship sets, and special services stream from CRM NA campuses and circulate through our media archive. Pause the rush, let the preached Word reset your posture."
              inverse
            />
            <Button
              href="/media#live"
              variant="outline"
              className="border-(--color-fg-inverse-soft) text-(--color-fg-inverse) hover:bg-(--color-bg-accent-strong) hover:text-(--color-fg-on-accent)"
            >
              Jump to live section
            </Button>
          </Motion>

          {/* Right: YouTube preview card */}
          <Motion
            initial={reduceMotion ? false : { opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: reduceMotion ? 0.01 : 0.62,
              ease,
              delay: reduceMotion ? 0 : 0.12,
            }}
          >
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-3xl border border-(--color-fg-inverse-muted) bg-(--color-bg-overlay-inverse-faint) transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-(--color-fg-accent-strong)"
            >
              {/* Screen area */}
              <div
                className="relative flex aspect-video items-center justify-center overflow-hidden"
                style={{ backgroundImage: "var(--gradient-live-preview-screen)" }}
              >
                {/* Subtle grid texture */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: "var(--gradient-live-preview-grid)",
                    backgroundSize: "32px 32px",
                  }}
                />
                {/* Radial glow behind play button */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{ background: "var(--gradient-live-preview-glow)" }}
                />

                {/* Play button */}
                <Motion
                  className="relative z-10 flex flex-col items-center gap-4"
                  whileHover={reduceMotion ? undefined : { scale: 1.07 }}
                  transition={{ type: "spring", stiffness: 380, damping: 22 }}
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-(--color-fg-accent-strong)/40 bg-(--color-bg-accent-strong)/15 transition-all duration-300 group-hover:border-(--color-fg-accent-strong)/70 group-hover:bg-(--color-bg-accent-strong)/30">
                    <PlayCircle
                      className="h-10 w-10 text-(--color-fg-accent-strong)"
                      aria-hidden
                    />
                  </div>
                  <span className="font-display text-[0.68rem] tracking-[0.28em] uppercase text-(--color-fg-inverse-soft)">
                    Watch on YouTube
                  </span>
                </Motion>
              </div>

              {/* Card footer */}
              <div className="flex items-center justify-between gap-4 border-t border-(--color-fg-inverse-muted) px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-(--color-bg-accent-soft)">
                    <Tv2 className="h-4 w-4 text-(--color-fg-accent-strong)" aria-hidden />
                  </div>
                  <div>
                    <p className="font-display text-[0.6rem] tracking-[0.22em] uppercase text-(--color-fg-accent-strong)">
                      CRM North America
                    </p>
                    <p className="text-xs text-(--color-fg-inverse-muted)">
                      youtube.com/@crmna
                    </p>
                  </div>
                </div>
                {/* Pulsing live indicator */}
                <div className="flex items-center gap-2">
                  <Motion
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: "var(--color-status-live)" }}
                    animate={
                      reduceMotion
                        ? undefined
                        : { scale: [1, 1.55, 1], opacity: [0.85, 0.3, 0.85] }
                    }
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <span
                    className="font-display text-[0.6rem] tracking-[0.2em] uppercase"
                    style={{ color: "var(--color-status-live-soft)" }}
                  >
                    Live available
                  </span>
                  <Radio
                    className="h-3.5 w-3.5"
                    style={{ color: "var(--color-status-live-soft)" }}
                    aria-hidden
                  />
                </div>
              </div>
            </a>
          </Motion>
        </div>
      </div>
    </section>
  );
}

export default WatchLiveSection;
