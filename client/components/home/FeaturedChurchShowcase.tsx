"use client";

import { useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, Radio, Sparkles } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import type { Church } from "@/lib/types";
import Motion from "@/components/shared/Motion";

interface FeaturedChurchShowcaseProps {
  churches: Church[];
}

const gridEase = [0.22, 1, 0.36, 1] as const;

function featuredIntroMotionProps(reduceMotion: boolean | null) {
  return {
    initial: reduceMotion ? false : ({ opacity: 0, y: 26 } as const),
    transition: { duration: reduceMotion ? 0.01 : 0.55, ease: gridEase },
  };
}

function gridContainerVariants(reduceMotion: boolean | null) {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.08,
        delayChildren: reduceMotion ? 0 : 0.05,
      },
    },
  };
}

function cardLiftHover(reduceMotion: boolean | null) {
  return reduceMotion
    ? undefined
    : {
        y: -6,
        transition: { type: "spring" as const, stiffness: 380, damping: 22 },
      };
}

function cardRevealVariants(reduceMotion: boolean | null) {
  return {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0.01 : 0.48, ease: gridEase },
    },
  };
}

function FeaturedShowcaseIntro({
  reduceMotion,
}: Readonly<{ reduceMotion: boolean | null }>) {
  const intro = featuredIntroMotionProps(reduceMotion);
  return (
    <Motion
      initial={intro.initial}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={intro.transition}
    >
      <SectionHeader
        eyebrow="Churches"
        title="Locate a Charismatic Renewal community near you"
        description="From New England to Houston, CRM NA churches proclaim Jesus, honor the Holy Spirit, and disciple families across everyday life. Explore a few branch stories below, then step into the church directory for service times, pastoral oversight, and livestream access."
      />
    </Motion>
  );
}

function FeaturedLargeCard({
  church,
  reduceMotion,
}: Readonly<{ church: Church; reduceMotion: boolean | null }>) {
  const primaryService = church.serviceTimes[0];
  const primaryProgram = church.programs[0];

  return (
    <Motion
      variants={cardRevealVariants(reduceMotion)}
      whileHover={cardLiftHover(reduceMotion)}
      className="xl:col-span-7"
    >
      <Link
        href={`/churches/${church.slug}`}
        className="shadow-featured-card group relative block overflow-hidden rounded-4xl border border-(--color-border-accent) bg-(--color-bg-emphasis) p-8 text-(--color-fg-inverse) transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 md:p-10"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{ background: "var(--gradient-featured-card-overlay)" }}
        />
        <div className="relative flex flex-col gap-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-3">
              <p className="font-display text-[0.72rem] tracking-[0.28em] uppercase text-(--color-fg-accent-strong)">
                Featured church
              </p>
              <h3 className="max-w-xl text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.98]">
                {church.name}
              </h3>
            </div>
            <span className="rounded-full border border-(--color-fg-inverse-muted) px-4 py-2 font-display text-[0.66rem] tracking-[0.24em] uppercase text-(--color-fg-inverse-soft)">
              {church.region}
            </span>
          </div>

          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-(--color-bg-accent-soft) px-4 py-2 text-sm text-(--color-fg-inverse)">
                <MapPin
                  className="size-4 text-(--color-fg-accent-strong)"
                  aria-hidden
                />
                <span>
                  {church.city}, {church.stateOrProvince}
                </span>
              </div>
              <p className="max-w-2xl text-lg leading-8 text-(--color-fg-inverse-soft)">
                {church.summary}
              </p>
              <p className="max-w-2xl text-sm leading-7 text-(--color-fg-inverse-soft)">
                {church.story[0]}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
              <div className="rounded-[1.35rem] border border-(--color-fg-inverse-muted) bg-(--color-bg-overlay-inverse-subtle) p-5">
                <p className="font-display text-[0.66rem] tracking-[0.24em] uppercase text-(--color-fg-accent-strong)">
                  Next gathering
                </p>
                <p className="mt-3 text-xl">
                  {primaryService?.label ?? "Sunday Worship"}
                </p>
                <p className="mt-2 text-sm text-(--color-fg-inverse-soft)">
                  {primaryService?.day ?? "Sunday"} at{" "}
                  {primaryService?.time ?? "10:00 AM"}
                </p>
              </div>
              <div className="rounded-[1.35rem] border border-(--color-fg-inverse-muted) bg-(--color-bg-overlay-inverse-subtle) p-5">
                <p className="font-display text-[0.66rem] tracking-[0.24em] uppercase text-(--color-fg-accent-strong)">
                  Local emphasis
                </p>
                <p className="mt-3 text-xl">
                  {primaryProgram?.title ?? "Prayer and teaching"}
                </p>
                <p className="mt-2 text-sm text-(--color-fg-inverse-soft)">
                  {primaryProgram?.cadence ?? "Weekly"}
                </p>
              </div>
            </div>
          </div>

          <span className="inline-flex items-center gap-2 font-display text-[0.7rem] tracking-[0.24em] uppercase text-(--color-fg-accent-strong)">
            Open church page
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          </span>
        </div>
      </Link>
    </Motion>
  );
}

