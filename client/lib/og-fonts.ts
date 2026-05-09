/**
 * Loads the same Google fonts as app/layout.tsx for OG images (Satori cannot read CSS variables).
 * Values mirror next/font choices: Cinzel, Cormorant Garamond, Jost.
 */
/**
 * Google Fonts returns WOFF2 for modern Chrome. Satori only accepts TTF/OTF/WOFF.
 * A legacy UA makes the CSS include `truetype` / `woff` URLs instead.
 */
const GOOGLE_FONTS_CSS_UA =
  "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)";

async function fetchGoogleFontCss(family: string, weight: number) {
  const familyParam = family.replaceAll(/\s+/g, "+");
  const res = await fetch(
    `https://fonts.googleapis.com/css2?family=${familyParam}:wght@${weight}&display=swap`,
    { headers: { "User-Agent": GOOGLE_FONTS_CSS_UA } },
  );
  if (!res.ok) throw new Error(`Google Fonts CSS failed: ${res.status}`);
  return res.text();
}

/**
 * Satori / next/og accept TTF, OTF, and WOFF — not WOFF2 (`Unsupported OpenType signature wOF2`).
 * Google Fonts CSS lists several `@font-face` blocks; pick the first supported format.
 */
function extractPreferredFontUrl(css: string): string {
  const preferredFormats = [
    "truetype",
    "opentype",
    "woff",
    "embedded-opentype",
  ] as const;

  const blocks: { format: string; url: string }[] = [];
  for (const block of css.matchAll(/@font-face\s*\{([^}]+)\}/g)) {
    const body = block[1];
    const formatMatch = body.match(/format\(\s*['"]([^'"]+)['"]\s*\)/);
    const urlMatch = body.match(/url\(\s*([^)]+)\s*\)/);
    if (formatMatch?.[1] && urlMatch?.[1]) {
      blocks.push({
        format: formatMatch[1],
        url: urlMatch[1].replaceAll(/["']/g, ""),
      });
    }
  }

  for (const fmt of preferredFormats) {
    const hit = blocks.find((b) => b.format === fmt);
    if (hit) return hit.url;
  }

  const nonWoff2 = blocks.find((b) => b.format !== "woff2");
  if (nonWoff2) return nonWoff2.url;

  const fallback = new RegExp(/url\(\s*([^)]+)\s*\)/).exec(css);
  if (!fallback?.[1]) throw new Error("No font URL in Google Fonts CSS");
  return fallback[1].replaceAll(/["']/g, "");
}

async function fetchFontBuffer(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Font fetch failed: ${res.status}`);
  return res.arrayBuffer();
}

/** Matches Satori / next/og `FontOptions['weight']` literal unions */
export type OgFontSpec = {
  name: string;
  data: ArrayBuffer;
  weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  style: "normal";
};

/**
 * Returns empty array on failure so ImageResponse still renders with system fallback.
 */
export async function loadOgFonts(): Promise<OgFontSpec[]> {
  try {
    const [cinzelCss, cormorantCss, jostCss] = await Promise.all([
      fetchGoogleFontCss("Cinzel", 400),
      fetchGoogleFontCss("Cormorant Garamond", 600),
      fetchGoogleFontCss("Jost", 400),
    ]);

    const [cinzelUrl, cormorantUrl, jostUrl] = [
      extractPreferredFontUrl(cinzelCss),
      extractPreferredFontUrl(cormorantCss),
      extractPreferredFontUrl(jostCss),
    ];

    const [cinzelData, cormorantData, jostData] = await Promise.all([
      fetchFontBuffer(cinzelUrl),
      fetchFontBuffer(cormorantUrl),
      fetchFontBuffer(jostUrl),
    ]);

    return [
      {
        name: "Cinzel",
        data: cinzelData,
        weight: 400 as const,
        style: "normal",
      },
      {
        name: "Cormorant Garamond",
        data: cormorantData,
        weight: 600 as const,
        style: "normal",
      },
      { name: "Jost", data: jostData, weight: 400 as const, style: "normal" },
    ];
  } catch {
    return [];
  }
}
