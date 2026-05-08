import SectionHeader from "@/components/shared/SectionHeader";
import { visionContent } from "@/lib/mock-data";

function VisionContent() {
  return (
    <section className="section-padding">
      <div className="container-shell space-y-8">
        <SectionHeader
          eyebrow="Vision"
          title={visionContent.title}
          description="The rebuild preserves the ministry’s prophetic and historical language while making it more readable."
        />
        <div className="grid gap-6">
          {visionContent.body.map((paragraph) => (
            <p
              key={paragraph}
              className="max-w-4xl text-lg leading-8 text-(--color-fg-secondary)"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

export default VisionContent;
