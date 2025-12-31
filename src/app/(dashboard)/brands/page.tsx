import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getBrands } from "@/lib/actions/brands";
import { BrandCard } from "@/components/brands/brand-card";
import { BrandFilters } from "@/components/brands/brand-filters";
import { EmptyState, EmptyStateIcons } from "@/components/ui/empty-state";
import type { BrandCategory } from "@/types/database";

interface BrandsPageProps {
  searchParams: Promise<{
    search?: string;
    category?: BrandCategory;
  }>;
}

export default async function BrandsPage({ searchParams }: BrandsPageProps) {
  const params = await searchParams;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">브랜드</h1>
          <p className="text-muted-foreground">협업 브랜드를 관리하세요</p>
        </div>
        <Link href="/brands/new">
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
            브랜드 추가
          </Button>
        </Link>
      </div>

      <BrandFilters
        currentSearch={params.search}
        currentCategory={params.category}
      />

      <Suspense fallback={<BrandsLoading />}>
        <BrandsList search={params.search} category={params.category} />
      </Suspense>
    </div>
  );
}

async function BrandsList({
  search,
  category,
}: {
  search?: string;
  category?: BrandCategory;
}) {
  const brands = await getBrands({ search, category });

  if (brands.length === 0) {
    if (search || category) {
      return (
        <EmptyState
          icon={EmptyStateIcons.search}
          title="검색 결과가 없습니다"
          description="다른 검색어나 필터를 시도해보세요."
          variant="card"
        />
      );
    }

    return (
      <EmptyState
        icon={EmptyStateIcons.brands}
        title="아직 등록된 브랜드가 없습니다"
        description="협업하는 브랜드를 등록하면 딜 생성 시 빠르게 연결할 수 있어요. 담당자 정보도 함께 관리해보세요."
        action={{
          label: "첫 브랜드 추가",
          href: "/brands/new",
        }}
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {brands.map((brand) => (
        <BrandCard key={brand.id} brand={brand} />
      ))}
    </div>
  );
}

function BrandsLoading() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-32 animate-pulse rounded-lg border bg-muted"
        />
      ))}
    </div>
  );
}
