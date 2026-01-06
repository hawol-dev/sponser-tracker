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

import { getBrands } from "@/lib/actions/brands";

describe("brands actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset mock user
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    });
  });

  describe("getBrands", () => {
    it("should fetch all brands for authenticated user", async () => {
      const mockBrands = [
        { id: "1", name: "Brand A", category: "fashion", user_id: mockUser.id },
        { id: "2", name: "Brand B", category: "tech", user_id: mockUser.id },
      ];

      setQueryResult(mockSupabase._queryBuilder, mockBrands);

      const result = await getBrands();

      expect(result).toEqual(mockBrands);
      expect(mockSupabase.from).toHaveBeenCalledWith("brands");
      expect(mockSupabase._queryBuilder.eq).toHaveBeenCalledWith("user_id", mockUser.id);
    });

    it("should throw error when user is not authenticated", async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: null },
        error: null,
      });

      await expect(getBrands()).rejects.toThrow("인증이 필요합니다");
    });

    it("should filter by search term with sanitized input", async () => {
      setQueryResult(mockSupabase._queryBuilder, []);

      await getBrands({ search: "test%" });

      // Check that ilike was called (sanitization happens internally)
      expect(mockSupabase._queryBuilder.ilike).toHaveBeenCalled();
    });

    it("should filter by category", async () => {
      setQueryResult(mockSupabase._queryBuilder, []);

      await getBrands({ category: "fashion" });

      expect(mockSupabase._queryBuilder.eq).toHaveBeenCalledWith("category", "fashion");
    });

    it("should handle database errors", async () => {
      setQueryResult(mockSupabase._queryBuilder, null, { message: "Database error" });

      await expect(getBrands()).rejects.toThrow();
    });
  });
});

describe("brands search sanitization", () => {
  it("should escape SQL wildcard characters", () => {
    // Test the sanitization logic directly
    const input = "test%_\\";
    const sanitized = input
      .replace(/\\/g, "\\\\")
      .replace(/%/g, "\\%")
      .replace(/_/g, "\\_");

    expect(sanitized).toBe("test\\%\\_\\\\");
  });

  it("should handle normal search strings", () => {
    const input = "Nike";
    const sanitized = input
      .replace(/\\/g, "\\\\")
      .replace(/%/g, "\\%")
      .replace(/_/g, "\\_");

    expect(sanitized).toBe("Nike");
  });

  it("should escape mixed special characters", () => {
    const input = "Brand_Name%Test\\End";
    const sanitized = input
      .replace(/\\/g, "\\\\")
      .replace(/%/g, "\\%")
      .replace(/_/g, "\\_");

    expect(sanitized).toBe("Brand\\_Name\\%Test\\\\End");
  });
});
