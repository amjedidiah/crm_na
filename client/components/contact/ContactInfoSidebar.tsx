import { SITE_CONTACT, SOCIAL_LINKS } from "@/lib/mock-data";

function telHref(phone: string) {
  const digits = phone.replaceAll(/[^\d+]/g, "");
  return `tel:${digits}`;
}

function socialLinkCaption(href: string) {
  try {
    const u = new URL(href);
    return `${u.hostname.replace(/^www\./, "")}${u.pathname}${u.search}`;
  } catch {
    return href;
  }
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
        <p className="mt-3 text-sm leading-7 text-(--text-secondary)">
          Whether you are new to CRM North America or have walked with us for
          years, this national channel is here for prayer, first visits, church
          connections, ministry questions, and event information.
        </p>
      </div>

      <div className="space-y-4 border-t border-(--border-default) pt-5">
        <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-(--text-secondary)">
          National office
        </h3>
        <ul className="space-y-3 text-sm leading-7 text-(--text-secondary)">
          {email ? (
            <li>
              <span className="block text-xs uppercase tracking-wide text-fg-muted">
                Email
              </span>
              <a
                className="text-(--text-primary) underline decoration-(--border-default) underline-offset-4 hover:decoration-(--text-primary)"
                href={`mailto:${email}`}
              >
                {email}
              </a>
            </li>
          ) : null}
          {phone ? (
            <li>
              <span className="block text-xs uppercase tracking-wide text-fg-muted">
                Phone
              </span>
              <a
                className="text-(--text-primary) underline decoration-(--border-default) underline-offset-4 hover:decoration-(--text-primary)"
                href={telHref(phone)}
              >
                {phone}
              </a>
            </li>
          ) : null}
          {addressLabel ? (
            <li>
              <span className="block text-xs uppercase tracking-wide text-fg-muted">
                Coverage
              </span>
              <span className="text-(--text-primary)">{addressLabel}</span>
            </li>
          ) : null}
        </ul>
      </div>

      {SOCIAL_LINKS.length > 0 ? (
        <div className="space-y-4 border-t border-(--border-default) pt-5">
          <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-(--text-secondary)">
            Social media
          </h3>
          <ul className="space-y-3 text-sm leading-7 text-(--text-secondary)">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.href}>
                <span className="block text-xs uppercase tracking-wide text-fg-muted">
                  {link.label}
                </span>
                <a
                  className="text-(--text-primary) underline decoration-(--border-default) underline-offset-4 hover:decoration-(--text-primary)"
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {socialLinkCaption(link.href)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="space-y-3 border-t border-(--border-default) pt-5 text-sm leading-7 text-(--text-secondary)">
        <p>
          <strong className="font-medium text-(--text-primary)">
            Prayer
          </strong>{" "}
          — Share requests with enough detail for our team to stand with you in
          faith.
        </p>
        <p>
          <strong className="font-medium text-(--text-primary)">
            Visits
          </strong>{" "}
          — Ask about worship times, directions, and what to expect on a first
          Sunday.
        </p>
        <p>
          <strong className="font-medium text-(--text-primary)">
            Churches &amp; ministries
          </strong>{" "}
          — We can help you find a local expression or the right ministry
          contact.
        </p>
        <p>
          <strong className="font-medium text-(--text-primary)">
            Events
          </strong>{" "}
          — Inquire about regional gatherings, conventions, and registration.
        </p>
        {note ? (
          <p className="text-xs text-fg-muted">{note}</p>
        ) : null}
      </div>
    </aside>
  );
}

export default ContactInfoSidebar;
