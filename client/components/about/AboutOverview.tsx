import SectionHeader from "@/components/shared/SectionHeader";
import { aboutOverview } from "@/lib/about-content";

function AboutOverview({ id }: Readonly<{ id?: string }>) {
  return (
    <section id={id} className="section-padding scroll-anchor-target">
      <div className="container-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionHeader
          eyebrow="Who We Are"
          title={aboutOverview.title}
          description={aboutOverview.description}
        />
        <div className="space-y-6">
          <div className="card-surface space-y-5 p-8">
            {aboutOverview.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-lg leading-8 text-fg-secondary"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {aboutOverview.featurePoints.map((point) => (
              <article key={point} className="card-surface p-6">
                <p className="text-sm leading-7 text-fg-secondary">{point}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutOverview;
