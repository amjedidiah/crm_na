import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import AlbumDetailContent from "@/components/gallery/AlbumDetailContent";
import BackToListingLink from "@/components/shared/BackToListingLink";
import PageHeader from "@/components/shared/PageHeader";
import { SITE_NAME } from "@/lib/mock-data";
import { getGalleryAlbum, getGalleryAlbums } from "@/lib/wordpress";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  try {
    const albums = await getGalleryAlbums();
    return albums.map((album) => ({ slug: album.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>): Promise<Metadata> {
  const { slug } = await params;
  const album = await getGalleryAlbum(slug);

  if (!album) {
    return {
      title: "Album not found",
      description: `This gallery album could not be found on ${SITE_NAME}.`,
    };
  }

  const photoPhrase =
    album.images.length === 1
      ? "1 photo"
      : `${album.images.length} photos`;

  return {
    title: album.title,
    description: `${photoPhrase} — ${album.title} on ${SITE_NAME}.`,
    alternates: {
      canonical: `/gallery/${album.slug}`,
    },
  };
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

  const count = album.images.length;
  let description: string;
  if (count === 0) {
    description = "This album does not have any photos yet.";
  } else if (count === 1) {
    description = "A single-photo album from CRM North America.";
  } else {
    description = `A ${count}-photo album from CRM North America.`;
  }

  let headerMeta: ReactNode = null;
  if (count > 0) {
    headerMeta = (
      <div className="flex flex-wrap gap-4 text-sm text-fg-inverse-soft">
        {album.date ? <span>{formatDate(album.date)}</span> : null}
        <span>
          {count} {count === 1 ? "photo" : "photos"}
        </span>
      </div>
    );
  } else if (album.date) {
    headerMeta = (
      <div className="flex flex-wrap gap-4 text-sm text-fg-inverse-soft">
        <span>{formatDate(album.date)}</span>
      </div>
    );
  }

  return (
    <div className="overflow-x-clip bg-page-canvas text-fg-primary">
      <PageHeader
        leading={<BackToListingLink href="/gallery">Gallery</BackToListingLink>}
        eyebrow="Gallery album"
        title={album.title}
        description={description}
      >
        {headerMeta}
      </PageHeader>
      <AlbumDetailContent album={album} />
    </div>
  );
}

export default GalleryAlbumPage;
