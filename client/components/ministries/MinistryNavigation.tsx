import Link from "next/link";
import type { Ministry } from "@/lib/types";
import { getSiblingMinistries } from "@/lib/ministry-utils";
import SectionHeader from "@/components/shared/SectionHeader";

function MinistryNavigation({
  currentSlug,
  ministries,
}: Readonly<{
  currentSlug: string;
  ministries: Ministry[];
}>) {
  const siblings = getSiblingMinistries(currentSlug, ministries);

  if (siblings.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8 border-t border-(--color-border-subtle) pt-12 text-(--color-fg-primary)">
      <SectionHeader
        eyebrow="Keep exploring"
        title="Other ministry lanes"
        description="Every team contributes to the same revival story. Browse another lane or return to the full index when you are ready to serve."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {siblings.map((ministry) => (
          <Link
            key={ministry.slug}
            href={`/ministries/${ministry.slug}`}
            className="card-surface hover:border-(--color-fg-accent) flex flex-col gap-2 border-(--color-border-subtle) p-5 transition-colors"
          >
            <p className="font-display text-[0.6rem] tracking-[0.22em] text-(--color-fg-accent-text) uppercase">
              Ministry
            </p>
            <p className="text-xl font-medium">{ministry.name}</p>
            <p className="text-(--color-fg-secondary) line-clamp-2 text-sm leading-6">
              {ministry.summary}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MinistryNavigation;
