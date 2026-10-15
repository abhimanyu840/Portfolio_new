"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "@/context/ThemeContext";

interface ThreeBackgroundProps {
  particleCount?: number;
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({
  particleCount = 550,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const themeRef = useRef(resolvedTheme);

  // Keep theme ref updated for immediate access in animation loop
  useEffect(() => {
    themeRef.current = resolvedTheme;
  }, [resolvedTheme]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect accessibility preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    // Viewport dimensions
    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Scene, Camera, and Fog
    const scene = new THREE.Scene();
    const isInitialDark = themeRef.current === "dark";
    const bgHexDark = 0x060813;
    const bgHexLight = 0xf8fafc;
    const initialBgHex = isInitialDark ? bgHexDark : bgHexLight;

    scene.fog = new THREE.FogExp2(initialBgHex, isInitialDark ? 0.0019 : 0.0022);

    const camera = new THREE.PerspectiveCamera(55, width / height, 1, 1400);
    camera.position.set(0, 35, 420);
    camera.lookAt(0, -35, 0);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(initialBgHex, 0);

    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.pointerEvents = "none";
    container.appendChild(renderer.domElement);

    // 3. Cybernetic Topological Wave Grid (Terrain Plane)
    const gridWidth = isMobile ? 800 : 1100;
    const gridHeight = isMobile ? 650 : 850;
    const segmentsX = isMobile ? 32 : 48;
    const segmentsY = isMobile ? 24 : 36;

    const terrainGeometry = new THREE.PlaneGeometry(gridWidth, gridHeight, segmentsX, segmentsY);
    terrainGeometry.rotateX(-Math.PI / 2.22);
    terrainGeometry.translate(0, -115, -120);

    const vertexCount = terrainGeometry.attributes.position.count;
    const originalPositions = new Float32Array(terrainGeometry.attributes.position.array);
    const terrainColors = new Float32Array(vertexCount * 3);

    // Palette gradients: Enterprise Infrastructure & Observability (Electric Cyan, Cobalt Blue, Teal, Emerald)
    const colorCyanDark = new THREE.Color("#06b6d4");
    const colorBlueDark = new THREE.Color("#2563eb");
    const colorTealDark = new THREE.Color("#0d9488");
    const colorEmeraldDark = new THREE.Color("#10b981");

    const colorCyanLight = new THREE.Color("#0284c7");
    const colorBlueLight = new THREE.Color("#1d4ed8");
    const colorTealLight = new THREE.Color("#0f766e");
    const colorEmeraldLight = new THREE.Color("#059669");

    const updateTerrainColors = (isDark: boolean) => {
      const cCyan = isDark ? colorCyanDark : colorCyanLight;
      const cBlue = isDark ? colorBlueDark : colorBlueLight;
      const cTeal = isDark ? colorTealDark : colorTealLight;
      const cEmerald = isDark ? colorEmeraldDark : colorEmeraldLight;

      const pos = terrainGeometry.attributes.position;
      for (let i = 0; i < vertexCount; i++) {
        // Compute depth ratio from foreground (-Z near) to horizon (+Z deep)
        const zPos = pos.getZ(i);
        const ratio = THREE.MathUtils.clamp((zPos + 400) / 700, 0, 1);

        const vertexColor = new THREE.Color();
        if (ratio < 0.35) {
          vertexColor.lerpColors(cCyan, cBlue, ratio / 0.35);
        } else if (ratio < 0.7) {
          vertexColor.lerpColors(cBlue, cTeal, (ratio - 0.35) / 0.35);
        } else {
          vertexColor.lerpColors(cTeal, cEmerald, (ratio - 0.7) / 0.3);
        }

        terrainColors[i * 3] = vertexColor.r;
        terrainColors[i * 3 + 1] = vertexColor.g;
        terrainColors[i * 3 + 2] = vertexColor.b;
      }

      terrainGeometry.setAttribute("color", new THREE.BufferAttribute(terrainColors, 3));
      terrainGeometry.attributes.color.needsUpdate = true;
    };

    updateTerrainColors(isInitialDark);

    const terrainMaterial = new THREE.MeshBasicMaterial({
      wireframe: true,
      vertexColors: true,
      transparent: true,
      opacity: isInitialDark ? 0.22 : 0.12,
      depthWrite: false,
    });

    const terrainMesh = new THREE.Mesh(terrainGeometry, terrainMaterial);
    scene.add(terrainMesh);

    // 4. Volumetric Photon Data Stream (Particles)
    const effectiveParticleCount = prefersReducedMotion
      ? 100
      : isMobile
      ? Math.floor(particleCount * 0.45)
      : particleCount;

    const particlePositions = new Float32Array(effectiveParticleCount * 3);
    const particleColors = new Float32Array(effectiveParticleCount * 3);
    const particleSizes = new Float32Array(effectiveParticleCount);
    const particleVelocities: { x: number; y: number; z: number; freq: number }[] = [];

    // Create high-res circular glow particle texture
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.25, "rgba(255, 255, 255, 0.85)");
      gradient.addColorStop(0.6, "rgba(255, 255, 255, 0.25)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const updateParticleColors = (isDark: boolean) => {
      const darkPalette = [colorCyanDark, colorBlueDark, colorTealDark, colorEmeraldDark];
      const lightPalette = [colorCyanLight, colorBlueLight, colorTealLight, colorEmeraldLight];
      const palette = isDark ? darkPalette : lightPalette;

      for (let i = 0; i < effectiveParticleCount; i++) {
        const c = palette[i % palette.length];
        particleColors[i * 3] = c.r;
        particleColors[i * 3 + 1] = c.g;
        particleColors[i * 3 + 2] = c.b;
      }
    };

    for (let i = 0; i < effectiveParticleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 950;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 500 + 40;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 750 - 50;

      particleSizes[i] = Math.random() * 4.5 + 2.5;

      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.18,
        y: (Math.random() - 0.5) * 0.15,
        z: Math.random() * 0.45 + 0.25, // Stream forward toward camera
        freq: Math.random() * 2 + 1,
      });
    }

