import type { Metadata } from "next";
import EventsArea from "@/components/home/EventsArea";
import FeaturedChurches from "@/components/home/FeaturedChurches";
import GalleryHighlightsSection from "@/components/home/GalleryHighlightsSection";
import GiveBanner from "@/components/home/GiveBanner";
import HeroSection from "@/components/home/HeroSection";
import NetworkPulse from "@/components/home/NetworkPulse";
import PrayerRequestBanner from "@/components/home/PrayerRequestBanner";
import ServeWithMinistries from "@/components/home/ServeWithMinistries";
import WelcomeSection from "@/components/home/WelcomeSection";
import FadeInWhenVisible from "@/components/shared/FadeInWhenVisible";
import { CONVENTION_EVENT_SLUG } from "@/lib/convention-hero-promo";
import {
  SITE_DESCRIPTION,
  SITE_TITLE,
} from "@/lib/mock-data";
import {
  getChurches,
  getEvents,
  getGalleryAlbums,
  getMinistries,
} from "@/lib/wordpress";

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export const revalidate = 60;

async function HomePage() {
  const [churches, events, galleryAlbums, ministries] = await Promise.all([
    getChurches(),
    getEvents(),
    getGalleryAlbums(),
    getMinistries(),
  ]);
  const conventionEvent =
    events.find((event) => event.slug === CONVENTION_EVENT_SLUG) ?? null;

  return (
    <div className="overflow-x-clip bg-page-canvas text-fg-primary">
      <HeroSection conventionEvent={conventionEvent} />
      <NetworkPulse
        churchCount={churches.length}
        eventCount={events.length}
        ministryCount={ministries.length}
      />
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-12 h-72 bg-gradient-page-top-glow"
        />
        <FadeInWhenVisible>
          <WelcomeSection />
        </FadeInWhenVisible>
      </div>
      <div className="relative bg-surface-subtle">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-3xl -translate-x-1/2 rounded-full bg-gradient-page-depth-glow blur-3xl lg:block"
        />
        <FadeInWhenVisible>
          <FeaturedChurches />
        </FadeInWhenVisible>
      </div>
      <FadeInWhenVisible>
        <ServeWithMinistries ministries={ministries} />
      </FadeInWhenVisible>
      <div className="bg-gradient-page-highlight-band">
        <FadeInWhenVisible>
          <EventsArea previewCount={3} />
        </FadeInWhenVisible>
      </div>
      <div className="bg-surface-subtle">
        <FadeInWhenVisible>
          <GalleryHighlightsSection albums={galleryAlbums} />
        </FadeInWhenVisible>
      </div>
      <FadeInWhenVisible>
        <GiveBanner />
      </FadeInWhenVisible>
      <FadeInWhenVisible>
        <PrayerRequestBanner />
      </FadeInWhenVisible>
    </div>
  );
}

export default HomePage;
