"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Deal } from "@/types/database";
import { CONTENT_TYPE_LABELS } from "@/types/database";

interface DealCardProps {
  deal: Deal;
}

export function DealCard({ deal }: DealCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: deal.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const formatAmount = (amount: number, currency: string) => {
    if (currency === "KRW") {
      return new Intl.NumberFormat("ko-KR", {
        style: "currency",
        currency: "KRW",
        maximumFractionDigits: 0,
      }).format(amount);
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("ko-KR", {
      month: "short",
      day: "numeric",
    });
  };

  const isOverdue = deal.deadline && new Date(deal.deadline) < new Date();

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Link href={`/deals/${deal.id}`}>
        <Card className="cursor-grab hover:border-cyan-500/30 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-200 active:cursor-grabbing bg-white/[0.04] border-white/[0.06]">
          <CardContent className="p-3.5 space-y-2.5">
            {/* 제목 */}
            <p className="font-medium text-sm line-clamp-2 text-foreground">{deal.title}</p>

            {/* 브랜드 */}
            {deal.brand && (
              <p className="text-xs text-muted-foreground">{deal.brand.name}</p>
            )}

            {/* 금액 */}
            <p className="text-sm font-bold bg-gradient-to-r from-cyan-400 to-cyan-400 bg-clip-text text-transparent">
              {formatAmount(deal.amount, deal.currency)}
            </p>

            {/* 태그들 */}
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="secondary" className="text-xs">
                {CONTENT_TYPE_LABELS[deal.content_type]}
              </Badge>
              {deal.deadline && (
                <Badge
                  variant={isOverdue ? "destructive" : "outline"}
                  className="text-xs"
                >
                  {formatDate(deal.deadline)}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
