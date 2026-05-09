"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import SiteLogo from "@/components/brand/SiteLogo";
import { SITE_NAME } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const SCROLL_SOLID_AFTER = 32;

const navLinks = [
  { href: "/about", label: "About Us" },
  { href: "/churches", label: "Churches" },
  { href: "/ministries", label: "Ministries" },
  { href: "/events", label: "Events" },
  { href: "/devotionals", label: "Devotionals" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navSolidOverride, setNavSolidOverride] = useState(false);
  const mobileNavId = useId();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(globalThis.window.scrollY > SCROLL_SOLID_AFTER);
    };

    onScroll();
    globalThis.window.addEventListener("scroll", onScroll, { passive: true });

    return () => globalThis.window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    const force = () => setNavSolidOverride(true);
    const release = () => setNavSolidOverride(false);
    globalThis.addEventListener("crmna:nav-force-solid", force);
    globalThis.addEventListener("crmna:nav-release-solid", release);
    return () => {
      globalThis.removeEventListener("crmna:nav-force-solid", force);
      globalThis.removeEventListener("crmna:nav-release-solid", release);
    };
  }, []);

  const transparent = !scrolled && !navSolidOverride;

  function navLinkClassName(active: boolean) {
    const base =
      "font-display text-xs tracking-[0.2em] uppercase transition-colors";

    if (transparent && active) {
      return cn(base, "text-(--color-fg-accent-strong)");
    }

    if (transparent) {
      return cn(base, "hover:text-(--color-fg-accent-strong)");
    }

    if (active) {
      return cn(base, "text-(--color-fg-accent-text)");
    }

    return cn(
      base,
      "text-(--color-fg-primary) hover:text-(--color-fg-accent-text)",
    );
  }

  function mobileNavLinkClassName(active: boolean) {
    const base =
      "font-display rounded-md px-3 py-3 text-xs tracking-[0.2em] uppercase transition-colors";

    if (transparent) {
      if (active) {
        return cn(
          base,
          "bg-(--color-fg-inverse)/10 text-(--color-fg-accent-strong)",
        );
      }
      return cn(
        base,
        "text-(--color-fg-inverse-soft) hover:bg-(--color-fg-inverse)/10 hover:text-(--color-fg-inverse-bright)",
      );
    }

    if (active) {
      return cn(
        base,
        "bg-(--color-bg-accent-soft) text-(--color-fg-accent-text)",
      );
    }

    return cn(
      base,
      "text-(--color-fg-primary) hover:bg-(--color-bg-accent-soft) hover:text-(--color-fg-accent-text)",
    );
  }

  return (
    <header
      className={cn(
        "fixed top-(--site-banner-height) right-0 left-0 z-50 transition-[background-color,border-color,backdrop-filter,color,box-shadow,top] duration-300",
        transparent
          ? "border-transparent border-b bg-transparent backdrop-blur-none"
          : "shadow-nav border-(--color-border-subtle) border-b bg-(--color-bg-canvas-elevated) backdrop-blur-md",
      )}
      style={{ minHeight: "var(--nav-height)" }}
    >
      <div className="container-shell flex min-h-(--nav-height) items-center justify-between gap-4 py-4">
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center gap-3 transition-opacity hover:opacity-95"
          aria-label={`${SITE_NAME} home`}
        >
          <SiteLogo
            className="h-10 w-10 shrink-0"
            variant={transparent ? "on-dark" : "on-light"}
          />
          <span
            className={cn(
              "font-display truncate text-xs tracking-[0.26em] uppercase sm:text-sm",
              transparent
                ? "text-(--color-fg-inverse)"
                : "text-(--color-fg-primary)",
            )}
          >
            {SITE_NAME}
          </span>
        </Link>
        <nav
          aria-label="Primary"
          className={cn(
            "hidden gap-6 lg:flex",
            transparent && "text-(--color-fg-inverse-bright)",
          )}
        >
          {navLinks.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={navLinkClassName(active)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/give"
            className={cn(
              "font-display border px-3 py-2 text-xs tracking-[0.2em] uppercase transition-colors",
              transparent
                ? "border-(--color-fg-accent-strong) text-(--color-fg-inverse) hover:bg-(--color-bg-accent-strong) hover:text-(--color-fg-on-accent)"
                : "border-(--color-fg-accent-text) text-(--color-fg-accent-text) hover:bg-(--color-bg-accent-soft)",
            )}
          >
            Give
          </Link>
          <button
            type="button"
            className={cn(
              "flex size-10 items-center justify-center rounded-md border transition-colors lg:hidden",
              transparent
                ? "border-(--color-fg-inverse-muted) text-(--color-fg-inverse-bright) hover:border-(--color-fg-accent-strong) hover:text-(--color-fg-accent-strong)"
                : "border-(--color-border-subtle) text-(--color-fg-primary) hover:border-(--color-fg-accent-text) hover:text-(--color-fg-accent-text)",
            )}
            aria-expanded={mobileOpen}
            aria-controls={mobileNavId}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? (
              <X className="size-5" strokeWidth={1.75} aria-hidden />
            ) : (
              <Menu className="size-5" strokeWidth={1.75} aria-hidden />
            )}
            <span className="sr-only">
              {mobileOpen ? "Close menu" : "Open menu"}
            </span>
          </button>
        </div>
      </div>
      <div
        id={mobileNavId}
        className={cn(
          "absolute top-full right-0 left-0 z-50 border-b lg:hidden",
          transparent
            ? "border-(--color-border-accent-soft) bg-(--color-bg-emphasis) text-(--color-fg-inverse-bright)"
            : "border-(--color-border-subtle) bg-(--color-bg-canvas-elevated) shadow-nav backdrop-blur-md",
          mobileOpen ? "block" : "hidden",
        )}
      >
        <nav
          aria-label="Primary mobile"
          className="container-shell flex max-h-[min(70vh,28rem)] flex-col gap-1 overflow-y-auto py-4"
        >
          {navLinks.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={mobileNavLinkClassName(active)}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
