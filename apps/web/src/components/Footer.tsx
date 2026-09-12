"use client";

import React from "react";
import { ArrowUp, Activity, GitBranch, Terminal, Sparkles } from "lucide-react";
import { DEVELOPER_PROFILE } from "@/lib/seed-data";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 sm:py-14 border-t border-white/[0.08] font-mono text-xs text-slate-400 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Info */}
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5 text-white font-bold tracking-wider">
              <span>{DEVELOPER_PROFILE.name.toUpperCase()}</span>
              <span className="text-slate-600">//</span>
              <span className="text-cyan-400">ENGINEERING_PORTFOLIO</span>
            </div>
            <div className="text-slate-500 text-[11px]">
              Next.js 16 • React 19 • Tailwind CSS • TypeScript • Turborepo Monorepo • Deployed on Netlify
            </div>
          </div>

          {/* Center Commit Hash & SLA */}
          <div className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-3 text-[11px] bg-black/40 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-2xl sm:rounded-full border border-white/[0.08]">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>SLA: 99.95%</span>
            </span>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-1 text-slate-400">
              <GitBranch className="w-3 h-3 text-indigo-400" />
              <span>REVISION: #0ea94a9</span>
            </span>
            <span className="text-slate-700">|</span>
            <span className="text-slate-400">RHEL 9.x</span>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm"
            title="Return to top of page"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Abhimanyu Kumar. Crafted for enterprise reliability and high-speed telemetry.
          </div>
          <div className="font-mono text-[10px] text-slate-600">
            SYSTEM LATENCY: &lt; 2ms // HOST: AP-SOUTH
          </div>
        </div>
      </div>
    </footer>
  );
};
