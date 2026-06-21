import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import EventDetailContent from "@/components/events/EventDetailContent";
import BackToListingLink from "@/components/shared/BackToListingLink";
import PageHeader from "@/components/shared/PageHeader";
import {
  assertSlugRedirectHasExternalUrl,
  getStaticEventParamSlugs,
  isInternalEventPage,
} from "@/lib/event-utils";
import { isStaticParamsPlaceholder, staticParamsWithPlaceholder } from "@/lib/static-params-utils";
import { getEvent, getEvents } from "@/lib/wordpress";

export async function generateStaticParams() {
  const events = await getEvents();
  return staticParamsWithPlaceholder(getStaticEventParamSlugs(events));
}

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>): Promise<Metadata> {
  const { slug } = await params;
  if (isStaticParamsPlaceholder(slug)) notFound();
  const event = await getEvent(slug);

  if (!event) {
    return { title: "Event" };
  }

  return {
    title: event.title,
    description: event.summary,
  };
}

async function EventDetailPage({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;
  if (isStaticParamsPlaceholder(slug)) notFound();
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
    <div className="overflow-x-clip bg-page-canvas text-(--text-primary)">
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
