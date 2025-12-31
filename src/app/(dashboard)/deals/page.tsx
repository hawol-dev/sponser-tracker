import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getDeals } from "@/lib/actions/deals";
import { DealKanban } from "@/components/deals/deal-kanban";
import { EmptyState, EmptyStateIcons } from "@/components/ui/empty-state";

export default function DealsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">딜 관리</h1>
          <p className="text-muted-foreground">스폰서십 딜을 관리하세요</p>
        </div>
        <Link href="/deals/new">
          <Button>
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
              className="mr-2"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            새 딜 추가
          </Button>
        </Link>
      </div>

      <Suspense fallback={<KanbanLoading />}>
        <DealsKanbanWrapper />
      </Suspense>
    </div>
  );
}

async function DealsKanbanWrapper() {
  const deals = await getDeals();

  if (deals.length === 0) {
    return (
      <EmptyState
        icon={EmptyStateIcons.deals}
        title="아직 등록된 딜이 없습니다"
        description="첫 스폰서십 딜을 만들어 수익을 추적하세요. 칸반 보드로 진행 상태를 한눈에 관리할 수 있습니다."
        action={{
          label: "첫 딜 만들기",
          href: "/deals/new",
        }}
        secondaryAction={{
          label: "브랜드 먼저 추가",
          href: "/brands/new",
        }}
      />
    );
  }

  return <DealKanban initialDeals={deals} />;
}

function KanbanLoading() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="min-w-[280px] h-[400px] animate-pulse rounded-lg bg-muted"
        />
      ))}
    </div>
  );
}
