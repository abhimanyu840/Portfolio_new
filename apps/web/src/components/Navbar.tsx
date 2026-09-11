"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Activity, Menu, X, ArrowUpRight, ShieldCheck } from "lucide-react";

interface NavbarProps {
  onOpenTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [uptimeSeconds, setUptimeSeconds] = useState(14820);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

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

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const formatUptime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${hours}h ${mins}m ${s}s`;
  };

  const navLinks = [
    { label: "HUD", href: "#hud" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? "bg-[#0a0e17]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20"
          : "bg-transparent border-b border-slate-800/30"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand / Monogram */}
          <a href="#" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-emerald-400 group-hover:border-emerald-400 transition-colors">
              AK
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-sm font-semibold tracking-wider text-slate-100 group-hover:text-emerald-300 transition-colors">
                ABHIMANYU.K
              </span>
              <span className="font-mono text-[10px] text-slate-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                OPS_SYS // 99.9%
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 font-mono text-xs text-slate-300 hover:text-emerald-300 hover:bg-slate-800/60 rounded transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Icons & Terminal Launcher */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Live Uptime Pill */}
            <div className="px-2.5 py-1 rounded bg-slate-900/80 border border-slate-800 font-mono text-[11px] text-slate-400 flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-emerald-400" />
              <span>UP: {formatUptime(uptimeSeconds)}</span>
            </div>

            {/* Terminal Trigger Button */}
            <button
              onClick={onOpenTerminal}
              className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-800/90 hover:bg-emerald-950/60 border border-slate-700 hover:border-emerald-500/50 text-slate-200 hover:text-emerald-300 font-mono text-xs transition-all shadow-sm"
              title="Launch Interactive Terminal (Ctrl + /)"
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>&gt;_ CLI</span>
              <span className="px-1 py-0.2 text-[9px] bg-slate-700/80 rounded text-slate-300">~</span>
            </button>

            {/* Direct Resume CTA */}
            <a
              href="#experience"
              className="flex items-center gap-1 px-3 py-1.5 rounded bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-medium transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Exp</span>
            </a>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex items-center md:hidden space-x-2">
            <button
              onClick={onOpenTerminal}
              className="p-2 rounded bg-slate-800 text-emerald-400 border border-slate-700 font-mono text-xs"
              aria-label="Open Terminal"
            >
              <Terminal className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded bg-slate-800 text-slate-300 border border-slate-700 hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0e17]/95 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          <div className="font-mono text-xs text-slate-400 border-b border-slate-800 pb-2 flex justify-between items-center">
            <span>NODE: AP-SOUTH-1</span>
            <span className="text-emerald-400 font-semibold">STATUS: 200 OK</span>
          </div>
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono text-sm text-slate-300 hover:text-emerald-300 px-2 py-1.5 rounded hover:bg-slate-800"
              >
                &gt; {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="text-left font-mono text-sm text-emerald-400 px-2 py-1.5 rounded hover:bg-emerald-950/40 flex items-center gap-2"
            >
              <Terminal className="w-4 h-4" />
              &gt; Launch Interactive Terminal Drawer
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
