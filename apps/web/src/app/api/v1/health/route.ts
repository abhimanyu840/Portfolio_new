import { NextResponse } from "next/server";
import { getDatabaseStatus } from "@/lib/db";
import type { ApiResponse } from "@portfolio/shared";

export async function GET() {
  const data = {
    status: "healthy",
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    database: getDatabaseStatus(),
    environment: process.env.NODE_ENV || "development",
    service: "portfolio-nextjs-api",
    version: "1.0.0",
  };

  const response: ApiResponse<typeof data> = {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response, { status: 200 });
}
