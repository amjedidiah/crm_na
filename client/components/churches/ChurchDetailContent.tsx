import SectionHeader from "@/components/shared/SectionHeader";
import type { Church, Leader } from "@/lib/types";
import ChurchLeadership from "@/components/churches/ChurchLeadership";
import ChurchPrograms from "@/components/churches/ChurchPrograms";
import ChurchVisitInfo from "@/components/churches/ChurchVisitInfo";

function ChurchDetailContent({
  church,
  leaders,
}: Readonly<{
  church: Church;
  leaders: Leader[];
}>) {
  return (
    <section className="section-padding">
      <div className="container-shell space-y-12">
        <SectionHeader
          eyebrow={church.region}
          title={church.name}
          description={church.summary}
        />
        <div className="grid gap-4">
          {church.story.map((paragraph) => (
            <p
              key={paragraph}
              className="max-w-4xl text-lg leading-8 text-(--color-fg-secondary)"
            >
              {paragraph}
            </p>
          ))}
        </div>
        <ChurchLeadership leaders={leaders} />
        <ChurchPrograms programs={church.programs} />
        <ChurchVisitInfo church={church} />
      </div>
    </section>
  );
}

export default ChurchDetailContent;
