import { connection } from "next/server";
import HeroSectionClient from "@/components/home/HeroSectionClient";
import { buildConventionHeroPanelData } from "@/lib/home-hero";
import { isConventionHeroPromoEnabled } from "@/lib/convention-hero-promo";
import type { Event } from "@/lib/types";

interface HeroSectionProps {
  conventionEvent?: Pick<Event, "imageSrc"> | null;
}

async function HeroSection({
  conventionEvent = null,
}: Readonly<HeroSectionProps>) {
  await connection();
  const showConventionPromo = isConventionHeroPromoEnabled();
  const conventionPanel = showConventionPromo
    ? buildConventionHeroPanelData(conventionEvent)
    : null;

  return <HeroSectionClient conventionPanel={conventionPanel} />;
}

export default HeroSection;
