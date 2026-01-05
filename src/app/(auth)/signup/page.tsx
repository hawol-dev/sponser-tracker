"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black px-4 relative">
        {/* 배경 그라디언트 */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-cyan-500/10 via-transparent to-transparent blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/5 via-transparent to-transparent blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-md">
          {/* 로고 */}
          <Link href="/" className="flex items-center justify-center gap-2.5 mb-8 group cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-black font-bold">
              S
            </div>
            <span className="font-medium text-xl text-white">Sponsor Tracker</span>
          </Link>

          <Card className="border-white/10 bg-zinc-900/80 backdrop-blur-xl">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <CardTitle className="text-2xl font-bold text-white">이메일을 확인해주세요</CardTitle>
              <CardDescription className="text-zinc-400">
                {email}로 인증 링크를 보냈습니다.<br />
                이메일을 확인하고 링크를 클릭해주세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/login">
                <Button variant="outline" className="w-full cursor-pointer">
                  로그인 페이지로 돌아가기
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 relative">
      {/* 배경 그라디언트 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-cyan-500/10 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/5 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* 로고 */}
        <Link href="/" className="flex items-center justify-center gap-2.5 mb-8 group cursor-pointer">
          <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-black font-bold">
            S
          </div>
          <span className="font-medium text-xl text-white">Sponsor Tracker</span>
        </Link>

        <Card className="border-white/10 bg-zinc-900/80 backdrop-blur-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">회원가입</CardTitle>
            <CardDescription className="text-zinc-400">
              스폰서십을 체계적으로 관리하세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Google 회원가입 */}
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleSignup}
              disabled={loading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google로 계속하기
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-zinc-900 px-2 text-zinc-500">또는</span>
              </div>
            </div>

            {/* 이메일 회원가입 폼 */}
            <form onSubmit={handleEmailSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-zinc-400">이름</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="홍길동"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-zinc-800 border-white/5 text-white placeholder:text-zinc-600 focus:border-cyan-500/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-400">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-zinc-800 border-white/5 text-white placeholder:text-zinc-600 focus:border-cyan-500/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-zinc-400">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                  required
                  className="bg-zinc-800 border-white/5 text-white placeholder:text-zinc-600 focus:border-cyan-500/50"
                />
                <p className="text-xs text-zinc-500">최소 6자 이상</p>
              </div>

              {error && (
                <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "가입 중..." : "회원가입"}
              </Button>
            </form>

            <div className="text-center text-sm text-zinc-500">
              이미 계정이 있으신가요?{" "}
              <Link href="/login" className="text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer">
                로그인
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
