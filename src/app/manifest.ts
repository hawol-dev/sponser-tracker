import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sponsor Tracker",
    short_name: "Sponsor Tracker",
    description: "크리에이터를 위한 스폰서십 & 브랜드 협찬 관리 도구",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#06b6d4",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/icon-192",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
