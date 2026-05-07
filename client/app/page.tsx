import EventsArea from "@/components/home/EventsArea";
import FeaturedChurches from "@/components/home/FeaturedChurches";
import GiveBanner from "@/components/home/GiveBanner";
import HeroSection from "@/components/home/HeroSection";
import WatchLiveSection from "@/components/home/WatchLiveSection";
import WelcomeSection from "@/components/home/WelcomeSection";

function HomePage() {
  return (
    <>
      <HeroSection />
      <WelcomeSection />
      <FeaturedChurches />
      <EventsArea />
      <WatchLiveSection />
      <GiveBanner />
    </>
  );
}

export default HomePage;