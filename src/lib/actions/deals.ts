"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { Deal, DealStatus, ContentType, Currency } from "@/types/database";

export type DealFormData = {
  brand_id?: string;
  title: string;
  status: DealStatus;
  amount: number;
  currency: Currency;
  content_type: ContentType;
  deadline?: string;
  publish_date?: string;
  payment_date?: string;
  notes?: string;
};

// 딜 목록 조회
export async function getDeals(options?: {
  status?: DealStatus;
  brandId?: string;
}) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("인증이 필요합니다");

  let query = supabase
    .from("deals")
    .select("*, brand:brands(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (options?.status) {
    query = query.eq("status", options.status);
  }

  if (options?.brandId) {
    query = query.eq("brand_id", options.brandId);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data as Deal[];
}

// 단일 딜 조회
export async function getDeal(id: string) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("인증이 필요합니다");

  const { data, error } = await supabase
    .from("deals")
    .select("*, brand:brands(*)")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error) throw error;
  return data as Deal;
}

// 딜 생성
export async function createDeal(formData: DealFormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("인증이 필요합니다");

  const { data, error } = await supabase
    .from("deals")
    .insert({
      user_id: user.id,
      brand_id: formData.brand_id || null,
      title: formData.title,
      status: formData.status,
      amount: formData.amount,
      currency: formData.currency,
      content_type: formData.content_type,
      deadline: formData.deadline || null,
      publish_date: formData.publish_date || null,
      payment_date: formData.payment_date || null,
      notes: formData.notes || null,
    })
    .select()
    .single();

  if (error) throw error;

  revalidatePath("/deals");
  revalidatePath("/dashboard");
  redirect("/deals");
}

// 딜 수정
export async function updateDeal(id: string, formData: DealFormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("인증이 필요합니다");

  const { error } = await supabase
    .from("deals")
    .update({
      brand_id: formData.brand_id || null,
      title: formData.title,
      status: formData.status,
      amount: formData.amount,
      currency: formData.currency,
      content_type: formData.content_type,
      deadline: formData.deadline || null,
      publish_date: formData.publish_date || null,
      payment_date: formData.payment_date || null,
      notes: formData.notes || null,
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw error;

  revalidatePath("/deals");
  revalidatePath(`/deals/${id}`);
  revalidatePath("/dashboard");
  redirect(`/deals/${id}`);
}

// 딜 상태 변경 (칸반용)
export async function updateDealStatus(id: string, status: DealStatus) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("인증이 필요합니다");

  const { error } = await supabase
    .from("deals")
    .update({ status })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw error;

  revalidatePath("/deals");
  revalidatePath("/dashboard");
}

// 딜 삭제
export async function deleteDeal(id: string) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("인증이 필요합니다");

  const { error } = await supabase
    .from("deals")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw error;

  revalidatePath("/deals");
  revalidatePath("/dashboard");
  redirect("/deals");
}

// 브랜드 목록 (딜 폼용)
export async function getBrandsForSelect() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("인증이 필요합니다");

  const { data, error } = await supabase
    .from("brands")
    .select("id, name")
    .eq("user_id", user.id)
    .order("name");

  if (error) throw error;
  return data;
}
