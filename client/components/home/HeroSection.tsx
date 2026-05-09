import HeroSectionClient from "@/components/home/HeroSectionClient";
import { buildConventionHeroPanelData } from "@/lib/home-hero";
import { isConventionHeroPromoEnabled } from "@/lib/convention-hero-promo";
import type { Event } from "@/lib/types";

interface HeroSectionProps {
  conventionEvent?: Pick<Event, "imageSrc"> | null;
}

function HeroSection({
  conventionEvent = null,
}: Readonly<HeroSectionProps>) {
  const showConventionPromo = isConventionHeroPromoEnabled();
  const conventionPanel = showConventionPromo
    ? buildConventionHeroPanelData(conventionEvent)
    : null;

  return (
    <HeroSectionClient conventionPanel={conventionPanel} />
  );
}

export default HeroSection;
