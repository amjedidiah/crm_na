import { describe, expect, test } from "bun:test";

import { escapeHtml, renderBrandEmailHtml } from "@/lib/email-brand-template";

describe("escapeHtml", () => {
  test("escapes HTML special characters", () => {
    expect(escapeHtml(`a & b <c> "d" 'e'`)).toBe(
      "a &amp; b &lt;c&gt; &quot;d&quot; &#39;e&#39;",
    );
  });
});

describe("renderBrandEmailHtml", () => {
  test("escapes title and injects main content as provided", () => {
    const html = renderBrandEmailHtml({
      documentTitle: 'Test <script>',
      eyebrow: "Org",
      headerDisplayTitle: "Title",
      headerSubtitle: "Sub",
      mainContentHtml: "<p>Trusted fragment</p>",
      footerLine: "Footer & co",
    });
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("<p>Trusted fragment</p>");
    expect(html).toContain("Footer &amp; co");
  });
});
