import { ImageResponse } from "next/og";
import { site } from "@/data/site";

// Generates the preview image shown when the site is shared on LinkedIn, Slack,
// X, etc. Built once at build time (1200×630 PNG). Applies to every page unless
// a route defines its own opengraph-image.
export const alt = `${site.name}: ${site.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          padding: "72px 80px",
          background: "#faf9f6",
          color: "#1f2230",
          backgroundImage:
            "linear-gradient(to right, #ebe8e1 1px, transparent 1px), linear-gradient(to bottom, #ebe8e1 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 4, color: "#6b6f7e" }}>
          M.TECH · MATHEMATICS &amp; COMPUTING
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, fontWeight: 600, letterSpacing: -3 }}>{site.name}</div>
          <div style={{ marginTop: 12, fontSize: 42, color: "#3a3e4d" }}>Data Science &amp; Machine Learning</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#2f5bb7" }}>
          Statistics · Time series · Edge-cloud research
        </div>
      </div>
    ),
    size,
  );
}
