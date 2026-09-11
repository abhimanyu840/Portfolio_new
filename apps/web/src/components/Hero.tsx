"use client";

import React from "react";
import { Terminal, Database, Server, Cpu, ArrowDown, ExternalLink, Code2 } from "lucide-react";
import { DEVELOPER_PROFILE } from "@/lib/seed-data";

interface HeroProps {
  onOpenTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal }) => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-indigo-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Status Header */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-indigo-900/40 mb-6 backdrop-blur font-mono text-[11px] text-slate-300 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
          <span className="text-indigo-300 font-semibold">ENTERPRISE TELEMETRY ACTIVE</span>
          <span className="text-slate-600">|</span>
          <span className="hidden sm:inline text-slate-400">HOST: PROD-SRV-01</span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="text-slate-400">AP-SOUTH // WIPRO + BITS PILANI</span>
        </div>

        {/* Main Title & Role */}
        <div className="space-y-4 max-w-4xl">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white font-mono">
            {DEVELOPER_PROFILE.name.toUpperCase()}
          </h1>
          <div className="font-mono text-base sm:text-xl md:text-2xl text-indigo-400 font-medium tracking-wide flex items-center gap-2 flex-wrap">
            <span>PYTHON</span>
            <span className="text-slate-600">•</span>
            <span>FASTAPI</span>
            <span className="text-slate-600">•</span>
            <span>REACT</span>
            <span className="text-slate-600">•</span>
            <span>LINUX/RHEL</span>
            <span className="text-slate-600">•</span>
            <span className="text-purple-400">OBSERVABILITY</span>
          </div>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl pt-2">
            Software Engineer with <strong className="text-white font-semibold">1.5+ years</strong> of enterprise technology experience.
            Architecting high-throughput telemetry ingestion pipelines, FastAPI microservices, and reactive monitoring consoles.
            Deep hands-on expertise with <span className="text-blue-300">NetApp</span>, <span className="text-indigo-300">Dell EMC</span>, <span className="text-purple-300">Hitachi VSP</span>, and <span className="text-cyan-300">Brocade SAN switches</span>. Currently pursuing an M.Tech at <span className="text-white font-medium">BITS Pilani</span> via the Wipro WILP initiative.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 mt-8 pt-2">
          <a
            href="#projects"
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-mono text-sm font-bold tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/25 active:scale-95"
          >
            <span>EXPLORE_PROJECTS</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenTerminal}
            className="px-5 py-3 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/60 text-slate-200 font-mono text-sm transition-all flex items-center gap-2 shadow-md hover:text-white"
          >
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span>&gt;_ OPEN_TERMINAL_HUD</span>
          </button>

          <a
            href="#contact"
            className="px-5 py-3 rounded-lg bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800 hover:border-purple-500/50 text-slate-300 hover:text-purple-300 font-mono text-sm transition-all flex items-center gap-2"
          >
            <span>TRANSMIT_INQUIRY</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Key Metrics Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-4">
          <div className="glass-panel p-4 rounded-lg border-l-2 border-l-indigo-500">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="font-mono text-xs uppercase tracking-wider">Enterprise Exp</span>
              <Server className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="font-mono text-2xl md:text-3xl font-bold text-white">1.5+ Yrs</div>
            <div className="font-mono text-[11px] text-slate-400 mt-1">Wipro Infrastructure</div>
          </div>

          <div className="glass-panel p-4 rounded-lg border-l-2 border-l-blue-500">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="font-mono text-xs uppercase tracking-wider">Monitored Fabric</span>
              <Database className="w-4 h-4 text-blue-400" />
            </div>
            <div className="font-mono text-2xl md:text-3xl font-bold text-white">500+</div>
            <div className="font-mono text-[11px] text-slate-400 mt-1">Storage Arrays &amp; SAN Ports</div>
          </div>

          <div className="glass-panel p-4 rounded-lg border-l-2 border-l-purple-500">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="font-mono text-xs uppercase tracking-wider">Telemetry Rate</span>
              <Cpu className="w-4 h-4 text-purple-400" />
            </div>
            <div className="font-mono text-2xl md:text-3xl font-bold text-white">12k/sec</div>
            <div className="font-mono text-[11px] text-slate-400 mt-1">InfluxDB &amp; Prometheus Flow</div>
          </div>

          <div className="glass-panel p-4 rounded-lg border-l-2 border-l-cyan-400">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="font-mono text-xs uppercase tracking-wider">Academic Track</span>
              <Code2 className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="font-mono text-2xl md:text-3xl font-bold text-white">M.Tech</div>
            <div className="font-mono text-[11px] text-slate-400 mt-1">BITS Pilani (Software Systems)</div>
          </div>
        </div>
      </div>
    </section>
  );
};
