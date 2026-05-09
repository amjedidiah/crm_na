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
        {church.story.length > 0 ? (
          <>
            <SectionHeader
              eyebrow="Overview"
              title="Our story"
              description="How this branch lives out CRM NA’s call to Spirit-filled worship and discipleship."
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
          </>
        ) : null}

        {leaders.length > 0 ? (
          <>
            <SectionHeader
              eyebrow="Leadership"
              title="Pastoral oversight"
              description="Leaders who help shepherd this local expression of CRM NA."
            />
            <ChurchLeadership leaders={leaders} />
          </>
        ) : null}

        {church.programs.length > 0 ? (
          <>
            <SectionHeader
              eyebrow="Rhythms"
              title="Programs & service life"
            />
            <ChurchPrograms programs={church.programs} />
          </>
        ) : null}

        {church.serviceTimes.length > 0 ||
        church.address ||
        church.phone ||
        church.email ? (
          <>
            <SectionHeader
              eyebrow="Visit"
              title="Service times & contact"
              description="Plan a Sunday, a midweek gathering, or a pastoral conversation."
            />
            <ChurchVisitInfo church={church} />
          </>
        ) : null}
      </div>
    </section>
  );
}

export default ChurchDetailContent;
