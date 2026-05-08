export const ogTokenPalette = {
  "--color-bg-emphasis": "#0B1628",
  "--color-fg-inverse": "#F5EFE0",
  "--color-fg-accent": "#C8A85A",
  "--color-fg-accent-strong": "#E8C87A",
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
