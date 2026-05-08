import Link from "next/link";
import EventGrid from "@/components/shared/EventGrid";
import SectionHeader from "@/components/shared/SectionHeader";
import { getEvents } from "@/lib/wordpress";

async function EventsArea({ previewCount }: Readonly<{ previewCount?: number }>) {
  let events = await getEvents();
  events = [...events].sort(
    (first, second) =>
      new Date(first.startDate).getTime() - new Date(second.startDate).getTime(),
  );

  const displayEvents =
    typeof previewCount === "number"
      ? events.slice(0, previewCount)
      : events;

  return (
    <section className="section-padding">
      <div className="container-shell space-y-8">
        <SectionHeader
          eyebrow="Events"
          title="Upcoming gatherings across the network"
          description="Conferences, youth nights, leader roundtables, and regional services are shared across CRM NA churches. Save the dates and worship with another branch when you travel."
        />
        <EventGrid events={displayEvents} />
        <Link
          href="/events"
          className="font-display inline-block text-xs tracking-[0.2em] uppercase text-(--color-fg-accent-text)"
        >
          View all events
        </Link>
      </div>
    </section>
  );
}

export default EventsArea;
