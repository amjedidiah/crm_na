import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

/** Directory → detail navigation; use above `PageHeader` via its `leading` slot. */
function BackToListingLink({
  href,
  children,
}: Readonly<{ href: string; children: ReactNode }>) {
  return (
    <Link
      href={href}
      className="font-display inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-fg-inverse-soft transition-colors hover:text-fg-accent-strong"
    >
      <ChevronLeft className="size-4 shrink-0" aria-hidden />
      {children}
    </Link>
  );
}

export default BackToListingLink;
