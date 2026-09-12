"use client";

import React, { useState, useEffect } from "react";
import {
  FolderGit2,
  ExternalLink,
  Layers,
  CheckCircle2,
  ChevronRight,
  Activity,
  Sparkles,
  ArrowUpRight,
  X,
  Sliders,
  Cpu,
  Server,
  BarChart2,
} from "lucide-react";
import { SEED_PROJECTS } from "@/lib/seed-data";
import type { IProject } from "@portfolio/shared";
import { getTechIcon } from "@/components/TechIcons";

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<IProject[]>(SEED_PROJECTS);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/v1/projects");
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            setProjects(json.data);
          }
        }
      } catch {
        // Fallback pre-set to SEED_PROJECTS
      }
    };
    fetchProjects();
  }, []);

  const categories = [
    { id: "all", label: "All Systems", count: projects.length },
    { id: "observability", label: "Observability & SAN", count: projects.filter((p) => p.category === "observability").length },
    { id: "ai", label: "Enterprise AI & RAG", count: projects.filter((p) => p.category === "ai").length },
    { id: "fullstack", label: "Full-Stack Platforms", count: projects.filter((p) => p.category === "fullstack").length },
  ];

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const flagshipProject = projects.find((p) => p.slug === "unified-ops") || projects[0];

  return (
    <section id="projects" className="py-16 sm:py-20 md:py-24 lg:py-28 border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-white/[0.08] gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 mb-2">
              <FolderGit2 className="w-4 h-4 text-cyan-400" />
              <span>01 // PRODUCTION ARCHITECTURE SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Engineering Systems
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl">
              Production-grade distributed telemetry engines, asynchronous FastAPI microservices, and reactive full-stack applications.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 sm:p-1.5 bg-black/40 border border-white/[0.08] rounded-2xl sm:rounded-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeCategory === cat.id ? "bg-white/20 text-white" : "bg-white/[0.06] text-slate-400"}`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* FLAGSHIP BENTO SPOTLIGHT (UnifiedOps)                      */}
        {/* ========================================================= */}
        {(activeCategory === "all" || activeCategory === "observability") && flagshipProject && (
          <div className="mb-10 p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl glass-panel border border-cyan-500/30 hover:border-cyan-500/50 shadow-2xl shadow-cyan-500/5 transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/10 via-blue-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="space-y-4 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    FLAGSHIP PRODUCTION SYSTEM
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-slate-300 font-mono text-xs">
                    ENTERPRISE SAN &amp; STORAGE
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-cyan-200 transition-colors">
                    {flagshipProject.title}
                  </h3>
                  <p className="text-sm sm:text-base text-cyan-300/90 font-medium mt-1">
                    {flagshipProject.tagline}
                  </p>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                  {flagshipProject.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {flagshipProject.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] font-mono text-xs text-slate-300"
                    >
                      <span className="shrink-0">{getTechIcon(t, "w-3.5 h-3.5")}</span>
                      <span>{t}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Flagship Benchmarks & Action Card */}
              <div className="lg:w-80 shrink-0 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-black/60 border border-white/[0.1] flex flex-col justify-between space-y-4">
                <div className="font-mono text-xs text-slate-400 uppercase tracking-wider flex items-center justify-between pb-2 border-b border-white/[0.08]">
                  <span>Telemetry Benchmarks</span>
                  <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                </div>

                <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                  {Object.entries(flagshipProject.metrics).map(([key, val]) => (
                    <div key={key} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <div className="text-[10px] text-slate-400 uppercase">{key}</div>
                      <div className="text-sm font-bold text-white mt-0.5">{val}</div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => setSelectedProject(flagshipProject)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-white font-mono text-xs font-semibold shadow-md shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <span>Inspect System Architecture</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  {flagshipProject.githubUrl && (
                    <a
                      href={flagshipProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white font-mono text-xs font-medium transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>View GitHub Repository</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SECONDARY PROJECTS BENTO GRID                             */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered
            .filter((p) => p.id !== (activeCategory === "all" ? "unified-ops" : ""))
            .map((project) => (
              <div
                key={project.id}
                className="glass-panel p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/[0.08] hover:border-white/[0.18] transition-all flex flex-col justify-between group hover:shadow-xl hover:shadow-black/50"
              >
                <div>
                  {/* Category & Status Header */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
                    <span className="font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-cyan-300 uppercase">
                      {project.category}
                    </span>
                    <span className="font-mono text-xs text-slate-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>VERIFIED PRODUCTION</span>
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-200 transition-colors">
                    {project.title}
                  </h3>
                  <div className="text-xs font-mono text-cyan-400/90 mt-1 mb-3">
                    {project.tagline}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Architecture Bullet Highlights */}
                  <div className="space-y-1.5 mb-5">
                    {project.highlights.slice(0, 2).map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                        <span className="leading-snug">{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Metrics Bar */}
                  <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-black/40 border border-white/[0.06] mb-4 font-mono text-[11px]">
                    {Object.entries(project.metrics).slice(0, 2).map(([key, val]) => (
                      <div key={key}>
                        <span className="text-slate-500">{key}: </span>
                        <span className="text-white font-bold">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Inspect System Architecture</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors cursor-pointer"
                        title="GitHub Source"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
                        title="Live Deployment"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* ========================================================= */}
        {/* ARCHITECTURE SPEC MODAL                                   */}
        {/* ========================================================= */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div
              className="absolute inset-0"
              onClick={() => setSelectedProject(null)}
            />

            <div className="relative z-10 w-full max-w-3xl rounded-3xl glass-panel border border-white/[0.15] p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl shadow-black">
              {/* Modal Header */}
              <div className="flex items-start justify-between pb-4 mb-4 border-b border-white/[0.08]">
                <div>
                  <span className="font-mono text-xs font-bold text-cyan-400 uppercase">
                    SYSTEM ARCHITECTURE SPECIFICATION
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-1">
                    {selectedProject.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    {selectedProject.tagline}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="space-y-5">
                <div>
                  <h4 className="font-mono text-xs uppercase text-slate-400 mb-2 font-bold flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span>ENGINEERING ARCHITECTURE LAYERS:</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedProject.architecture.map((layer, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-slate-200 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                        <span>{layer}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-mono text-xs uppercase text-slate-400 mb-2 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>PRODUCTION ACHIEVEMENTS &amp; HARDENING:</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {selectedProject.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.04]">
                        <span className="text-cyan-400 font-mono mt-0.5">•</span>
                        <span className="leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-mono text-xs uppercase text-slate-400 mb-2 font-bold flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    <span>PERFORMANCE &amp; BENCHMARKS:</span>
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
                    {Object.entries(selectedProject.metrics).map(([key, val]) => (
                      <div key={key} className="p-3 rounded-xl bg-black/40 border border-white/[0.06]">
                        <div className="text-[10px] text-slate-500 uppercase">{key}</div>
                        <div className="text-sm font-bold text-white mt-1">{val}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Badges */}
                <div className="pt-2">
                  <div className="text-xs font-mono text-slate-400 mb-2 uppercase">Technology Stack:</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs font-mono text-slate-300"
                      >
                        <span className="shrink-0">{getTechIcon(tag, "w-3.5 h-3.5")}</span>
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-end gap-3">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white text-xs font-mono transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub Code</span>
                  </a>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold transition-all cursor-pointer shadow-md shadow-cyan-500/20"
                >
                  Close Specification
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
