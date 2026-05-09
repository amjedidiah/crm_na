import Button from "@/components/shared/Button";
import { contactHref } from "@/lib/contact-hrefs";

function GalleryAlbumNotFound() {
  return (
    <section className="section-padding">
      <div className="container-shell">
        <div className="card-surface mx-auto max-w-2xl space-y-5 p-8 text-center md:p-12">
          <p className="eyebrow">Not found</p>
          <h1 className="text-4xl md:text-5xl">
            This gallery album is not available.
          </h1>
          <p className="text-lg leading-8 text-(--text-secondary)">
            The link may be outdated, or the album may have been removed. Browse
            all albums or reach out if you are looking for specific photos.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button href="/gallery">All albums</Button>
            <Button href={contactHref("general")} variant="outline">
              Contact us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GalleryAlbumNotFound;
