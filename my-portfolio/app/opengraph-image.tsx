import { ImageResponse } from "next/og";

export const alt =
  "Aaron Mulandi — software engineer building for places the network doesn't reach";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori needs explicit display:flex on any element with multiple children,
// and does not read the stylesheet — hence the literal palette values here.
const GROUND = "#0E1620";
const INK = "#E9EEF4";
const MUTED = "#8296AC";
const AMBER = "#F2A93B";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: GROUND,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: AMBER,
          }}
        >
          Software engineer
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 96, color: INK }}>
            Aaron Mulandi
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 32,
              lineHeight: 1.4,
              color: MUTED,
              maxWidth: 900,
            }}
          >
            Systems that hold up when the infrastructure doesn&rsquo;t —
            offline-first platforms, edge deployments, and the backends behind
            them.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            fontSize: 22,
            color: MUTED,
            borderTop: `1px solid ${MUTED}`,
            paddingTop: 24,
          }}
        >
          <span>github.com/Arey-7</span>
          <span style={{ color: AMBER }}>·</span>
          <span>linkedin.com/in/aaron-mulandi</span>
        </div>
      </div>
    ),
    size,
  );
}
