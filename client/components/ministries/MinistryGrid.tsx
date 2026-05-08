import type { Ministry } from "@/lib/types";
import MinistryCard from "@/components/ministries/MinistryCard";

function MinistryGrid({ ministries }: Readonly<{ ministries: Ministry[] }>) {
  return (
    <div className="grid gap-6 text-(--color-fg-primary) md:grid-cols-2 xl:grid-cols-3">
      {ministries.map((ministry) => (
        <MinistryCard key={ministry.slug} ministry={ministry} />
      ))}
    </div>
  );
}

export default MinistryGrid;
