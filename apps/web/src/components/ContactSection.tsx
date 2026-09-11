"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Globe } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { DEVELOPER_PROFILE } from "@/lib/seed-data";

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
          message: "Thank you! Your message has been sent successfully. I will get back to you shortly.",
          details: {
            id: json.data?.id,
            timestamp: json.timestamp || new Date().toISOString(),
          },
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message: json.error || "Failed to send message. Please verify all fields and try again.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Network error sending your message. Please reach out directly via email.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 border-b border-zinc-800/80 bg-zinc-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-zinc-800/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1.5 font-medium">
              <Mail className="w-4 h-4 text-zinc-300" />
              <span>COMMUNICATION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Get in Touch
            </h2>
          </div>
          <div className="mt-4 md:mt-0 text-xs font-mono text-zinc-400">
            Open for Engineering Opportunities
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Direct Channels Card (Span 2) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card-subtle p-6 rounded-xl space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 font-mono">
                  Direct Channels
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Interested in discussing backend systems, telemetry pipelines, or potential software engineering roles? Feel free to reach out directly.
                </p>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <a
                  href={`mailto:${DEVELOPER_PROFILE.email}`}
                  className="flex items-center gap-3 p-3.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-all group"
                >
                  <Mail className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase">Email</div>
                    <div className="font-medium text-zinc-200 mt-0.5">{DEVELOPER_PROFILE.email}</div>
                  </div>
                </a>

                <a
                  href={`tel:${DEVELOPER_PROFILE.phone}`}
                  className="flex items-center gap-3 p-3.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-all group"
                >
                  <Phone className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase">Phone</div>
                    <div className="font-medium text-zinc-200 mt-0.5">{DEVELOPER_PROFILE.phone}</div>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                  <MapPin className="w-4 h-4 text-zinc-400" />
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase">Location</div>
                    <div className="font-medium text-zinc-200 mt-0.5">{DEVELOPER_PROFILE.location} // IST (UTC+5:30)</div>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center gap-2">
                <a
                  href={DEVELOPER_PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-medium transition-all"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-zinc-400" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={DEVELOPER_PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-medium transition-all"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-zinc-400" />
                  <span>GitHub</span>
                </a>
                <a
                  href={DEVELOPER_PROFILE.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-medium transition-all"
                >
                  <Globe className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Portfolio</span>
                </a>
              </div>
            </div>
          </div>

          {/* Clean Contact Form (Span 3) */}
          <div className="lg:col-span-3">
            <div className="card-subtle p-6 sm:p-8 rounded-xl text-xs">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-6">
                <span className="text-white font-semibold text-sm">
                  Send a Message
                </span>
                <span className="text-zinc-500 font-mono text-[11px]">
                  Encrypted &amp; Direct
                </span>
              </div>

              {status.type === "success" && (
                <div className="mb-6 p-4 rounded-lg bg-emerald-950/40 border border-emerald-800/80 text-emerald-200 space-y-1">
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Message Sent Successfully</span>
                  </div>
                  <p className="text-xs text-zinc-300">{status.message}</p>
                </div>
              )}

              {status.type === "error" && (
                <div className="mb-6 p-4 rounded-lg bg-red-950/40 border border-red-800/80 text-red-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>{status.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-zinc-400 text-xs font-medium">
                      Your Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 focus:border-zinc-500 focus:outline-none text-zinc-200 text-xs placeholder:text-zinc-600 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-400 text-xs font-medium">
                      Your Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. sarah@company.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 focus:border-zinc-500 focus:outline-none text-zinc-200 text-xs placeholder:text-zinc-600 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-400 text-xs font-medium">
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Software Engineer Role / Technical Collaboration"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 focus:border-zinc-500 focus:outline-none text-zinc-200 text-xs placeholder:text-zinc-600 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-400 text-xs font-medium">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Provide details about the role, project scope, or technical question..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 focus:border-zinc-500 focus:outline-none text-zinc-200 text-xs placeholder:text-zinc-600 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-white hover:bg-zinc-200 disabled:opacity-50 text-zinc-950 font-medium text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  {loading ? (
                    <span>Sending message...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
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
