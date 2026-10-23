"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Terminal, Menu, X, ArrowUpRight, Sun, Moon, ChevronDown } from "lucide-react";
import { DEVELOPER_PROFILE } from "@/lib/seed-data";
import { useTheme } from "@/context/ThemeContext";

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
  const [activeSection, setActiveSection] = useState<string>("projects");
  const { resolvedTheme, toggleTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const isManualNavRef = useRef(false);
  const manualNavTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const springTransition = shouldReduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 350, damping: 32, mass: 0.8 };

  const navLinks = [
    { id: "projects", label: "Projects", href: "#projects" },
    { id: "skills", label: "Skills", href: "#skills" },
    { id: "experience", label: "Experience", href: "#experience" },
    { id: "hud", label: "Architecture Lab", href: "#hud" },
    { id: "contact", label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    isManualNavRef.current = true;
    if (manualNavTimeoutRef.current) {
      clearTimeout(manualNavTimeoutRef.current);
    }
    // Lock scroll spy while smooth scrolling
    manualNavTimeoutRef.current = setTimeout(() => {
      isManualNavRef.current = false;
    }, 1200);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      if (["projects", "skills", "experience", "hud", "contact"].includes(hash)) {
        setActiveSection(hash);
      }
    }

    const sectionIds = ["projects", "skills", "experience", "hud", "contact"];

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (isManualNavRef.current) return;

      const scrollBottom = window.innerHeight + window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      if (scrollBottom >= docHeight - 90) {
        setActiveSection("contact");
        return;
      }

      if (window.scrollY < 200) {
        setActiveSection("projects");
        return;
      }

      const focalLine = 140;
      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= focalLine && rect.bottom > focalLine) {
            current = id;
            break;
          }
        }
      }

      if (!current) {
        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const id = sectionIds[i];
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= focalLine) {
              current = id;
              break;
            }
          }
        }
      }

      if (current) {
        setActiveSection(current);
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleScroll);
      if (manualNavTimeoutRef.current) {
        clearTimeout(manualNavTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 px-3 sm:px-6 pointer-events-none">
      <div
        className={`max-w-7xl mx-auto rounded-full transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 pointer-events-auto px-3.5 py-2 sm:px-6 sm:py-2.5 ${
          scrolled
            ? "bg-white/95 dark:bg-[#070e10]/95 backdrop-blur-2xl border border-slate-200 dark:border-white/[0.1] shadow-xl dark:shadow-2xl shadow-slate-200/50 dark:shadow-black/90"
            : "bg-white/85 dark:bg-[#070e10]/85 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] shadow-lg dark:shadow-xl"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          {/* 1. Left Brand Identity (Solid Mint AK Squircle + Abhimanyu Kumar) */}
          <a
            href="#"
            onClick={() => handleNavClick("projects")}
            className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer shrink-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#34d399] flex items-center justify-center font-mono font-bold text-xs sm:text-sm text-slate-950 shadow-md shadow-emerald-500/20 group-hover:bg-[#2dd4bf] group-hover:shadow-[0_0_15px_rgba(52,211,153,0.4)] transition-all">
              AK
            </div>
            <span className="font-semibold text-xs sm:text-sm tracking-tight text-slate-900 dark:text-white group-hover:text-[#34d399] transition-colors">
              Abhimanyu Kumar
            </span>
          </a>

          {/* 2. Center Segmented Navigation Pills */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-100/90 dark:bg-[#04080a]/90 backdrop-blur-md border border-slate-200/90 dark:border-white/[0.08] rounded-full p-1 relative shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative isolate px-3.5 py-1.5 text-xs rounded-full transition-colors duration-200 cursor-pointer flex items-center justify-center font-medium select-none ${
                    isActive
                      ? "text-slate-900 dark:text-[#a7f3d0] font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/[0.04]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-white dark:bg-[#0e1819] border border-slate-200/90 dark:border-[#34d399]/40 shadow-sm dark:shadow-[0_0_15px_rgba(52,211,153,0.2)] z-0 pointer-events-none"
                      transition={springTransition}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* 3. Right Action Controls: Theme, GitHub, LinkedIn, Terminal, Connect CTA */}
          <div className="hidden lg:flex items-center space-x-2 shrink-0">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/[0.06] border border-slate-200/60 dark:border-white/[0.08] transition-all cursor-pointer flex items-center justify-center group shadow-sm"
              title={resolvedTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label={resolvedTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {resolvedTheme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-emerald-600 group-hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* GitHub Icon Link */}
            <a
              href={DEVELOPER_PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/[0.06] border border-slate-200/60 dark:border-white/[0.08] transition-all cursor-pointer flex items-center justify-center shadow-sm"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            {/* LinkedIn Icon Link */}
            <a
              href={DEVELOPER_PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/[0.06] border border-slate-200/60 dark:border-white/[0.08] transition-all cursor-pointer flex items-center justify-center shadow-sm"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            {/* Terminal Button */}
            <button
              onClick={onOpenTerminal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.09] border border-slate-200 dark:border-white/[0.08] dark:hover:border-[#34d399]/40 text-slate-800 dark:text-slate-200 hover:text-[#34d399] dark:hover:text-[#34d399] font-mono text-xs transition-all shadow-sm cursor-pointer"
              title="Open Terminal HUD (Ctrl + /)"
            >
              <span className="text-[#34d399] font-bold">&gt;_</span>
              <span>Terminal</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* Connect ↗ Solid Mint CTA Button */}
            <a
              href="#contact"
              onClick={() => handleNavClick("contact")}
              className="px-4 py-1.5 rounded-full bg-[#34d399] hover:bg-[#2dd4bf] text-slate-950 font-semibold text-xs sm:text-sm tracking-tight transition-all flex items-center gap-1 shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/40 cursor-pointer ml-1"
            >
              <span>Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center lg:hidden space-x-1.5">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/[0.1] transition-colors cursor-pointer"
              title={resolvedTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-emerald-500" />
              )}
            </button>
            <button
              onClick={onOpenTerminal}
              className="p-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] text-[#34d399] border border-slate-200 dark:border-white/[0.1] hover:border-[#34d399]/50 transition-colors cursor-pointer"
              aria-label="Open Terminal"
            >
              <Terminal className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/[0.1] hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="lg:hidden mt-3 pt-3 pb-3 border-t border-slate-200 dark:border-white/[0.08] space-y-3 overflow-hidden"
            >
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      onClick={() => {
                        handleNavClick(link.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`relative isolate text-sm px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer flex items-center justify-between font-medium select-none ${
                        isActive
                          ? "text-slate-900 dark:text-[#a7f3d0] font-semibold"
                          : "text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/[0.06] border border-transparent font-medium"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeMobileNavPill"
                          className="absolute inset-0 rounded-xl bg-white dark:bg-[#0c1617] border border-slate-200/90 dark:border-[#34d399]/40 shadow-sm dark:shadow-[0_0_12px_rgba(52,211,153,0.25)] z-0 pointer-events-none"
                          transition={springTransition}
                        />
                      )}
                      <div className="flex items-center gap-2 relative z-10">
                        <span>{link.label}</span>
                      </div>
                      {isActive && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#34d399]/15 text-[#059669] dark:bg-[#34d399]/20 dark:text-[#34d399] border border-[#34d399]/30 relative z-10">
                          ACTIVE
                        </span>
                      )}
                    </a>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-white/[0.08] flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTerminal();
                  }}
                  className="w-full justify-center flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.1] text-[#34d399] text-xs font-mono cursor-pointer"
                >
                  <Terminal className="w-4 h-4" />
                  <span>Launch Terminal CLI</span>
                </button>

                <a
                  href="#contact"
                  onClick={() => {
                    handleNavClick("contact");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full justify-center flex items-center gap-1.5 px-4 py-2 rounded-xl text-slate-950 text-xs font-bold bg-[#34d399] hover:bg-[#2dd4bf] shadow-md shadow-emerald-500/20 cursor-pointer"
                >
                  <span>Connect</span>
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </a>

                <div className="flex items-center justify-center gap-3 pt-2 text-slate-500 dark:text-slate-400">
                  <a
                    href={DEVELOPER_PROFILE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
                    aria-label="GitHub Profile"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={DEVELOPER_PROFILE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
                    aria-label="LinkedIn Profile"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
