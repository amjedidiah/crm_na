import { notFound } from "next/navigation";
import { buildOgImage } from "@/lib/og";
import { truncateOgSubtitle } from "@/lib/og-truncate";
import { standardOgTheme } from "@/lib/og-theme";
import { isInternalChurchPage } from "@/lib/church-utils";
import { getChurch } from "@/lib/wordpress";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const listingFallbackSubtitle =
  "Locate CRM NA churches across the United States, Canada, and Mexico.";

async function ChurchOpengraphImage({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;
  const church = await getChurch(slug);

  if (!church) {
    notFound();
  }

  if (!isInternalChurchPage(church)) {
    return buildOgImage("Churches", listingFallbackSubtitle, standardOgTheme);
  }

  return buildOgImage(
    church.name,
    truncateOgSubtitle(church.summary),
    standardOgTheme,
    { location: `${church.city}, ${church.stateOrProvince}` },
  );
}

export default ChurchOpengraphImage;
