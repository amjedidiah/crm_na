import Button from "@/components/shared/Button";

function GiveBanner() {
  return (
    <section className="section-padding">
      <div className="container-shell">
        <div className="dark-strip flex flex-col gap-6 p-8 md:p-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <p className="eyebrow">Give</p>
            <h2 className="text-4xl md:text-5xl">
              Support the work of CRM North America.
            </h2>
          </div>
          <Button href="/give">Open giving page</Button>
        </div>
      </div>
    </section>
  );
}

export default GiveBanner;