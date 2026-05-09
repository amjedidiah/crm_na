import type { ReactNode } from "react";

interface GiveHeroProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly children?: ReactNode;
}

function GiveHero({
  eyebrow,
  title,
  description,
  children,
}: Readonly<GiveHeroProps>) {
  return (
    <section className="hero-panel relative -mt-[calc(var(--nav-height)+var(--site-banner-height))] overflow-hidden pt-[calc(var(--nav-height)+var(--site-banner-height)+2rem)] pb-20 md:pt-[calc(var(--nav-height)+var(--site-banner-height)+2.75rem)] md:pb-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-32 -top-32 h-112 w-md rounded-full blur-3xl"
          style={{ background: "var(--gradient-give-brand-orb)" }}
        />
        <div
          className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full blur-2xl"
          style={{ background: "var(--gradient-give-depth-orb)" }}
        />
        <div
          className="absolute bottom-0 left-0 h-px w-full"
          style={{ backgroundImage: "var(--gradient-give-divider)" }}
        />
      </div>

      <div className="container-shell relative z-1 space-y-5 py-10">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="max-w-4xl text-5xl leading-none md:text-7xl">{title}</h1>
        <p className="max-w-3xl text-lg leading-8 text-fg-inverse-soft md:text-xl">
          {description}
        </p>
        {children}
      </div>
    </section>
  );
}

export default GiveHero;
