"use client";

import React from "react";
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle, ChevronRight } from "lucide-react";
import { SEED_EXPERIENCE, SEED_EDUCATION } from "@/lib/seed-data";

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-16 md:py-24 border-b border-blue-950/40 bg-[#02040a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-blue-950/80">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 mb-1.5 font-semibold">
              <Briefcase className="w-4 h-4" />
              <span>CAREER_&amp;_PEDIGREE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
              EXPERIENCE &amp; ACADEMICS
            </h2>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-xs text-slate-400">
            RECORD_TYPE: <span className="text-cyan-400 font-bold">ENTERPRISE TELEMETRY // VERIFIED</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Work Experience Column (Span 2) */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-mono text-sm sm:text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-blue-950">
              <Briefcase className="w-4 h-4 text-cyan-400" />
              <span>PROFESSIONAL ENGINEERING TRACK</span>
            </h3>

            {SEED_EXPERIENCE.map((exp) => (
              <div
                key={exp.id}
                className="glass-panel-dark p-6 sm:p-7 rounded-2xl border border-blue-500/20 hover:border-cyan-400/45 transition-all duration-300 shadow-xl"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-950 pb-4 mb-4">
                  <div>
                    <h4 className="font-mono text-lg font-bold text-white flex items-center gap-2 flex-wrap">
                      <span>{exp.role}</span>
                      <span className="text-cyan-400 text-sm font-semibold">@ {exp.company}</span>
                    </h4>
                    <div className="flex items-center gap-4 text-xs text-slate-400 mt-1 font-mono">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-400" />
                        <span>{exp.period}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{exp.location}</span>
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-xs px-3 py-1 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-cyan-300 font-semibold self-start sm:self-auto shadow-[0_0_10px_rgba(6,182,212,0.15)]">
                    ACTIVE DEPLOYMENT
                  </span>
                </div>

                {/* Highlights List */}
                <div className="space-y-3 my-4">
                  {exp.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="mt-5 pt-4 border-t border-blue-950">
                  <div className="font-mono text-[10px] text-blue-300 uppercase mb-2 font-semibold">
                    DEPLOYED ENTERPRISE STACK
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[11px] px-3 py-1 rounded-lg bg-[#071333]/90 text-slate-300 border border-blue-500/25"
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
            <h3 className="font-mono text-sm sm:text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-blue-950">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span>ACADEMIC FOUNDATION</span>
            </h3>

            <div className="space-y-5">
              {SEED_EDUCATION.map((edu, idx) => (
                <div
                  key={idx}
                  className="glass-panel-dark p-5 sm:p-6 rounded-2xl border border-blue-500/20 hover:border-cyan-400/40 transition-all duration-300 space-y-3 shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase px-2.5 py-0.5 rounded-lg bg-blue-950/70 text-cyan-300 border border-blue-500/30 font-semibold">
                      {edu.status}
                    </span>
                    <span className="font-mono text-xs text-slate-400">{edu.period}</span>
                  </div>

                  <div>
                    <h4 className="font-mono text-sm font-bold text-white">{edu.degree}</h4>
                    <div className="font-mono text-xs text-cyan-300 font-semibold mt-0.5">{edu.institution}</div>
                    {edu.program && (
                      <div className="text-xs text-slate-400 mt-1 italic">{edu.program}</div>
                    )}
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-blue-950">
                    {edu.details.map((d, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs text-slate-300">
                        <ChevronRight className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Program Sponsorship badge */}
            <div className="p-5 rounded-2xl bg-[#06112c]/70 border border-blue-500/30 font-mono text-xs text-slate-300 space-y-1.5 shadow-xl">
              <div className="text-cyan-300 font-bold flex items-center gap-2">
                <span>✦ WIPRO WILP SCHOLARSHIP</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Concurrently pursuing advanced distributed software systems coursework at BITS Pilani while engineering real-time infrastructure platforms at Wipro.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
