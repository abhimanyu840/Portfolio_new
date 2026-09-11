"use client";

import React from "react";

export const HoloConsole: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center select-none w-full">
      {/* Ambient background glow */}
      <div className="absolute -inset-10 bg-gradient-to-tr from-blue-600/25 via-cyan-500/20 to-purple-600/15 rounded-full blur-3xl -z-10 pointer-events-none animate-pulse-glow" />

      {/* Main Container */}
      <div className="relative flex items-center justify-between gap-6 xl:gap-8 w-full">
        {/* Isometric 3D Holographic Card Composition */}
        <div className="relative w-[320px] sm:w-[350px] md:w-[370px] h-[260px] sm:h-[280px] flex-shrink-0 animate-float-hologram">
          {/* Layer 1: Background Blueprint Code Card */}
          <div
            className="absolute top-4 left-4 w-[240px] sm:w-[260px] h-[180px] rounded-2xl bg-[#050e28]/85 border border-blue-500/35 backdrop-blur-md p-3.5 flex flex-col justify-between"
            style={{
              transform: "perspective(1000px) rotateX(20deg) rotateY(-26deg) rotateZ(6deg) translateZ(-35px)",
              boxShadow: "0 25px 45px -10px rgba(0,0,0,0.85), 0 0 25px rgba(59,130,246,0.3)",
            }}
          >
            {/* Top Bar with dots */}
            <div className="flex items-center gap-1.5 pb-2 border-b border-blue-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400/80"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/80"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80"></span>
              <span className="font-mono text-[9px] text-blue-300 ml-2">sys_kernel.log</span>
            </div>
            {/* Code Lines */}
            <div className="space-y-1.5 font-mono text-[9px] text-blue-300/70">
              <div className="flex items-center gap-2">
                <span className="text-cyan-400">&gt;</span>
                <div className="w-24 h-1.5 rounded bg-blue-500/30"></div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-400">#</span>
                <div className="w-36 h-1.5 rounded bg-cyan-500/30"></div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-400">~</span>
                <div className="w-28 h-1.5 rounded bg-purple-500/30"></div>
              </div>
            </div>
            {/* Mini Sparkline at bottom */}
            <div className="h-6 flex items-end gap-1 pt-1 border-t border-blue-500/20">
              {[40, 65, 30, 85, 55, 95, 70, 60, 80].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className="flex-1 rounded-t bg-gradient-to-t from-blue-600 to-cyan-400 opacity-80"
                />
              ))}
            </div>
          </div>

          {/* Layer 2: Floating Telemetry Dashboard Card (Right Offset) */}
          <div
            className="absolute top-10 right-2 w-[150px] sm:w-[165px] h-[165px] rounded-2xl bg-[#061234]/90 border border-cyan-500/40 backdrop-blur-md p-3 flex flex-col justify-between"
            style={{
              transform: "perspective(1000px) rotateX(20deg) rotateY(-26deg) rotateZ(6deg) translateZ(15px)",
              boxShadow: "0 20px 40px -8px rgba(0,0,0,0.9), 0 0 25px rgba(6,182,212,0.35)",
            }}
          >
            <div className="font-mono text-[9px] font-bold text-cyan-300 uppercase flex items-center justify-between">
              <span>METRICS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
            </div>
            {/* Vertical Bar Chart */}
            <div className="flex items-end justify-between h-20 px-1 gap-1.5">
              {[
                { h: 45, c: "from-blue-600 to-indigo-500" },
                { h: 70, c: "from-cyan-500 to-blue-500" },
                { h: 90, c: "from-emerald-400 to-cyan-400" },
                { h: 60, c: "from-blue-500 to-purple-500" },
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                  <div
                    style={{ height: `${bar.h}%` }}
                    className={`w-full rounded-t bg-gradient-to-t ${bar.c} shadow-[0_0_8px_rgba(6,182,212,0.5)]`}
                  />
                  <span className="font-mono text-[8px] text-slate-400">p{i + 1}</span>
                </div>
              ))}
            </div>
            <div className="font-mono text-[8px] text-emerald-400 text-center bg-emerald-950/60 rounded py-0.5 border border-emerald-500/30">
              FLOW: 12k/s
            </div>
          </div>

          {/* Layer 3: Central Glowing Front Panel with </> Symbol */}
          <div
            className="absolute top-12 left-0 w-[190px] sm:w-[210px] h-[170px] sm:h-[185px] rounded-2xl bg-gradient-to-br from-[#091742]/95 via-[#061236]/95 to-[#030a24] border-2 border-cyan-400/80 backdrop-blur-xl p-4 flex flex-col items-center justify-center group"
            style={{
              transform: "perspective(1000px) rotateX(20deg) rotateY(-26deg) rotateZ(6deg) translateZ(45px)",
              boxShadow: "0 25px 55px -10px rgba(0,0,0,0.95), 0 0 40px rgba(6,182,212,0.6), inset 0 0 25px rgba(6,182,212,0.25)",
            }}
          >
            {/* Holographic Glowing </> Emblem */}
            <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-gradient-to-tr from-cyan-500/40 via-blue-600/50 to-indigo-600/40 border border-cyan-300/70 flex items-center justify-center shadow-[0_0_35px_rgba(6,182,212,0.7)]">
              {/* Glowing code brackets */}
              <span className="font-mono font-black text-3xl sm:text-4xl text-white tracking-wider drop-shadow-[0_0_15px_#00f0ff] flex items-center">
                &lt;<span className="text-cyan-300">/</span>&gt;
              </span>
            </div>

            {/* Bottom Status pill */}
            <div className="mt-3 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/90 border border-cyan-400/50 text-[9px] font-mono text-cyan-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>DEV_CORE_ONLINE</span>
            </div>
          </div>
        </div>

        {/* Vertical Typography Tagline from updated_ui.png */}
        <div className="flex flex-col text-left font-mono tracking-[0.22em] uppercase space-y-1.5 select-none pl-2">
          <span className="text-xs sm:text-sm font-bold text-slate-300">BUILDING</span>
          <span className="text-xs sm:text-sm font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
            SCALABLE SYSTEMS
          </span>
          <span className="text-xs sm:text-sm font-bold text-slate-300">FOR A SMARTER</span>
          <span className="text-xs sm:text-sm font-bold text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
            TOMORROW
          </span>
        </div>
      </div>
    </div>
  );
};
