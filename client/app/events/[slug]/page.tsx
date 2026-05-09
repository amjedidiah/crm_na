import { notFound, permanentRedirect } from "next/navigation";
import EventDetailContent from "@/components/events/EventDetailContent";
import BackToListingLink from "@/components/shared/BackToListingLink";
import PageHeader from "@/components/shared/PageHeader";
import {
  assertSlugRedirectHasExternalUrl,
  getStaticEventParamSlugs,
  isInternalEventPage,
} from "@/lib/event-utils";
import { getEvent } from "@/lib/wordpress";

export async function generateStaticParams() {
  const { events } = await import("@/lib/mock-data");
  return getStaticEventParamSlugs(events);
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

  if (event.mode === "slug-redirect") {
    assertSlugRedirectHasExternalUrl(event);
    permanentRedirect(event.externalUrl);
  }

  if (!isInternalEventPage(event)) {
    notFound();
  }

  return (
    <div className="bg-(--color-bg-canvas) text-(--color-fg-primary)">
      <PageHeader
        leading={<BackToListingLink href="/events">Events</BackToListingLink>}
        eyebrow="Event"
        title={event.title}
        description={event.summary}
      />
      <EventDetailContent event={event} />
    </div>
  );
}

export default EventDetailPage;
