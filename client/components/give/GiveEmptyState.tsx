import Button from "@/components/shared/Button";
import NavbarSolidBackdropHint from "@/components/layout/NavbarSolidBackdropHint";
import { contactHref } from "@/lib/contact-hrefs";

function GiveEmptyState() {
  return (
    <>
      <NavbarSolidBackdropHint />
      <div className="bg-(--surface-page) text-(--text-primary)">
        <section className="section-padding">
          <div className="container-shell">
            <div className="card-surface max-w-2xl space-y-5 p-8 md:p-12">
              <p className="eyebrow text-(--text-brand)">Give</p>
              <h1 className="text-4xl font-display leading-tight md:text-5xl">Giving information is unavailable</h1>
              <p className="text-lg leading-8 text-(--text-secondary)">
                We could not load giving methods or supporting content. Please contact CRM North America — we will help you give or answer stewardship questions.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Button href={contactHref("general")}>Contact CRM NA</Button>
                <Button href="/" variant="outline">
                  Return home
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default GiveEmptyState;
