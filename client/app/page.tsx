import type { Metadata } from "next";
import EventsArea from "@/components/home/EventsArea";
import FeaturedChurches from "@/components/home/FeaturedChurches";
import GiveBanner from "@/components/home/GiveBanner";
import HeroSection from "@/components/home/HeroSection";
import LatestReflectionSection from "@/components/home/LatestReflectionSection";
import NetworkPulse from "@/components/home/NetworkPulse";
import PlanYourVisit from "@/components/home/PlanYourVisit";
import PrayerRequestBanner from "@/components/home/PrayerRequestBanner";
import ServeWithMinistries from "@/components/home/ServeWithMinistries";
import WatchLiveSection from "@/components/home/WatchLiveSection";
import WelcomeSection from "@/components/home/WelcomeSection";
import FadeInWhenVisible from "@/components/shared/FadeInWhenVisible";
import { getMinistriesFeaturedOnHome, SITE_DESCRIPTION, SITE_TITLE } from "@/lib/mock-data";
import { getChurches, getEvents, getPublications } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

async function HomePage() {
  const featuredMinistries = getMinistriesFeaturedOnHome();
  const [churches, events, publications] = await Promise.all([
    getChurches(),
    getEvents(),
    getPublications(),
  ]);

  return (
    <div className="overflow-x-clip bg-(--color-bg-canvas) text-(--color-fg-primary)">
      <HeroSection />
      <NetworkPulse
        churchCount={churches.length}
        eventCount={events.length}
        publicationCount={publications.length}
      />
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-12 h-72 bg-[radial-gradient(circle_at_top,rgba(200,168,90,0.1),transparent_68%)]"
        />
        <FadeInWhenVisible>
          <WelcomeSection />
        </FadeInWhenVisible>
      </div>
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(245,239,224,0.95)_18%,rgba(245,239,224,0.95)_82%,transparent)]"
        />
        <FadeInWhenVisible>
          <PlanYourVisit />
        </FadeInWhenVisible>
      </div>
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-3xl -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(17,32,64,0.06),transparent_68%)] blur-3xl lg:block"
        />
        <FadeInWhenVisible>
          <FeaturedChurches />
        </FadeInWhenVisible>
      </div>
      <FadeInWhenVisible>
        <PrayerRequestBanner />
      </FadeInWhenVisible>
      <div className="bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.55)_16%,transparent_100%)]">
        <FadeInWhenVisible>
          <EventsArea previewCount={3} />
        </FadeInWhenVisible>
      </div>
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_12%_18%,rgba(200,168,90,0.08),transparent_32%),radial-gradient(circle_at_85%_40%,rgba(11,22,40,0.06),transparent_28%)]"
        />
        <FadeInWhenVisible>
          <LatestReflectionSection />
        </FadeInWhenVisible>
      </div>
      <FadeInWhenVisible>
        <WatchLiveSection />
      </FadeInWhenVisible>
      <FadeInWhenVisible>
        <ServeWithMinistries ministries={featuredMinistries} />
      </FadeInWhenVisible>
      <FadeInWhenVisible>
        <GiveBanner />
      </FadeInWhenVisible>
    </div>
  );
}

export default HomePage;
