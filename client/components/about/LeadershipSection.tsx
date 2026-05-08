import type { Leader } from "@/lib/types";
import LeadershipGrid from "@/components/leadership/LeadershipGrid";
import LeadershipHierarchy from "@/components/leadership/LeadershipHierarchy";
import SectionHeader from "@/components/shared/SectionHeader";

function LeadershipSection({
  leaders,
  id,
}: Readonly<{
  leaders: Leader[];
  id?: string;
}>) {
  return (
    <section id={id} className="section-padding text-(--color-fg-primary)">
      <div className="container-shell space-y-8">
        <SectionHeader
          eyebrow="Leadership"
          title="Pastors and national leaders"
          description="CRM North America leadership is modeled as structured records so branch, ministry, and national oversight relationships stay clear."
        />
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <LeadershipGrid leaders={leaders} />
          <LeadershipHierarchy leaders={leaders.slice(0, 5)} />
        </div>
      </div>
    </section>
  );
}

export default LeadershipSection;
