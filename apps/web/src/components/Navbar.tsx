"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Activity, Menu, X, ShieldCheck, ChevronDown } from "lucide-react";

interface NavbarProps {
  onOpenTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [uptimeSeconds, setUptimeSeconds] = useState(1308); // 0h 21m 48s default starting point
  const [activeTab, setActiveTab] = useState("HUD");

  useEffect(() => {
    fetch("/api/v1/health")
      .then((res) => res.json())
      .then((json) => {
        if (json.data && typeof json.data.uptime === "number") {
          setUptimeSeconds(json.data.uptime);
        }
      })
      .catch(() => {});

    const interval = setInterval(() => {
      setUptimeSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatUptime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${hours}h ${mins.toString().padStart(2, "0")}m ${s.toString().padStart(2, "0")}s`;
  };

  const navLinks = [
    { label: "HUD", href: "#hud" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="glass-dock rounded-2xl px-3 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between border border-blue-500/20 bg-[#04081c]/85 shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
        {/* Brand / Monogram */}
        <a href="#" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 border border-blue-400/40 flex items-center justify-center font-bold text-white shadow-[0_0_18px_rgba(59,130,246,0.5)] group-hover:scale-105 transition-all text-sm tracking-wider">
            AK
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xs sm:text-sm tracking-wider text-white group-hover:text-cyan-300 transition-colors">
              ABHIMANYU K
            </span>
            <span className="font-mono text-[10px] text-cyan-400 flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              OPS_SYS // 99.9%
            </span>
          </div>
        </a>

        {/* Center Navigation Pills */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => {
            const isActive = activeTab === link.label;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setActiveTab(link.label)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                  isActive
                    ? "bg-blue-600/30 text-white border border-blue-400/40 shadow-[0_0_15px_rgba(59,130,246,0.35)] font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]"></span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action Controls */}
        <div className="hidden lg:flex items-center space-x-2.5">
          {/* Uptime Pill with ECG icon */}
          <div className="px-3 py-1.5 rounded-xl bg-blue-950/40 border border-blue-500/25 font-mono text-[11px] text-cyan-300 flex items-center gap-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="font-semibold">UP: {formatUptime(uptimeSeconds)}</span>
          </div>

          {/* Terminal Launcher Button */}
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-950/50 hover:bg-blue-900/60 border border-blue-500/30 hover:border-cyan-400 text-blue-200 hover:text-white font-mono text-xs font-semibold transition-all shadow-[0_0_15px_rgba(59,130,246,0.2)]"
            title="Launch Interactive Terminal (Ctrl + /)"
          >
            <span className="text-cyan-400">&gt;_</span>
            <span>CLI</span>
            <ChevronDown className="w-3 h-3 text-blue-300 ml-0.5" />
          </button>

          {/* Verified Exp Badge */}
          <a
            href="#experience"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/35 text-emerald-300 hover:text-emerald-200 font-mono text-xs font-semibold transition-all shadow-[0_0_15px_rgba(16,185,129,0.15)]"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verified Exp</span>
          </a>
        </div>

        {/* Mobile menu triggers */}
        <div className="flex items-center lg:hidden space-x-2">
          <button
            onClick={onOpenTerminal}
            className="px-2.5 py-1.5 rounded-lg bg-blue-950/60 border border-blue-500/30 text-cyan-300 font-mono text-xs flex items-center gap-1.5"
            aria-label="Open Terminal"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px] font-semibold">CLI</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-700/80 text-slate-300 hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 bg-[#04081c]/95 border border-blue-500/30 rounded-2xl p-4 space-y-3 shadow-2xl backdrop-blur-2xl">
          <div className="font-mono text-xs text-slate-400 border-b border-blue-950 pb-2.5 flex justify-between items-center">
            <span>UPTIME: {formatUptime(uptimeSeconds)}</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              99.9% OPS_SYS
            </span>
          </div>
          <div className="flex flex-col space-y-1.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  setActiveTab(link.label);
                  setMobileMenuOpen(false);
                }}
                className={`font-mono text-sm px-3 py-2 rounded-xl transition-all ${
                  activeTab === link.label
                    ? "bg-blue-600/30 text-white font-bold border border-blue-500/40"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                &gt; {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-blue-950 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTerminal();
                }}
                className="text-left font-mono text-xs text-cyan-300 p-2.5 rounded-xl bg-blue-950/60 border border-blue-500/30 flex items-center gap-2"
              >
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Launch Interactive Terminal Drawer</span>
              </button>
              <a
                href="#experience"
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono text-xs text-emerald-300 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Enterprise Credentials</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
