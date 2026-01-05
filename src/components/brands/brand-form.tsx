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
  validateEmail,
  validateUrl,
  validatePhone,
  validateRequired,
} from "@/components/ui/form-field";
import { createBrand, updateBrand, type BrandFormData } from "@/lib/actions/brands";
import type { Brand, BrandCategory } from "@/types/database";
import { CATEGORY_LABELS } from "@/types/database";

interface BrandFormProps {
  brand?: Brand;
}

interface FormErrors {
  name?: string;
  contact_email?: string;
  contact_phone?: string;
  website?: string;
}

export function BrandForm({ brand }: BrandFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const isEditing = !!brand;

  const validateField = useCallback((name: string, value: string) => {
    let error: string | null = null;

    switch (name) {
      case "name":
        error = validateRequired(value, "브랜드명");
        break;
      case "contact_email":
        error = validateEmail(value);
        break;
      case "contact_phone":
        error = validatePhone(value);
        break;
      case "website":
        error = validateUrl(value);
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
    const data: BrandFormData = {
      name: formData.get("name") as string,
      category: formData.get("category") as BrandCategory,
      contact_name: formData.get("contact_name") as string,
      contact_email: formData.get("contact_email") as string,
      contact_phone: formData.get("contact_phone") as string,
      website: formData.get("website") as string,
      notes: formData.get("notes") as string,
    };

    // Validate all fields
    const errors: FormErrors = {};
    const nameError = validateRequired(data.name, "브랜드명");
    if (nameError) errors.name = nameError;
    if (data.contact_email) {
      const emailError = validateEmail(data.contact_email);
      if (emailError) errors.contact_email = emailError;
    }
    if (data.contact_phone) {
      const phoneError = validatePhone(data.contact_phone);
      if (phoneError) errors.contact_phone = phoneError;
    }
    if (data.website) {
      const urlError = validateUrl(data.website);
      if (urlError) errors.website = urlError;
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setTouched({ name: true, contact_email: true, contact_phone: true, website: true });
      setIsLoading(false);
      return;
    }

    try {
      if (isEditing) {
        await updateBrand(brand.id, data);
      } else {
        await createBrand(data);
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
        <CardTitle>{isEditing ? "브랜드 수정" : "새 브랜드 추가"}</CardTitle>
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
              label="브랜드명"
              name="name"
              defaultValue={brand?.name}
              placeholder="예: 나이키코리아"
              required
              error={touched.name ? fieldErrors.name : undefined}
              onBlur={handleBlur}
            />

            <FormSelectWrapper label="카테고리" hint="협업 분야를 선택해주세요">
              <Select name="category" defaultValue={brand?.category || "other"}>
                <SelectTrigger>
                  <SelectValue placeholder="카테고리 선택" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormSelectWrapper>
          </div>

          {/* 담당자 정보 */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground">담당자 정보</h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                label="담당자명"
                name="contact_name"
                defaultValue={brand?.contact_name || ""}
                placeholder="예: 김마케팅"
                hint="브랜드 담당자 이름"
              />

              <FormField
                label="이메일"
                name="contact_email"
                type="email"
                defaultValue={brand?.contact_email || ""}
                placeholder="예: marketing@brand.com"
                error={touched.contact_email ? fieldErrors.contact_email : undefined}
                onBlur={handleBlur}
              />

              <FormField
                label="전화번호"
                name="contact_phone"
                type="tel"
                defaultValue={brand?.contact_phone || ""}
                placeholder="예: 010-1234-5678"
                error={touched.contact_phone ? fieldErrors.contact_phone : undefined}
                onBlur={handleBlur}
              />

              <FormField
                label="웹사이트"
                name="website"
                type="url"
                defaultValue={brand?.website || ""}
                placeholder="예: https://brand.com"
                error={touched.website ? fieldErrors.website : undefined}
                onBlur={handleBlur}
              />
            </div>
          </div>

          {/* 메모 */}
          <FormTextarea
            label="메모"
            name="notes"
            defaultValue={brand?.notes || ""}
            placeholder="브랜드 관련 메모를 입력하세요..."
            rows={4}
            showCount
            maxLength={500}
            hint="브랜드와 협업 시 참고할 내용"
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
