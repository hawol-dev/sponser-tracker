import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendDeadlineReminder } from "@/lib/email";

// Vercel Cron용 - 매일 오전 9시 실행
// vercel.json에 설정 필요

export async function GET(request: Request) {
  // Vercel Cron 인증 확인
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Supabase Admin 클라이언트 생성
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json(
      { error: "Missing Supabase environment variables" },
      { status: 500 }
    );
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

  try {
    const now = new Date();

    // 3일 후, 1일 후 마감인 딜 찾기
    const threeDaysLater = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
    const oneDayLater = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    // 마감 임박 딜 조회 (3일 후 또는 1일 후)
    const { data: deals, error: dealsError } = await supabaseAdmin
      .from("deals")
      .select(`
        id,
        title,
        deadline,
        user_id,
        brand:brands(name)
      `)
      .in("deadline", [threeDaysLater, oneDayLater])
      .not("status", "in", '("published","paid")');

    if (dealsError) {
      console.error("Deals fetch error:", dealsError);
      return NextResponse.json({ error: dealsError.message }, { status: 500 });
    }

    if (!deals || deals.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No upcoming deadlines",
        sent: 0,
      });
    }

    // 유저별로 그룹화
    const userDeals = new Map<string, typeof deals>();
    deals.forEach((deal) => {
      if (!userDeals.has(deal.user_id)) {
        userDeals.set(deal.user_id, []);
      }
      userDeals.get(deal.user_id)!.push(deal);
    });

    let sentCount = 0;
    const errors: string[] = [];

    // 각 유저에게 이메일 발송
    for (const [userId, userDealList] of userDeals) {
      // 유저 정보 조회
      const { data: user, error: userError } = await supabaseAdmin.auth.admin.getUserById(userId);

      if (userError || !user?.user?.email) {
        errors.push(`User ${userId}: ${userError?.message || "No email"}`);
        continue;
      }

      // 각 딜에 대해 이메일 발송
      for (const deal of userDealList) {
        const deadline = new Date(deal.deadline!);
        const daysLeft = Math.ceil(
          (deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        );

        const brandName = Array.isArray(deal.brand)
          ? deal.brand[0]?.name || "브랜드 없음"
          : (deal.brand as any)?.name || "브랜드 없음";

        const result = await sendDeadlineReminder({
          to: user.user.email,
          userName: user.user.user_metadata?.name || user.user.email.split("@")[0],
          dealTitle: deal.title,
          brandName,
          deadline: deadline.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          daysLeft,
          dealUrl: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/deals/${deal.id}`,
        });

        if (result.success) {
          sentCount++;

          // 알림 기록 저장
          await supabaseAdmin.from("reminders").insert({
            deal_id: deal.id,
            remind_at: now.toISOString(),
            sent: true,
          });
        } else {
          errors.push(`Deal ${deal.id}: ${JSON.stringify(result.error)}`);
        }
      }
    }

    return NextResponse.json({
      success: true,
      sent: sentCount,
      total: deals.length,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("Cron job error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
