import type { Leader } from "@/lib/types";
import LeadershipGrid from "@/components/leadership/LeadershipGrid";
import SectionHeader from "@/components/shared/SectionHeader";
import { aboutLeadership } from "@/lib/about-content";

const OVERSEER_ID = "peter-ezekwenna";

function orderWithOverseerFirst(leaders: Leader[]): Leader[] {
  const overseer = leaders.find((leader) => leader.id === OVERSEER_ID);
  if (!overseer) {
    return leaders;
  }
  return [overseer, ...leaders.filter((leader) => leader.id !== OVERSEER_ID)];
}

function LeadershipSection({
  leaders,
  id,
}: Readonly<{
  leaders: Leader[];
  id?: string;
}>) {
  const orderedLeaders = orderWithOverseerFirst(leaders);
  const hasLeaders = orderedLeaders.length > 0;

  return (
    <section
      id={id}
      className="section-padding scroll-anchor-target text-fg-primary"
    >
      <div className="container-shell space-y-8">
        <SectionHeader
          eyebrow="Leadership"
          title={aboutLeadership.title}
          description={aboutLeadership.description}
        />
        <div className="grid gap-3 sm:grid-cols-3">
          {aboutLeadership.lanes.map((lane) => (
            <div
              key={lane}
              className="lane-callout px-4 py-3 text-sm leading-7 text-fg-secondary"
            >
              {lane}
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <div>
            <p className="eyebrow">Our Pastors</p>
            <h3 className="text-4xl md:text-5xl">
              Serving across branches and ministries
            </h3>
          </div>
          {hasLeaders ? (
            <LeadershipGrid leaders={orderedLeaders} />
          ) : (
            <div className="card-surface p-8 text-center">
              <p className="text-3xl">{aboutLeadership.emptyTitle}</p>
              <p className="mx-auto mt-3 max-w-2xl text-lg leading-8 text-fg-secondary">
                {aboutLeadership.emptyDescription}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default LeadershipSection;
