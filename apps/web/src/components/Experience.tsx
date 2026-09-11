"use client";

import React from "react";
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle, ChevronRight } from "lucide-react";
import { SEED_EXPERIENCE, SEED_EDUCATION } from "@/lib/seed-data";

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-16 md:py-24 border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-indigo-400 mb-1">
              <Briefcase className="w-4 h-4" />
              <span>CAREER_&amp;_PEDIGREE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-mono">
              EXPERIENCE &amp; ACADEMICS
            </h2>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-xs text-slate-400">
            RECORD_TYPE: <span className="text-indigo-400 font-bold">ENTERPRISE TELEMETRY // VERIFIED</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Work Experience Column (Span 2) */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-mono text-base font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
              <Briefcase className="w-4 h-4 text-indigo-400" />
              <span>PROFESSIONAL ENGINEERING TRACK</span>
            </h3>

            {SEED_EXPERIENCE.map((exp) => (
              <div
                key={exp.id}
                className="glass-panel p-6 rounded-lg border border-slate-800 hover:border-indigo-500/40 transition-all"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4 mb-4">
                  <div>
                    <h4 className="font-mono text-lg font-bold text-white flex items-center gap-2">
                      <span>{exp.role}</span>
                      <span className="text-indigo-400 text-sm font-normal">@ {exp.company}</span>
                    </h4>
                    <div className="flex items-center gap-4 text-xs text-slate-400 mt-1 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{exp.period}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{exp.location}</span>
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300 font-semibold self-start sm:self-auto">
                    ACTIVE DEPLOYMENT
                  </span>
                </div>

                {/* Highlights List */}
                <div className="space-y-2.5 my-4">
                  {exp.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <CheckCircle className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="mt-5 pt-4 border-t border-slate-800/80">
                  <div className="font-mono text-[10px] text-slate-500 uppercase mb-2">
                    DEPLOYED ENTERPRISE STACK
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Education Column (Span 1) */}
          <div className="space-y-6">
            <h3 className="font-mono text-base font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
              <GraduationCap className="w-4 h-4 text-purple-400" />
              <span>ACADEMIC FOUNDATION</span>
            </h3>

            <div className="space-y-4">
              {SEED_EDUCATION.map((edu, idx) => (
                <div
                  key={idx}
                  className="glass-panel p-5 rounded-lg border border-slate-800 hover:border-purple-500/40 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30">
                      {edu.status}
                    </span>
                    <span className="font-mono text-xs text-slate-400">{edu.period}</span>
                  </div>

                  <div>
                    <h4 className="font-mono text-sm font-bold text-white">{edu.degree}</h4>
                    <div className="font-mono text-xs text-indigo-400 mt-0.5">{edu.institution}</div>
                    {edu.program && (
                      <div className="text-xs text-slate-400 mt-1 italic">{edu.program}</div>
                    )}
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                    {edu.details.map((d, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs text-slate-300">
                        <ChevronRight className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Program Sponsorship badge */}
            <div className="p-4 rounded-lg bg-purple-950/25 border border-purple-500/30 font-mono text-xs text-slate-300 space-y-1">
              <div className="text-purple-400 font-bold flex items-center gap-1.5">
                <span>✦ WIPRO WILP SCHOLARSHIP</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Concurrently pursuing advanced distributed software systems coursework at BITS Pilani while engineering real-time infrastructure platforms at Wipro.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
