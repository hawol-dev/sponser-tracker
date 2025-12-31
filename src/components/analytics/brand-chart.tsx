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
  "hsl(var(--primary))",
  "hsl(var(--primary) / 0.8)",
  "hsl(var(--primary) / 0.6)",
  "hsl(var(--primary) / 0.4)",
  "hsl(var(--primary) / 0.3)",
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

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white border rounded-lg shadow-lg p-3">
        <p className="font-medium">{data.brandName}</p>
        <p className="text-primary">
          수익: {data.revenue.toLocaleString()}원
        </p>
        <p className="text-muted-foreground text-sm">
          딜 수: {data.count}건
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
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  type="number"
                  tickFormatter={formatRevenue}
                  className="text-xs"
                />
                <YAxis
                  type="category"
                  dataKey="brandName"
                  width={100}
                  className="text-xs"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
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
