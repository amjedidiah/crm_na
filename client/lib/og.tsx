import { ImageResponse } from "next/og";

export function buildOgImage(title: string, subtitle: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#0B1628",
          color: "#F5EFE0",
          padding: "80px",
          gap: "24px",
        }}
      >
        <div
          style={{
            color: "#C8A85A",
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          CRM North America
        </div>
        <div style={{ fontSize: 72, lineHeight: 1.05 }}>{title}</div>
        <div style={{ fontSize: 32, color: "#E8C87A" }}>{subtitle}</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
