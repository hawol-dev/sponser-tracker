import { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인",
  description: "Sponsor Tracker에 로그인하여 스폰서십을 관리하세요.",
  openGraph: {
    title: "로그인 | Sponsor Tracker",
    description: "Sponsor Tracker에 로그인하여 스폰서십을 관리하세요.",
  },
  alternates: {
    canonical: "/login",
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
