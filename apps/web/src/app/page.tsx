"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ObservabilityHUD } from "@/components/ObservabilityHUD";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { TerminalHUD } from "@/components/TerminalHUD";

export default function Home() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      // Escape closes terminal if open
      if (e.key === "Escape" && terminalOpen) {
        setTerminalOpen(false);
        return;
      }

      // Ctrl + / or backtick/tilde when not focused in an input
      if ((e.ctrlKey && e.key === "/") || (!isInput && (e.key === "`" || e.key === "~"))) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [terminalOpen]);

  return (
    <main className="min-h-screen relative flex flex-col justify-between">
      <Navbar onOpenTerminal={() => setTerminalOpen(true)} />
      
      <div className="flex-1">
        <Hero onOpenTerminal={() => setTerminalOpen(true)} />
        <Projects />
        <Skills />
        <Experience />
        <ObservabilityHUD />
        <ContactSection />
      </div>

      <Footer />

      {/* Interactive Terminal Drawer */}
      <TerminalHUD
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
    </main>
  );
}
