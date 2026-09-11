"use client";

import React from "react";
import { Cpu, Terminal, Database, Server, Layers, Bot, Layout } from "lucide-react";
import { SEED_SKILL_GROUPS } from "@/lib/seed-data";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "Languages & Core": <Terminal className="w-4 h-4 text-zinc-400" />,
  "Backend & APIs": <Server className="w-4 h-4 text-zinc-400" />,
  "Observability & Telemetry": <Cpu className="w-4 h-4 text-zinc-400" />,
  "Enterprise Storage & SAN": <Database className="w-4 h-4 text-zinc-400" />,
  "DevOps, Linux & Containers": <Layers className="w-4 h-4 text-zinc-400" />,
  "Frontend & Reactive UI": <Layout className="w-4 h-4 text-zinc-400" />,
  "Databases & AI Technologies": <Bot className="w-4 h-4 text-zinc-400" />,
};

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-16 md:py-24 border-b border-zinc-800/80 bg-zinc-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-zinc-800/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1.5 font-medium">
              <Cpu className="w-4 h-4 text-zinc-300" />
              <span>TECHNICAL COMPETENCIES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Skills &amp; Technology Stack
            </h2>
          </div>
          <div className="mt-4 md:mt-0 text-xs font-mono text-zinc-400">
            40+ Verified Technologies &amp; Tools
          </div>
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SEED_SKILL_GROUPS.map((group) => (
            <div
              key={group.category}
              className="card-subtle p-6 rounded-xl flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-3">
                  <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
                    {CATEGORY_ICONS[group.category] || <Cpu className="w-4 h-4 text-zinc-400" />}
                    <span>{group.category}</span>
                  </h3>
                  <span className="text-[11px] font-mono text-zinc-500">
                    {group.skills.length} techs
                  </span>
                </div>

                <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                  {group.description}
                </p>

                {/* Individual Skill Badges */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className={`text-xs px-2.5 py-1 rounded-md font-mono transition-colors ${
                        skill.highlight
                          ? "bg-zinc-800 text-white font-medium border border-zinc-700/80"
                          : "bg-zinc-900 text-zinc-400 border border-zinc-800"
                      }`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom tag */}
              <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>Production Environment</span>
                <span>Wipro &amp; Projects</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
