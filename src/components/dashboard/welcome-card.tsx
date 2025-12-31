"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface WelcomeCardProps {
  userName?: string;
}

const steps = [
  {
    step: 1,
    title: "브랜드 추가",
    description: "협업할 브랜드를 등록하세요",
    href: "/brands/new",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
        <path d="M3 9V7a2 2 0 0 1 2-2h2" />
        <path d="M7 5V3" />
        <path d="M17 5h2a2 2 0 0 1 2 2v2" />
        <path d="M17 5V3" />
      </svg>
    ),
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
  {
    step: 2,
    title: "딜 생성",
    description: "첫 스폰서십 딜을 만드세요",
    href: "/deals/new",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 3h5v5" />
        <path d="M8 3H3v5" />
        <path d="M21 3l-7 7" />
        <path d="M3 3l7 7" />
        <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5" />
      </svg>
    ),
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/20",
  },
  {
    step: 3,
    title: "칸반으로 관리",
    description: "진행 상태를 시각적으로 추적하세요",
    href: "/deals",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="7" height="9" x="3" y="3" rx="1" />
        <rect width="7" height="5" x="14" y="3" rx="1" />
        <rect width="7" height="9" x="14" y="12" rx="1" />
        <rect width="7" height="5" x="3" y="16" rx="1" />
      </svg>
    ),
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
  },
];

export function WelcomeCard({ userName }: WelcomeCardProps) {
  const displayName = userName?.split(" ")[0] || "크리에이터";

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600/20 via-purple-600/10 to-indigo-600/20 border border-white/[0.08] p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                환영합니다, {displayName}님!
              </h2>
              <p className="text-white/60">스폰서십 관리를 시작해볼까요?</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start Steps */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-4">
          시작하기
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {steps.map((item) => (
            <Link key={item.step} href={item.href}>
              <Card className={`group cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-500/5 border ${item.borderColor} hover:border-violet-500/30`}>
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl ${item.bgColor} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                      <span className={`text-transparent bg-gradient-to-r ${item.color} bg-clip-text font-bold text-sm`}>
                        {item.step}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-medium text-foreground mb-1 flex items-center gap-2">
                        {item.title}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-violet-400"
                        >
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Action */}
      <div className="flex items-center justify-center pt-2">
        <Link href="/deals/new">
          <Button size="lg" className="gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            첫 딜 만들기
          </Button>
        </Link>
      </div>
    </div>
  );
}
