"use client";

import { X } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { isConventionHeroPromoEnabled } from "@/lib/convention-hero-promo";
import { cn } from "@/lib/utils";
import { useConventionRegistrationHref } from "@/lib/use-convention-registration-href";

const STORAGE_KEY = "crm-na-convention-2026-banner-dismissed";
/** Same threshold as `Navbar` so the bar turns solid when the header does. */
const SCROLL_SOLID_AFTER = 32;

function setBannerHeightPx(px: number) {
  document.documentElement.style.setProperty(
    "--site-banner-height",
    px > 0 ? `${px}px` : "0px",
  );
}

function ConventionRegistrationBanner() {
  const barRef = useRef<HTMLElement>(null);
  const registerHref = useConventionRegistrationHref();
  const [dismissed, setDismissed] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const promoEnabled = isConventionHeroPromoEnabled();

  const measure = useCallback(() => {
    const el = barRef.current;
    if (!el) return;
    setBannerHeightPx(Math.ceil(el.getBoundingClientRect().height));
  }, []);

  useLayoutEffect(() => {
    if (dismissed || !promoEnabled) {
      setBannerHeightPx(0);
      return;
    }

    try {
      if (globalThis.localStorage?.getItem(STORAGE_KEY) === "1") {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- sync read before paint; avoids hydration mismatch vs lazy useState(window)
        setDismissed(true);
        setBannerHeightPx(0);
        return;
      }
    } catch {
      /* private mode */
    }

    measure();
    const w = globalThis.window;
    w?.addEventListener("resize", measure, { passive: true });
    return () => w?.removeEventListener("resize", measure);
  }, [dismissed, measure, promoEnabled]);

  const dismiss = useCallback(() => {
    try {
      globalThis.localStorage?.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setDismissed(true);
  }, []);

  useEffect(() => {
    if (dismissed || !promoEnabled) return;

    const onScroll = () => {
      setScrolled(globalThis.window.scrollY > SCROLL_SOLID_AFTER);
    };

    onScroll();
    globalThis.window.addEventListener("scroll", onScroll, { passive: true });
    return () => globalThis.window.removeEventListener("scroll", onScroll);
  }, [dismissed, promoEnabled]);

  if (dismissed || !promoEnabled) {
    return null;
  }

  return (
    <section
      ref={barRef}
      aria-label="Convention registration"
      className={cn(
        "fixed top-0 right-0 left-0 z-60 border-b transition-[background-color,border-color,box-shadow,color,backdrop-filter] duration-300",
        scrolled
          ? "border-(--border-brand-soft) bg-(--surface-inverse) text-(--text-on-inverse-bright) shadow-none backdrop-blur-none"
          : "border-(--border-default) bg-(--surface-page-elevated) text-(--text-primary) shadow-nav backdrop-blur-md",
      )}
    >
      <div className="container-shell flex flex-col gap-3 py-3 pl-4 pr-14 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-4 sm:gap-y-2 sm:py-2.5 sm:pr-12 md:pl-6">
        <p
          className={cn(
            "min-w-0 text-balance text-center text-sm leading-snug transition-colors duration-300 sm:text-left md:text-base",
            scrolled ? "text-(--text-on-inverse-bright)" : "max-sm:text-(--text-secondary)",
          )}
        >
          <span
            className={cn(
              "font-display mb-1 block text-xs tracking-[0.22em] uppercase sm:mb-0 sm:mr-2 sm:inline",
              scrolled
                ? "text-(--text-brand-strong)"
                : "text-(--text-accent)",
            )}
          >
            Registration open
          </span>
          <span
            className={cn(
              scrolled ? "text-(--text-on-inverse-soft)" : "text-(--text-primary)",
            )}
          >
            National Convention 2026 · Houston,{" "}
            <wbr />
            Jul 29–Aug 2 — register on the official convention site.
          </span>
        </p>
        <a
          href={registerHref}
          className="font-display flex w-full min-h-11 shrink-0 items-center justify-center border border-(--text-brand-strong) bg-(--interactive-hover) px-4 py-2.5 text-xs tracking-[0.18em] uppercase text-(--text-on-brand) transition-opacity hover:opacity-95 sm:w-auto sm:min-h-0 sm:py-1.5"
        >
          Register
        </a>
      </div>
      <button
        type="button"
        onClick={dismiss}
        className={cn(
          "absolute top-1/2 right-2 flex size-11 shrink-0 -translate-y-1/2 items-center justify-center rounded-md transition-colors sm:size-9",
          scrolled
            ? "text-(--text-on-inverse-muted) hover:bg-(--text-on-inverse)/10 hover:text-(--text-on-inverse-bright)"
            : "text-(--text-secondary) hover:bg-(--interactive-muted) hover:text-(--text-primary)",
        )}
        aria-label="Dismiss convention announcement"
      >
        <X className="size-4" strokeWidth={1.75} aria-hidden />
      </button>
    </section>
  );
}

export default ConventionRegistrationBanner;
