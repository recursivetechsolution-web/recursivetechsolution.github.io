// Source of public/og-image.png. To regenerate: move this file to
// app/opengraph-image.tsx, run `npm run build`, copy out/opengraph-image to
// public/og-image.png, then move it back here.
import { ImageResponse } from "next/og";

// Social share image (Facebook, LinkedIn, X, iMessage). Generated at build time.
export const dynamic = "force-static";
export const alt = "Recursive Tech Solution — AI agents, chatbots and CRM";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f6f5f1",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, fontWeight: 600, color: "#111214", letterSpacing: "-0.02em" }}>
          Recursive Tech Solution<span style={{ color: "#c63d1b" }}>.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, fontWeight: 700, color: "#111214", letterSpacing: "-0.045em", lineHeight: 1 }}>
            AI that handles
          </div>
          <div style={{ fontSize: 104, fontWeight: 700, color: "#5b5e66", letterSpacing: "-0.045em", lineHeight: 1 }}>
            the follow-up.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#5b5e66" }}>
          AI agents · Knowledge-base chatbots · Client CRM · Websites
        </div>
      </div>
    ),
    size,
  );
}
