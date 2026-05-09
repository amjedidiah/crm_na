import { buildOgImage } from "@/lib/og";
import { standardOgTheme } from "@/lib/og-theme";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

function ChurchesOpengraphImage() {
  return buildOgImage(
    "Churches",
    "Locate CRM NA churches across the United States, Canada, and Mexico.",
    standardOgTheme,
  );
}

export default ChurchesOpengraphImage;
