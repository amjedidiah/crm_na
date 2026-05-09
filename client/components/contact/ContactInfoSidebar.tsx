import { SITE_CONTACT } from "@/lib/mock-data";

function telHref(phone: string) {
  const digits = phone.replaceAll(/[^\d+]/g, "");
  return `tel:${digits}`;
}

function ContactInfoSidebar() {
  const { email, phone, addressLabel, note } = SITE_CONTACT;

  return (
    <aside className="card-surface space-y-6 p-6">
      <div>
        <p className="eyebrow">Reach CRM NA</p>
        <h2 className="mt-2 font-display text-3xl leading-tight">
          We want to hear from you
        </h2>
        <p className="mt-3 text-sm leading-7 text-(--color-fg-secondary)">
          Whether you are new to CRM North America or have walked with us for
          years, this national channel is here for prayer, first visits, church
          connections, ministry questions, and event information.
        </p>
      </div>

      <div className="space-y-4 border-t border-(--color-border-subtle) pt-5">
        <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-(--color-fg-secondary)">
          National office
        </h3>
        <ul className="space-y-3 text-sm leading-7 text-(--color-fg-secondary)">
          {email ? (
            <li>
              <span className="block text-xs uppercase tracking-wide text-(--color-fg-muted)">
                Email
              </span>
              <a
                className="text-(--color-fg-primary) underline decoration-(--color-border-subtle) underline-offset-4 hover:decoration-(--color-fg-primary)"
                href={`mailto:${email}`}
              >
                {email}
              </a>
            </li>
          ) : null}
          {phone ? (
            <li>
              <span className="block text-xs uppercase tracking-wide text-(--color-fg-muted)">
                Phone
              </span>
              <a
                className="text-(--color-fg-primary) underline decoration-(--color-border-subtle) underline-offset-4 hover:decoration-(--color-fg-primary)"
                href={telHref(phone)}
              >
                {phone}
              </a>
            </li>
          ) : null}
          {addressLabel ? (
            <li>
              <span className="block text-xs uppercase tracking-wide text-(--color-fg-muted)">
                Coverage
              </span>
              <span className="text-(--color-fg-primary)">{addressLabel}</span>
            </li>
          ) : null}
        </ul>
      </div>

      <div className="space-y-3 border-t border-(--color-border-subtle) pt-5 text-sm leading-7 text-(--color-fg-secondary)">
        <p>
          <strong className="font-medium text-(--color-fg-primary)">
            Prayer
          </strong>{" "}
          — Share requests with enough detail for our team to stand with you in
          faith.
        </p>
        <p>
          <strong className="font-medium text-(--color-fg-primary)">
            Visits
          </strong>{" "}
          — Ask about worship times, directions, and what to expect on a first
          Sunday.
        </p>
        <p>
          <strong className="font-medium text-(--color-fg-primary)">
            Churches &amp; ministries
          </strong>{" "}
          — We can help you find a local expression or the right ministry
          contact.
        </p>
        <p>
          <strong className="font-medium text-(--color-fg-primary)">
            Events
          </strong>{" "}
          — Inquire about regional gatherings, conventions, and registration.
        </p>
        {note ? (
          <p className="text-xs text-(--color-fg-muted)">{note}</p>
        ) : null}
      </div>
    </aside>
  );
}

export default ContactInfoSidebar;
