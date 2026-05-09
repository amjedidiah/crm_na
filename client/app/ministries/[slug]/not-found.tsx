import Button from "@/components/shared/Button";
import { contactHref } from "@/lib/contact-hrefs";

function MinistrySlugNotFound() {
  return (
    <section className="section-padding">
      <div className="container-shell">
        <div className="card-surface mx-auto max-w-2xl space-y-5 p-8 text-center md:p-12">
          <p className="eyebrow">Not found</p>
          <h1 className="text-4xl md:text-5xl">
            This ministry page is not available.
          </h1>
          <p className="text-lg leading-8 text-(--text-secondary)">
            The ministry may have moved, the link may be outdated, or the profile
            is still being prepared. Browse the directory or reach out for a
            personal introduction.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button href="/ministries">Ministry directory</Button>
            <Button href={contactHref("ministries")} variant="outline">
              Contact ministry team
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MinistrySlugNotFound;
