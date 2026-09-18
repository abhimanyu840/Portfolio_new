"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Activity,
  ShieldCheck,
  Server,
  Cpu,
  Database,
  Network,
  RefreshCw,
  Zap,
  Terminal as TerminalIcon,
  AlertTriangle,
  Radio,
  Sliders,
  ChevronRight,
  Code2,
  HardDrive,
  BarChart3,
  Layers,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import type { ITelemetry } from "@portfolio/shared";
import { HeroTelemetryCanvas } from "@/components/HeroTelemetryCanvas";

interface PipelineStage {
  id: string;
  step: string;
  name: string;
  subtitle: string;
  protocol: string;
  throughput: string;
  latency: string;
  description: string;
  highlights: string[];
}

interface FabricNode {
  id: string;
  name: string;
  vendor: string;
  role: string;
  status: "ONLINE" | "OPTIMAL" | "HEALTHY";
  primaryMetric: string;
  details: {
    protocol: string;
    throughput: string;
    ioLatency: string;
    portsOrNodes: string;
    errorRate: string;
    diagnostic: string;
  };
}

interface TelemetryLogEntry {
  id: string;
  timestamp: string;
  level: "INFO" | "METRIC" | "WARN" | "INGEST";
  source: string;
  message: string;
}

const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: "input",
    step: "01",
    name: "Input & Ingestion",
    subtitle: "SNMP & Syslog Traps",
    protocol: "SNMP v2c/v3, RFC 5424 Syslog UDP/TCP",
    throughput: "12,400 traps/sec",
    latency: "< 1.8ms ingest",
    description:
      "Enterprise telemetry receiver capturing asynchronous state change traps and performance counters from Brocade SAN switches and multi-vendor storage nodes.",
    highlights: [
      "Non-blocking UDP/TCP trap socket receivers built on Python asyncio",
      "Dynamic rate-limiting ring buffers preventing kernel socket drops",
      "Network interface CRC and link-state error parser",
    ],
  },
  {
    id: "processor",
    step: "02",
    name: "Daemon Processing",
    subtitle: "AsyncIO Event Workers",
    protocol: "Python 3.11, ZeroMQ, AsyncIO Workers",
    throughput: "18,500 ev/sec",
    latency: "0.4ms parse",
    description:
      "High-concurrency parsing engine performing payload deserialization, metric normalization, deduplication, and severity classification.",
    highlights: [
      "Pre-compiled regex & binary frame decoders for SAN diagnostic payloads",
      "Intelligent alert deduplication suppressing repetitive flap storms",
      "Tag enrichment attaching SAN fabric zones, switch WWNs, and lun IDs",
    ],
  },
  {
    id: "storage",
    step: "03",
    name: "Time-Series Core",
    subtitle: "InfluxDB & Prometheus",
    protocol: "InfluxDB Line Protocol, Sub-Second Sharding",
    throughput: "Sub-Second Write",
    latency: "< 4ms write",
    description:
      "Partitioned time-series storage tier optimized for high-frequency writes, multi-resolution downsampling, and automated data lifecycle policies.",
    highlights: [
      "Dynamic bucket retention (7-day raw sub-second, 90-day 1m rollups)",
      "Continuous aggregation queries computing IOPS, throughput & latency percentiles",
      "Memory-cached index reducing disk I/O load by 68%",
    ],
  },
  {
    id: "exposition",
    step: "04",
    name: "Exposition Layer",
    subtitle: "FastAPI & Grafana",
    protocol: "FastAPI REST, WebSocket Stream, Grafana 10",
    throughput: "Sub-45ms Queries",
    latency: "12ms roundtrip",
    description:
      "Low-latency presentation tier serving real-time NOC dashboards, WebSocket telemetry channels, and webhooks for downstream incident responders.",
    highlights: [
      "WebSocket multiplexing pushing real-time SAN switch metrics to browser",
      "Pydantic schema validation guaranteeing typed client payload contracts",
      "Sub-second alert dispatch with auto-recovery state detection",
    ],
  },
];

