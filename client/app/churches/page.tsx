import type { Metadata } from "next";
import ChurchesDirectoryClient from "@/components/churches/ChurchesDirectoryClient";
import Button from "@/components/shared/Button";
import PageHeader from "@/components/shared/PageHeader";
import { contactHref } from "@/lib/contact-hrefs";
import { getChurches } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Churches",
  description:
    "Locate CRM NA churches across the United States, Canada, and Mexico—service times, pastors, and branch rhythms gathered in one directory.",
  openGraph: {
    title: "Churches",
    description:
      "Locate CRM NA churches across the United States, Canada, and Mexico.",
  },
};

async function ChurchesPage() {
  const churches = await getChurches();

  if (churches.length === 0) {
    return (
      <div className="bg-page-canvas text-fg-primary">
        <PageHeader
          eyebrow="Churches"
          title="Church directory"
          description="We are refreshing branch listings. Contact the national office and we will connect you with a local fellowship."
        />
        <section className="section-padding">
          <div className="container-shell">
            <div className="card-surface mx-auto max-w-2xl space-y-6 p-10 text-center">
              <p className="eyebrow">Directory unavailable</p>
              <p className="text-(--text-secondary) leading-8">
                Church listings are temporarily empty. Use the contact page and
                our team will help you plan a visit or find pastoral coverage.
              </p>
              <Button href={contactHref("churches")}>Contact CRM NA</Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="overflow-x-clip bg-page-canvas text-fg-primary">
      <PageHeader
        eyebrow="Churches"
        title="Find a CRM NA Church Family"
        description="Explore revival-centered churches across North America. Filter by region to find one near you—some listings open here with visit details; others link to the church's own site when that is where they share schedules and news."
      />
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-6 h-56 bg-gradient-page-top-glow"
        />
        <section className="section-padding">
          <div className="container-shell space-y-12">
            <ChurchesDirectoryClient churches={churches} />
          </div>
        </section>
      </div>
      <section className="border-t border-(--border-default) bg-surface-subtle section-padding">
        <div className="container-shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl space-y-2">
            <p className="eyebrow">Next steps</p>
            <h2 className="text-3xl tracking-tight md:text-4xl">
              Plan a visit or explore the wider CRM NA story
            </h2>
            <p className="text-(--text-secondary) leading-8">
              Reach out for pastoral coverage, ask about a specific branch, or
              read how CRM NA disciples families and leaders.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={contactHref("churches")}>Contact</Button>
            <Button href="/about" variant="outline">
              About CRM NA
            </Button>
            <Button href="/who-we-are" variant="outline">
              Who we are
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ChurchesPage;
