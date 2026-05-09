export const ogTokenPalette = {
  "--surface-inverse": "#0B1628",
  "--text-on-inverse": "#F5EFE0",
  "--text-brand": "#C8A85A",
  "--text-brand-strong": "#E8C87A",
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
