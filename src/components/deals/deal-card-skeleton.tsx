import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DealCardSkeleton() {
  return (
    <Card className="bg-white/[0.04] border-white/[0.06]">
      <CardContent className="p-3.5 space-y-2.5">
        {/* 제목 */}
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />

        {/* 브랜드 */}
        <Skeleton className="h-3 w-1/3" />

        {/* 금액 */}
        <Skeleton className="h-4 w-1/4" />

        {/* 태그들 */}
        <div className="flex gap-1.5">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}

export function KanbanColumnSkeleton() {
  return (
    <div className="min-w-[280px] flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center gap-2 mb-3 px-2">
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-5 w-5 rounded-full ml-auto" />
      </div>

      {/* 카드들 */}
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <DealCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function KanbanBoardSkeleton() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <KanbanColumnSkeleton key={i} />
      ))}
    </div>
  );
}
