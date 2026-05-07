import type { Event } from "@/lib/types";
import EventGrid from "@/components/shared/EventGrid";

function MinistryEvents({ events }: Readonly<{ events: Event[] }>) {
  if (events.length === 0) {
    return null;
  }

  return (
    <div className="space-y-5">
      <h3 className="text-3xl">Related events</h3>
      <EventGrid events={events} />
    </div>
  );
}

export default MinistryEvents;