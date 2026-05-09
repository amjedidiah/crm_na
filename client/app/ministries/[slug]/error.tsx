"use client";

import Button from "@/components/shared/Button";
import NavbarSolidBackdropHint from "@/components/layout/NavbarSolidBackdropHint";
import { contactHref } from "@/lib/contact-hrefs";

function MinistrySlugError({
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
            <p className="eyebrow">Ministry page unavailable</p>
            <h1 className="text-5xl">
              We could not load this ministry profile right now.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-fg-secondary">
              Please retry, browse the ministry index, or contact CRM NA for
              help finding the right team.
            </p>
            {error.digest ? (
              <p className="text-sm text-fg-secondary">Reference: {error.digest}</p>
            ) : null}
            <div className="flex flex-wrap gap-4 pt-2">
              <Button type="button" onClick={reset}>
                Try again
              </Button>
              <Button href="/ministries" variant="outline">
                All ministries
              </Button>
              <Button href={contactHref("ministries")} variant="outline">
                Contact us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MinistrySlugError;
