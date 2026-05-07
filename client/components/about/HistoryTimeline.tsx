import { historyTimeline } from "@/lib/mock-data";

function HistoryTimeline() {
  return (
    <section className="section-padding">
      <div className="container-shell space-y-6">
        {historyTimeline.map((entry) => (
          <article
            key={entry.year}
            className="card-surface grid gap-4 p-8 md:grid-cols-[160px_1fr]"
          >
            <p className="font-display text-sm tracking-[0.2em] uppercase text-(--gold)">
              {entry.year}
            </p>
            <div className="space-y-2">
              <h2 className="text-3xl">{entry.title}</h2>
              <p className="text-lg leading-8 text-(--muted)">
                {entry.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default HistoryTimeline;
