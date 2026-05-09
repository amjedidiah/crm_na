import Button from "@/components/shared/Button";
import { contactHref } from "@/lib/contact-hrefs";

function EventDetailNotFound() {
  return (
    <section className="section-padding">
      <div className="container-shell">
        <div className="card-surface mx-auto max-w-2xl space-y-5 p-8 text-center md:p-12">
          <p className="eyebrow">Not found</p>
          <h1 className="text-4xl md:text-5xl">
            This event page is not available.
          </h1>
          <p className="text-lg leading-8 text-(--text-secondary)">
            The link may be outdated, or the gathering may have moved to a new
            listing. Browse all events or reach out for the right details.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button href="/events">All events</Button>
            <Button href={contactHref("events")} variant="outline">
              Contact us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EventDetailNotFound;
