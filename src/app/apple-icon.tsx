import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000",
          borderRadius: 40,
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 24,
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 72,
            fontWeight: 700,
            color: "#000",
          }}
        >
          S
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
