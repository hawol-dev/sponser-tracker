"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { Brand, BrandCategory } from "@/types/database";

export type BrandFormData = {
  name: string;
  category: BrandCategory;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
  website?: string;
  notes?: string;
};

// 브랜드 목록 조회
export async function getBrands(options?: {
  search?: string;
  category?: BrandCategory;
}) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("인증이 필요합니다");

  let query = supabase
    .from("brands")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  // 검색어 필터
  if (options?.search) {
    query = query.ilike("name", `%${options.search}%`);
  }

  // 카테고리 필터
  if (options?.category) {
    query = query.eq("category", options.category);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data as Brand[];
}

// 단일 브랜드 조회
export async function getBrand(id: string) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("인증이 필요합니다");

  const { data, error } = await supabase
    .from("brands")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error) throw error;
  return data as Brand;
}

// 브랜드 생성
export async function createBrand(formData: BrandFormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("인증이 필요합니다");

  const { data, error } = await supabase
    .from("brands")
    .insert({
      user_id: user.id,
      name: formData.name,
      category: formData.category,
      contact_name: formData.contact_name || null,
      contact_email: formData.contact_email || null,
      contact_phone: formData.contact_phone || null,
      website: formData.website || null,
      notes: formData.notes || null,
    })
    .select()
    .single();

  if (error) throw error;

  revalidatePath("/brands");
  redirect("/brands");
}

// 브랜드 수정
export async function updateBrand(id: string, formData: BrandFormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("인증이 필요합니다");

  const { error } = await supabase
    .from("brands")
    .update({
      name: formData.name,
      category: formData.category,
      contact_name: formData.contact_name || null,
      contact_email: formData.contact_email || null,
      contact_phone: formData.contact_phone || null,
      website: formData.website || null,
      notes: formData.notes || null,
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw error;

  revalidatePath("/brands");
  revalidatePath(`/brands/${id}`);
  redirect(`/brands/${id}`);
}

// 브랜드 삭제
export async function deleteBrand(id: string) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("인증이 필요합니다");

  const { error } = await supabase
    .from("brands")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw error;

  revalidatePath("/brands");
  redirect("/brands");
}
