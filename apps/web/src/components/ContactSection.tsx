"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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

const PRESET_SUBJECTS = [
  "⚡ Enterprise SRE / Observability Role",
  "🚀 Full-Stack / Platform Engineering",
  "🛠️ Distributed Systems / Telemetry Consulting",
];

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
    hp_company_field: "",
  });

  const [formStatus, setFormStatus] = useState<{
    type: "idle" | "submitting" | "success" | "error";
    message?: string;
  }>({ type: "idle" });

  const [resetCountdown, setResetCountdown] = useState<number | null>(null);
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

  const applyPresetSubject = (preset: string) => {
    setFormData((prev) => ({ ...prev, subject: preset }));
    if (fieldErrors.subject) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next.subject;
        return next;
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  useEffect(() => {
    if (resetCountdown === null) return;
    if (resetCountdown <= 0) {
      setFormStatus({ type: "idle" });
      setResetCountdown(null);
      return;
    }
    const timer = setTimeout(() => {
      setResetCountdown((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);
    return () => clearTimeout(timer);
  }, [resetCountdown]);

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
        setFormData({ name: "", email: "", subject: "", message: "", hp_company_field: "" });
        setResetCountdown(5);
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

  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
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

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 lg:py-28 border-b border-slate-200 dark:border-white/[0.08] relative">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        variants={containerVariants}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-slate-200 dark:border-white/[0.08] gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-600 dark:text-cyan-400 mb-2">
              <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>05 // DIRECT TRANSMISSION GATEWAY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Initiate <span className="text-gradient-cyan">Transmission</span>
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              Open for enterprise platform engineering positions, infrastructure telemetry consulting, or collaborative distributed software systems.
            </p>
          </div>

          <div className="font-mono text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            <span>ENCRYPTION: <strong className="text-cyan-700 dark:text-cyan-300">TLS 1.3 // GATEWAY ACTIVE</strong></span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct Connection Channels (5 cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-white/[0.08] space-y-5">
              <div className="pb-3 border-b border-slate-200 dark:border-white/[0.08]">
                <span className="font-mono text-xs text-cyan-600 dark:text-cyan-400 font-bold uppercase">
                  DIRECT ACCESS CHANNELS
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Connect with Abhimanyu directly through verified production channels:
                </p>
              </div>

              {/* Email Card with Copy Button */}
              <motion.div
                whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.01 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
                className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] hover:border-cyan-500/50 transition-all flex items-center justify-between shadow-sm hover:shadow-md hover:shadow-cyan-500/5"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono text-slate-500 uppercase">Primary Inquiries</div>
                    <div className="text-xs sm:text-sm font-mono font-semibold text-slate-900 dark:text-white truncate">
                      {DEVELOPER_PROFILE.email}
                    </div>
                  </div>
                </div>
                <motion.button
                  onClick={() => copyToClipboard(DEVELOPER_PROFILE.email, "email")}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.88 }}
                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer shrink-0 ml-2"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </motion.button>
              </motion.div>

              {/* Phone Card with Copy Button */}
              <motion.div
                whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.01 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
                className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] hover:border-cyan-500/50 transition-all flex items-center justify-between shadow-sm hover:shadow-md hover:shadow-cyan-500/5"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono text-slate-500 uppercase">Voice / Telemetry Line</div>
                    <div className="text-xs sm:text-sm font-mono font-semibold text-slate-900 dark:text-white truncate">
                      {DEVELOPER_PROFILE.phone}
                    </div>
                  </div>
                </div>
                <motion.button
                  onClick={() => copyToClipboard(DEVELOPER_PROFILE.phone, "phone")}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.88 }}
                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer shrink-0 ml-2"
                  title="Copy phone to clipboard"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </motion.button>
              </motion.div>

              {/* Location Card */}
              <motion.div
                whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.01 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
                className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] hover:border-purple-500/40 transition-all flex items-center gap-3 shadow-sm hover:shadow-md hover:shadow-purple-500/5"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase">Current Station</div>
                  <div className="text-xs sm:text-sm font-mono font-semibold text-slate-900 dark:text-white">
                    {DEVELOPER_PROFILE.location}
                  </div>
                </div>
              </motion.div>

              {/* Response SLA Beacon */}
              <motion.div
                whileHover={shouldReduceMotion ? {} : { y: -2 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
                className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between font-mono text-xs"
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-slate-700 dark:text-slate-300">Guaranteed Response SLA:</span>
                </div>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">&lt; 24 Hours</span>
              </motion.div>

              {/* Social Profiles Grid */}
              <div className="pt-2 flex items-center gap-3">
                <motion.a
                  href={DEVELOPER_PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.02 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  className="flex-1 p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-white/[0.03] dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.06] hover:border-cyan-500/40 text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </motion.a>
                <motion.a
                  href={DEVELOPER_PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.02 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  className="flex-1 p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-white/[0.03] dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.06] hover:border-blue-500/40 text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LinkedIn</span>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Transmission Form (7 cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-7">
            <div className="glass-panel p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-white/[0.08]">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot Anti-Spam Trap */}
                <div style={{ display: "none", position: "absolute", left: "-9999px" }} aria-hidden="true">
                  <label htmlFor="hp_company_field">Company</label>
                  <input
                    id="hp_company_field"
                    type="text"
                    name="hp_company_field"
                    value={formData.hp_company_field}
                    onChange={handleInputChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs text-slate-700 dark:text-slate-300 mb-1.5 font-semibold">
                      Sender Name <span className="text-cyan-600 dark:text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      placeholder="e.g. Elena Rostova"
                      className={`w-full px-4 py-2.5 rounded-xl bg-white dark:bg-white/[0.03] border text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none transition-all ${
                        fieldErrors.name
                          ? "border-red-500/70 focus:border-red-400"
                          : "border-slate-200 dark:border-white/[0.08] focus:border-cyan-500/70"
                      }`}
                    />
                    {fieldErrors.name && (
                      <p className="font-mono text-[11px] text-red-500 dark:text-red-400 mt-1">{fieldErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-slate-700 dark:text-slate-300 mb-1.5 font-semibold">
                      Return Email Address <span className="text-cyan-600 dark:text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      placeholder="elena@enterprise.org"
                      className={`w-full px-4 py-2.5 rounded-xl bg-white dark:bg-white/[0.03] border text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none transition-all ${
                        fieldErrors.email
                          ? "border-red-500/70 focus:border-red-400"
                          : "border-slate-200 dark:border-white/[0.08] focus:border-cyan-500/70"
                      }`}
                    />
                    {fieldErrors.email && (
                      <p className="font-mono text-[11px] text-red-500 dark:text-red-400 mt-1">{fieldErrors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <label className="block font-mono text-xs text-slate-700 dark:text-slate-300 font-semibold">
                      Transmission Subject <span className="text-cyan-600 dark:text-cyan-400">*</span>
                    </label>
                    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                      <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase shrink-0">Presets:</span>
                      {PRESET_SUBJECTS.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => applyPresetSubject(preset)}
                          className="px-2 py-0.5 text-[10px] font-mono rounded-md bg-slate-100 dark:bg-white/[0.04] hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:text-cyan-400 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/[0.06] transition-all cursor-pointer shrink-0"
                        >
                          {preset.split(" ")[0]} {preset.split(" ")[1]}
                        </button>
                      ))}
                    </div>
                  </div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g. Platform Engineering Opportunity / SRE Consulting"
                    className={`w-full px-4 py-2.5 rounded-xl bg-white dark:bg-white/[0.03] border text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none transition-all ${
                      fieldErrors.subject
                        ? "border-red-500/70 focus:border-red-400"
                        : "border-slate-200 dark:border-white/[0.08] focus:border-cyan-500/70"
                    }`}
                  />
                  {fieldErrors.subject && (
                    <p className="font-mono text-[11px] text-red-500 dark:text-red-400 mt-1">{fieldErrors.subject}</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block font-mono text-xs text-slate-700 dark:text-slate-300 font-semibold">
                      Transmission Body <span className="text-cyan-600 dark:text-cyan-400">*</span>
                    </label>
                    <span
                      className={`font-mono text-[11px] ${
                        formData.message.length > 1900
                          ? "text-red-500 font-bold"
                          : formData.message.length > 1500
                          ? "text-amber-500"
                          : "text-slate-400 dark:text-slate-500"
                      }`}
                    >
                      {formData.message.length} / 2000
                    </span>
                  </div>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Detail your engineering opportunity, team requirements, or architecture project..."
                    className={`w-full px-4 py-2.5 rounded-xl bg-white dark:bg-white/[0.03] border text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none transition-all resize-none ${
                      fieldErrors.message
                        ? "border-red-500/70 focus:border-red-400"
                        : "border-slate-200 dark:border-white/[0.08] focus:border-cyan-500/70"
                    }`}
                  />
                  {fieldErrors.message && (
                    <p className="font-mono text-[11px] text-red-500 dark:text-red-400 mt-1">{fieldErrors.message}</p>
                  )}
                </div>

                {/* Status Message Display with AnimatePresence */}
                <AnimatePresence mode="wait">
                  {formStatus.type === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 font-mono text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{formStatus.message}</span>
                    </motion.div>
                  )}

                  {formStatus.type === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 font-mono text-xs text-red-700 dark:text-red-300 flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
                      <span>{formStatus.message}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Action */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-[11px] font-mono text-slate-500">
                    Press <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/[0.08]">Ctrl + Enter</kbd> or click Transmit
                  </div>

                  <motion.button
                    type="submit"
                    disabled={formStatus.type === "submitting" || formStatus.type === "success"}
                    whileHover={shouldReduceMotion || formStatus.type === "submitting" ? {} : { scale: 1.02, y: -1 }}
                    whileTap={shouldReduceMotion || formStatus.type === "submitting" ? {} : { scale: 0.98 }}
                    className={`px-6 py-3 rounded-xl font-mono text-xs font-bold tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed ${
                      formStatus.type === "success"
                        ? "bg-emerald-600 text-white shadow-emerald-500/20"
                        : "bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-white shadow-cyan-500/20"
                    }`}
                  >
                    <Send className={`w-3.5 h-3.5 ${formStatus.type === "submitting" ? "animate-spin" : ""}`} />
                    <span>
                      {formStatus.type === "submitting"
                        ? "TRANSMITTING..."
                        : formStatus.type === "success"
                        ? `TRANSMITTED ✓ (${resetCountdown ?? 5}s)`
                        : "TRANSMIT_TO_BUFFER"}
                    </span>
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
