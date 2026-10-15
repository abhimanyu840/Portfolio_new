"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ThreeBackground } from "@/components/ThreeBackground";

export const AnimatedBackground: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Pre-hydration SSR fallback: static background structure
  if (!mounted) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 obsidian-grid opacity-40 dark:opacity-25" />
        <div className="absolute inset-0 obsidian-radial opacity-60 dark:opacity-70" />
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Base Tech Matrix: Subtle Grid & Ambient Depth */}
      <div className="absolute inset-0 obsidian-grid opacity-40 dark:opacity-25" />
      <div className="absolute inset-0 obsidian-radial opacity-60 dark:opacity-70" />

      {/* 2. Three.js Production 3D Cybernetic Topological Horizon & Flow Stream */}
      <ThreeBackground particleCount={550} />

      {/* 3. Subtle Cyber Scanline Sweep Beam (GPU-Composited Transform) */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute left-0 right-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/30 dark:via-cyan-300/35 to-transparent transform-gpu will-change-transform pointer-events-none"
          initial={{ y: "-10px" }}
          animate={{ y: "105vh" }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}

      {/* 4. Ambient Telemetry Beacons & Network Coordinates */}
      <div className="absolute inset-0">
        {[
          { top: "14%", left: "12%", delay: 0, size: "w-1.5 h-1.5", color: "bg-cyan-400", halo: "ring-cyan-400/30" },
          { top: "26%", left: "88%", delay: 2, size: "w-2 h-2", color: "bg-blue-400", halo: "ring-blue-400/30" },
          { top: "45%", left: "6%", delay: 4, size: "w-1.5 h-1.5", color: "bg-sky-400", halo: "ring-sky-400/30" },
          { top: "62%", left: "94%", delay: 1, size: "w-1.5 h-1.5", color: "bg-emerald-400", halo: "ring-emerald-400/30" },
          { top: "76%", left: "15%", delay: 3, size: "w-2 h-2", color: "bg-cyan-400", halo: "ring-cyan-400/30" },
          { top: "88%", left: "82%", delay: 5, size: "w-1.5 h-1.5", color: "bg-teal-400", halo: "ring-teal-400/30" },
          { top: "38%", left: "50%", delay: 2.5, size: "w-1 h-1", color: "bg-blue-400", halo: "ring-blue-400/25" },
          { top: "70%", left: "52%", delay: 4.5, size: "w-1.5 h-1.5", color: "bg-teal-400", halo: "ring-teal-400/25" },
        ].map((node, i) => (
          <motion.div
            key={i}
            className={`absolute ${node.size} rounded-full ${node.color} ring-4 ${node.halo} opacity-25 dark:opacity-40`}
            style={{ top: node.top, left: node.left }}
            animate={
              shouldReduceMotion
                ? { opacity: 0.3 }
                : {
                    opacity: [0.15, 0.65, 0.15],
                    scale: [0.85, 1.3, 0.85],
                  }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    duration: 4.5,
                    repeat: Infinity,
                    delay: node.delay,
                    ease: "easeInOut",
                  }
            }
          />
        ))}
      </div>
    </div>
  );
};
