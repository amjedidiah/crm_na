import { SITE_CONTACT } from "@/lib/mock-data";

function ChurchInfoSidebar() {
  return (
    <aside className="card-surface space-y-5 p-6">
      <div>
        <p className="eyebrow">Contact</p>
        <h2 className="mt-2 text-3xl">National contact channel</h2>
      </div>
      <div className="space-y-2 text-(--color-fg-secondary)">
        <p>{SITE_CONTACT.email}</p>
        <p>{SITE_CONTACT.phone}</p>
        <p>{SITE_CONTACT.addressLabel}</p>
      </div>
      <p className="text-sm leading-7 text-(--color-fg-secondary)">
        Share prayer requests, first-visit questions, ministry inquiries, and
        general CRM NA needs through this national contact channel.
      </p>
    </aside>
  );
}

export default ChurchInfoSidebar;
