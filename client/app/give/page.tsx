import Button from "@/components/shared/Button";
import PageHeader from "@/components/shared/PageHeader";
import { GIVING_URL } from "@/lib/mock-data";

function GivePage() {
  return (
    <>
      <PageHeader
        eyebrow="Give"
        title="Support the work"
        description="The giving route is part of the initial canonical route set and remains separate from the rest of the information architecture."
      />
      <section className="section-padding">
        <div className="container-shell">
          <div className="card-surface space-y-5 p-8">
            <p className="text-lg leading-8 text-(--muted)">
              This is the initial giving-page scaffold. Replace the placeholder
              destination with the final giving workflow when the payment path
              is confirmed.
            </p>
            <Button href={GIVING_URL}>Open legacy giving page</Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default GivePage;
