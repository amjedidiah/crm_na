import ContactFormSection from "@/components/contact/ContactFormSection";
import PageHeader from "@/components/shared/PageHeader";

function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Contact CRM NA"
        description="This route replaces the legacy `/contact-us/` page and removes the placeholder contact content found in the old site."
      />
      <ContactFormSection />
    </>
  );
}

export default ContactPage;
