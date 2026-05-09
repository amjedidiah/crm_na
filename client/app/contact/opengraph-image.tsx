import { buildOgImage } from "@/lib/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const contactOgTheme = {
  background: "--color-bg-emphasis",
  foreground: "--color-fg-inverse",
  eyebrow: "--color-fg-accent",
  subtitle: "--color-fg-accent-strong",
} as const;

function ContactOpengraphImage() {
  return buildOgImage(
    "Contact",
    "Prayer, visits, churches, ministries, and events — reach CRM North America.",
    contactOgTheme,
  );
}

export default ContactOpengraphImage;
