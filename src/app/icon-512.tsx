import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 512,
  height: 512,
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
          borderRadius: 96,
        }}
      >
        <div
          style={{
            width: 340,
            height: 340,
            borderRadius: 64,
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 200,
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