function SpotlightBranchCard({
  church,
  reduceMotion,
}: Readonly<{ church: Church; reduceMotion: boolean | null }>) {
  const storyLead = church.story[1] ?? church.story[0];
  const livestreamBadge = church.livestreamUrl ? (
    <span className="inline-flex items-center gap-2 rounded-full border border-(--color-border-subtle) px-3 py-1.5">
      <Radio className="size-3.5 text-(--color-fg-accent)" />
      Livestream
    </span>
  ) : null;

  return (
    <Motion
      variants={cardRevealVariants(reduceMotion)}
      whileHover={cardLiftHover(reduceMotion)}
      className="xl:col-span-5"
    >
      <Link
        href={`/churches/${church.slug}`}
        className="card-surface shadow-card-hover-strong group relative block h-full overflow-hidden rounded-4xl p-7 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-(--color-border-accent) md:p-8"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--gradient-spotlight-card-overlay)" }}
        />
        <div className="relative flex h-full flex-col justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <p className="font-display text-[0.68rem] tracking-[0.24em] uppercase text-(--color-fg-accent-text)">
                Branch spotlight
              </p>
              <Sparkles
                className="size-5 text-(--color-fg-accent-text)"
                aria-hidden
              />
            </div>
            <h3 className="text-4xl leading-tight">{church.name}</h3>
            <p className="text-lg leading-8 text-(--color-fg-secondary)">
              {church.summary}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-3 text-sm text-(--color-fg-secondary)">
              <span className="rounded-full border border-(--color-border-subtle) px-3 py-1.5">
                {church.city}, {church.stateOrProvince}
              </span>
              {livestreamBadge}
            </div>
            <p className="text-sm leading-7 text-(--color-fg-secondary)">
              {storyLead}
            </p>
            <span className="inline-flex items-center gap-2 font-display text-[0.68rem] tracking-[0.24em] uppercase text-(--color-fg-accent-text)">
              Explore branch
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </span>
          </div>
        </div>
      </Link>
    </Motion>
  );
}

function SupportingChurchTile({
  church,
  reduceMotion,
}: Readonly<{ church: Church; reduceMotion: boolean | null }>) {
  const service = church.serviceTimes[0];

  return (
    <Motion
      variants={cardRevealVariants(reduceMotion)}
      whileHover={cardLiftHover(reduceMotion)}
      className="md:col-span-1 xl:col-span-6"
    >
      <Link
        href={`/churches/${church.slug}`}
        className="card-surface shadow-card-hover-soft group relative block h-full overflow-hidden rounded-[1.75rem] p-6 transition-[box-shadow,border-color,transform] duration-300 hover:-translate-y-1 hover:border-(--color-border-accent)"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: "var(--gradient-support-card-overlay)" }}
        />
        <div className="relative flex h-full flex-col justify-between gap-8">
          <div className="space-y-3">
            <p className="eyebrow text-(--color-fg-accent-text)">{church.region}</p>
            <h3 className="text-3xl transition-transform duration-300 group-hover:translate-x-0.5">
              {church.name}
            </h3>
            <p className="text-(--color-fg-secondary)">
              {church.city}, {church.stateOrProvince}
            </p>
            <p className="text-(--color-fg-secondary) text-sm leading-7">
              {church.summary}
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-(--color-fg-secondary) text-sm leading-7">
              {service?.label ?? "Sunday worship"}: {service?.time ?? "10:00 AM"}
            </p>
            <span className="inline-flex items-center gap-2 font-display text-[0.68rem] tracking-[0.24em] uppercase text-(--color-fg-accent-text)">
              See church details
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </span>
          </div>
        </div>
      </Link>
    </Motion>
  );
}

function FeaturedChurchShowcase({
  churches,
}: Readonly<FeaturedChurchShowcaseProps>) {
  const reduceMotion = useReducedMotion();
  const [featuredChurch, spotlightChurch, ...supportingChurches] = churches;

  if (!featuredChurch) {
    return null;
  }

  return (
    <section className="section-padding">
      <div className="container-shell space-y-10">
        <FeaturedShowcaseIntro reduceMotion={reduceMotion} />
        <Motion
          className="grid gap-6 xl:grid-cols-12"
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          variants={gridContainerVariants(reduceMotion)}
        >
          <FeaturedLargeCard church={featuredChurch} reduceMotion={reduceMotion} />
          {spotlightChurch ? (
            <SpotlightBranchCard church={spotlightChurch} reduceMotion={reduceMotion} />
          ) : null}
          {supportingChurches.map((church) => (
            <SupportingChurchTile
              key={church.slug}
              church={church}
              reduceMotion={reduceMotion}
            />
          ))}
        </Motion>
      </div>
    </section>
  );
}

export default FeaturedChurchShowcase;
