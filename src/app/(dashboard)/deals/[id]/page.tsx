import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getDeal } from "@/lib/actions/deals";
import {
  DEAL_STATUS_LABELS,
  CONTENT_TYPE_LABELS,
  CATEGORY_LABELS,
} from "@/types/database";
import { DeleteDealButton } from "@/components/deals/delete-deal-button";

interface DealDetailPageProps {
  params: Promise<{ id: string }>;
}

const STATUS_COLORS: Record<string, string> = {
  pitching: "bg-gray-100 text-gray-800",
  negotiating: "bg-yellow-100 text-yellow-800",
  contracted: "bg-blue-100 text-blue-800",
  producing: "bg-purple-100 text-purple-800",
  published: "bg-green-100 text-green-800",
  paid: "bg-emerald-100 text-emerald-800",
};

export default async function DealDetailPage({ params }: DealDetailPageProps) {
  const { id } = await params;

  let deal;
  try {
    deal = await getDeal(id);
  } catch {
    notFound();
  }

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
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isOverdue = deal.deadline && new Date(deal.deadline) < new Date();

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/deals">
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
              <h1 className="text-2xl font-bold">{deal.title}</h1>
              <Badge className={STATUS_COLORS[deal.status]}>
                {DEAL_STATUS_LABELS[deal.status]}
              </Badge>
            </div>
            {deal.brand && (
              <Link
                href={`/brands/${deal.brand.id}`}
                className="text-sm text-muted-foreground hover:text-primary hover:underline"
              >
                {deal.brand.name}
              </Link>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/deals/${deal.id}/edit`}>
            <Button variant="outline">수정</Button>
          </Link>
          <DeleteDealButton dealId={deal.id} dealTitle={deal.title} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 금액 정보 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">금액 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {formatAmount(deal.amount, deal.currency)}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {CONTENT_TYPE_LABELS[deal.content_type]}
            </p>
          </CardContent>
        </Card>

        {/* 일정 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">일정</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">마감일</span>
              <span className={isOverdue ? "text-destructive font-medium" : ""}>
                {formatDate(deal.deadline)}
                {isOverdue && " (지남)"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">게시일</span>
              <span>{formatDate(deal.publish_date)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">결제일</span>
              <span>{formatDate(deal.payment_date)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 브랜드 정보 */}
      {deal.brand && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">브랜드 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{deal.brand.name}</p>
                <p className="text-sm text-muted-foreground">
                  {CATEGORY_LABELS[deal.brand.category]}
                </p>
                {deal.brand.contact_email && (
                  <p className="text-sm text-muted-foreground">
                    {deal.brand.contact_email}
                  </p>
                )}
              </div>
              <Link href={`/brands/${deal.brand.id}`}>
                <Button variant="outline" size="sm">
                  브랜드 상세
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 메모 */}
      {deal.notes && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">메모</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{deal.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
