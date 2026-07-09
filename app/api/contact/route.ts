import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, message, website } = body;

    // Honeypot: legit users never fill this hidden field.
    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: "name, email, message は必須です" }, { status: 400 });
    }
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "メールアドレスの形式が正しくありません" }, { status: 400 });
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (secretKey) {
      if (!body.recaptchaToken) {
        return NextResponse.json({ error: "認証に失敗しました" }, { status: 403 });
      }
      const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${secretKey}&response=${body.recaptchaToken}`,
      });
      const verifyData = await verifyRes.json();
      if (!verifyData.success || verifyData.action !== "contact" || (verifyData.score ?? 1) < 0.5) {
        return NextResponse.json({ error: "認証に失敗しました" }, { status: 403 });
      }
    }

    const slackToken = process.env.SLACK_WAOJE_BOT_TOKEN;
    if (!slackToken) {
      console.error("SLACK_WAOJE_BOT_TOKEN is not set");
      return NextResponse.json({ error: "サーバー設定エラー" }, { status: 500 });
    }

    const summary = `*WAOJE ドバイ支部 お問い合わせ*\n*氏名:* ${name}\n*メール:* ${email}\n*会社名:* ${company || "-"}\n*内容:*\n${message}`;

    const slackRes = await fetch("https://slack.com/api/chat.postMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${slackToken}`,
      },
      body: JSON.stringify({
        channel: "C0BG5U0RXDL",
        text: summary,
        blocks: [
          {
            type: "section",
            text: { type: "mrkdwn", text: summary },
          },
        ],
      }),
    });

    const slackData = await slackRes.json();

    // Slack's API always returns HTTP 200; real success/failure is in the body's `ok` field.
    if (!slackRes.ok || !slackData.ok) {
      console.error("Slack post failed:", slackData);
      return NextResponse.json({ error: "送信に失敗しました" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("contact form error:", error);
    return NextResponse.json({ error: "サーバーエラーが発生しました" }, { status: 500 });
  }
}
