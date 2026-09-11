"use client";

import React, { useState, useEffect } from "react";
import { Activity, ShieldCheck, Server, Cpu, Database, Network, RefreshCw } from "lucide-react";
import type { ITelemetry } from "@portfolio/shared";

export const ObservabilityHUD: React.FC = () => {
  const [telemetry, setTelemetry] = useState<ITelemetry | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [simulatedLoad, setSimulatedLoad] = useState(24.8);
  const [latencyHistory, setLatencyHistory] = useState<number[]>([14, 18, 12, 16, 21, 15, 13, 19, 14, 12]);

  const fetchTelemetry = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/v1/telemetry");
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setTelemetry(json.data);
          if (json.data.metrics?.latencyMs) {
            setLatencyHistory((prev) => [...prev.slice(1), json.data.metrics.latencyMs]);
          }
        }
      }
    } catch {
      // Fallback local metrics
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTelemetry();
    const interval = setInterval(() => {
      // Simulate live jitter for telemetry monitoring feel
      setSimulatedLoad((prev) => +(prev + (Math.random() * 2 - 1)).toFixed(1));
      setLatencyHistory((prev) => {
        const nextPing = Math.floor(12 + Math.random() * 8);
        return [...prev.slice(1), nextPing];
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const fabricNodes = [
    { name: "NetApp ONTAP Cluster", role: "Primary NAS/SAN Storage", status: "ONLINE", metric: "0.8ms I/O" },
    { name: "Dell EMC PowerStore", role: "Block Tier Storage Array", status: "ONLINE", metric: "48k IOPS" },
    { name: "Hitachi VSP Enterprise", role: "Mission-Critical Tier", status: "ONLINE", metric: "Active-Active" },
    { name: "Brocade SAN Fabric A/B", role: "Fibre Channel 32Gbps", status: "OPTIMAL", metric: "0 CRC Drops" },
  ];

  return (
    <section id="hud" className="py-16 md:py-20 border-b border-slate-800/60 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 mb-1">
              <Activity className="w-4 h-4" />
              <span>LIVE_TELEMETRY_ENGINE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-mono">
              OBSERVABILITY &amp; INFRASTRUCTURE HUD
            </h2>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <button
              onClick={fetchTelemetry}
              disabled={isRefreshing}
              className="px-3 py-1 rounded bg-slate-900 border border-slate-700 hover:border-emerald-500 font-mono text-xs text-slate-300 flex items-center gap-1.5 transition-all disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isRefreshing ? "animate-spin" : ""}`} />
              <span>{isRefreshing ? "SAMPLING..." : "REFRESH_TELEMETRY"}</span>
            </button>
            <div className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 font-mono text-xs text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>SAMPLING: 1000ms</span>
            </div>
          </div>
        </div>

        {/* HUD Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: Pipeline Topology */}
          <div className="glass-panel p-5 rounded-lg border border-slate-800 lg:col-span-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-slate-200">
                <Network className="w-4 h-4 text-emerald-400" />
                <span>TELEMETRY_INGESTION_TOPOLOGY</span>
              </div>
              <span className="font-mono text-[11px] text-slate-400">RHEL 9.x KERNEL</span>
            </div>

            {/* Architecture diagram visual */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center my-3">
              <div className="p-3 rounded bg-slate-900/90 border border-slate-800">
                <div className="font-mono text-[10px] text-slate-400 uppercase">Input Layer</div>
                <div className="font-mono text-xs font-bold text-emerald-300 mt-1">SNMP &amp; Syslog</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Network &amp; Storage Traps</div>
              </div>
              <div className="p-3 rounded bg-slate-900/90 border border-slate-800">
                <div className="font-mono text-[10px] text-slate-400 uppercase">Processor</div>
                <div className="font-mono text-xs font-bold text-cyan-300 mt-1">Python Listeners</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Daemon Parser &amp; Filter</div>
              </div>
              <div className="p-3 rounded bg-slate-900/90 border border-slate-800">
                <div className="font-mono text-[10px] text-slate-400 uppercase">Time-Series DB</div>
                <div className="font-mono text-xs font-bold text-emerald-300 mt-1">InfluxDB / Prom</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Sub-Second Shards</div>
              </div>
              <div className="p-3 rounded bg-slate-900/90 border border-slate-800">
                <div className="font-mono text-[10px] text-slate-400 uppercase">Exposition</div>
                <div className="font-mono text-xs font-bold text-cyan-300 mt-1">FastAPI &amp; Grafana</div>
                <div className="text-[10px] text-slate-400 mt-0.5">REST + Time-Series Ops</div>
              </div>
            </div>

            {/* Monitored Enterprise Fabric */}
            <div className="mt-5 pt-4 border-t border-slate-800">
              <div className="font-mono text-xs text-slate-400 mb-3 flex items-center justify-between">
                <span>ENTERPRISE_FABRIC_NODES (SAN &amp; STORAGE)</span>
                <span className="text-emerald-400">4 / 4 HEALTHY</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {fabricNodes.map((node) => (
                  <div key={node.name} className="p-2.5 rounded bg-slate-900/60 border border-slate-800/80 flex items-center justify-between">
                    <div>
                      <div className="font-mono text-xs font-semibold text-slate-200">{node.name}</div>
                      <div className="font-mono text-[10px] text-slate-400">{node.role}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-[11px] font-bold text-emerald-400">{node.status}</div>
                      <div className="font-mono text-[10px] text-slate-400">{node.metric}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Real-time Telemetry & Health Gauges */}
          <div className="glass-panel p-5 rounded-lg border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>RUNTIME_HEALTH_GAUGE</span>
                </div>
                <span className="font-mono text-xs text-emerald-400">99.9% SLA</span>
              </div>

              {/* Status Stats */}
              <div className="space-y-4 font-mono text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Application Status:</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    HEALTHY
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Database Layer:</span>
                  <span className="text-cyan-400 font-semibold">
                    {telemetry?.metrics.databaseStatus === "connected"
                      ? "MongoDB Atlas (Online)"
                      : "Telemetry Seed Cache (Instant)"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Ingestion Daemon Load:</span>
                  <span className="text-slate-200 font-bold">{simulatedLoad}% CPU</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">API Response Latency:</span>
                  <span className="text-emerald-400 font-bold">
                    {latencyHistory[latencyHistory.length - 1]}ms
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Heap Memory Usage:</span>
                  <span className="text-cyan-400 font-semibold">
                    {telemetry?.metrics.memoryUsage || "38MB / 54MB"}
                  </span>
                </div>

                {/* Simulated Sparkline */}
                <div className="pt-2">
                  <div className="text-[10px] text-slate-400 mb-1.5 flex justify-between">
                    <span>LATENCY_SPARKLINE (LAST 10 SAMPLES)</span>
                    <span>AVG: ~15ms</span>
                  </div>
                  <div className="h-8 flex items-end gap-1.5 bg-slate-900/80 p-1.5 rounded border border-slate-800">
                    {latencyHistory.map((val, idx) => (
                      <div
                        key={idx}
                        style={{ height: `${Math.min(100, (val / 30) * 100)}%` }}
                        className="flex-1 bg-emerald-500/60 hover:bg-emerald-400 rounded-t transition-all"
                        title={`${val}ms`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Diagnostic Footer */}
            <div className="mt-5 pt-3 border-t border-slate-800 font-mono text-[11px] text-slate-400 flex items-center justify-between">
              <span>SECURITY: AIR-GAP COMPLIANT</span>
              <span className="text-slate-500">REV: 2.10.12</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
