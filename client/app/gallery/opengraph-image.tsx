import { buildOgImage } from "@/lib/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const galleryOgTheme = {
  background: "--surface-inverse",
  foreground: "--text-on-inverse",
  eyebrow: "--text-brand",
  subtitle: "--text-brand-strong",
} as const;

function GalleryOpengraphImage() {
  return buildOgImage(
    "Gallery",
    "Moments from worship, fellowship, and ministry life across CRM North America.",
    galleryOgTheme,
  );
}

export default GalleryOpengraphImage;
