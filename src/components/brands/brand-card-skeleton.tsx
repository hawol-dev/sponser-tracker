import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function BrandCardSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-36" />
          <Skeleton className="h-3 w-28" />
        </div>
      </CardContent>
    </Card>
  );
}

export function BrandGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <BrandCardSkeleton key={i} />
      ))}
    </div>
  );
}
