import Link from "next/link";

const links = [
  { href: "/who-we-are", label: "Who We Are" },
  { href: "/our-pastors", label: "Our Pastors" },
  { href: "/churches", label: "Churches" },
  { href: "/give", label: "Give" },
];

function Footer() {
  return (
    <footer className="dark-strip mt-20 py-12">
      <div className="container-shell space-y-5">
        <p className="eyebrow">CRM North America</p>
        <div className="flex flex-wrap gap-4 text-sm text-(--color-fg-inverse-soft)">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
        <p className="text-sm text-(--color-fg-inverse-muted)">
          CRM NA rebuild scaffold using Next.js and WordPress.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
