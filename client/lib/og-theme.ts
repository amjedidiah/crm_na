/**
 * Hex mirrors `:root` in app/globals.css so OG images match the light-theme design system.
 * (`next/og` runs without DOM/CSS variables — tokens are duplicated here intentionally.)
 */
export const ogTokenPalette = {
  "--surface-inverse": "#0b1628",
  "--surface-inverse-strong": "#112040",
  "--text-on-inverse": "#f5efe0",
  "--text-brand": "#c8a85a",
  "--text-brand-strong": "#e8c87a",
  "--text-on-inverse-muted": "rgba(245, 239, 224, 0.55)",
  /** Semantic red from globals — hero accents / emphasis on inverse surfaces */
  "--text-error": "#9f1239",
  /** Matches `--interactive-muted` (light theme) for hero radial wash */
  "--interactive-muted": "rgba(200, 168, 90, 0.16)",
} as const;

export type OgColorToken = keyof typeof ogTokenPalette;

export interface OgTheme {
  background: OgColorToken;
  foreground: OgColorToken;
  eyebrow: OgColorToken;
  subtitle: OgColorToken;
}

export function resolveOgColor(token: OgColorToken) {
  return ogTokenPalette[token];
}

/** Default OG palette used across listing pages (matches most route-local themes). */
export const standardOgTheme = {
  background: "--surface-inverse",
  foreground: "--text-on-inverse",
  eyebrow: "--text-brand",
  subtitle: "--text-brand-strong",
} as const satisfies OgTheme;

