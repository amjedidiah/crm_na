import { buildOgImage } from "@/lib/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const defaultOgTheme = {
  background: "--surface-inverse",
  foreground: "--text-on-inverse",
  eyebrow: "--text-brand",
  subtitle: "--text-brand-strong",
} as const;

function OpengraphImage() {
  return buildOgImage(
    "CRM NA",
    "Next.js + WordPress rebuild scaffold",
    defaultOgTheme,
  );
}

export default OpengraphImage;
