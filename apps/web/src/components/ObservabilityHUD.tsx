"use client";

import React, { useState, useEffect, useCallback } from "react";
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
} from "lucide-react";
import type { ITelemetry } from "@portfolio/shared";

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
      "Asynchronous API gateway and reactive dashboards delivering low-latency observability metrics to operations teams and telemetry consumers.",
    highlights: [
      "Asynchronous endpoint caching with Pydantic schema validation",
      "High-density Grafana telemetry dashboards with live SAN port heatmaps",
      "Configurable webhook dispatch to Slack, PagerDuty, and SIEM relays",
    ],
  },
];

const FABRIC_NODES: FabricNode[] = [
  {
    id: "netapp",
    name: "NetApp ONTAP Cluster",
    vendor: "NetApp Enterprise",
    role: "Primary NAS/SAN Unified Storage",
    status: "ONLINE",
    primaryMetric: "0.8ms I/O // 64k IOPS",
    details: {
      protocol: "NFSv4 / FCP / iSCSI",
      throughput: "2.8 GB/s Read / 1.6 GB/s Write",
      ioLatency: "0.78ms average queue latency",
      portsOrNodes: "8 Cluster Nodes (HA Pairs)",
      errorRate: "0 CRC / 0 Dropped Packets",
      diagnostic: "WAFL filesystem NVRAM journal healthy. Snapshot schedules synchronized.",
    },
  },
  {
    id: "powerstore",
    name: "Dell EMC PowerStore",
    vendor: "Dell Technologies",
    role: "NVMe-oF High-Density Block Tier",
    status: "ONLINE",
    primaryMetric: "48k IOPS // 4.2:1 Dedupe",
    details: {
      protocol: "NVMe over Fibre Channel (FC-NVMe)",
      throughput: "3.4 GB/s Aggregate Flow",
      ioLatency: "0.42ms Sub-Millisecond",
      portsOrNodes: "4 Appliance Nodes (Active-Active)",
      errorRate: "Zero SCSI Aborts",
      diagnostic: "Dynamic Resiliency Engine active. Hardware offload inline compression operating at 4.2:1.",
    },
  },
  {
    id: "hitachi",
    name: "Hitachi VSP Enterprise",
    vendor: "Hitachi Vantara",
    role: "Mission-Critical Tier-0 Storage",
    status: "OPTIMAL",
    primaryMetric: "Active-Active GAD // 100% SLA",
    details: {
      protocol: "32Gbps Fibre Channel",
      throughput: "4.1 GB/s Peak Burst",
      ioLatency: "0.35ms Ultra-Low Latency",
      portsOrNodes: "Global-Active Device Cluster",
      errorRate: "0 Parity Check Errors",
      diagnostic: "Synchronous true-copy replication lag at 0ms. Microcode revision verified stable.",
    },
  },
  {
    id: "brocade",
    name: "Brocade SAN Fabric A/B",
    vendor: "Broadcom / Brocade",
    role: "Core Datacenter Fibre Channel SAN",
    status: "OPTIMAL",
    primaryMetric: "128 Ports // 0 CRC Drops",
    details: {
      protocol: "Fibre Channel (FC-PI-6) 32Gbps",
      throughput: "256 Gbps ISL Trunk Bandwidth",
      ioLatency: "1.2 microseconds switch latency",
      portsOrNodes: "128 Monitored F-Ports & E-Ports",
      errorRate: "0 CRC Drops / 0 Link Resets",
      diagnostic: "Buffer-to-buffer credits healthy across all ISL trunks. Zero frame discard incidents.",
    },
  },
];

