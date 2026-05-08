import EventListSection from "@/components/events/EventListSection";
import PageHeader from "@/components/shared/PageHeader";
import { getEvents } from "@/lib/wordpress";

async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="bg-(--color-bg-canvas) text-(--color-fg-primary)">
      <PageHeader
        eyebrow="Events"
        title="CRM NA events"
        description="This custom archive replaces the plugin-heavy public legacy experience."
      />
      <EventListSection events={events} />
    </div>
  );
}

export default EventsPage;
