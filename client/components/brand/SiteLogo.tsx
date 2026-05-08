interface SiteLogoProps {
  variant?: "on-dark" | "on-light";
  className?: string;
}

function SiteLogo({
  variant = "on-dark",
  className = "",
}: Readonly<SiteLogoProps>) {
  const accent = "var(--color-fg-accent)";
  const foreground =
    variant === "on-dark" ? "var(--color-fg-inverse)" : "var(--color-fg-primary)";

  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20 6v28M13 13h14M13 27h14"
        stroke={accent}
        strokeWidth={1.85}
        strokeLinecap="round"
      />
      <circle cx="20" cy="20" r="17" stroke={foreground} strokeWidth={1.2} />
      <circle cx="20" cy="20" r="4.25" fill={accent} />
    </svg>
  );
}

export default SiteLogo;
