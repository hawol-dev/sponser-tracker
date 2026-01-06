import { describe, it, expect, beforeEach, vi } from "vitest";
import { rateLimit, getClientIP } from "@/lib/rate-limit";

describe("rateLimit", () => {
  beforeEach(() => {
    // Reset time mocking before each test
    vi.useFakeTimers();
  });

  it("should allow first request", () => {
    const result = rateLimit("test-key-1", { windowMs: 60000, maxRequests: 5 });

    expect(result.success).toBe(true);
    expect(result.remaining).toBe(4);
  });

  it("should track multiple requests", () => {
    const key = "test-key-2";
    const config = { windowMs: 60000, maxRequests: 3 };

    const result1 = rateLimit(key, config);
    const result2 = rateLimit(key, config);
    const result3 = rateLimit(key, config);

    expect(result1.remaining).toBe(2);
    expect(result2.remaining).toBe(1);
    expect(result3.remaining).toBe(0);
  });

  it("should block requests after limit reached", () => {
    const key = "test-key-3";
    const config = { windowMs: 60000, maxRequests: 2 };

    rateLimit(key, config); // 1st
    rateLimit(key, config); // 2nd (limit reached)
    const result = rateLimit(key, config); // 3rd (should be blocked)

    expect(result.success).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it("should reset after window expires", () => {
    const key = "test-key-4";
    const config = { windowMs: 1000, maxRequests: 1 };

    rateLimit(key, config); // Use the limit

    // Advance time past the window
    vi.advanceTimersByTime(1500);

    const result = rateLimit(key, config);
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(0);
  });

  it("should use default config when not provided", () => {
    const result = rateLimit("test-key-5");

    expect(result.success).toBe(true);
    expect(result.remaining).toBe(9); // default maxRequests is 10
  });

  it("should handle different keys independently", () => {
    const config = { windowMs: 60000, maxRequests: 1 };

    const result1 = rateLimit("key-a", config);
    const result2 = rateLimit("key-b", config);

    expect(result1.success).toBe(true);
    expect(result2.success).toBe(true);
  });
});

describe("getClientIP", () => {
  it("should extract IP from x-forwarded-for header", () => {
    const request = new Request("http://localhost", {
      headers: {
        "x-forwarded-for": "192.168.1.1, 10.0.0.1",
      },
    });

    const ip = getClientIP(request);
    expect(ip).toBe("192.168.1.1");
  });

  it("should extract IP from x-real-ip header", () => {
    const request = new Request("http://localhost", {
      headers: {
        "x-real-ip": "192.168.1.2",
      },
    });

    const ip = getClientIP(request);
    expect(ip).toBe("192.168.1.2");
  });

  it("should return anonymous when no IP headers present", () => {
    const request = new Request("http://localhost");

    const ip = getClientIP(request);
    expect(ip).toBe("anonymous");
  });

  it("should prefer x-forwarded-for over x-real-ip", () => {
    const request = new Request("http://localhost", {
      headers: {
        "x-forwarded-for": "192.168.1.1",
        "x-real-ip": "192.168.1.2",
      },
    });

    const ip = getClientIP(request);
    expect(ip).toBe("192.168.1.1");
  });

  it("should trim whitespace from IP", () => {
    const request = new Request("http://localhost", {
      headers: {
        "x-forwarded-for": "  192.168.1.1  , 10.0.0.1",
      },
    });

    const ip = getClientIP(request);
    expect(ip).toBe("192.168.1.1");
  });
});
