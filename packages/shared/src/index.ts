import { z } from "zod";

export interface IProject {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  category: "observability" | "ai" | "fullstack" | "infrastructure";
  tags: string[];
  architecture: string[];
  highlights: string[];
  metrics: Record<string, string>;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
}

export interface IExperience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  highlights: string[];
  techStack: string[];
}

export interface IEducation {
  institution: string;
  degree: string;
  program?: string;
  period: string;
  status: string;
  details: string[];
}

export interface ISkill {
  name: string;
  level: number; // 0-100
  highlight?: boolean;
}

export interface ISkillGroup {
  category: string;
  description: string;
  skills: ISkill[];
}

export interface ITelemetry {
  uptime: number;
  status: "healthy" | "degraded" | "maintenance";
  timestamp: string;
  environment: string;
  metrics: {
    projectsCount: number;
    databaseStatus: "connected" | "disconnected" | "in-memory-fallback";
    latencyMs: number;
    memoryUsage: string;
    activeNodes: number;
    healthScore: number;
  };
}

export const ContactSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address")
    .max(100, "Email must not exceed 100 characters"),
  subject: z
    .string({ required_error: "Subject is required" })
    .min(2, "Subject must be at least 2 characters")
    .max(150, "Subject must not exceed 150 characters"),
  message: z
    .string({ required_error: "Message is required" })
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must not exceed 2000 characters"),
  hp_company_field: z.string().optional(),
});

export type IContactRequest = z.infer<typeof ContactSchema>;

export interface IContactSubmission extends IContactRequest {
  id: string;
  createdAt: string;
  read: boolean;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}
