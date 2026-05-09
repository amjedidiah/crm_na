import type { Event } from "@/lib/types";
import EventLink from "@/components/events/EventLink";
import { formatDate } from "@/lib/utils";

function EventCard({ event }: Readonly<{ event: Event }>) {
  return (
    <article className="card-surface flex h-full flex-col justify-between p-6">
      <div className="space-y-3">
        <p className="eyebrow">{formatDate(event.startDate)}</p>
        <h3 className="text-3xl">{event.title}</h3>
        <p className="text-(--color-fg-secondary)">{event.summary}</p>
      </div>
      <div className="mt-6 space-y-3">
        <p className="text-sm text-(--color-fg-secondary)">{event.location}</p>
        <EventLink
          event={event}
          className="font-display text-xs tracking-[0.2em] uppercase text-(--color-fg-accent)"
        >
          {event.registrationUrl ? "Register for event" : "View event"}
        </EventLink>
      </div>
    </article>
  );
}

export default EventCard;
