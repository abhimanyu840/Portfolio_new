"use client";

import React, { useState } from "react";
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

  return (
    <main className="min-h-screen relative flex flex-col justify-between">
      <Navbar onOpenTerminal={() => setTerminalOpen(true)} />
      
      <div className="flex-1">
        <Hero onOpenTerminal={() => setTerminalOpen(true)} />
        <ObservabilityHUD />
        <Projects />
        <Skills />
        <Experience />
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
