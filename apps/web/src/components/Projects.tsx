"use client";

import React, { useState, useEffect } from "react";
import { FolderGit2, ExternalLink, Layers, CheckCircle2, ChevronRight, Activity } from "lucide-react";
import { SEED_PROJECTS } from "@/lib/seed-data";
import type { IProject } from "@portfolio/shared";

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
        // Fallback already pre-set to SEED_PROJECTS
      }
    };
    fetchProjects();
  }, []);

  const categories = [
    { id: "all", label: "ALL_SYSTEMS" },
    { id: "observability", label: "OBSERVABILITY & SAN" },
    { id: "ai", label: "ENTERPRISE AI & RAG" },
    { id: "fullstack", label: "FULL-STACK & LEDGER" },
  ];

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-16 md:py-24 border-b border-blue-950/40 bg-[#02040a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-blue-950/80">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 mb-1.5 font-semibold">
              <FolderGit2 className="w-4 h-4" />
              <span>PRODUCTION_PORTFOLIO</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
              FEATURED ENGINEERING SYSTEMS
            </h2>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-xs text-slate-400">
            TOTAL_DEPLOYED: <span className="text-cyan-400 font-bold">{projects.length} SYSTEMS</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs transition-all ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-[0_0_15px_rgba(6,182,212,0.35)]"
                  : "bg-[#040a1c]/80 hover:bg-[#071333] text-slate-300 border border-blue-500/20"
              }`}
            >
              [ {cat.label} ]
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="glass-panel-dark rounded-2xl p-6 border border-blue-500/20 hover:border-cyan-400/50 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                {/* Header tags */}
                <div className="flex items-center justify-between mb-3.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-lg bg-blue-950/70 text-cyan-300 border border-blue-500/30">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-lg bg-cyan-950/40 text-cyan-300 border border-cyan-400/40 flex items-center gap-1.5 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                      CORE_SYS
                    </span>
                  )}
                </div>

                {/* Title & Tagline */}
                <h3 className="font-mono text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed font-normal">
                  {project.tagline}
                </p>

                {/* Architecture Highlights */}
                <div className="my-4 pt-3.5 border-t border-blue-950 space-y-2">
                  <div className="font-mono text-[10px] text-blue-300 uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                    <Layers className="w-3 h-3 text-cyan-400" />
                    <span>Architecture Highlights</span>
                  </div>
                  {project.architecture.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <ChevronRight className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Performance Metrics Grid */}
                <div className="grid grid-cols-2 gap-2.5 my-3.5 p-2.5 rounded-xl bg-[#040a1c]/80 border border-blue-500/20">
                  {Object.entries(project.metrics).slice(0, 2).map(([key, val]) => (
                    <div key={key}>
                      <div className="font-mono text-[9px] text-slate-400 uppercase">{key}</div>
                      <div className="font-mono text-xs font-bold text-cyan-300 mt-0.5">{val}</div>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mt-3.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] px-2.5 py-0.5 rounded-lg bg-[#071333]/90 text-slate-300 border border-blue-500/25"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 mt-5 border-t border-blue-950 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="font-mono text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
                >
                  <span>SPEC_DETAILS</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center space-x-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-[#050e26] border border-blue-500/25 text-slate-300 hover:text-white hover:border-cyan-400 transition-colors"
                      title="View GitHub Repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-[#050e26] border border-blue-500/25 text-slate-300 hover:text-cyan-300 hover:border-cyan-400 transition-colors"
                      title="Inspect Live Endpoint"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Project Spec Drill-Down */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="max-w-2xl w-full bg-[#04091a] border border-blue-500/40 rounded-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.9)] font-mono text-sm max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-blue-950 pb-4 mb-5">
                <div>
                  <span className="text-[10px] uppercase text-cyan-400 font-bold tracking-wider">
                    SYSTEM_SPEC // {selectedProject.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">{selectedProject.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                >
                  ✕
                </button>
              </div>

              <p className="text-slate-300 text-xs leading-relaxed mb-5 font-normal">
                {selectedProject.description}
              </p>

              <div className="space-y-4 text-xs">
                <div>
                  <h4 className="text-cyan-400 font-bold mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" /> ARCHITECTURAL BLUEPRINT:
                  </h4>
                  <ul className="space-y-1.5 pl-2">
                    {selectedProject.architecture.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-300">
                        <span className="text-cyan-400 font-bold">❖</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-cyan-400 font-bold mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> KEY ENGINEERING DELIVERABLES:
                  </h4>
                  <ul className="space-y-1.5 pl-2">
                    {selectedProject.highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-300">
                        <span className="text-emerald-400">✔</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-cyan-400 font-bold mb-2 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" /> PERFORMANCE TELEMETRY BENCHMARKS:
                  </h4>
                  <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-[#030716] border border-blue-950">
                    {Object.entries(selectedProject.metrics).map(([key, val]) => (
                      <div key={key}>
                        <div className="text-[10px] text-slate-400 uppercase">{key}</div>
                        <div className="text-cyan-300 font-bold text-sm mt-0.5">{val}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-blue-950 flex justify-end">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
                >
                  DISMISS
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
