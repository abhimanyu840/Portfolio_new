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
    <section id="projects" className="py-16 md:py-24 border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 mb-1">
              <FolderGit2 className="w-4 h-4" />
              <span>PRODUCTION_PORTFOLIO</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-mono">
              FEATURED ENGINEERING SYSTEMS
            </h2>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-xs text-slate-400">
            TOTAL_DEPLOYED: <span className="text-emerald-400 font-bold">{projects.length} SYSTEMS</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded font-mono text-xs transition-all ${
                activeCategory === cat.id
                  ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                  : "bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800"
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
              className="glass-panel rounded-lg p-5 border border-slate-800 hover:border-emerald-500/40 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Header tags */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800/90 text-emerald-400 border border-slate-700">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      CORE_SYS
                    </span>
                  )}
                </div>

                {/* Title & Tagline */}
                <h3 className="font-mono text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {project.tagline}
                </p>

                {/* Architecture Highlights */}
                <div className="my-4 pt-3 border-t border-slate-800/80 space-y-1.5">
                  <div className="font-mono text-[10px] text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <Layers className="w-3 h-3 text-cyan-400" />
                    <span>Architecture Highlights</span>
                  </div>
                  {project.architecture.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-300">
                      <ChevronRight className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Performance Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 my-3 p-2 rounded bg-slate-900/60 border border-slate-800/80">
                  {Object.entries(project.metrics).slice(0, 2).map(([key, val]) => (
                    <div key={key}>
                      <div className="font-mono text-[9px] text-slate-400 uppercase">{key}</div>
                      <div className="font-mono text-xs font-bold text-emerald-400">{val}</div>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-800/70 text-slate-300 border border-slate-700/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 mt-5 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="font-mono text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
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
                      className="p-1.5 rounded bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
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
                      className="p-1.5 rounded bg-slate-800 text-slate-400 hover:text-emerald-400 hover:bg-slate-700"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="max-w-2xl w-full bg-[#0c121e] border border-slate-700 rounded-lg p-6 shadow-2xl font-mono text-sm max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div>
                  <span className="text-[10px] uppercase text-emerald-400 font-bold">
                    SYSTEM_SPEC // {selectedProject.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-0.5">{selectedProject.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <p className="text-slate-300 text-xs leading-relaxed mb-4">
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
                        <span className="text-emerald-400">❖</span>
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
                  <div className="grid grid-cols-2 gap-3 p-3 rounded bg-slate-900 border border-slate-800">
                    {Object.entries(selectedProject.metrics).map(([key, val]) => (
                      <div key={key}>
                        <div className="text-[10px] text-slate-400 uppercase">{key}</div>
                        <div className="text-emerald-400 font-bold text-sm">{val}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold"
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
