import { notFound } from "next/navigation";
import AlbumDetailContent from "@/components/gallery/AlbumDetailContent";
import PageHeader from "@/components/shared/PageHeader";
import { getGalleryAlbum, getGalleryAlbums } from "@/lib/wordpress";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const albums = await getGalleryAlbums();
  return albums.map((album) => ({ slug: album.slug }));
}

async function GalleryAlbumPage({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;
  const album = await getGalleryAlbum(slug);

  if (!album) {
    notFound();
  }

  return (
    <div className="bg-(--color-bg-canvas) text-(--color-fg-primary)">
      <PageHeader
        eyebrow="Gallery Album"
        title={album.title}
        description={`A ${album.images.length}-photo album from CRM North America.`}
      >
        <div className="flex flex-wrap gap-4 text-sm text-(--color-fg-inverse-soft)">
          {album.date ? <span>{formatDate(album.date)}</span> : null}
          <span>{album.images.length} photos</span>
        </div>
      </PageHeader>
      <AlbumDetailContent album={album} />
    </div>
  );
}

export default GalleryAlbumPage;
