"use client";

import React, { useState } from "react";
import { Cpu, Shield, Wrench, Layers, Sparkles } from "lucide-react";
import { SEED_SKILL_GROUPS } from "@/lib/seed-data";
import { getTechIcon } from "@/components/TechIcons";

interface FeaturedTech {
  name: string;
  category: "all" | "web" | "backend" | "devops" | "telemetry";
  role: string;
  proficiency: string;
  badge: string;
}

const FEATURED_TECHS: FeaturedTech[] = [
  {
    name: "HTML5",
    category: "web",
    role: "Semantic Structure, Web APIs, Accessibility (a11y) & DOM Architecture",
    proficiency: "96%",
    badge: "Core Web Standard",
  },
  {
    name: "CSS3",
    category: "web",
    role: "Modern Flexbox, CSS Grid, Transitions, Keyframes & Responsive Media",
    proficiency: "94%",
    badge: "Styling Engine",
  },
  {
    name: "JavaScript (ES6+)",
    category: "web",
    role: "Async/Await, Event Loop, Closures, Prototypes & Dynamic Web Apps",
    proficiency: "92%",
    badge: "Frontend Core",
  },
  {
    name: "TypeScript",
    category: "web",
    role: "Static Typing, Generics, Discriminated Unions & Type-Safe APIs",
    proficiency: "90%",
    badge: "Type Safety",
  },
  {
    name: "React 19",
    category: "web",
    role: "Hooks, Functional Components, Virtual DOM & State Architecture",
    proficiency: "92%",
    badge: "UI Framework",
  },
  {
    name: "Next.js 16",
    category: "web",
    role: "App Router, SSR, Turbopack, Route Handlers & Server Components",
    proficiency: "90%",
    badge: "Full-Stack Meta",
  },
  {
    name: "Tailwind CSS",
    category: "web",
    role: "Utility-First CSS, Design Systems, Dark Themes & Responsive Layouts",
    proficiency: "94%",
    badge: "Modern UI Toolkit",
  },
  {
    name: "Python",
    category: "backend",
    role: "High-Throughput Daemons, AsyncIO, OOP, Automation & Telemetry Ingestion",
    proficiency: "95%",
    badge: "Primary Backend",
  },
  {
    name: "FastAPI",
    category: "backend",
    role: "Asynchronous Microservices, Pydantic Schema Validation & OpenAPI Docs",
    proficiency: "94%",
    badge: "High-Speed REST",
  },
  {
    name: "Node.js",
    category: "backend",
    role: "Event-Driven Server Runtime, NPM Workspaces & Microservice Gateways",
    proficiency: "90%",
    badge: "Backend Runtime",
  },
  {
    name: "Linux / RHEL",
    category: "devops",
    role: "Red Hat 9.x Enterprise Administration, Systemd Daemons & Kernel Tuning",
    proficiency: "92%",
    badge: "Enterprise OS",
  },
  {
    name: "Docker",
    category: "devops",
    role: "Multi-Stage Containers, Podman Rootless Execution & Layer Optimization",
    proficiency: "90%",
    badge: "Containerization",
  },
  {
    name: "MongoDB",
    category: "telemetry",
    role: "Document Persistence, Mongoose Schemas, Aggregations & Sharding",
    proficiency: "90%",
    badge: "NoSQL Database",
  },
  {
    name: "PostgreSQL",
    category: "telemetry",
    role: "Relational Queries, Schema Migrations, Indexes & ACID Transactions",
    proficiency: "88%",
    badge: "Relational DB",
  },
  {
    name: "Git",
    category: "devops",
    role: "Git Workflows, Monorepo Version Control, Branch Strategies & CI/CD",
    proficiency: "92%",
    badge: "Version Control",
  },
  {
    name: "InfluxDB",
    category: "telemetry",
    role: "Time-Series Telemetry Ingestion, Shard Policies & Sub-Second Querying",
    proficiency: "92%",
    badge: "Time-Series Core",
  },
  {
    name: "Grafana",
    category: "telemetry",
    role: "Real-Time Operational Dashboards, Alert Panels & PromQL Querying",
    proficiency: "95%",
    badge: "Visual Observability",
  },
  {
    name: "Prometheus",
    category: "telemetry",
    role: "Metric Scrapers, Alertmanager Rules, Exporters & Node Instrumentation",
    proficiency: "90%",
    badge: "Alerts & Metrics",
  },
];

