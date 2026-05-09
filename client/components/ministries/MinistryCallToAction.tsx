import Button from "@/components/shared/Button";

export type MinistryCallToActionContext = Readonly<{
  name: string;
  slug: string;
}>;

function contactHrefForMinistry(slug: string): string {
  const params = new URLSearchParams({
    purpose: "ministries",
    ministrySlug: slug,
  });
  return `/contact?${params.toString()}`;
}

function MinistryCallToAction({
  ministryContext,
}: Readonly<{
  ministryContext?: MinistryCallToActionContext;
}>) {
  if (ministryContext) {
    return (
      <div className="card-surface flex flex-col gap-5 p-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <p className="eyebrow">About {ministryContext.name}</p>
          <h2 className="text-3xl">
            Serve with the {ministryContext.name} team
          </h2>
          <p className="max-w-2xl text-lg leading-8 text-(--color-fg-secondary)">
            Ask how to visit a rhythm, meet leaders, or volunteer. Our ministry
            office routes every note to the right steward.
          </p>
        </div>
        <Button href={contactHrefForMinistry(ministryContext.slug)}>
          Contact the ministry team
        </Button>
      </div>
    );
  }

  return (
    <div className="card-surface flex flex-col gap-5 p-6 md:flex-row md:items-end md:justify-between">
      <div className="space-y-3">
        <p className="eyebrow">Join a ministry</p>
        <h2 className="text-3xl">Bring your gifts into active service.</h2>
        <p className="max-w-2xl text-lg leading-8 text-(--color-fg-secondary)">
          From youth discipleship to men&apos;s and women&apos;s fellowship, CRM
          NA ministries grow stronger when believers step forward to serve.
        </p>
      </div>
      <Button href="/contact?purpose=ministries">Contact the ministry team</Button>
    </div>
  );
}

export default MinistryCallToAction;
