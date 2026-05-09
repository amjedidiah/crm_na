import SectionHeader from "@/components/shared/SectionHeader";
import { aboutHistoryHighlights } from "@/lib/about-content";

function HistoryHighlights({ id }: Readonly<{ id?: string }>) {
  return (
    <section id={id} className="section-padding scroll-anchor-target">
      <div className="container-shell space-y-8">
        <SectionHeader
          eyebrow="History"
          title="Key milestones on the road to today."
          description="The full CRM North America story spans prayer calls, conferences, relocation, and the emergence of church centers—here are anchor moments from that journey."
        />
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {aboutHistoryHighlights.map((entry) => (
            <li key={`${entry.year}-${entry.title}`}>
              <article className="card-surface flex h-full flex-col p-6">
                <p className="eyebrow">{entry.year}</p>
                <h3 className="mt-2 text-xl leading-snug">{entry.title}</h3>
                <p className="mt-3 text-sm leading-7 text-fg-secondary">
                  {entry.description}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default HistoryHighlights;
