"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { CalendarDays, ChevronDown } from "lucide-react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import Button from "@/components/shared/Button";
import Motion from "@/components/shared/Motion";
import type { ConventionHeroPanelData } from "@/lib/home-hero";
import {
  SITE_DESCRIPTION,
  churches,
  events,
  leaders,
  ministries,
} from "@/lib/mock-data";
import { useConventionRegistrationHref } from "@/lib/use-convention-registration-href";
import { cn } from "@/lib/utils";

type HeroTabId = "convention" | "evergreen";

interface HeroSectionClientProps {
  conventionPanel: ConventionHeroPanelData | null;
}

const MARQUEE_ITEMS = [
  `${churches.length} church centers across the network`,
  `${ministries.length} ministry pathways for service and discipleship`,
  `${events.length} upcoming network gatherings`,
  `${leaders.length} pastoral and ministry leaders`,
  "Serving the United States, Canada, and Mexico",
  "Prayer, worship, discipleship, and revival",
  "Churches, ministries, gallery moments, and devotional care",
];

const HERO_TABS = [
  { id: "convention", label: "Convention 2026" },
  { id: "evergreen", label: "Who we are" },
] as const;

const contentEase = [0.22, 1, 0.36, 1] as const;
const inverseOutlineClass =
  "border-(--text-on-inverse-soft) text-(--text-on-inverse) hover:bg-(--interactive-hover) hover:text-(--text-on-brand)";

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

  const spotlight = useMotionTemplate`radial-gradient(620px circle at ${sx}px ${sy}px, var(--overlay-brand-spotlight), transparent 65%)`;

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
  function scrollToExplore() {
    document.getElementById("explore")?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }

  return (
    <Motion
      as="button"
      type="button"
      aria-label="Scroll to explore more below"
      onClick={scrollToExplore}
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: reduceMotion ? 0 : 0.65,
        duration: reduceMotion ? 0.01 : 0.45,
        ease: contentEase,
      }}
      whileHover={reduceMotion ? undefined : { scale: 1.03 }}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      className="mx-auto flex cursor-pointer flex-col items-center gap-2 pt-4 text-(--text-on-inverse-muted) transition-colors hover:text-(--text-on-inverse-soft) focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--text-brand-strong)"
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
      className="pointer-events-none overflow-hidden border-t border-(--text-on-inverse)/10 py-3"
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
              className="mx-8 font-display text-[0.58rem] tracking-[0.3em] uppercase text-(--text-on-inverse-muted)"
            >
              {name}
            </span>
          )),
        )}
      </div>
    </div>
  );
}

