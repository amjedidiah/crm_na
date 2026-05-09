import { buildOgImage } from "@/lib/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const giveOgTheme = {
  background: "--surface-inverse",
  foreground: "--text-on-inverse",
  eyebrow: "--text-brand-strong",
  subtitle: "--text-brand",
} as const;

function GiveOpengraphImage() {
  return buildOgImage(
    "Give",
    "Support CRM North America through Zeffy or Zelle.",
    giveOgTheme,
  );
}

export default GiveOpengraphImage;
