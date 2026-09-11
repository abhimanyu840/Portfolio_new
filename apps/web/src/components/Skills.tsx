"use client";

import React from "react";
import { Cpu, Shield, Wrench } from "lucide-react";
import { SEED_SKILL_GROUPS } from "@/lib/seed-data";

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-16 md:py-24 border-b border-blue-950/40 bg-[#02050e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-blue-950/80">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 mb-1.5 font-semibold">
              <Cpu className="w-4 h-4" />
              <span>CORE_COMPETENCIES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
              TECHNICAL PROFICIENCY MATRIX
            </h2>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-xs text-slate-400">
            TOTAL_SKILLSETS: <span className="text-cyan-400 font-bold">40+ VERIFIED TECHNOLOGIES</span>
          </div>
        </div>

        {/* Skill Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SEED_SKILL_GROUPS.map((group) => (
            <div
              key={group.category}
              className="glass-panel-dark p-6 rounded-2xl border border-blue-500/20 hover:border-cyan-400/45 transition-all duration-300 flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between border-b border-blue-950 pb-3 mb-3.5">
                  <h3 className="font-mono text-sm font-bold text-cyan-300 flex items-center gap-2">
                    <Wrench className="w-3.5 h-3.5 text-blue-400" />
                    <span>{group.category.toUpperCase()}</span>
                  </h3>
                  <span className="font-mono text-[10px] text-blue-400/80 px-2 py-0.5 rounded bg-blue-950/60 border border-blue-500/20">
                    {group.skills.length} TECHS
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed font-normal">
                  {group.description}
                </p>

                {/* Individual Skills */}
                <div className="space-y-3.5">
                  {group.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="flex items-center gap-1.5 text-slate-200">
                          {skill.highlight && (
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00f0ff]" title="Core Specialty" />
                          )}
                          <span className={skill.highlight ? "font-bold text-white" : ""}>
                            {skill.name}
                          </span>
                        </span>
                        <span className="text-slate-400 text-[11px]">{skill.level}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#030716] rounded-full overflow-hidden border border-blue-950">
                        <div
                          className={`h-full rounded-full transition-all ${
                            skill.highlight
                              ? "bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 shadow-[0_0_8px_rgba(6,182,212,0.5)]"
                              : "bg-slate-600"
                          }`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom tag */}
              <div className="mt-6 pt-3 border-t border-blue-950 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-cyan-300">
                  <Shield className="w-3 h-3 text-cyan-400" />
                  <span>Production Ready</span>
                </span>
                <span className="text-blue-400/80">ENTERPRISE GRADE</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
