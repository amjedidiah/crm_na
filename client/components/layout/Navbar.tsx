"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SiteLogo from "@/components/brand/SiteLogo";
import { SITE_NAME } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const SCROLL_SOLID_AFTER = 32;

const navLinks = [
  { href: "/who-we-are", label: "About" },
  { href: "/churches", label: "Churches" },
  { href: "/ministries", label: "Ministries" },
  { href: "/events", label: "Events" },
  { href: "/media", label: "Media" },
  { href: "/contact", label: "Contact" },
];

function Navbar() {
  const pathname = usePathname();
  const onHomeHero = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(globalThis.window.scrollY > SCROLL_SOLID_AFTER);
    };

    onScroll();

    if (pathname !== "/") {
      return;
    }

    globalThis.window.addEventListener("scroll", onScroll, { passive: true });

    return () => globalThis.window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const transparent = onHomeHero && !scrolled;

  function navLinkClassName(active: boolean) {
    const base =
      "font-display text-xs tracking-[0.2em] uppercase transition-colors";

    if (transparent && active) {
      return cn(base, "text-(--color-fg-accent-strong)");
    }

    if (transparent) {
      return cn(base, "text-(--color-fg-inverse-soft) hover:text-(--color-fg-inverse)");
    }

    if (active) {
      return cn(base, "text-(--color-fg-accent-text)");
    }

    return cn(base, "text-(--color-fg-primary) hover:text-(--color-fg-accent-text)");
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,backdrop-filter,color,box-shadow] duration-300",
        transparent
          ? "border-transparent border-b bg-transparent backdrop-blur-none"
          : "border-(--color-border-subtle) border-b bg-(--color-bg-canvas-elevated) shadow-[0_18px_45px_-30px_rgba(11,22,40,0.42)] backdrop-blur-md",
      )}
      style={{ minHeight: "var(--nav-height)" }}
    >
      <div className="container-shell flex min-h-(--nav-height) items-center justify-between py-4">
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-95"
          aria-label={`${SITE_NAME} home`}
        >
          <SiteLogo
            className="h-10 w-10 shrink-0"
            variant={transparent ? "on-dark" : "on-light"}
          />
          <span
            className={cn(
              "font-display text-xs tracking-[0.26em] uppercase sm:text-sm",
              transparent ? "text-(--color-fg-inverse)" : "text-(--color-fg-primary)",
            )}
          >
            {SITE_NAME}
          </span>
        </Link>
        <nav className="hidden gap-6 md:flex">
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
      </div>
    </header>
  );
}

export default Navbar;
