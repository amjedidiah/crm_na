import type { Event } from "@/lib/types";
import EventCard from "@/components/shared/EventCard";

function EventGrid({ events }: Readonly<{ events: Event[] }>) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.slug} event={event} />
      ))}
    </div>
  );
}

export default EventGrid;
