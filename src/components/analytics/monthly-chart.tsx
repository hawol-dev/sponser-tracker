"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MonthlyRevenue } from "@/lib/actions/analytics";

interface MonthlyChartProps {
  data: MonthlyRevenue[];
}

const formatMonth = (month: string) => {
  const [, m] = month.split("-");
  return `${m}월`;
};

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
  payload: MonthlyRevenue;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length && label) {
    const [year, month] = label.split("-");
    return (
      <div className="bg-zinc-900 border border-white/10 rounded-lg shadow-lg p-3">
        <p className="font-medium text-white">{`${year}년 ${month}월`}</p>
        <p className="text-cyan-400">
          수익: {payload[0].value.toLocaleString()}원
        </p>
        <p className="text-zinc-400 text-sm">
          협찬 수: {payload[0].payload.count}건
        </p>
      </div>
    );
  }
  return null;
};

export function MonthlyChart({ data }: MonthlyChartProps) {
  const hasData = data.some((d) => d.revenue > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>월별 수익 추이</CardTitle>
      </CardHeader>
      <CardContent>
        {hasData ? (
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="month"
                  tickFormatter={formatMonth}
                  stroke="#71717a"
                  fontSize={12}
                />
                <YAxis
                  tickFormatter={formatRevenue}
                  stroke="#71717a"
                  fontSize={12}
                  width={60}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            아직 수익 데이터가 없습니다
          </div>
        )}
      </CardContent>
    </Card>
  );
}
