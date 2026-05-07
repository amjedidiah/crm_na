"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_NAME } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

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

  return (
    <header className="sticky top-0 z-50 border-b border-(--border) bg-(--offwhite)/95 backdrop-blur">
      <div className="container-shell flex items-center justify-between py-4">
        <Link
          href="/"
          className="font-display text-sm tracking-[0.3em] uppercase"
        >
          {SITE_NAME}
        </Link>
        <nav className="hidden gap-6 md:flex">
          {navLinks.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-display text-xs tracking-[0.2em] uppercase transition-colors",
                  active ? "text-(--gold)" : "text-(--text)",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <Link
          href="/give"
          className="font-display border border-(--gold) px-3 py-2 text-xs tracking-[0.2em] uppercase text-(--gold)"
        >
          Give
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
