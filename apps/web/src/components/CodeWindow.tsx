"use client";

import React, { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

interface CodeTab {
  id: string;
  filename: string;
  language: string;
  code: string;
}

const TABS: CodeTab[] = [
  {
    id: "telemetry",
    filename: "telemetry_daemon.py",
    language: "python",
    code: `from fastapi import FastAPI, BackgroundTasks
from telemetry import InfluxMetricsEngine, StorageWatcher

app = FastAPI(title="UnifiedOps Engine", version="2.4")
metrics = InfluxMetricsEngine(retention="30d")

@app.get("/api/v1/fabric/health")
async def monitor_storage_fabric():
    """Ingest & aggregate telemetry from 500+ enterprise ports."""
    return await metrics.sample_clusters(
        targets=["NetApp ONTAP", "Dell EMC PowerStore", "Hitachi VSP"],
        transport="Brocade FC 32Gbps",
        flow_rate="12,000 metrics/sec",
        sla=99.98
    )`,
  },
  {
    id: "fabric",
    filename: "storage_nodes.ts",
    language: "typescript",
    code: `export interface EnterpriseFabricNode {
  cluster: "NetApp ONTAP" | "Dell EMC" | "Hitachi VSP";
  sanSwitch: "Brocade 32G Fabric A/B";
  activePorts: number; // 500+ monitored ports
  latencyTargetMs: 0.8;
  ingestionPipeline: "Syslog + SNMP -> InfluxDB";
  status: "OPTIMAL_HEALTH";
}`,
  },
  {
    id: "status",
    filename: "system_status.json",
    language: "json",
    code: `{
  "engineer": "Abhimanyu Kumar",
  "role": "Software Engineer @ Wipro",
  "education": "M.Tech Software Systems @ BITS Pilani",
  "core_stack": ["Python", "FastAPI", "React", "Linux/RHEL", "InfluxDB"],
  "enterprise_scope": "500+ Storage Arrays & SAN Ports",
  "status": "Available for High-Impact Roles"
}`,
  },
];

export const CodeWindow: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState("telemetry");
  const [copied, setCopied] = useState(false);

  const activeTab = TABS.find((t) => t.id === activeTabId) || TABS[0]!;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeTab.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-xl mx-auto rounded-xl code-editor overflow-hidden shadow-2xl transition-all">
      {/* Window Header */}
      <div className="bg-[#161b22] px-4 py-2.5 border-b border-zinc-800 flex items-center justify-between select-none">
        {/* Window controls (macOS traffic lights) */}
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]/80 border border-[#e0443e]/50"></span>
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/80 border border-[#dea123]/50"></span>
          <span className="w-3 h-3 rounded-full bg-[#27c93f]/80 border border-[#1aab29]/50"></span>
        </div>

        {/* Tab triggers */}
        <div className="flex items-center space-x-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                activeTabId === tab.id
                  ? "bg-[#0d1117] text-zinc-100 font-medium border border-zinc-800"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
              }`}
            >
              {tab.filename}
            </button>
          ))}
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="p-1 rounded text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 transition-colors"
          title="Copy Code"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Code Body with Line Numbers */}
      <div className="p-4 bg-[#0d1117] font-mono text-xs text-zinc-200 overflow-x-auto leading-relaxed">
        <pre className="flex">
          {/* Line Numbers */}
          <span className="text-zinc-600 select-none pr-4 text-right border-r border-zinc-800/80 mr-4 flex flex-col">
            {activeTab.code.split("\n").map((_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </span>

          {/* Syntax Code Content */}
          <code className="text-zinc-300 flex-1 whitespace-pre">
            {activeTab.code}
          </code>
        </pre>
      </div>

      {/* Window Footer Status Line */}
      <div className="bg-[#12161f] px-4 py-1.5 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500 select-none">
        <div className="flex items-center gap-2">
          <Terminal className="w-3 h-3 text-emerald-500" />
          <span>production // AP-SOUTH-1</span>
        </div>
        <div className="flex items-center gap-3">
          <span>UTF-8</span>
          <span className="text-emerald-400">● 200 OK</span>
        </div>
      </div>
    </div>
  );
};
