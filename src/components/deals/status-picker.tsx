"use client";

import { useState, useTransition } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { updateDealStatus } from "@/lib/actions/deals";
import type { DealStatus } from "@/types/database";
import { DEAL_STATUS_LABELS } from "@/types/database";
import { Check, Loader2 } from "lucide-react";

const STATUS_COLORS: Record<DealStatus, string> = {
  pitching: "bg-blue-500",
  negotiating: "bg-yellow-500",
  contracted: "bg-purple-500",
  producing: "bg-orange-500",
  published: "bg-green-500",
  paid: "bg-emerald-500",
};

const STATUS_ORDER: DealStatus[] = [
  "pitching",
  "negotiating",
  "contracted",
  "producing",
  "published",
  "paid",
];

interface StatusPickerProps {
  dealId: string;
  currentStatus: DealStatus;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusChange?: (newStatus: DealStatus) => void;
}

export function StatusPicker({
  dealId,
  currentStatus,
  open,
  onOpenChange,
  onStatusChange,
}: StatusPickerProps) {
  const [isPending, startTransition] = useTransition();
  const [updatingStatus, setUpdatingStatus] = useState<DealStatus | null>(null);

  const handleStatusChange = (newStatus: DealStatus) => {
    if (newStatus === currentStatus) {
      onOpenChange(false);
      return;
    }

    setUpdatingStatus(newStatus);
    startTransition(async () => {
      try {
        await updateDealStatus(dealId, newStatus);
        onStatusChange?.(newStatus);
        onOpenChange(false);
      } catch (error) {
        console.error("Failed to update status:", error);
      } finally {
        setUpdatingStatus(null);
      }
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-2xl">
        <SheetHeader className="pb-4">
          <SheetTitle>상태 변경</SheetTitle>
        </SheetHeader>
        <div className="grid grid-cols-2 gap-3 pb-6">
          {STATUS_ORDER.map((status) => {
            const isSelected = status === currentStatus;
            const isUpdating = updatingStatus === status;

            return (
              <Button
                key={status}
                variant={isSelected ? "secondary" : "outline"}
                className="h-14 justify-start gap-3 relative"
                onClick={() => handleStatusChange(status)}
                disabled={isPending}
              >
                <div className={`w-3 h-3 rounded-full ${STATUS_COLORS[status]}`} />
                <span className="flex-1 text-left">{DEAL_STATUS_LABELS[status]}</span>
                {isSelected && !isUpdating && (
                  <Check className="h-4 w-4 text-violet-500" />
                )}
                {isUpdating && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
              </Button>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
