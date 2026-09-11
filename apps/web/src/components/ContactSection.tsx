"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Globe } from "lucide-react";
import { DEVELOPER_PROFILE } from "@/lib/seed-data";

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error";
    message: string;
    details?: { id?: string; timestamp?: string };
  }>({
    type: "idle",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "idle", message: "" });

    try {
      const res = await fetch("/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setStatus({
          type: "success",
          message: json.message || "Message transmitted to telemetry buffer.",
          details: {
            id: json.data?.id,
            timestamp: json.timestamp || new Date().toISOString(),
          },
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message: json.error || "Failed to transmit message. Please verify fields.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Network error communicating with telemetry gateway.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 border-b border-blue-950/40 bg-[#02050e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-blue-950/80">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 mb-1.5 font-semibold">
              <Mail className="w-4 h-4" />
              <span>INGESTION_GATEWAY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
              INITIATE SECURE CONTACT
            </h2>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-xs text-slate-400">
            DISPATCH_TARGET: <span className="text-cyan-400 font-bold">ABHIMANYU KUMAR</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Direct Credentials Card (Span 2) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-panel-dark p-6 sm:p-7 rounded-2xl border border-blue-500/20 space-y-6 shadow-xl">
              <div>
                <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider mb-2">
                  DIRECT CHANNELS
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  Open for enterprise engineering positions, infrastructure telemetry consulting, or collaborative distributed software projects.
                </p>
              </div>

              <div className="space-y-3.5 font-mono text-xs">
                <a
                  href={`mailto:${DEVELOPER_PROFILE.email}`}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-[#040a1c]/80 border border-blue-500/20 hover:border-cyan-400/50 text-slate-300 hover:text-white transition-all group shadow-sm"
                >
                  <Mail className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">Direct Email</div>
                    <div className="font-semibold text-white mt-0.5">{DEVELOPER_PROFILE.email}</div>
                  </div>
                </a>

                <a
                  href={`tel:${DEVELOPER_PROFILE.phone}`}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-[#040a1c]/80 border border-blue-500/20 hover:border-blue-400/50 text-slate-300 hover:text-white transition-all group shadow-sm"
                >
                  <Phone className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">Voice / Telemetry Line</div>
                    <div className="font-semibold text-white mt-0.5">{DEVELOPER_PROFILE.phone}</div>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#040a1c]/80 border border-blue-500/20 text-slate-300 shadow-sm">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">Geographic Node</div>
                    <div className="font-semibold text-white mt-0.5">{DEVELOPER_PROFILE.location} // Standard Time (IST)</div>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="pt-4 border-t border-blue-950 flex flex-wrap items-center gap-2.5">
                <a
                  href={DEVELOPER_PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#050e26] border border-blue-500/25 hover:border-cyan-400 text-slate-300 hover:text-white font-mono text-xs transition-all"
                >
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={DEVELOPER_PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#050e26] border border-blue-500/25 hover:border-blue-400 text-slate-300 hover:text-white font-mono text-xs transition-all"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-blue-400" />
                  <span>GitHub</span>
                </a>
                <a
                  href={DEVELOPER_PROFILE.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#050e26] border border-blue-500/25 hover:border-cyan-400 text-slate-300 hover:text-white font-mono text-xs transition-all"
                >
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Portfolio</span>
                </a>
              </div>
            </div>
          </div>

          {/* High-Tech Contact Form (Span 3) */}
          <div className="lg:col-span-3">
            <div className="glass-panel-dark p-6 sm:p-8 rounded-2xl border border-blue-500/20 font-mono text-xs shadow-2xl">
              <div className="flex items-center justify-between border-b border-blue-950 pb-3 mb-6">
                <span className="text-white font-bold uppercase tracking-wider text-xs sm:text-sm">
                  TRANSMISSION BUFFER FORM
                </span>
                <span className="text-cyan-400 text-[10px] px-2 py-0.5 rounded bg-blue-950/60 border border-blue-500/20">
                  ENCRYPTION: TLS 1.3
                </span>
              </div>

              {status.type === "success" && (
                <div className="mb-6 p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/50 text-cyan-300 space-y-1 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>TRANSMISSION CONFIRMED</span>
                  </div>
                  <p className="text-xs">{status.message}</p>
                  {status.details && (
                    <div className="text-[10px] text-slate-400 mt-2 font-mono pt-2 border-t border-cyan-500/20 flex justify-between">
                      <span>EVENT_ID: {status.details.id}</span>
                      <span>TIMESTAMP: {new Date(status.details.timestamp || "").toLocaleTimeString()}</span>
                    </div>
                  )}
                </div>
              )}

              {status.type === "error" && (
                <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/50 text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>{status.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-slate-400 text-[11px] uppercase font-semibold">
                      Originator Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#030716] border border-blue-500/20 focus:border-cyan-400 focus:outline-none text-slate-200 text-xs font-mono placeholder:text-slate-600 transition-colors shadow-inner"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-400 text-[11px] uppercase font-semibold">
                      Originator Email <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@enterprise.io"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#030716] border border-blue-500/20 focus:border-cyan-400 focus:outline-none text-slate-200 text-xs font-mono placeholder:text-slate-600 transition-colors shadow-inner"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-400 text-[11px] uppercase font-semibold">
                    Subject Line <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Opportunity / Telemetry Architecture Discussion"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#030716] border border-blue-500/20 focus:border-cyan-400 focus:outline-none text-slate-200 text-xs font-mono placeholder:text-slate-600 transition-colors shadow-inner"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-400 text-[11px] uppercase font-semibold">
                    Telemetry Message Body <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Provide details regarding the project scope, role, or technical question..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#030716] border border-blue-500/20 focus:border-cyan-400 focus:outline-none text-slate-200 text-xs font-mono placeholder:text-slate-600 transition-colors resize-none shadow-inner"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]"
                >
                  {loading ? (
                    <span>TRANSMITTING_PACKET...</span>
                  ) : (
                    <>
                      <span>TRANSMIT_TO_TELEMETRY_BUFFER</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
