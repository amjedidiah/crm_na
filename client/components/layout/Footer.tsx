import Link from "next/link";
import { ArrowUpRight, Camera, Mail, Phone } from "lucide-react";
import SiteLogo from "@/components/brand/SiteLogo";
import { contactHref } from "@/lib/contact-hrefs";
import { SITE_CONTACT, SITE_NAME, SOCIAL_LINKS } from "@/lib/mock-data";

const primaryLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/churches", label: "Churches" },
  { href: "/ministries", label: "Ministries" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
];

const secondaryLinks = [
  { href: "/about#leadership", label: "Leadership" },
  { href: "/devotionals", label: "Devotionals" },
  { href: "/give", label: "Give" },
  { href: contactHref("general"), label: "Contact" },
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
              Revival churches, pastoral care, gatherings, and devotional
              pathways for believers across North America.
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
              <Link href="/gallery" className="inline-flex items-center gap-3">
                <Camera className="size-4" aria-hidden />
                <span>View gallery</span>
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
        <div className="border-t border-(--color-fg-inverse-muted) pt-5 text-center text-sm text-(--color-fg-inverse-muted)">
          <p>
            © {new Date().getFullYear()} Charismatic Renewal Ministries North
            America. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
