import { NextRequest, NextResponse } from "next/server";
import { ContactSchema, type ApiResponse, type IContactSubmission } from "@portfolio/shared";
import { connectToDatabase } from "@/lib/db";
import { ContactModel } from "@/models/Contact";

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

declare global {
  // eslint-disable-next-line no-var
  var contactRateLimitMap: Map<string, RateLimitRecord> | undefined;
  // eslint-disable-next-line no-var
  var contactSubmissionsBuffer: Array<IContactSubmission> | undefined;
}

const rateLimitMap: Map<string, RateLimitRecord> =
  global.contactRateLimitMap || new Map();
if (!global.contactRateLimitMap) {
  global.contactRateLimitMap = rateLimitMap;
}

const submissionsBuffer: Array<IContactSubmission> =
  global.contactSubmissionsBuffer || [];
if (!global.contactSubmissionsBuffer) {
  global.contactSubmissionsBuffer = submissionsBuffer;
}

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = process.env.NODE_ENV === "development" ? 50 : 5;

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "127.0.0.1";
}

export async function GET() {
  return NextResponse.json<ApiResponse<{ status: string; bufferSize: number; rateLimitWindowMinutes: number }>>({
    success: true,
    data: {
      status: "operational",
      bufferSize: submissionsBuffer.length,
      rateLimitWindowMinutes: 10,
    },
    message: "Contact transmission gateway is active and operational.",
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Invalid JSON format in request body",
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    if (!rawBody || typeof rawBody !== "object" || Array.isArray(rawBody)) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Request body must be a valid JSON object",
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    const parseResult = ContactSchema.safeParse(rawBody);

    if (!parseResult.success) {
      const errorDetails = parseResult.error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", ");
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: `Validation error: ${errorDetails}`,
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message, hp_company_field } = parseResult.data;
    const submissionId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const createdAt = new Date().toISOString();

    // Honeypot Bot Interception: Trap and return fake 201 without external dispatch or rate limit consumption
    if (hp_company_field && hp_company_field.trim() !== "") {
      console.warn(`[Contact Honeypot]: Intercepted bot transmission from ${clientIp}. Trapped without dispatch.`);
      return NextResponse.json<ApiResponse<IContactSubmission>>(
        {
          success: true,
          message: "Message transmitted successfully to telemetry buffer. Abhimanyu will review shortly.",
          data: {
            id: `msg_bot_${Date.now()}`,
            name,
            email,
            subject,
            message,
            createdAt,
            read: false,
          },
          timestamp: createdAt,
        },
        { status: 201 }
      );
    }

    // Rate Limiting for Genuine Transmissions
    const now = Date.now();
    const rateRecord = rateLimitMap.get(clientIp);

    if (rateRecord && now < rateRecord.resetTime) {
      if (rateRecord.count >= MAX_REQUESTS_PER_WINDOW) {
        const retryAfterSec = Math.ceil((rateRecord.resetTime - now) / 1000);
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            error: `Rate limit exceeded. Maximum ${MAX_REQUESTS_PER_WINDOW} transmissions per 10 minutes. Please retry in ${retryAfterSec}s.`,
            timestamp: new Date().toISOString(),
          },
          {
            status: 429,
            headers: {
              "Retry-After": String(retryAfterSec),
            },
          }
        );
      }
      rateRecord.count += 1;
    } else {
      rateLimitMap.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    }

    // Tier 1: Resend REST API Email Dispatch (Native fetch, zero npm dependencies)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey && resendApiKey.trim() !== "") {
      try {
        const toEmail = process.env.CONTACT_TO_EMAIL || "akabhimanyukumar111@gmail.com";
        const fromEmail = process.env.CONTACT_FROM_EMAIL || "Portfolio Inbound <onboarding@resend.dev>";

        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey.trim()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [toEmail],
            reply_to: email,
            subject: `[Portfolio Gateway] ${subject} (From: ${name})`,
            text: `New Portfolio Inbound Transmission:\n\nSender: ${name} <${email}>\nSubject: ${subject}\nTimestamp: ${createdAt}\nClient IP: ${clientIp}\n\nMessage:\n${message}`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #060813; color: #e2e8f0; padding: 32px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);">
                <div style="margin-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 16px;">
                  <h2 style="margin: 0; color: #06b6d4; font-size: 18px; font-family: monospace; letter-spacing: 1px;">05 // INBOUND TRANSMISSION RECEIVED</h2>
                  <div style="font-size: 12px; color: #64748b; font-family: monospace; margin-top: 4px;">ID: ${submissionId}</div>
                </div>
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                  <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                    <tr><td style="color: #94a3b8; padding: 6px 0; width: 110px;"><strong>Sender:</strong></td><td style="color: #ffffff;">${name}</td></tr>
                    <tr><td style="color: #94a3b8; padding: 6px 0;"><strong>Email:</strong></td><td><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a></td></tr>
                    <tr><td style="color: #94a3b8; padding: 6px 0;"><strong>Subject:</strong></td><td style="color: #ffffff;">${subject}</td></tr>
                    <tr><td style="color: #94a3b8; padding: 6px 0;"><strong>Timestamp:</strong></td><td style="color: #94a3b8; font-family: monospace; font-size: 12px;">${createdAt}</td></tr>
                  </table>
                </div>
                <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(6, 182, 212, 0.2); border-radius: 12px; padding: 20px;">
                  <div style="font-size: 11px; font-family: monospace; color: #06b6d4; margin-bottom: 8px; text-transform: uppercase;">Transmission Payload:</div>
                  <div style="font-size: 14px; line-height: 1.6; color: #f1f5f9; white-space: pre-wrap;">${message}</div>
                </div>
                <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.08); font-size: 12px; color: #64748b; text-align: center; font-family: monospace;">
                  Dispatched via Abhimanyu Kumar Developer Telemetry Gateway
                </div>
              </div>
            `,
          }),
        });

        if (!resendRes.ok) {
          const errText = await resendRes.text();
          console.warn("[Resend Email Warning]: Dispatch returned non-200 status:", resendRes.status, errText);
        } else {
          console.info(`[Resend Email]: Successfully dispatched email to ${toEmail} from ${name}`);
        }
      } catch (resendErr) {
        console.warn("[Resend Email Error]: Network failure calling Resend API:", resendErr);
      }
    }

    // Tier 2: Instant Webhook Dispatch (Discord / Slack / Telegram via native fetch)
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    if (webhookUrl && webhookUrl.trim() !== "") {
      try {
        let webhookPayload: Record<string, unknown>;

        if (webhookUrl.includes("discord.com/api/webhooks")) {
          webhookPayload = {
            username: "Portfolio Telemetry Gateway",
            embeds: [
              {
                title: `⚡ Inbound Transmission: ${subject}`,
                color: 40149, // Cyan-Blue tone
                fields: [
                  { name: "Sender", value: name, inline: true },
                  { name: "Email", value: email, inline: true },
                  { name: "Message", value: message.length > 1000 ? message.substring(0, 1000) + "..." : message },
                ],
                footer: { text: `Submission ID: ${submissionId} • IP: ${clientIp}` },
                timestamp: createdAt,
              },
            ],
          };
        } else {
          webhookPayload = {
            text: `*New Portfolio Transmission Received*\n*From:* ${name} <${email}>\n*Subject:* ${subject}\n*Message:*\n${message}`,
          };
        }

        const hookRes = await fetch(webhookUrl.trim(), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(webhookPayload),
        });

        if (!hookRes.ok) {
          console.warn("[Webhook Warning]: Webhook call returned non-200 status:", hookRes.status);
        } else {
          console.info("[Webhook]: Alert successfully delivered to webhook.");
        }
      } catch (hookErr) {
        console.warn("[Webhook Error]: Failed to dispatch webhook:", hookErr);
      }
    }

    // Tier 3: MongoDB Database Persistence
    try {
      const conn = await connectToDatabase();
      if (conn) {
        await ContactModel.create({
          name,
          email,
          subject,
          message,
          read: false,
        });
        console.info(`[Contact DB]: Persisted record for ${name} to MongoDB.`);
      }
    } catch (dbErr) {
      console.warn("[Contact DB Warning]: Could not persist to MongoDB, recording in memory buffer:", dbErr);
    }

    // Tier 4: In-Memory FIFO Telemetry Ring Buffer
    const data: IContactSubmission = {
      id: submissionId,
      name,
      email,
      subject,
      message,
      createdAt,
      read: false,
    };

    submissionsBuffer.unshift(data);
    if (submissionsBuffer.length > 20) {
      submissionsBuffer.pop();
    }
    console.info(`[Contact Buffer]: Submission ${submissionId} buffered. Total in memory: ${submissionsBuffer.length}`);

    return NextResponse.json<ApiResponse<IContactSubmission>>(
      {
        success: true,
        message: "Message transmitted successfully to telemetry buffer. Abhimanyu will review shortly.",
        data,
        timestamp: createdAt,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : "Internal Server Error";
    console.error("[Contact API Error]:", err);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: errMsg,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
