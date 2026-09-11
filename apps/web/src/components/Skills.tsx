"use client";

import React from "react";
import { Cpu, CheckCircle2, Shield, Wrench } from "lucide-react";
import { SEED_SKILL_GROUPS } from "@/lib/seed-data";

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-16 md:py-24 border-b border-slate-800/60 bg-slate-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-indigo-400 mb-1">
              <Cpu className="w-4 h-4" />
              <span>CORE_COMPETENCIES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-mono">
              TECHNICAL PROFICIENCY MATRIX
            </h2>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-xs text-slate-400">
            TOTAL_SKILLSETS: <span className="text-indigo-400 font-bold">40+ VERIFIED TECHNOLOGIES</span>
          </div>
        </div>

        {/* Skill Category Cards */}
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

                {/* Individual Skills */}
                <div className="space-y-3">
                  {group.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="flex items-center gap-1.5 text-slate-200">
                          {skill.highlight && (
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" title="Core Specialty" />
                          )}
                          <span className={skill.highlight ? "font-semibold text-white" : ""}>
                            {skill.name}
                          </span>
                        </span>
                        <span className="text-slate-400 text-[11px]">{skill.level}%</span>
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
    </section>
  );
};
