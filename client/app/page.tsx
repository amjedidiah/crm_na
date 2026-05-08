import type { Metadata } from "next";
import EventsArea from "@/components/home/EventsArea";
import FeaturedChurches from "@/components/home/FeaturedChurches";
import GiveBanner from "@/components/home/GiveBanner";
import HeroSection from "@/components/home/HeroSection";
import LatestSermonsSection from "@/components/home/LatestSermonsSection";
import NetworkPulse from "@/components/home/NetworkPulse";
import PrayerRequestBanner from "@/components/home/PrayerRequestBanner";
import WelcomeSection from "@/components/home/WelcomeSection";
import FadeInWhenVisible from "@/components/shared/FadeInWhenVisible";
import {
  SITE_DESCRIPTION,
  SITE_TITLE,
} from "@/lib/mock-data";
import {
  getChurches,
  getEvents,
  getMediaItems,
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

async function HomePage() {
  const [churches, events, mediaItems, ministries] = await Promise.all([
    getChurches(),
    getEvents(),
    getMediaItems(),
    getMinistries(),
  ]);
  const latestSermons = [...mediaItems]
    .filter((item) => item.type === "sermon")
    .sort(
      (left, right) =>
        new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime(),
    )
    .slice(0, 3);

  return (
    <div className="overflow-x-clip bg-(--color-bg-canvas) text-(--color-fg-primary)">
      <HeroSection />
      <NetworkPulse
        churchCount={churches.length}
        eventCount={events.length}
        ministryCount={ministries.length}
      />
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-12 h-72"
          style={{ backgroundImage: "var(--gradient-page-warm-top-glow)" }}
        />
        <FadeInWhenVisible>
          <WelcomeSection />
        </FadeInWhenVisible>
      </div>
      <div className="relative bg-(--color-bg-surface-subtle)">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-3xl -translate-x-1/2 rounded-full blur-3xl lg:block"
          style={{ backgroundImage: "var(--gradient-page-cool-center-glow)" }}
        />
        <FadeInWhenVisible>
          <FeaturedChurches />
        </FadeInWhenVisible>
      </div>
      <div style={{ backgroundImage: "var(--gradient-page-highlight-band)" }}>
        <FadeInWhenVisible>
          <EventsArea previewCount={3} />
        </FadeInWhenVisible>
      </div>
      <div className="bg-(--color-bg-surface-subtle)">
        <FadeInWhenVisible>
          <LatestSermonsSection sermons={latestSermons} />
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
