"use client";

import { useState, useMemo } from "react";
import { BrandCard } from "./brand-card";
import { BrandFilters, type SortOption } from "./brand-filters";
import { EmptyState, EmptyStateIcons } from "@/components/ui/empty-state";
import type { Brand, BrandCategory } from "@/types/database";

interface BrandsListClientProps {
  brands: Brand[];
  currentSearch?: string;
  currentCategory?: BrandCategory;
}

export function BrandsListClient({
  brands,
  currentSearch,
  currentCategory,
}: BrandsListClientProps) {
  const [sortValue, setSortValue] = useState<SortOption>("created_at-desc");

  const sortedBrands = useMemo(() => {
    const sorted = [...brands];
    const [field, order] = sortValue.split("-") as [string, "asc" | "desc"];

    sorted.sort((a, b) => {
      let comparison = 0;

      if (field === "created_at") {
        comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      } else if (field === "name") {
        comparison = a.name.localeCompare(b.name, "ko");
      }

      return order === "desc" ? -comparison : comparison;
    });

    return sorted;
  }, [brands, sortValue]);

  if (brands.length === 0) {
    if (currentSearch || currentCategory) {
      return (
        <>
          <BrandFilters
            currentSearch={currentSearch}
            currentCategory={currentCategory}
            sortValue={sortValue}
            onSortChange={setSortValue}
          />
          <EmptyState
            icon={EmptyStateIcons.search}
            title="검색 결과가 없습니다"
            description="다른 검색어나 필터를 시도해보세요."
            variant="card"
          />
        </>
      );
    }

    return (
      <EmptyState
        icon={EmptyStateIcons.brands}
        title="아직 등록된 브랜드가 없습니다"
        description="협업하는 브랜드를 등록하면 협찬 생성 시 빠르게 연결할 수 있어요."
        action={{
          label: "첫 브랜드 추가",
          href: "/brands/new",
        }}
      />
    );
  }

  return (
    <>
      <BrandFilters
        currentSearch={currentSearch}
        currentCategory={currentCategory}
        sortValue={sortValue}
        onSortChange={setSortValue}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedBrands.map((brand) => (
          <BrandCard key={brand.id} brand={brand} />
        ))}
      </div>
    </>
  );
}
