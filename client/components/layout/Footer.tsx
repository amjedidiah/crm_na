import Link from "next/link";
import { ArrowUpRight, Mail, Phone, Radio } from "lucide-react";
import SiteLogo from "@/components/brand/SiteLogo";
import { SITE_CONTACT, SITE_NAME, SOCIAL_LINKS } from "@/lib/mock-data";

const primaryLinks = [
  { href: "/churches", label: "Churches" },
  { href: "/ministries", label: "Ministries" },
  { href: "/events", label: "Events" },
  { href: "/media", label: "Media" },
];

const secondaryLinks = [
  { href: "/who-we-are", label: "Who We Are" },
  { href: "/who-we-are#leadership", label: "Leadership" },
  { href: "/publications", label: "Devotionals" },
  { href: "/give", label: "Give" },
  { href: "/contact", label: "Contact" },
];

function Footer() {
  return (
    <footer className="dark-strip mt-20 py-14">
      <div className="container-shell space-y-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr_0.9fr_1fr]">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <SiteLogo className="h-10 w-10" />
              <p className="font-display text-(--color-fg-inverse) text-sm tracking-[0.24em] uppercase">
                {SITE_NAME}
              </p>
            </div>
            <p className="max-w-sm text-sm leading-7 text-(--color-fg-inverse-soft)">
              Revival churches, pastoral care, gatherings, and media pathways
              for believers across North America.
            </p>
          </div>

          <div className="space-y-4">
            <p className="eyebrow text-(--color-fg-accent-strong)">Explore</p>
            <div className="grid gap-3 text-sm text-(--color-fg-inverse-soft)">
              {primaryLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="eyebrow text-(--color-fg-accent-strong)">Navigate</p>
            <div className="grid gap-3 text-sm text-(--color-fg-inverse-soft)">
              {secondaryLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="eyebrow text-(--color-fg-accent-strong)">Connect</p>
            <div className="grid gap-3 text-sm text-(--color-fg-inverse-soft)">
              <a
                href={`mailto:${SITE_CONTACT.email}`}
                className="inline-flex items-center gap-3"
              >
                <Mail className="size-4" aria-hidden />
                <span>{SITE_CONTACT.email}</span>
              </a>
              <a
                href={`tel:${SITE_CONTACT.phone.replaceAll(/[^\d+]/g, "")}`}
                className="inline-flex items-center gap-3"
              >
                <Phone className="size-4" aria-hidden />
                <span>{SITE_CONTACT.phone}</span>
              </a>
              <Link
                href="/media#live"
                className="inline-flex items-center gap-3"
              >
                <Radio className="size-4" aria-hidden />
                <span>Watch live</span>
              </Link>
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3"
                >
                  <ArrowUpRight className="size-4" aria-hidden />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
            <p className="text-sm leading-7 text-(--color-fg-inverse-muted)">
              {SITE_CONTACT.addressLabel}
            </p>
          </div>
        </div>
        <div className="border-t border-(--color-fg-inverse-muted) pt-5 text-sm text-(--color-fg-inverse-muted)">
          <p>CRM North America.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
