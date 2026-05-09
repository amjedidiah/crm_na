import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import EventLink from "@/components/events/EventLink";
import EventGrid from "@/components/shared/EventGrid";
import SectionHeader from "@/components/shared/SectionHeader";
import { formatDate } from "@/lib/utils";
import { getEvents } from "@/lib/wordpress";

function featuredEventLabel(hasExternalSite: boolean) {
  return hasExternalSite ? "Open gathering site" : "View gathering";
}

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
  const [featuredEvent, ...gridEvents] = displayEvents;

  return (
    <section className="section-padding">
      <div className="container-shell space-y-8">
        <SectionHeader
          eyebrow="Events"
          title="Upcoming gatherings across the network"
          description="Conferences, youth nights, leader roundtables, and regional services are shared across CRM NA churches. Save the dates and worship with another branch when you travel."
        />
        {featuredEvent ? (
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <article className="border border-(--color-border-subtle) bg-(--color-bg-surface-subtle) text-(--color-fg-primary) flex h-full flex-col justify-between rounded-[1.85rem] p-8">
              <div className="space-y-5">
                <div className="flex items-center gap-3 text-(--color-fg-accent-text)">
                  <CalendarDays className="size-5" aria-hidden />
                  <p className="font-display text-[0.68rem] tracking-[0.28em] uppercase">
                    Next gathering
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-4xl md:text-5xl">
                    {featuredEvent.title}
                  </h3>
                  <p className="text-(--color-fg-accent-text) text-base leading-7">
                    {formatDate(featuredEvent.startDate)}
                    {featuredEvent.endDate
                      ? ` to ${formatDate(featuredEvent.endDate)}`
                      : ""}
                  </p>
                </div>
                <p className="max-w-2xl text-base leading-8 text-(--color-fg-secondary) md:text-lg">
                  {featuredEvent.summary}
                </p>
                <div className="flex items-center gap-3 text-sm text-(--color-fg-secondary)">
                  <MapPin className="size-4 shrink-0" aria-hidden />
                  <span>{featuredEvent.location}</span>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <EventLink
                  event={featuredEvent}
                  className="font-display inline-flex items-center gap-2 bg-(--color-bg-accent-strong) px-5 py-3 text-xs tracking-[0.2em] uppercase text-(--color-fg-on-accent)"
                >
                  {featuredEventLabel(featuredEvent.mode === "slug-redirect")}
                  <ArrowRight className="size-4" aria-hidden />
                </EventLink>
                {featuredEvent.livestreamUrl ? (
                  <a
                    href={featuredEvent.livestreamUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-display inline-flex items-center gap-2 border border-(--color-border-subtle) px-5 py-3 text-xs tracking-[0.2em] uppercase text-(--color-fg-primary)"
                  >
                    Join online
                    <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                ) : null}
              </div>
            </article>
            {gridEvents.length ? <EventGrid events={gridEvents} /> : null}
          </div>
        ) : (
          <div className="card-surface space-y-4 p-8">
            <p className="eyebrow">Events</p>
            <h3 className="text-3xl">Upcoming CRM NA gatherings will appear here.</h3>
            <p className="max-w-3xl text-lg leading-8 text-(--color-fg-secondary)">
              The network calendar remains the stable place to watch for branch
              gatherings, conferences, and online moments as fresh events are
              published.
            </p>
          </div>
        )}
        <div className="flex flex-wrap items-center gap-5">
          <Link
            href="/events"
            className="font-display inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-(--color-fg-accent-text)"
          >
            View all events
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link
            href="/churches"
            className="font-display inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-(--color-fg-secondary)"
          >
            Find a weekly church rhythm
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default EventsArea;
