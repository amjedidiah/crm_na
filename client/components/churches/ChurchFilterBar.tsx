import type { Region } from "@/lib/types";

function ChurchFilterBar({ regions }: Readonly<{ regions: Region[] }>) {
  return (
    <div className="flex flex-wrap gap-3">
      {regions.map((region) => (
        <span
          key={region}
          className="font-display border border-(--color-border-subtle) px-4 py-2 text-xs tracking-[0.2em] uppercase text-(--color-fg-secondary)"
        >
          {region}
        </span>
      ))}
    </div>
  );
}

export default ChurchFilterBar;
