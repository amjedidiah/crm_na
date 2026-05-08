"use client";

import {
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import Button from "@/components/shared/Button";
import { SITE_DESCRIPTION } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import Motion from "@/components/shared/Motion";

const MARQUEE_ITEMS = [
  "CRM Word of Life",
  "CRM Praise Center",
  "CRM Rhode Island",
  "Grace & Glory Sanctuary",
  "Youths Ministry",
  "King's Men",
  "Charismatic Women League",
  "National Prayer Conference",
  "CRM North America",
];

const contentEase = [0.22, 1, 0.36, 1] as const;
const inverseOutlineClass =
  "border-(--color-fg-inverse-soft) text-(--color-fg-inverse) hover:bg-(--color-bg-accent-strong) hover:text-(--color-fg-on-accent)";

function HeroGridOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.72]"
      style={{
        backgroundImage: "var(--gradient-hero-grid)",
        backgroundSize: "56px 56px",
        maskImage: "var(--mask-hero-grid-fade)",
      }}
    />
  );
}

function HeroCursorSpotlight({
  reduceMotion,
}: Readonly<{ reduceMotion: boolean | null }>) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 64, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 64, damping: 18, mass: 0.6 });

  const spotlight = useMotionTemplate`radial-gradient(620px circle at ${sx}px ${sy}px, var(--color-bg-overlay-accent-spotlight), transparent 65%)`;

  useEffect(() => {
    if (reduceMotion) return;

    function onMove(e: MouseEvent) {
      mx.set(e.clientX);
      my.set(e.clientY);
    }

    globalThis.addEventListener("pointermove", onMove, { passive: true });
    return () => globalThis.removeEventListener("pointermove", onMove);
  }, [mx, my, reduceMotion]);

  if (reduceMotion) return null;

  return (
    <Motion
      aria-hidden
      className="pointer-events-none absolute inset-0 mix-blend-screen"
      style={{ background: spotlight }}
    />
  );
}

function HeroFloatingOrbs({
  reduceMotion,
}: Readonly<{ reduceMotion: boolean | null }>) {
  const orbTransition = reduceMotion
    ? undefined
    : { duration: 22, repeat: Infinity, ease: "easeInOut" as const };

  return (
    <>
      <Motion
        aria-hidden
        className="pointer-events-none absolute -left-24 top-[-18%] h-[min(52vw,420px)] w-[min(52vw,420px)] rounded-full blur-3xl"
        style={{ background: "var(--gradient-hero-orb-primary)" }}
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, 36, -14, 0],
                y: [0, -22, 18, 0],
                scale: [1, 1.06, 1.02, 1],
              }
        }
        transition={orbTransition}
      />
      <Motion
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-[-28%] h-[min(62vw,520px)] w-[min(62vw,520px)] rounded-full blur-3xl"
        style={{ background: "var(--gradient-hero-orb-secondary)" }}
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, -28, 20, 0],
                y: [0, 26, -16, 0],
                opacity: [0.55, 0.72, 0.58, 0.55],
              }
        }
        transition={
          orbTransition ? { ...orbTransition, duration: 26 } : undefined
        }
      />
      <Motion
        aria-hidden
        className="pointer-events-none absolute left-[42%] top-[58%] h-40 w-40 rounded-full blur-2xl md:h-52 md:w-52"
        style={{ background: "var(--gradient-hero-orb-tertiary)" }}
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [1, 1.35, 1.08, 1],
                opacity: [0.35, 0.65, 0.45, 0.35],
              }
        }
        transition={
          orbTransition ? { ...orbTransition, duration: 14 } : undefined
        }
      />
    </>
  );
}

function HeroMotionButtonWrap({
  reduceMotion,
  children,
}: Readonly<{ reduceMotion: boolean | null; children: ReactNode }>) {
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

function HeroScrollCue({
  reduceMotion,
}: Readonly<{ reduceMotion: boolean | null }>) {
  return (
    <Motion
      className="flex flex-col items-center gap-2 pt-4 text-(--color-fg-inverse-muted)"
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: reduceMotion ? 0 : 0.95,
        duration: reduceMotion ? 0.01 : 0.45,
        ease: contentEase,
      }}
    >
      <span className="font-display text-[0.65rem] tracking-[0.28em] uppercase">
        Explore
      </span>
      <Motion
        as="span"
        aria-hidden
        animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 1.65, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <ChevronDown className="opacity-80" size={22} strokeWidth={1.75} />
      </Motion>
    </Motion>
  );
}

