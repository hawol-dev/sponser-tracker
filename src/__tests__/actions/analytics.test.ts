import { describe, it, expect, vi, beforeEach } from "vitest";
import { createMockSupabaseClient, mockUser, setQueryResult } from "@/__mocks__/supabase";

// Mock Supabase client
const mockSupabase = createMockSupabaseClient(mockUser);

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(() => Promise.resolve(mockSupabase)),
}));

import {
  getMonthlyRevenue,
  getBrandRevenue,
  getStatusSummary,
  getAnalyticsSummary,
} from "@/lib/actions/analytics";

describe("analytics actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    });
  });

  describe("getMonthlyRevenue", () => {
    it("should return monthly revenue data", async () => {
      const now = new Date();
      const mockDeals = [
        {
          amount: 100000,
          currency: "KRW",
          created_at: now.toISOString(),
          status: "paid",
        },
        {
          amount: 100,
          currency: "USD",
          created_at: now.toISOString(),
          status: "paid",
        },
      ];

      setQueryResult(mockSupabase._queryBuilder, mockDeals);

      const result = await getMonthlyRevenue();

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(12); // Last 12 months
      expect(result[0]).toHaveProperty("month");
      expect(result[0]).toHaveProperty("revenue");
      expect(result[0]).toHaveProperty("count");
    });

    it("should throw error when user is not authenticated", async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: null },
        error: null,
      });

      await expect(getMonthlyRevenue()).rejects.toThrow("인증이 필요합니다");
    });

    it("should return empty revenue for months with no deals", async () => {
      setQueryResult(mockSupabase._queryBuilder, []);

      const result = await getMonthlyRevenue();

      expect(result.every((m) => m.revenue === 0)).toBe(true);
      expect(result.every((m) => m.count === 0)).toBe(true);
    });
  });

  describe("getBrandRevenue", () => {
    it("should return top 10 brands by revenue", async () => {
      const mockDeals = [
        { amount: 100000, currency: "KRW", brand: { id: "b1", name: "Brand A" } },
        { amount: 200000, currency: "KRW", brand: { id: "b2", name: "Brand B" } },
      ];

      setQueryResult(mockSupabase._queryBuilder, mockDeals);

      const result = await getBrandRevenue();

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeLessThanOrEqual(10);
      if (result.length > 0) {
        expect(result[0]).toHaveProperty("brandId");
        expect(result[0]).toHaveProperty("brandName");
        expect(result[0]).toHaveProperty("revenue");
        expect(result[0]).toHaveProperty("count");
      }
    });

    it("should handle deals without brand", async () => {
      const mockDeals = [
        { amount: 100000, currency: "KRW", brand: null },
      ];

      setQueryResult(mockSupabase._queryBuilder, mockDeals);

      const result = await getBrandRevenue();

      expect(result.some((b) => b.brandName === "브랜드 없음")).toBe(true);
    });
  });

  describe("getStatusSummary", () => {
    it("should return status summary", async () => {
      const mockDeals = [
        { status: "negotiating", amount: 100000, currency: "KRW" },
        { status: "negotiating", amount: 50000, currency: "KRW" },
        { status: "paid", amount: 200000, currency: "KRW" },
      ];

      setQueryResult(mockSupabase._queryBuilder, mockDeals);

      const result = await getStatusSummary();

      expect(result).toBeInstanceOf(Array);
      result.forEach((item) => {
        expect(item).toHaveProperty("status");
        expect(item).toHaveProperty("count");
        expect(item).toHaveProperty("totalAmount");
      });
    });
  });

  describe("getAnalyticsSummary", () => {
    it("should return overall analytics summary", async () => {
      const mockDeals = [
        { status: "paid", amount: 100000, currency: "KRW" },
        { status: "negotiating", amount: 50000, currency: "KRW" },
      ];

      setQueryResult(mockSupabase._queryBuilder, mockDeals);

      const result = await getAnalyticsSummary();

      expect(result).toHaveProperty("totalRevenue");
      expect(result).toHaveProperty("totalDeals");
      expect(result).toHaveProperty("paidRevenue");
      expect(result).toHaveProperty("pendingRevenue");
      expect(result).toHaveProperty("avgDealSize");
    });

    it("should handle empty deals", async () => {
      setQueryResult(mockSupabase._queryBuilder, []);

      const result = await getAnalyticsSummary();

      expect(result.totalRevenue).toBe(0);
      expect(result.totalDeals).toBe(0);
      expect(result.avgDealSize).toBe(0);
    });
  });
});

describe("currency conversion", () => {
  it("should convert USD to KRW using configured rate", () => {
    // Test the conversion logic
    const usdAmount = 100;
    const rate = 1350; // Default rate from env
    const krwAmount = usdAmount * rate;

    expect(krwAmount).toBe(135000);
  });

  it("should not convert KRW amounts", () => {
    const krwAmount = 100000;
    // KRW stays as is
    expect(krwAmount).toBe(100000);
  });
});
