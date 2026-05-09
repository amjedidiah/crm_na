function NavOffset() {
  return (
    <div
      aria-hidden
      style={{
        height: "calc(var(--nav-height) + var(--site-banner-height))",
      }}
      className="shrink-0"
    />
  );
}

export default NavOffset;
