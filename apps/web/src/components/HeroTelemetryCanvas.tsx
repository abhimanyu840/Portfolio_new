"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { useTheme } from "@/context/ThemeContext";
import { Zap, Network, Maximize2, Minimize2 } from "lucide-react";

interface NodeData {
  id: string;
  name: string;
  shortName: string;
  vendor: string;
  role: string;
  color: string;
  colorHex: number;
  iconSymbol: string;
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
    shortName: "Brocade SAN",
    vendor: "Broadcom Brocade",
    role: "Core SAN Director Switch",
    color: "#34d399", // Mint
    colorHex: 0x34d399,
    iconSymbol: "#",
    protocol: "32G Fibre Channel // SNMP v3",
    throughput: "12,400 traps/sec",
    latency: "< 1.2ms",
    status: "OPTIMAL",
    orbitRadius: 155,
    orbitAngle: 0,
    orbitSpeed: 0.007,
    yOffset: 30,
  },
  {
    id: "netapp",
    name: "NetApp AFF-A800",
    shortName: "NetApp",
    vendor: "NetApp ONTAP",
    role: "All-Flash SAN Storage",
    color: "#00f5a0", // Bright Mint
    colorHex: 0x00f5a0,
    iconSymbol: "●",
    protocol: "FCP / NVMe-oF / REST API",
    throughput: "850K IOPS",
    latency: "0.8ms P99",
    status: "HEALTHY",
    orbitRadius: 180,
    orbitAngle: (Math.PI * 2) / 6,
    orbitSpeed: 0.0055,
    yOffset: -25,
  },
  {
    id: "dellemc",
    name: "Dell PowerMax 8000",
    shortName: "Dell EMC",
    vendor: "Dell EMC",
    role: "Enterprise Tier-0 Array",
    color: "#38bdf8", // Sky blue
    colorHex: 0x38bdf8,
    iconSymbol: "■",
    protocol: "SRDF Mirror / SMI-S Daemon",
    throughput: "4.2 GB/s Flow",
    latency: "1.1ms IO",
    status: "OPTIMAL",
    orbitRadius: 205,
    orbitAngle: (Math.PI * 4) / 6,
    orbitSpeed: 0.0045,
    yOffset: 25,
  },
  {
    id: "hitachi",
    name: "Hitachi VSP 5600",
    shortName: "Hitachi VSP",
    vendor: "Hitachi Vantara",
    role: "Mission-Critical SAN",
    color: "#10b981", // Emerald
    colorHex: 0x10b981,
    iconSymbol: "▲",
    protocol: "Fibre Channel / CCI REST",
    throughput: "100% SLA Fabric",
    latency: "0.9ms IO",
    status: "HEALTHY",
    orbitRadius: 170,
    orbitAngle: (Math.PI * 6) / 6,
    orbitSpeed: 0.006,
    yOffset: -20,
  },
  {
    id: "asyncio",
    name: "AsyncIO Trap Daemon",
    shortName: "AsyncIO Core",
    vendor: "Wipro SRE Core",
    role: "Non-Blocking Ingestion",
    color: "#14b8a6", // Teal
    colorHex: 0x14b8a6,
    iconSymbol: "⚡",
    protocol: "Python 3.11 AsyncIO / ZeroMQ",
    throughput: "18,500 ev/sec",
    latency: "0.4ms Parse",
    status: "ACTIVE",
    orbitRadius: 190,
    orbitAngle: (Math.PI * 8) / 6,
    orbitSpeed: 0.0055,
    yOffset: 20,
  },
  {
    id: "influxdb",
    name: "InfluxDB Cluster",
    shortName: "TSDB Shard",
    vendor: "Time-Series TSDB",
    role: "Telemetry Retention Shard",
    color: "#059669", // Deep Emerald
    colorHex: 0x059669,
    iconSymbol: "◆",
    protocol: "Flux / Line Protocol UDP",
    throughput: "12,000 writes/sec",
    latency: "1.8ms Write",
    status: "OPTIMAL",
    orbitRadius: 215,
    orbitAngle: (Math.PI * 10) / 6,
    orbitSpeed: 0.004,
    yOffset: -30,
  },
];

type TopologyView = "orbital" | "mesh" | "wave";

