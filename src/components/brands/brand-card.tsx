"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Brand } from "@/types/database";
import { CATEGORY_LABELS } from "@/types/database";

interface BrandCardProps {
  brand: Brand;
}

export function BrandCard({ brand }: BrandCardProps) {
  return (
    <Link href={`/brands/${brand.id}`}>
      <Card className="group cursor-pointer bg-white/[0.04] border-white/[0.06] hover:border-cyan-500/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg group-hover:text-cyan-400 transition-colors duration-200 truncate max-w-[180px]">
              {brand.name}
            </CardTitle>
            <Badge variant="secondary" className="transition-colors duration-200 group-hover:bg-cyan-500/20">
              {CATEGORY_LABELS[brand.category]}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-1 text-sm text-muted-foreground min-h-[72px]">
            <p>담당자: {brand.contact_name || "-"}</p>
            <p>이메일: {brand.contact_email || "-"}</p>
            <p>전화: {brand.contact_phone || "-"}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
