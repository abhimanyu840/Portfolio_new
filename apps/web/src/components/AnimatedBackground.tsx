"use client";

import React, { useEffect, useState } from "react";
import { ThreeBackground } from "@/components/ThreeBackground";

export const AnimatedBackground: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Pre-hydration SSR fallback
  if (!mounted) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 obsidian-grid opacity-20 dark:opacity-10" />
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Base Engineering Canvas: Subtle Technical Grid */}
      <div className="absolute inset-0 obsidian-grid opacity-20 dark:opacity-10" />

      {/* 2. Three.js Celestial Horizon: Emerald Planet, Orbital Rings & Monolithic Pillars */}
      <ThreeBackground particleCount={450} />
    </div>
  );
};