const INITIAL_LOGS: TelemetryLogEntry[] = [
  {
    id: "log-1",
    timestamp: "23:14:02.140",
    level: "INFO",
    source: "rhel-telemetry-daemon",
    message: "SNMP & Syslog poller cycle completed across 4 enterprise storage clusters (18ms elapsed).",
  },
  {
    id: "log-2",
    timestamp: "23:14:03.420",
    level: "METRIC",
    source: "brocade-san-fabric",
    message: "ISL trunk FC-Port 8/1-4 aggregated bandwidth: 218 Gbps (85.1% utilization, 0 CRC frame drops).",
  },
  {
    id: "log-3",
    timestamp: "23:14:04.090",
    level: "INGEST",
    source: "netapp-ontap-node01",
    message: "Volume vol_analytics_01 telemetry parsed: 64,200 IOPS, 0.78ms average latency, WAFL NVRAM synced.",
  },
  {
    id: "log-4",
    timestamp: "23:14:05.810",
    level: "INFO",
    source: "influxdb-writer",
    message: "Batched 4,800 metrics committed to shard retention tier 'telemetry_subsecond_30d'.",
  },
];

export const ObservabilityHUD: React.FC = () => {
  // Navigation tabs: Enterprise Architecture Simulation vs. Portfolio Live Runtime
  const [activeTab, setActiveTab] = useState<"pipeline" | "runtime">("pipeline");
  const [selectedStage, setSelectedStage] = useState<PipelineStage>(PIPELINE_STAGES[0]);
  const [selectedNode, setSelectedNode] = useState<FabricNode>(FABRIC_NODES[0]);

  // Live Portfolio Telemetry State
  const [telemetry, setTelemetry] = useState<ITelemetry | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [latencyHistory, setLatencyHistory] = useState<number[]>([14, 18, 12, 16, 21, 15, 13, 19, 14, 12]);
  const [lastSampleTime, setLastSampleTime] = useState<string>("Just now");

  // Interactive Live Stream Logs State
  const [logs, setLogs] = useState<TelemetryLogEntry[]>(INITIAL_LOGS);
  const [isSimulatingEvent, setIsSimulatingEvent] = useState(false);
  const [autoSample, setAutoSample] = useState(true);

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
    <section id="hud" className="py-16 sm:py-20 md:py-24 lg:py-28 border-b border-white/[0.08] relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 pb-6 border-b border-white/[0.08] gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 mb-2">
              <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>04 // SYSTEMS ARCHITECTURE &amp; LIVE TELEMETRY LAB</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Enterprise Observability &amp; Telemetry Engine
            </h2>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Interactive workbench demonstrating high-throughput telemetry pipelines engineered for enterprise SAN storage (NetApp, Dell EMC, Brocade) at Wipro, coupled with live Next.js portfolio application diagnostics.
            </p>
          </div>

          {/* Controls and Perspective Switcher */}
          <div className="mt-6 lg:mt-0 flex flex-col sm:flex-row sm:items-center gap-3">
            {/* View Mode Tabs */}
            <div className="p-1 sm:p-1.5 bg-black/40 border border-white/[0.08] rounded-2xl sm:rounded-full flex flex-wrap sm:flex-nowrap items-center gap-1">
              <button
                onClick={() => setActiveTab("pipeline")}
                className={`px-3.5 py-1.5 rounded-xl sm:rounded-full font-mono text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === "pipeline"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Enterprise Pipeline</span>
              </button>
              <button
                onClick={() => setActiveTab("runtime")}
                className={`px-3.5 py-1.5 rounded-xl sm:rounded-full font-mono text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === "runtime"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Server className="w-3.5 h-3.5" />
                <span>Portfolio Runtime</span>
              </button>
            </div>

            {/* Quick Action Refresh */}
            <div className="flex items-center gap-2">
              <button
                onClick={fetchTelemetry}
                disabled={isRefreshing}
                className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] hover:border-cyan-500/50 font-mono text-xs text-slate-300 flex items-center gap-1.5 transition-all disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
                title="Poll live API telemetry"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isRefreshing ? "animate-spin" : ""}`} />
                <span>{isRefreshing ? "SAMPLING..." : "POLL_API"}</span>
              </button>
              <button
                onClick={() => setAutoSample(!autoSample)}
                className={`px-3 py-1.5 rounded-full border font-mono text-xs flex items-center gap-1.5 cursor-pointer transition-all ${
                  autoSample
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                    : "bg-white/[0.02] border-white/[0.08] text-slate-500 hover:text-slate-400"
                }`}
                title="Toggle real-time auto sampling (every 4.5s)"
              >
                <span className={`w-2 h-2 rounded-full ${autoSample ? "bg-emerald-400 animate-pulse" : "bg-slate-600"}`} />
                <span>{autoSample ? "AUTO: 4.5s" : "PAUSED"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* VIEW 1: ENTERPRISE TELEMETRY PIPELINE (ARCHITECTURE LAB)  */}
        {/* ========================================================= */}
        {activeTab === "pipeline" && (
          <div className="space-y-6">
            {/* Top Interactive Pipeline Flow */}
            <div className="glass-panel p-5 sm:p-6 md:p-7 rounded-2xl sm:rounded-3xl border border-white/[0.08]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-white/[0.08] gap-2">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold text-slate-200">
                  <Network className="w-4 h-4 text-cyan-400" />
                  <span>DISTRIBUTED_INGESTION_TOPOLOGY (CLICK STAGE TO INSPECT)</span>
                </div>
                <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>PIPELINE HEALTH: 100% SLA</span>
                  </span>
                  <span className="hidden sm:inline text-slate-700">|</span>
                  <span className="text-indigo-400 hidden sm:inline">RHEL 9.x KERNEL</span>
                </div>
              </div>

              {/* 4 Clickable Pipeline Stages */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {PIPELINE_STAGES.map((stage) => {
                  const isSelected = selectedStage.id === stage.id;
                  return (
                    <div
                      key={stage.id}
                      onClick={() => setSelectedStage(stage)}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                        isSelected
                          ? "bg-indigo-950/40 border-indigo-500 shadow-md shadow-indigo-600/20"
                          : "bg-white/[0.02] border-white/[0.06] hover:border-white/[0.14] hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-white/[0.06] text-indigo-300">
                          STAGE {stage.step}
                        </span>
                        <span className="font-mono text-[10px] text-slate-400 group-hover:text-indigo-300 transition-colors">
                          {isSelected ? "ACTIVE" : "INSPECT"}
                        </span>
                      </div>
                      <div className="font-mono text-sm font-bold text-white group-hover:text-indigo-200 transition-colors">
                        {stage.name}
                      </div>
                      <div className="font-mono text-xs text-indigo-400/90 mt-0.5">
                        {stage.subtitle}
                      </div>
                      <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
                        <span className="text-slate-400">{stage.throughput}</span>
                        <span className="text-emerald-400 font-semibold">{stage.latency}</span>
                      </div>

                      {/* Active indicator bar */}
                      {isSelected && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Dynamic Stage Inspector Drawer */}
              <div className="mt-5 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-black/50 border border-white/[0.08] relative">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-indigo-400 font-bold">
                        [INSPECTOR] STAGE {selectedStage.step}: {selectedStage.name.toUpperCase()}
                      </span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                        {selectedStage.protocol}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {selectedStage.description}
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2">
                      {selectedStage.highlights.map((h, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.06] text-[11px] text-slate-300 font-mono"
                        >
                          <CheckCircle2 className="w-3 h-3 text-indigo-400 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="md:w-64 shrink-0 p-3 sm:p-3.5 rounded-xl bg-black/60 border border-white/[0.08] font-mono text-xs space-y-1.5">
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider">Operational Target</div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Throughput:</span>
                      <span className="text-indigo-300 font-semibold">{selectedStage.throughput}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Queue Latency:</span>
                      <span className="text-emerald-400 font-semibold">{selectedStage.latency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Concurrency:</span>
                      <span className="text-slate-200">AsyncIO Worker Pool</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Split: Monitored Storage Fabrics + Interactive Live Event Console */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Monitored Enterprise SAN Fabric Nodes (7 cols) */}
              <div className="lg:col-span-7 glass-panel p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <div className="flex items-center gap-2 font-mono text-xs font-semibold text-slate-200">
                      <HardDrive className="w-4 h-4 text-indigo-400" />
                      <span>MONITORED_ENTERPRISE_FABRICS (CLICK TO INSPECT)</span>
                    </div>
                    <span className="font-mono text-xs text-emerald-400 font-semibold">4 / 4 HEALTHY</span>
                  </div>

                  {/* Fabric Node Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {FABRIC_NODES.map((node) => {
                      const isSelected = selectedNode.id === node.id;
                      return (
                        <div
                          key={node.id}
                          onClick={() => setSelectedNode(node)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer group ${
                            isSelected
                              ? "bg-indigo-950/40 border-indigo-500 shadow-sm"
                              : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-mono text-[10px] text-slate-400 font-semibold uppercase">
                              {node.vendor}
                            </span>
                            <span className="font-mono text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              {node.status}
                            </span>
                          </div>
                          <div className="font-mono text-xs font-bold text-white group-hover:text-indigo-200 transition-colors">
                            {node.name}
                          </div>
                          <div className="font-mono text-[11px] text-slate-400 truncate mt-0.5">
                            {node.role}
                          </div>
                          <div className="mt-2.5 pt-2 border-t border-slate-800/80 font-mono text-[11px] font-semibold text-indigo-400 flex justify-between">
                            <span>{node.primaryMetric}</span>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Selected Node Inspector Detail */}
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-xs space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-indigo-300 font-bold">
                        DEVICE INSPECTION: {selectedNode.name}
                      </span>
                      <span className="text-slate-400 text-[11px]">{selectedNode.details.protocol}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                      <div>
                        <span className="text-slate-500">I/O Latency: </span>
                        <span className="text-slate-200 font-semibold">{selectedNode.details.ioLatency}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Throughput: </span>
                        <span className="text-slate-200 font-semibold">{selectedNode.details.throughput}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Node Topology: </span>
                        <span className="text-slate-200 font-semibold">{selectedNode.details.portsOrNodes}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Interface Errors: </span>
                        <span className="text-emerald-400 font-semibold">{selectedNode.details.errorRate}</span>
                      </div>
                    </div>

                    <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-800/80 leading-relaxed">
                      <span className="text-slate-500 font-semibold">DIAGNOSTIC STATUS: </span>
                      {selectedNode.details.diagnostic}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 font-mono text-[11px] text-slate-500 flex items-center justify-between">
                  <span>TELEMETRY POLLER: PYTHON ASYNC DAEMON</span>
                  <span className="text-indigo-400 font-semibold">SYNC FREQ: 1000ms</span>
                </div>
              </div>

              {/* Right Column: Live Streaming Telemetry Terminal & Generator (5 cols) */}
              <div className="lg:col-span-5 glass-panel p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                    <div className="flex items-center gap-2 font-mono text-xs font-semibold text-slate-200">
                      <TerminalIcon className="w-4 h-4 text-indigo-400" />
                      <span>STREAMING_EVENT_LOG</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-mono text-[10px] text-emerald-400">INGESTION ACTIVE</span>
                    </div>
                  </div>

                  {/* Interactive Simulation Action Buttons */}
                  <div className="flex items-center gap-2 mb-3">
                    <button
                      onClick={handleSimulatePacket}
                      disabled={isSimulatingEvent}
                      className="flex-1 px-2.5 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 font-mono text-[11px] font-semibold text-indigo-300 flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                      title="Emit synthetic enterprise telemetry packet into pipeline"
                    >
                      <Zap className={`w-3.5 h-3.5 text-indigo-400 ${isSimulatingEvent ? "animate-bounce" : ""}`} />
                      <span>EMIT_TRAP_PACKET</span>
                    </button>
                    <button
                      onClick={handleSimulateAlarm}
                      disabled={isSimulatingEvent}
                      className="flex-1 px-2.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 font-mono text-[11px] font-semibold text-amber-300 flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                      title="Simulate buffer credit threshold alert"
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      <span>TEST_SAN_ALERT</span>
                    </button>
                  </div>

                  {/* Terminal Log Stream Box */}
                  <div className="p-3 rounded-lg bg-black/80 border border-slate-800 font-mono text-[11px] space-y-2 h-[260px] overflow-y-auto scrollbar-thin">
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

                <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>BUFFER: 8/8 SLOTS</span>
                  <button
                    onClick={() => setLogs(INITIAL_LOGS)}
                    className="text-slate-400 hover:text-white cursor-pointer transition-colors"
                  >
                    RESET_LOGS
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 2: PORTFOLIO LIVE RUNTIME (NEXT.JS + MONGO TELEMETRY) */}
        {/* ========================================================= */}
        {activeTab === "runtime" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Live Metrics Matrix */}
            <div className="lg:col-span-2 glass-panel p-6 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-5">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-indigo-400" />
                  <span>NEXTJS_APP_ROUTER_RUNTIME_STATUS</span>
                </div>
                <span className="font-mono text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  STATUS: 200 OK
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase">Application Runtime</div>
                  <div className="font-bold text-white text-sm mt-1">Next.js 16.3.4 (App Router)</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">React 19 Server Components</div>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase">Database Persistence</div>
                  <div className="font-bold text-cyan-300 text-sm mt-1">
                    {telemetry?.metrics.databaseStatus === "connected"
                      ? "MongoDB Atlas (Online)"
                      : "Telemetry Seed Cache (Instant)"}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {telemetry?.metrics.databaseStatus === "connected"
                      ? "Mongoose ODM Singleton Pool"
                      : "Resilient Offline In-Memory Fallback"}
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase">Server Heap Memory</div>
                  <div className="font-bold text-purple-300 text-sm mt-1">
                    {telemetry?.metrics.memoryUsage || "38MB / 54MB"}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Node.js process memoryUsage()</div>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase">Environment &amp; Target</div>
                  <div className="font-bold text-indigo-300 text-sm mt-1">
                    {telemetry?.environment === "production" ? "Production (Netlify Edge)" : "Development (Local Node)"}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Turborepo 2.10.12 Workspaces
                  </div>
                </div>
              </div>

              {/* Latency History Sparkline */}
              <div className="mt-6 pt-5 border-t border-slate-800">
                <div className="text-xs font-mono text-slate-300 mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-indigo-400" />
                    <span>CLIENT_ROUNDTRIP_LATENCY_SPARKLINE (LAST 10 SAMPLES)</span>
                  </div>
                  <span className="text-indigo-400 font-bold">
                    Latest: {latencyHistory[latencyHistory.length - 1]}ms
                  </span>
                </div>

                <div className="h-16 flex items-end gap-2 bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                  {latencyHistory.map((val, idx) => {
                    const pct = Math.min(100, Math.max(15, (val / 40) * 100));
                    return (
                      <div
                        key={idx}
                        className="flex-1 flex flex-col items-center gap-1 group relative cursor-pointer"
                      >
                        <div
                          style={{ height: `${pct}%` }}
                          className="w-full bg-gradient-to-t from-blue-600/70 via-indigo-500 to-purple-500 group-hover:from-blue-400 group-hover:to-purple-300 rounded-t transition-all"
                        />
                        <span className="font-mono text-[9px] text-slate-500 group-hover:text-slate-200">
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
            <div className="glass-panel p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold text-slate-200">
                    <Code2 className="w-4 h-4 text-indigo-400" />
                    <span>RAW_API_PAYLOAD</span>
                  </div>
                  <span className="font-mono text-[10px] text-indigo-400">/api/v1/telemetry</span>
                </div>

                {/* Code format json preview */}
                <div className="p-3 rounded-lg bg-black/80 border border-slate-800 font-mono text-[11px] text-indigo-200 overflow-x-auto h-[260px] scrollbar-thin">
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

              <div className="mt-4 pt-3 border-t border-slate-800 font-mono text-[11px] text-slate-500 flex items-center justify-between">
                <span>LAST POLL: {lastSampleTime}</span>
                <button
                  onClick={fetchTelemetry}
                  disabled={isRefreshing}
                  className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer disabled:opacity-50"
                >
                  TRIGGER_PROBE
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
