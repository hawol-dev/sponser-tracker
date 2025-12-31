"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition, useCallback } from "react";
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

interface BrandFiltersProps {
  currentSearch?: string;
  currentCategory?: BrandCategory;
}

export function BrandFilters({ currentSearch, currentCategory }: BrandFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(currentSearch || "");

  const updateFilters = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      startTransition(() => {
        router.push(`/brands?${params.toString()}`);
      });
    },
    [router, searchParams]
  );

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      updateFilters("search", searchValue || null);
    },
    [searchValue, updateFilters]
  );

  const handleCategoryChange = useCallback(
    (value: string) => {
      updateFilters("category", value === "all" ? null : value);
    },
    [updateFilters]
  );

  const clearFilters = useCallback(() => {
    setSearchValue("");
    startTransition(() => {
      router.push("/brands");
    });
  }, [router]);

  const hasFilters = currentSearch || currentCategory;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <form onSubmit={handleSearch} className="flex gap-2 flex-1">
        <Input
          placeholder="브랜드명 검색..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="max-w-xs"
        />
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
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
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
          >
            필터 초기화
          </Button>
        )}
      </div>
    </div>
  );
}
