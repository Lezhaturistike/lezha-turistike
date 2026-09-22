import {NextResponse} from "next/server";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const TO_EMAIL = "lezhaturistike@gmail.com";
const FROM_EMAIL = "Lezha Turistike <kontakt@lezhaturistike.com>";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json({ok: false, error: "Email service is not configured."}, {status: 500});
    }

    const body = await request.json();
    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim();
    const subject = String(body?.subject || "").trim();
    const message = String(body?.message || "").trim();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ok: false, error: "Missing required fields."}, {status: 400});
    }

    if (name.length > 120 || email.length > 254 || subject.length > 160 || message.length > 5000) {
      return NextResponse.json({ok: false, error: "Message is too long."}, {status: 400});
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json({ok: false, error: "Invalid email address."}, {status: 400});
    }

    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `[Lezha Turistike] ${subject}`,
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.6;color:#173d39">
            <h2 style="margin-bottom:20px">Mesazh i ri nga lezhaturistike.com</h2>
            <p><strong>Emri:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Subjekti:</strong> ${escapeHtml(subject)}</p>
            <hr style="border:0;border-top:1px solid #ddd;margin:24px 0" />
            <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
          </div>`
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Resend error:", response.status, error);
      return NextResponse.json({ok: false, error: "Email could not be sent."}, {status: 502});
    }

    return NextResponse.json({ok: true});
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ok: false, error: "Unexpected server error."}, {status: 500});
  }
}
