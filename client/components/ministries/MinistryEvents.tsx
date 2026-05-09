import type { Event } from "@/lib/types";
import Button from "@/components/shared/Button";
import EventGrid from "@/components/shared/EventGrid";

function MinistryEvents({
  events,
  ministryName,
}: Readonly<{
  events: Event[];
  ministryName: string;
}>) {
  return (
    <div className="space-y-5 text-(--color-fg-primary)">
      <h3 className="text-3xl">Related events</h3>
      {events.length > 0 ? (
        <EventGrid events={events} />
      ) : (
        <div className="card-surface flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-(--color-fg-secondary) leading-7">
            No events are linked to {ministryName} yet. Browse the calendar for
            network-wide gatherings you can join today.
          </p>
          <Button href="/events" variant="outline">
            Browse events
          </Button>
        </div>
      )}
    </div>
  );
}

export default MinistryEvents;
