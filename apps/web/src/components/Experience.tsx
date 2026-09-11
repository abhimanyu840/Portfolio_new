"use client";

import React from "react";
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2, ChevronRight } from "lucide-react";
import { SEED_EXPERIENCE, SEED_EDUCATION } from "@/lib/seed-data";

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-16 md:py-24 border-b border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-zinc-800/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1.5 font-medium">
              <Briefcase className="w-4 h-4 text-zinc-300" />
              <span>CAREER &amp; EDUCATION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Experience &amp; Academic Background
            </h2>
          </div>
          <div className="mt-4 md:mt-0 text-xs font-mono text-zinc-400">
            Enterprise Infrastructure • Software Systems
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Work Experience Column (Span 2) */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider font-mono flex items-center gap-2 pb-2 border-b border-zinc-800">
              <Briefcase className="w-4 h-4 text-zinc-400" />
              <span>Professional Experience</span>
            </h3>

            {SEED_EXPERIENCE.map((exp) => (
              <div
                key={exp.id}
                className="card-subtle p-6 rounded-xl space-y-4"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-4">
                  <div>
                    <h4 className="text-base font-bold text-white">
                      <span>{exp.role}</span>
                      <span className="text-zinc-400 font-normal"> @ {exp.company}</span>
                    </h4>
                    <div className="flex items-center gap-4 text-xs text-zinc-400 mt-1 font-mono">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{exp.period}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{exp.location}</span>
                      </span>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded bg-zinc-800 text-zinc-200 font-medium self-start sm:self-auto border border-zinc-700/60">
                    Current Role
                  </span>
                </div>

                {/* Highlights List */}
                <div className="space-y-2.5 my-3">
                  {exp.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-zinc-500 flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="pt-3 border-t border-zinc-800/80">
                  <div className="text-[11px] font-mono text-zinc-500 uppercase mb-2">
                    Technologies Deployed
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800"
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
            <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider font-mono flex items-center gap-2 pb-2 border-b border-zinc-800">
              <GraduationCap className="w-4 h-4 text-zinc-400" />
              <span>Education</span>
            </h3>

            <div className="space-y-4">
              {SEED_EDUCATION.map((edu, idx) => (
                <div
                  key={idx}
                  className="card-subtle p-5 rounded-xl space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                      {edu.status}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">{edu.period}</span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white">{edu.degree}</h4>
                    <div className="text-xs text-zinc-300 mt-0.5">{edu.institution}</div>
                    {edu.program && (
                      <div className="text-xs text-zinc-500 mt-0.5">{edu.program}</div>
                    )}
                  </div>

                  <div className="space-y-1 pt-2 border-t border-zinc-800/80">
                    {edu.details.map((d, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs text-zinc-400">
                        <ChevronRight className="w-3.5 h-3.5 text-zinc-600 flex-shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Program Sponsorship badge */}
            <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-1.5">
              <div className="text-zinc-200 font-semibold text-xs flex items-center gap-1.5">
                <span>Wipro WILP Scholarship</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Concurrently pursuing advanced software systems coursework at BITS Pilani while building production observability platforms at Wipro.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
