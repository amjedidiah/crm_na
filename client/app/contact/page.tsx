import ContactFormSection from "@/components/contact/ContactFormSection";
import PageHeader from "@/components/shared/PageHeader";

async function ContactPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<{ purpose?: string }>;
}>) {
  const { purpose } = await searchParams;

  return (
    <div className="bg-(--color-bg-canvas) text-(--color-fg-primary)">
      <PageHeader
        eyebrow="Contact"
        title="Contact CRM NA"
        description="This route replaces the legacy `/contact-us/` page and removes the placeholder contact content found in the old site."
      />
      <ContactFormSection initialPurpose={purpose} />
    </div>
  );
}

export default ContactPage;
