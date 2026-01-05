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
import type { BrandCategory } from "@/types/database";
import { CATEGORY_LABELS } from "@/types/database";
import type { BrandSortBy, SortOrder } from "@/lib/actions/brands";
import { Search, X, ArrowUpDown } from "lucide-react";

const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "created_at-desc", label: "최근 추가순" },
  { value: "created_at-asc", label: "오래된순" },
  { value: "name-asc", label: "이름 (A-Z)" },
  { value: "name-desc", label: "이름 (Z-A)" },
  { value: "category-asc", label: "카테고리순" },
];

interface BrandFiltersProps {
  currentSearch?: string;
  currentCategory?: BrandCategory;
  currentSortBy?: BrandSortBy;
  currentSortOrder?: SortOrder;
}

export function BrandFilters({
  currentSearch,
  currentCategory,
  currentSortBy,
  currentSortOrder,
}: BrandFiltersProps) {
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
        router.push(`/brands?${params.toString()}`);
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

  const handleCategoryChange = useCallback(
    (value: string) => {
      updateFilters({ category: value === "all" ? null : value });
    },
    [updateFilters]
  );

  const handleSortChange = useCallback(
    (value: string) => {
      const [sortBy, sortOrder] = value.split("-") as [BrandSortBy, SortOrder];
      updateFilters({ sortBy, sortOrder });
    },
    [updateFilters]
  );

  const clearFilters = useCallback(() => {
    setSearchValue("");
    startTransition(() => {
      router.push("/brands");
    });
  }, [router]);

  const hasFilters = currentSearch || currentCategory ||
    (currentSortBy && currentSortBy !== "created_at") ||
    (currentSortOrder && currentSortOrder !== "desc");

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
      <form onSubmit={handleSearch} className="flex gap-2 flex-1">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="브랜드명 검색..."
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
          value={currentCategory || "all"}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="카테고리" />
          </SelectTrigger>
          <SelectContent position="popper" sideOffset={4}>
            <SelectItem value="all">전체 카테고리</SelectItem>
            {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
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
