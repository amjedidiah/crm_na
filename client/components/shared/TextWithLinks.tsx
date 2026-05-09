import type { ReactNode } from "react";

const URL_IN_TEXT = /https?:\/\/[^\s<>"{}|\\^`[\]]+/gi;

function trimUrlForHref(raw: string): string {
  return raw.replace(/[.,;:!?)]+$/, "");
}

/** Renders plain text with `http(s)` URLs as outbound links (for notes, blurbs, etc.). */
function TextWithLinks({
  text,
  linkClassName,
}: Readonly<{ text: string; linkClassName?: string }>): ReactNode {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  const re = new RegExp(URL_IN_TEXT.source, URL_IN_TEXT.flags);
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const rawUrl = match[0];
    const href = trimUrlForHref(rawUrl);
    key += 1;
    nodes.push(
      <a
        key={key}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        {rawUrl}
      </a>,
    );
    lastIndex = match.index + rawUrl.length;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes.length > 0 ? nodes : text;
}

export default TextWithLinks;
