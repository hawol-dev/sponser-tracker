import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }

    // 에러 로깅
    console.error("[Auth Callback Error]", {
      error: error.message,
      code: error.code,
      timestamp: new Date().toISOString(),
    });

    const errorType = error.message.includes("expired") ? "expired" : "invalid";
    return NextResponse.redirect(`${origin}/login?error=auth_${errorType}`);
  }

  // code가 없는 경우
  console.error("[Auth Callback] No code provided in callback");
  return NextResponse.redirect(`${origin}/login?error=auth_callback_error`);
}
