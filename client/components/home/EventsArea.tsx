import Link from "next/link";
import EventGrid from "@/components/shared/EventGrid";
import SectionHeader from "@/components/shared/SectionHeader";
import { getEvents } from "@/lib/wordpress";

async function EventsArea() {
  const events = await getEvents();

  return (
    <section className="section-padding">
      <div className="container-shell space-y-8">
        <SectionHeader
          eyebrow="Events"
          title="Upcoming gatherings across CRM NA"
          description="This scaffold uses typed mock data now and is designed to switch to WordPress-backed event records later."
        />
        <EventGrid events={events} />
        <Link
          href="/events"
          className="font-display inline-block text-xs tracking-[0.2em] uppercase text-(--gold)"
        >
          View all events
        </Link>
      </div>
    </section>
  );
}

export default EventsArea;
