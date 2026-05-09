import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import type { Event } from "@/lib/types";
import Button from "@/components/shared/Button";
import GalleryPreview from "@/components/gallery/GalleryPreview";
import MapEmbed from "@/components/shared/MapEmbed";
import SectionHeader from "@/components/shared/SectionHeader";
import { contactHrefForEvent } from "@/lib/contact-hrefs";
import { formatEventDateRange } from "@/lib/utils";

function EventDetailContent({ event }: Readonly<{ event: Event }>) {
  const location = event.location.trim();
  const showMap = location.length > 0;

  return (
    <section className="section-padding">
      <div className="container-shell space-y-14">
        <div className="space-y-8">
          <SectionHeader
            eyebrow="Overview"
            title="What to expect"
            description="Practical details for planning your visit and joining the room."
          />
          <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">
            {event.imageSrc ? (
              <div className="overflow-hidden rounded-[1.8rem] border border-(--border-default)">
                <Image
                  src={event.imageSrc}
                  alt={event.title}
                  width={1600}
                  height={1200}
                  className="aspect-4/3 h-full w-full object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <div
                className="flex aspect-4/3 flex-col items-center justify-center gap-4 rounded-[1.8rem] border border-(--border-default) bg-surface-subtle px-8 text-center"
                aria-label="Event visual placeholder"
              >
                <CalendarDays
                  className="size-16 text-(--text-brand)"
                  aria-hidden
                />
                <p className="text-sm text-(--text-secondary)">
                  Event imagery coming soon
                </p>
              </div>
            )}
            <div className="space-y-4">
              {event.description.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-lg leading-8 text-(--text-secondary)"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`grid gap-6 ${location ? "md:grid-cols-2" : "max-w-xl"}`}
        >
          <div className="card-surface space-y-4 p-6">
            <h2 className="text-2xl">When</h2>
            <p className="text-lg text-(--text-secondary)">
              {formatEventDateRange(event.startDate, event.endDate)}
            </p>
          </div>
          {location ? (
            <div className="card-surface space-y-4 p-6">
              <h2 className="text-2xl">Where</h2>
              <p className="flex gap-3 text-lg text-(--text-secondary)">
                <MapPin
                  className="mt-1 size-5 shrink-0 text-(--text-brand)"
                  aria-hidden
                />
                <span>{location}</span>
              </p>
            </div>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-4">
          {event.registrationUrl ? (
            <Button href={event.registrationUrl}>Register for this event</Button>
          ) : null}
          {event.livestreamUrl ? (
            <Button href={event.livestreamUrl} variant="outline">
              Join livestream
            </Button>
          ) : null}
          <Button href={contactHrefForEvent(event.slug)} variant="outline">
            Contact us about this event
          </Button>
        </div>

        {showMap ? (
          <div className="space-y-4">
            <h2 className="text-3xl">Map</h2>
            <MapEmbed query={location} />
          </div>
        ) : null}

        {event.galleryImages?.length ? (
          <div className="card-surface p-6">
            <GalleryPreview
              images={event.galleryImages}
              href={`/gallery/${event.slug}`}
              title="Photos from this event"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default EventDetailContent;
