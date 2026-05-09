"use client";

import Button from "@/components/shared/Button";
import NavbarSolidBackdropHint from "@/components/layout/NavbarSolidBackdropHint";
import { contactHref } from "@/lib/contact-hrefs";

function GalleryAlbumError({
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
            <p className="eyebrow">Album unavailable</p>
            <h1 className="text-5xl">We could not load this gallery album.</h1>
            <p className="max-w-3xl text-lg leading-8 text-fg-secondary">
              Please retry, return to the gallery, or contact CRM NA if you need
              help finding these photos.
            </p>
            {error.digest ? (
              <p className="text-sm text-fg-secondary">
                Reference: {error.digest}
              </p>
            ) : null}
            <div className="flex flex-wrap gap-4 pt-2">
              <Button type="button" onClick={reset}>
                Try again
              </Button>
              <Button href="/gallery" variant="outline">
                All albums
              </Button>
              <Button href={contactHref("general")} variant="outline">
                Contact us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default GalleryAlbumError;
