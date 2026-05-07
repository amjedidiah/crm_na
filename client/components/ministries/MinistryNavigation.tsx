import Link from "next/link";
import type { Ministry } from "@/lib/types";

function MinistryNavigation({
  ministries,
}: Readonly<{
  ministries: Ministry[];
}>) {
  return (
    <div className="flex flex-wrap gap-3">
      {ministries.map((ministry) => (
        <Link
          key={ministry.slug}
          href={`/ministries/${ministry.slug}`}
          className="font-display border border-(--border) px-4 py-2 text-xs tracking-[0.2em] uppercase text-(--muted)"
        >
          {ministry.name}
        </Link>
      ))}
    </div>
  );
}

export default MinistryNavigation;
