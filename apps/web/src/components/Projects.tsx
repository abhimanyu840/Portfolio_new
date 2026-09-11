"use client";

import React, { useState, useEffect } from "react";
import { FolderGit2, ExternalLink, Layers, CheckCircle2, ChevronRight } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { SEED_PROJECTS } from "@/lib/seed-data";
import type { IProject } from "@portfolio/shared";

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
    { id: "all", label: "All Systems" },
    { id: "observability", label: "Observability & SAN" },
    { id: "ai", label: "Enterprise AI & RAG" },
    { id: "fullstack", label: "Full-Stack & Ledger" },
  ];

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-16 md:py-24 border-b border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-zinc-800/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1.5 font-medium">
              <FolderGit2 className="w-4 h-4 text-zinc-300" />
              <span>SELECTED PROJECTS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Featured Engineering Work
            </h2>
          </div>
          <div className="mt-4 md:mt-0 text-xs font-mono text-zinc-400">
            {projects.length} Production Systems
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-zinc-100 text-zinc-950 font-semibold shadow-sm"
                  : "bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 border border-zinc-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="card-subtle rounded-xl p-6 flex flex-col justify-between group transition-all"
            >
              <div>
                {/* Header tags */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-300 border border-zinc-700/60 font-medium">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Core Platform
                    </span>
                  )}
                </div>

                {/* Title & Tagline */}
                <h3 className="text-lg font-bold text-white group-hover:text-zinc-200 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                  {project.tagline}
                </p>

                {/* Architecture Highlights */}
                <div className="my-4 pt-3.5 border-t border-zinc-800/80 space-y-1.5">
                  <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider flex items-center gap-1.5 font-medium">
                    <Layers className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Architecture Highlights</span>
                  </div>
                  {project.architecture.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <ChevronRight className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Performance Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 my-3.5 p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                  {Object.entries(project.metrics).slice(0, 2).map(([key, val]) => (
                    <div key={key}>
                      <div className="text-[10px] font-mono text-zinc-500 uppercase">{key}</div>
                      <div className="text-xs font-semibold text-zinc-200 mt-0.5 font-mono">{val}</div>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mt-3.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-5 border-t border-zinc-800 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-medium text-zinc-300 hover:text-white flex items-center gap-1"
                >
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center space-x-1.5">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
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
                      className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
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
            <div className="max-w-2xl w-full bg-[#121214] border border-zinc-700/80 rounded-xl p-6 sm:p-8 shadow-2xl text-sm max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
                <div>
                  <span className="text-[11px] uppercase font-mono text-zinc-400 font-semibold tracking-wider">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-0.5">{selectedProject.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
                >
                  ✕
                </button>
              </div>

              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-5">
                {selectedProject.description}
              </p>

              <div className="space-y-4 text-xs">
                <div>
                  <h4 className="text-zinc-200 font-semibold mb-2 flex items-center gap-1.5 font-mono">
                    <Layers className="w-3.5 h-3.5 text-zinc-400" /> Architectural Blueprint:
                  </h4>
                  <ul className="space-y-1.5 pl-2">
                    {selectedProject.architecture.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-zinc-300">
                        <span className="text-zinc-500">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-zinc-200 font-semibold mb-2 flex items-center gap-1.5 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Key Engineering Deliverables:
                  </h4>
                  <ul className="space-y-1.5 pl-2">
                    {selectedProject.highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-zinc-300">
                        <span className="text-emerald-500">✔</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-zinc-200 font-semibold mb-2 flex items-center gap-1.5 font-mono">
                    Performance Telemetry Benchmarks:
                  </h4>
                  <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                    {Object.entries(selectedProject.metrics).map(([key, val]) => (
                      <div key={key}>
                        <div className="text-[10px] font-mono text-zinc-500 uppercase">{key}</div>
                        <div className="text-zinc-200 font-semibold text-sm font-mono mt-0.5">{val}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-end">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
