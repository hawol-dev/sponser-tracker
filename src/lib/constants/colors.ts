// 딜 상태별 컬러 정의
export const STATUS_COLORS = {
  pitching: {
    bg: "bg-zinc-500/15",
    text: "text-zinc-400",
    border: "border-zinc-500/30",
    dot: "bg-zinc-500",
    label: "제안 중",
  },
  negotiating: {
    bg: "bg-amber-500/15",
    text: "text-amber-400",
    border: "border-amber-500/30",
    dot: "bg-amber-500",
    label: "협상 중",
  },
  contracted: {
    bg: "bg-blue-500/15",
    text: "text-blue-400",
    border: "border-blue-500/30",
    dot: "bg-blue-500",
    label: "계약 완료",
  },
  producing: {
    bg: "bg-violet-500/15",
    text: "text-violet-400",
    border: "border-violet-500/30",
    dot: "bg-violet-500",
    label: "제작 중",
  },
  published: {
    bg: "bg-emerald-500/15",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    dot: "bg-emerald-500",
    label: "게시 완료",
  },
  paid: {
    bg: "bg-teal-500/15",
    text: "text-teal-400",
    border: "border-teal-500/30",
    dot: "bg-teal-500",
    label: "정산 완료",
  },
} as const;

// 칸반 컬럼별 컬러
export const KANBAN_COLORS = {
  pitching: {
    header: "from-zinc-500/20 to-zinc-600/10",
    ring: "ring-zinc-500/50",
    indicator: "bg-zinc-500",
  },
  negotiating: {
    header: "from-amber-500/20 to-amber-600/10",
    ring: "ring-amber-500/50",
    indicator: "bg-amber-500",
  },
  contracted: {
    header: "from-blue-500/20 to-blue-600/10",
    ring: "ring-blue-500/50",
    indicator: "bg-blue-500",
  },
  producing: {
    header: "from-violet-500/20 to-violet-600/10",
    ring: "ring-violet-500/50",
    indicator: "bg-violet-500",
  },
  published: {
    header: "from-emerald-500/20 to-emerald-600/10",
    ring: "ring-emerald-500/50",
    indicator: "bg-emerald-500",
  },
  paid: {
    header: "from-teal-500/20 to-teal-600/10",
    ring: "ring-teal-500/50",
    indicator: "bg-teal-500",
  },
} as const;

// 딜 상태 타입
export type DealStatus = keyof typeof STATUS_COLORS;

// 차트 컬러
export const CHART_COLORS = [
  "#8B5CF6", // violet
  "#06B6D4", // cyan
  "#10B981", // emerald
  "#F59E0B", // amber
  "#EC4899", // pink
  "#6366F1", // indigo
] as const;
