import { notFound } from "next/navigation";
import EventDetailContent from "@/components/events/EventDetailContent";
import PageHeader from "@/components/shared/PageHeader";
import { getEvent } from "@/lib/wordpress";

export async function generateStaticParams() {
  const { events } = await import("@/lib/mock-data");
  return events.map((event) => ({ slug: event.slug }));
}

async function EventDetailPage({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    notFound();
  }

  return (
    <div className="bg-(--color-bg-canvas) text-(--color-fg-primary)">
      <PageHeader
        eyebrow="Event"
        title={event.title}
        description={event.summary}
      />
      <EventDetailContent event={event} />
    </div>
  );
}

export default EventDetailPage;
