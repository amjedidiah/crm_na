import type { Metadata } from "next";
import ContactFormSection from "@/components/contact/ContactFormSection";
import PageHeader from "@/components/shared/PageHeader";
import { resolveContactPageQuery } from "@/lib/contact-query";
import { SITE_NAME } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Contact",
  description: `Reach ${SITE_NAME} for prayer, first visits, church connections, ministry questions, and events. Send a message through our national contact channel.`,
  alternates: {
    canonical: "/contact",
  },
};

async function ContactPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<{
    purpose?: string;
    churchSlug?: string;
    ministrySlug?: string;
    eventSlug?: string;
    church?: string;
    ministry?: string;
    event?: string;
  }>;
}>) {
  const raw = await searchParams;
  const query = resolveContactPageQuery(raw);

  return (
    <div className="bg-(--surface-page) text-(--text-primary)">
      <PageHeader
        eyebrow="Contact"
        title="We would love to connect with you"
        description="CRM North America is one revival family across nations. Share a prayer request, plan a visit, ask about a church or ministry, or reach us about an event — we read every message."
      />
      <ContactFormSection query={query} />
    </div>
  );
}

export default ContactPage;
