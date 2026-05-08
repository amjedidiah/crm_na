import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { SITE_CONTACT } from "@/lib/mock-data";

const items = [
  {
    label: "Phone",
    value: SITE_CONTACT.phone,
    href: `tel:${SITE_CONTACT.phone.replaceAll(/[^\d+]/g, "")}`,
    icon: Phone,
    external: true,
  },
  {
    label: "Email",
    value: SITE_CONTACT.email,
    href: `mailto:${SITE_CONTACT.email}`,
    icon: Mail,
    external: true,
  },
  {
    label: "Coverage",
    value: SITE_CONTACT.addressLabel,
    href: "/contact",
    icon: MapPin,
    external: false,
  },
] as const;

function ContactStrip() {
  return (
    <section className="section-padding pt-12">
      <div className="container-shell space-y-8">
        <SectionHeader
          eyebrow="Contact"
          title="Reach CRM North America directly"
          description={SITE_CONTACT.note}
        />
        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-4 md:grid-cols-3">
            {items.map((item) => {
              const Icon = item.icon;
              const className =
                "card-surface group flex h-full flex-col gap-4 p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-(--color-border-accent)";
              const content = (
                <>
                  <div className="bg-(--color-bg-accent-soft) flex size-12 items-center justify-center rounded-2xl">
                    <Icon
                      className="text-(--color-fg-accent-text) size-5"
                      aria-hidden
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="font-display text-(--color-fg-accent-text) text-[0.64rem] tracking-[0.24em] uppercase">
                      {item.label}
                    </p>
                    <p className="text-sm leading-7 text-(--color-fg-primary)">
                      {item.value}
                    </p>
                  </div>
                </>
              );

              if (item.external) {
                return (
                  <a key={item.label} href={item.href} className={className}>
                    {content}
                  </a>
                );
              }

              return (
                <Link key={item.label} href={item.href} className={className}>
                  {content}
                </Link>
              );
            })}
          </div>
          <div className="dark-strip flex flex-col justify-between rounded-[1.75rem] p-8">
            <div className="space-y-4">
              <p className="font-display text-(--color-fg-accent-strong) text-[0.68rem] tracking-[0.28em] uppercase">
                National contact
              </p>
              <h3 className="text-3xl text-(--color-fg-inverse) md:text-4xl">
                {SITE_CONTACT.name}
              </h3>
              <p className="text-(--color-fg-inverse-soft) text-base leading-8">
                Prayer needs, ministry questions, church connections, and first
                visit conversations all route through one clear CRM NA channel.
              </p>
            </div>
            <Link
              href="/contact"
              className="font-display text-(--color-fg-accent-strong) mt-8 inline-flex items-center gap-2 text-xs tracking-[0.24em] uppercase"
            >
              Open contact page
              <Mail className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactStrip;
