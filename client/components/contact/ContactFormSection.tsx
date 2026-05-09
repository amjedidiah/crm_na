import ContactForm from "@/components/contact/ContactForm";
import ContactInfoSidebar from "@/components/contact/ContactInfoSidebar";
import type { ContactPageQueryState } from "@/lib/contact-query";
import {
  buildChurchContactSelectOptions,
  buildEventContactSelectOptions,
  buildMinistryContactSelectOptions,
} from "@/lib/contact-select-options";
import { churches, events, ministries } from "@/lib/mock-data";

function ContactFormSection({
  query,
}: Readonly<{
  query: ContactPageQueryState;
}>) {
  const {
    purpose,
    churchSlug,
    ministrySlug,
    eventSlug,
    churchSlugUnresolved,
    ministrySlugUnresolved,
    eventSlugUnresolved,
  } = query;

  const churchSelectOptions = buildChurchContactSelectOptions(churches);
  const ministrySelectOptions = buildMinistryContactSelectOptions(ministries);
  const eventSelectOptions = buildEventContactSelectOptions(events);

  return (
    <section className="section-padding text-(--text-primary)">
      <div className="container-shell grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <ContactForm
          churchSelectOptions={churchSelectOptions}
          ministrySelectOptions={ministrySelectOptions}
          eventSelectOptions={eventSelectOptions}
          initialPurpose={purpose}
          initialChurchSlug={churchSlug}
          initialMinistrySlug={ministrySlug}
          initialEventSlug={eventSlug}
          initialChurchSlugUnresolved={churchSlugUnresolved}
          initialMinistrySlugUnresolved={ministrySlugUnresolved}
          initialEventSlugUnresolved={eventSlugUnresolved}
        />
        <ContactInfoSidebar />
      </div>
    </section>
  );
}

export default ContactFormSection;
