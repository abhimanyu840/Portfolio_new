import { NextResponse } from "next/server";
import { getDatabaseStatus } from "@/lib/db";
import { SEED_PROJECTS } from "@/lib/seed-data";
import type { ApiResponse, ITelemetry } from "@portfolio/shared";

export async function GET() {
  const start = performance.now();
  const dbStatus = getDatabaseStatus();
  const latency = Math.max(1, Math.round(performance.now() - start));
  const memUsage = process.memoryUsage();
  const memMB = `${Math.round(memUsage.heapUsed / 1024 / 1024)}MB / ${Math.round(memUsage.heapTotal / 1024 / 1024)}MB`;

  const telemetryData: ITelemetry = {
    uptime: Math.floor(process.uptime()),
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    metrics: {
      projectsCount: SEED_PROJECTS.length,
      databaseStatus: dbStatus,
      latencyMs: latency,
      memoryUsage: memMB,
      activeNodes: 4,
      healthScore: 99.9,
    },
  };

  const response: ApiResponse<ITelemetry> = {
    success: true,
    data: telemetryData,
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response, { status: 200 });
}
