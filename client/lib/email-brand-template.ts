/**
 * Table-based transactional email shell aligned with CRM brand email styling
 * (see crmusa2026-convention/supabase/templates/magic-link.html).
 * All user-controlled strings must be passed through {@link escapeHtml} before
 * concatenating into {@link renderBrandEmailHtml}'s `mainContentHtml`.
 */
export function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export type BrandEmailHtmlParams = Readonly<{
  documentTitle: string;
  eyebrow: string;
  headerDisplayTitle: string;
  headerSubtitle: string;
  /** Safe HTML only (typically built from {@link escapeHtml} segments). */
  mainContentHtml: string;
  footerLine: string;
}>;

export function renderBrandEmailHtml(params: BrandEmailHtmlParams): string {
  const {
    documentTitle,
    eyebrow,
    headerDisplayTitle,
    headerSubtitle,
    mainContentHtml,
    footerLine,
  } = params;

  const safeFooter = escapeHtml(footerLine);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>${escapeHtml(documentTitle)}</title>
  </head>
  <body bgcolor="#ede8df" style="margin:0; padding:0; background-color:#ede8df; color:#f5efe0;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ede8df" style="width:100%; border-collapse:collapse; background-color:#ede8df;">
      <tr>
        <td align="center" style="padding:24px 12px 24px 12px;">
          <table width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="#0b1628" style="width:600px; max-width:100%; border-collapse:collapse; background-color:#0b1628; border:1px solid #c8a85a;">
            <tr>
              <td align="center" style="padding:32px 24px 24px 24px; border-bottom:1px solid #c8a85a; font-family:Georgia, 'Times New Roman', serif;">
                <p style="margin:0 0 8px 0; font-family:Georgia, 'Times New Roman', serif; font-size:12px; line-height:18px; color:#c8a85a;">
                  ${escapeHtml(eyebrow)}
                </p>
                <p style="margin:0 0 8px 0; font-family:Georgia, 'Times New Roman', serif; font-size:30px; line-height:36px; color:#e8c87a;">
                  ${escapeHtml(headerDisplayTitle)}
                </p>
                <p style="margin:0; font-family:Arial, Helvetica, sans-serif; font-size:13px; line-height:18px; color:#f5efe0;">
                  ${escapeHtml(headerSubtitle)}
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 24px 24px 24px; font-family:Arial, Helvetica, sans-serif;">
                ${mainContentHtml}
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:20px 24px 28px 24px; border-top:1px solid #c8a85a; font-family:Arial, Helvetica, sans-serif;">
                <p style="margin:0; font-size:11px; line-height:18px; color:#c8a85a;">
                  ${safeFooter}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/** Body copy paragraph (escaped). */
export function brandBodyP(text: string): string {
  return `<p style="margin:0 0 18px 0; font-size:14px; line-height:22px; color:#f5efe0;">${escapeHtml(text)}</p>`;
}

/** Slightly larger opening line (escaped). */
export function brandLeadP(text: string): string {
  return `<p style="margin:0 0 18px 0; font-size:16px; line-height:24px; color:#f5efe0;">${escapeHtml(text)}</p>`;
}

/** Label + block with preserved line breaks (escaped). */
export function brandLabeledBlock(label: string, body: string): string {
  return `<p style="margin:0 0 8px 0; font-size:13px; line-height:20px; color:#f5efe0;"><strong>${escapeHtml(label)}</strong></p>
<p style="margin:0 0 18px 0; font-size:14px; line-height:22px; color:#f5efe0; white-space:pre-wrap;">${escapeHtml(body)}</p>`;
}
