import type { Event } from "@/lib/types";
import EventGrid from "@/components/shared/EventGrid";
import SectionHeader from "@/components/shared/SectionHeader";

function EventListSection({ events }: Readonly<{ events: Event[] }>) {
  return (
    <section className="section-padding text-(--color-fg-primary)">
      <div className="container-shell space-y-8">
        <SectionHeader
          eyebrow="Events"
          title="CRM NA events"
          description="This archive is scaffolded against mock data and designed to move to WPGraphQL-backed records."
        />
        <EventGrid events={events} />
      </div>
    </section>
  );
}

export default EventListSection;
