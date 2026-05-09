import type { Leader, Ministry } from "@/lib/types";
import MinistryCard from "@/components/ministries/MinistryCard";
import SectionHeader from "@/components/shared/SectionHeader";

function MinistryGrid({
  ministries,
  leaders,
}: Readonly<{
  ministries: Ministry[];
  leaders: Leader[];
}>) {
  return (
    <div className="space-y-10 text-(--color-fg-primary)">
      <SectionHeader
        eyebrow="Serve with us"
        title="Ministry showcase"
        description="Each lane stewards discipleship, prayer, and practical care across CRM North America. Open a profile to read the story, see rhythms, and discover how to step in."
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {ministries.map((ministry) => (
          <MinistryCard key={ministry.slug} ministry={ministry} leaders={leaders} />
        ))}
      </div>
    </div>
  );
}

export default MinistryGrid;
