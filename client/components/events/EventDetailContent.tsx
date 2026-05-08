import type { Event } from "@/lib/types";
import { formatDate } from "@/lib/utils";

function EventDetailContent({ event }: Readonly<{ event: Event }>) {
  return (
    <section className="section-padding">
      <div className="container-shell space-y-8">
        <div className="space-y-3">
          <p className="eyebrow">{formatDate(event.startDate)}</p>
          <h1 className="text-5xl">{event.title}</h1>
          <p className="text-lg text-(--color-fg-secondary)">
            {event.location}
          </p>
        </div>
        <div className="grid gap-4">
          {event.description.map((paragraph) => (
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

export default EventDetailContent;
