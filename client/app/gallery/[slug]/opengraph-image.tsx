import { notFound } from "next/navigation";
import { buildOgImage } from "@/lib/og";
import { standardOgTheme } from "@/lib/og-theme";
import { getGalleryAlbum } from "@/lib/wordpress";
import { formatDate } from "@/lib/utils";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

async function GalleryAlbumOpengraphImage({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;
  const album = await getGalleryAlbum(slug);

  if (!album) {
    notFound();
  }

  const count = album.images.length;
  const photoPhrase = count === 1 ? "1 photo" : `${count} photos`;

  return buildOgImage(
    album.title,
    `${photoPhrase} · CRM North America gallery`,
    standardOgTheme,
    album.date ? { location: formatDate(album.date) } : undefined,
  );
}

export default GalleryAlbumOpengraphImage;
