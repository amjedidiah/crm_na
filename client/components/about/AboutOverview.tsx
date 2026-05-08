import SectionHeader from "@/components/shared/SectionHeader";
import { whoWeAreIntro } from "@/lib/mock-data";

function AboutOverview() {
  return (
    <section className="section-padding">
      <div className="container-shell grid gap-8 lg:grid-cols-[1fr_1fr]">
        <SectionHeader
          eyebrow="Who We Are"
          title={whoWeAreIntro.title}
          description={whoWeAreIntro.summary}
        />
        <div className="card-surface p-8 text-lg leading-8 text-(--color-fg-secondary)">
          CRM NA is being rebuilt around structured church, ministry, event,
          leadership, and media content rather than page-builder fragments.
        </div>
      </div>
    </section>
  );
}

export default AboutOverview;
