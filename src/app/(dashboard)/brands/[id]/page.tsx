import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getBrand, deleteBrand } from "@/lib/actions/brands";
import { CATEGORY_LABELS } from "@/types/database";
import { DeleteBrandButton } from "@/components/brands/delete-brand-button";

interface BrandDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function BrandDetailPage({ params }: BrandDetailPageProps) {
  const { id } = await params;

  let brand;
  try {
    brand = await getBrand(id);
  } catch {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/brands">
            <Button variant="ghost" size="sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              뒤로
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">{brand.name}</h1>
              <Badge variant="secondary">
                {CATEGORY_LABELS[brand.category]}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              등록일: {formatDate(brand.created_at)}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/brands/${brand.id}/edit`}>
            <Button variant="outline">수정</Button>
          </Link>
          <DeleteBrandButton brandId={brand.id} brandName={brand.name} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 담당자 정보 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">담당자 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {brand.contact_name || brand.contact_email || brand.contact_phone ? (
              <>
                {brand.contact_name && (
                  <div>
                    <p className="text-sm text-muted-foreground">이름</p>
                    <p className="font-medium">{brand.contact_name}</p>
                  </div>
                )}
                {brand.contact_email && (
                  <div>
                    <p className="text-sm text-muted-foreground">이메일</p>
                    <a
                      href={`mailto:${brand.contact_email}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {brand.contact_email}
                    </a>
                  </div>
                )}
                {brand.contact_phone && (
                  <div>
                    <p className="text-sm text-muted-foreground">전화번호</p>
                    <a
                      href={`tel:${brand.contact_phone}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {brand.contact_phone}
                    </a>
                  </div>
                )}
              </>
            ) : (
              <p className="text-muted-foreground italic">
                등록된 담당자 정보가 없습니다
              </p>
            )}
          </CardContent>
        </Card>

        {/* 추가 정보 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">추가 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {brand.website && (
              <div>
                <p className="text-sm text-muted-foreground">웹사이트</p>
                <a
                  href={brand.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  {brand.website}
                </a>
              </div>
            )}
            {brand.notes ? (
              <div>
                <p className="text-sm text-muted-foreground">메모</p>
                <p className="whitespace-pre-wrap">{brand.notes}</p>
              </div>
            ) : (
              !brand.website && (
                <p className="text-muted-foreground italic">
                  등록된 추가 정보가 없습니다
                </p>
              )
            )}
          </CardContent>
        </Card>
      </div>

      {/* 협업 히스토리 (Week 3에서 구현) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">협업 히스토리</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-dashed p-8 text-center">
            <p className="text-muted-foreground">
              이 브랜드와의 딜 목록이 여기에 표시됩니다 (Week 3에서 연동)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
