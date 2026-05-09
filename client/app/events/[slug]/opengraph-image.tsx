import { notFound } from "next/navigation";
import { buildOgImage } from "@/lib/og";
import { truncateOgSubtitle } from "@/lib/og-truncate";
import { standardOgTheme } from "@/lib/og-theme";
import { isInternalEventPage } from "@/lib/event-utils";
import { getEvent } from "@/lib/wordpress";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const listingFallbackSubtitle =
  "Gatherings, conventions, and regional milestones across CRM NA.";

async function EventOpengraphImage({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    notFound();
  }

  if (!isInternalEventPage(event)) {
    return buildOgImage("Events", listingFallbackSubtitle, standardOgTheme);
  }

  return buildOgImage(
    event.title,
    truncateOgSubtitle(event.summary),
    standardOgTheme,
    { location: event.location },
  );
}

export default EventOpengraphImage;
