import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Sponsor Tracker - 스폰서십 관리 플랫폼";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000",
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.15), transparent 50%)",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 16,
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 48,
              fontWeight: 700,
              color: "#000",
            }}
          >
            S
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#fff",
              marginBottom: 16,
              fontFamily: "Georgia, serif",
            }}
          >
            Sponsor Tracker
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#71717a",
              marginBottom: 24,
            }}
          >
            스폰서십 관리 플랫폼
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#06b6d4",
            }}
          >
            피칭부터 결제까지, 한 곳에서
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
