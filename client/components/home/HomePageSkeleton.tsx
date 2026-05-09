import { isConventionHeroPromoEnabled } from "@/lib/convention-hero-promo";

/** Loading placeholder for the home route — mirrors section rhythm of `app/page.tsx` / `HeroSection`. */
function HomePageSkeleton() {
  const showConventionPromo = isConventionHeroPromoEnabled();

  return (
    <div className="overflow-x-clip bg-page-canvas text-fg-primary">
      {/* HeroSection — mirrors tabbed convention-first hero when promo is active. */}
      <section className="hero-panel relative -mt-[calc(var(--nav-height)+var(--site-banner-height))] overflow-hidden rounded-b-[clamp(1.25rem,4vw,2.75rem)] pt-[calc(var(--nav-height)+var(--site-banner-height)+2rem)] md:pt-[calc(var(--nav-height)+var(--site-banner-height)+5.5rem)]">
        <div className="container-shell relative mx-auto space-y-10 pb-20 md:pb-24">
          {showConventionPromo ? (
            <div className="h-12 w-[20rem] max-w-full animate-pulse rounded-full bg-shimmer-emphasis-muted" />
          ) : null}
          {showConventionPromo ? (
            <div className="grid min-h-112 gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)] lg:items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="h-4 w-40 animate-pulse rounded bg-shimmer-emphasis-muted" />
                  <div className="h-14 max-w-4xl animate-pulse rounded bg-shimmer-emphasis md:h-[clamp(3.25rem,8vw,4.75rem)]" />
                  <div className="h-5 w-64 animate-pulse rounded bg-shimmer-emphasis-muted" />
                  <div className="h-24 max-w-3xl animate-pulse rounded bg-shimmer-emphasis-muted" />
                </div>
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="h-12 w-44 animate-pulse rounded bg-shimmer-emphasis-muted" />
                  <div className="h-12 w-44 animate-pulse rounded bg-shimmer-emphasis-muted" />
                </div>
              </div>
              <div className="aspect-4/5 w-full animate-pulse rounded-[1.8rem] bg-shimmer-emphasis-muted" />
            </div>
          ) : (
            <div className="min-h-112 space-y-8">
              <div className="space-y-4">
                <div className="h-4 w-36 animate-pulse rounded bg-shimmer-emphasis-muted" />
                <div className="h-14 max-w-4xl animate-pulse rounded bg-shimmer-emphasis md:h-[clamp(3.25rem,8vw,4.75rem)]" />
                <div className="h-6 max-w-2xl animate-pulse rounded bg-shimmer-emphasis-muted" />
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="h-12 w-44 animate-pulse rounded bg-shimmer-emphasis-muted" />
                <div className="h-12 w-44 animate-pulse rounded bg-shimmer-emphasis-muted" />
              </div>
            </div>
          )}
        </div>
        {/* BranchMarquee */}
        <div
          aria-hidden
          className="overflow-hidden border-t border-(--text-on-inverse)/10 py-3"
        >
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-2 px-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`marquee-${i.toString()}`}
                className="h-3 w-28 animate-pulse rounded-full bg-shimmer-emphasis-muted opacity-70 md:w-36"
              />
            ))}
          </div>
        </div>
      </section>

      {/* NetworkPulse */}
      <section className="relative z-10 -mt-18 px-4 md:-mt-24">
        <div className="container-shell">
          <div className="shadow-overlap-panel overflow-hidden rounded-[1.75rem] border border-solid border-subtle bg-canvas-elevated backdrop-blur-xl">
            <div className="grid gap-px bg-shimmer-canvas lg:grid-cols-[1.15fr_0.85fr]">
              <div className="bg-portrait-well px-6 py-10 md:px-8">
                <div className="space-y-4">
                  <div className="h-3 w-28 animate-pulse rounded bg-shimmer-emphasis" />
                  <div className="h-12 max-w-lg animate-pulse rounded bg-shimmer-emphasis-muted" />
                  <div className="h-20 max-w-2xl animate-pulse rounded bg-shimmer-emphasis-muted" />
                </div>
              </div>
              <div className="grid gap-px sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={`pulse-${i.toString()}`}
                    className="min-h-[140px] bg-page-canvas p-6"
                  >
                    <div className="flex justify-between gap-4">
                      <div className="size-12 animate-pulse rounded-2xl bg-shimmer-canvas" />
                      <div className="h-4 w-8 animate-pulse rounded bg-shimmer-canvas" />
                    </div>
                    <div className="mt-6 h-4 w-24 animate-pulse rounded bg-shimmer-canvas" />
                    <div className="mt-2 h-6 w-full max-w-48 animate-pulse rounded bg-shimmer-canvas" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WelcomeSection + warm glow — matches `WelcomeSection` pt + grid */}
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-12 h-72 bg-gradient-page-top-glow"
        />
        <section className="section-padding pt-16 md:pt-24">
          <div className="container-shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="space-y-4">
              <div className="h-4 w-40 animate-pulse rounded bg-shimmer-canvas" />
              <div className="h-16 max-w-xl animate-pulse rounded bg-shimmer-canvas" />
              <div className="h-24 max-w-lg animate-pulse rounded bg-shimmer-canvas" />
            </div>
            <div className="aspect-video animate-pulse rounded-card-xl bg-shimmer-canvas md:min-h-[280px]" />
          </div>
        </section>
      </div>

      {/* FeaturedChurches — matches `FeaturedChurchShowcase` xl:grid-cols-12 layout */}
      <div className="relative bg-surface-subtle">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-3xl -translate-x-1/2 rounded-full bg-gradient-page-depth-glow blur-3xl lg:block"
        />
        <section className="section-padding">
          <div className="container-shell space-y-10">
            <div className="space-y-3">
              <div className="h-4 w-48 animate-pulse rounded bg-shimmer-canvas" />
              <div className="h-12 max-w-2xl animate-pulse rounded bg-shimmer-canvas" />
            </div>
            <div className="grid gap-6 xl:grid-cols-12">
              <div className="min-h-112 animate-pulse rounded-4xl border border-(--border-default) bg-shimmer-emphasis-muted xl:col-span-7" />
              <div className="min-h-96 animate-pulse rounded-4xl bg-shimmer-canvas xl:col-span-5" />
              <div className="min-h-72 animate-pulse rounded-[1.75rem] bg-shimmer-canvas xl:col-span-6" />
              <div className="min-h-72 animate-pulse rounded-[1.75rem] bg-shimmer-canvas xl:col-span-6" />
            </div>
          </div>
        </section>
      </div>

      {/* ServeWithMinistries */}
      <section className="section-padding">
        <div className="container-shell space-y-10">
          <div className="space-y-3">
            <div className="h-4 w-36 animate-pulse rounded bg-shimmer-canvas" />
            <div className="h-12 max-w-xl animate-pulse rounded bg-shimmer-canvas" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={`min-${i.toString()}`}
                className="card-surface h-36 animate-pulse p-6"
              >
                <div className="h-5 w-2/3 rounded bg-shimmer-canvas" />
                <div className="mt-4 h-4 w-full rounded bg-shimmer-canvas" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EventsArea */}
      <div className="bg-gradient-page-highlight-band">
        <section className="section-padding">
          <div className="container-shell space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="space-y-3">
                <div className="h-4 w-24 animate-pulse rounded bg-shimmer-canvas" />
                <div className="h-12 w-64 max-w-full animate-pulse rounded bg-shimmer-canvas" />
              </div>
              <div className="h-10 w-40 animate-pulse rounded bg-shimmer-canvas" />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={`evt-${i.toString()}`}
                  className="card-surface h-48 animate-pulse p-6"
                />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* GalleryHighlightsSection */}
      <div className="bg-surface-subtle">
        <section className="section-padding">
          <div className="container-shell space-y-8">
            <div className="space-y-3">
              <div className="h-4 w-32 animate-pulse rounded bg-shimmer-canvas" />
              <div className="h-11 max-w-lg animate-pulse rounded bg-shimmer-canvas" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={`gal-${i.toString()}`}
                  className="aspect-4/3 animate-pulse rounded-card-lg bg-shimmer-canvas"
                />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* GiveBanner */}
      <section className="section-padding">
        <div className="container-shell">
          <div className="h-40 animate-pulse rounded-card-xl bg-shimmer-canvas md:h-48" />
        </div>
      </section>

      {/* PrayerRequestBanner */}
      <section className="section-padding pt-0">
        <div className="container-shell">
          <div className="h-32 animate-pulse rounded-card-lg bg-shimmer-canvas md:h-36" />
        </div>
      </section>
    </div>
  );
}

export default HomePageSkeleton;
