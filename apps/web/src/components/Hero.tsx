"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Terminal,
  ArrowRight,
  Layers,
} from "lucide-react";
import { HeroTelemetryCanvas } from "@/components/HeroTelemetryCanvas";

interface HeroProps {
  onOpenTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal }) => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion ? { duration: 0 } : { duration: 0.45, ease: "easeOut" as const },
    },
  };

  return (
    <section className="relative pt-24 pb-14 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24 overflow-hidden border-b border-slate-200 dark:border-white/[0.08]">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* ========================================================================= */}
        {/* 1. TOP ROW: DUAL PILL BADGES & RIGHT-ALIGNED ARCHITECTURAL MOTTO          */}
        {/* ========================================================================= */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-start justify-between gap-4 mb-4">
          {/* Left Badges */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {/* Badge 1: Available for roles */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/90 dark:bg-[#0c1415]/90 border border-slate-200 dark:border-white/[0.08] backdrop-blur-md font-mono text-[11px] sm:text-xs text-slate-700 dark:text-[#34d399] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse shrink-0" />
              <span className="font-semibold text-emerald-700 dark:text-[#34d399]">
                AVAILABLE FOR PLATFORM &amp; SYSTEMS ROLES
              </span>
              <span className="text-slate-400 dark:text-slate-600">|</span>
              <span className="text-slate-600 dark:text-slate-400 font-normal">NOIDA, INDIA</span>
            </div>

            {/* Badge 2: Wipro // BITS Pilani */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/90 dark:bg-[#0c1415]/90 border border-slate-200 dark:border-white/[0.08] backdrop-blur-md font-mono text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 shadow-sm">
              <Terminal className="w-3.5 h-3.5 text-emerald-600 dark:text-[#34d399] shrink-0" />
              <span className="font-medium text-emerald-700 dark:text-[#34d399]">Wipro Software Engineer</span>
              <span className="text-slate-400 dark:text-slate-600">//</span>
              <span className="text-slate-600 dark:text-slate-400 font-normal">BITS Pilani M.Tech</span>
            </div>
          </div>

          {/* Right Architectural Stacked Motto */}
          <div className="hidden lg:flex flex-col items-start gap-1 font-mono text-[10px] sm:text-[11px] tracking-[0.22em] text-slate-600 dark:text-slate-300 font-bold uppercase leading-tight select-none z-10">
            <div className="w-7 h-[2px] bg-[#34d399] mb-1" />
            <span>BUILDING</span>
            <span>RELIABLE SYSTEMS</span>
            <span>AT SCALE</span>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* 2. HEADLINE, SUBTITLE, AND NARRATIVE BIO                                  */}
        {/* ========================================================================= */}
        <motion.div variants={itemVariants} className="space-y-3 pt-2">
          {/* Main Title: Crisp White "Abhimanyu" + Vibrant Mint "Kumar" */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
            Abhimanyu <span className="text-[#34d399]">Kumar</span>
          </h1>

          {/* Subtitle with highlighted "Distributed Telemetry" */}
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-800 dark:text-white tracking-tight leading-snug max-w-4xl pt-1">
            Engineering High-Throughput{" "}
            <span className="text-[#34d399]">Distributed Telemetry</span>, Resilient APIs &amp; Scalable Systems.
          </p>

          {/* Enterprise Narrative Bio */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl pt-1">
            Software Engineer with{" "}
            <strong className="text-slate-900 dark:text-white font-semibold">1.5+ years</strong> of enterprise production
            experience at <strong className="text-slate-900 dark:text-white font-semibold">Wipro</strong>. Architecting
            telemetry daemons, FastAPI microservices, and reactive monitoring consoles across{" "}
            <span className="text-emerald-700 dark:text-[#34d399] font-medium">NetApp</span>,{" "}
            <span className="text-emerald-700 dark:text-[#34d399] font-medium">Dell EMC</span>,{" "}
            <span className="text-emerald-700 dark:text-[#34d399] font-medium">Hitachi VSP</span>, and{" "}
            <span className="text-emerald-700 dark:text-[#34d399] font-medium">Brocade SAN</span> switches. Currently
            pursuing M.Tech in Software Systems at{" "}
            <strong className="text-slate-900 dark:text-white font-semibold">BITS Pilani</strong>.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* 3. HERO ACTION BUTTONS                                                    */}
        {/* ========================================================================= */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3.5 pt-4">
          {/* Primary CTA: Solid Mint Pill Button with Soft Glow */}
          <motion.a
            href="#projects"
            whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -2 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            className="px-6 py-3 rounded-full bg-[#34d399] hover:bg-[#2dd4bf] text-slate-950 font-bold text-xs sm:text-sm tracking-wide transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 cursor-pointer"
          >
            <span>Explore Featured Systems</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </motion.a>

          {/* Secondary CTA: Sleek Dark Glass Terminal CLI Button */}
          <motion.button
            onClick={onOpenTerminal}
            whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -2 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            className="px-5 py-3 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-[#0c1415]/80 dark:hover:bg-[#121f20] border border-slate-300 dark:border-white/[0.12] dark:hover:border-[#34d399]/50 text-slate-800 dark:text-slate-200 font-mono text-xs sm:text-sm transition-all flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <span className="text-emerald-600 dark:text-[#34d399] font-bold">&gt;_</span>
            <span>Terminal CLI [~]</span>
          </motion.button>

          {/* Tertiary CTA: Architecture Lab Button */}
          <motion.a
            href="#hud"
            whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -2 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            className="px-5 py-3 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-[#0c1415]/80 dark:hover:bg-[#121f20] border border-slate-300 dark:border-white/[0.12] dark:hover:border-[#34d399]/50 text-slate-800 dark:text-slate-200 font-mono text-xs sm:text-sm transition-all flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <Layers className="w-4 h-4 text-emerald-600 dark:text-[#34d399]" />
            <span>Architecture Lab</span>
          </motion.a>
        </motion.div>

        {/* ========================================================================= */}
        {/* 4. EMBEDDED INTERACTIVE 3D SAN FABRIC TOPOLOGY STAGE                      */}
        {/* ========================================================================= */}
        <motion.div variants={itemVariants} className="mt-8 sm:mt-10 relative">
          <HeroTelemetryCanvas />
        </motion.div>
      </motion.div>
    </section>
  );
};
