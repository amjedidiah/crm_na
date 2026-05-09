import type { ReactNode } from "react";

/** Mirrors `PageHeader` shell — use on inner routes (not the home `HeroSection`). */
function PageHeaderSkeleton({
  children,
  descriptionLineCount = 2,
  leading,
}: Readonly<{
  children?: ReactNode;
  /** Rough placeholder lines under the title */
  descriptionLineCount?: 2 | 3;
  /** Optional row above eyebrow (e.g. back-to-list link). */
  leading?: ReactNode;
}>) {
  return (
    <section className="hero-panel relative -mt-[calc(var(--nav-height)+var(--site-banner-height))] pt-[calc(var(--nav-height)+var(--site-banner-height)+2rem)] pb-20 md:pt-[calc(var(--nav-height)+var(--site-banner-height)+2.75rem)] md:pb-24">
      <div className="container-shell space-y-5 py-10">
        {leading ? <div>{leading}</div> : null}
        <div className="h-4 w-28 animate-pulse rounded bg-shimmer-emphasis" />
        <div className="h-[clamp(3rem,8vw,4.25rem)] max-w-4xl animate-pulse rounded-lg bg-shimmer-emphasis-muted md:h-[clamp(3.5rem,9vw,5rem)]" />
        <div className="space-y-2">
          <div className="h-5 max-w-3xl animate-pulse rounded bg-shimmer-emphasis-muted" />
          <div className="h-5 max-w-3xl animate-pulse rounded bg-shimmer-emphasis-muted" />
          {descriptionLineCount === 3 ? (
            <div className="h-5 max-w-2xl animate-pulse rounded bg-shimmer-emphasis-muted" />
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}

export default PageHeaderSkeleton;
