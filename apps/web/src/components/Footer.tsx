"use client";

import React from "react";
import { ArrowUp, Activity, GitBranch } from "lucide-react";
import { DEVELOPER_PROFILE } from "@/lib/seed-data";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 bg-[#060813] border-t border-indigo-950/60 font-mono text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Info */}
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-white font-bold tracking-wider">
              <span>{DEVELOPER_PROFILE.name.toUpperCase()}</span>
              <span className="text-slate-600">//</span>
              <span className="text-indigo-400">TELEMETRY_PORTFOLIO</span>
            </div>
            <div className="text-slate-500 text-[11px]">
              Engineered with Next.js 16, React 19, Tailwind CSS &amp; Turborepo • Deployed on Netlify
            </div>
          </div>

          {/* Center Commit Hash & SLA */}
          <div className="flex items-center gap-4 text-[11px] bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="flex items-center gap-1 text-indigo-400">
              <Activity className="w-3 h-3" />
              <span>SLA 99.9%</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1 text-slate-400">
              <GitBranch className="w-3 h-3 text-purple-400" />
              <span>SHA: #b0a445e</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">RHEL-READY</span>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Return to top of page"
          >
            <span>RETURN_TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-indigo-400" />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-900 text-center text-[10px] text-slate-600">
          © {new Date().getFullYear()} Abhimanyu Kumar. All rights reserved. Built for high-reliability observability environments.
        </div>
      </div>
    </footer>
  );
};