const FABRIC_NODES: FabricNode[] = [
  {
    id: "netapp-fas",
    name: "NetApp ONTAP Cluster",
    vendor: "NetApp",
    role: "Tier-1 Enterprise NAS/SAN",
    status: "OPTIMAL",
    primaryMetric: "82,400 IOPS",
    details: {
      protocol: "NFS v4.1 / iSCSI / FCP",
      throughput: "3.2 GB/sec aggregate",
      ioLatency: "0.82 ms (P95)",
      portsOrNodes: "8 Active HA Nodes",
      errorRate: "0.0001% packet loss",
      diagnostic: "NVRAM battery healthy, aggregate balance optimal across all aggr pairs.",
    },
  },
  {
    id: "dellemc-powerstore",
    name: "Dell EMC PowerStore 5000",
    vendor: "Dell EMC",
    role: "Block & File Flash Array",
    status: "HEALTHY",
    primaryMetric: "114,200 IOPS",
    details: {
      protocol: "NVMe-oF / FC 32Gbps",
      throughput: "4.8 GB/sec peak",
      ioLatency: "0.45 ms (sub-millisecond)",
      portsOrNodes: "4 Appliance Nodes",
      errorRate: "0 CRC frame drop",
      diagnostic: "Dynamic Resiliency Engine active, dedupe ratio 4.2:1 verified.",
    },
  },
  {
    id: "hitachi-vsp",
    name: "Hitachi VSP G1500",
    vendor: "Hitachi",
    role: "Mission-Critical Enterprise SAN",
    status: "OPTIMAL",
    primaryMetric: "64,800 IOPS",
    details: {
      protocol: "Fibre Channel 32G / Mainframe FICON",
      throughput: "2.1 GB/sec throughput",
      ioLatency: "0.95 ms average",
      portsOrNodes: "128 Fibre Channel Ports",
      errorRate: "0 uncorrectable errors",
      diagnostic: "Microcode 80-06-72 verified, zero parity errors logged.",
    },
  },
  {
    id: "brocade-san-g620",
    name: "Brocade G620 Switch Fabric",
    vendor: "Brocade",
    role: "32G Gen 6 FC SAN Switch",
    status: "ONLINE",
    primaryMetric: "48 SFP+ Active Ports",
    details: {
      protocol: "FC-SW-6, SNMP v3, Brocade CLI",
      throughput: "768 Gbps backplane",
      ioLatency: "700 ns port switching",
      portsOrNodes: "48 x 32Gbps FC Ports",
      errorRate: "0 credit stall drops",
      diagnostic: "Fabric Watch monitoring active; optical signal margins within ±0.2 dBm.",
    },
  },
];

const INITIAL_LOGS: TelemetryLogEntry[] = [
  {
    id: "log-1",
    timestamp: "12:00:04.120",
    level: "INFO",
    source: "brocade-fc-collector",
    message: "SNMP trap received from Switch-BRCD-01 (Fabric A): Port 8 link-state UP (32Gbps speed negotiated).",
  },
  {
    id: "log-2",
    timestamp: "12:00:03.880",
    level: "INGEST",
    source: "influxdb-writer",
    message: "Flushed 1,240 metric samples to bucket 'telemetry_enterprise_raw' [sharded write: 2.1ms].",
  },
  {
    id: "log-3",
    timestamp: "12:00:02.450",
    level: "METRIC",
    source: "netapp-ontap-daemon",
    message: "Node cluster-node-02 IOPS: 42,100 | Volume 'vol_prod_db' latency: 0.62ms.",
  },
  {
    id: "log-4",
    timestamp: "12:00:01.010",
    level: "INFO",
    source: "fastapi-gateway",
    message: "GET /api/v1/telemetry 200 OK — Handled in 8.4ms across 4 storage node aggregates.",
  },
];

