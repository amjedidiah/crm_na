import { buildOgImage } from "@/lib/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const galleryOgTheme = {
  background: "--color-bg-emphasis",
  foreground: "--color-fg-inverse",
  eyebrow: "--color-fg-accent",
  subtitle: "--color-fg-accent-strong",
} as const;

function GalleryOpengraphImage() {
  return buildOgImage(
    "Gallery",
    "Moments from worship, fellowship, and ministry life across CRM North America.",
    galleryOgTheme,
  );
}

export default GalleryOpengraphImage;
