import type { ReactNode } from "react";

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  iconName: "dashboard" | "deals" | "brands" | "analytics" | "settings";
}

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: "dashboard",
    title: "대시보드",
    description: "스폰서십 현황을 한눈에 확인하세요. 이번 달 수익, 진행 중인 협찬, 곧 마감되는 협찬을 한 화면에서 볼 수 있습니다.",
    iconName: "dashboard",
  },
  {
    id: "deals",
    title: "협찬 관리",
    description: "칸반 보드로 협찬 진행 상태를 관리하세요. 드래그 앤 드롭으로 상태를 변경할 수 있습니다.",
    iconName: "deals",
  },
  {
    id: "brands",
    title: "브랜드",
    description: "협업하는 브랜드를 등록하고 관리하세요. 담당자 연락처와 협업 히스토리를 한 곳에서 관리할 수 있습니다.",
    iconName: "brands",
  },
  {
    id: "analytics",
    title: "수익 분석",
    description: "월별, 브랜드별 수익을 차트로 확인하세요. 어떤 협찬이 가장 효과적인지 데이터로 알 수 있습니다.",
    iconName: "analytics",
  },
  {
    id: "settings",
    title: "설정",
    description: "프로필 정보와 알림 설정을 관리하세요. 마감일 전 이메일 알림을 받을 수 있습니다.",
    iconName: "settings",
  },
];
