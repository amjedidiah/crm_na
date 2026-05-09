import GalleryFilterSection from "@/components/gallery/GalleryFilterSection";
import PageHeader from "@/components/shared/PageHeader";
import { GALLERY_CATEGORIES } from "@/lib/mock-data";
import { getGalleryAlbums } from "@/lib/wordpress";

async function GalleryPage() {
  const albums = [...(await getGalleryAlbums())].sort((left, right) => {
    const leftTime = left.date ? new Date(left.date).getTime() : 0;
    const rightTime = right.date ? new Date(right.date).getTime() : 0;
    return rightTime - leftTime;
  });

  return (
    <div className="bg-(--color-bg-canvas) text-(--color-fg-primary)">
      <PageHeader
        eyebrow="Gallery"
        title="Gallery"
        description="Browse photo albums from events, ministries, and shared moments across the CRM North America network."
      />
      <GalleryFilterSection albums={albums} categories={GALLERY_CATEGORIES} />
    </div>
  );
}

export default GalleryPage;
