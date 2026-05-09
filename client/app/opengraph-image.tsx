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

async function OpengraphImage() {
  return buildOgImage(
    "Revival across North America",
    "Prayer · Worship · Discipleship · Revival",
    defaultOgTheme,
    { location: "United States · Canada · Mexico" },
  );
}

export default OpengraphImage;
