import LeadershipGrid from "@/components/leadership/LeadershipGrid";
import LeadershipHierarchy from "@/components/leadership/LeadershipHierarchy";
import PageHeader from "@/components/shared/PageHeader";
import { getLeaders } from "@/lib/wordpress";

async function OurPastorsPage() {
  const leaders = await getLeaders();

  return (
    <div className="bg-(--color-bg-canvas) text-(--color-fg-primary)">
      <PageHeader
        eyebrow="Leadership"
        title="Our Pastors"
        description="The public leadership route stays at `/our-pastors`, but the content is modeled as structured leader records."
      />
      <section className="section-padding text-(--color-fg-primary)">
        <div className="container-shell grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <LeadershipGrid leaders={leaders} />
          <LeadershipHierarchy leaders={leaders.slice(0, 5)} />
        </div>
      </section>
    </div>
  );
}

export default OurPastorsPage;
