import ContactFormSection from "@/components/contact/ContactFormSection";
import PageHeader from "@/components/shared/PageHeader";

function ContactPage() {
  return (
    <div className="bg-(--color-bg-canvas) text-(--color-fg-primary)">
      <PageHeader
        eyebrow="Contact"
        title="Contact CRM NA"
        description="This route replaces the legacy `/contact-us/` page and removes the placeholder contact content found in the old site."
      />
      <ContactFormSection />
    </div>
  );
}

export default ContactPage;
