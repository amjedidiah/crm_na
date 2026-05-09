import { notFound } from "next/navigation";
import { buildOgImage } from "@/lib/og";
import { truncateOgSubtitle } from "@/lib/og-truncate";
import { standardOgTheme } from "@/lib/og-theme";
import { getMinistry } from "@/lib/wordpress";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

async function MinistryOpengraphImage({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;
  const ministry = await getMinistry(slug);

  if (!ministry) {
    notFound();
  }

  return buildOgImage(
    ministry.name,
    truncateOgSubtitle(ministry.summary),
    standardOgTheme,
  );
}

export default MinistryOpengraphImage;
