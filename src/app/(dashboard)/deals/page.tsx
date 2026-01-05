import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getDeals, getBrandsForSelect } from "@/lib/actions/deals";
import { DealKanban } from "@/components/deals/deal-kanban";
import { DealFilters } from "@/components/deals/deal-filters";
import { KanbanBoardSkeleton } from "@/components/deals/deal-card-skeleton";
import { EmptyState, EmptyStateIcons } from "@/components/ui/empty-state";
import type { DealStatus } from "@/types/database";

interface DealsPageProps {
  searchParams: Promise<{
    search?: string;
    status?: DealStatus;
    brandId?: string;
  }>;
}

export default async function DealsPage({ searchParams }: DealsPageProps) {
  const params = await searchParams;
  const brands = await getBrandsForSelect();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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

      <DealFilters
        currentSearch={params.search}
        currentStatus={params.status}
        currentBrandId={params.brandId}
        brands={brands}
      />

      <Suspense fallback={<KanbanLoading />}>
        <DealsKanbanWrapper
          search={params.search}
          status={params.status}
          brandId={params.brandId}
        />
      </Suspense>
    </div>
  );
}

interface DealsKanbanWrapperProps {
  search?: string;
  status?: DealStatus;
  brandId?: string;
}

async function DealsKanbanWrapper({ search, status, brandId }: DealsKanbanWrapperProps) {
  const deals = await getDeals({ search, status, brandId });
  const hasFilters = search || status || brandId;

  if (deals.length === 0) {
    if (hasFilters) {
      return (
        <EmptyState
          icon={EmptyStateIcons.deals}
          title="검색 결과가 없습니다"
          description="다른 검색어나 필터를 시도해보세요."
          action={{
            label: "필터 초기화",
            href: "/deals",
          }}
        />
      );
    }

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
  return <KanbanBoardSkeleton />;
}
