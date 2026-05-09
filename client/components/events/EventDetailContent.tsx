import Image from "next/image";
import type { Event } from "@/lib/types";
import Button from "@/components/shared/Button";
import GalleryPreview from "@/components/gallery/GalleryPreview";
import { formatDate } from "@/lib/utils";

function EventDetailContent({ event }: Readonly<{ event: Event }>) {
  return (
    <section className="section-padding">
      <div className="container-shell space-y-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-5">
            <div className="space-y-3">
              <p className="eyebrow">{formatDate(event.startDate)}</p>
              <h1 className="text-5xl">{event.title}</h1>
              <p className="text-lg text-(--color-fg-secondary)">
                {event.location}
              </p>
            </div>
            {event.registrationUrl ? (
              <Button href={event.registrationUrl}>
                Register for this event
              </Button>
            ) : null}
          </div>
          {event.imageSrc ? (
            <div className="overflow-hidden rounded-[1.8rem] border border-(--color-border-subtle)">
              <Image
                src={event.imageSrc}
                alt={event.title}
                width={1600}
                height={1200}
                className="aspect-4/3 h-full w-full object-cover"
                unoptimized
              />
            </div>
          ) : null}
        </div>
        <div className="grid gap-4">
          {event.description.map((paragraph) => (
            <p
              key={paragraph}
              className="max-w-4xl text-lg leading-8 text-(--color-fg-secondary)"
            >
              {paragraph}
            </p>
          ))}
        </div>
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
