-- Sponsor Tracker 초기 스키마
-- Supabase SQL Editor에서 실행하세요

-- 1. brands 테이블 (브랜드/협력사)
CREATE TABLE brands (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  category TEXT DEFAULT 'other' CHECK (category IN ('fashion', 'beauty', 'tech', 'food', 'travel', 'lifestyle', 'health', 'finance', 'education', 'other')),
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  website TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. deals 테이블 (스폰서십 딜)
CREATE TABLE deals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  brand_id UUID REFERENCES brands(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  status TEXT DEFAULT 'pitching' CHECK (status IN ('pitching', 'negotiating', 'contracted', 'producing', 'published', 'paid')),
  amount DECIMAL(12, 2) DEFAULT 0,
  currency TEXT DEFAULT 'KRW' CHECK (currency IN ('KRW', 'USD')),
  content_type TEXT DEFAULT 'other' CHECK (content_type IN ('instagram_post', 'instagram_reel', 'instagram_story', 'youtube_video', 'youtube_shorts', 'tiktok', 'blog', 'other')),
  deadline DATE,
  publish_date DATE,
  payment_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. reminders 테이블 (알림)
CREATE TABLE reminders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  deal_id UUID REFERENCES deals(id) ON DELETE CASCADE NOT NULL,
  remind_at TIMESTAMPTZ NOT NULL,
  sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 인덱스 생성
CREATE INDEX idx_brands_user_id ON brands(user_id);
CREATE INDEX idx_deals_user_id ON deals(user_id);
CREATE INDEX idx_deals_brand_id ON deals(brand_id);
CREATE INDEX idx_deals_status ON deals(status);
CREATE INDEX idx_deals_deadline ON deals(deadline);
CREATE INDEX idx_reminders_deal_id ON reminders(deal_id);
CREATE INDEX idx_reminders_remind_at ON reminders(remind_at) WHERE sent = FALSE;

-- RLS (Row Level Security) 활성화
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;

-- RLS 정책: 사용자는 자신의 데이터만 접근 가능
CREATE POLICY "Users can view own brands" ON brands
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own brands" ON brands
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own brands" ON brands
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own brands" ON brands
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own deals" ON deals
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own deals" ON deals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own deals" ON deals
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own deals" ON deals
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own reminders" ON reminders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM deals WHERE deals.id = reminders.deal_id AND deals.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own reminders" ON reminders
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM deals WHERE deals.id = reminders.deal_id AND deals.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own reminders" ON reminders
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM deals WHERE deals.id = reminders.deal_id AND deals.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own reminders" ON reminders
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM deals WHERE deals.id = reminders.deal_id AND deals.user_id = auth.uid()
    )
  );

-- updated_at 자동 업데이트 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- deals 테이블에 트리거 적용
CREATE TRIGGER update_deals_updated_at
  BEFORE UPDATE ON deals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
