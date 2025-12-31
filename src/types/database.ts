export type DealStatus =
  | "pitching"
  | "negotiating"
  | "contracted"
  | "producing"
  | "published"
  | "paid";

export type ContentType =
  | "instagram_post"
  | "instagram_reel"
  | "instagram_story"
  | "youtube_video"
  | "youtube_shorts"
  | "tiktok"
  | "blog"
  | "other";

export type Currency = "KRW" | "USD";

export type BrandCategory =
  | "fashion"
  | "beauty"
  | "tech"
  | "food"
  | "travel"
  | "lifestyle"
  | "health"
  | "finance"
  | "education"
  | "other";

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface Brand {
  id: string;
  user_id: string;
  name: string;
  category: BrandCategory;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  website: string | null;
  notes: string | null;
  created_at: string;
}

export interface Deal {
  id: string;
  user_id: string;
  brand_id: string;
  title: string;
  status: DealStatus;
  amount: number;
  currency: Currency;
  content_type: ContentType;
  deadline: string | null;
  publish_date: string | null;
  payment_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  // Relations
  brand?: Brand;
}

export interface Reminder {
  id: string;
  deal_id: string;
  remind_at: string;
  sent: boolean;
  created_at: string;
}

// Deal status labels (한국어)
export const DEAL_STATUS_LABELS: Record<DealStatus, string> = {
  pitching: "피칭",
  negotiating: "협상 중",
  contracted: "계약 완료",
  producing: "제작 중",
  published: "게시 완료",
  paid: "결제 완료",
};

// Content type labels (한국어)
export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  instagram_post: "인스타그램 포스트",
  instagram_reel: "인스타그램 릴스",
  instagram_story: "인스타그램 스토리",
  youtube_video: "유튜브 영상",
  youtube_shorts: "유튜브 쇼츠",
  tiktok: "틱톡",
  blog: "블로그",
  other: "기타",
};

// Brand category labels (한국어)
export const BRAND_CATEGORY_LABELS: Record<BrandCategory, string> = {
  fashion: "패션",
  beauty: "뷰티",
  tech: "테크",
  food: "식품",
  travel: "여행",
  lifestyle: "라이프스타일",
  health: "헬스",
  finance: "금융",
  education: "교육",
  other: "기타",
};

// Alias for convenience
export const CATEGORY_LABELS = BRAND_CATEGORY_LABELS;
