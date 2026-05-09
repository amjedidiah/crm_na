"use client";

import Button from "@/components/shared/Button";
import NavbarSolidBackdropHint from "@/components/layout/NavbarSolidBackdropHint";
import { contactHref } from "@/lib/contact-hrefs";

function EventSlugError({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  return (
    <>
      <NavbarSolidBackdropHint />
      <section className="section-padding">
        <div className="container-shell">
          <div className="card-surface space-y-5 p-8 md:p-12">
            <p className="eyebrow">Event unavailable</p>
            <h1 className="text-5xl">
              We could not load this event right now.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-fg-secondary">
              Please retry, browse all events, or contact CRM NA if you need help.
            </p>
            {error.digest ? (
              <p className="text-sm text-fg-secondary">Reference: {error.digest}</p>
            ) : null}
            <div className="flex flex-wrap gap-4 pt-2">
              <Button type="button" onClick={reset}>
                Try again
              </Button>
              <Button href="/events" variant="outline">
                All events
              </Button>
              <Button href={contactHref("events")} variant="outline">
                Contact us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default EventSlugError;
