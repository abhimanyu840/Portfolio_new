"use client";

import React from "react";
import { ArrowRight, Terminal, Mail, Server, Database, Activity, GraduationCap } from "lucide-react";
import { DEVELOPER_PROFILE } from "@/lib/seed-data";
import { CodeWindow } from "@/components/CodeWindow";

interface HeroProps {
  onOpenTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal }) => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 border-b border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 mb-6 text-xs text-zinc-300 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-medium text-zinc-200">Software Engineer @ Wipro</span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-400">M.Tech @ BITS Pilani</span>
        </div>

        {/* Hero Grid: Left Content, Right Code Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column (Span 7) */}
          <div className="lg:col-span-7 space-y-5">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              Building high-throughput telemetry pipelines &amp; resilient backend systems.
            </h1>

            {/* Core Tech Pill Bar */}
            <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
              <span className="px-2.5 py-1 rounded-md bg-zinc-900 text-zinc-200 border border-zinc-800 font-medium">
                Python
              </span>
              <span className="px-2.5 py-1 rounded-md bg-zinc-900 text-zinc-200 border border-zinc-800 font-medium">
                FastAPI
              </span>
              <span className="px-2.5 py-1 rounded-md bg-zinc-900 text-zinc-200 border border-zinc-800 font-medium">
                React
              </span>
              <span className="px-2.5 py-1 rounded-md bg-zinc-900 text-zinc-200 border border-zinc-800 font-medium">
                Linux / RHEL
              </span>
              <span className="px-2.5 py-1 rounded-md bg-zinc-900 text-zinc-200 border border-zinc-800 font-medium">
                InfluxDB
              </span>
              <span className="px-2.5 py-1 rounded-md bg-zinc-900 text-zinc-200 border border-zinc-800 font-medium">
                Prometheus
              </span>
            </div>

            {/* Bio Paragraph */}
            <p className="text-base text-zinc-300 leading-relaxed max-w-2xl font-normal">
              Hi, I&apos;m <strong className="text-white font-semibold">{DEVELOPER_PROFILE.name}</strong>. Software Engineer with <strong className="text-white font-semibold">1.5+ years</strong> of enterprise technology experience. I specialize in real-time observability pipelines, FastAPI microservices, and storage monitoring infrastructure across <strong className="text-zinc-200">NetApp</strong>, <strong className="text-zinc-200">Dell EMC</strong>, <strong className="text-zinc-200">Hitachi VSP</strong>, and <strong className="text-zinc-200">Brocade SAN switches</strong>. Concurrently pursuing an M.Tech in Software Systems at <strong className="text-white font-semibold">BITS Pilani</strong>.
            </p>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href="#projects"
                className="px-5 py-2.5 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 font-medium text-sm transition-all flex items-center gap-2 shadow-sm"
              >
                <span>View Engineering Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenTerminal}
                className="px-4 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 font-mono text-xs transition-all flex items-center gap-2 shadow-sm"
              >
                <Terminal className="w-4 h-4 text-zinc-400" />
                <span>Open Terminal</span>
              </button>

              <a
                href="#contact"
                className="px-4 py-2.5 rounded-lg bg-zinc-900/50 hover:bg-zinc-800/80 border border-zinc-800 text-zinc-300 font-medium text-xs transition-all flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-zinc-400" />
                <span>Get in touch</span>
              </a>
            </div>
          </div>

          {/* Right Column (Span 5): Real Interactive Code Window */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <CodeWindow />
          </div>
        </div>

        {/* 4 Grounded Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 pt-4">
          {/* Metric 1 */}
          <div className="card-subtle p-4 rounded-xl">
            <div className="flex items-center justify-between text-zinc-400 mb-1.5">
              <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">Enterprise Exp</span>
              <Server className="w-4 h-4 text-zinc-400" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">1.5+ Yrs</div>
            <div className="text-xs text-zinc-400 mt-1">Wipro Infrastructure</div>
          </div>

          {/* Metric 2 */}
          <div className="card-subtle p-4 rounded-xl">
            <div className="flex items-center justify-between text-zinc-400 mb-1.5">
              <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">Monitored Fabric</span>
              <Database className="w-4 h-4 text-zinc-400" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">500+</div>
            <div className="text-xs text-zinc-400 mt-1">Storage Arrays &amp; SAN Ports</div>
          </div>

          {/* Metric 3 */}
          <div className="card-subtle p-4 rounded-xl">
            <div className="flex items-center justify-between text-zinc-400 mb-1.5">
              <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">Telemetry Rate</span>
              <Activity className="w-4 h-4 text-zinc-400" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">12,000/s</div>
            <div className="text-xs text-zinc-400 mt-1">InfluxDB &amp; Prometheus Flow</div>
          </div>

          {/* Metric 4 */}
          <div className="card-subtle p-4 rounded-xl">
            <div className="flex items-center justify-between text-zinc-400 mb-1.5">
              <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">Academic Track</span>
              <GraduationCap className="w-4 h-4 text-zinc-400" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">M.Tech</div>
            <div className="text-xs text-zinc-400 mt-1">BITS Pilani (Software Systems)</div>
          </div>
        </div>
      </div>
    </section>
  );
};
