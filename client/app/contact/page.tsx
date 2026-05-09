import ContactFormSection from "@/components/contact/ContactFormSection";
import PageHeader from "@/components/shared/PageHeader";

async function ContactPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<{
    purpose?: string;
    churchSlug?: string;
    ministrySlug?: string;
  }>;
}>) {
  const { purpose, churchSlug, ministrySlug } = await searchParams;

  return (
    <div className="bg-(--color-bg-canvas) text-(--color-fg-primary)">
      <PageHeader
        eyebrow="Contact"
        title="Contact CRM NA"
        description="Reach CRM North America for prayer, church connections, ministry questions, and first-visit support."
      />
      <ContactFormSection
        initialPurpose={purpose}
        initialChurchSlug={churchSlug}
        initialMinistrySlug={ministrySlug}
      />
    </div>
  );
}

export default ContactPage;