function fadeUpVariants(
  reduceMotion: boolean | null,
  y: number,
  duration: number,
) {
  return {
    hidden: { opacity: 0, y: reduceMotion ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0.01 : duration,
        ease: contentEase,
      },
    },
  };
}

function BranchMarquee({
  reduceMotion,
}: Readonly<{ reduceMotion: boolean | null }>) {
  return (
    <div
      aria-hidden
      className="pointer-events-none overflow-hidden border-t border-(--color-fg-inverse)/10 py-3"
    >
      <div
        className="flex whitespace-nowrap"
        style={
          reduceMotion
            ? undefined
            : { animation: "marquee-slide 32s linear infinite" }
        }
      >
        {([0, 1] as const).flatMap((setIdx) =>
          MARQUEE_ITEMS.map((name) => (
            <span
              key={`${setIdx}-${name}`}
              className="mx-8 font-display text-[0.58rem] tracking-[0.3em] uppercase text-(--color-fg-inverse-muted)"
            >
              {name}
            </span>
          )),
        )}
      </div>
    </div>
  );
}

function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className={cn(
        "hero-panel relative overflow-hidden rounded-b-[clamp(1.25rem,4vw,2.75rem)] pt-[calc(var(--nav-height)+2rem)] md:pt-[calc(var(--nav-height)+2.75rem)]",
      )}
    >
      <HeroGridOverlay />
      <HeroCursorSpotlight reduceMotion={reduceMotion} />
      <HeroFloatingOrbs reduceMotion={reduceMotion} />

      <div className="container-shell relative mx-auto space-y-10 pb-20 md:pb-24">
        <Motion
          className="space-y-8"
          initial={reduceMotion ? false : "hidden"}
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: reduceMotion ? 0 : 0.11,
                delayChildren: reduceMotion ? 0 : 0.06,
              },
            },
          }}
        >
          <Motion
            variants={fadeUpVariants(reduceMotion, 22, 0.55)}
            className="space-y-4"
          >
            <p className="eyebrow text-(--color-fg-accent-strong)">
              CRM North America
            </p>
            <Motion
              as="span"
              aria-hidden
              className="block h-px max-w-28 origin-left"
              style={{ backgroundImage: "var(--gradient-hero-rule)" }}
              initial={reduceMotion ? false : { scaleX: 0.15, opacity: 0.35 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{
                duration: reduceMotion ? 0.01 : 0.85,
                ease: contentEase,
                delay: reduceMotion ? 0 : 0.2,
              }}
            />
          </Motion>

          <Motion
            as="h1"
            variants={fadeUpVariants(reduceMotion, 28, 0.62)}
            className="max-w-4xl text-[clamp(2.6rem,5.5vw,4.85rem)] leading-[1.02] md:max-w-5xl md:leading-none"
          >
            Revival churches, pastoral care, and Spirit-filled teaching for
            every generation across North America.
          </Motion>

          <Motion
            as="p"
            variants={fadeUpVariants(reduceMotion, 22, 0.55)}
            className="max-w-3xl text-lg leading-8 text-(--color-fg-inverse) md:text-xl"
          >
            {SITE_DESCRIPTION}
          </Motion>

          <Motion
            variants={fadeUpVariants(reduceMotion, 18, 0.5)}
            className="flex flex-wrap gap-4"
          >
            <HeroMotionButtonWrap reduceMotion={reduceMotion}>
              <Button href="/churches">Find a church</Button>
            </HeroMotionButtonWrap>
            <HeroMotionButtonWrap reduceMotion={reduceMotion}>
              <Button
                href="/media#live"
                variant="outline"
                className={inverseOutlineClass}
              >
                Watch us live
              </Button>
            </HeroMotionButtonWrap>
            <HeroMotionButtonWrap reduceMotion={reduceMotion}>
              <Button
                href="/contact"
                variant="outline"
                className={inverseOutlineClass}
              >
                Contact CRM NA
              </Button>
            </HeroMotionButtonWrap>
          </Motion>
        </Motion>

        <HeroScrollCue reduceMotion={reduceMotion} />
      </div>

      {/* Full-width branch marquee */}
      <BranchMarquee reduceMotion={reduceMotion} />
    </section>
  );
}

export default HeroSection;
