"use client";

import React from "react";
import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { DEVELOPER_PROFILE } from "@/lib/seed-data";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 bg-[#09090b] border-t border-zinc-800/80 text-xs text-zinc-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Info */}
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-white font-semibold">
              <span>{DEVELOPER_PROFILE.name}</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400 font-normal">Software Engineer</span>
            </div>
            <div className="text-zinc-500 text-[11px]">
              Built with Next.js 16, React 19, TypeScript &amp; Turborepo • Hosted on Netlify
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-3 text-zinc-400">
            <a
              href={DEVELOPER_PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg hover:text-white hover:bg-zinc-800 transition-colors"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={DEVELOPER_PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg hover:text-white hover:bg-zinc-800 transition-colors"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${DEVELOPER_PROFILE.email}`}
              className="p-2 rounded-lg hover:text-white hover:bg-zinc-800 transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-all text-xs font-medium"
            title="Return to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-900 text-center text-[11px] text-zinc-600">
          © {new Date().getFullYear()} Abhimanyu Kumar. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
