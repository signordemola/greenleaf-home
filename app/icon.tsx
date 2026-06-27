import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 24,
        background: "transparent",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 3a13 13 0 1 0 13 13h-9"
          stroke="#212121"
          strokeWidth="2.25"
          strokeLinecap="round"
        />
        <path
          d="M20.5 11.2c-4.25 0-7.7 3.45-7.7 7.7 0 .35.03.69.08 1.02.33.05.67.08 1.02.08 4.25 0 7.7-3.45 7.7-7.7 0-.35-.03-.69-.08-1.02a7.9 7.9 0 0 0-1.02-.08z"
          fill="oklch(0.45 0.08 148)"
        />
      </svg>
    </div>,
    { ...size },
  );
}
