import { ImageResponse } from "next/og";
import { loadOgFonts } from "@/lib/og-fonts";
import { resolveOgColor, type OgTheme } from "@/lib/og-theme";

const defaultOgTheme: OgTheme = {
  background: "--surface-inverse",
  foreground: "--text-on-inverse",
  eyebrow: "--text-brand",
  subtitle: "--text-brand-strong",
};

export type BuildOgImageOptions = {
  /**
   * Muted tertiary line (e.g. region), like `--text-on-inverse-muted` usage on inverse surfaces.
   */
  location?: string;
  /**
   * Set false to hide the top “CRM North America” line (e.g. if the title is the org name and would duplicate it).
   */
  showEyebrow?: boolean;
};

/**
 * OG layout aligns with `.hero-panel` / `--gradient-hero-panel` in globals.css (radial gold wash + navy depth).
 * Typography matches layout.tsx: Cinzel (eyebrow), Cormorant Garamond (headline), Jost (supporting).
 */
export async function buildOgImage(
  title: string,
  subtitle: string,
  theme: OgTheme = defaultOgTheme,
  options?: BuildOgImageOptions,
) {
  const { location, showEyebrow = true } = options ?? {};
  const fonts = await loadOgFonts();

  const accent = resolveOgColor("--text-error");
  const muted = resolveOgColor("--text-on-inverse-muted");
  const radialWash = resolveOgColor("--interactive-muted");
  const inverse = resolveOgColor("--surface-inverse");
  const inverseStrong = resolveOgColor("--surface-inverse-strong");
  const hasSubtitle = Boolean(subtitle.trim());

  /** Same stacking order as `--gradient-hero-panel` in app/globals.css */
  const heroPanelBackground = `radial-gradient(circle at 50% 0%, ${radialWash} 0%, transparent 36%), linear-gradient(180deg, ${inverse} 0%, ${inverseStrong} 100%)`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: heroPanelBackground,
        color: resolveOgColor(theme.foreground),
        padding: "72px 88px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 36,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 132,
            height: 3,
            backgroundColor: accent,
            borderRadius: 1,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 36,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 132,
            height: 3,
            backgroundColor: accent,
            borderRadius: 1,
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 20,
          maxWidth: 1040,
        }}
      >
        <div
          style={{
            fontSize: 40,
            lineHeight: 1,
            color: accent,
            fontFamily: "Cinzel",
            fontWeight: 400,
          }}
        >
          ✝
        </div>
        {showEyebrow ? (
          <div
            style={{
              color: resolveOgColor(theme.eyebrow),
              fontSize: 26,
              letterSpacing: 9,
              textTransform: "uppercase",
              fontFamily: "Cinzel",
              fontWeight: 400,
            }}
          >
            CRM North America
          </div>
        ) : null}
        <div
          style={{
            fontSize: title.length > 34 ? 56 : 68,
            lineHeight: 1.06,
            fontWeight: 600,
            fontFamily: "Cormorant Garamond",
          }}
        >
          {title}
        </div>
        {hasSubtitle ? (
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.35,
              color: resolveOgColor(theme.subtitle),
              maxWidth: 920,
              fontFamily: "Jost",
              fontWeight: 400,
            }}
          >
            {subtitle}
          </div>
        ) : null}
        {location ? (
          <div
            style={{
              fontSize: 22,
              lineHeight: 1.4,
              color: muted,
              marginTop: 4,
              fontFamily: "Jost",
              fontWeight: 400,
            }}
          >
            {location}
          </div>
        ) : null}
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      ...(fonts.length > 0 ? { fonts } : {}),
    },
  );
}
