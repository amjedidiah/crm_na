/** Keeps OG subtitle readable when summaries are long (Satori layout). */
export function truncateOgSubtitle(text: string, maxChars = 160): string {
  const normalized = text.replaceAll(/\s+/g, " ").trim();
  if (!normalized) return "";
  if (normalized.length <= maxChars) return normalized;
  return `${normalized.slice(0, Math.max(0, maxChars - 1)).trimEnd()}…`;
}
