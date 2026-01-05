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
      <Card className="group cursor-pointer bg-white/[0.04] border-white/[0.06] hover:border-violet-500/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg group-hover:text-violet-400 transition-colors duration-200">
              {brand.name}
            </CardTitle>
            <Badge variant="secondary" className="transition-colors duration-200 group-hover:bg-violet-500/20">
              {CATEGORY_LABELS[brand.category]}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-1 text-sm text-muted-foreground">
            {brand.contact_name && (
              <p>담당자: {brand.contact_name}</p>
            )}
            {brand.contact_email && (
              <p>이메일: {brand.contact_email}</p>
            )}
            {brand.contact_phone && (
              <p>전화: {brand.contact_phone}</p>
            )}
            {!brand.contact_name && !brand.contact_email && !brand.contact_phone && (
              <p className="text-muted-foreground/50 italic">연락처 정보 없음</p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
