import { ImageResponse } from "next/og";
import { resolveOgColor, type OgTheme } from "@/lib/og-theme";

const defaultOgTheme: OgTheme = {
  background: "--color-bg-emphasis",
  foreground: "--color-fg-inverse",
  eyebrow: "--color-fg-accent",
  subtitle: "--color-fg-accent-strong",
};

export function buildOgImage(
  title: string,
  subtitle: string,
  theme: OgTheme = defaultOgTheme,
) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: resolveOgColor(theme.background),
        color: resolveOgColor(theme.foreground),
        padding: "80px",
        gap: "24px",
      }}
    >
      <div
        style={{
          color: resolveOgColor(theme.eyebrow),
          fontSize: 28,
          letterSpacing: 6,
          textTransform: "uppercase",
        }}
      >
        CRM North America
      </div>
      <div style={{ fontSize: 72, lineHeight: 1.05 }}>{title}</div>
      <div style={{ fontSize: 32, color: resolveOgColor(theme.subtitle) }}>
        {subtitle}
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
