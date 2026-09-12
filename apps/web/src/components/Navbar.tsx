"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { DEVELOPER_PROFILE } from "@/lib/seed-data";

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface NavbarProps {
  onOpenTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Architecture Lab", href: "#hud" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 px-3 sm:px-6 pointer-events-none">
      <div
        className={`max-w-6xl mx-auto rounded-2xl sm:rounded-full transition-all duration-300 pointer-events-auto ${
          scrolled
            ? "bg-[#090b14]/90 backdrop-blur-2xl border border-white/[0.12] shadow-2xl shadow-black/80 px-4 py-2 sm:px-6 sm:py-2.5"
            : "bg-[#0a0d1a]/70 backdrop-blur-xl border border-white/[0.08] shadow-xl px-4 py-2.5 sm:px-6 sm:py-3"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand & Monogram Identity */}
          <a href="#" className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-cyan-500/20 via-blue-600/30 to-indigo-600/20 border border-cyan-500/40 flex items-center justify-center font-mono font-bold text-xs sm:text-sm text-cyan-300 shadow-inner group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all">
                AK
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0a0d1a] animate-pulse" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-sm sm:text-base tracking-tight text-white group-hover:text-cyan-200 transition-colors">
                  Abhimanyu Kumar
                </span>
              </div>
              <span className="text-[11px] text-slate-400 hidden xs:inline font-mono">
                Software Engineer @ Wipro
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 bg-white/[0.03] border border-white/[0.06] rounded-full p-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.08] rounded-full transition-all cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="hidden md:flex items-center space-x-2.5">
            {/* Social Links */}
            <div className="flex items-center space-x-1 pr-2 border-r border-white/[0.08]">
              <a
                href={DEVELOPER_PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                title="GitHub Profile"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={DEVELOPER_PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>

            {/* Terminal HUD Trigger */}
            <button
              onClick={onOpenTerminal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 text-xs font-mono transition-all group shadow-sm cursor-pointer"
              title="Launch Interactive Terminal (Ctrl + /)"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              <span>Terminal</span>
              <kbd className="px-1.5 py-0.2 text-[10px] font-mono bg-white/[0.06] text-slate-400 border border-white/[0.1] rounded">
                ~
              </kbd>
            </button>

            {/* Direct Get In Touch CTA */}
            <a
              href="#contact"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all active:scale-95 cursor-pointer"
            >
              <span>Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile menu and terminal toggle */}
          <div className="flex items-center md:hidden space-x-2">
            <button
              onClick={onOpenTerminal}
              className="p-2 rounded-xl bg-white/[0.05] text-cyan-400 border border-white/[0.1] hover:border-cyan-500/50 transition-colors cursor-pointer"
              aria-label="Open Terminal"
            >
              <Terminal className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/[0.05] text-slate-300 border border-white/[0.1] hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 pb-2 border-t border-white/[0.08] space-y-3">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-slate-300 hover:text-white px-3 py-2 rounded-xl hover:bg-white/[0.06] transition-colors cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-white/[0.08] flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTerminal();
                }}
                className="w-full justify-center flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-cyan-300 text-xs font-mono cursor-pointer"
              >
                <Terminal className="w-4 h-4" />
                <span>Launch Terminal CLI</span>
              </button>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full justify-center flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white text-xs font-semibold shadow-md shadow-cyan-500/20 cursor-pointer"
              >
                <span>Connect with Abhimanyu</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center justify-center gap-3 pt-2 text-slate-400">
                <a
                  href={DEVELOPER_PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={DEVELOPER_PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
