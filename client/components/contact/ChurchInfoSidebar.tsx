import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/mock-data";

function ChurchInfoSidebar() {
  return (
    <aside className="card-surface space-y-5 p-6">
      <div>
        <p className="eyebrow">Contact</p>
        <h2 className="mt-2 text-3xl">National contact channel</h2>
      </div>
      <div className="space-y-2 text-(--color-fg-secondary)">
        <p>{CONTACT_EMAIL}</p>
        <p>{CONTACT_PHONE}</p>
      </div>
      <p className="text-sm leading-7 text-(--color-fg-secondary)">
        The legacy contact page contained placeholder content. This scaffold
        replaces it with a clean national contact shell.
      </p>
    </aside>
  );
}

export default ChurchInfoSidebar;
