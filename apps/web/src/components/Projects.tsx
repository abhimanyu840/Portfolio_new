"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
  const shouldReduceMotion = useReducedMotion();
  const springTransition = shouldReduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 450, damping: 35 };
  const panelTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.16, ease: "easeOut" as const };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion ? { duration: 0 } : { duration: 0.45, ease: "easeOut" as const },
    },
  };

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
    { id: "all", label: "All", count: projects.length },
    { id: "observability", label: "Observability", count: projects.filter((p) => p.category === "observability").length },
    { id: "ai", label: "AI & RAG", count: projects.filter((p) => p.category === "ai").length },
    { id: "fullstack", label: "Full-Stack", count: projects.filter((p) => p.category === "fullstack").length },
  ];

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const flagshipProject = projects.find((p) => p.slug === "unified-ops") || projects[0];

  return (
    <section id="projects" className="py-16 sm:py-20 md:py-24 lg:py-28 border-b border-slate-200 dark:border-white/[0.08] relative">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        variants={containerVariants}
      >
        {/* Section Header - Guaranteed Single Clean Line */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-5 border-b border-slate-200 dark:border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
              <FolderGit2 className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight whitespace-nowrap">
                Featured <span className="text-gradient-cyan">Systems</span>
              </h2>
              <span className="font-mono text-[10px] text-cyan-600 dark:text-cyan-400/80 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 uppercase hidden lg:inline-block whitespace-nowrap">
                01 // ARCHITECTURE
              </span>
            </div>
          </div>

          {/* Guaranteed Single-Line Segmented Tabs */}
          <div className="overflow-x-auto no-scrollbar">
            <div className="inline-flex items-center p-1 bg-slate-100/90 dark:bg-[#090c19]/90 backdrop-blur-md border border-slate-200 dark:border-white/[0.08] rounded-xl gap-1 shrink-0 flex-nowrap shadow-md dark:shadow-lg dark:shadow-black/40 relative">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`relative isolate px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-colors duration-200 cursor-pointer shrink-0 whitespace-nowrap ${
                      isActive
                        ? "text-cyan-700 dark:text-cyan-300 font-semibold"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-white/[0.04] border border-transparent"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeProjectsTab"
                        className="absolute inset-0 rounded-lg bg-white dark:bg-[#0c1222] dark:bg-gradient-to-r dark:from-cyan-500/20 dark:via-blue-600/25 dark:to-indigo-600/20 border border-slate-300/80 dark:border-cyan-500/40 shadow-sm dark:shadow-cyan-500/20 z-0 pointer-events-none"
                        transition={springTransition}
                      />
                    )}
                    <span className="relative z-10">{cat.label}</span>
                    <span
                      className={`relative z-10 text-[10px] font-mono px-1.5 py-0.2 rounded-md font-bold transition-colors ${
                        isActive
                          ? "bg-cyan-500/25 text-cyan-700 dark:text-cyan-200 border border-cyan-500/30"
                          : "bg-slate-200/80 text-slate-600 dark:bg-white/[0.06] dark:text-slate-400"
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Tab View Container with Smooth Framer Motion Transition */}
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={activeCategory}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={panelTransition}
          >
            {/* ========================================================= */}
            {/* FLAGSHIP BENTO SPOTLIGHT (UnifiedOps - Shown in "All" view) */}
            {/* ========================================================= */}
            {activeCategory === "all" && flagshipProject && (
              <motion.div
                variants={itemVariants}
                whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.005 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
                className="mb-10 p-6 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl glass-panel border border-cyan-500/30 hover:border-cyan-500/60 shadow-xl dark:shadow-2xl shadow-cyan-500/5 hover:shadow-cyan-500/10 transition-all relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/15 via-blue-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                  <div className="space-y-4 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 font-mono text-xs font-bold uppercase">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        FLAGSHIP PRODUCTION SYSTEM
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 font-mono text-xs">
                        ENTERPRISE SAN &amp; STORAGE
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-200 transition-colors">
                        {flagshipProject.title}
                      </h3>
                      <p className="text-sm sm:text-base text-cyan-700 dark:text-cyan-300/90 font-medium mt-1">
                        {flagshipProject.tagline}
                      </p>
                    </div>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                      {flagshipProject.description}
                    </p>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {flagshipProject.tags.map((t) => (
                        <motion.span
                          key={t}
                          whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] font-mono text-xs text-slate-700 dark:text-slate-300 transition-colors"
                        >
                          <span className="shrink-0">{getTechIcon(t, "w-3.5 h-3.5")}</span>
                          <span>{t}</span>
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Flagship Benchmarks & Action Card */}
                  <div className="lg:w-80 shrink-0 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50/90 dark:bg-black/60 border border-slate-200 dark:border-white/[0.1] flex flex-col justify-between space-y-4">
                    <div className="font-mono text-xs text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/[0.08]">
                      <span>Telemetry Benchmarks</span>
                      <Activity className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 animate-pulse" />
                    </div>

                    <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                      {Object.entries(flagshipProject.metrics).map(([key, val]) => (
                        <div key={key} className="p-2.5 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06]">
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase">{key}</div>
                          <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{val}</div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex flex-col gap-2">
                      <motion.button
                        onClick={() => setSelectedProject(flagshipProject)}
                        whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                        whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-white font-mono text-xs font-semibold shadow-md shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                      >
                        <span>Inspect System Architecture</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </motion.button>

                      {flagshipProject.githubUrl && (
                        <motion.a
                          href={flagshipProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                          whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                          className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-700 hover:text-slate-900 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] dark:border-white/[0.08] dark:text-slate-300 dark:hover:text-white font-mono text-xs font-medium transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>View GitHub Repository</span>
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

        {/* ========================================================= */}
        {/* PROJECTS BENTO GRID                                       */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(activeCategory === "all"
            ? projects.filter((p) => p.id !== (flagshipProject ? flagshipProject.id : ""))
            : filtered
          ).map((project) => {
            const isSingle = activeCategory !== "all" && filtered.length === 1;
            const categoryBadge =
              project.category === "observability"
                ? "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/30"
                : project.category === "ai"
                ? "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30"
                : "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30";

            return (
              <motion.div
                key={project.id}
                layout
                variants={itemVariants}
                whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.01 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
                className={`glass-panel p-6 sm:p-7 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-white/[0.08] hover:border-cyan-500/50 transition-all flex flex-col justify-between group hover:shadow-2xl hover:shadow-cyan-500/10 ${
                  isSingle ? "col-span-1 md:col-span-2" : ""
                }`}
              >
                <div>
                  {/* Category & Status Header */}
                  <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-200 dark:border-white/[0.06]">
                    <span className={`font-mono text-[11px] font-bold px-2.5 py-1 rounded-md border uppercase ${categoryBadge}`}>
                      {project.category}
                    </span>
                    <span className="font-mono text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                      <span>VERIFIED PRODUCTION</span>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-200 transition-colors">
                    {project.title}
                  </h3>
                  <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400/90 mt-1 mb-3">
                    {project.tagline}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills with Brand SVGs */}
                  <div className="flex flex-wrap items-center gap-1.5 my-3.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] font-mono text-xs text-slate-700 dark:text-slate-300"
                      >
                        <span className="shrink-0">{getTechIcon(tag, "w-3 h-3")}</span>
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>

                  {/* Architecture Bullet Highlights */}
                  <div className="space-y-2 mb-5">
                    {project.highlights.slice(0, 2).map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 mt-0.5 shrink-0" />
                        <span className="leading-snug">{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Metrics Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5 p-3 rounded-xl bg-slate-50/80 dark:bg-black/40 border border-slate-200 dark:border-white/[0.06] mb-4 font-mono text-xs">
                    {Object.entries(project.metrics).slice(0, 2).map(([key, val]) => (
                      <div key={key}>
                        <span className="text-slate-500 uppercase text-[10px] block">{key}</span>
                        <span className="text-slate-900 dark:text-white font-bold text-xs sm:text-sm mt-0.5 block">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-4 border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-mono text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
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
                        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
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
                        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-cyan-600 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] dark:text-slate-400 dark:hover:text-cyan-300 transition-colors cursor-pointer"
                        title="Live Deployment"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>

        {/* ========================================================= */}
        {/* ARCHITECTURE SPEC MODAL                                   */}
        {/* ========================================================= */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            >
              <div
                className="absolute inset-0"
                onClick={() => setSelectedProject(null)}
              />

              <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 10 }}
                transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", duration: 0.28, bounce: 0.15 }}
                className="relative z-10 w-full max-w-3xl rounded-2xl sm:rounded-3xl glass-panel bg-white/95 dark:bg-[#0c1020]/95 border border-slate-200 dark:border-white/[0.15] max-h-[90vh] flex flex-col shadow-2xl shadow-black/40 overflow-hidden"
              >
                {/* Modal Header - Pinned */}
                <div className="p-5 sm:p-7 md:px-8 md:py-6 border-b border-slate-200 dark:border-white/[0.08] flex items-start justify-between shrink-0">
                  <div>
                    <span className="font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase">
                      SYSTEM ARCHITECTURE SPECIFICATION
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                      {selectedProject.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                      {selectedProject.tagline}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Body - Scrollable */}
                <div className="p-5 sm:p-7 md:px-8 space-y-5 overflow-y-auto flex-1">
                  <div>
                    <h4 className="font-mono text-xs uppercase text-slate-600 dark:text-slate-400 mb-2 font-bold flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      <span>ENGINEERING ARCHITECTURE LAYERS:</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedProject.architecture.map((layer, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-xs font-mono text-slate-800 dark:text-slate-200 flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 shrink-0" />
                          <span>{layer}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-mono text-xs uppercase text-slate-600 dark:text-slate-400 mb-2 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                      <span>PRODUCTION ACHIEVEMENTS &amp; HARDENING:</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                      {selectedProject.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-slate-50 dark:bg-white/[0.02] p-2.5 rounded-lg border border-slate-200 dark:border-white/[0.04]">
                          <span className="text-cyan-600 dark:text-cyan-400 font-mono mt-0.5">•</span>
                          <span className="leading-relaxed">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-mono text-xs uppercase text-slate-600 dark:text-slate-400 mb-2 font-bold flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      <span>PERFORMANCE &amp; BENCHMARKS:</span>
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
                      {Object.entries(selectedProject.metrics).map(([key, val]) => (
                        <div key={key} className="p-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/[0.06]">
                          <div className="text-[10px] text-slate-500 uppercase">{key}</div>
                          <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">{val}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Badges */}
                  <div className="pt-2">
                    <div className="text-xs font-mono text-slate-600 dark:text-slate-400 mb-2 uppercase">Technology Stack:</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08] text-xs font-mono text-slate-700 dark:text-slate-300"
                        >
                          <span className="shrink-0">{getTechIcon(tag, "w-3.5 h-3.5")}</span>
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal Footer - Pinned */}
                <div className="p-4 sm:px-7 md:px-8 border-t border-slate-200 dark:border-white/[0.08] flex items-center justify-end gap-3 shrink-0 bg-slate-50/80 dark:bg-[#0a0d18]/80 backdrop-blur-sm">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] dark:text-white text-xs font-mono transition-all flex items-center gap-2 cursor-pointer border border-slate-200 dark:border-transparent"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>GitHub Code</span>
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold transition-all cursor-pointer shadow-md shadow-cyan-500/20 active:scale-95"
                  >
                    Close Specification
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
