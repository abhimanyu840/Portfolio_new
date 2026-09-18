"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle, Award, Sparkles, Building2, ShieldCheck } from "lucide-react";
import { SEED_EXPERIENCE, SEED_EDUCATION } from "@/lib/seed-data";
import { getTechIcon } from "@/components/TechIcons";

export const Experience: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion ? { duration: 0 } : { duration: 0.45, ease: "easeOut" as const },
    },
  };

  return (
    <section id="experience" className="py-16 sm:py-20 md:py-24 lg:py-28 border-b border-slate-200 dark:border-white/[0.08] relative">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        {/* Section Header */}
        <motion.div variants={cardVariants} className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-slate-200 dark:border-white/[0.08] gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-600 dark:text-cyan-400 mb-2">
              <Briefcase className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>03 // CAREER TRACK &amp; PEDIGREE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Experience &amp; <span className="text-gradient-cyan">Academics</span>
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              Verifiable enterprise engineering record at Wipro paired with advanced graduate research in distributed systems at BITS Pilani.
            </p>
          </div>
          <div className="font-mono text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            <span>RECORD: <strong className="text-cyan-700 dark:text-cyan-300">ENTERPRISE TELEMETRY // VERIFIED</strong></span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Work Experience Column (Span 7) */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div variants={cardVariants} className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-white/[0.08]">
              <Building2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                ENTERPRISE PRODUCTION TRACK
              </h3>
            </motion.div>

            {SEED_EXPERIENCE.map((exp) => (
              <motion.div
                key={exp.id}
                variants={cardVariants}
                whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.01 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
                className="glass-panel p-5 sm:p-6 md:p-7 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-white/[0.08] hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-all group relative overflow-hidden shadow-sm hover:shadow-xl hover:shadow-cyan-500/5"
              >
                {/* Accent glow on hover */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/15 transition-all" />

                {/* Role and Company Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-white/[0.08] pb-4 mb-5 relative z-10">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-mono text-[11px] font-semibold mb-1.5">
                      <Sparkles className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                      FULL-TIME ENTERPRISE SRE
                    </span>
                    <h4 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-200 transition-colors">
                      {exp.role} <span className="text-cyan-600 dark:text-cyan-400 font-normal">@ {exp.company}</span>
                    </h4>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        <span>{exp.period}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        <span>{exp.location}</span>
                      </span>
                    </div>
                  </div>

                  <span className="font-mono text-xs text-emerald-700 dark:text-emerald-400 font-bold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 self-start sm:self-auto">
                    ACTIVE NOW
                  </span>
                </div>

                {/* Achievements List */}
                <div className="space-y-3 mb-6 relative z-10">
                  {exp.highlights.map((highlight, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={shouldReduceMotion ? {} : { x: 4 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed cursor-default"
                    >
                      <CheckCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="pt-4 border-t border-slate-200 dark:border-white/[0.08] relative z-10">
                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-2 uppercase">Core Production Stack:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.techStack.map((tech) => (
                      <motion.span
                        key={tech}
                        whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-xs font-mono text-slate-700 dark:text-slate-300 transition-colors"
                      >
                        <span className="shrink-0">{getTechIcon(tech, "w-3 h-3")}</span>
                        <span>{tech}</span>
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Education & Academic Rigor Column (Span 5) */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div variants={cardVariants} className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-white/[0.08]">
              <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                ACADEMIC PEDIGREE
              </h3>
            </motion.div>

            {SEED_EDUCATION.map((edu, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.01 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
                className="glass-panel p-5 sm:p-6 md:p-7 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-white/[0.08] hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all flex flex-col justify-between group shadow-sm hover:shadow-xl hover:shadow-indigo-500/5"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-white/[0.08]">
                    <span className="font-mono text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      <span>WILP SCHOLARSHIP</span>
                    </span>
                    <span className="font-mono text-xs text-indigo-600 dark:text-indigo-400 font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                      {edu.status}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-200 transition-colors">
                    {edu.degree}
                  </h4>
                  <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-300/90 mt-0.5">
                    {edu.institution}
                  </div>
                  <div className="font-mono text-xs text-slate-500 dark:text-slate-400 mt-1 mb-5">
                    {edu.period} • Work-Integrated Learning Program
                  </div>

                  {/* Program Focus Items */}
                  <div className="space-y-2.5">
                    {edu.details.map((detail, dIdx) => (
                      <motion.div
                        key={dIdx}
                        whileHover={shouldReduceMotion ? {} : { x: 3 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.04] text-xs text-slate-700 dark:text-slate-300 leading-relaxed cursor-default"
                      >
                        <span className="text-indigo-600 dark:text-indigo-400 font-mono">•</span>
                        <span>{detail}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/[0.08] flex items-center justify-between font-mono text-[11px] text-slate-500 dark:text-slate-400">
                  <span>SPECIALIZATION: SOFTWARE SYSTEMS</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold">BITS PILANI</span>
                </div>
              </motion.div>
            ))}

            {/* Quick SRE Certification & Compliance Card */}
            <motion.div
              variants={cardVariants}
              whileHover={shouldReduceMotion ? {} : { y: -2 }}
              transition={{ duration: 0.2 }}
              className="p-4 sm:p-5 rounded-2xl bg-slate-100/90 dark:bg-black/40 border border-slate-200 dark:border-white/[0.06] font-mono text-xs space-y-2"
            >
              <div className="text-slate-500 dark:text-slate-400 uppercase text-[10px] tracking-wider flex items-center justify-between">
                <span>Enterprise Compliance &amp; Standards</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                <span>Datacenter Protocol:</span>
                <span className="text-cyan-700 dark:text-cyan-300 font-semibold">Fibre Channel 32G / NVMe-oF</span>
              </div>
              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                <span>Telemetry Ingestion:</span>
                <span className="text-cyan-700 dark:text-cyan-300 font-semibold">RFC 5424 Syslog / SNMP v3</span>
              </div>
              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                <span>Air-Gapped Environments:</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Offline Compliant</span>
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
