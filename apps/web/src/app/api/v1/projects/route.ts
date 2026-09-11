import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { ProjectModel } from "@/models/Project";
import { SEED_PROJECTS } from "@/lib/seed-data";
import type { ApiResponse, IProject } from "@portfolio/shared";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");

  try {
    const conn = await connectToDatabase();
    let projects: IProject[] = [];

    if (conn) {
      const query: Record<string, unknown> = {};
      if (category && category !== "all") {
        query.category = category;
      }
      if (featured === "true") {
        query.featured = true;
      }

      const docs = await ProjectModel.find(query).sort({ order: 1, createdAt: -1 }).lean();

      if (docs && docs.length > 0) {
        projects = docs.map((doc) => ({
          id: String(doc._id || doc.slug),
          title: doc.title,
          slug: doc.slug,
          tagline: doc.tagline,
          description: doc.description,
          category: doc.category as IProject["category"],
          tags: doc.tags || [],
          architecture: doc.architecture || [],
          highlights: doc.highlights || [],
          metrics: doc.metrics instanceof Map ? Object.fromEntries(doc.metrics) : (doc.metrics as Record<string, string>) || {},
          githubUrl: doc.githubUrl,
          liveUrl: doc.liveUrl,
          featured: Boolean(doc.featured),
          order: doc.order ?? 0,
        }));
      }
    }

    // Fallback to seed data if database is empty or not connected
    if (projects.length === 0) {
      projects = [...SEED_PROJECTS];
      if (category && category !== "all") {
        projects = projects.filter((p) => p.category === category);
      }
      if (featured === "true") {
        projects = projects.filter((p) => p.featured);
      }
    }

    const response: ApiResponse<IProject[]> = {
      success: true,
      data: projects,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("[Projects API Error]", error);

    // Resilient fallback
    let fallback = [...SEED_PROJECTS];
    if (category && category !== "all") {
      fallback = fallback.filter((p) => p.category === category);
    }
    if (featured === "true") {
      fallback = fallback.filter((p) => p.featured);
    }

    return NextResponse.json(
      {
        success: true,
        data: fallback,
        message: "Served from local telemetry seed cache",
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  }
}
