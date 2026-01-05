"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusPicker } from "./status-picker";
import type { Deal, DealStatus } from "@/types/database";
import { DEAL_STATUS_LABELS, CONTENT_TYPE_LABELS } from "@/types/database";
import { ChevronLeft, ChevronRight, MoveHorizontal } from "lucide-react";

const STATUSES: DealStatus[] = [
  "pitching",
  "negotiating",
  "contracted",
  "producing",
  "published",
  "paid",
];

const STATUS_COLORS: Record<DealStatus, string> = {
  pitching: "bg-blue-500",
  negotiating: "bg-yellow-500",
  contracted: "bg-purple-500",
  producing: "bg-orange-500",
  published: "bg-green-500",
  paid: "bg-emerald-500",
};

interface MobileKanbanProps {
  deals: Deal[];
  onDealsChange?: (deals: Deal[]) => void;
}

export function MobileKanban({ deals: initialDeals, onDealsChange }: MobileKanbanProps) {
  const [deals, setDeals] = useState(initialDeals);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [isStatusPickerOpen, setIsStatusPickerOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync with parent
  useEffect(() => {
    setDeals(initialDeals);
  }, [initialDeals]);

  const currentStatus = STATUSES[currentIndex];
  const statusDeals = deals.filter((deal) => deal.status === currentStatus);

  const goToStatus = (index: number) => {
    if (index >= 0 && index < STATUSES.length) {
      setCurrentIndex(index);
    }
  };

  const handleStatusChange = (dealId: string, newStatus: DealStatus) => {
    const updatedDeals = deals.map((d) =>
      d.id === dealId ? { ...d, status: newStatus } : d
    );
    setDeals(updatedDeals);
    onDealsChange?.(updatedDeals);
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

  return (
    <div className="space-y-4">
      {/* Status Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4">
        {STATUSES.map((status, index) => {
          const count = deals.filter((d) => d.status === status).length;
          const isActive = index === currentIndex;

          return (
            <button
              key={status}
              onClick={() => goToStatus(index)}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap transition-all
                ${isActive
                  ? "bg-cyan-500/20 border border-cyan-500/30"
                  : "bg-white/[0.04] border border-white/[0.06] opacity-60"
                }
              `}
            >
              <div className={`w-2 h-2 rounded-full ${STATUS_COLORS[status]}`} />
              <span className="text-sm font-medium">{DEAL_STATUS_LABELS[status]}</span>
              <span className="text-xs text-muted-foreground">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => goToStatus(currentIndex - 1)}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          이전
        </Button>
        <div className="flex gap-1">
          {STATUSES.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-cyan-500" : "bg-white/20"
              }`}
            />
          ))}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => goToStatus(currentIndex + 1)}
          disabled={currentIndex === STATUSES.length - 1}
        >
          다음
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      {/* Deal Cards */}
      <div ref={containerRef} className="space-y-3">
        {statusDeals.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>{DEAL_STATUS_LABELS[currentStatus]} 상태의 딜이 없습니다</p>
          </div>
        ) : (
          statusDeals.map((deal) => (
            <Card
              key={deal.id}
              className="bg-white/[0.04] border-white/[0.06] active:scale-[0.98] transition-transform"
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <Link href={`/deals/${deal.id}`} className="flex-1 min-w-0">
                    <p className="font-medium text-sm line-clamp-2 mb-1">{deal.title}</p>
                    {deal.brand && (
                      <p className="text-xs text-muted-foreground mb-2">{deal.brand.name}</p>
                    )}
                    <p className="text-sm font-bold bg-gradient-to-r from-cyan-400 to-cyan-400 bg-clip-text text-transparent">
                      {formatAmount(deal.amount, deal.currency)}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {CONTENT_TYPE_LABELS[deal.content_type]}
                      </Badge>
                      {deal.deadline && (
                        <Badge
                          variant={new Date(deal.deadline) < new Date() ? "destructive" : "outline"}
                          className="text-xs"
                        >
                          {formatDate(deal.deadline)}
                        </Badge>
                      )}
                    </div>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0"
                    onClick={() => {
                      setSelectedDeal(deal);
                      setIsStatusPickerOpen(true);
                    }}
                  >
                    <MoveHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Status Picker */}
      {selectedDeal && (
        <StatusPicker
          dealId={selectedDeal.id}
          currentStatus={selectedDeal.status}
          open={isStatusPickerOpen}
          onOpenChange={setIsStatusPickerOpen}
          onStatusChange={(newStatus) => handleStatusChange(selectedDeal.id, newStatus)}
        />
      )}
    </div>
  );
}
