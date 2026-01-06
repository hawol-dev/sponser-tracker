import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock Resend before importing the route
vi.mock("resend", () => {
  const mockSend = vi.fn().mockResolvedValue({ id: "test-email-id" });
  return {
    Resend: class MockResend {
      emails = { send: mockSend };
    },
  };
});

// Mock rate limit module
vi.mock("@/lib/rate-limit", () => ({
  rateLimit: vi.fn().mockReturnValue({ success: true, remaining: 5, resetTime: Date.now() + 60000 }),
  getClientIP: vi.fn().mockReturnValue("127.0.0.1"),
}));

import { POST } from "@/app/api/contact/route";
import { rateLimit } from "@/lib/rate-limit";

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset rate limit mock to success
    vi.mocked(rateLimit).mockReturnValue({
      success: true,
      remaining: 5,
      resetTime: Date.now() + 60000,
    });
  });

  it("should return 400 for missing required fields", async () => {
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Missing required fields");
  });

  it("should return 400 when name is missing", async () => {
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "test@example.com",
        message: "Hello",
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("should return 400 when email is missing", async () => {
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "John",
        message: "Hello",
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("should return 400 when message is missing", async () => {
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "John",
        email: "test@example.com",
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("should return success for valid request", async () => {
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "John Doe",
        email: "john@example.com",
        message: "Hello, this is a test message.",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });

  it("should return 429 when rate limited", async () => {
    vi.mocked(rateLimit).mockReturnValue({
      success: false,
      remaining: 0,
      resetTime: Date.now() + 30000,
    });

    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "John Doe",
        email: "john@example.com",
        message: "Hello",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(429);
    expect(data.error).toContain("Too many requests");
    expect(response.headers.get("Retry-After")).toBeTruthy();
  });

  it("should call rateLimit with correct key", async () => {
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "John",
        email: "john@example.com",
        message: "Hello",
      }),
    });

    await POST(request);

    expect(rateLimit).toHaveBeenCalledWith("contact:127.0.0.1", {
      windowMs: 60000,
      maxRequests: 5,
    });
  });
});