    updateParticleColors(isInitialDark);

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));
    particleGeometry.setAttribute("size", new THREE.BufferAttribute(particleSizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
      size: 4.5,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: isInitialDark ? 0.72 : 0.5,
      blending: isInitialDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // 5. Interactive Tracking & Motion Dynamics
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    let targetScrollRatio = 0;
    let currentScrollRatio = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalized screen space [-1, 1]
      targetMouseX = (e.clientX / width) * 2 - 1;
      targetMouseY = -(e.clientY / height) * 2 + 1;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const docHeight = Math.max(1, document.body.scrollHeight - window.innerHeight);
      targetScrollRatio = Math.min(Math.max(scrollY / docHeight, 0), 1);
    };

    if (!prefersReducedMotion) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll(); // Initial measure
    }

    // 6. Window Resize Handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // 7. Visibility Change: Pause when tab hidden to preserve battery
    let isTabVisible = !document.hidden;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 8. Animation & Render Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();
    let prevThemeState = isInitialDark;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isTabVisible) return;

      const isCurrentDark = themeRef.current === "dark";

      // Reactive theme update on user switch
      if (isCurrentDark !== prevThemeState) {
        prevThemeState = isCurrentDark;
        const bgHex = isCurrentDark ? bgHexDark : bgHexLight;

        if (scene.fog) {
          (scene.fog as THREE.FogExp2).color.setHex(bgHex);
          (scene.fog as THREE.FogExp2).density = isCurrentDark ? 0.0019 : 0.0022;
        }

        renderer.setClearColor(bgHex, 0);

        terrainMaterial.opacity = isCurrentDark ? 0.22 : 0.12;
        particleMaterial.opacity = isCurrentDark ? 0.72 : 0.5;
        particleMaterial.blending = isCurrentDark ? THREE.AdditiveBlending : THREE.NormalBlending;
        particleMaterial.needsUpdate = true;

        updateTerrainColors(isCurrentDark);
        updateParticleColors(isCurrentDark);
        (particleGeometry.attributes.color as THREE.BufferAttribute).needsUpdate = true;
      }

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Damped mouse tracking
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;

        // Damped scroll tracking
        currentScrollRatio += (targetScrollRatio - currentScrollRatio) * 0.06;

        // 3D Camera Dynamic Trajectory (linked to scroll & subtle mouse tilt)
        // Camera shifts elevation and tilt smoothly across portfolio sections
        const scrollOffsetY = currentScrollRatio * -55;
        const scrollOffsetZ = Math.sin(currentScrollRatio * Math.PI) * -35;
        const scrollPitch = currentScrollRatio * 0.12;

        camera.position.x = currentMouseX * 40;
        camera.position.y = 35 + scrollOffsetY + currentMouseY * 22;
        camera.position.z = 420 + scrollOffsetZ;
        camera.rotation.x = -0.08 - scrollPitch + currentMouseY * 0.04;
        camera.rotation.y = -currentMouseX * 0.05;

        // Multi-frequency Harmonic Telemetry Waves on Terrain Grid
        const posAttr = terrainGeometry.attributes.position as THREE.BufferAttribute;
        const posArray = posAttr.array as Float32Array;
        const waveTime = elapsed * 0.75;

        // Interactive cursor wave projection on terrain coordinates
        const cursorWorldX = currentMouseX * 380;
        const cursorWorldY = -currentMouseY * 260;

        for (let i = 0; i < vertexCount; i++) {
          const idx = i * 3;
          const origX = originalPositions[idx];
          const origY = originalPositions[idx + 1];

          // Harmonic telemetry oscillations
          const wave1 = Math.sin(origX * 0.013 + waveTime) * 14;
          const wave2 = Math.cos(origY * 0.016 + waveTime * 1.1) * 11;
          const wave3 = Math.sin((origX + origY) * 0.009 + waveTime * 0.6) * 7;

          // Localized cursor ripple dispersion
          const dx = origX - cursorWorldX;
          const dy = origY - cursorWorldY;
          const distSq = dx * dx + dy * dy;
          let ripple = 0;

          if (distSq < 48400) {
            // ~220px radius
            const dist = Math.sqrt(distSq);
            ripple = (1 - dist / 220) * Math.sin(dist * 0.07 - waveTime * 4.5) * 16;
          }

          posArray[idx + 2] = originalPositions[idx + 2] + wave1 + wave2 + wave3 + ripple;
        }

        posAttr.needsUpdate = true;

        // Animate Volumetric Photon Stream Particles
        const partPosAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
        const partPosArr = partPosAttr.array as Float32Array;

        for (let i = 0; i < effectiveParticleCount; i++) {
          const idx = i * 3;
          const vel = particleVelocities[i];

          // Subtle harmonic float
          partPosArr[idx] += vel.x + Math.sin(elapsed * vel.freq + i) * 0.08;
          partPosArr[idx + 1] += vel.y + Math.cos(elapsed * vel.freq + i) * 0.06;
          partPosArr[idx + 2] += vel.z;

          // Stream cycle: wrap particles when they travel past camera or bounds
          if (partPosArr[idx + 2] > 480) {
            partPosArr[idx + 2] = -380;
            partPosArr[idx] = (Math.random() - 0.5) * 950;
            partPosArr[idx + 1] = (Math.random() - 0.5) * 500 + 40;
          }
        }

        partPosAttr.needsUpdate = true;

        // Subtle scene ambient yaw
        terrainMesh.rotation.z = Math.sin(elapsed * 0.12) * 0.015;
      }

      renderer.render(scene, camera);
    };

    // Kick off animation
    animate();

    // Clean cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      terrainGeometry.dispose();
      terrainMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
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
