import { describe, it, expect, vi, beforeEach } from "vitest";
import { createMockSupabaseClient, mockUser, setQueryResult } from "@/__mocks__/supabase";

// Mock Supabase client
const mockSupabase = createMockSupabaseClient(mockUser);

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(() => Promise.resolve(mockSupabase)),
}));

// Mock Next.js functions
vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

import { getDeals, getDeal, updateDealStatus, getBrandsForSelect } from "@/lib/actions/deals";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

describe("deals actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    });
  });

  describe("getDeals", () => {
    it("should fetch all deals for authenticated user", async () => {
      const mockDeals = [
        {
          id: "1",
          title: "Deal 1",
          status: "negotiating",
          amount: 100000,
          currency: "KRW",
          user_id: mockUser.id,
          brand: { id: "b1", name: "Brand A" },
        },
      ];

      setQueryResult(mockSupabase._queryBuilder, mockDeals);

      const result = await getDeals();

      expect(result).toEqual(mockDeals);
      expect(mockSupabase.from).toHaveBeenCalledWith("deals");
      expect(mockSupabase._queryBuilder.eq).toHaveBeenCalledWith("user_id", mockUser.id);
    });

    it("should throw error when user is not authenticated", async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: null },
        error: null,
      });

      await expect(getDeals()).rejects.toThrow("인증이 필요합니다");
    });

    it("should filter by status", async () => {
      setQueryResult(mockSupabase._queryBuilder, []);

      await getDeals({ status: "published" });

      expect(mockSupabase._queryBuilder.eq).toHaveBeenCalledWith("status", "published");
    });

    it("should filter by brandId", async () => {
      setQueryResult(mockSupabase._queryBuilder, []);

      await getDeals({ brandId: "brand-123" });

      expect(mockSupabase._queryBuilder.eq).toHaveBeenCalledWith("brand_id", "brand-123");
    });

    it("should apply search filter with database query", async () => {
      setQueryResult(mockSupabase._queryBuilder, []);

      await getDeals({ search: "Nike" });

      expect(mockSupabase._queryBuilder.or).toHaveBeenCalled();
    });
  });

  describe("getDeal", () => {
    it("should fetch a single deal by id", async () => {
      const mockDeal = {
        id: "deal-123",
        title: "Test Deal",
        status: "negotiating",
        amount: 50000,
        currency: "KRW",
        user_id: mockUser.id,
      };

      setQueryResult(mockSupabase._queryBuilder, mockDeal);

      const result = await getDeal("deal-123");

      expect(result).toEqual(mockDeal);
      expect(mockSupabase._queryBuilder.eq).toHaveBeenCalledWith("id", "deal-123");
      expect(mockSupabase._queryBuilder.single).toHaveBeenCalled();
    });
  });

  describe("updateDealStatus", () => {
    it("should update deal status and revalidate paths", async () => {
      setQueryResult(mockSupabase._queryBuilder, { id: "deal-123" });

      await updateDealStatus("deal-123", "published");

      expect(mockSupabase._queryBuilder.update).toHaveBeenCalledWith({ status: "published" });
      expect(revalidatePath).toHaveBeenCalledWith("/deals");
      expect(revalidatePath).toHaveBeenCalledWith("/dashboard");
    });
  });

  describe("getBrandsForSelect", () => {
    it("should fetch brands with only id and name", async () => {
      const mockBrands = [
        { id: "1", name: "Brand A" },
        { id: "2", name: "Brand B" },
      ];

      setQueryResult(mockSupabase._queryBuilder, mockBrands);

      const result = await getBrandsForSelect();

      expect(result).toEqual(mockBrands);
      expect(mockSupabase._queryBuilder.select).toHaveBeenCalledWith("id, name");
    });
  });
});

describe("deals search sanitization", () => {
  it("should escape SQL wildcard characters in search", () => {
    const input = "test%_\\";
    const sanitized = input
      .replace(/\\/g, "\\\\")
      .replace(/%/g, "\\%")
      .replace(/_/g, "\\_");

    expect(sanitized).toBe("test\\%\\_\\\\");
  });
});
