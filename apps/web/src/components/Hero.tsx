"use client";

import React, { useState } from "react";
import { Terminal, Database, Server, Cpu, ArrowDown, ExternalLink, Code2, Sparkles, CheckCircle2, Layers } from "lucide-react";
import { DEVELOPER_PROFILE } from "@/lib/seed-data";
import { getTechIcon } from "@/components/TechIcons";

interface HeroProps {
  onOpenTerminal: () => void;
}

type PersonaMode = "sre" | "backend" | "fullstack";

interface PersonaConfig {
  title: string;
  badge: string;
  tagline: string;
  stats: { label: string; value: string; sub: string }[];
  skills: string[];
}

const PERSONAS: Record<PersonaMode, PersonaConfig> = {
  sre: {
    title: "Observability & SRE",
    badge: "ENTERPRISE TELEMETRY // WIPRO",
    tagline: "Centralized monitoring for 500+ SAN storage nodes, Brocade fabrics, SNMP/Syslog daemons, and InfluxDB time-series shards.",
    stats: [
      { label: "Monitored Fabric", value: "500+", sub: "NetApp, Dell EMC, Hitachi, Brocade" },
      { label: "Telemetry Stream", value: "12,000/s", sub: "Sub-second InfluxDB write rate" },
      { label: "Alert Latency", value: "< 1.8ms", sub: "Non-blocking AsyncIO trap engine" },
      { label: "System SLA", value: "99.95%", sub: "Enterprise production uptime" },
    ],
    skills: ["Python 3.11", "Linux/RHEL", "InfluxDB", "Grafana", "Prometheus", "Brocade SAN", "NetApp ONTAP"],
  },
  backend: {
    title: "Backend & Distributed APIs",
    badge: "FASTAPI & ASYNCIO ARCHITECTURE",
    tagline: "High-throughput asynchronous microservices, REST/WebSocket gateways, MongoDB persistence, and intelligent alert classifiers.",
    stats: [
      { label: "API Query Latency", value: "< 45ms", sub: "P99 sub-second response times" },
      { label: "Data Persistence", value: "MongoDB", sub: "Singleton Mongoose connection pool" },
      { label: "Concurrency", value: "AsyncIO", sub: "ZeroMQ & non-blocking event loops" },
      { label: "Microservices", value: "FastAPI", sub: "Pydantic typed contract schemas" },
    ],
    skills: ["FastAPI", "Python", "MongoDB", "AsyncIO", "Docker", "ZeroMQ", "Pydantic"],
  },
  fullstack: {
    title: "Modern Full-Stack Engineering",
    badge: "NEXT.JS 16 & REACT 19 APP ROUTER",
    tagline: "High-density developer consoles, interactive observability HUDs, reactive state management, and Turborepo monorepos.",
    stats: [
      { label: "Framework", value: "Next.js 16", sub: "React 19 Server & Client Components" },
      { label: "Monorepo Engine", value: "Turborepo", sub: "Orchestrated via Bun workspaces" },
      { label: "Design System", value: "Tailwind", sub: "Obsidian dark tech minimalist UI" },
      { label: "Academic Foundation", value: "M.Tech", sub: "BITS Pilani (Software Systems)" },
    ],
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Turborepo", "Bun", "Node.js"],
  },
};

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal }) => {
  const [activePersona, setActivePersona] = useState<PersonaMode>("sre");
  const persona = PERSONAS[activePersona];

  return (
    <section className="relative pt-28 pb-14 sm:pt-36 sm:pb-20 md:pt-40 md:pb-24 overflow-hidden border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Status Capsule */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur font-mono text-xs text-slate-300 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-300 font-semibold">AVAILABLE FOR PLATFORM &amp; SYSTEMS ROLES</span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-slate-400 hidden sm:inline">NOIDA, INDIA</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 font-mono text-xs text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Wipro Software Engineer // BITS Pilani M.Tech</span>
          </div>
        </div>

        {/* Main Typographic Hierarchy */}
        <div className="space-y-4 max-w-5xl">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white">
            Abhimanyu <span className="text-gradient-cyan">Kumar</span>
          </h1>

          <div className="text-lg sm:text-2xl md:text-3xl font-medium tracking-tight text-slate-200">
            Engineering High-Throughput <span className="text-cyan-400 font-semibold">Distributed Telemetry</span>, Resilient APIs &amp; Scalable Systems.
          </div>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-3xl pt-1">
            Software Engineer with <strong className="text-white font-semibold">1.5+ years</strong> of enterprise production experience at <strong className="text-white font-semibold">Wipro</strong>. Architecting telemetry daemons, FastAPI microservices, and reactive monitoring consoles across <span className="text-cyan-300 font-medium">NetApp</span>, <span className="text-blue-300 font-medium">Dell EMC</span>, <span className="text-indigo-300 font-medium">Hitachi VSP</span>, and <span className="text-purple-300 font-medium">Brocade SAN switches</span>. Currently pursuing M.Tech in Software Systems at <strong className="text-white font-semibold">BITS Pilani</strong>.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-3.5 mt-8 pt-2">
          <a
            href="#projects"
            className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-semibold tracking-wide transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/25 active:scale-95 cursor-pointer"
          >
            <span>Explore Featured Systems</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenTerminal}
            className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-cyan-500/50 text-slate-200 hover:text-cyan-200 font-mono text-xs sm:text-sm transition-all flex items-center gap-2 shadow-md cursor-pointer"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Terminal CLI [~]</span>
          </button>

          <a
            href="#hud"
            className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] hover:border-indigo-500/40 text-slate-300 hover:text-indigo-300 font-mono text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>Architecture Lab</span>
          </a>
        </div>

        {/* ========================================================= */}
        {/* INTERACTIVE PERSONA COMMAND DECK                          */}
        {/* ========================================================= */}
        <div className="mt-10 sm:mt-12 p-4 sm:p-6 md:p-7 rounded-2xl sm:rounded-3xl glass-panel border border-white/[0.1] relative overflow-hidden">
          {/* Subtle accent glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 mb-5 border-b border-white/[0.08] gap-3">
            <div>
              <div className="font-mono text-xs text-cyan-400 font-bold tracking-wider uppercase mb-1">
                ENGINEERING PROFILE DECK // SELECT SPECIALIZATION
              </div>
              <p className="text-xs text-slate-400">
                Click a focus area to inspect production telemetry, systems metrics, and tech stack.
              </p>
            </div>

            {/* Persona Switcher Buttons */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-1 p-1 bg-black/40 border border-white/[0.08] rounded-xl sm:rounded-full self-start lg:self-auto">
              {(["sre", "backend", "fullstack"] as PersonaMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setActivePersona(mode)}
                  className={`px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-full font-mono text-xs font-semibold transition-all cursor-pointer ${
                    activePersona === mode
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {mode === "sre" && "SRE & Telemetry"}
                  {mode === "backend" && "Backend & APIs"}
                  {mode === "fullstack" && "Full-Stack Web"}
                </button>
              ))}
            </div>
          </div>

          {/* Active Persona Spotlight Description */}
          <div className="mb-5 sm:mb-6 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="font-mono text-xs text-indigo-400 font-semibold mb-1">
                {persona.badge}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-3xl">
                {persona.tagline}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 shrink-0">
              {persona.skills.map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] font-mono text-[11px] text-slate-300"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* 4 Bento Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
            {persona.stats.map((stat, i) => (
              <div
                key={i}
                className="p-3.5 sm:p-4 rounded-xl bg-white/[0.025] hover:bg-white/[0.05] border border-white/[0.06] transition-all group"
              >
                <div className="text-[11px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                  {stat.label}
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-mono text-white group-hover:text-cyan-300 transition-colors">
                  {stat.value}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 font-mono truncate">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tech Stack Ribbon */}
        <div className="mt-8 pt-5 border-t border-white/[0.08] flex flex-col md:flex-row md:items-center gap-3">
          <span className="font-mono text-xs text-slate-400 uppercase tracking-wider flex-shrink-0 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>PRIMARY CORE STACK:</span>
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {[
              { name: "Python", border: "border-indigo-500/30 hover:border-indigo-400", bg: "bg-indigo-950/20" },
              { name: "FastAPI", border: "border-teal-500/30 hover:border-teal-400", bg: "bg-teal-950/20" },
              { name: "React", border: "border-cyan-500/30 hover:border-cyan-400", bg: "bg-cyan-950/20" },
              { name: "Next.js", border: "border-slate-500/30 hover:border-slate-400", bg: "bg-slate-900/40" },
              { name: "TypeScript", border: "border-sky-500/30 hover:border-sky-400", bg: "bg-sky-950/20" },
              { name: "Docker", border: "border-blue-500/30 hover:border-blue-400", bg: "bg-blue-950/20" },
              { name: "Linux", border: "border-amber-500/30 hover:border-amber-400", bg: "bg-amber-950/20" },
              { name: "MongoDB", border: "border-emerald-500/30 hover:border-emerald-400", bg: "bg-emerald-950/20" },
              { name: "HTML5", border: "border-orange-500/30 hover:border-orange-400", bg: "bg-orange-950/20" },
              { name: "CSS3", border: "border-blue-500/30 hover:border-blue-400", bg: "bg-blue-950/20" },
              { name: "JavaScript", border: "border-yellow-500/30 hover:border-yellow-400", bg: "bg-yellow-950/20" },
            ].map((tech) => (
              <a
                key={tech.name}
                href="#skills"
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm ${tech.border} ${tech.bg} text-slate-200`}
                title={`Inspect ${tech.name} production competency`}
              >
                <span className="flex-shrink-0">{getTechIcon(tech.name, "w-3.5 h-3.5")}</span>
                <span>{tech.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