export const ObservabilityHUD: React.FC = () => {
  // Navigation Tabs: Pipeline Simulation vs Live Portfolio Telemetry vs 3D SAN Topology
  const [activeTab, setActiveTab] = useState<"pipeline" | "runtime" | "topology3d">("pipeline");

  // Interactive Pipeline Stage Inspector State
  const [selectedStage, setSelectedStage] = useState<PipelineStage>(PIPELINE_STAGES[0]);

  // Interactive Fabric Node Inspector State
  const [selectedNode, setSelectedNode] = useState<FabricNode>(FABRIC_NODES[0]);

  // Live Runtime Telemetry API State
  const [telemetry, setTelemetry] = useState<ITelemetry | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [latencyHistory, setLatencyHistory] = useState<number[]>([18, 14, 22, 16, 12, 15, 20, 14, 18, 12]);
  const [lastSampleTime, setLastSampleTime] = useState<string>("Initializing...");

  // Interactive Live Stream Logs State
  const [logs, setLogs] = useState<TelemetryLogEntry[]>(INITIAL_LOGS);
  const [isSimulatingEvent, setIsSimulatingEvent] = useState(false);
  const [autoSample, setAutoSample] = useState(true);
  const shouldReduceMotion = useReducedMotion();
  const springTransition = shouldReduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 450, damping: 35 };
  const panelTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.16, ease: "easeOut" as const };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion ? { duration: 0 } : { duration: 0.45, ease: "easeOut" as const },
    },
  };

  // Fetch real portfolio telemetry from /api/v1/telemetry
  const fetchTelemetry = useCallback(async () => {
    setIsRefreshing(true);
    const clientStartTime = performance.now();
    try {
      const res = await fetch("/api/v1/telemetry");
      const clientRoundtrip = Math.max(1, Math.round(performance.now() - clientStartTime));
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setTelemetry(json.data);
          setLatencyHistory((prev) => [...prev.slice(1), clientRoundtrip]);
          setLastSampleTime(new Date().toLocaleTimeString());
        }
      }
    } catch {
      // Fallback already handled gracefully
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchTelemetry();
  }, [fetchTelemetry]);

  // Auto-polling interval
  useEffect(() => {
    if (!autoSample) return;
    const interval = setInterval(() => {
      fetchTelemetry();
    }, 4500);
    return () => clearInterval(interval);
  }, [autoSample, fetchTelemetry]);

  // Handler: Simulate synthetic telemetry packet injection into pipeline
  const handleSimulatePacket = () => {
    setIsSimulatingEvent(true);
    const now = new Date();
    const timeStr = `${now.toTimeString().split(" ")[0]}.${Math.floor(Math.random() * 900 + 100)}`;
    const randomIops = Math.floor(58000 + Math.random() * 12000);
    const randomLatency = (0.5 + Math.random() * 0.4).toFixed(2);

    const newEvent: TelemetryLogEntry = {
      id: `sim-${Date.now()}`,
      timestamp: timeStr,
      level: Math.random() > 0.3 ? "INGEST" : "METRIC",
      source: "synthetic-packet-generator",
      message: `[BURST SIMULATION] Synthetic trap received: ${randomIops.toLocaleString()} IOPS injected, latency ${randomLatency}ms, routed to InfluxDB.`,
    };

    setLogs((prev) => [newEvent, ...prev.slice(0, 7)]);
    setLatencyHistory((prev) => [...prev.slice(1), Math.floor(10 + Math.random() * 15)]);

    setTimeout(() => {
      setIsSimulatingEvent(false);
    }, 600);
  };

  // Handler: Simulate SAN alarm/warning event
  const handleSimulateAlarm = () => {
    setIsSimulatingEvent(true);
    const now = new Date();
    const timeStr = `${now.toTimeString().split(" ")[0]}.${Math.floor(Math.random() * 900 + 100)}`;

    const newAlarm: TelemetryLogEntry = {
      id: `alarm-${Date.now()}`,
      timestamp: timeStr,
      level: "WARN",
      source: "brocade-san-fabric",
      message: `[ALERT TEST] Port 4/12 buffer-to-buffer credit hold (92% threshold). Automatic daemon classification routed to FastAPI alert queue.`,
    };

    setLogs((prev) => [newAlarm, ...prev.slice(0, 7)]);

    setTimeout(() => {
      setIsSimulatingEvent(false);
    }, 600);
  };

  return (
    <section id="hud" className="py-16 sm:py-20 md:py-24 lg:py-28 border-b border-slate-200 dark:border-white/[0.08] relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        variants={containerVariants}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 pb-6 border-b border-slate-200 dark:border-white/[0.08] gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-600 dark:text-cyan-400 mb-2">
              <Activity className="w-4 h-4 text-cyan-600 dark:text-cyan-400 animate-pulse" />
              <span>04 // SYSTEMS ARCHITECTURE &amp; LIVE TELEMETRY LAB</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Enterprise Observability &amp; <span className="text-gradient-cyan">Telemetry Lab</span>
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Interactive workbench demonstrating high-throughput telemetry pipelines engineered for enterprise SAN storage (NetApp, Dell EMC, Brocade) at Wipro, coupled with live Next.js portfolio application diagnostics.
            </p>
          </div>

          {/* Controls and Perspective Switcher */}
          <div className="mt-6 lg:mt-0 flex flex-col sm:flex-row sm:items-center gap-3">
            {/* View Mode Tabs */}
            <div className="p-1 sm:p-1.5 bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/[0.08] rounded-2xl sm:rounded-full flex flex-wrap sm:flex-nowrap items-center gap-1 relative">
              <button
                onClick={() => setActiveTab("pipeline")}
                className={`relative isolate px-3.5 py-1.5 rounded-xl sm:rounded-full font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors duration-200 cursor-pointer ${
                  activeTab === "pipeline"
                    ? "text-white"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                {activeTab === "pipeline" && (
                  <motion.div
                    layoutId="activeHudPerspectiveTab"
                    className="absolute inset-0 rounded-xl sm:rounded-full bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 shadow-md shadow-cyan-500/25 z-0 pointer-events-none"
                    transition={springTransition}
                  />
                )}
                <Layers className="w-3.5 h-3.5 relative z-10" />
                <span className="relative z-10">Enterprise Pipeline</span>
              </button>
              <button
                onClick={() => setActiveTab("runtime")}
                className={`relative isolate px-3.5 py-1.5 rounded-xl sm:rounded-full font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors duration-200 cursor-pointer ${
                  activeTab === "runtime"
                    ? "text-white"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                {activeTab === "runtime" && (
                  <motion.div
                    layoutId="activeHudPerspectiveTab"
                    className="absolute inset-0 rounded-xl sm:rounded-full bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 shadow-md shadow-cyan-500/25 z-0 pointer-events-none"
                    transition={springTransition}
                  />
                )}
                <Server className="w-3.5 h-3.5 relative z-10" />
                <span className="relative z-10">Portfolio Runtime</span>
              </button>
              <button
                onClick={() => setActiveTab("topology3d")}
                className={`relative isolate px-3.5 py-1.5 rounded-xl sm:rounded-full font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors duration-200 cursor-pointer ${
                  activeTab === "topology3d"
                    ? "text-white"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                {activeTab === "topology3d" && (
                  <motion.div
                    layoutId="activeHudPerspectiveTab"
                    className="absolute inset-0 rounded-xl sm:rounded-full bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 shadow-md shadow-cyan-500/25 z-0 pointer-events-none"
                    transition={springTransition}
                  />
                )}
                <Sparkles className="w-3.5 h-3.5 relative z-10 text-cyan-400 dark:text-cyan-300" />
                <span className="relative z-10">3D SAN Topology</span>
              </button>
            </div>

            {/* Quick Action Refresh */}
            <div className="flex items-center gap-2">
              <button
                onClick={fetchTelemetry}
                disabled={isRefreshing}
                className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 dark:bg-white/[0.04] dark:border-white/[0.1] dark:hover:border-cyan-500/50 font-mono text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-all disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed shadow-sm"
                title="Poll live API telemetry"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 ${isRefreshing ? "animate-spin" : ""}`} />
                <span>{isRefreshing ? "SAMPLING..." : "POLL_API"}</span>
              </button>
              <button
                onClick={() => setAutoSample(!autoSample)}
                className={`px-3 py-1.5 rounded-full border font-mono text-xs flex items-center gap-1.5 cursor-pointer transition-all ${
                  autoSample
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400"
                    : "bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-700 dark:bg-white/[0.02] dark:border-white/[0.08] dark:text-slate-500 dark:hover:text-slate-400"
                }`}
                title="Toggle real-time auto sampling (every 4.5s)"
              >
                <span className={`w-2 h-2 rounded-full ${autoSample ? "bg-emerald-500 dark:bg-emerald-400 animate-pulse" : "bg-slate-400 dark:bg-slate-600"}`} />
                <span>{autoSample ? "AUTO: 4.5s" : "PAUSED"}</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* PERSPECTIVE VIEWS WITH FRAMER MOTION TRANSITIONS          */}
        {/* ========================================================= */}
        <AnimatePresence initial={false} mode="wait">
          {activeTab === "pipeline" && (
            <motion.div
              key="pipeline-tab"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
              transition={panelTransition}
              className="space-y-6"
            >
            {/* Top Interactive Pipeline Flow */}
            <div className="glass-panel p-5 sm:p-6 md:p-7 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-white/[0.08]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-slate-200 dark:border-white/[0.08] gap-2">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold text-slate-800 dark:text-slate-200">
                  <Network className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>DISTRIBUTED_INGESTION_TOPOLOGY (CLICK STAGE TO INSPECT)</span>
                </div>
                <div className="flex items-center gap-3 font-mono text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                    <span>PIPELINE HEALTH: 100% SLA</span>
                  </span>
                  <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
                  <span className="text-indigo-600 dark:text-indigo-400 hidden sm:inline">RHEL 9.x KERNEL</span>
                </div>
              </div>

              {/* Animated Telemetry Stream Flow Indicator (GPU-Composited Transform) */}
              <div className="relative mb-4 h-1.5 w-full bg-slate-200/70 dark:bg-white/[0.05] rounded-full overflow-hidden">
                {!shouldReduceMotion && (
                  <motion.div
                    className="absolute top-0 bottom-0 left-0 w-28 bg-gradient-to-r from-transparent via-cyan-400 to-indigo-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.6)] transform-gpu will-change-transform"
                    animate={{ x: ["-120%", "1200%"] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </div>

              {/* 4 Clickable Pipeline Stages with Framer Motion Sliding Indicator */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {PIPELINE_STAGES.map((stage) => {
                  const isSelected = selectedStage.id === stage.id;
                  return (
                    <motion.div
                      key={stage.id}
                      onClick={() => setSelectedStage(stage)}
                      whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.01 }}
                      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.15 }}
                      className={`relative isolate p-4 rounded-xl border text-left transition-all cursor-pointer overflow-hidden group ${
                        isSelected
                          ? "bg-indigo-50/90 border-indigo-500/80 dark:bg-indigo-950/40 dark:border-indigo-500/80 shadow-md shadow-indigo-600/10 dark:shadow-indigo-600/20"
                          : "bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:bg-slate-100/80 dark:bg-white/[0.02] dark:border-white/[0.06] dark:hover:border-white/[0.14] dark:hover:bg-white/[0.04]"
                      }`}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="activeHudStageTab"
                          className="absolute inset-0 rounded-xl border-2 border-indigo-500 bg-indigo-500/10 dark:bg-indigo-500/15 pointer-events-none z-0 shadow-sm"
                          transition={springTransition}
                        />
                      )}
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-indigo-700 dark:bg-white/[0.06] dark:text-indigo-300">
                            STAGE {stage.step}
                          </span>
                          <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                            {isSelected ? "ACTIVE" : "INSPECT"}
                          </span>
                        </div>
                        <div className="font-mono text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-200 transition-colors">
                          {stage.name}
                        </div>
                        <div className="font-mono text-xs text-indigo-600 dark:text-indigo-400/90 mt-0.5">
                          {stage.subtitle}
                        </div>
                        <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
                          <span className="text-slate-500 dark:text-slate-400">{stage.throughput}</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{stage.latency}</span>
                        </div>
                      </div>

                      {/* Active indicator bar */}
                      {isSelected && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 z-10" />
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Dynamic Stage Inspector Drawer */}
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={selectedStage.id}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
                  transition={panelTransition}
                  className="mt-5 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50/90 dark:bg-black/50 border border-slate-200 dark:border-white/[0.08] relative"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-indigo-600 dark:text-indigo-400 font-bold">
                          [INSPECTOR] STAGE {selectedStage.step}: {selectedStage.name.toUpperCase()}
                        </span>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20">
                          {selectedStage.protocol}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {selectedStage.description}
                      </p>
                      <div className="pt-2 flex flex-wrap gap-2">
                        {selectedStage.highlights.map((h, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-[11px] text-slate-700 dark:text-slate-300 font-mono shadow-sm"
                          >
                            <CheckCircle2 className="w-3 h-3 text-indigo-600 dark:text-indigo-400 shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="md:w-64 shrink-0 p-3 sm:p-3.5 rounded-xl bg-white dark:bg-black/60 border border-slate-200 dark:border-white/[0.08] font-mono text-xs space-y-1.5 shadow-sm">
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider">Operational Target</div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Throughput:</span>
                        <span className="text-indigo-600 dark:text-indigo-300 font-semibold">{selectedStage.throughput}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Queue Latency:</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{selectedStage.latency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Concurrency:</span>
                        <span className="text-slate-800 dark:text-slate-200">AsyncIO Worker Pool</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Split: Monitored Storage Fabrics + Interactive Live Event Console */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Monitored Enterprise SAN Fabric Nodes (7 cols) */}
              <div className="lg:col-span-7 glass-panel p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-white/[0.08] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-3 mb-4">
                    <div className="flex items-center gap-2 font-mono text-xs font-semibold text-slate-800 dark:text-slate-200">
                      <HardDrive className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span>MONITORED_ENTERPRISE_FABRICS (CLICK TO INSPECT)</span>
                    </div>
                    <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold">4 / 4 HEALTHY</span>
                  </div>

                  {/* Fabric Node Cards with Framer Motion Sliding Indicator */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {FABRIC_NODES.map((node) => {
                      const isSelected = selectedNode.id === node.id;
                      return (
                        <motion.div
                          key={node.id}
                          onClick={() => setSelectedNode(node)}
                          whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.01 }}
                          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.15 }}
                          className={`relative isolate p-3.5 rounded-xl border transition-all cursor-pointer group ${
                            isSelected
                              ? "bg-indigo-50/90 border-indigo-500/80 dark:bg-indigo-950/40 dark:border-indigo-500/80 shadow-sm"
                              : "bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:bg-slate-100/80 dark:bg-white/[0.02] dark:border-white/[0.06] dark:hover:border-white/[0.14] dark:hover:bg-white/[0.04]"
                          }`}
                        >
                          {isSelected && (
                            <motion.div
                              layoutId="activeHudFabricNode"
                              className="absolute inset-0 rounded-xl border-2 border-indigo-500 bg-indigo-500/10 dark:bg-indigo-500/15 pointer-events-none z-0 shadow-sm"
                              transition={springTransition}
                            />
                          )}
                          <div className="relative z-10">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase">
                                {node.vendor}
                              </span>
                              <span className="font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                                {node.status}
                              </span>
                            </div>
                            <div className="font-mono text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-200 transition-colors">
                              {node.name}
                            </div>
                            <div className="font-mono text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                              {node.role}
                            </div>
                            <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-white/[0.06] font-mono text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 flex justify-between">
                              <span>{node.primaryMetric}</span>
                              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Selected Node Inspector Detail */}
                  <AnimatePresence initial={false} mode="wait">
                    <motion.div
                      key={selectedNode.id}
                      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
                      transition={panelTransition}
                      className="p-3.5 sm:p-4 rounded-xl bg-slate-50/90 dark:bg-black/50 border border-slate-200 dark:border-white/[0.06] space-y-2.5 font-mono text-xs"
                    >
                      <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.06] pb-2">
                        <span className="text-indigo-600 dark:text-indigo-400 font-bold">NODE: {selectedNode.name}</span>
                        <span className="text-[10px] text-slate-500">{selectedNode.details.protocol}</span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <div className="p-2 rounded bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.04]">
                          <span className="text-[10px] text-slate-500 uppercase block">Throughput</span>
                          <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">{selectedNode.details.throughput}</span>
                        </div>
                        <div className="p-2 rounded bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.04]">
                          <span className="text-[10px] text-slate-500 uppercase block">I/O Latency</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">{selectedNode.details.ioLatency}</span>
                        </div>
                        <div className="p-2 rounded bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.04]">
                          <span className="text-[10px] text-slate-500 uppercase block">Ports / Nodes</span>
                          <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">{selectedNode.details.portsOrNodes}</span>
                        </div>
                        <div className="p-2 rounded bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.04]">
                          <span className="text-[10px] text-slate-500 uppercase block">CRC Errors</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">{selectedNode.details.errorRate}</span>
                        </div>
                      </div>

                      <div className="pt-2 text-[11px] text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-white/[0.06] leading-relaxed">
                        <span className="text-slate-500 font-semibold">DIAGNOSTIC STATUS: </span>
                        {selectedNode.details.diagnostic}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/[0.08] font-mono text-[11px] text-slate-500 flex items-center justify-between">
                  <span>TELEMETRY POLLER: PYTHON ASYNC DAEMON</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold">SYNC FREQ: 1000ms</span>
                </div>
              </div>

              {/* Right Column: Live Streaming Telemetry Terminal & Generator (5 cols) */}
              <div className="lg:col-span-5 glass-panel p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-white/[0.08] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-3 mb-3">
                    <div className="flex items-center gap-2 font-mono text-xs font-semibold text-slate-800 dark:text-slate-200">
                      <TerminalIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span>STREAMING_EVENT_LOG</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                      <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">INGESTION ACTIVE</span>
                    </div>
                  </div>

                  {/* Interactive Simulation Action Buttons */}
                  <div className="flex items-center gap-2 mb-3">
                    <motion.button
                      onClick={handleSimulatePacket}
                      disabled={isSimulatingEvent}
                      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                      className="flex-1 px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-600/20 dark:hover:bg-indigo-600/30 border border-indigo-200 dark:border-indigo-500/40 font-mono text-[11px] font-semibold text-indigo-700 dark:text-indigo-300 flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                      title="Emit synthetic enterprise telemetry packet into pipeline"
                    >
                      <Zap className={`w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 ${isSimulatingEvent ? "animate-bounce" : ""}`} />
                      <span>EMIT_TRAP_PACKET</span>
                    </motion.button>
                    <motion.button
                      onClick={handleSimulateAlarm}
                      disabled={isSimulatingEvent}
                      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                      className="flex-1 px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 dark:bg-amber-500/10 dark:hover:bg-amber-500/20 border border-amber-200 dark:border-amber-500/30 font-mono text-[11px] font-semibold text-amber-700 dark:text-amber-300 flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                      title="Simulate buffer credit threshold alert"
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      <span>TEST_SAN_ALERT</span>
                    </motion.button>
                  </div>

                  {/* Terminal Log Stream Box (Authentic dark console for optimal log contrast in both themes) */}
                  <div className="p-3 sm:p-4 rounded-xl bg-[#080b14] border border-slate-300 dark:border-white/[0.08] font-mono text-[11px] space-y-2 h-[260px] sm:h-[280px] overflow-y-auto scrollbar-thin shadow-inner">
                    {logs.map((log) => {
                      const levelColors = {
                        INFO: "text-blue-400 bg-blue-500/10 border-blue-500/20",
                        METRIC: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
                        WARN: "text-amber-400 bg-amber-500/10 border-amber-500/20",
                        INGEST: "text-purple-400 bg-purple-500/10 border-purple-500/20",
                      };

                      return (
                        <div key={log.id} className="leading-snug">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-slate-500 text-[10px]">{log.timestamp}</span>
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${
                                levelColors[log.level]
                              }`}
                            >
                              {log.level}
                            </span>
                            <span className="text-slate-400 text-[10px]">{log.source}</span>
                          </div>
                          <p className="text-slate-300 pl-1 text-[11px] font-mono break-words">
                            {log.message}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>BUFFER: 8/8 SLOTS</span>
                  <button
                    onClick={() => setLogs(INITIAL_LOGS)}
                    className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors"
                  >
                    RESET_LOGS
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
          )}

          {activeTab === "runtime" && (
            <motion.div
              key="runtime-tab"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
              transition={panelTransition}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
            {/* Live Metrics Matrix */}
            <div className="lg:col-span-2 glass-panel p-5 sm:p-6 md:p-7 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-white/[0.08]">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-3 mb-5">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold text-slate-800 dark:text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>NEXTJS_APP_ROUTER_RUNTIME_STATUS</span>
                </div>
                <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                  STATUS: 200 OK
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06]">
                  <div className="text-[10px] text-slate-500 uppercase">Application Runtime</div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm mt-1">Next.js 16.3.4 (App Router)</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">React 19 Server Components</div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06]">
                  <div className="text-[10px] text-slate-500 uppercase">Database Persistence</div>
                  <div className="font-bold text-cyan-700 dark:text-cyan-300 text-sm mt-1">
                    {telemetry?.metrics.databaseStatus === "connected"
                      ? "MongoDB Atlas (Online)"
                      : "Telemetry Seed Cache (Instant)"}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {telemetry?.metrics.databaseStatus === "connected"
                      ? "Mongoose ODM Singleton Pool"
                      : "Resilient Offline In-Memory Fallback"}
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06]">
                  <div className="text-[10px] text-slate-500 uppercase">Server Heap Memory</div>
                  <div className="font-bold text-purple-700 dark:text-purple-300 text-sm mt-1">
                    {telemetry?.metrics.memoryUsage || "38MB / 54MB"}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Node.js process memoryUsage()</div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06]">
                  <div className="text-[10px] text-slate-500 uppercase">Environment &amp; Target</div>
                  <div className="font-bold text-indigo-700 dark:text-indigo-300 text-sm mt-1">
                    {telemetry?.environment === "production" ? "Production (Netlify Edge)" : "Development (Local Node)"}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Turborepo 2.10.12 Workspaces
                  </div>
                </div>
              </div>

              {/* Latency History Sparkline */}
              <div className="mt-6 pt-5 border-t border-slate-200 dark:border-white/[0.08]">
                <div className="text-xs font-mono text-slate-700 dark:text-slate-300 mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span>CLIENT_ROUNDTRIP_LATENCY_SPARKLINE (LAST 10 SAMPLES)</span>
                  </div>
                  <span className="text-cyan-700 dark:text-cyan-400 font-bold">
                    Latest: {latencyHistory[latencyHistory.length - 1]}ms
                  </span>
                </div>

                <div className="h-28 sm:h-32 flex items-end gap-2 bg-slate-50/90 dark:bg-black/60 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-white/[0.08]">
                  {latencyHistory.map((val, idx) => {
                    const pct = Math.min(100, Math.max(15, (val / 40) * 100));
                    return (
                      <div
                        key={idx}
                        className="flex-1 h-full flex flex-col justify-end items-center gap-1.5 group relative cursor-pointer"
                      >
                        <div className="w-full flex-1 flex items-end">
                          <motion.div
                            initial={shouldReduceMotion ? false : { height: 0 }}
                            animate={{ height: `${pct}%` }}
                            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.35, ease: "easeOut" }}
                            className="w-full bg-gradient-to-t from-cyan-600 via-blue-500 to-indigo-500 group-hover:from-cyan-400 group-hover:to-indigo-300 rounded-t transition-all min-h-[4px] shadow-sm"
                          />
                        </div>
                        <span className="font-mono text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200 shrink-0">
                          {val}ms
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-slate-500">
                  <span>Sample Window: ~45 seconds</span>
                  <span>Average Ping: ~16ms</span>
                </div>
              </div>
            </div>

            {/* Right Column: Raw JSON Telemetry Inspector */}
            <div className="glass-panel p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-white/[0.08] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-3 mb-3">
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold text-slate-800 dark:text-slate-200">
                    <Code2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span>RAW_API_PAYLOAD</span>
                  </div>
                  <span className="font-mono text-[10px] text-cyan-600 dark:text-cyan-400">/api/v1/telemetry</span>
                </div>

                {/* Code format json preview (high contrast console container) */}
                <div className="p-3 sm:p-4 rounded-xl bg-[#080b14] border border-slate-300 dark:border-white/[0.08] font-mono text-[11px] text-cyan-200 overflow-x-auto h-[260px] sm:h-[280px] scrollbar-thin shadow-inner">
                  <pre>
                    {JSON.stringify(
                      {
                        status: "200 OK",
                        timestamp: telemetry?.timestamp || new Date().toISOString(),
                        uptimeSeconds: telemetry?.uptime || 1240,
                        metrics: {
                          databaseStatus: telemetry?.metrics.databaseStatus || "in-memory-fallback",
                          memoryUsage: telemetry?.metrics.memoryUsage || "38MB / 54MB",
                          latencyMs: latencyHistory[latencyHistory.length - 1],
                          activeNodes: 4,
                          healthScore: 99.9,
                        },
                      },
                      null,
                      2
                    )}
                  </pre>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/[0.08] font-mono text-[11px] text-slate-500 flex items-center justify-between">
                <span>LAST POLL: {lastSampleTime}</span>
                <button
                  onClick={fetchTelemetry}
                  disabled={isRefreshing}
                  className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-semibold cursor-pointer disabled:opacity-50"
                >
                  TRIGGER_PROBE
                </button>
              </div>
            </div>
          </motion.div>
          )}

          {activeTab === "topology3d" && (
            <motion.div
              key="topology3d-tab"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
              transition={panelTransition}
              className="space-y-4"
            >
              <HeroTelemetryCanvas />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
