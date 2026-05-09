import { buildOgImage } from "@/lib/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const giveOgTheme = {
  background: "--color-bg-emphasis",
  foreground: "--color-fg-inverse",
  eyebrow: "--color-fg-accent-strong",
  subtitle: "--color-fg-accent",
} as const;

function GiveOpengraphImage() {
  return buildOgImage(
    "Give",
    "Support CRM North America through Zeffy or Zelle.",
    giveOgTheme,
  );
}

export default GiveOpengraphImage;
