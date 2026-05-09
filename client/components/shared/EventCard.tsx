import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Event } from "@/lib/types";
import EventLink from "@/components/events/EventLink";
import { contactHrefForEvent } from "@/lib/contact-hrefs";
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
          <p className="font-display text-sm tracking-wide text-(--text-primary)">
            {formatEventDateRange(event.startDate, event.endDate)}
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-3xl leading-tight">{event.title}</h3>
          <p className="border-l-2 border-(--border-brand-soft) pl-4 text-base leading-7 text-(--text-secondary)">
            {event.summary}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-(--border-default) pt-6">
        {location ? (
          <div className="flex gap-3">
            <MapPin
              className="mt-0.5 size-4 shrink-0 text-(--text-brand)"
              aria-hidden
            />
            <div className="min-w-0 space-y-1">
              <p className="font-display text-[0.65rem] tracking-[0.2em] text-(--text-secondary) uppercase">
                Where
              </p>
              <p className="text-sm leading-snug text-(--text-primary)">
                {location}
              </p>
            </div>
          </div>
        ) : null}
        <EventLink
          event={event}
          className="font-display inline-flex text-xs tracking-[0.2em] uppercase text-(--text-brand)"
        >
          {eventListingLabel(event)}
        </EventLink>
        <Link
          href={contactHrefForEvent(event.slug)}
          className="font-display inline-flex text-xs tracking-[0.2em] uppercase text-(--text-secondary) underline decoration-(--border-default) underline-offset-4 hover:text-(--text-primary)"
        >
          Contact about this event
        </Link>
      </div>
    </article>
  );
}

export default EventCard;
