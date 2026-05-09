import Button from "@/components/shared/Button";

function AboutNextSteps() {
  return (
    <section className="bg-emphasis-strong section-padding text-fg-inverse">
      <div className="container-shell text-center">
        <p className="eyebrow text-fg-accent-strong">Take a next step</p>
        <h2 className="heading-fluid-section mx-auto mt-3 max-w-3xl">
          Visit a church, reach out, or keep learning with us.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-fg-inverse-muted">
          However you connect—locally, personally, or through teaching—we would
          love to walk with you in this revival family.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap">
          <Button href="/churches">Find a church</Button>
          <Button
            href="/contact"
            variant="outline"
            className="border-fg-inverse-soft text-fg-inverse hover-accent-strong"
          >
            Contact CRM NA
          </Button>
          <Button
            href="/devotionals"
            variant="outline"
            className="border-fg-inverse-soft text-fg-inverse hover-accent-strong"
          >
            Read devotionals
          </Button>
        </div>
      </div>
    </section>
  );
}

export default AboutNextSteps;
