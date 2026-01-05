"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormField,
  FormTextarea,
  FormSelectWrapper,
  validateRequired,
  validateAmount,
} from "@/components/ui/form-field";
import { createDeal, updateDeal, type DealFormData } from "@/lib/actions/deals";
import type { Deal, DealStatus, ContentType, Currency } from "@/types/database";
import { DEAL_STATUS_LABELS, CONTENT_TYPE_LABELS } from "@/types/database";

interface DealFormProps {
  deal?: Deal;
  brands: { id: string; name: string }[];
}

interface FormErrors {
  title?: string;
  amount?: string;
}

export function DealForm({ deal, brands }: DealFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const isEditing = !!deal;

  const validateField = useCallback((name: string, value: string) => {
    let error: string | null = null;

    switch (name) {
      case "title":
        error = validateRequired(value, "딜 제목");
        break;
      case "amount":
        error = validateAmount(parseFloat(value) || 0);
        break;
    }

    setFieldErrors((prev) => ({ ...prev, [name]: error || undefined }));
    return error;
  }, []);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const brandId = formData.get("brand_id") as string;
    const data: DealFormData = {
      brand_id: brandId && brandId !== "none" ? brandId : undefined,
      title: formData.get("title") as string,
      status: formData.get("status") as DealStatus,
      amount: parseFloat(formData.get("amount") as string) || 0,
      currency: formData.get("currency") as Currency,
      content_type: formData.get("content_type") as ContentType,
      deadline: formData.get("deadline") as string || undefined,
      publish_date: formData.get("publish_date") as string || undefined,
      payment_date: formData.get("payment_date") as string || undefined,
      notes: formData.get("notes") as string || undefined,
    };

    // Validate all fields
    const errors: FormErrors = {};
    const titleError = validateRequired(data.title, "딜 제목");
    if (titleError) errors.title = titleError;
    const amountError = validateAmount(data.amount);
    if (amountError) errors.amount = amountError;

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setTouched({ title: true, amount: true });
      setIsLoading(false);
      return;
    }

    try {
      if (isEditing) {
        await updateDeal(deal.id, data);
      } else {
        await createDeal(data);
      }
    } catch (err: unknown) {
      // Next.js redirect throws an error with digest, so we need to rethrow it
      if (err && typeof err === "object" && "digest" in err) {
        throw err;
      }
      setError(err instanceof Error ? err.message : "오류가 발생했습니다");
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "딜 수정" : "새 딜 추가"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* 기본 정보 */}
          <div className="space-y-4">
            <FormField
              label="딜 제목"
              name="title"
              defaultValue={deal?.title}
              placeholder="예: 2024 겨울 캠페인 협찬"
              required
              error={touched.title ? fieldErrors.title : undefined}
              onBlur={handleBlur}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <FormSelectWrapper
                label="브랜드"
                hint={brands.length === 0 ? "브랜드를 먼저 추가하세요" : "협업 브랜드 선택"}
              >
                <Select name="brand_id" defaultValue={deal?.brand_id || "none"}>
                  <SelectTrigger>
                    <SelectValue placeholder="브랜드 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">브랜드 없음</SelectItem>
                    {brands.map((brand) => (
                      <SelectItem key={brand.id} value={brand.id}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormSelectWrapper>

              <FormSelectWrapper label="상태" hint="현재 딜 진행 상태">
                <Select name="status" defaultValue={deal?.status || "pitching"}>
                  <SelectTrigger>
                    <SelectValue placeholder="상태 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(DEAL_STATUS_LABELS).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormSelectWrapper>
            </div>

            <FormSelectWrapper label="콘텐츠 유형" hint="제작할 콘텐츠 형태">
              <Select name="content_type" defaultValue={deal?.content_type || "other"}>
                <SelectTrigger>
                  <SelectValue placeholder="콘텐츠 유형 선택" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(CONTENT_TYPE_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormSelectWrapper>
          </div>

          {/* 금액 정보 */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground">금액 정보</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                label="금액"
                name="amount"
                type="number"
                min={0}
                step={1000}
                defaultValue={deal?.amount || 0}
                placeholder="0"
                error={touched.amount ? fieldErrors.amount : undefined}
                onBlur={handleBlur}
                hint="협찬 금액"
              />

              <FormSelectWrapper label="통화">
                <Select name="currency" defaultValue={deal?.currency || "KRW"}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="KRW">원화 (KRW)</SelectItem>
                    <SelectItem value="USD">달러 (USD)</SelectItem>
                  </SelectContent>
                </Select>
              </FormSelectWrapper>
            </div>
          </div>

          {/* 날짜 정보 */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground">일정</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <FormField
                label="마감일"
                name="deadline"
                type="date"
                defaultValue={deal?.deadline || ""}
                hint="콘텐츠 제출 마감"
              />

              <FormField
                label="게시일"
                name="publish_date"
                type="date"
                defaultValue={deal?.publish_date || ""}
                hint="콘텐츠 업로드 예정일"
              />

              <FormField
                label="결제일"
                name="payment_date"
                type="date"
                defaultValue={deal?.payment_date || ""}
                hint="대금 수령 예정일"
              />
            </div>
          </div>

          {/* 메모 */}
          <FormTextarea
            label="메모"
            name="notes"
            defaultValue={deal?.notes || ""}
            placeholder="딜 관련 메모를 입력하세요..."
            rows={4}
            showCount
            maxLength={1000}
            hint="요구사항, 주의사항 등"
          />

          {/* 버튼 */}
          <div className="flex gap-3">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "저장 중..." : isEditing ? "수정하기" : "추가하기"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              취소
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
