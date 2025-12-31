import { Suspense } from "react";
import {
  getMonthlyRevenue,
  getBrandRevenue,
  getAnalyticsSummary,
} from "@/lib/actions/analytics";
import { StatsCards } from "@/components/analytics/stats-cards";
import { MonthlyChart } from "@/components/analytics/monthly-chart";
import { BrandChart } from "@/components/analytics/brand-chart";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">수익 분석</h1>
        <p className="text-muted-foreground">수익 현황을 분석하세요</p>
      </div>

      <Suspense fallback={<StatsLoading />}>
        <StatsWrapper />
      </Suspense>

      <div className="grid gap-6 lg:grid-cols-2">
        <Suspense fallback={<ChartLoading />}>
          <MonthlyChartWrapper />
        </Suspense>

        <Suspense fallback={<ChartLoading />}>
          <BrandChartWrapper />
        </Suspense>
      </div>
    </div>
  );
}

async function StatsWrapper() {
  const summary = await getAnalyticsSummary();
  return <StatsCards summary={summary} />;
}

async function MonthlyChartWrapper() {
  const data = await getMonthlyRevenue();
  return <MonthlyChart data={data} />;
}

async function BrandChartWrapper() {
  const data = await getBrandRevenue();
  return <BrandChart data={data} />;
}

function StatsLoading() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-28 animate-pulse rounded-lg bg-muted" />
      ))}
    </div>
  );
}

function ChartLoading() {
  return <div className="h-[380px] animate-pulse rounded-lg bg-muted" />;
}
