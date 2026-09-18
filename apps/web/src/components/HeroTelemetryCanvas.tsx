"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { useTheme } from "@/context/ThemeContext";
import { Activity, ShieldCheck, Zap, RefreshCw, Layers, Radio, Sparkles, Server, Database, Network } from "lucide-react";

interface NodeData {
  id: string;
  name: string;
  vendor: string;
  role: string;
  color: string;
  colorHex: number;
  iconName: string;
  protocol: string;
  throughput: string;
  latency: string;
  status: string;
  orbitRadius: number;
  orbitAngle: number;
  orbitSpeed: number;
  yOffset: number;
}

const FABRIC_NODES: NodeData[] = [
  {
    id: "brocade",
    name: "Brocade DCX-8510",
    vendor: "Broadcom Brocade",
    role: "Core SAN Director Switch",
    color: "#06b6d4", // Cyan
    colorHex: 0x06b6d4,
    iconName: "network",
    protocol: "32G Fibre Channel // SNMP v3",
    throughput: "12,400 traps/sec",
    latency: "< 1.2ms",
    status: "OPTIMAL",
    orbitRadius: 160,
    orbitAngle: 0,
    orbitSpeed: 0.008,
    yOffset: 25,
  },
  {
    id: "netapp",
    name: "NetApp AFF-A800",
    vendor: "NetApp ONTAP",
    role: "All-Flash SAN Storage",
    color: "#0284c7", // Sky blue
    colorHex: 0x0284c7,
    iconName: "harddrive",
    protocol: "FCP / NVMe-oF / REST API",
    throughput: "850K IOPS",
    latency: "0.8ms P99",
    status: "HEALTHY",
    orbitRadius: 185,
    orbitAngle: (Math.PI * 2) / 6,
    orbitSpeed: 0.006,
    yOffset: -30,
  },
  {
    id: "dellemc",
    name: "Dell PowerMax 8000",
    vendor: "Dell EMC",
    role: "Enterprise Tier-0 Array",
    color: "#3b82f6", // Blue
    colorHex: 0x3b82f6,
    iconName: "server",
    protocol: "SRDF Mirror / SMI-S Daemon",
    throughput: "4.2 GB/s Flow",
    latency: "1.1ms IO",
    status: "OPTIMAL",
    orbitRadius: 210,
    orbitAngle: (Math.PI * 4) / 6,
    orbitSpeed: 0.005,
    yOffset: 35,
  },
  {
    id: "hitachi",
    name: "Hitachi VSP 5600",
    vendor: "Hitachi Vantara",
    role: "Mission-Critical SAN",
    color: "#a855f7", // Purple
    colorHex: 0xa855f7,
    iconName: "database",
    protocol: "Fibre Channel / CCI REST",
    throughput: "100% SLA Fabric",
    latency: "0.9ms IO",
    status: "HEALTHY",
    orbitRadius: 175,
    orbitAngle: (Math.PI * 6) / 6,
    orbitSpeed: 0.007,
    yOffset: -20,
  },
  {
    id: "asyncio",
    name: "AsyncIO Trap Daemon",
    vendor: "Wipro SRE Core",
    role: "Non-Blocking Ingestion",
    color: "#f59e0b", // Amber
    colorHex: 0xf59e0b,
    iconName: "cpu",
    protocol: "Python 3.11 AsyncIO / ZeroMQ",
    throughput: "18,500 ev/sec",
    latency: "0.4ms Parse",
    status: "ACTIVE",
    orbitRadius: 195,
    orbitAngle: (Math.PI * 8) / 6,
    orbitSpeed: 0.0065,
    yOffset: 20,
  },
  {
    id: "influxdb",
    name: "InfluxDB Cluster",
    vendor: "Time-Series TSDB",
    role: "Telemetry Retention Shard",
    color: "#10b981", // Emerald
    colorHex: 0x10b981,
    iconName: "database",
    protocol: "Flux / Line Protocol UDP",
    throughput: "12,000 writes/sec",
    latency: "1.8ms Write",
    status: "OPTIMAL",
    orbitRadius: 220,
    orbitAngle: (Math.PI * 10) / 6,
    orbitSpeed: 0.0045,
    yOffset: -35,
  },
];

