"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition, useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { DealStatus } from "@/types/database";
import { DEAL_STATUS_LABELS } from "@/types/database";
import type { DealSortBy, SortOrder } from "@/lib/actions/deals";
import { Search, X, ArrowUpDown } from "lucide-react";

const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "created_at-desc", label: "최근 추가순" },
  { value: "created_at-asc", label: "오래된순" },
  { value: "amount-desc", label: "금액 높은순" },
  { value: "amount-asc", label: "금액 낮은순" },
  { value: "deadline-asc", label: "마감일 빠른순" },
  { value: "deadline-desc", label: "마감일 느린순" },
  { value: "title-asc", label: "제목 (A-Z)" },
];

interface Brand {
  id: string;
  name: string;
}

interface DealFiltersProps {
  currentSearch?: string;
  currentStatus?: DealStatus;
  currentBrandId?: string;
  currentSortBy?: DealSortBy;
  currentSortOrder?: SortOrder;
  brands: Brand[];
}

export function DealFilters({
  currentSearch,
  currentStatus,
  currentBrandId,
  currentSortBy,
  currentSortOrder,
  brands,
}: DealFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(currentSearch || "");

  // URL 파라미터가 변경되면 검색값 동기화
  useEffect(() => {
    setSearchValue(currentSearch || "");
  }, [currentSearch]);

  const currentSort = `${currentSortBy || "created_at"}-${currentSortOrder || "desc"}`;

  const updateFilters = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      startTransition(() => {
        router.push(`/deals?${params.toString()}`);
      });
    },
    [router, searchParams]
  );

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      updateFilters({ search: searchValue || null });
    },
    [searchValue, updateFilters]
  );

  const handleStatusChange = useCallback(
    (value: string) => {
      updateFilters({ status: value === "all" ? null : value });
    },
    [updateFilters]
  );

  const handleBrandChange = useCallback(
    (value: string) => {
      updateFilters({ brandId: value === "all" ? null : value });
    },
    [updateFilters]
  );

  const handleSortChange = useCallback(
    (value: string) => {
      const [sortBy, sortOrder] = value.split("-") as [DealSortBy, SortOrder];
      updateFilters({ sortBy, sortOrder });
    },
    [updateFilters]
  );

  const clearFilters = useCallback(() => {
    setSearchValue("");
    startTransition(() => {
      router.push("/deals");
    });
  }, [router]);

  const hasFilters = currentSearch || currentStatus || currentBrandId ||
    (currentSortBy && currentSortBy !== "created_at") ||
    (currentSortOrder && currentSortOrder !== "desc");

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
      <form onSubmit={handleSearch} className="flex gap-2 flex-1">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="딜 제목 또는 브랜드명 검색..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button type="submit" variant="secondary" disabled={isPending}>
          검색
        </Button>
      </form>

      <div className="flex flex-wrap gap-2 items-center">
        <Select
          value={currentStatus || "all"}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="상태" />
          </SelectTrigger>
          <SelectContent position="popper" sideOffset={4}>
            <SelectItem value="all">전체 상태</SelectItem>
            {Object.entries(DEAL_STATUS_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={currentBrandId || "all"}
          onValueChange={handleBrandChange}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="브랜드" />
          </SelectTrigger>
          <SelectContent position="popper" sideOffset={4}>
            <SelectItem value="all">전체 브랜드</SelectItem>
            {brands.map((brand) => (
              <SelectItem key={brand.id} value={brand.id}>
                {brand.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={currentSort} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[150px]">
            <ArrowUpDown className="h-4 w-4 mr-2" />
            <SelectValue placeholder="정렬" />
          </SelectTrigger>
          <SelectContent position="popper" sideOffset={4}>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            disabled={isPending}
            className="gap-1"
          >
            <X className="h-4 w-4" />
            초기화
          </Button>
        )}
      </div>
    </div>
  );
}
