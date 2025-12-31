"use server";

import { createClient } from "@/lib/supabase/server";
import type { Deal, DealStatus } from "@/types/database";

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  count: number;
}

export interface BrandRevenue {
  brandId: string;
  brandName: string;
  revenue: number;
  count: number;
}

export interface StatusSummary {
  status: DealStatus;
  count: number;
  totalAmount: number;
}

export interface AnalyticsSummary {
  totalRevenue: number;
  totalDeals: number;
  paidRevenue: number;
  pendingRevenue: number;
  avgDealSize: number;
}

// 월별 수익 (최근 12개월)
export async function getMonthlyRevenue(): Promise<MonthlyRevenue[]> {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("인증이 필요합니다");

  // 최근 12개월 데이터
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11);
  twelveMonthsAgo.setDate(1);

  const { data: deals, error } = await supabase
    .from("deals")
    .select("amount, currency, created_at, status")
    .eq("user_id", user.id)
    .gte("created_at", twelveMonthsAgo.toISOString());

  if (error) throw error;

  // 월별로 그룹화
  const monthlyMap = new Map<string, { revenue: number; count: number }>();

  // 최근 12개월 초기화
  for (let i = 11; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    monthlyMap.set(key, { revenue: 0, count: 0 });
  }

  // 데이터 집계
  deals?.forEach((deal) => {
    const date = new Date(deal.created_at);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

    if (monthlyMap.has(key)) {
      const current = monthlyMap.get(key)!;
      const amount = deal.currency === "USD" ? deal.amount * 1400 : deal.amount;
      current.revenue += amount;
      current.count += 1;
    }
  });

  return Array.from(monthlyMap.entries()).map(([month, data]) => ({
    month,
    revenue: data.revenue,
    count: data.count,
  }));
}

// 브랜드별 수익
export async function getBrandRevenue(): Promise<BrandRevenue[]> {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("인증이 필요합니다");

  const { data: deals, error } = await supabase
    .from("deals")
    .select("amount, currency, brand:brands(id, name)")
    .eq("user_id", user.id);

  if (error) throw error;

  // 브랜드별로 그룹화
  const brandMap = new Map<string, { name: string; revenue: number; count: number }>();

  const getBrandInfo = (brand: any) => {
    if (!brand) return { id: "no-brand", name: "브랜드 없음" };
    if (Array.isArray(brand)) return { id: brand[0]?.id || "no-brand", name: brand[0]?.name || "브랜드 없음" };
    return { id: brand.id || "no-brand", name: brand.name || "브랜드 없음" };
  };

  deals?.forEach((deal) => {
    const { id: brandId, name: brandName } = getBrandInfo(deal.brand);
    const amount = deal.currency === "USD" ? deal.amount * 1400 : deal.amount;

    if (!brandMap.has(brandId)) {
      brandMap.set(brandId, { name: brandName, revenue: 0, count: 0 });
    }

    const current = brandMap.get(brandId)!;
    current.revenue += amount;
    current.count += 1;
  });

  return Array.from(brandMap.entries())
    .map(([brandId, data]) => ({
      brandId,
      brandName: data.name,
      revenue: data.revenue,
      count: data.count,
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10); // 상위 10개
}

// 상태별 요약
export async function getStatusSummary(): Promise<StatusSummary[]> {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("인증이 필요합니다");

  const { data: deals, error } = await supabase
    .from("deals")
    .select("status, amount, currency")
    .eq("user_id", user.id);

  if (error) throw error;

  const statusMap = new Map<DealStatus, { count: number; totalAmount: number }>();

  deals?.forEach((deal) => {
    const status = deal.status as DealStatus;
    const amount = deal.currency === "USD" ? deal.amount * 1400 : deal.amount;

    if (!statusMap.has(status)) {
      statusMap.set(status, { count: 0, totalAmount: 0 });
    }

    const current = statusMap.get(status)!;
    current.count += 1;
    current.totalAmount += amount;
  });

  return Array.from(statusMap.entries()).map(([status, data]) => ({
    status,
    count: data.count,
    totalAmount: data.totalAmount,
  }));
}

// 전체 요약
export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("인증이 필요합니다");

  const { data: deals, error } = await supabase
    .from("deals")
    .select("status, amount, currency")
    .eq("user_id", user.id);

  if (error) throw error;

  let totalRevenue = 0;
  let paidRevenue = 0;
  let pendingRevenue = 0;

  deals?.forEach((deal) => {
    const amount = deal.currency === "USD" ? deal.amount * 1400 : deal.amount;
    totalRevenue += amount;

    if (deal.status === "paid") {
      paidRevenue += amount;
    } else {
      pendingRevenue += amount;
    }
  });

  return {
    totalRevenue,
    totalDeals: deals?.length || 0,
    paidRevenue,
    pendingRevenue,
    avgDealSize: deals?.length ? totalRevenue / deals.length : 0,
  };
}
