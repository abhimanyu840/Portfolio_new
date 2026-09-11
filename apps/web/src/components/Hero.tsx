"use client";

import React from "react";
import { Terminal, Calendar, Database, Gauge, GraduationCap, ChevronRight, ArrowRight, ExternalLink } from "lucide-react";
import { DEVELOPER_PROFILE } from "@/lib/seed-data";
import { HoloConsole } from "@/components/HoloConsole";

interface HeroProps {
  onOpenTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal }) => {
  return (
    <section className="relative pt-24 pb-8 md:pt-28 md:pb-12 overflow-hidden border-b border-blue-900/30 bg-[#02040a]">
      {/* Background radial glow accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Decorative Dot Matrix on Flanks */}
      <div className="hidden xl:block absolute left-8 top-32 font-mono text-[10px] text-blue-400/20 leading-tight select-none pointer-events-none">
        <div>• • • •</div>
        <div>• • • •</div>
        <div>• • • •</div>
        <div>• • • •</div>
        <div>• • • •</div>
      </div>
      <div className="hidden xl:block absolute right-8 top-32 font-mono text-[10px] text-blue-400/20 leading-tight select-none pointer-events-none">
        <div>• • • •</div>
        <div>• • • •</div>
        <div>• • • •</div>
        <div>• • • •</div>
        <div>• • • •</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Status Capsule Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#050b1f]/90 border border-cyan-500/30 mb-5 sm:mb-6 backdrop-blur-md font-mono text-[10px] sm:text-[11px] text-slate-300 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-emerald-400 font-bold tracking-wider">ENTERPRISE TELEMETRY ACTIVE</span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-300 font-medium">HOST: PROD-SRV-01</span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-400 hidden sm:inline">AP-SOUTH / WIPRO + BITS PILANI</span>
        </div>

        {/* Hero Two-Column Grid (Left: Typography & CTAs, Right: 3D Holographic Console) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          {/* Left Column (Span 7) */}
          <div className="lg:col-span-7 space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.85rem] font-black tracking-tight text-white uppercase drop-shadow-[0_0_25px_rgba(56,189,248,0.25)] whitespace-normal sm:whitespace-nowrap">
              {DEVELOPER_PROFILE.name}
            </h1>

            {/* Tech Subheader */}
            <div className="font-mono text-xs sm:text-sm md:text-base text-cyan-400 font-bold tracking-wider flex items-center gap-2 sm:gap-2.5 flex-wrap drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">
              <span>PYTHON</span>
              <span className="text-blue-500">•</span>
              <span>FASTAPI</span>
              <span className="text-blue-500">•</span>
              <span>REACT</span>
              <span className="text-blue-500">•</span>
              <span>LINUX/RHEL</span>
              <span className="text-blue-500">•</span>
              <span className="text-cyan-300">OBSERVABILITY</span>
            </div>

            {/* Bio Paragraph */}
            <p className="text-xs sm:text-sm md:text-[15px] text-slate-300 leading-relaxed max-w-2xl font-normal pt-1">
              Software Engineer with <strong className="text-white font-bold">1.5+ years</strong> of enterprise technology experience. Architecting high-throughput telemetry ingestion pipelines, FastAPI microservices, and reactive monitoring consoles. Deep hands-on expertise with <span className="text-cyan-400 font-semibold">NetApp</span>, <span className="text-cyan-400 font-semibold">Dell EMC</span>, <span className="text-cyan-400 font-semibold">Hitachi VSP</span>, and <span className="text-cyan-400 font-semibold">Brocade SAN switches</span>. Currently pursuing an M.Tech at <strong className="text-white font-bold">BITS Pilani</strong> via the Wipro WILP initiative.
            </p>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              {/* Primary CTA Button */}
              <a
                href="#projects"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono text-xs sm:text-sm font-bold tracking-wider transition-all flex items-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.45)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>🚀 EXPLORE_PROJECTS</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Secondary CTA: Terminal HUD */}
              <button
                onClick={onOpenTerminal}
                className="px-5 py-3 rounded-xl bg-[#07112c]/80 hover:bg-blue-950/80 border border-blue-500/40 hover:border-cyan-400 text-slate-200 hover:text-white font-mono text-xs sm:text-sm transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="text-cyan-400 font-bold">&gt;_</span>
                <span>OPEN_TERMINAL_HUD</span>
              </button>

              {/* Tertiary CTA: Contact */}
              <a
                href="#contact"
                className="px-5 py-3 rounded-xl bg-[#060e24]/60 hover:bg-slate-800/70 border border-blue-500/25 hover:border-blue-400 text-slate-300 hover:text-white font-mono text-xs sm:text-sm transition-all flex items-center gap-1.5"
              >
                <span>TRANSMIT_INQUIRY</span>
                <ExternalLink className="w-3.5 h-3.5 text-blue-300" />
              </a>
            </div>
          </div>

          {/* Right Column (Span 5): 3D Holographic Developer Console Graphic */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end mt-4 lg:mt-0">
            <HoloConsole />
          </div>
        </div>

        {/* Bottom Metrics Ribbon: 4 High-Tech Glass Cards from updated_ui.png */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 sm:mt-10">
          {/* Card 1: Enterprise Exp */}
          <div className="glass-panel-dark p-5 rounded-2xl relative overflow-hidden group transition-all duration-300 hover:border-cyan-400/50">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 border border-blue-400/40 flex items-center justify-center text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="w-7 h-7 rounded-full bg-blue-950/60 border border-blue-500/30 flex items-center justify-center text-blue-300 group-hover:text-cyan-300 group-hover:border-cyan-400 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
            <div className="font-mono text-[10px] text-blue-300 uppercase tracking-wider font-semibold">
              ENTERPRISE EXP
            </div>
            <div className="font-mono text-2xl sm:text-3xl font-black text-white mt-0.5">
              1.5+ Yrs
            </div>
            <div className="font-mono text-xs text-slate-400 mt-1">
              Wipro Infrastructure
            </div>

            {/* Sparkline curve at bottom */}
            <div className="mt-3 h-8 w-full">
              <svg className="w-full h-full" viewBox="0 0 160 36" fill="none">
                <defs>
                  <linearGradient id="gradWave1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 26 C 25 26, 45 10, 75 18 C 105 26, 125 6, 160 14"
                  stroke="url(#gradWave1)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Card 2: Monitored Fabric */}
          <div className="glass-panel-dark p-5 rounded-2xl relative overflow-hidden group transition-all duration-300 hover:border-cyan-400/50">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 border border-cyan-400/40 flex items-center justify-center text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <Database className="w-5 h-5" />
              </div>
              <div className="w-7 h-7 rounded-full bg-blue-950/60 border border-blue-500/30 flex items-center justify-center text-blue-300 group-hover:text-cyan-300 group-hover:border-cyan-400 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
            <div className="font-mono text-[10px] text-cyan-300 uppercase tracking-wider font-semibold">
              MONITORED FABRIC
            </div>
            <div className="font-mono text-2xl sm:text-3xl font-black text-white mt-0.5">
              500+
            </div>
            <div className="font-mono text-xs text-slate-400 mt-1">
              Storage Arrays &amp; SAN Ports
            </div>

            {/* Server array graphic at bottom right */}
            <div className="mt-3 flex justify-end">
              <div className="w-16 h-8 rounded bg-blue-950/60 border border-cyan-500/30 p-1 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-1 rounded bg-cyan-400/60"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="w-8 h-1 rounded bg-blue-400/60"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="w-8 h-1 rounded bg-cyan-400/60"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Telemetry Rate */}
          <div className="glass-panel-dark p-5 rounded-2xl relative overflow-hidden group transition-all duration-300 hover:border-cyan-400/50">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 border border-purple-400/40 flex items-center justify-center text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]">
                <Gauge className="w-5 h-5" />
              </div>
              <div className="w-7 h-7 rounded-full bg-blue-950/60 border border-blue-500/30 flex items-center justify-center text-blue-300 group-hover:text-cyan-300 group-hover:border-cyan-400 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
            <div className="font-mono text-[10px] text-purple-300 uppercase tracking-wider font-semibold">
              TELEMETRY RATE
            </div>
            <div className="font-mono text-2xl sm:text-3xl font-black text-white mt-0.5">
              12k/sec
            </div>
            <div className="font-mono text-xs text-slate-400 mt-1">
              InfluxDB &amp; Prometheus Flow
            </div>

            {/* Sparkline curve at bottom */}
            <div className="mt-3 h-8 w-full">
              <svg className="w-full h-full" viewBox="0 0 160 36" fill="none">
                <defs>
                  <linearGradient id="gradWave3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 24 C 20 28, 40 8, 65 14 C 90 20, 115 4, 160 18"
                  stroke="url(#gradWave3)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Card 4: Academic Track */}
          <div className="glass-panel-dark p-5 rounded-2xl relative overflow-hidden group transition-all duration-300 hover:border-cyan-400/50">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-600 to-indigo-600 border border-cyan-400/40 flex items-center justify-center text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="w-7 h-7 rounded-full bg-blue-950/60 border border-blue-500/30 flex items-center justify-center text-blue-300 group-hover:text-cyan-300 group-hover:border-cyan-400 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
            <div className="font-mono text-[10px] text-cyan-300 uppercase tracking-wider font-semibold">
              ACADEMIC TRACK
            </div>
            <div className="font-mono text-2xl sm:text-3xl font-black text-white mt-0.5">
              M.Tech
            </div>
            <div className="font-mono text-xs text-slate-400 mt-1">
              BITS Pilani (Software Systems)
            </div>

            {/* University clock tower silhouette at bottom right */}
            <div className="mt-2 flex justify-end">
              <svg className="w-20 h-9" viewBox="0 0 100 45" fill="none">
                <path
                  d="M45 40 V 18 L 50 10 L 55 18 V 40 Z M35 40 V 26 H 45 V 40 Z M55 40 V 26 H 65 V 40 Z M20 40 V 30 H 35 V 40 Z M65 40 V 30 H 80 V 40 Z"
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                  strokeOpacity="0.5"
                />
                <circle cx="50" cy="18" r="2" fill="#38bdf8" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Details from updated_ui.png: Netlify Badge, Fiber Optic Rail & Terminal Nodes */}
        <div className="mt-10 pt-4 flex items-center justify-between">
          {/* Netlify circular badge with glowing cyan ring */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#050e26] border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.6)] group cursor-pointer" title="Deployed on Netlify Edge">
              <span className="font-black text-white text-xs font-mono">N</span>
            </div>
            <span className="font-mono text-[11px] text-slate-400 hidden sm:inline">
              NETLIFY_EDGE_ACTIVE
            </span>
          </div>

          {/* Fiber Optic Rail with Glowing Data Node */}
          <div className="flex-1 mx-6 relative flex items-center">
            {/* The Rail Line */}
            <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-blue-500/40 to-cyan-400/80"></div>
            {/* Glowing Pulse Node */}
            <div className="absolute right-1/4 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f0ff] animate-pulse"></div>
          </div>

          {/* Terminal Dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]"></span>
          </div>
        </div>
      </div>
    </section>
  );
};
