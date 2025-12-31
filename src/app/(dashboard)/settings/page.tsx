"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // 알림 설정
  const [emailReminders, setEmailReminders] = useState(true);
  const [reminderDays, setReminderDays] = useState<number[]>([3, 1]);

  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setName(user.user_metadata?.name || "");
      }
    };
    getUser();
  }, [supabase.auth]);

  const handleSaveProfile = async () => {
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.updateUser({
      data: { name },
    });

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: "프로필이 저장되었습니다" });
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const toggleReminderDay = (day: number) => {
    if (reminderDays.includes(day)) {
      setReminderDays(reminderDays.filter((d) => d !== day));
    } else {
      setReminderDays([...reminderDays, day].sort((a, b) => b - a));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">설정</h1>
        <p className="text-muted-foreground">계정 및 알림 설정을 관리하세요</p>
      </div>

      <div className="grid gap-6">
        {/* 프로필 설정 */}
        <Card>
          <CardHeader>
            <CardTitle>프로필</CardTitle>
            <CardDescription>프로필 정보를 수정하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름을 입력하세요"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                disabled
                value={user?.email || ""}
                placeholder="email@example.com"
              />
              <p className="text-xs text-muted-foreground">이메일은 변경할 수 없습니다</p>
            </div>

            {message && (
              <div
                className={`text-sm p-3 rounded-md ${
                  message.type === "success"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {message.text}
              </div>
            )}

            <Button onClick={handleSaveProfile} disabled={loading}>
              {loading ? "저장 중..." : "저장"}
            </Button>
          </CardContent>
        </Card>

        {/* 알림 설정 */}
        <Card>
          <CardHeader>
            <CardTitle>알림</CardTitle>
            <CardDescription>마감일 알림을 설정하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>이메일 알림</Label>
                <p className="text-sm text-muted-foreground">
                  마감일 전에 이메일로 알림을 받습니다
                </p>
              </div>
              <Switch
                checked={emailReminders}
                onCheckedChange={setEmailReminders}
              />
            </div>

            {emailReminders && (
              <div className="space-y-3">
                <Label>알림 시점</Label>
                <div className="flex flex-wrap gap-2">
                  {[7, 3, 1].map((day) => (
                    <Button
                      key={day}
                      type="button"
                      variant={reminderDays.includes(day) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleReminderDay(day)}
                    >
                      {day}일 전
                    </Button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  선택한 날짜에 이메일 알림이 발송됩니다
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 계정 관리 */}
        <Card>
          <CardHeader>
            <CardTitle>계정</CardTitle>
            <CardDescription>계정 관리</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">로그아웃</p>
                <p className="text-sm text-muted-foreground">
                  현재 세션에서 로그아웃합니다
                </p>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                로그아웃
              </Button>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-destructive">계정 삭제</p>
                  <p className="text-sm text-muted-foreground">
                    계정과 모든 데이터가 영구적으로 삭제됩니다
                  </p>
                </div>
                <Button variant="destructive" disabled>
                  삭제
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
