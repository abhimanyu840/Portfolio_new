"use client";

import React, { useState, useEffect } from "react";
import { Activity, ShieldCheck, RefreshCw, Network, Server, ArrowRight } from "lucide-react";
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
      setSimulatedLoad((prev) => +(prev + (Math.random() * 2 - 1)).toFixed(1));
      setLatencyHistory((prev) => {
        const nextPing = Math.floor(12 + Math.random() * 8);
        return [...prev.slice(1), nextPing];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const fabricNodes = [
    { name: "NetApp ONTAP Cluster", role: "Primary NAS/SAN Storage", status: "Healthy", metric: "0.8ms I/O latency" },
    { name: "Dell EMC PowerStore", role: "Block Tier Storage Array", status: "Healthy", metric: "48,000 IOPS" },
    { name: "Hitachi VSP Enterprise", role: "Mission-Critical Tier", status: "Healthy", metric: "Active-Active Mirror" },
    { name: "Brocade SAN Fabric A/B", role: "Fibre Channel 32Gbps", status: "Optimal", metric: "0 CRC Frame Drops" },
  ];

  return (
    <section id="architecture" className="py-16 md:py-24 border-b border-zinc-800/80 bg-zinc-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-zinc-800/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1.5 font-medium">
              <Network className="w-4 h-4 text-zinc-300" />
              <span>INFRASTRUCTURE ARCHITECTURE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Telemetry Pipelines &amp; Storage Fabrics
            </h2>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <button
              onClick={fetchTelemetry}
              disabled={isRefreshing}
              className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-mono text-zinc-300 hover:text-white flex items-center gap-1.5 transition-all disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-zinc-400 ${isRefreshing ? "animate-spin" : ""}`} />
              <span>{isRefreshing ? "Sampling..." : "Refresh Status"}</span>
            </button>
            <div className="px-2.5 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-xs font-mono text-emerald-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>All Systems Operational</span>
            </div>
          </div>
        </div>

        {/* HUD Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: Pipeline Topology */}
          <div className="card-subtle p-6 rounded-xl lg:col-span-2">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-white font-mono">
                <Server className="w-4 h-4 text-zinc-400" />
                <span>TELEMETRY INGESTION PIPELINE (RHEL 9.x)</span>
              </div>
              <span className="text-xs text-zinc-500 font-mono">
                12k metrics / sec
              </span>
            </div>

            {/* Architecture diagram visual */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center my-4">
              <div className="p-3.5 rounded-lg bg-zinc-900/90 border border-zinc-800">
                <div className="text-[10px] text-zinc-500 uppercase font-mono">01. Source</div>
                <div className="text-xs font-semibold text-zinc-200 mt-1">SNMP &amp; Syslog</div>
                <div className="text-[11px] text-zinc-400 mt-0.5">Switch Traps &amp; Events</div>
              </div>

              <div className="p-3.5 rounded-lg bg-zinc-900/90 border border-zinc-800">
                <div className="text-[10px] text-zinc-500 uppercase font-mono">02. Processor</div>
                <div className="text-xs font-semibold text-zinc-200 mt-1">Python Listeners</div>
                <div className="text-[11px] text-zinc-400 mt-0.5">Event Daemon &amp; Filter</div>
              </div>

              <div className="p-3.5 rounded-lg bg-zinc-900/90 border border-zinc-800">
                <div className="text-[10px] text-zinc-500 uppercase font-mono">03. Time-Series</div>
                <div className="text-xs font-semibold text-zinc-200 mt-1">InfluxDB / Prom</div>
                <div className="text-[11px] text-zinc-400 mt-0.5">Sub-Second Retention</div>
              </div>

              <div className="p-3.5 rounded-lg bg-zinc-900/90 border border-zinc-800">
                <div className="text-[10px] text-zinc-500 uppercase font-mono">04. Exposition</div>
                <div className="text-xs font-semibold text-zinc-200 mt-1">FastAPI &amp; Grafana</div>
                <div className="text-[11px] text-zinc-400 mt-0.5">REST APIs &amp; Dashboards</div>
              </div>
            </div>

            {/* Monitored Enterprise Fabric */}
            <div className="mt-6 pt-4 border-t border-zinc-800">
              <div className="text-xs text-zinc-300 mb-3.5 flex items-center justify-between font-medium">
                <span>Enterprise Storage Platforms &amp; SAN Fabrics</span>
                <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
                  4 / 4 Online
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {fabricNodes.map((node) => (
                  <div
                    key={node.name}
                    className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-semibold text-zinc-200">{node.name}</div>
                      <div className="text-[11px] text-zinc-400">{node.role}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium text-emerald-400">{node.status}</div>
                      <div className="text-[10px] font-mono text-zinc-400">{node.metric}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Live Health & Latency Stats */}
          <div className="card-subtle p-6 rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-white font-mono">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>PLATFORM HEALTH</span>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-semibold">99.9% SLA</span>
              </div>

              {/* Status Stats */}
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center p-2 rounded bg-zinc-900/60 border border-zinc-800/60">
                  <span className="text-zinc-400">Application Status:</span>
                  <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Operational
                  </span>
                </div>

                <div className="flex justify-between items-center p-2 rounded bg-zinc-900/60 border border-zinc-800/60">
                  <span className="text-zinc-400">Database Layer:</span>
                  <span className="text-zinc-200 font-medium">
                    {telemetry?.metrics.databaseStatus === "connected"
                      ? "MongoDB Atlas (Online)"
                      : "Telemetry Seed Cache (Instant)"}
                  </span>
                </div>

                <div className="flex justify-between items-center p-2 rounded bg-zinc-900/60 border border-zinc-800/60">
                  <span className="text-zinc-400">Daemon Load:</span>
                  <span className="text-zinc-200 font-medium">{simulatedLoad}% CPU</span>
                </div>

                <div className="flex justify-between items-center p-2 rounded bg-zinc-900/60 border border-zinc-800/60">
                  <span className="text-zinc-400">API Latency:</span>
                  <span className="text-emerald-400 font-medium">
                    {latencyHistory[latencyHistory.length - 1]}ms
                  </span>
                </div>

                {/* Simulated Sparkline */}
                <div className="pt-2">
                  <div className="text-[11px] text-zinc-400 mb-1.5 flex justify-between font-mono">
                    <span>Latency (Last 10 samples)</span>
                    <span>Avg ~15ms</span>
                  </div>
                  <div className="h-8 flex items-end gap-1 bg-zinc-900 p-1.5 rounded border border-zinc-800">
                    {latencyHistory.map((val, idx) => (
                      <div
                        key={idx}
                        style={{ height: `${Math.min(100, (val / 30) * 100)}%` }}
                        className="flex-1 bg-zinc-500 hover:bg-zinc-300 rounded-t transition-all"
                        title={`${val}ms`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Diagnostic Footer */}
            <div className="mt-6 pt-3 border-t border-zinc-800 text-[11px] font-mono text-zinc-500 flex items-center justify-between">
              <span>RHEL 9.x Enterprise</span>
              <span>Next.js 16.3 + Turborepo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
