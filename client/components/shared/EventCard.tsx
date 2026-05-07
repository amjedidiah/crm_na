import Link from "next/link";
import type { Event } from "@/lib/types";
import { formatDate } from "@/lib/utils";

function EventCard({ event }: Readonly<{ event: Event }>) {
  return (
    <article className="card-surface flex h-full flex-col justify-between p-6">
      <div className="space-y-3">
        <p className="eyebrow">{formatDate(event.startDate)}</p>
        <h3 className="text-3xl">{event.title}</h3>
        <p className="text-(--muted)">{event.summary}</p>
      </div>
      <div className="mt-6 space-y-3">
        <p className="text-sm text-(--muted)">{event.location}</p>
        <Link
          className="font-display text-xs tracking-[0.2em] uppercase text-(--gold)"
          href={`/events/${event.slug}`}
        >
          View event
        </Link>
      </div>
    </article>
  );
}

export default EventCard;
