"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BrandRevenue } from "@/lib/actions/analytics";

interface BrandChartProps {
  data: BrandRevenue[];
}

const COLORS = [
  "#06b6d4",
  "#0891b2",
  "#0e7490",
  "#155e75",
  "#164e63",
];

const formatRevenue = (value: number) => {
  if (value >= 10000000) {
    return `${(value / 10000000).toFixed(1)}천만`;
  }
  if (value >= 10000) {
    return `${Math.round(value / 10000)}만`;
  }
  return value.toLocaleString();
};

interface TooltipPayload {
  value: number;
  payload: BrandRevenue;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-zinc-900 border border-white/10 rounded-lg shadow-lg p-3">
        <p className="font-medium text-white">{data.brandName}</p>
        <p className="text-cyan-400">
          수익: {data.revenue.toLocaleString()}원
        </p>
        <p className="text-zinc-400 text-sm">
          협찬 수: {data.count}건
        </p>
      </div>
    );
  }
  return null;
};

export function BrandChart({ data }: BrandChartProps) {
  const hasData = data.length > 0 && data.some((d) => d.revenue > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>브랜드별 수익 TOP 10</CardTitle>
      </CardHeader>
      <CardContent>
        {hasData ? (
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  type="number"
                  tickFormatter={formatRevenue}
                  stroke="#71717a"
                  fontSize={12}
                />
                <YAxis
                  type="category"
                  dataKey="brandName"
                  width={100}
                  stroke="#71717a"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            아직 브랜드별 수익 데이터가 없습니다
          </div>
        )}
      </CardContent>
    </Card>
  );
}
