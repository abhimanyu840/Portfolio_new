"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "@/context/ThemeContext";

interface ThreeBackgroundProps {
  particleCount?: number;
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({
  particleCount = 450,
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

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const isMobile = width < 768;

    // 1. Scene & Camera Setup with Depth Fog
    const scene = new THREE.Scene();
    const isInitialDark = themeRef.current === "dark";
    const bgHexDark = 0x060a0a; // Deep Obsidian-Charcoal cosmos
    const bgHexLight = 0xf8fafc; // Clean slate-white canvas
    const initialBgHex = isInitialDark ? bgHexDark : bgHexLight;

    scene.fog = new THREE.FogExp2(initialBgHex, isInitialDark ? 0.0011 : 0.0016);

    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 3200);
    camera.position.set(0, 0, 420);
    camera.lookAt(0, 0, 0);

    // Dynamic Frustum Calculation Helper
    const vFovRad = (camera.fov * Math.PI) / 180;
    const getFrustumAt = (z: number, currentAspect: number) => {
      const dist = Math.abs(camera.position.z - z);
      const h = 2 * Math.tan(vFovRad / 2) * dist;
      const w = h * currentAspect;
      return { w, h, halfW: w / 2, halfH: h / 2 };
    };

    // 2. High-Performance WebGL Renderer
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

    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Celestial Main Light Direction (From upper-left)
    const celestialLightDir = new THREE.Vector3(-0.7, 0.7, 0.45).normalize();

    // =========================================================================
    // 3. RIGHT CELESTIAL PLANET WITH RADIANT EMERALD/MINT ATMOSPHERIC RIM
    // =========================================================================
    let fAtPlanet = getFrustumAt(-80, camera.aspect);
    const planetRadius = isMobile ? 185 : 260;
    const planetGroup = new THREE.Group();
    
    const updatePlanetPosition = () => {
      fAtPlanet = getFrustumAt(-80, camera.aspect);
      if (window.innerWidth < 768) {
        planetGroup.position.set(fAtPlanet.halfW * 0.78, -fAtPlanet.halfH * 0.58, -80);
      } else {
        // Desktop: curve sweeps from bottom-right (X ~ +100) up across mid-right (X ~ +180) to top-right
        planetGroup.position.set(fAtPlanet.halfW * 0.86, -fAtPlanet.halfH * 0.62, -80);
      }
    };
    updatePlanetPosition();
    worldGroup.add(planetGroup);

    const planetVertexShader = `
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      varying vec2 vUv;

      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const planetFragmentShader = `
      uniform vec3 uColorBody;
      uniform vec3 uColorRim;
      uniform vec3 uColorAtmosphere;
      uniform vec3 uLightDir;
      uniform float uIsDark;

      varying vec3 vNormal;
      varying vec3 vViewPosition;
      varying vec2 vUv;

      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);
        vec3 lightDir = normalize(uLightDir);

        // 1. Celestial Diffuse Shading
        float NdotL = dot(normal, lightDir);
        float diffuse = smoothstep(-0.25, 0.65, NdotL);

        // 2. Multi-tier Atmospheric Fresnel Rim
        float VdotN = max(dot(viewDir, normal), 0.0);
        float fresnel = 1.0 - VdotN;
        
        float sharpRim = pow(fresnel, 3.8);
        float softHaze = pow(fresnel, 2.2);

        float rimBias = smoothstep(-0.3, 0.75, dot(normal, vec3(-lightDir.x, lightDir.y, lightDir.z * 0.6)));

        // 3. Realistic Surface Banding
        float band1 = sin(vUv.y * 55.0 + sin(vUv.x * 25.0) * 0.4) * 0.035;
        float band2 = cos(vUv.y * 85.0) * 0.02;
        vec3 surfaceColor = uColorBody + vec3(band1 + band2) * (uIsDark > 0.5 ? 0.6 : 0.25);

        vec3 darkSide = surfaceColor * (uIsDark > 0.5 ? 0.12 : 0.35);
        vec3 litSide = surfaceColor;

        vec3 color = mix(darkSide, litSide, diffuse);

        color += uColorRim * sharpRim * (0.5 + 2.2 * rimBias);
        color += uColorAtmosphere * softHaze * (0.3 + 1.2 * rimBias);

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const planetUniforms = {
      uColorBody: { value: new THREE.Color(isInitialDark ? "#081619" : "#cbd5e1") },
      uColorRim: { value: new THREE.Color(isInitialDark ? "#34d399" : "#0d9488") },
      uColorAtmosphere: { value: new THREE.Color(isInitialDark ? "#00f5a0" : "#14b8a6") },
      uLightDir: { value: celestialLightDir },
      uIsDark: { value: isInitialDark ? 1.0 : 0.0 },
    };

