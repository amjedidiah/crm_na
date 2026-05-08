import FeaturedChurchShowcase from "@/components/home/FeaturedChurchShowcase";
import { getChurches } from "@/lib/wordpress";

async function FeaturedChurches() {
  const churches = await getChurches();

  return <FeaturedChurchShowcase churches={churches} />;
}

export default FeaturedChurches;
