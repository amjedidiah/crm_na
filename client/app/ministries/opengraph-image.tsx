import { buildOgImage } from "@/lib/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const ministriesOgTheme = {
  background: "--color-bg-emphasis",
  foreground: "--color-fg-inverse",
  eyebrow: "--color-fg-accent",
  subtitle: "--color-fg-accent-strong",
} as const;

function MinistriesOpengraphImage() {
  return buildOgImage(
    "Ministries",
    "Serve across discipleship, youth, men, women, and more.",
    ministriesOgTheme,
  );
}

export default MinistriesOpengraphImage;
