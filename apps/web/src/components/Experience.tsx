"use client";

import React from "react";
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle, ChevronRight, Award, Sparkles, Building2 } from "lucide-react";
import { SEED_EXPERIENCE, SEED_EDUCATION } from "@/lib/seed-data";
import { getTechIcon } from "@/components/TechIcons";

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-16 sm:py-20 md:py-24 lg:py-28 border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/[0.08] gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 mb-2">
              <Briefcase className="w-4 h-4 text-cyan-400" />
              <span>03 // CAREER TRACK &amp; PEDIGREE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Experience &amp; Academics
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl">
              Verifiable enterprise engineering record at Wipro paired with advanced graduate research in distributed systems at BITS Pilani.
            </p>
          </div>
          <div className="font-mono text-xs text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>RECORD: <strong className="text-cyan-300">ENTERPRISE TELEMETRY // VERIFIED</strong></span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Work Experience Column (Span 7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-white/[0.08]">
              <Building2 className="w-4 h-4 text-cyan-400" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                ENTERPRISE PRODUCTION TRACK
              </h3>
            </div>

            {SEED_EXPERIENCE.map((exp) => (
              <div
                key={exp.id}
                className="glass-panel p-5 sm:p-6 md:p-7 rounded-2xl sm:rounded-3xl border border-white/[0.08] hover:border-cyan-500/40 transition-all group relative overflow-hidden"
              >
                {/* Accent glow on hover */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/10 transition-all" />

                {/* Role and Company Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4 mb-5">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono text-[11px] font-semibold mb-1.5">
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      FULL-TIME ENTERPRISE SRE
                    </span>
                    <h4 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-200 transition-colors">
                      {exp.role} <span className="text-cyan-400 font-normal">@ {exp.company}</span>
                    </h4>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 mt-1 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{exp.period}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{exp.location}</span>
                      </span>
                    </div>
                  </div>

                  <span className="font-mono text-xs text-emerald-400 font-bold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 self-start sm:self-auto">
                    ACTIVE NOW
                  </span>
                </div>

                {/* Achievements List */}
                <div className="space-y-3 mb-6">
                  {exp.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="pt-4 border-t border-white/[0.08]">
                  <div className="text-[11px] font-mono text-slate-400 mb-2 uppercase">Core Production Stack:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300"
                      >
                        <span className="shrink-0">{getTechIcon(tech, "w-3 h-3")}</span>
                        <span>{tech}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Education & Academic Rigor Column (Span 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-white/[0.08]">
              <GraduationCap className="w-4 h-4 text-indigo-400" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                ACADEMIC PEDIGREE
              </h3>
            </div>

            {SEED_EDUCATION.map((edu, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/[0.08] hover:border-indigo-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08]">
                    <span className="font-mono text-[11px] font-semibold text-indigo-400 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      <span>WILP SCHOLARSHIP</span>
                    </span>
                    <span className="font-mono text-xs text-indigo-400 font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                      {edu.status}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-white group-hover:text-indigo-200 transition-colors">
                    {edu.degree}
                  </h4>
                  <div className="text-sm font-semibold text-indigo-300/90 mt-0.5">
                    {edu.institution}
                  </div>
                  <div className="font-mono text-xs text-slate-400 mt-1 mb-5">
                    {edu.period} • Work-Integrated Learning Program
                  </div>

                  {/* Program Focus Items */}
                  <div className="space-y-2.5">
                    {edu.details.map((detail, dIdx) => (
                      <div
                        key={dIdx}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-xs text-slate-300 leading-relaxed"
                      >
                        <span className="text-indigo-400 font-mono">•</span>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between font-mono text-[11px] text-slate-400">
                  <span>SPECIALIZATION: SOFTWARE SYSTEMS</span>
                  <span className="text-indigo-400">BITS PILANI</span>
                </div>
              </div>
            ))}

            {/* Quick SRE Certification & Compliance Card */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/[0.06] font-mono text-xs space-y-2">
              <div className="text-slate-400 uppercase text-[10px] tracking-wider">Enterprise Compliance &amp; Standards</div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Datacenter Protocol:</span>
                <span className="text-cyan-300 font-semibold">Fibre Channel 32G / NVMe-oF</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Telemetry Ingestion:</span>
                <span className="text-cyan-300 font-semibold">RFC 5424 Syslog / SNMP v3</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Air-Gapped Environments:</span>
                <span className="text-emerald-400 font-semibold">Offline Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
