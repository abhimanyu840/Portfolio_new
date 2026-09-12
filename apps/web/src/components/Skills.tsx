"use client";

import React, { useState } from "react";
import { Cpu, Server, Database, Network, Terminal, Sparkles, CheckCircle2, Layers } from "lucide-react";
import { getTechIcon } from "@/components/TechIcons";

interface TechCompetency {
  name: string;
  category: "languages" | "backend" | "telemetry" | "devops";
  tier: "Production Core" | "Architectural" | "Advanced";
  years: string;
  role: string;
  subtags: string[];
}

const COMPETENCIES: TechCompetency[] = [
  {
    name: "Python",
    category: "languages",
    tier: "Production Core",
    years: "1.5+ Yrs",
    role: "High-throughput asynchronous daemons, AsyncIO sockets, ZeroMQ workers, SNMP/Syslog event parsers at Wipro.",
    subtags: ["AsyncIO", "Multiprocessing", "ZeroMQ", "Pydantic", "OOP"],
  },
  {
    name: "FastAPI",
    category: "backend",
    tier: "Production Core",
    years: "1.5+ Yrs",
    role: "Low-latency REST & WebSocket telemetry microservices, Pydantic data contracts, asynchronous I/O handlers.",
    subtags: ["RESTful APIs", "WebSocket Stream", "Middleware", "CORS", "OpenAPI"],
  },
  {
    name: "React",
    category: "backend",
    tier: "Production Core",
    years: "1.5+ Yrs",
    role: "Dynamic operations consoles, reactive dashboards, custom state management hooks, and virtualized tables.",
    subtags: ["React 19", "Custom Hooks", "Context API", "State Machines"],
  },
  {
    name: "Next.js",
    category: "backend",
    tier: "Architectural",
    years: "1.5+ Yrs",
    role: "Next.js 16 App Router full-stack web applications, Server Components, Route Handlers, Turbopack builds.",
    subtags: ["App Router", "Server Components", "Route Handlers", "Turbopack"],
  },
  {
    name: "TypeScript",
    category: "languages",
    tier: "Production Core",
    years: "1.5+ Yrs",
    role: "Strict type systems, shared monorepo schemas with Zod, end-to-end type safety between backend and frontend.",
    subtags: ["Strict Typing", "Zod Validation", "Generics", "Type Inference"],
  },
  {
    name: "JavaScript",
    category: "languages",
    tier: "Production Core",
    years: "2+ Yrs",
    role: "Modern ES2024 idioms, async/await pipelines, event-loop optimization, and DOM lifecycle manipulation.",
    subtags: ["ES2024", "Event Loop", "Promises", "Async/Await"],
  },
  {
    name: "InfluxDB",
    category: "telemetry",
    tier: "Production Core",
    years: "1.5+ Yrs",
    role: "Sub-second time-series metric ingestion, shard group management, retention policies, and Flux aggregation tasks.",
    subtags: ["Line Protocol", "Downsampling", "Retention Policies", "Flux"],
  },
  {
    name: "Grafana",
    category: "telemetry",
    tier: "Production Core",
    years: "1.5+ Yrs",
    role: "High-density enterprise NOC dashboards, heatmaps for SAN switch ports, threshold alerts, and panel templates.",
    subtags: ["Dashboard Engine", "Alert Rules", "Dynamic Variables", "Heatmaps"],
  },
  {
    name: "Prometheus",
    category: "telemetry",
    tier: "Architectural",
    years: "1.5+ Yrs",
    role: "Target metric scraping, PromQL alert expressions, custom Python exporters, and blackbox network probes.",
    subtags: ["PromQL", "Custom Exporters", "Metric Scraping", "Alertmanager"],
  },
  {
    name: "Linux",
    category: "devops",
    tier: "Production Core",
    years: "1.5+ Yrs",
    role: "Enterprise RHEL 8/9 administration, Systemd unit daemons, bash automation, socket tuning, and kernel profiling.",
    subtags: ["RHEL 8/9", "Systemd Daemons", "Bash Scripting", "Kernel Tuning"],
  },
  {
    name: "Docker",
    category: "devops",
    tier: "Production Core",
    years: "1.5+ Yrs",
    role: "Multi-stage minimal runtime containers, Compose service mesh, Podman rootless daemons, network bridges.",
    subtags: ["Multi-Stage Builds", "Podman", "Compose", "Bridge Networks"],
  },
  {
    name: "MongoDB",
    category: "backend",
    tier: "Production Core",
    years: "1.5+ Yrs",
    role: "Mongoose ODM schemas, indexing strategies, resilient serverless singleton pools, and aggregation pipelines.",
    subtags: ["Mongoose ODM", "Indexing", "Aggregations", "Atlas Cloud"],
  },
  {
    name: "HTML5",
    category: "languages",
    tier: "Production Core",
    years: "2+ Yrs",
    role: "Semantic DOM architecture, accessibility (WCAG 2.1 AA), structured metadata, and responsive canvas layouts.",
    subtags: ["Semantic Markup", "Accessibility", "SEO Metadata", "Canvas"],
  },
  {
    name: "CSS3",
    category: "languages",
    tier: "Production Core",
    years: "2+ Yrs",
    role: "Tailwind CSS utility engine, modern CSS grid/flexbox, custom keyframe physics, and dark mode themes.",
    subtags: ["Tailwind CSS", "Flexbox/Grid", "Keyframe Animations", "Dark Mode"],
  },
];

