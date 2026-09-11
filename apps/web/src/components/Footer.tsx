"use client";

import React from "react";
import { ArrowUp, Activity, GitBranch } from "lucide-react";
import { DEVELOPER_PROFILE } from "@/lib/seed-data";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 bg-[#010309] border-t border-blue-950/60 font-mono text-xs text-slate-400 relative overflow-hidden">
      {/* Ambient footer glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Info */}
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5 text-white font-bold tracking-wider">
              <span className="text-sm font-black">{DEVELOPER_PROFILE.name.toUpperCase()}</span>
              <span className="text-blue-500">//</span>
              <span className="text-cyan-400 font-semibold">ENTERPRISE TELEMETRY</span>
            </div>
            <div className="text-slate-500 text-[11px]">
              Engineered with Next.js 16, React 19, Tailwind CSS &amp; Turborepo • Deployed on Netlify Edge
            </div>
          </div>

          {/* Center Commit Hash & SLA */}
          <div className="flex items-center gap-3 sm:gap-4 text-[11px] bg-[#04091a]/90 px-4 py-2 rounded-xl border border-blue-500/20 shadow-inner">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <Activity className="w-3.5 h-3.5" />
              <span>SLA 99.9%</span>
            </span>
            <span className="text-blue-950">|</span>
            <span className="flex items-center gap-1.5 text-cyan-300">
              <GitBranch className="w-3.5 h-3.5 text-blue-400" />
              <span>SHA: #b0a445e</span>
            </span>
            <span className="text-blue-950 hidden sm:inline">|</span>
            <span className="text-slate-400 hidden sm:inline">RHEL-READY</span>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#04091a] hover:bg-blue-950/60 border border-blue-500/30 hover:border-cyan-400 text-slate-300 hover:text-white transition-all shadow-[0_0_15px_rgba(59,130,246,0.1)]"
            title="Return to top of page"
          >
            <span className="font-semibold">RETURN_TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-blue-950/60 text-center text-[10px] text-slate-600">
          © {new Date().getFullYear()} Abhimanyu Kumar. All rights reserved. Architected for enterprise observability and high-reliability software environments.
        </div>
      </div>
    </footer>
  );
};
