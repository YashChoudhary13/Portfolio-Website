import { ImageResponse } from "next/og";

// Generate once at build time so the route is compatible with `output: export`.
export const dynamic = "force-static";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Yash Choudhary — Full-Stack Engineer & AI Systems Builder";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050505",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "rgba(255,255,255,0.4)",
            fontSize: 22,
            letterSpacing: 4,
          }}
        >
          <span>PORTFOLIO — 2026</span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                background: "#c2a8df",
              }}
            />
            AVAILABLE FOR WORK
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: 110,
              fontWeight: 800,
              letterSpacing: -4,
              lineHeight: 1,
            }}
          >
            Yash Choudhary
          </div>
          <div
            style={{
              marginTop: 28,
              color: "rgba(255,255,255,0.65)",
              fontSize: 38,
              lineHeight: 1.3,
            }}
          >
            Full-Stack Engineer & AI Systems Builder
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "rgba(255,255,255,0.4)",
            fontSize: 22,
            letterSpacing: 2,
          }}
        >
          <span>RAG systems · Production platforms · Paid client delivery</span>
          <span>Jaipur, IN</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