export const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"all" | "web" | "backend" | "devops" | "telemetry">("all");

  const filterTabs = [
    { id: "all" as const, label: "ALL TECHNOLOGIES" },
    { id: "web" as const, label: "WEB & FRONTEND" },
    { id: "backend" as const, label: "BACKEND & APIS" },
    { id: "devops" as const, label: "DEVOPS & LINUX" },
    { id: "telemetry" as const, label: "DATA & TELEMETRY" },
  ];

  const filteredTechs = activeTab === "all" 
    ? FEATURED_TECHS 
    : FEATURED_TECHS.filter((t) => t.category === activeTab);

  return (
    <section id="skills" className="py-16 md:py-24 border-b border-slate-800/60 bg-slate-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-indigo-400 mb-1">
              <Cpu className="w-4 h-4" />
              <span>CORE_COMPETENCIES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-mono">
              TECH STACK &amp; CAPABILITIES
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Visual technology directory and deep engineering proficiency matrix across modern web standards, enterprise backends, and observability platforms.
            </p>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-xs text-slate-400">
            TOTAL_STACK: <span className="text-indigo-400 font-bold">40+ VERIFIED TECHS</span>
          </div>
        </div>

        {/* Visual Technology Quick Scan Grid */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-slate-200">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>QUICK-SCAN TECHNOLOGY DIRECTORY</span>
              <span className="text-[11px] text-slate-500 font-normal">
                ({filteredTechs.length} Selected)
              </span>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1 rounded-lg font-mono text-[11px] transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold shadow-md shadow-indigo-600/20"
                      : "bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {filteredTechs.map((tech) => (
              <div
                key={tech.name}
                className="group glass-panel p-4 rounded-xl border border-slate-800/90 hover:border-indigo-500/50 hover:bg-slate-900/90 transition-all duration-200 flex flex-col justify-between shadow-sm hover:shadow-indigo-500/10 cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-center p-1.5 shadow-inner group-hover:scale-105 group-hover:border-indigo-500/40 transition-all">
                      {getTechIcon(tech.name, "w-6 h-6")}
                    </div>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-indigo-950/50 text-indigo-300 border border-indigo-900/60 font-medium">
                      {tech.proficiency}
                    </span>
                  </div>

                  <h3 className="font-mono text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {tech.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {tech.role}
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span className="text-slate-400 truncate">{tech.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Competency Matrix Accordions / Cards */}
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-slate-300 mb-6 pb-2 border-b border-slate-800">
            <Layers className="w-4 h-4 text-purple-400" />
            <span>ENTERPRISE COMPETENCY &amp; ARCHITECTURAL MATRIX</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SEED_SKILL_GROUPS.map((group) => (
              <div
                key={group.category}
                className="glass-panel p-5 rounded-lg border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-3">
                    <h3 className="font-mono text-sm font-bold text-indigo-400 flex items-center gap-2">
                      <Wrench className="w-3.5 h-3.5" />
                      <span>{group.category.toUpperCase()}</span>
                    </h3>
                    <span className="font-mono text-[10px] text-slate-500">
                      {group.skills.length} TECHS
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
                    {group.description}
                  </p>

                  {/* Individual Skills with Tech Logos */}
                  <div className="space-y-3">
                    {group.skills.map((skill) => (
                      <div key={skill.name} className="space-y-1">
                        <div className="flex items-center justify-between font-mono text-xs">
                          <span className="flex items-center gap-2 text-slate-200">
                            <span className="flex-shrink-0">
                              {getTechIcon(skill.name, "w-4 h-4")}
                            </span>
                            <span className={skill.highlight ? "font-semibold text-white" : ""}>
                              {skill.name}
                            </span>
                            {skill.highlight && (
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" title="Core Specialty" />
                            )}
                          </span>
                          <span className="text-slate-400 text-[11px] font-medium">{skill.level}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                          <div
                            className={`h-full rounded-full ${
                              skill.highlight
                                ? "bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500"
                                : "bg-slate-700"
                            }`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom tag */}
                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3 text-indigo-400" />
                    <span>Production Ready</span>
                  </span>
                  <span>ENTERPRISE GRADE</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
