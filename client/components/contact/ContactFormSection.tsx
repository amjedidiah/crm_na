import ContactForm from "@/components/contact/ContactForm";
import ContactInfoSidebar from "@/components/contact/ContactInfoSidebar";
import type { ContactListings, ContactPageQueryState } from "@/lib/contact-query";
import {
  buildChurchContactSelectOptions,
  buildEventContactSelectOptions,
  buildMinistryContactSelectOptions,
} from "@/lib/contact-select-options";

function ContactFormSection({
  query,
  listings,
}: Readonly<{
  query: ContactPageQueryState;
  listings: ContactListings;
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

  const churchSelectOptions = buildChurchContactSelectOptions(listings.churches);
  const ministrySelectOptions = buildMinistryContactSelectOptions(
    listings.ministries,
  );
  const eventSelectOptions = buildEventContactSelectOptions(listings.events);

  return (
    <section className="section-padding text-(--text-primary)">
      <div className="container-shell grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <ContactForm
          listings={listings}
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
