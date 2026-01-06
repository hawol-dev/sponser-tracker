import { Metadata } from "next";

export const metadata: Metadata = {
  title: "회원가입",
  description: "Sponsor Tracker에 가입하고 스폰서십 관리를 시작하세요. 무료로 시작할 수 있습니다.",
  openGraph: {
    title: "회원가입 | Sponsor Tracker",
    description: "Sponsor Tracker에 가입하고 스폰서십 관리를 시작하세요.",
  },
  alternates: {
    canonical: "/signup",
  },
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