    const planetGeo = new THREE.SphereGeometry(planetRadius, 64, 64);
    const planetMat = new THREE.ShaderMaterial({
      vertexShader: planetVertexShader,
      fragmentShader: planetFragmentShader,
      uniforms: planetUniforms,
    });

    const planetMesh = new THREE.Mesh(planetGeo, planetMat);
    planetGroup.add(planetMesh);

    // Outer Atmospheric Soft Halo Shell
    const haloVertexShader = `
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const haloFragmentShader = `
      uniform vec3 uColorHalo;
      uniform float uOpacity;
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);

        float intensity = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.2);
        if (intensity < 0.005) discard;

        gl_FragColor = vec4(uColorHalo, intensity * uOpacity * 1.5);
      }
    `;

    const haloUniforms = {
      uColorHalo: { value: new THREE.Color(isInitialDark ? "#10b981" : "#0d9488") },
      uOpacity: { value: isInitialDark ? 0.75 : 0.4 },
    };

    const haloGeo = new THREE.SphereGeometry(planetRadius * 1.042, 64, 64);
    const haloMat = new THREE.ShaderMaterial({
      vertexShader: haloVertexShader,
      fragmentShader: haloFragmentShader,
      uniforms: haloUniforms,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });

    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    planetGroup.add(haloMesh);

    // =========================================================================
    // 4. ORBITAL TRAJECTORIES & 3 VISIBLE 3D CELESTIAL MOONS
    // =========================================================================
    const moonVertexShader = `
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const moonFragmentShader = `
      uniform vec3 uColorLit;
      uniform vec3 uColorDark;
      uniform vec3 uColorRim;
      uniform vec3 uLightDir;
      uniform float uIsDark;

      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);
        vec3 lightDir = normalize(uLightDir);

        // Directional Diffuse
        float NdotL = dot(normal, lightDir);
        float diffuse = smoothstep(-0.2, 0.7, NdotL);

        // Fresnel Edge Rim
        float VdotN = max(dot(viewDir, normal), 0.0);
        float fresnel = pow(1.0 - VdotN, 2.5);

        vec3 base = mix(uColorDark, uColorLit, diffuse);
        vec3 color = base + uColorRim * fresnel * 1.8;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    interface CelestialMoonConfig {
      id: string;
      radius: number;
      orbitCenterX: number;
      orbitCenterY: number;
      orbitCenterZ: number;
      radiusX: number;
      radiusY: number;
      tiltZ: number;
      speed: number;
      initialAngle: number;
      colorLit: string;
      colorDark: string;
      colorRim: string;
    }

    // 3 Distinct Moons positioned exactly matching media_1792701625750_5a6e9eef.png:
    // Moon 1: Upper Right Sky (~2 o'clock, X ~ +165, Y ~ +85)
    // Moon 2: Far Right Horizon (X ~ +265, Y ~ +25)
    // Moon 3: Foreground Lower-Right (X ~ +135, Y ~ -55)
    const moonConfigs: CelestialMoonConfig[] = [
      {
        id: "moon-upper-right",
        radius: 17, // Noticeable 3D sphere
        orbitCenterX: 130,
        orbitCenterY: 10,
        orbitCenterZ: 10,
        radiusX: 185,
        radiusY: 90,
        tiltZ: -0.25,
        speed: 0.12,
        initialAngle: 1.05, // Places it at ~ (165, 85)
        colorLit: isInitialDark ? "#64748b" : "#475569",
        colorDark: isInitialDark ? "#1e293b" : "#94a3b8",
        colorRim: "#34d399",
      },
      {
        id: "moon-right-edge",
        radius: 13,
        orbitCenterX: 180,
        orbitCenterY: -20,
        orbitCenterZ: -30,
        radiusX: 160,
        radiusY: 75,
        tiltZ: 0.15,
        speed: 0.08,
        initialAngle: 0.35, // Places it near right edge
        colorLit: isInitialDark ? "#475569" : "#334155",
        colorDark: isInitialDark ? "#0f172a" : "#64748b",
        colorRim: "#10b981",
      },
      {
        id: "moon-foreground",
        radius: 18,
        orbitCenterX: 80,
        orbitCenterY: -70,
        orbitCenterZ: 40,
        radiusX: 150,
        radiusY: 70,
        tiltZ: -0.12,
        speed: 0.09,
        initialAngle: 3.85, // Places it in the lower-right foreground
        colorLit: isInitialDark ? "#64748b" : "#475569",
        colorDark: isInitialDark ? "#1e293b" : "#94a3b8",
        colorRim: "#34d399",
      },
    ];

    interface MoonInstance {
      mesh: THREE.Mesh;
      config: CelestialMoonConfig;
      angle: number;
      orbitLine: THREE.LineLoop;
    }

    const moonInstances: MoonInstance[] = [];

    moonConfigs.forEach((cfg) => {
      // 1. Orbital Ring Path
      const segments = 140;
      const points: THREE.Vector3[] = [];
      const cosT = Math.cos(cfg.tiltZ);
      const sinT = Math.sin(cfg.tiltZ);

      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const lx = Math.cos(theta) * cfg.radiusX;
        const ly = Math.sin(theta) * cfg.radiusY;
        const rx = lx * cosT - ly * sinT + cfg.orbitCenterX;
        const ry = lx * sinT + ly * cosT + cfg.orbitCenterY;
        points.push(new THREE.Vector3(rx, ry, cfg.orbitCenterZ));
      }

      const ringGeo = new THREE.BufferGeometry().setFromPoints(points);
      const ringMat = new THREE.LineBasicMaterial({
        color: 0x34d399,
        transparent: true,
        opacity: isInitialDark ? 0.38 : 0.22,
        blending: THREE.AdditiveBlending,
      });

      const ringLine = new THREE.LineLoop(ringGeo, ringMat);
      worldGroup.add(ringLine);

      // 2. 3D Spherical Moon Body
      const moonGeo = new THREE.SphereGeometry(cfg.radius, 32, 32);
      const moonMat = new THREE.ShaderMaterial({
        vertexShader: moonVertexShader,
        fragmentShader: moonFragmentShader,
        uniforms: {
          uColorLit: { value: new THREE.Color(cfg.colorLit) },
          uColorDark: { value: new THREE.Color(cfg.colorDark) },
          uColorRim: { value: new THREE.Color(cfg.colorRim) },
          uLightDir: { value: celestialLightDir },
          uIsDark: { value: isInitialDark ? 1.0 : 0.0 },
        },
      });

      const moonMesh = new THREE.Mesh(moonGeo, moonMat);
      
      // Calculate initial position
      const lx = Math.cos(cfg.initialAngle) * cfg.radiusX;
      const ly = Math.sin(cfg.initialAngle) * cfg.radiusY;
      moonMesh.position.set(
        lx * cosT - ly * sinT + cfg.orbitCenterX,
        lx * sinT + ly * cosT + cfg.orbitCenterY,
        cfg.orbitCenterZ
      );

      worldGroup.add(moonMesh);

      moonInstances.push({
        mesh: moonMesh,
        config: cfg,
        angle: cfg.initialAngle,
        orbitLine: ringLine,
      });
    });

    // =========================================================================
    // 5. LEFT QUADRANT: ARCHITECTURAL FUTURISTIC MONOLITHS & PERSPECTIVE GROUND
    // =========================================================================
    const monolithGroup = new THREE.Group();
    worldGroup.add(monolithGroup);

    let fAtMonolith = getFrustumAt(0, camera.aspect);
    const updateMonolithPosition = () => {
      fAtMonolith = getFrustumAt(0, camera.aspect);
      // Position strictly in the left margin so it never collides with hero headline text
      if (window.innerWidth < 768) {
        monolithGroup.position.set(-fAtMonolith.halfW * 0.88, -fAtMonolith.halfH * 0.52, -20);
      } else {
        monolithGroup.position.set(-fAtMonolith.halfW * 0.86, -fAtMonolith.halfH * 0.48, 0);
      }
    };
    updateMonolithPosition();

    // 5a. Perspective Ground Floor Grid Plane
    const groundGeo = new THREE.PlaneGeometry(320, 280, 20, 20);
    const groundMat = new THREE.MeshStandardMaterial({
      color: isInitialDark ? 0x050d0e : 0xe2e8f0,
      roughness: 0.35,
      metalness: 0.85,
      wireframe: true,
      transparent: true,
      opacity: isInitialDark ? 0.22 : 0.12,
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI * 0.46;
    groundMesh.position.set(-10, -75, -50);
    monolithGroup.add(groundMesh);

    // 5b. Cluster of Architectural Monolithic Towers
    interface MonolithSpec {
      x: number;
      y: number;
      z: number;
      w: number;
      h: number;
      d: number;
      rotZ?: number;
    }

    const monolithSpecs: MonolithSpec[] = [
      { x: -110, y: -70, z: -130, w: 48, h: 240, d: 48, rotZ: -0.02 }, // Tallest background tower
      { x: -70, y: -70, z: -80, w: 42, h: 190, d: 42, rotZ: 0.01 },   // Mid-back tower
      { x: -30, y: -70, z: -30, w: 46, h: 150, d: 46, rotZ: -0.01 },  // Center tower
      { x: 10, y: -70, z: 20, w: 40, h: 110, d: 40, rotZ: 0.02 },    // Mid-front pillar
      { x: -50, y: -70, z: 50, w: 36, h: 80, d: 36, rotZ: -0.02 },   // Front-left block
      { x: -5, y: -70, z: 85, w: 44, h: 55, d: 44, rotZ: 0.01 },    // Foreground low slab
    ];

    const monolithMeshes: { mesh: THREE.Mesh; edges: THREE.LineSegments }[] = [];

    monolithSpecs.forEach((spec) => {
      const geo = new THREE.BoxGeometry(spec.w, spec.h, spec.d);
      
      const mat = new THREE.MeshStandardMaterial({
        color: isInitialDark ? 0x060f11 : 0xe2e8f0,
        roughness: 0.35,
        metalness: 0.88,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(spec.x, spec.y + spec.h / 2, spec.z);
      if (spec.rotZ) mesh.rotation.z = spec.rotZ;
      monolithGroup.add(mesh);

      // Glowing mint/emerald illuminated edge lines
      const edgeGeo = new THREE.EdgesGeometry(geo);
      const edgeMat = new THREE.LineBasicMaterial({
        color: isInitialDark ? 0x34d399 : 0x0d9488,
        transparent: true,
        opacity: isInitialDark ? 0.82 : 0.45,
      });

      const edgeLine = new THREE.LineSegments(edgeGeo, edgeMat);
      edgeLine.position.copy(mesh.position);
      edgeLine.rotation.copy(mesh.rotation);
      monolithGroup.add(edgeLine);

      monolithMeshes.push({ mesh, edges: edgeLine });
    });

    // 5c. Left Horizon Atmospheric Light Beam
    const beamGeo = new THREE.PlaneGeometry(180, 420);
    const beamMat = new THREE.MeshBasicMaterial({
      color: isInitialDark ? 0x10b981 : 0x0d9488,
      transparent: true,
      opacity: isInitialDark ? 0.09 : 0.04,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const beamMesh = new THREE.Mesh(beamGeo, beamMat);
    beamMesh.position.set(-75, 45, -150);
    beamMesh.rotation.y = Math.PI * 0.12;
    monolithGroup.add(beamMesh);

    // Directional Monolith Lighting
    const dirLight = new THREE.DirectionalLight(isInitialDark ? 0x34d399 : 0x0d9488, isInitialDark ? 1.5 : 0.9);
    dirLight.position.set(150, 250, 150);
    scene.add(dirLight);

    const ambientLight = new THREE.AmbientLight(isInitialDark ? 0x081518 : 0xf1f5f9, isInitialDark ? 1.6 : 2.0);
    scene.add(ambientLight);

    // =========================================================================
    // 6. COSMIC STAR DUST / GLOW PARTICLES
    // =========================================================================
    const createStarDiscTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.28, "rgba(52, 211, 153, 0.85)");
      grad.addColorStop(0.68, "rgba(16, 185, 129, 0.25)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const starTexture = createStarDiscTexture();
    const starCount = isMobile ? 180 : particleCount;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 1400;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 900;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 700 - 50;
    }

    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));

    const starMat = new THREE.PointsMaterial({
      size: 4.8,
      map: starTexture || undefined,
      transparent: true,
      opacity: isInitialDark ? 0.78 : 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starPoints = new THREE.Points(starGeo, starMat);
    worldGroup.add(starPoints);

    // =========================================================================
    // 7. SMOOTH CURSOR PARALLAX & ANIMATION LOOP
    // =========================================================================
    let targetParallaxX = 0;
    let targetParallaxY = 0;
    let currentParallaxX = 0;
    let currentParallaxY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const normX = (e.clientX / width - 0.5) * 2;
      const normY = -(e.clientY / height - 0.5) * 2;
      targetParallaxX = normX * 14;
      targetParallaxY = normY * 10;
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handlePointerMove, { passive: true });
    }

    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.1);

      // Theme Synchronization
      const isDark = themeRef.current === "dark";
      const targetBgHex = isDark ? bgHexDark : bgHexLight;

      if ((scene.fog as THREE.FogExp2).color.getHex() !== targetBgHex) {
        (scene.fog as THREE.FogExp2).color.setHex(targetBgHex);
        planetUniforms.uColorBody.value.set(isDark ? "#081619" : "#cbd5e1");
        planetUniforms.uColorRim.value.set(isDark ? "#34d399" : "#0d9488");
        planetUniforms.uColorAtmosphere.value.set(isDark ? "#00f5a0" : "#14b8a6");
        planetUniforms.uIsDark.value = isDark ? 1.0 : 0.0;
        haloUniforms.uColorHalo.value.set(isDark ? "#10b981" : "#0d9488");
        haloUniforms.uOpacity.value = isDark ? 0.75 : 0.4;
        starMat.opacity = isDark ? 0.78 : 0.45;
        groundMat.color.setHex(isDark ? 0x050d0e : 0xe2e8f0);
        groundMat.opacity = isDark ? 0.22 : 0.12;
        beamMat.color.setHex(isDark ? 0x10b981 : 0x0d9488);
        beamMat.opacity = isDark ? 0.09 : 0.04;
        monolithMeshes.forEach(({ mesh, edges }) => {
          (mesh.material as THREE.MeshStandardMaterial).color.setHex(isDark ? 0x060f11 : 0xe2e8f0);
          (edges.material as THREE.LineBasicMaterial).color.setHex(isDark ? 0x34d399 : 0x0d9488);
          (edges.material as THREE.LineBasicMaterial).opacity = isDark ? 0.82 : 0.45;
        });
        moonInstances.forEach((inst) => {
          const mat = inst.mesh.material as THREE.ShaderMaterial;
          mat.uniforms.uColorLit.value.set(isDark ? inst.config.colorLit : "#475569");
          mat.uniforms.uColorDark.value.set(isDark ? inst.config.colorDark : "#94a3b8");
          mat.uniforms.uIsDark.value = isDark ? 1.0 : 0.0;
        });
      }

      // Parallax Damping
      if (!prefersReducedMotion) {
        currentParallaxX += (targetParallaxX - currentParallaxX) * 0.05;
        currentParallaxY += (targetParallaxY - currentParallaxY) * 0.05;
        worldGroup.position.x = currentParallaxX;
        worldGroup.position.y = currentParallaxY;
      }

      // Planet Axial Rotation
      if (!prefersReducedMotion) {
        planetMesh.rotation.y += 0.0008;
      }

      // 3D Moons Orbital Revolution along Trajectories
      if (!prefersReducedMotion) {
        moonInstances.forEach((inst) => {
          inst.angle += inst.config.speed * delta;
          const cosT = Math.cos(inst.config.tiltZ);
          const sinT = Math.sin(inst.config.tiltZ);
          const lx = Math.cos(inst.angle) * inst.config.radiusX;
          const ly = Math.sin(inst.angle) * inst.config.radiusY;
          inst.mesh.position.set(
            lx * cosT - ly * sinT + inst.config.orbitCenterX,
            lx * sinT + ly * cosT + inst.config.orbitCenterY,
            inst.config.orbitCenterZ
          );
        });
      }

      // Starfield Cosmic Upward Drift
      const posAttr = starGeo.attributes.position as THREE.BufferAttribute;
      const starArr = posAttr.array as Float32Array;
      for (let i = 0; i < starCount; i++) {
        starArr[i * 3 + 1] += delta * 1.6;
        if (starArr[i * 3 + 1] > 450) {
          starArr[i * 3 + 1] = -450;
        }
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Viewport Resize Handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      updatePlanetPosition();
      updateMonolithPosition();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (!isMobile) {
        window.removeEventListener("mousemove", handlePointerMove);
      }
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      // Clean disposal
      planetGeo.dispose();
      planetMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      groundGeo.dispose();
      groundMat.dispose();
      beamGeo.dispose();
      beamMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      if (starTexture) starTexture.dispose();

      moonInstances.forEach((inst) => {
        inst.mesh.geometry.dispose();
        (inst.mesh.material as THREE.Material).dispose();
        inst.orbitLine.geometry.dispose();
        (inst.orbitLine.material as THREE.Material).dispose();
      });

      monolithMeshes.forEach(({ mesh, edges }) => {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
        edges.geometry.dispose();
        (edges.material as THREE.Material).dispose();
      });

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      style={{ opacity: 1 }}
    />
  );
};
