"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  Terminal,
  Copy,
  Check,
  Sparkles,
  Radio,
  ArrowUpRight,
} from "lucide-react";
import { DEVELOPER_PROFILE } from "@/lib/seed-data";
import { ContactSchema } from "@portfolio/shared";

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<{
    type: "idle" | "submitting" | "success" | "error";
    message?: string;
  }>({ type: "idle" });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    const result = ContactSchema.safeParse(formData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0].toString()] = err.message;
        }
      });
      setFieldErrors(errors);
      return;
    }

    setFormStatus({ type: "submitting" });

    try {
      const res = await fetch("/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setFormStatus({
          type: "success",
          message: json.message || "Message transmitted to telemetry buffer.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setFormStatus({
          type: "error",
          message: json.error || "Transmission rejected. Please verify fields.",
        });
      }
    } catch {
      setFormStatus({
        type: "error",
        message: "Network error communicating with telemetry gateway.",
      });
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/[0.08] gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 mb-2">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>05 // DIRECT TRANSMISSION GATEWAY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Initiate Transmission
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl">
              Open for enterprise platform engineering positions, infrastructure telemetry consulting, or collaborative distributed software systems.
            </p>
          </div>

          <div className="font-mono text-xs text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>ENCRYPTION: <strong className="text-cyan-300">TLS 1.3 // GATEWAY ACTIVE</strong></span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct Connection Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/[0.08] space-y-5">
              <div className="pb-3 border-b border-white/[0.08]">
                <span className="font-mono text-xs text-cyan-400 font-bold uppercase">
                  DIRECT ACCESS CHANNELS
                </span>
                <p className="text-xs text-slate-400 mt-1">
                  Connect with Abhimanyu directly through verified production channels:
                </p>
              </div>

              {/* Email Card with Copy Button */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-cyan-500/40 transition-all flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono text-slate-500 uppercase">Primary Inquiries</div>
                    <div className="text-xs sm:text-sm font-mono font-semibold text-white truncate">
                      {DEVELOPER_PROFILE.email}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(DEVELOPER_PROFILE.email, "email")}
                  className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-all cursor-pointer shrink-0 ml-2"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone Card with Copy Button */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-cyan-500/40 transition-all flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono text-slate-500 uppercase">Voice / Telemetry Line</div>
                    <div className="text-xs sm:text-sm font-mono font-semibold text-white truncate">
                      {DEVELOPER_PROFILE.phone}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(DEVELOPER_PROFILE.phone, "phone")}
                  className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-all cursor-pointer shrink-0 ml-2"
                  title="Copy phone to clipboard"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase">Current Station</div>
                  <div className="text-xs sm:text-sm font-mono font-semibold text-white">
                    {DEVELOPER_PROFILE.location}
                  </div>
                </div>
              </div>

              {/* Response SLA Beacon */}
              <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-300">Guaranteed Response SLA:</span>
                </div>
                <span className="text-emerald-400 font-bold">&lt; 24 Hours</span>
              </div>

              {/* Social Profiles Grid */}
              <div className="pt-2 flex items-center gap-3">
                <a
                  href={DEVELOPER_PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] text-xs font-mono text-slate-300 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={DEVELOPER_PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] text-xs font-mono text-slate-300 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Transmission Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/[0.08]">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs text-slate-300 mb-1.5 font-semibold">
                      Sender Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Elena Rostova"
                      className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all ${
                        fieldErrors.name
                          ? "border-red-500/70 focus:border-red-400"
                          : "border-white/[0.08] focus:border-cyan-500/70"
                      }`}
                    />
                    {fieldErrors.name && (
                      <p className="font-mono text-[11px] text-red-400 mt-1">{fieldErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-slate-300 mb-1.5 font-semibold">
                      Return Email Address <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="elena@enterprise.org"
                      className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all ${
                        fieldErrors.email
                          ? "border-red-500/70 focus:border-red-400"
                          : "border-white/[0.08] focus:border-cyan-500/70"
                      }`}
                    />
                    {fieldErrors.email && (
                      <p className="font-mono text-[11px] text-red-400 mt-1">{fieldErrors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs text-slate-300 mb-1.5 font-semibold">
                    Transmission Subject <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="e.g. Platform Engineering Opportunity / SRE Consulting"
                    className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all ${
                      fieldErrors.subject
                        ? "border-red-500/70 focus:border-red-400"
                        : "border-white/[0.08] focus:border-cyan-500/70"
                    }`}
                  />
                  {fieldErrors.subject && (
                    <p className="font-mono text-[11px] text-red-400 mt-1">{fieldErrors.subject}</p>
                  )}
                </div>

                <div>
                  <label className="block font-mono text-xs text-slate-300 mb-1.5 font-semibold">
                    Transmission Body <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Detail your engineering opportunity, team requirements, or architecture project..."
                    className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all resize-none ${
                      fieldErrors.message
                        ? "border-red-500/70 focus:border-red-400"
                        : "border-white/[0.08] focus:border-cyan-500/70"
                    }`}
                  />
                  {fieldErrors.message && (
                    <p className="font-mono text-[11px] text-red-400 mt-1">{fieldErrors.message}</p>
                  )}
                </div>

                {/* Status Message Display */}
                {formStatus.type === "success" && (
                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 font-mono text-xs text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{formStatus.message}</span>
                  </div>
                )}

                {formStatus.type === "error" && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 font-mono text-xs text-red-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{formStatus.message}</span>
                  </div>
                )}

                {/* Submit Action */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-[11px] font-mono text-slate-500">
                    Press <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-400 border border-white/[0.08]">Ctrl + Enter</kbd> or click Transmit
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus.type === "submitting"}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-white font-mono text-xs font-bold tracking-wider shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className={`w-3.5 h-3.5 ${formStatus.type === "submitting" ? "animate-spin" : ""}`} />
                    <span>
                      {formStatus.type === "submitting" ? "TRANSMITTING..." : "TRANSMIT_TO_BUFFER"}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