type TopologyView = "orbital" | "mesh" | "wave";

export const HeroTelemetryCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const themeRef = useRef(resolvedTheme);

  // Active hover/selected node for HUD telemetry readout
  const [hoveredNode, setHoveredNode] = useState<NodeData | null>(null);
  const [selectedNode, setSelectedNode] = useState<NodeData>(FABRIC_NODES[0]);
  const [topologyView, setTopologyView] = useState<TopologyView>("orbital");
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseActive, setPulseActive] = useState<boolean>(false);
  const [fpsMetric, setFpsMetric] = useState<number>(60);

  useEffect(() => {
    themeRef.current = resolvedTheme;
  }, [resolvedTheme]);

  // Ref triggers
  const triggerPulseRef = useRef<() => void>(() => {});
  const resetViewRef = useRef<() => void>(() => {});
  const topologyModeRef = useRef<TopologyView>(topologyView);
  const autoRotateRef = useRef<boolean>(autoRotate);

  useEffect(() => {
    topologyModeRef.current = topologyView;
  }, [topologyView]);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Dimensions
    let width = container.clientWidth || 600;
    let height = container.clientHeight || 450;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
    camera.position.set(0, 80, 480);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Master Group for 3D rotation
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Ambient & Directional Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 2.0);
    dirLight1.position.set(200, 300, 200);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x818cf8, 1.5);
    dirLight2.position.set(-200, -200, 150);
    scene.add(dirLight2);

    // =========================================================================
    // 1. CENTRAL TELEMETRY HUB
    // =========================================================================
    const hubGroup = new THREE.Group();
    masterGroup.add(hubGroup);

    // 1a. Inner Glowing Core
    const innerCoreGeo = new THREE.SphereGeometry(24, 32, 32);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: false,
    });
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    hubGroup.add(innerCore);

    // 1b. Pulsing Wireframe Geodesic Icosahedron
    const wireCoreGeo = new THREE.IcosahedronGeometry(36, 1);
    const wireCoreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const wireCore = new THREE.Mesh(wireCoreGeo, wireCoreMat);
    hubGroup.add(wireCore);

    // 1c. Equatorial Gimbal Rings
    const ringGeo1 = new THREE.TorusGeometry(48, 1.2, 16, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.6,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    hubGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(56, 1.0, 16, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.5,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 6;
    hubGroup.add(ring2);

    // =========================================================================
    // 2. ORBITING FABRIC NODES & CONDUITS
    // =========================================================================
    interface NodeMeshItem {
      data: NodeData;
      group: THREE.Group;
      mesh: THREE.Mesh;
      halo: THREE.Mesh;
      currentPos: THREE.Vector3;
      targetPos: THREE.Vector3;
      angle: number;
      splineCurve: THREE.CatmullRomCurve3;
      splineLine: THREE.Line;
      packets: { mesh: THREE.Mesh; t: number; speed: number }[];
    }

    const nodeMeshItems: NodeMeshItem[] = [];

    FABRIC_NODES.forEach((node) => {
      const nodeGroup = new THREE.Group();
      masterGroup.add(nodeGroup);

      // Node Box / Gem Body
      const nodeGeo = new THREE.OctahedronGeometry(13, 0);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: node.colorHex,
        emissive: node.colorHex,
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.8,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.userData = { nodeId: node.id, nodeData: node };
      nodeGroup.add(nodeMesh);

      // Glowing Halo Ring
      const haloGeo = new THREE.RingGeometry(16, 19, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: node.colorHex,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4,
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      nodeGroup.add(haloMesh);

      // Spline Conduit connecting Node to Central Hub
      const initialPos = new THREE.Vector3(
        Math.cos(node.orbitAngle) * node.orbitRadius,
        node.yOffset,
        Math.sin(node.orbitAngle) * node.orbitRadius
      );
      nodeGroup.position.copy(initialPos);

      const midPoint = new THREE.Vector3(
        initialPos.x * 0.5,
        initialPos.y * 0.5 + 20,
        initialPos.z * 0.5
      );
      const splineCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        midPoint,
        initialPos,
      ]);

      const linePoints = splineCurve.getPoints(36);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
      const lineMat = new THREE.LineBasicMaterial({
        color: node.colorHex,
        transparent: true,
        opacity: 0.35,
      });
      const splineLine = new THREE.Line(lineGeo, lineMat);
      masterGroup.add(splineLine);

      // Traveling 3D Packets along spline
      const packets: { mesh: THREE.Mesh; t: number; speed: number }[] = [];
      const packetCount = 3;
      for (let p = 0; p < packetCount; p++) {
        const pGeo = new THREE.SphereGeometry(2.8, 12, 12);
        const pMat = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.95,
        });
        const pMesh = new THREE.Mesh(pGeo, pMat);
        masterGroup.add(pMesh);
        packets.push({
          mesh: pMesh,
          t: p / packetCount,
          speed: 0.008 + (p % 2) * 0.003,
        });
      }

      nodeMeshItems.push({
        data: node,
        group: nodeGroup,
        mesh: nodeMesh,
        halo: haloMesh,
        currentPos: initialPos.clone(),
        targetPos: initialPos.clone(),
        angle: node.orbitAngle,
        splineCurve,
        splineLine,
        packets,
      });
    });

    // =========================================================================
    // 3. BACKGROUND PARTICLES FIELD (Cybernetic Stars)
    // =========================================================================
    const starCount = 320;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starPalette = [
      new THREE.Color("#38bdf8"),
      new THREE.Color("#818cf8"),
      new THREE.Color("#c084fc"),
      new THREE.Color("#ffffff"),
    ];

    for (let s = 0; s < starCount; s++) {
      const radius = 260 + Math.random() * 220;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPositions[s * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[s * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[s * 3 + 2] = radius * Math.cos(phi);

      const color = starPalette[s % starPalette.length];
      starColors[s * 3] = color.r;
      starColors[s * 3 + 1] = color.g;
      starColors[s * 3 + 2] = color.b;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 3.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
    });
    const starField = new THREE.Points(starGeo, starMat);
    masterGroup.add(starField);

    // =========================================================================
    // 4. INTERACTIVE DRAG ORBIT & RAYCASTING
    // =========================================================================
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-100, -100);

    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let rotationVelocityX = 0;
    let rotationVelocityY = 0;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
      rotationVelocityX = 0;
      rotationVelocityY = 0;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - previousMouseX;
        const deltaY = e.clientY - previousMouseY;

        masterGroup.rotation.y += deltaX * 0.008;
        masterGroup.rotation.x += deltaY * 0.008;

        rotationVelocityX = deltaX * 0.008;
        rotationVelocityY = deltaY * 0.008;

        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const handleClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const meshes = nodeMeshItems.map((n) => n.mesh);
      const intersects = raycaster.intersectObjects(meshes);

      if (intersects.length > 0) {
        const clickedData = intersects[0].object.userData.nodeData as NodeData;
        if (clickedData) {
          setSelectedNode(clickedData);
          setHoveredNode(clickedData);
        }
      }
    };

    const domEl = renderer.domElement;
    domEl.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    domEl.addEventListener("click", handleClick);

    // Reset View Trigger
    resetViewRef.current = () => {
      masterGroup.rotation.set(0, 0, 0);
      rotationVelocityX = 0;
      rotationVelocityY = 0;
    };

    // Pulse Injection Trigger
    triggerPulseRef.current = () => {
      setPulseActive(true);
      nodeMeshItems.forEach((item) => {
        item.packets.forEach((p) => {
          p.speed = 0.035; // Accelerate packet speed
        });
        (item.mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.4;
      });
      innerCoreMat.color.setHex(0xffffff);

      setTimeout(() => {
        setPulseActive(false);
        nodeMeshItems.forEach((item) => {
          item.packets.forEach((p) => {
            p.speed = 0.008;
          });
          (item.mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.6;
        });
        innerCoreMat.color.setHex(0x06b6d4);
      }, 900);
    };

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // =========================================================================
    // 5. ANIMATION LOOP & INTERSECTION OBSERVER
    // =========================================================================
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let isVisible = true;
    let frameCount = 0;
    let lastFpsTime = performance.now();

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // FPS calculation
      frameCount++;
      const now = performance.now();
      if (now - lastFpsTime >= 1000) {
        setFpsMetric(Math.round((frameCount * 1000) / (now - lastFpsTime)));
        frameCount = 0;
        lastFpsTime = now;
      }

      // Inertia & Auto-Rotation
      if (!isDragging) {
        masterGroup.rotation.y += rotationVelocityX;
        masterGroup.rotation.x += rotationVelocityY;
        rotationVelocityX *= 0.94;
        rotationVelocityY *= 0.94;

        if (autoRotateRef.current && !prefersReducedMotion) {
          masterGroup.rotation.y += 0.003;
        }
      }

      // Constrain X rotation
      masterGroup.rotation.x = Math.max(-0.6, Math.min(0.6, masterGroup.rotation.x));

      // Hub Oscillations
      innerCore.rotation.y += 0.015;
      wireCore.rotation.x += 0.01;
      wireCore.rotation.z += 0.008;
      ring1.rotation.z -= 0.012;
      ring2.rotation.y += 0.01;

      // Pulse breathing
      const pulseScale = 1 + Math.sin(elapsed * 3) * 0.06;
      innerCore.scale.set(pulseScale, pulseScale, pulseScale);

      // Raycasting for node hover
      raycaster.setFromCamera(mouse, camera);
      const meshes = nodeMeshItems.map((n) => n.mesh);
      const intersects = raycaster.intersectObjects(meshes);

      let foundHoveredNode: NodeData | null = null;
      if (intersects.length > 0) {
        const hoveredMesh = intersects[0].object;
        foundHoveredNode = hoveredMesh.userData.nodeData as NodeData;
        domEl.style.cursor = "pointer";
      } else {
        domEl.style.cursor = isDragging ? "grabbing" : "grab";
      }
      setHoveredNode(foundHoveredNode);

      // Node position calculation according to active topology view
      const activeTopology = topologyModeRef.current;

      nodeMeshItems.forEach((item, index) => {
        const node = item.data;

        // Mode 1: Orbital Rings
        if (activeTopology === "orbital") {
          if (!prefersReducedMotion) {
            item.angle += node.orbitSpeed * 0.5;
          }
          item.targetPos.set(
            Math.cos(item.angle) * node.orbitRadius,
            node.yOffset + Math.sin(elapsed * 2 + index) * 6,
            Math.sin(item.angle) * node.orbitRadius
          );
        }
        // Mode 2: Distributed Datacenter Mesh
        else if (activeTopology === "mesh") {
          const col = index % 3;
          const row = Math.floor(index / 3);
          item.targetPos.set(
            (col - 1) * 150,
            (row === 0 ? 50 : -50) + Math.sin(elapsed * 1.5 + index) * 5,
            (col === 1 ? -40 : 40)
          );
        }
        // Mode 3: Telemetry Stream Wave
        else if (activeTopology === "wave") {
          const xPos = (index - 2.5) * 80;
          item.targetPos.set(
            xPos,
            Math.sin(elapsed * 3 + index * 0.9) * 60,
            Math.cos(elapsed * 2 + index * 0.9) * 50
          );
        }

        // Smooth position lerp
        item.currentPos.lerp(item.targetPos, 0.08);
        item.group.position.copy(item.currentPos);

        // Hover scale & halo pulse
        const isHovered = foundHoveredNode?.id === node.id || selectedNode.id === node.id;
        const targetScale = isHovered ? 1.35 : 1.0;
        item.mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
        item.halo.scale.set(targetScale * 1.1, targetScale * 1.1, 1);
        item.halo.lookAt(camera.position);

        // Update Spline Conduit
        const midPoint = new THREE.Vector3(
          item.currentPos.x * 0.5,
          item.currentPos.y * 0.5 + 25,
          item.currentPos.z * 0.5
        );
        item.splineCurve.points = [
          new THREE.Vector3(0, 0, 0),
          midPoint,
          item.currentPos,
        ];
        const newPoints = item.splineCurve.getPoints(36);
        item.splineLine.geometry.setFromPoints(newPoints);

        // Animate Packets along Spline
        item.packets.forEach((pkt) => {
          pkt.t += pkt.speed;
          if (pkt.t > 1) pkt.t = 0;

          // Packet travels from Node toward Core
          const pt = item.splineCurve.getPoint(1 - pkt.t);
          pkt.mesh.position.copy(pt);

          // Packet glow intensity
          const pMat = pkt.mesh.material as THREE.MeshBasicMaterial;
          pMat.opacity = Math.sin(pkt.t * Math.PI) * 0.95;
        });

        // Slow node self-rotation
        item.mesh.rotation.y += 0.015;
        item.mesh.rotation.x += 0.01;
      });

      // Starfield slow drift
      starField.rotation.y -= 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    // Clean unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      resizeObserver.disconnect();

      domEl.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      domEl.removeEventListener("click", handleClick);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose geometries & materials
      innerCoreGeo.dispose();
      innerCoreMat.dispose();
      wireCoreGeo.dispose();
      wireCoreMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      starGeo.dispose();
      starMat.dispose();

      nodeMeshItems.forEach((item) => {
        item.mesh.geometry.dispose();
        (item.mesh.material as THREE.Material).dispose();
        item.halo.geometry.dispose();
        (item.halo.material as THREE.Material).dispose();
        item.splineLine.geometry.dispose();
        (item.splineLine.material as THREE.Material).dispose();
        item.packets.forEach((p) => {
          p.mesh.geometry.dispose();
          (p.mesh.material as THREE.Material).dispose();
        });
      });

      renderer.dispose();
    };
  }, []);

  const activeNode = hoveredNode || selectedNode;

  return (
    <div className="relative w-full rounded-2xl sm:rounded-3xl glass-panel border border-slate-200 dark:border-white/[0.1] overflow-hidden shadow-xl bg-slate-900/5 dark:bg-[#070a14]/80 select-none">
      {/* HUD Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 sm:px-5 sm:py-3 border-b border-slate-200 dark:border-white/[0.08] bg-slate-100/70 dark:bg-black/40 backdrop-blur-md gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-600 dark:text-cyan-300 font-mono text-[11px] font-bold">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>3D SAN FABRIC TOPOLOGY</span>
          </div>
          <span className="hidden sm:inline-block font-mono text-[11px] text-slate-500 dark:text-slate-400">
            // {fpsMetric} FPS WEBGL
          </span>
        </div>

        {/* Interactive Topology Mode Switcher */}
        <div className="flex items-center gap-1 bg-slate-200/80 dark:bg-white/[0.05] p-0.5 rounded-lg border border-slate-300/60 dark:border-white/[0.08]">
          {(["orbital", "mesh", "wave"] as TopologyView[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setTopologyView(mode)}
              className={`px-2.5 py-1 rounded-md font-mono text-[11px] font-semibold transition-all cursor-pointer ${
                topologyView === mode
                  ? "bg-cyan-500 text-white shadow-sm shadow-cyan-500/30"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {mode === "orbital" && "Orbit"}
              {mode === "mesh" && "Mesh"}
              {mode === "wave" && "Wave"}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => triggerPulseRef.current()}
            disabled={pulseActive}
            className={`px-2.5 py-1 rounded-md font-mono text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer border ${
              pulseActive
                ? "bg-amber-500 text-white border-amber-400 shadow-md shadow-amber-500/30"
                : "bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] border-slate-300 dark:border-white/[0.1] text-slate-700 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-300"
            }`}
            title="Inject simulated SNMP trap packet surge through fabric conduits"
          >
            <Zap className={`w-3 h-3 ${pulseActive ? "animate-spin" : "text-amber-400"}`} />
            <span>{pulseActive ? "INJECTING..." : "INJECT PACKET"}</span>
          </button>

          <button
            onClick={() => setAutoRotate((prev) => !prev)}
            className={`p-1.5 rounded-md font-mono text-[11px] transition-all cursor-pointer border ${
              autoRotate
                ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-300"
                : "bg-slate-100 dark:bg-white/[0.05] border-slate-300 dark:border-white/[0.1] text-slate-500"
            }`}
            title={autoRotate ? "Pause auto-rotation" : "Enable auto-rotation"}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${autoRotate ? "animate-spin" : ""}`} style={{ animationDuration: "6s" }} />
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-[320px] sm:h-[380px] md:h-[420px] relative cursor-grab active:cursor-grabbing"
      >
        {/* Interaction Hint Overlay */}
        <div className="absolute top-3 left-3 pointer-events-none z-10 flex items-center gap-2 bg-slate-950/70 dark:bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/[0.1] text-slate-300 text-[10px] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>DRAG TO ROTATE 360° // HOVER OR CLICK NODE TO INSPECT</span>
        </div>

        {/* Real-Time Live Node HUD Tooltip */}
        <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-sm z-10 pointer-events-auto bg-slate-900/90 dark:bg-[#0b0f1d]/90 backdrop-blur-md p-3 rounded-xl border border-slate-700/60 dark:border-white/[0.12] shadow-xl text-slate-200">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-1.5 mb-2">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: activeNode.color }}
              />
              <span className="font-mono text-xs font-bold text-white tracking-wide">
                {activeNode.name}
              </span>
            </div>
            <span
              className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold"
              style={{
                backgroundColor: `${activeNode.color}20`,
                color: activeNode.color,
                border: `1px solid ${activeNode.color}40`,
              }}
            >
              {activeNode.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-1 font-mono text-[11px]">
            <div>
              <span className="text-slate-400 text-[10px] block">VENDOR / ROLE</span>
              <span className="text-slate-200 truncate block font-medium">{activeNode.vendor}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">THROUGHPUT</span>
              <span className="text-cyan-400 font-semibold">{activeNode.throughput}</span>
            </div>
            <div className="col-span-2 mt-0.5">
              <span className="text-slate-400 text-[10px] block">PROTOCOL &amp; INTERFACE</span>
              <span className="text-slate-300 truncate block text-[10px]">{activeNode.protocol}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Node Quick Selector Bar */}
      <div className="px-3 py-2 bg-slate-100/80 dark:bg-black/40 border-t border-slate-200 dark:border-white/[0.08] flex items-center justify-between overflow-x-auto no-scrollbar gap-2">
        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase shrink-0">
          SAN NODES:
        </span>
        <div className="flex items-center gap-1.5">
          {FABRIC_NODES.map((n) => {
            const isSelected = activeNode.id === n.id;
            return (
              <button
                key={n.id}
                onClick={() => {
                  setSelectedNode(n);
                  setHoveredNode(n);
                }}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  isSelected
                    ? "bg-white dark:bg-white/[0.1] text-slate-900 dark:text-white font-bold shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: n.color }}
                />
                <span>{n.name.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
