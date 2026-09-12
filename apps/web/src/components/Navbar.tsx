"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Menu, X, ArrowUpRight } from "lucide-react";
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
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#060813]/85 backdrop-blur-xl border-b border-indigo-950/60 shadow-xl shadow-black/40"
          : "bg-transparent border-b border-indigo-950/30"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Identity */}
          <a href="#" className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600/20 via-indigo-600/25 to-purple-600/20 border border-indigo-500/30 flex items-center justify-center font-mono font-bold text-sm text-indigo-300 shadow-inner group-hover:border-indigo-400 group-hover:shadow-indigo-500/20 transition-all">
              AK
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm sm:text-base tracking-tight text-white group-hover:text-indigo-200 transition-colors">
                Abhimanyu Kumar
              </span>
              <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                <span>Software Engineer @ Wipro</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Social Links */}
            <div className="flex items-center space-x-1 border-r border-slate-800/80 pr-3">
              <a
                href={DEVELOPER_PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
                title="GitHub Profile"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={DEVELOPER_PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>

            {/* Terminal Drawer Trigger */}
            <button
              onClick={onOpenTerminal}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-indigo-950/40 border border-slate-800 hover:border-indigo-500/50 text-slate-300 hover:text-white text-xs font-medium transition-all group shadow-sm cursor-pointer"
              title="Launch Interactive Terminal (Ctrl + /)"
            >
              <Terminal className="w-3.5 h-3.5 text-indigo-400 group-hover:text-purple-400 transition-colors" />
              <span>Terminal</span>
              <kbd className="hidden xl:inline-block px-1.5 py-0.2 text-[10px] font-mono bg-slate-800 text-slate-400 border border-slate-700/60 rounded">
                ~
              </kbd>
            </button>

            {/* Direct Get In Touch CTA */}
            <a
              href="#contact"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all active:scale-95 cursor-pointer"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex items-center md:hidden space-x-2">
            <button
              onClick={onOpenTerminal}
              className="p-2 rounded-lg bg-slate-900 text-indigo-400 border border-slate-800 hover:border-indigo-500/50 transition-colors cursor-pointer"
              aria-label="Open Terminal"
            >
              <Terminal className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#060813]/98 border-b border-indigo-950/80 px-4 pt-3 pb-6 space-y-4 shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800/60 transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="w-full justify-center flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-indigo-300 text-xs font-medium cursor-pointer"
            >
              <Terminal className="w-4 h-4" />
              <span>Launch Terminal CLI</span>
            </button>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full justify-center flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-xs font-semibold shadow-md shadow-indigo-600/25 cursor-pointer"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <div className="flex items-center justify-center gap-3 pt-2 text-slate-400">
              <a
                href={DEVELOPER_PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={DEVELOPER_PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
