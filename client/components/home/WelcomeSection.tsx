import SectionHeader from "@/components/shared/SectionHeader";
import { whoWeAreIntro } from "@/lib/mock-data";

function WelcomeSection() {
  return (
    <section className="section-padding">
      <div className="container-shell grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <SectionHeader
          eyebrow="Welcome"
          title={whoWeAreIntro.title}
          description={whoWeAreIntro.summary}
        />
        <div className="card-surface p-8">
          <ul className="space-y-4 text-lg leading-8 text-(--muted)">
            {whoWeAreIntro.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default WelcomeSection;
