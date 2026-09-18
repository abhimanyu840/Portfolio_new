"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "@/context/ThemeContext";

interface ThreeBackgroundProps {
  particleCount?: number;
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({
  particleCount = 140,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const themeRef = useRef(resolvedTheme);

  useEffect(() => {
    themeRef.current = resolvedTheme;
  }, [resolvedTheme]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Dimensions
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.pointerEvents = "none";
    container.appendChild(renderer.domElement);

    // Particle Setup
    const count = prefersReducedMotion ? 60 : particleCount;
    const positions = new Float32Array(count * 3);
    const velocities: { x: number; y: number; z: number }[] = [];
    const colors = new Float32Array(count * 3);

    // Palette: Cyan, Blue, Indigo, Purple
    const paletteDark = [
      new THREE.Color("#06b6d4"), // Cyan
      new THREE.Color("#3b82f6"), // Blue
      new THREE.Color("#6366f1"), // Indigo
      new THREE.Color("#a855f7"), // Purple
    ];
    const paletteLight = [
      new THREE.Color("#0284c7"), // Deep Cyan
      new THREE.Color("#2563eb"), // Royal Blue
      new THREE.Color("#4f46e5"), // Indigo
      new THREE.Color("#7c3aed"), // Purple
    ];

    const currentPalette = themeRef.current === "dark" ? paletteDark : paletteLight;

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 800;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 600;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 400;

      velocities.push({
        x: (Math.random() - 0.5) * 0.35,
        y: (Math.random() - 0.5) * 0.35,
        z: (Math.random() - 0.5) * 0.2,
      });

      const col = currentPalette[i % currentPalette.length];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Circle texture for soft round particles
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(0.3, "rgba(255,255,255,0.85)");
      gradient.addColorStop(0.8, "rgba(255,255,255,0.15)");
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 5,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: themeRef.current === "dark" ? 0.75 : 0.6,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Line Connections Setup (Max connections buffer)
    const maxConnections = count * 5;
    const linePositions = new Float32Array(maxConnections * 2 * 3);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: themeRef.current === "dark" ? 0x38bdf8 : 0x64748b,
      transparent: true,
      opacity: themeRef.current === "dark" ? 0.12 : 0.08,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    const lineSystem = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSystem);

    // Mouse Tracking for subtle camera tilt parallax
    let targetX = 0;
    let targetY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      targetX = ((e.clientX - width / 2) / (width / 2)) * 30;
      targetY = (-(e.clientY - height / 2) / (height / 2)) * 30;
    };

    if (!prefersReducedMotion) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    // Window Resize Handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Animation Loop
    let animationFrameId: number;
    const connectionDist = 110;
    const maxDistSq = connectionDist * connectionDist;

    const animate = () => {
      // Smooth Camera Damping
      if (!prefersReducedMotion) {
        camera.position.x += (targetX - camera.position.x) * 0.04;
        camera.position.y += (targetY - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);

        // Update Particle Positions
        const posAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
        const posArr = posAttr.array as Float32Array;

        for (let i = 0; i < count; i++) {
          const idx = i * 3;
          posArr[idx] += velocities[i].x;
          posArr[idx + 1] += velocities[i].y;
          posArr[idx + 2] += velocities[i].z;

          // Boundary bounce with damping
          if (posArr[idx] < -400 || posArr[idx] > 400) velocities[i].x *= -1;
          if (posArr[idx + 1] < -300 || posArr[idx + 1] > 300) velocities[i].y *= -1;
          if (posArr[idx + 2] < -200 || posArr[idx + 2] > 200) velocities[i].z *= -1;
        }
        posAttr.needsUpdate = true;

        // Update Dynamic Proximity Lines
        let lineIdx = 0;
        for (let i = 0; i < count; i++) {
          const ix = posArr[i * 3];
          const iy = posArr[i * 3 + 1];
          const iz = posArr[i * 3 + 2];

          for (let j = i + 1; j < count; j++) {
            const jx = posArr[j * 3];
            const jy = posArr[j * 3 + 1];
            const jz = posArr[j * 3 + 2];

            const dx = ix - jx;
            const dy = iy - jy;
            const dz = iz - jz;
            const distSq = dx * dx + dy * dy + dz * dz;

            if (distSq < maxDistSq && lineIdx < maxConnections * 6) {
              linePositions[lineIdx++] = ix;
              linePositions[lineIdx++] = iy;
              linePositions[lineIdx++] = iz;

              linePositions[lineIdx++] = jx;
              linePositions[lineIdx++] = jy;
              linePositions[lineIdx++] = jz;
            }
          }
        }

        const linePosAttr = lineGeometry.attributes.position as THREE.BufferAttribute;
        linePosAttr.needsUpdate = true;
        lineGeometry.setDrawRange(0, lineIdx / 3);

        // Gentle overall scene rotation
        particleSystem.rotation.y += 0.0004;
        lineSystem.rotation.y += 0.0004;
      }

      // Theme sync check
      const isDark = themeRef.current === "dark";
      lineMaterial.color.setHex(isDark ? 0x38bdf8 : 0x64748b);
      lineMaterial.opacity = isDark ? 0.12 : 0.08;
      particleMaterial.opacity = isDark ? 0.75 : 0.6;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Clean unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, [particleCount]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    />
  );
};
