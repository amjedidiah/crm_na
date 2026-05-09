import FeaturedChurchShowcase from "@/components/home/FeaturedChurchShowcase";
import { getFeaturedChurchesForHome } from "@/lib/church-utils";
import { getChurches } from "@/lib/wordpress";

async function FeaturedChurches() {
  const churches = await getChurches();
  const featured = getFeaturedChurchesForHome(churches);

  return <FeaturedChurchShowcase churches={featured} />;
}

export default FeaturedChurches;
