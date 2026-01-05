import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getBrands } from "@/lib/actions/brands";
import { BrandsListClient } from "@/components/brands/brands-list-client";
import { BrandGridSkeleton } from "@/components/brands/brand-card-skeleton";
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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

      <Suspense fallback={<BrandsLoading />}>
        <BrandsList
          search={params.search}
          category={params.category}
        />
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

  return (
    <BrandsListClient
      brands={brands}
      currentSearch={search}
      currentCategory={category}
    />
  );
}

function BrandsLoading() {
  return <BrandGridSkeleton count={6} />;
}