export const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"all" | "languages" | "backend" | "telemetry" | "devops">("all");

  const tabs = [
    { id: "all" as const, label: "All Disciplines", count: COMPETENCIES.length },
    { id: "telemetry" as const, label: "Telemetry & Observability", count: COMPETENCIES.filter((c) => c.category === "telemetry").length },
    { id: "backend" as const, label: "Backend & Full-Stack", count: COMPETENCIES.filter((c) => c.category === "backend").length },
    { id: "languages" as const, label: "Languages & Core", count: COMPETENCIES.filter((c) => c.category === "languages").length },
    { id: "devops" as const, label: "DevOps & Linux/RHEL", count: COMPETENCIES.filter((c) => c.category === "devops").length },
  ];

  const filtered =
    activeTab === "all"
      ? COMPETENCIES
      : COMPETENCIES.filter((c) => c.category === activeTab);

  return (
    <section id="skills" className="py-16 sm:py-20 md:py-24 lg:py-28 border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-white/[0.08] gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 mb-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>02 // PRODUCTION COMPETENCY MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Technical Arsenal &amp; Tooling
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl">
              Languages, backend runtimes, time-series storage engines, and enterprise storage fabrics proven in production at Wipro and graduate research at BITS Pilani.
            </p>
          </div>

          {/* Tab Filters */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 sm:p-1.5 bg-black/40 border border-white/[0.08] rounded-2xl sm:rounded-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === tab.id ? "bg-white/20 text-white" : "bg-white/[0.06] text-slate-400"}`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Competency Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((skill) => (
            <div
              key={skill.name}
              className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/[0.08] hover:border-cyan-500/40 transition-all flex flex-col justify-between group hover:shadow-xl hover:shadow-black/40 relative overflow-hidden"
            >
              <div>
                {/* Card Top: Brand Icon + Title + Tier Badge */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:border-cyan-500/40 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-all">
                      {getTechIcon(skill.name, "w-5 h-5")}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-200 transition-colors">
                        {skill.name}
                      </h3>
                      <span className="font-mono text-[11px] text-slate-400">
                        {skill.years} Enterprise Experience
                      </span>
                    </div>
                  </div>

                  <span
                    className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                      skill.tier === "Production Core"
                        ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                        : "bg-indigo-500/10 text-indigo-300 border-indigo-500/30"
                    }`}
                  >
                    {skill.tier}
                  </span>
                </div>

                {/* Production Role Description */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {skill.role}
                </p>
              </div>

              {/* Sub-skill pills */}
              <div className="pt-3 border-t border-white/[0.06] flex flex-wrap items-center gap-1.5">
                {skill.subtags.map((sub) => (
                  <span
                    key={sub}
                    className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono text-slate-400"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise SAN Hardware & Storage Fabric Callout */}
        <div className="mt-10 p-5 sm:p-6 md:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-950/20 via-indigo-950/30 to-purple-950/20 border border-indigo-500/20 glass-panel">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-mono text-xs text-indigo-400 font-bold uppercase">
                <Server className="w-4 h-4 text-indigo-400" />
                <span>ENTERPRISE SAN &amp; STORAGE HARDWARE PROTOCOLS</span>
              </div>
              <p className="text-xs text-slate-300">
                Specialized datacenter hardware infrastructure monitored and automated in enterprise production:
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {["NetApp ONTAP", "Dell EMC PowerStore", "Hitachi VSP", "Brocade SAN FC 32G", "SNMP v3", "Syslog RFC 5424"].map((hw) => (
                <span
                  key={hw}
                  className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] font-mono text-xs text-indigo-300 font-medium"
                >
                  {hw}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
