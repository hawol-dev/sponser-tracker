import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 192,
  height: 192,
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
          borderRadius: 32,
        }}
      >
        <div
          style={{
            width: 128,
            height: 128,
            borderRadius: 24,
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 80,
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
