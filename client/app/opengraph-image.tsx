import { buildOgImage } from "@/lib/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const defaultOgTheme = {
  background: "--color-bg-emphasis",
  foreground: "--color-fg-inverse",
  eyebrow: "--color-fg-accent",
  subtitle: "--color-fg-accent-strong",
} as const;

function OpengraphImage() {
  return buildOgImage(
    "CRM NA",
    "Next.js + WordPress rebuild scaffold",
    defaultOgTheme,
  );
}

export default OpengraphImage;
