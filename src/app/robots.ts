import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://sponsortracker.io";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/login", "/signup", "/privacy", "/terms", "/refund"],
      disallow: ["/dashboard", "/deals", "/brands", "/analytics", "/settings", "/auth", "/api"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
