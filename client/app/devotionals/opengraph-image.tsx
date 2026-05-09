import { buildOgImage } from "@/lib/og";
import { standardOgTheme } from "@/lib/og-theme";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

function DevotionalsOpengraphImage() {
  return buildOgImage(
    "Daily Devotional",
    "A daily word of faith, hope, and encouragement for CRM North America.",
    standardOgTheme,
  );
}

export default DevotionalsOpengraphImage;
