"use client";

import { usePathname } from "next/navigation";

function NavOffset() {
  const home = usePathname() === "/";

  if (home) return null;

  return (
    <div
      aria-hidden
      style={{ height: "var(--nav-height)" }}
      className="shrink-0"
    />
  );
}

export default NavOffset;
