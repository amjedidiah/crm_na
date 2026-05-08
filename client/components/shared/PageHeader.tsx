import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: Readonly<PageHeaderProps>) {
  return (
    <section className="hero-panel section-padding">
      <div className="container-shell space-y-5 py-10">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className="max-w-4xl text-5xl leading-none md:text-7xl">{title}</h1>
        {description ? (
          <p className="max-w-3xl text-lg leading-8 text-(--color-fg-inverse-soft) md:text-xl">
            {description}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}

export default PageHeader;
