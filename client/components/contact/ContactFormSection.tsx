import ContactForm from "@/components/contact/ContactForm";
import ChurchInfoSidebar from "@/components/contact/ChurchInfoSidebar";

function ContactFormSection() {
  return (
    <section className="section-padding">
      <div className="container-shell grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <ContactForm />
        <ChurchInfoSidebar />
      </div>
    </section>
  );
}

export default ContactFormSection;
