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
import { Search, ArrowUpDown } from "lucide-react";

export type SortOption = "created_at-desc" | "created_at-asc" | "name-asc" | "name-desc";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "created_at-desc", label: "최근 추가순" },
  { value: "created_at-asc", label: "오래된순" },
  { value: "name-asc", label: "이름순 (A-Z)" },
  { value: "name-desc", label: "이름순 (Z-A)" },
];

interface BrandFiltersProps {
  currentSearch?: string;
  currentCategory?: BrandCategory;
  sortValue: SortOption;
  onSortChange: (value: SortOption) => void;
}

export function BrandFilters({
  currentSearch,
  currentCategory,
  sortValue,
  onSortChange,
}: BrandFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(currentSearch || "");

  useEffect(() => {
    setSearchValue(currentSearch || "");
  }, [currentSearch]);

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

      <div className="flex gap-2 items-center">
        <Select
          value={currentCategory || "all"}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger className="w-[140px]">
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

        <Select value={sortValue} onValueChange={(v) => onSortChange(v as SortOption)}>
          <SelectTrigger className="w-[145px]">
            <ArrowUpDown className="h-4 w-4 mr-2 shrink-0" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="popper" sideOffset={4}>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
