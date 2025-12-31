import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface DeadlineReminderProps {
  to: string;
  userName: string;
  dealTitle: string;
  brandName: string;
  deadline: string;
  daysLeft: number;
  dealUrl: string;
}

export async function sendDeadlineReminder({
  to,
  userName,
  dealTitle,
  brandName,
  deadline,
  daysLeft,
  dealUrl,
}: DeadlineReminderProps) {
  const urgencyText = daysLeft <= 1 ? "내일" : `${daysLeft}일 후`;
  const subject = `[마감 임박] ${dealTitle} - ${urgencyText} 마감`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 12px 12px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">⏰ 마감일 알림</h1>
  </div>

  <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px;">
    <p style="font-size: 16px; margin-bottom: 20px;">
      안녕하세요, <strong>${userName}</strong>님!
    </p>

    <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 20px; border-left: 4px solid ${daysLeft <= 1 ? '#ef4444' : '#f59e0b'};">
      <h2 style="margin: 0 0 10px 0; font-size: 18px; color: #1a1a1a;">
        ${dealTitle}
      </h2>
      <p style="margin: 5px 0; color: #666;">
        <strong>브랜드:</strong> ${brandName}
      </p>
      <p style="margin: 5px 0; color: #666;">
        <strong>마감일:</strong> ${deadline}
      </p>
      <p style="margin: 10px 0 0 0; font-size: 18px; font-weight: bold; color: ${daysLeft <= 1 ? '#ef4444' : '#f59e0b'};">
        D-${daysLeft} ${daysLeft <= 1 ? '🔥' : '⚠️'}
      </p>
    </div>

    <a href="${dealUrl}" style="display: inline-block; background: #667eea; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
      딜 확인하기 →
    </a>

    <p style="margin-top: 30px; font-size: 14px; color: #888;">
      이 이메일은 Sponsor Tracker에서 자동으로 발송되었습니다.<br>
      알림 설정은 설정 페이지에서 변경할 수 있습니다.
    </p>
  </div>
</body>
</html>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: "Sponsor Tracker <noreply@resend.dev>",
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Email send error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Email send exception:", error);
    return { success: false, error };
  }
}

interface DealStatusUpdateProps {
  to: string;
  userName: string;
  dealTitle: string;
  brandName: string;
  oldStatus: string;
  newStatus: string;
  dealUrl: string;
}

export async function sendStatusUpdateEmail({
  to,
  userName,
  dealTitle,
  brandName,
  oldStatus,
  newStatus,
  dealUrl,
}: DealStatusUpdateProps) {
  const subject = `[상태 변경] ${dealTitle} - ${newStatus}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #10b981; padding: 30px; border-radius: 12px 12px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">✅ 딜 상태 변경</h1>
  </div>

  <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px;">
    <p>안녕하세요, <strong>${userName}</strong>님!</p>

    <div style="background: white; border-radius: 8px; padding: 20px; margin: 20px 0;">
      <h2 style="margin: 0 0 10px 0;">${dealTitle}</h2>
      <p style="margin: 5px 0; color: #666;">브랜드: ${brandName}</p>
      <p style="margin: 10px 0;">
        <span style="color: #888; text-decoration: line-through;">${oldStatus}</span>
        →
        <strong style="color: #10b981;">${newStatus}</strong>
      </p>
    </div>

    <a href="${dealUrl}" style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none;">
      딜 확인하기
    </a>
  </div>
</body>
</html>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: "Sponsor Tracker <noreply@resend.dev>",
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Email send error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Email send exception:", error);
    return { success: false, error };
  }
}
