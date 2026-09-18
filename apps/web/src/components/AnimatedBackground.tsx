"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion, useMotionValue, useSpring } from "framer-motion";
import { ThreeBackground } from "@/components/ThreeBackground";

export const AnimatedBackground: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  // Smooth interactive cursor tracker for subtle desktop parallax illumination
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);
  const springX = useSpring(mouseX, { stiffness: 65, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 65, damping: 22 });

  useEffect(() => {
    setMounted(true);

    if (shouldReduceMotion || typeof window === "undefined") return;

    // Track mouse on desktop viewports
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 160);
      mouseY.set(e.clientY - 160);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shouldReduceMotion, mouseX, mouseY]);

  // Pre-hydration SSR fallback: static background structure
  if (!mounted) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 obsidian-grid opacity-60 dark:opacity-40" />
        <div className="absolute inset-0 obsidian-radial opacity-70 dark:opacity-80" />
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Base Tech Matrix: Grid & Radial Mesh */}
      <div className="absolute inset-0 obsidian-grid opacity-60 dark:opacity-40" />
      <div className="absolute inset-0 obsidian-radial opacity-70 dark:opacity-80" />
      <div className="absolute inset-0 obsidian-ambient opacity-50 dark:opacity-60" />

      {/* 1.5. Three.js Interactive 3D Particle Constellation & Parallax Depth */}
      <ThreeBackground particleCount={130} />

      {/* 2. Interactive Desktop Cursor Spotlight */}
      {!shouldReduceMotion && (
        <motion.div
          style={{ x: springX, y: springY }}
          className="hidden md:block absolute w-[320px] h-[320px] rounded-full bg-gradient-to-r from-cyan-400/10 via-sky-500/10 to-indigo-500/10 dark:from-cyan-400/15 dark:via-indigo-500/15 dark:to-purple-500/12 blur-[50px] transform-gpu will-change-transform pointer-events-none"
        />
      )}

      {/* 3. Luminous Floating Gradient Orbs (GPU-Optimized Blur Radii) */}
      {/* Orb 1: Vibrant Electric Cyan / Sky Glow (Top-Left) */}
      <motion.div
        className="absolute -top-[12%] -left-[8%] w-[480px] sm:w-[650px] h-[480px] sm:h-[650px] rounded-full bg-gradient-to-br from-cyan-400/25 via-sky-500/20 to-blue-600/15 dark:from-cyan-500/30 dark:via-sky-600/22 dark:to-blue-700/15 blur-[45px] md:blur-[65px] transform-gpu will-change-transform"
        animate={
          shouldReduceMotion
            ? { x: 0, y: 0, scale: 1 }
            : {
                x: [0, 55, -35, 25, 0],
                y: [0, -45, 35, -25, 0],
                scale: [1, 1.1, 0.94, 1.06, 1],
              }
        }
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      />

      {/* Orb 2: Royal Indigo / Deep Blue Atmosphere (Top-Right) */}
      <motion.div
        className="absolute top-[18%] -right-[10%] w-[450px] sm:w-[620px] h-[450px] sm:h-[620px] rounded-full bg-gradient-to-bl from-indigo-500/22 via-blue-600/18 to-purple-600/12 dark:from-indigo-600/28 dark:via-blue-700/22 dark:to-purple-700/15 blur-[45px] md:blur-[65px] transform-gpu will-change-transform"
        animate={
          shouldReduceMotion
            ? { x: 0, y: 0, scale: 1 }
            : {
                x: [0, -60, 35, -25, 0],
                y: [0, 50, -35, 40, 0],
                scale: [1, 0.92, 1.12, 0.96, 1],
              }
        }
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                duration: 24,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      />

      {/* Orb 3: Tech Purple / Violet Nebula (Lower-Left / Center) */}
      <motion.div
        className="absolute top-[52%] -left-[10%] w-[420px] sm:w-[580px] h-[420px] sm:h-[580px] rounded-full bg-gradient-to-tr from-purple-500/20 via-indigo-500/15 to-cyan-500/12 dark:from-purple-600/25 dark:via-indigo-600/20 dark:to-cyan-600/15 blur-[40px] md:blur-[60px] transform-gpu will-change-transform"
        animate={
          shouldReduceMotion
            ? { x: 0, y: 0, scale: 1 }
            : {
                x: [0, 45, -25, 35, 0],
                y: [0, -35, 45, -15, 0],
                scale: [0.96, 1.08, 0.92, 1.04, 0.96],
              }
        }
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                duration: 22,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      />

      {/* Orb 4: Electric Cyan / Sapphire Floor Bloom (Bottom-Right) */}
      <motion.div
        className="absolute -bottom-[8%] right-[2%] w-[380px] sm:w-[540px] h-[380px] sm:h-[540px] rounded-full bg-gradient-to-tl from-cyan-400/20 via-blue-500/15 to-indigo-600/12 dark:from-cyan-500/25 dark:via-blue-600/18 dark:to-indigo-600/15 blur-[40px] md:blur-[55px] transform-gpu will-change-transform"
        animate={
          shouldReduceMotion
            ? { x: 0, y: 0, scale: 1 }
            : {
                x: [0, -35, 30, -15, 0],
                y: [0, -25, -45, 20, 0],
                scale: [1, 1.06, 0.95, 1.02, 1],
              }
        }
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                duration: 26,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      />

      {/* 4. Subtle Cyber Scanline Sweep Beam (GPU-Composited Transform) */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute left-0 right-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/40 dark:via-cyan-300/45 to-transparent transform-gpu will-change-transform pointer-events-none"
          initial={{ y: "-10px" }}
          animate={{ y: "105vh" }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}

      {/* 5. Ambient Telemetry Beacons & Network Nodes */}
      <div className="absolute inset-0">
        {[
          { top: "12%", left: "15%", delay: 0, size: "w-1.5 h-1.5", color: "bg-cyan-400", halo: "ring-cyan-400/30" },
          { top: "24%", left: "85%", delay: 2, size: "w-2 h-2", color: "bg-indigo-400", halo: "ring-indigo-400/30" },
          { top: "42%", left: "7%", delay: 4, size: "w-1.5 h-1.5", color: "bg-sky-400", halo: "ring-sky-400/30" },
          { top: "58%", left: "92%", delay: 1, size: "w-1.5 h-1.5", color: "bg-purple-400", halo: "ring-purple-400/30" },
          { top: "74%", left: "18%", delay: 3, size: "w-2 h-2", color: "bg-cyan-400", halo: "ring-cyan-400/30" },
          { top: "86%", left: "78%", delay: 5, size: "w-1.5 h-1.5", color: "bg-indigo-400", halo: "ring-indigo-400/30" },
          { top: "35%", left: "48%", delay: 2.5, size: "w-1 h-1", color: "bg-blue-400", halo: "ring-blue-400/25" },
          { top: "68%", left: "55%", delay: 4.5, size: "w-1.5 h-1.5", color: "bg-teal-400", halo: "ring-teal-400/25" },
        ].map((node, i) => (
          <motion.div
            key={i}
            className={`absolute ${node.size} rounded-full ${node.color} ring-4 ${node.halo} opacity-30 dark:opacity-50`}
            style={{ top: node.top, left: node.left }}
            animate={
              shouldReduceMotion
                ? { opacity: 0.35 }
                : {
                    opacity: [0.2, 0.75, 0.2],
                    scale: [0.85, 1.35, 0.85],
                  }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    duration: 4.2,
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