function HeroTabs({
  idPrefix,
  activeTab,
  onChange,
}: Readonly<{
  idPrefix: string;
  activeTab: HeroTabId;
  onChange: (nextTab: HeroTabId) => void;
}>) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function focusTab(index: number) {
    const nextTab = HERO_TABS[index];
    if (!nextTab) return;

    tabRefs.current[index]?.focus();
    onChange(nextTab.id);
  }

  function onTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown": {
        event.preventDefault();
        focusTab((index + 1) % HERO_TABS.length);
        break;
      }
      case "ArrowLeft":
      case "ArrowUp": {
        event.preventDefault();
        focusTab((index - 1 + HERO_TABS.length) % HERO_TABS.length);
        break;
      }
      case "Home": {
        event.preventDefault();
        focusTab(0);
        break;
      }
      case "End": {
        event.preventDefault();
        focusTab(HERO_TABS.length - 1);
        break;
      }
    }
  }

  return (
    <div className="flex justify-start">
      <div
        role="tablist"
        aria-label="Homepage hero panels"
        className="inline-flex rounded-full border border-(--text-on-inverse)/15 bg-(--text-on-inverse)/5 p-1 backdrop-blur-sm"
      >
        {HERO_TABS.map((tab, index) => {
          const selected = activeTab === tab.id;
          const tabId = `${idPrefix}-${tab.id}-tab`;
          const panelId = `${idPrefix}-${tab.id}-panel`;

          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              onKeyDown={(event) => onTabKeyDown(event, index)}
              onClick={() => onChange(tab.id)}
              className={cn(
                "font-display rounded-full px-4 py-2 text-[0.65rem] tracking-[0.24em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--text-brand-strong) sm:px-5",
                selected
                  ? "bg-(--interactive-hover) text-(--text-on-brand)"
                  : "text-(--text-on-inverse-soft) hover:text-(--text-on-inverse)",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ConventionHeroPanel({
  panel,
  reduceMotion,
  registerHref,
  tabPanelId,
  labelledBy,
}: Readonly<{
  panel: ConventionHeroPanelData;
  reduceMotion: boolean | null;
  registerHref: string;
  tabPanelId: string;
  labelledBy: string;
}>) {
  return (
    <Motion
      key="convention-panel"
      id={tabPanelId}
      role="tabpanel"
      aria-labelledby={labelledBy}
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.28, ease: contentEase }}
      className="grid min-h-112 gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)] lg:items-center"
    >
      <div className="space-y-8">
        <Motion
          className="space-y-4"
          initial={reduceMotion ? false : "hidden"}
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: reduceMotion ? 0 : 0.09,
                delayChildren: reduceMotion ? 0 : 0.03,
              },
            },
          }}
        >
          <Motion
            variants={fadeUpVariants(reduceMotion, 18, 0.45)}
            className="space-y-4"
          >
            <p className="eyebrow text-(--text-brand-strong)">
              {panel.eyebrow}
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
                delay: reduceMotion ? 0 : 0.12,
              }}
            />
          </Motion>

          <Motion
            as="h1"
            variants={fadeUpVariants(reduceMotion, 24, 0.52)}
            className="max-w-4xl text-[clamp(2.55rem,5.6vw,4.75rem)] leading-[1.02] md:leading-none"
          >
            {panel.title}
          </Motion>

          <Motion variants={fadeUpVariants(reduceMotion, 16, 0.42)}>
            <p className="font-display text-sm tracking-[0.28em] text-(--text-brand-strong) uppercase md:text-base">
              {panel.locationDates}
            </p>
          </Motion>

          <Motion
            as="p"
            variants={fadeUpVariants(reduceMotion, 20, 0.46)}
            className="max-w-3xl text-lg leading-8 text-(--text-on-inverse) md:text-xl"
          >
            {panel.supporting}
          </Motion>

          <Motion
            variants={fadeUpVariants(reduceMotion, 14, 0.4)}
            className="flex flex-wrap gap-4"
          >
            <HeroMotionButtonWrap reduceMotion={reduceMotion}>
              <Button
                href={registerHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                {panel.registerLabel}
              </Button>
            </HeroMotionButtonWrap>
            <HeroMotionButtonWrap reduceMotion={reduceMotion}>
              <Button
                href={panel.detailsHref}
                variant="outline"
                className={inverseOutlineClass}
              >
                {panel.detailsLabel}
              </Button>
            </HeroMotionButtonWrap>
          </Motion>
        </Motion>
      </div>

      <Motion
        initial={reduceMotion ? false : { opacity: 0, scale: 0.98, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={
          reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98, y: -8 }
        }
        transition={{ duration: reduceMotion ? 0.01 : 0.28, ease: contentEase }}
        className="w-full"
      >
        <Link
          href={panel.detailsHref}
          aria-label={`View details for ${panel.title}`}
          className="group block overflow-hidden rounded-[1.8rem] border border-(--text-on-inverse)/15 bg-(--text-on-inverse)/5 shadow-featured-card transition-colors hover:border-(--border-brand-soft) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--text-brand-strong)"
        >
          {panel.flyerSrc ? (
            <Image
              src={panel.flyerSrc}
              alt={panel.flyerAlt}
              width={1200}
              height={1500}
              className="aspect-video lg:aspect-4/5 w-full object-cover transition-transform duration-300 group-hover:scale-[1.015]"
            />
          ) : (
            <div className="flex aspect-4/5 flex-col items-center justify-center gap-5 bg-(--text-on-inverse)/3 px-8 text-center">
              <div className="flex size-16 items-center justify-center rounded-full border border-(--text-on-inverse)/10 bg-(--text-on-inverse)/4">
                <CalendarDays
                  className="size-8 text-(--text-brand-strong)"
                  aria-hidden
                />
              </div>
              <div className="space-y-3">
                <p className="font-display text-xs tracking-[0.24em] text-(--text-brand-strong) uppercase">
                  Program Flyer
                </p>
                <p className="text-2xl leading-tight text-(--text-on-inverse)">
                  {panel.title}
                </p>
                <p className="text-sm leading-6 text-(--text-on-inverse-soft)">
                  {panel.locationDates}
                </p>
              </div>
            </div>
          )}
        </Link>
      </Motion>
    </Motion>
  );
}

