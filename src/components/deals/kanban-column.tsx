"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { DealCard } from "./deal-card";
import type { Deal, DealStatus } from "@/types/database";
import { DEAL_STATUS_LABELS } from "@/types/database";
import { KANBAN_COLORS } from "@/lib/constants/colors";

interface KanbanColumnProps {
  status: DealStatus;
  deals: Deal[];
}

export function KanbanColumn({ status, deals }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  const colors = KANBAN_COLORS[status];

  const totalAmount = deals.reduce((sum, deal) => {
    if (deal.currency === "USD") {
      return sum + deal.amount * 1400; // Approximate USD to KRW
    }
    return sum + deal.amount;
  }, 0);

  const formatTotalAmount = (amount: number) => {
    if (amount >= 10000) {
      return `${Math.round(amount / 10000)}만원`;
    }
    return `${amount.toLocaleString()}원`;
  };

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm ${
        isOver ? `ring-2 ${colors.ring} scale-[1.02]` : ""
      } flex-1 min-w-0 transition-all duration-200`}
    >
      {/* 헤더 */}
      <div className={`p-4 rounded-t-xl bg-gradient-to-r ${colors.header}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${colors.indicator}`} />
            <h3 className="font-semibold text-sm text-foreground">
              {DEAL_STATUS_LABELS[status]}
            </h3>
          </div>
          <span className="text-xs bg-white/[0.1] text-foreground px-2.5 py-1 rounded-full font-medium">
            {deals.length}
          </span>
        </div>
        {deals.length > 0 && (
          <p className="text-xs text-muted-foreground mt-2 pl-4">
            {formatTotalAmount(totalAmount)}
          </p>
        )}
      </div>

      {/* 카드 영역 */}
      <div className="flex-1 p-2 space-y-2 min-h-[200px] overflow-y-auto max-h-[calc(100vh-300px)]">
        <SortableContext
          items={deals.map((d) => d.id)}
          strategy={verticalListSortingStrategy}
        >
          {deals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </SortableContext>

        {deals.length === 0 && (
          <div className="h-20 flex items-center justify-center text-xs text-muted-foreground/60 border border-dashed border-white/[0.08] rounded-lg">
            드래그해서 여기에 놓으세요
          </div>
        )}
      </div>
    </div>
  );
}
