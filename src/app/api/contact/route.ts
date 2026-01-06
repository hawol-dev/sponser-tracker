import { NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit, getClientIP } from "@/lib/rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY);

// HTML 이스케이프 함수 (XSS 방지)
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  // Rate limiting: IP당 분당 5회 제한
  const clientIP = getClientIP(request);
  const rateLimitResult = rateLimit(`contact:${clientIP}`, {
    windowMs: 60000, // 1분
    maxRequests: 5,
  });

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)),
        },
      }
    );
  }

  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const contactEmail = process.env.CONTACT_EMAIL || "jsh0218131@gmail.com";

    await resend.emails.send({
      from: "Sponsor Tracker <onboarding@resend.dev>",
      to: contactEmail,
      subject: `[문의] ${escapeHtml(name)}님의 문의`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #06b6d4;">새로운 문의가 도착했습니다</h2>
          <div style="background: #f4f4f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>이름:</strong> ${escapeHtml(name)}</p>
            <p><strong>이메일:</strong> ${escapeHtml(email)}</p>
            <p><strong>메시지:</strong></p>
            <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
          <p style="color: #71717a; font-size: 12px;">Sponsor Tracker Contact Form</p>
        </div>
      `,
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
