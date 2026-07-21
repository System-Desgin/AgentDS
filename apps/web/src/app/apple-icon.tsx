import { ImageResponse } from "next/og";

/** Apple touch icon: same "##" motif at 180px (solid, no transparency). */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        backgroundColor: "#201D14",
        color: "#D9A054",
        display: "flex",
        fontSize: 104,
        fontWeight: 700,
        height: "100%",
        justifyContent: "center",
        letterSpacing: "-8px",
        width: "100%",
      }}
    >
      ##
    </div>,
    size,
  );
}