export const HeroTelemetryCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const themeRef = useRef(resolvedTheme);

  const [hoveredNode, setHoveredNode] = useState<NodeData | null>(null);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [topologyView, setTopologyView] = useState<TopologyView>("orbital");
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseActive, setPulseActive] = useState<boolean>(false);
  const [fpsMetric, setFpsMetric] = useState<number>(127);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [projectedLabels, setProjectedLabels] = useState<
    { id: string; name: string; symbol: string; color: string; x: number; y: number; visible: boolean }[]
  >([]);

  useEffect(() => {
    themeRef.current = resolvedTheme;
  }, [resolvedTheme]);

  const triggerPulseRef = useRef<() => void>(() => {});
  const topologyModeRef = useRef<TopologyView>(topologyView);
  const autoRotateRef = useRef<boolean>(autoRotate);

  useEffect(() => {
    topologyModeRef.current = topologyView;
  }, [topologyView]);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = container.clientWidth || 600;
    let height = container.clientHeight || 420;

    // 1. Scene, Camera, and Depth
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
    camera.position.set(0, 95, 460);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 2. Lighting tailored to emerald enterprise theme
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x34d399, 2.2);
    dirLight1.position.set(220, 320, 200);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x10b981, 1.6);
    dirLight2.position.set(-200, -180, 150);
    scene.add(dirLight2);

    // =========================================================================
    // 3. CENTRAL ENTERPRISE CORE HUB (ISOMETRIC SERVER CHASSIS)
    // =========================================================================
    const hubGroup = new THREE.Group();
    masterGroup.add(hubGroup);

    // 3a. Core Server Chassis Box
    const coreChassisGeo = new THREE.BoxGeometry(36, 22, 36);
    const coreChassisMat = new THREE.MeshStandardMaterial({
      color: 0x071518,
      roughness: 0.25,
      metalness: 0.88,
    });
    const coreChassisMesh = new THREE.Mesh(coreChassisGeo, coreChassisMat);
    hubGroup.add(coreChassisMesh);

    // Glowing Mint Edges
    const coreEdgesGeo = new THREE.EdgesGeometry(coreChassisGeo);
    const coreEdgesMat = new THREE.LineBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.85,
    });
    const coreEdges = new THREE.LineSegments(coreEdgesGeo, coreEdgesMat);
    hubGroup.add(coreEdges);

    // 3b. Inner Glowing Core Pulse
    const innerPulseGeo = new THREE.OctahedronGeometry(12, 0);
    const innerPulseMat = new THREE.MeshBasicMaterial({
      color: 0x00f5a0,
      wireframe: true,
    });
    const innerPulse = new THREE.Mesh(innerPulseGeo, innerPulseMat);
    innerPulse.position.y = 16;
    hubGroup.add(innerPulse);

    // 3c. Equatorial Telemetry Rings
    const ringGeo1 = new THREE.TorusGeometry(46, 1.0, 16, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.55,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    hubGroup.add(ring1);

    // =========================================================================
    // 4. ENTERPRISE FABRIC NODES (ISOMETRIC SERVER RACKS) & MINT CONDUITS
    // =========================================================================
    interface NodeMeshItem {
      data: NodeData;
      group: THREE.Group;
      chassisMesh: THREE.Mesh;
      edgeLines: THREE.LineSegments;
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

      // Server Chassis Box
      const chassisGeo = new THREE.BoxGeometry(24, 16, 24);
      const chassisMat = new THREE.MeshStandardMaterial({
        color: 0x081719,
        roughness: 0.3,
        metalness: 0.85,
        emissive: node.colorHex,
        emissiveIntensity: 0.15,
      });
      const chassisMesh = new THREE.Mesh(chassisGeo, chassisMat);
      chassisMesh.userData = { nodeId: node.id, nodeData: node };
      nodeGroup.add(chassisMesh);

      // Glowing Mint/Emerald Wireframe Edges
      const edgeGeo = new THREE.EdgesGeometry(chassisGeo);
      const edgeMat = new THREE.LineBasicMaterial({
        color: node.colorHex,
        transparent: true,
        opacity: 0.85,
      });
      const edgeLines = new THREE.LineSegments(edgeGeo, edgeMat);
      nodeGroup.add(edgeLines);

      // Status LED dot on top
      const ledGeo = new THREE.SphereGeometry(2.2, 12, 12);
      const ledMat = new THREE.MeshBasicMaterial({ color: node.colorHex });
      const ledMesh = new THREE.Mesh(ledGeo, ledMat);
      ledMesh.position.set(0, 9.5, 0);
      nodeGroup.add(ledMesh);

      // Spline Conduit connecting Node to Central Core
      const initialPos = new THREE.Vector3(
        Math.cos(node.orbitAngle) * node.orbitRadius,
        node.yOffset,
        Math.sin(node.orbitAngle) * node.orbitRadius
      );
      nodeGroup.position.copy(initialPos);

      const midPoint = new THREE.Vector3(
        initialPos.x * 0.5,
        initialPos.y * 0.5 + 15,
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
        color: 0x34d399,
        transparent: true,
        opacity: 0.42,
      });
      const splineLine = new THREE.Line(lineGeo, lineMat);
      masterGroup.add(splineLine);

      // 3 Traveling Photon Packets
      const packets: { mesh: THREE.Mesh; t: number; speed: number }[] = [];
      const packetCount = 3;
      for (let p = 0; p < packetCount; p++) {
        const pGeo = new THREE.SphereGeometry(2.5, 12, 12);
        const pMat = new THREE.MeshBasicMaterial({
          color: 0x00f5a0,
          transparent: true,
          opacity: 0.95,
        });
        const pMesh = new THREE.Mesh(pGeo, pMat);
        masterGroup.add(pMesh);
        packets.push({
          mesh: pMesh,
          t: p / packetCount,
          speed: 0.009 + (p % 2) * 0.003,
        });
      }

      nodeMeshItems.push({
        data: node,
        group: nodeGroup,
        chassisMesh,
        edgeLines,
        currentPos: initialPos.clone(),
        targetPos: initialPos.clone(),
        angle: node.orbitAngle,
        splineCurve,
        splineLine,
        packets,
      });
    });

    // =========================================================================
    // 5. MOUSE DRAG / 360° ROTATION INTERACTIVITY
    // =========================================================================
    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;
    let rotationVelocityX = 0;
    let rotationVelocityY = 0;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousPointerX = e.clientX;
      previousPointerY = e.clientY;
      rotationVelocityX = 0;
      rotationVelocityY = 0;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - previousPointerX;
        const deltaY = e.clientY - previousPointerY;
        masterGroup.rotation.y += deltaX * 0.008;
        masterGroup.rotation.x += deltaY * 0.008;
        rotationVelocityX = deltaX * 0.008;
        rotationVelocityY = deltaY * 0.008;
        previousPointerX = e.clientX;
        previousPointerY = e.clientY;
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const handleClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const meshes = nodeMeshItems.map((n) => n.chassisMesh);
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

    // Pulse Injection Trigger
    triggerPulseRef.current = () => {
      setPulseActive(true);
      nodeMeshItems.forEach((item) => {
        item.packets.forEach((p) => {
          p.speed = 0.038;
        });
        (item.chassisMesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.6;
      });
      coreChassisMesh.scale.set(1.15, 1.15, 1.15);

      setTimeout(() => {
        setPulseActive(false);
        nodeMeshItems.forEach((item) => {
          item.packets.forEach((p) => {
            p.speed = 0.009;
          });
          (item.chassisMesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.15;
        });
        coreChassisMesh.scale.set(1.0, 1.0, 1.0);
      }, 950);
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
    // 6. ANIMATION LOOP & 2D SCREEN PROJECTION FOR PINNED LABELS
    // =========================================================================
    let animationFrameId: number;
    const clock = new THREE.Clock();
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

    const tempVec = new THREE.Vector3();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // FPS tracking
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

      masterGroup.rotation.x = Math.max(-0.6, Math.min(0.6, masterGroup.rotation.x));

      // Core animation
      innerPulse.rotation.y += 0.02;
      innerPulse.rotation.z += 0.015;
      ring1.rotation.z -= 0.01;

      // Raycasting for node hover
      raycaster.setFromCamera(mouse, camera);
      const meshes = nodeMeshItems.map((n) => n.chassisMesh);
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

      // Node movement & layout modes
      const activeTopology = topologyModeRef.current;

      nodeMeshItems.forEach((item, index) => {
        const node = item.data;

        if (activeTopology === "orbital") {
          if (!prefersReducedMotion) {
            item.angle += node.orbitSpeed * 0.55;
          }
          item.targetPos.set(
            Math.cos(item.angle) * node.orbitRadius,
            node.yOffset + Math.sin(elapsed * 2 + index) * 5,
            Math.sin(item.angle) * node.orbitRadius
          );
        } else if (activeTopology === "mesh") {
          const col = index % 3;
          const row = Math.floor(index / 3);
          item.targetPos.set(
            (col - 1) * 160,
            (row === 0 ? 60 : -60),
            (col === 1 ? -40 : 40)
          );
        } else if (activeTopology === "wave") {
          const spreadX = (index - 2.5) * 80;
          const waveY = Math.sin(elapsed * 2.5 + index * 0.8) * 45;
          const waveZ = Math.cos(elapsed * 1.5 + index * 0.8) * 80;
          item.targetPos.set(spreadX, waveY, waveZ);
        }

        item.currentPos.lerp(item.targetPos, 0.06);
        item.group.position.copy(item.currentPos);

        // Update spline path
        const midPoint = new THREE.Vector3(
          item.currentPos.x * 0.5,
          item.currentPos.y * 0.5 + 15,
          item.currentPos.z * 0.5
        );
        item.splineCurve.points = [
          new THREE.Vector3(0, 0, 0),
          midPoint,
          item.currentPos,
        ];
        const newPts = item.splineCurve.getPoints(36);
        item.splineLine.geometry.setFromPoints(newPts);

        // Advance packet positions
        item.packets.forEach((p) => {
          p.t += p.speed;
          if (p.t > 1) p.t = 0;
          const pPos = item.splineCurve.getPoint(p.t);
          p.mesh.position.copy(pPos);
        });
      });

      // Project 3D nodes to 2D screen positions for floating labels
      if (width > 0 && height > 0) {
        masterGroup.updateMatrixWorld();
        const labels = nodeMeshItems.map((item) => {
          tempVec.copy(item.currentPos);
          tempVec.applyMatrix4(masterGroup.matrixWorld);
          tempVec.project(camera);

          const x = (tempVec.x * 0.5 + 0.5) * width;
          const y = (-(tempVec.y * 0.5) + 0.5) * height;
          const isBehind = tempVec.z > 1;

          return {
            id: item.data.id,
            name: item.data.shortName,
            symbol: item.data.iconSymbol,
            color: item.data.color,
            x,
            y,
            visible: !isBehind && x > 20 && x < width - 20 && y > 20 && y < height - 20,
          };
        });
        setProjectedLabels(labels);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      domEl.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      domEl.removeEventListener("click", handleClick);
      resizeObserver.disconnect();
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);

      // Disposal
      coreChassisGeo.dispose();
      coreChassisMat.dispose();
      coreEdgesGeo.dispose();
      coreEdgesMat.dispose();
      innerPulseGeo.dispose();
      innerPulseMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();

      nodeMeshItems.forEach((item) => {
        item.chassisMesh.geometry.dispose();
        (item.chassisMesh.material as THREE.Material).dispose();
        item.edgeLines.geometry.dispose();
        (item.edgeLines.material as THREE.Material).dispose();
        item.splineLine.geometry.dispose();
        (item.splineLine.material as THREE.Material).dispose();
        item.packets.forEach((p) => {
          p.mesh.geometry.dispose();
          (p.mesh.material as THREE.Material).dispose();
        });
      });

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const activeNode = hoveredNode || selectedNode;

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-2xl sm:rounded-3xl glass-panel border border-slate-200 dark:border-white/[0.1] overflow-hidden shadow-2xl bg-slate-900/5 dark:bg-[#070e10]/95 select-none ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none bg-[#070e10]" : ""
      }`}
    >
      {/* HUD Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 sm:px-5 sm:py-3 border-b border-slate-200 dark:border-white/[0.08] bg-slate-100/70 dark:bg-black/40 backdrop-blur-md gap-2">
        <div className="flex items-center gap-2.5">
          <Network className="w-4 h-4 text-[#34d399]" />
          <span className="font-mono text-xs font-bold text-slate-900 dark:text-white tracking-wider">
            3D SAN FABRIC TOPOLOGY
          </span>
          <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
            // {fpsMetric} FPS WEBGL
          </span>
        </div>

        {/* Interactive Mode Switcher: Fabric, Mesh, Nodes */}
        <div className="flex items-center gap-1 bg-slate-200/80 dark:bg-black/60 p-0.5 rounded-lg border border-slate-300/60 dark:border-white/[0.08]">
          {(["orbital", "mesh", "wave"] as TopologyView[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setTopologyView(mode)}
              className={`px-3 py-1 rounded-md font-mono text-[11px] font-semibold transition-all cursor-pointer ${
                topologyView === mode
                  ? "bg-[#34d399] text-slate-950 font-bold shadow-sm shadow-emerald-500/30"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {mode === "orbital" && "Fabric"}
              {mode === "mesh" && "Mesh"}
              {mode === "wave" && "Nodes"}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => triggerPulseRef.current()}
            disabled={pulseActive}
            className={`px-3 py-1 rounded-md font-mono text-[11px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
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
            onClick={toggleFullscreen}
            className="p-1.5 rounded-md font-mono text-[11px] bg-slate-100 dark:bg-white/[0.05] border border-slate-300 dark:border-white/[0.1] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
            title={isFullscreen ? "Exit Fullscreen" : "Expand Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className={`w-full relative cursor-grab active:cursor-grabbing ${
          isFullscreen ? "h-[calc(100vh-50px)]" : "h-[320px] sm:h-[380px] md:h-[420px]"
        }`}
      >
        {/* Interaction Hint Overlay */}
        <div className="absolute top-3 left-3 pointer-events-none z-10 flex items-center gap-2 bg-slate-950/70 dark:bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/[0.1] text-slate-300 text-[10px] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>DRAG TO ROTATE 360° // HOVER OR CLICK NODE TO INSPECT</span>
        </div>

        {/* Pinned 2D HTML Node Badges (Matching Screenshot) */}
        {projectedLabels.map((lbl) => {
          if (!lbl.visible) return null;
          const isSelected = activeNode?.id === lbl.id;
          return (
            <div
              key={lbl.id}
              className={`absolute pointer-events-none z-10 transition-transform -translate-x-1/2 -translate-y-7 flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px] backdrop-blur-md border ${
                isSelected
                  ? "bg-[#34d399]/20 border-[#34d399] text-white shadow-[0_0_10px_rgba(52,211,153,0.3)] scale-105"
                  : "bg-slate-950/80 border-white/[0.1] text-slate-300"
              }`}
              style={{
                left: `${lbl.x}px`,
                top: `${lbl.y}px`,
              }}
            >
              <span className="text-[#34d399] font-bold">{lbl.symbol}</span>
              <span className="font-semibold">{lbl.name}</span>
            </div>
          );
        })}

        {/* Sleek Non-Intrusive Floating HUD Tooltip (Revealed on hover/select) */}
        {activeNode && (
          <div className="absolute bottom-3 left-3 z-10 pointer-events-auto bg-slate-950/90 dark:bg-[#070e10]/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-slate-700/60 dark:border-white/[0.12] shadow-xl text-slate-200 max-w-[280px] sm:max-w-xs transition-all">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-1.5 mb-1.5">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: activeNode.color }}
                />
                <span className="font-mono text-xs font-bold text-white tracking-wide truncate">
                  {activeNode.name}
                </span>
              </div>
              <span
                className="px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold"
                style={{
                  backgroundColor: `${activeNode.color}20`,
                  color: activeNode.color,
                  border: `1px solid ${activeNode.color}40`,
                }}
              >
                {activeNode.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-2.5 gap-y-1 font-mono text-[10px]">
              <div>
                <span className="text-slate-400 text-[9px] block">ROLE</span>
                <span className="text-slate-200 truncate block font-medium">{activeNode.role}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[9px] block">THROUGHPUT</span>
                <span className="text-emerald-400 font-semibold">{activeNode.throughput}</span>
              </div>
            </div>
          </div>
        )}

        {/* Powered by Netlify Badge on Bottom Right */}
        <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/85 dark:bg-[#070e10]/95 border border-white/[0.12] text-xs font-mono text-slate-300 backdrop-blur-md shadow-lg pointer-events-auto">
          <svg
            className="w-3.5 h-3.5 text-[#00c7b7]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M6.49 19.09l.73-4.43 3.4 2.87-4.13 1.56zm10.74-5.32l.74 4.43-4.14-1.56 3.4-2.87zM12 2.25L4.5 13.5l4.88-.75L12 4.13l2.62 8.62 4.88.75L12 2.25zM3.45 14.88l-1.2 7.37 6.1-2.3-4.9-5.07zm17.1 0l-4.9 5.07 6.1 2.3-1.2-7.37zM12 18.27l-2.45-2.07 2.45-3.67 2.45 3.67-2.45 2.07z" />
          </svg>
          <span>
            Powered by <strong className="text-white font-semibold">Netlify</strong>
          </span>
        </div>
      </div>
    </div>
  );
};
