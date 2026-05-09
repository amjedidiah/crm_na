import Button from "@/components/shared/Button";
import { contactHref } from "@/lib/contact-hrefs";

function ChurchSlugNotFound() {
  return (
    <section className="section-padding">
      <div className="container-shell">
        <div className="card-surface mx-auto max-w-2xl space-y-5 p-8 text-center md:p-12">
          <p className="eyebrow">Not found</p>
          <h1 className="text-4xl md:text-5xl">
            This church page is not available here.
          </h1>
          <p className="text-lg leading-8 text-(--text-secondary)">
            The branch may use another website, be listed without a dedicated page,
            or the link may be outdated. Browse the directory or contact CRM NA for
            help.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button href="/churches">Church directory</Button>
            <Button href={contactHref("churches")} variant="outline">
              Contact us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChurchSlugNotFound;
