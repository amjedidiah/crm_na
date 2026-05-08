import ContactForm from "@/components/contact/ContactForm";
import ChurchInfoSidebar from "@/components/contact/ChurchInfoSidebar";

function ContactFormSection({
  initialPurpose,
}: Readonly<{ initialPurpose?: string }>) {
  return (
    <section className="section-padding text-(--color-fg-primary)">
      <div className="container-shell grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <ContactForm initialPurpose={initialPurpose} />
        <ChurchInfoSidebar />
      </div>
    </section>
  );
}

export default ContactFormSection;
