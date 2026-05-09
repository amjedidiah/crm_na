"use client";

import { useMemo, useState } from "react";
import type { Church } from "@/lib/types";
import {
  DIRECTORY_REGION_FILTERS,
  type DirectoryRegionFilter,
  filterChurchesByDirectoryRegion,
  sortChurchesByDirectoryOrder,
} from "@/lib/church-utils";
import ChurchCard from "@/components/churches/ChurchCard";
import { cn } from "@/lib/utils";

interface ChurchesDirectoryClientProps {
  churches: Church[];
}

function ChurchesDirectoryClient({
  churches,
}: Readonly<ChurchesDirectoryClientProps>) {
  const [region, setRegion] = useState<DirectoryRegionFilter>("All");

  const sortedForRegion = useMemo(() => {
    const scoped = filterChurchesByDirectoryRegion(churches, region);
    return sortChurchesByDirectoryOrder(scoped);
  }, [churches, region]);

  const empty =
    sortedForRegion.length === 0 && churches.length > 0;

  return (
    <div className="space-y-16">
      <div className="flex flex-wrap gap-2 md:gap-3">
        {DIRECTORY_REGION_FILTERS.map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => setRegion(label)}
            className={cn(
              "cursor-pointer font-display border px-4 py-2.5 text-xs tracking-[0.2em] uppercase transition-colors",
              label === region
                ? "border-(--color-border-accent) bg-(--color-bg-accent) text-(--color-fg-on-accent)"
                : "border-(--color-border-subtle) text-(--color-fg-secondary) hover:border-(--color-border-accent) hover:text-(--color-fg-primary)",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {empty ? (
        <div className="card-surface p-8 text-center md:p-12">
          <p className="eyebrow">No locations in this region</p>
          <p className="mt-3 text-(--color-fg-secondary)">
            Try All or another region, or contact the national office and we will
            help you connect.
          </p>
        </div>
      ) : null}

      {sortedForRegion.length > 0 ? (
        <div className="space-y-6">
          <p className="max-w-3xl text-(--color-fg-secondary) leading-8">
            Filter by region. Cards that offer a branch link take you to our page or the
            congregation’s primary site; all other listings open contact with Churches
            selected and that branch’s slug included so we can route your note correctly.
          </p>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {sortedForRegion.map((church) => (
              <ChurchCard key={church.slug} church={church} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ChurchesDirectoryClient;
