import { Suspense } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";
import { DEAL_STATUS_LABELS, type DealStatus } from "@/types/database";
import { WelcomeCard } from "@/components/dashboard/welcome-card";
import { STATUS_COLORS } from "@/lib/constants/colors";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">대시보드</h1>
        <p className="text-muted-foreground">스폰서십 현황을 한눈에 확인하세요</p>
      </div>

      <Suspense fallback={<StatsLoading />}>
        <DashboardContent />
      </Suspense>
    </div>
  );
}

async function DashboardContent() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // Check if user is new (no deals and no brands)
  const [dealsResult, brandsResult] = await Promise.all([
    supabase.from("deals").select("id").eq("user_id", user.id).limit(1),
    supabase.from("brands").select("id").eq("user_id", user.id).limit(1),
  ]);

  const hasDeals = (dealsResult.data?.length || 0) > 0;
  const hasBrands = (brandsResult.data?.length || 0) > 0;
  const isNewUser = !hasDeals && !hasBrands;

  if (isNewUser) {
    return <WelcomeCard userName={user.user_metadata?.name} />;
  }

  return (
    <>
      <Suspense fallback={<StatsLoading />}>
        <DashboardStats />
      </Suspense>

      <div className="grid gap-6 md:grid-cols-2">
        <Suspense fallback={<CardLoading title="곧 마감" />}>
          <UpcomingDeadlines />
        </Suspense>

        <Suspense fallback={<CardLoading title="최근 협찬" />}>
          <RecentDeals />
        </Suspense>
      </div>
    </>
  );
}

async function DashboardStats() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // 이번 달 시작일
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const [dealsResult, brandsResult, thisMonthResult] = await Promise.all([
    supabase.from("deals").select("status, amount, currency").eq("user_id", user.id),
    supabase.from("brands").select("id").eq("user_id", user.id),
    supabase.from("deals").select("amount, currency").eq("user_id", user.id).gte("created_at", monthStart),
  ]);

  const deals = dealsResult.data || [];
  const brands = brandsResult.data || [];
  const thisMonthDeals = thisMonthResult.data || [];

  const activeDeals = deals.filter((d) => d.status !== "paid").length;
  const completedDeals = deals.filter((d) => d.status === "paid").length;

  const thisMonthRevenue = thisMonthDeals.reduce((sum, d) => {
    const amount = d.currency === "USD" ? d.amount * 1400 : d.amount;
    return sum + amount;
  }, 0);

  const formatAmount = (amount: number) => {
    if (amount >= 10000) {
      return `₩${Math.round(amount / 10000).toLocaleString()}만`;
    }
    return `₩${amount.toLocaleString()}`;
  };

  const stats = [
    { label: "이번 달 수익", value: formatAmount(thisMonthRevenue) },
    { label: "진행 중인 협찬", value: String(activeDeals) },
    { label: "협업 브랜드", value: String(brands.length) },
    { label: "완료된 협찬", value: String(completedDeals) },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader className="pb-2">
            <CardDescription>{stat.label}</CardDescription>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold">{stat.value}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

async function UpcomingDeadlines() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const now = new Date();
  const sevenDaysLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const { data: deals } = await supabase
    .from("deals")
    .select("id, title, deadline, brand:brands(name)")
    .eq("user_id", user.id)
    .not("status", "in", '("published","paid")')
    .gte("deadline", now.toISOString().split("T")[0])
    .lte("deadline", sevenDaysLater.toISOString().split("T")[0])
    .order("deadline")
    .limit(5);

  const getDaysLeft = (deadline: string) => {
    const d = new Date(deadline);
    const diffTime = d.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getBrandName = (brand: any) => {
    if (!brand) return "브랜드 없음";
    if (Array.isArray(brand)) return brand[0]?.name || "브랜드 없음";
    return brand.name || "브랜드 없음";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
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
            className="text-orange-500"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          곧 마감
        </CardTitle>
        <CardDescription>7일 이내 마감되는 협찬</CardDescription>
      </CardHeader>
      <CardContent>
        {deals && deals.length > 0 ? (
          <div className="space-y-4">
            {deals.map((deal) => {
              const daysLeft = getDaysLeft(deal.deadline!);
              return (
                <Link
                  key={deal.id}
                  href={`/deals/${deal.id}`}
                  className="flex items-center justify-between border-b pb-3 last:border-0 hover:bg-muted/50 -mx-2 px-2 rounded"
                >
                  <div>
                    <p className="font-medium">{deal.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {getBrandName(deal.brand)}
                    </p>
                  </div>
                  <Badge variant={daysLeft <= 3 ? "destructive" : "secondary"}>
                    D-{daysLeft}
                  </Badge>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-4">
            7일 이내 마감되는 협찬이 없습니다
          </p>
        )}
      </CardContent>
    </Card>
  );
}

async function RecentDeals() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: deals } = await supabase
    .from("deals")
    .select("id, title, status, amount, currency, brand:brands(name)")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })
    .limit(5);

  const formatAmount = (amount: number, currency: string) => {
    if (currency === "KRW") {
      return `₩${amount.toLocaleString()}`;
    }
    return `$${amount.toLocaleString()}`;
  };

  const getBrandName = (brand: any) => {
    if (!brand) return "브랜드 없음";
    if (Array.isArray(brand)) return brand[0]?.name || "브랜드 없음";
    return brand.name || "브랜드 없음";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>최근 협찬</CardTitle>
        <CardDescription>최근 업데이트된 협찬</CardDescription>
      </CardHeader>
      <CardContent>
        {deals && deals.length > 0 ? (
          <div className="space-y-4">
            {deals.map((deal) => (
              <Link
                key={deal.id}
                href={`/deals/${deal.id}`}
                className="flex items-center justify-between border-b pb-3 last:border-0 hover:bg-muted/50 -mx-2 px-2 rounded"
              >
                <div>
                  <p className="font-medium">{deal.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {getBrandName(deal.brand)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {formatAmount(deal.amount, deal.currency)}
                  </p>
                  <Badge className={`${STATUS_COLORS[deal.status as DealStatus]?.bg} ${STATUS_COLORS[deal.status as DealStatus]?.text}`}>
                    {DEAL_STATUS_LABELS[deal.status as DealStatus]}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-4">
            아직 등록된 협찬이 없습니다
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function StatsLoading() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-24 animate-pulse rounded-lg bg-muted" />
      ))}
    </div>
  );
}

function CardLoading({ title }: { title: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-40 animate-pulse rounded bg-muted" />
      </CardContent>
    </Card>
  );
}
