import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07080e",
};

export const metadata: Metadata = {
  title: "Abhimanyu Kumar | Software Engineer — Distributed Telemetry, APIs & Systems",
  description:
    "Software Engineer specializing in enterprise observability, distributed telemetry ingestion, FastAPI microservices, React, and Linux infrastructure. Experience at Wipro & M.Tech at BITS Pilani.",
  keywords: [
    "Abhimanyu Kumar",
    "Software Engineer",
    "Observability",
    "Distributed Telemetry",
    "FastAPI",
    "Python",
    "React",
    "Next.js",
    "Linux",
    "RHEL",
    "InfluxDB",
    "Grafana",
    "Prometheus",
    "Brocade SAN",
    "NetApp",
    "Dell EMC",
    "Wipro",
    "BITS Pilani",
  ],
  authors: [{ name: "Abhimanyu Kumar" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#07080e] text-slate-100 antialiased selection:bg-cyan-500/25 selection:text-cyan-200">
        {/* Background Ambience Layers */}
        <div className="fixed inset-0 obsidian-grid pointer-events-none z-0" />
        <div className="fixed inset-0 obsidian-radial pointer-events-none z-0" />
        <div className="fixed inset-0 obsidian-ambient pointer-events-none z-0" />
        
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