function EvergreenHeroPanel({
  reduceMotion,
  tabPanelId,
  labelledBy,
}: Readonly<{
  reduceMotion: boolean | null;
  tabPanelId?: string;
  labelledBy?: string;
}>) {
  const panelProps =
    tabPanelId && labelledBy
      ? ({
          id: tabPanelId,
          role: "tabpanel",
          "aria-labelledby": labelledBy,
        } as const)
      : {};

  return (
    <Motion
      key="evergreen-panel"
      {...panelProps}
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.28, ease: contentEase }}
      className="min-h-112"
    >
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
          <p className="eyebrow text-(--text-brand-strong)">
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
          Revival churches, pastoral care, and Spirit-filled teaching for every
          generation across North America.
        </Motion>

        <Motion
          as="p"
          variants={fadeUpVariants(reduceMotion, 22, 0.55)}
          className="max-w-3xl text-lg leading-8 text-(--text-on-inverse) md:text-xl"
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
              href="/gallery"
              variant="outline"
              className={inverseOutlineClass}
            >
              Browse the gallery
            </Button>
          </HeroMotionButtonWrap>
        </Motion>
      </Motion>
    </Motion>
  );
}

function HeroSectionClient({
  conventionPanel,
}: Readonly<HeroSectionClientProps>) {
  const reduceMotion = useReducedMotion();
  const registerHref = useConventionRegistrationHref();
  const hasConventionPanel = conventionPanel !== null;
  const [activeTab, setActiveTab] = useState<HeroTabId>("convention");
  const idPrefix = useId();
  const selectedTab = hasConventionPanel ? activeTab : "evergreen";
  const activePanelId = `${idPrefix}-${selectedTab}-panel`;
  const activeLabelledBy = `${idPrefix}-${selectedTab}-tab`;

  return (
    <section className="hero-panel relative -mt-[calc(var(--nav-height)+var(--site-banner-height))] overflow-hidden rounded-b-[clamp(1.25rem,4vw,2.75rem)] pt-[calc(var(--nav-height)+var(--site-banner-height)+2rem)] md:pt-[calc(var(--nav-height)+var(--site-banner-height)+5.5rem)]">
      <HeroGridOverlay />
      <HeroCursorSpotlight reduceMotion={reduceMotion} />
      <HeroFloatingOrbs reduceMotion={reduceMotion} />

      <div className="container-shell relative mx-auto space-y-10 pb-20 md:pb-24">
        {hasConventionPanel ? (
          <HeroTabs
            idPrefix={idPrefix}
            activeTab={selectedTab}
            onChange={setActiveTab}
          />
        ) : null}

        <AnimatePresence initial={false} mode="wait">
          {hasConventionPanel &&
          selectedTab === "convention" &&
          conventionPanel ? (
            <ConventionHeroPanel
              panel={conventionPanel}
              reduceMotion={reduceMotion}
              registerHref={registerHref}
              tabPanelId={activePanelId}
              labelledBy={activeLabelledBy}
            />
          ) : (
            <EvergreenHeroPanel
              reduceMotion={reduceMotion}
              tabPanelId={hasConventionPanel ? activePanelId : undefined}
              labelledBy={hasConventionPanel ? activeLabelledBy : undefined}
            />
          )}
        </AnimatePresence>

        <HeroScrollCue reduceMotion={reduceMotion} />
      </div>

      <BranchMarquee reduceMotion={reduceMotion} />
    </section>
  );
}

export default HeroSectionClient;
