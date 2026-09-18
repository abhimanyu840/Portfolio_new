"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Terminal, Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";
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
  const [activeSection, setActiveSection] = useState<string>("");
  const { resolvedTheme, toggleTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const isManualNavRef = React.useRef(false);
  const manualNavTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

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
    // Lock scroll spy while smooth scrolling to target so pill glides directly to destination
    manualNavTimeoutRef.current = setTimeout(() => {
      isManualNavRef.current = false;
    }, 1200);
  };

  useEffect(() => {
    // Check initial URL hash
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      if (["projects", "skills", "experience", "hud", "contact"].includes(hash)) {
        setActiveSection(hash);
      }
    }

    const sectionIds = ["projects", "skills", "experience", "hud", "contact"];

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Do not let scroll-spy fight the active pill while user is smooth-scrolling from a click
      if (isManualNavRef.current) return;

      // 1. If near bottom of the page, activate the contact section
      const scrollBottom = window.innerHeight + window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      if (scrollBottom >= docHeight - 90) {
        setActiveSection("contact");
        return;
      }

      // 2. If near top (Hero section), clear active section
      if (window.scrollY < 200) {
        setActiveSection("");
        return;
      }

      // 3. Focal detection: check which section spans across the focal line (140px below viewport top)
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

      // Fallback: pick the latest section that has crossed the focal line
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
        className={`max-w-6xl mx-auto rounded-2xl sm:rounded-full transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 pointer-events-auto px-4 py-2 sm:px-6 sm:py-2.5 ${
          scrolled
            ? "bg-white/95 dark:bg-[#090b14]/95 backdrop-blur-2xl border border-slate-200 dark:border-white/[0.12] shadow-xl dark:shadow-2xl shadow-slate-200/50 dark:shadow-black/80"
            : "bg-white/85 dark:bg-[#0a0d1a]/85 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] shadow-lg dark:shadow-xl"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand & Monogram Identity */}
          <a
            href="#"
            onClick={() => handleNavClick("")}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="relative">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-cyan-500/20 via-blue-600/30 to-indigo-600/20 border border-cyan-500/40 flex items-center justify-center font-mono font-bold text-xs sm:text-sm text-cyan-600 dark:text-cyan-300 shadow-inner group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all">
                AK
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-[#0a0d1a] animate-pulse" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-200 transition-colors">
                  Abhimanyu Kumar
                </span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden xs:inline font-mono">
                Software Engineer @ Wipro
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-100/90 dark:bg-[#070a14]/90 backdrop-blur-md border border-slate-200/90 dark:border-white/[0.08] rounded-full p-1 relative shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative isolate px-3.5 py-1.5 text-xs rounded-full transition-colors duration-200 cursor-pointer flex items-center justify-center font-medium select-none ${
                    isActive
                      ? "text-slate-900 dark:text-cyan-100 font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/[0.05]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-white dark:bg-[#0c1222] dark:bg-gradient-to-r dark:from-cyan-500/25 dark:via-blue-600/30 dark:to-indigo-600/25 border border-slate-200/90 dark:border-cyan-400/50 shadow-sm dark:shadow-[0_0_15px_rgba(6,182,212,0.3)] z-0 pointer-events-none"
                      transition={springTransition}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="hidden lg:flex items-center space-x-2.5">
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
                <Moon className="w-4 h-4 text-indigo-500 group-hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* Social Links */}
            <div className="flex items-center space-x-1 pr-2 border-r border-slate-200 dark:border-white/[0.08]">
              <a
                href={DEVELOPER_PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
                title="GitHub Profile"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={DEVELOPER_PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>

            {/* Terminal HUD Trigger */}
            <button
              onClick={onOpenTerminal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] dark:border-white/[0.08] dark:hover:border-cyan-500/40 text-slate-700 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-300 text-xs font-mono transition-all group shadow-sm cursor-pointer"
              title="Launch Interactive Terminal (Ctrl + /)"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-500 dark:group-hover:text-cyan-300 transition-colors" />
              <span>Terminal</span>
              <kbd className="px-1.5 py-0.2 text-[10px] font-mono bg-slate-200/70 text-slate-600 border border-slate-300/80 dark:bg-white/[0.06] dark:text-slate-400 dark:border-white/[0.1] rounded">
                ~
              </kbd>
            </button>

            {/* Direct Get In Touch CTA */}
            <motion.a
              href="#contact"
              onClick={() => handleNavClick("contact")}
              whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-white text-xs font-semibold bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all cursor-pointer"
            >
              <span>Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.a>
          </div>

          {/* Mobile menu, theme toggle and terminal toggle */}
          <div className="flex items-center lg:hidden space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/[0.1] transition-colors cursor-pointer"
              title={resolvedTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-500" />
              )}
            </button>
            <button
              onClick={onOpenTerminal}
              className="p-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] text-cyan-600 dark:text-cyan-400 border border-slate-200 dark:border-white/[0.1] hover:border-cyan-500/50 transition-colors cursor-pointer"
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
                        ? "text-slate-900 dark:text-cyan-100 font-semibold"
                        : "text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/[0.06] border border-transparent font-medium"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeMobileNavPill"
                        className="absolute inset-0 rounded-xl bg-white dark:bg-[#0c1222] dark:bg-gradient-to-r dark:from-cyan-500/25 dark:via-blue-600/30 dark:to-indigo-600/25 border border-slate-200/90 dark:border-cyan-400/50 shadow-sm dark:shadow-[0_0_12px_rgba(6,182,212,0.3)] z-0 pointer-events-none"
                        transition={springTransition}
                      />
                    )}
                    <div className="flex items-center gap-2 relative z-10">
                      <span>{link.label}</span>
                    </div>
                    {isActive && (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-700 dark:bg-cyan-500/25 dark:text-cyan-300 border border-cyan-500/30 relative z-10">
                        ACTIVE
                      </span>
                    )}
                  </a>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-white/[0.08] flex flex-col gap-2">
              {/* Mobile Theme Toggle Button Row */}
              <button
                onClick={() => {
                  toggleTheme();
                }}
                className="w-full justify-between flex items-center px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.1] text-slate-700 dark:text-slate-300 text-xs font-medium cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  {resolvedTheme === "dark" ? (
                    <Moon className="w-4 h-4 text-indigo-400" />
                  ) : (
                    <Sun className="w-4 h-4 text-amber-500" />
                  )}
                  <span>Appearance Mode</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span className="text-slate-500 dark:text-slate-400 font-normal">Active:</span>
                  <span className="text-cyan-600 dark:text-cyan-300 font-bold uppercase">
                    {resolvedTheme === "dark" ? "Dark Mode 🌙" : "Light Mode ☀️"}
                  </span>
                </div>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTerminal();
                }}
                className="w-full justify-center flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.1] text-cyan-600 dark:text-cyan-300 text-xs font-mono cursor-pointer"
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
                className={`w-full justify-center flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs font-semibold shadow-md transition-all cursor-pointer ${
                  activeSection === "contact"
                    ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 ring-2 ring-cyan-400/50 shadow-cyan-500/30"
                    : "bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 shadow-cyan-500/20"
                }`}
              >
                <span>Connect with Abhimanyu</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
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
