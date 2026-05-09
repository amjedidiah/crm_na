import { buildOgImage } from "@/lib/og";
import { standardOgTheme } from "@/lib/og-theme";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

/** Same destination as `/about` — keeps previews consistent when the route redirects. */
function WhoWeAreOpengraphImage() {
  return buildOgImage(
    "About Us",
    "History, vision, mission, strategy, and leadership behind CRM North America.",
    standardOgTheme,
  );
}

export default WhoWeAreOpengraphImage;
