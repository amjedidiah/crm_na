import { buildOgImage } from "@/lib/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

function OpengraphImage() {
  return buildOgImage("CRM NA", "Next.js + WordPress rebuild scaffold");
}

export default OpengraphImage;
