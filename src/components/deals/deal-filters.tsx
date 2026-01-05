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
import { Search } from "lucide-react";

interface Brand {
  id: string;
  name: string;
}

interface DealFiltersProps {
  currentSearch?: string;
  currentStatus?: DealStatus;
  currentBrandId?: string;
  brands: Brand[];
}

export function DealFilters({
  currentSearch,
  currentStatus,
  currentBrandId,
  brands,
}: DealFiltersProps) {
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

      <div className="flex gap-2 items-center">
        <Select
          value={currentStatus || "all"}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="w-[120px]">
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
          <SelectTrigger className="w-[130px]">
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
      </div>
    </div>
  );
}
