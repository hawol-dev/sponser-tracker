import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://sponsortracker.io";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Sponsor Tracker - 스폰서십 관리 플랫폼",
    template: "%s | Sponsor Tracker",
  },
  description: "크리에이터를 위한 스폰서십 & 브랜드 협찬 관리 도구. 협찬 제안부터 정산까지 한 곳에서 관리하세요.",
  keywords: ["스폰서십", "협찬", "크리에이터", "유튜버", "브랜드", "인플루언서", "협찬관리", "스폰서관리"],
  authors: [{ name: "Sponsor Tracker" }],
  creator: "Sponsor Tracker",
  publisher: "Sponsor Tracker",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: baseUrl,
    siteName: "Sponsor Tracker",
    title: "Sponsor Tracker - 스폰서십 관리 플랫폼",
    description: "크리에이터를 위한 스폰서십 & 브랜드 협찬 관리 도구. 협찬 제안부터 정산까지 한 곳에서 관리하세요.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sponsor Tracker - 스폰서십 관리 플랫폼",
    description: "크리에이터를 위한 스폰서십 & 브랜드 협찬 관리 도구",
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: baseUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "Sponsor Tracker",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/icon-512`,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      url: baseUrl,
      name: "Sponsor Tracker",
      description: "크리에이터를 위한 스폰서십 & 브랜드 협찬 관리 도구",
      publisher: {
        "@id": `${baseUrl}/#organization`,
      },
      inLanguage: "ko-KR",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${baseUrl}/#application`,
      name: "Sponsor Tracker",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "0",
        highPrice: "9900",
        priceCurrency: "KRW",
        offerCount: 2,
      },
      description: "크리에이터를 위한 스폰서십 & 브랜드 협찬 관리 도구. 협찬 제안부터 정산까지 한 곳에서 관리하세요.",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const stored = localStorage.getItem('sponsor-tracker-theme');
                const theme = stored || 'system';
                const resolved = theme === 'system'
                  ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
                  : theme;
                document.documentElement.classList.add(resolved);
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
