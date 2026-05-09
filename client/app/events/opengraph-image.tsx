import { buildOgImage } from "@/lib/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const eventsOgTheme = {
  background: "--color-bg-emphasis",
  foreground: "--color-fg-inverse",
  eyebrow: "--color-fg-accent",
  subtitle: "--color-fg-accent-strong",
} as const;

function EventsOpengraphImage() {
  return buildOgImage(
    "Events",
    "Gatherings, conventions, and regional milestones across CRM NA.",
    eventsOgTheme,
  );
}

export default EventsOpengraphImage;
