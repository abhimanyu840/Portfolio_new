"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Maximize2, Minimize2, Terminal as TerminalIcon } from "lucide-react";
import { DEVELOPER_PROFILE, SEED_PROJECTS, SEED_EXPERIENCE, SEED_EDUCATION, SEED_SKILL_GROUPS } from "@/lib/seed-data";

interface TerminalHUDProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandLog {
  id: string;
  command?: string;
  output: React.ReactNode;
  timestamp: string;
  isError?: boolean;
}

export const TerminalHUD: React.FC<TerminalHUDProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [promptColor, setPromptColor] = useState<"emerald" | "cyan" | "amber">("emerald");

  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: "init-1",
      output: (
        <div className="space-y-1 text-slate-300">
          <div className="text-emerald-400 font-bold">
            ⚡ Welcome to Abhimanyu Kumar&apos;s Observability Terminal HUD v2.4
          </div>
          <div>Type <span className="text-emerald-300 font-semibold">&apos;help&apos;</span> to view all commands or <span className="text-emerald-300 font-semibold">&apos;cat resume&apos;</span> for full credentials.</div>
          <div className="text-slate-500 text-xs">Keyboard shortcut: Press [Ctrl+/] or [~] to toggle anytime.</div>
        </div>
      ),
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Global hotkeys (Ctrl + / or ~ to toggle)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.key === "/") || e.key === "`") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    // Add to history
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(" ");
    const cmd = parts[0]?.toLowerCase() || "";
    const arg = parts.slice(1).join(" ").toLowerCase();

    let resultNode: React.ReactNode = null;
    let isErr = false;

    switch (cmd) {
      case "help":
        resultNode = (
          <div className="space-y-1 text-xs sm:text-sm">
            <div className="text-cyan-400 font-semibold mb-1">AVAILABLE COMMANDS:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
              <div><span className="text-emerald-300 font-bold">whoami</span> — Overview &amp; enterprise credentials</div>
              <div><span className="text-emerald-300 font-bold">projects</span> — List monitored platforms &amp; apps</div>
              <div><span className="text-emerald-300 font-bold">skills</span> — Categorized technical proficiency</div>
              <div><span className="text-emerald-300 font-bold">experience</span> — Wipro enterprise track &amp; SAN storage</div>
              <div><span className="text-emerald-300 font-bold">education</span> — BITS Pilani M.Tech &amp; BCA degrees</div>
              <div><span className="text-emerald-300 font-bold">cat resume</span> — Complete textual resume stream</div>
              <div><span className="text-emerald-300 font-bold">uptime</span> — System health &amp; active session duration</div>
              <div><span className="text-emerald-300 font-bold">contact</span> — Email, phone, GitHub, LinkedIn links</div>
              <div><span className="text-emerald-300 font-bold">theme</span> — Toggle prompt color (emerald/cyan/amber)</div>
              <div><span className="text-emerald-300 font-bold">clear</span> — Wipe terminal viewport</div>
              <div><span className="text-emerald-300 font-bold">exit</span> — Dismiss terminal drawer</div>
            </div>
          </div>
        );
        break;

      case "whoami":
        resultNode = (
          <div className="space-y-2 text-xs sm:text-sm">
            <div className="text-white font-bold">{DEVELOPER_PROFILE.name}</div>
            <div className="text-emerald-400">{DEVELOPER_PROFILE.title}</div>
            <div className="text-slate-300">{DEVELOPER_PROFILE.bio}</div>
            <div className="text-slate-400">Location: {DEVELOPER_PROFILE.location} | Status: {DEVELOPER_PROFILE.status}</div>
          </div>
        );
        break;

      case "projects":
        resultNode = (
          <div className="space-y-3 text-xs sm:text-sm">
            <div className="text-cyan-400 font-semibold">DEPLOYED PROJECTS &amp; TELEMETRY PLATFORMS:</div>
            {SEED_PROJECTS.map((p, idx) => (
              <div key={p.id} className="border-l-2 border-emerald-500/50 pl-3 py-1">
                <div className="text-white font-bold">
                  {idx + 1}. {p.title}
                </div>
                <div className="text-slate-400">{p.tagline}</div>
                <div className="text-emerald-300 text-xs mt-1">Tech: {p.tags.join(" • ")}</div>
              </div>
            ))}
          </div>
        );
        break;

      case "skills":
        resultNode = (
          <div className="space-y-2 text-xs sm:text-sm">
            <div className="text-cyan-400 font-semibold">TECHNICAL SKILL MATRIX:</div>
            {SEED_SKILL_GROUPS.map((g) => (
              <div key={g.category} className="py-1">
                <span className="text-emerald-300 font-semibold">{g.category}: </span>
                <span className="text-slate-300">{g.skills.map((s) => s.name).join(", ")}</span>
              </div>
            ))}
          </div>
        );
        break;

      case "experience":
        resultNode = (
          <div className="space-y-2 text-xs sm:text-sm">
            {SEED_EXPERIENCE.map((exp) => (
              <div key={exp.id} className="border-l-2 border-cyan-500/50 pl-3">
                <div className="text-white font-bold">{exp.role} @ {exp.company}</div>
                <div className="text-slate-400">{exp.period} | {exp.location}</div>
                <ul className="list-disc list-inside text-slate-300 mt-1 space-y-1">
                  {exp.highlights.slice(0, 4).map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
        break;

      case "education":
        resultNode = (
          <div className="space-y-3 text-xs sm:text-sm">
            {SEED_EDUCATION.map((edu, idx) => (
              <div key={idx} className="border-l-2 border-emerald-500/50 pl-3">
                <div className="text-white font-bold">{edu.degree}</div>
                <div className="text-emerald-300">{edu.institution}</div>
                <div className="text-slate-400">{edu.period} • {edu.status}</div>
                {edu.program && <div className="text-slate-300 text-xs">{edu.program}</div>}
              </div>
            ))}
          </div>
        );
        break;

      case "cat":
        if (arg === "resume" || arg === "resume.md" || arg === "resume.txt") {
          resultNode = (
            <pre className="text-[11px] sm:text-xs text-slate-300 overflow-x-auto whitespace-pre leading-relaxed">
{`=============================================================================
                    ABHIMANYU KUMAR — RESUME SUMMARY
  SOFTWARE ENGINEER | PYTHON • FASTAPI • REACT • LINUX • OBSERVABILITY
  Email: ${DEVELOPER_PROFILE.email} | Phone: ${DEVELOPER_PROFILE.phone}
  GitHub: ${DEVELOPER_PROFILE.github}
=============================================================================
[EXPERIENCE]
Wipro | Software Engineer / Project Engineer (2025 - Present)
- Enterprise monitoring & observability: Python, FastAPI, React, InfluxDB, Prometheus.
- Real-time dashboards for storage alerts, SAN ports, and operational metrics.
- Enterprise Storage platforms: NetApp, Dell EMC, Hitachi, and Brocade SAN switches.
- Infrastructure telemetry: Syslog, SNMP, TCP/IP network monitoring.
- Containerization: Docker & Podman on RHEL environments.

[KEY PLATFORMS]
1. UnifiedOps: Centralized enterprise monitoring platform for SAN & storage fabrics.
2. Observatory: High-speed metric ingestion with InfluxDB & Grafana.
3. Enterprise AI Chatbot: RAG assistant for SharePoint with on-prem Ollama/NIM.
4. Interest Business Handling: Type-safe Next.js + React Native ledger suite.

[EDUCATION]
- BITS Pilani: M.Tech in Software Systems (Wipro WILP - In Progress)
- R.N. College, Bihar: Bachelor of Computer Applications (BCA)
=============================================================================`}
            </pre>
          );
        } else {
          resultNode = <div className="text-red-400">File not found: &apos;{arg}&apos;. Try &apos;cat resume&apos;.</div>;
          isErr = true;
        }
        break;

      case "uptime":
        resultNode = (
          <div className="text-xs sm:text-sm text-emerald-400 font-mono">
            SYS_UPTIME: 14,820s | HEALTH: 99.98% | ACTIVE_NODES: 4 | STATUS: ALL_SYSTEMS_GO
          </div>
        );
        break;

      case "contact":
        resultNode = (
          <div className="space-y-1 text-xs sm:text-sm">
            <div><span className="text-emerald-300">Email:</span> <a href={`mailto:${DEVELOPER_PROFILE.email}`} className="underline hover:text-white">{DEVELOPER_PROFILE.email}</a></div>
            <div><span className="text-emerald-300">Phone:</span> {DEVELOPER_PROFILE.phone}</div>
            <div><span className="text-emerald-300">GitHub:</span> <a href={DEVELOPER_PROFILE.github} target="_blank" rel="noreferrer" className="underline hover:text-white">{DEVELOPER_PROFILE.github}</a></div>
            <div><span className="text-emerald-300">Portfolio:</span> {DEVELOPER_PROFILE.portfolio}</div>
          </div>
        );
        break;

      case "theme":
        setPromptColor((prev) => (prev === "emerald" ? "cyan" : prev === "cyan" ? "amber" : "emerald"));
        resultNode = <div className="text-slate-300">Prompt accent theme cycled.</div>;
        break;

      case "clear":
        setLogs([]);
        return;

      case "exit":
        onClose();
        return;

      default:
        resultNode = (
          <div className="text-red-400">
            Command not recognized: &apos;{cmd}&apos;. Type <span className="underline text-emerald-300">&apos;help&apos;</span> for documentation.
          </div>
        );
        isErr = true;
        break;
    }

    setLogs((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: trimmed,
        output: resultNode,
        timestamp: new Date().toLocaleTimeString(),
        isError: isErr,
      },
    ]);
  };

  const handleKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < history.length) {
          setHistoryIndex(nextIndex);
          setInput(history[nextIndex] || "");
        } else {
          setHistoryIndex(-1);
          setInput("");
        }
      }
    }
  };

  if (!isOpen) return null;

  const colorStyles = {
    emerald: "text-emerald-400",
    cyan: "text-cyan-400",
    amber: "text-amber-400",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm">
      <div
        className={`w-full ${
          isExpanded ? "h-[94vh]" : "max-w-3xl h-[65vh]"
        } bg-[#0c121e] border border-slate-700/80 rounded-lg shadow-2xl flex flex-col font-mono overflow-hidden transition-all duration-200`}
      >
        {/* Terminal Title Bar */}
        <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between select-none">
          <div className="flex items-center space-x-2">
            <TerminalIcon className={`w-4 h-4 ${colorStyles[promptColor]}`} />
            <span className="text-xs font-semibold text-slate-200 tracking-wider">
              bash // ops@abhimanyu:~$ [ENTERPRISE_CONSOLE]
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
              title={isExpanded ? "Restore" : "Maximize"}
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-red-400 rounded hover:bg-slate-800"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Output Logs */}
        <div
          className="flex-1 p-4 overflow-y-auto space-y-4 text-xs sm:text-sm bg-[#090e17]/95 cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          {logs.map((log) => (
            <div key={log.id} className="space-y-1">
              {log.command && (
                <div className="flex items-center space-x-2 text-slate-400">
                  <span className={`${colorStyles[promptColor]} font-bold`}>ops@abhimanyu:~$</span>
                  <span className="text-slate-100 font-semibold">{log.command}</span>
                  <span className="text-[10px] text-slate-600 ml-auto">{log.timestamp}</span>
                </div>
              )}
              <div className="pl-2">{log.output}</div>
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center space-x-2">
          <span className={`${colorStyles[promptColor]} font-bold text-xs sm:text-sm flex-shrink-0`}>
            ops@abhimanyu:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDownInput}
            placeholder="Type 'help', 'projects', 'cat resume', 'skills'..."
            className="flex-1 bg-transparent text-slate-100 focus:outline-none text-xs sm:text-sm font-mono placeholder:text-slate-600"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};
