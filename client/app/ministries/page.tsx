import type { Metadata } from "next";
import MinistryCallToAction from "@/components/ministries/MinistryCallToAction";
import MinistryGrid from "@/components/ministries/MinistryGrid";
import Button from "@/components/shared/Button";
import PageHeader from "@/components/shared/PageHeader";
import { contactHref } from "@/lib/contact-hrefs";
import { getLeaders, getMinistries } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Ministries",
  description:
    "Explore CRM North America ministry lanes—discipleship, youth, men, women, and more—and find your place to serve.",
  openGraph: {
    title: "Ministries",
    description:
      "Explore CRM North America ministry lanes and find your place to serve.",
  },
};

async function MinistriesPage() {
  const ministries = await getMinistries();
  const leaders = await getLeaders();

  if (ministries.length === 0) {
    return (
      <div className="bg-page-canvas text-fg-primary">
        <PageHeader
          eyebrow="Ministries"
          title="Ministries"
          description="Discover the ministry lanes helping CRM North America serve families, raise disciples, and strengthen fellowship across the network."
        />
        <section className="section-padding">
          <div className="container-shell">
            <div className="card-surface mx-auto max-w-2xl space-y-6 p-10 text-center">
              <p className="eyebrow">Directory updating</p>
              <p className="text-(--color-fg-secondary) leading-8">
                Ministry profiles are temporarily unavailable. Reach out through
                the contact page and we will connect you with the right team.
              </p>
              <Button href={contactHref("ministries")}>Contact the ministry team</Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="overflow-x-clip bg-page-canvas text-fg-primary">
      <PageHeader
        eyebrow="Ministries"
        title="Serve across every lane"
        description="Discover the ministry lanes helping CRM North America serve families, raise disciples, and strengthen fellowship across the network."
      />
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-6 h-56 bg-gradient-page-warm-top-glow"
        />
        <section className="section-padding">
          <div className="container-shell">
            <MinistryGrid ministries={ministries} leaders={leaders} />
          </div>
        </section>
      </div>
      <section className="border-t border-(--color-border-subtle) bg-surface-subtle section-padding">
        <div className="container-shell">
          <MinistryCallToAction />
        </div>
      </section>
    </div>
  );
}

export default MinistriesPage;
