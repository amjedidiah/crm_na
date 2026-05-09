import { MapPin } from "lucide-react";
import type { Event } from "@/lib/types";
import EventLink from "@/components/events/EventLink";
import { formatEventDateRange } from "@/lib/utils";

function eventListingLabel(event: Event): string {
  return event.mode === "slug-redirect" ? "Open event site" : "View event";
}

function EventCard({ event }: Readonly<{ event: Event }>) {
  const location = event.location.trim();

  return (
    <article className="card-surface flex h-full min-h-0 flex-col p-6">
      <div className="min-h-0 flex-1 space-y-4">
        <div className="space-y-2">
          <p className="eyebrow">When</p>
          <p className="font-display text-sm tracking-wide text-(--color-fg-primary)">
            {formatEventDateRange(event.startDate, event.endDate)}
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-3xl leading-tight">{event.title}</h3>
          <p className="border-l-2 border-(--color-border-accent-soft) pl-4 text-base leading-7 text-(--color-fg-secondary)">
            {event.summary}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4 border-t border-(--color-border-subtle) pt-6">
        {location ? (
          <div className="flex gap-3">
            <MapPin
              className="mt-0.5 size-4 shrink-0 text-(--color-fg-accent)"
              aria-hidden
            />
            <div className="min-w-0 space-y-1">
              <p className="font-display text-[0.65rem] tracking-[0.2em] text-(--color-fg-secondary) uppercase">
                Where
              </p>
              <p className="text-sm leading-snug text-(--color-fg-primary)">
                {location}
              </p>
            </div>
          </div>
        ) : null}
        <EventLink
          event={event}
          className="font-display inline-flex text-xs tracking-[0.2em] uppercase text-(--color-fg-accent)"
        >
          {eventListingLabel(event)}
        </EventLink>
      </div>
    </article>
  );
}

export default EventCard;
