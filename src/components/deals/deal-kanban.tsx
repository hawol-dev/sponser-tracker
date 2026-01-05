"use client";

import { useState, useTransition } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import { KanbanColumn } from "./kanban-column";
import { DealCard } from "./deal-card";
import { MobileKanban } from "./mobile-kanban";
import { updateDealStatus } from "@/lib/actions/deals";
import { useIsMobile } from "@/hooks/use-media-query";
import type { Deal, DealStatus } from "@/types/database";

const STATUSES: DealStatus[] = [
  "pitching",
  "negotiating",
  "contracted",
  "producing",
  "published",
  "paid",
];

interface DealKanbanProps {
  initialDeals: Deal[];
}

export function DealKanban({ initialDeals }: DealKanbanProps) {
  const isMobile = useIsMobile();
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  // Render mobile kanban for mobile devices
  if (isMobile) {
    return (
      <MobileKanban
        deals={deals}
        onDealsChange={setDeals}
      />
    );
  }

  const activeDeal = activeId ? deals.find((d) => d.id === activeId) : null;

  const getDealsByStatus = (status: DealStatus) => {
    return deals.filter((deal) => deal.status === status);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Check if dropping over a column
    if (STATUSES.includes(overId as DealStatus)) {
      const activeDeal = deals.find((d) => d.id === activeId);
      if (activeDeal && activeDeal.status !== overId) {
        setDeals((prev) =>
          prev.map((deal) =>
            deal.id === activeId
              ? { ...deal, status: overId as DealStatus }
              : deal
          )
        );
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Determine the target status
    let targetStatus: DealStatus | null = null;

    if (STATUSES.includes(overId as DealStatus)) {
      targetStatus = overId as DealStatus;
    } else {
      // Dropped over another deal - find its status
      const overDeal = deals.find((d) => d.id === overId);
      if (overDeal) {
        targetStatus = overDeal.status;
      }
    }

    if (targetStatus) {
      const newStatus = targetStatus; // Capture for closure
      const activeDeal = initialDeals.find((d) => d.id === activeId);
      if (activeDeal && activeDeal.status !== newStatus) {
        // Update on server
        startTransition(async () => {
          try {
            await updateDealStatus(activeId, newStatus);
          } catch (error) {
            // Revert on error
            setDeals(initialDeals);
          }
        });
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {STATUSES.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            deals={getDealsByStatus(status)}
          />
        ))}
      </div>

      <DragOverlay>
        {activeDeal ? (
          <div className="rotate-3 opacity-90">
            <DealCard deal={activeDeal} />
          </div>
        ) : null}
      </DragOverlay>

      {isPending && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg text-sm"
        >
          저장 중...
        </div>
      )}
    </DndContext>
  );
}
