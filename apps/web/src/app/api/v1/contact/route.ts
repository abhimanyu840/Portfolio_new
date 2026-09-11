import { NextRequest, NextResponse } from "next/server";
import { ContactSchema, type ApiResponse, type IContactSubmission } from "@portfolio/shared";
import { connectToDatabase } from "@/lib/db";
import { ContactModel } from "@/models/Contact";

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();
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

    const { name, email, subject, message } = parseResult.data;
    const submissionId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const createdAt = new Date().toISOString();

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
      } else {
        console.info(`[Contact Log (In-Memory Fallback)]: From ${name} <${email}>: "${subject}"`);
      }
    } catch (dbErr) {
      console.warn("[Contact DB Warning]: Could not persist to MongoDB, recorded in telemetry log:", dbErr);
    }

    const data: IContactSubmission = {
      id: submissionId,
      name,
      email,
      subject,
      message,
      createdAt,
      read: false,
    };

    return NextResponse.json<ApiResponse<IContactSubmission>>(
      {
        success: true,
        message: "Message transmitted successfully to telemetry buffer. Abhimanyu will review shortly.",
        data,
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : "Internal Server Error";
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
