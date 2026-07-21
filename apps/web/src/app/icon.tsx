import { ImageResponse } from "next/og";

/** Favicon: the "##" markdown motif on the code-bg tile (DESIGN.md tokens). */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        backgroundColor: "#201D14",
        borderRadius: 7,
        color: "#D9A054",
        display: "flex",
        fontSize: 20,
        fontWeight: 700,
        height: "100%",
        justifyContent: "center",
        letterSpacing: "-2px",
        width: "100%",
      }}
    >
      ##
    </div>,
    size,
  );
}
