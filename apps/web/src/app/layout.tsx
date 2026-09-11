import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Abhimanyu Kumar | Software Engineer — Python, FastAPI, React, Linux & Observability",
  description:
    "Enterprise observability engineer and full-stack developer portfolio. Systems monitoring, FastAPI microservices, React dashboards, InfluxDB, Prometheus, and RHEL infrastructure.",
  keywords: [
    "Abhimanyu Kumar",
    "Software Engineer",
    "Observability",
    "FastAPI",
    "Python",
    "React",
    "Linux",
    "RHEL",
    "InfluxDB",
    "Grafana",
    "Prometheus",
    "Docker",
    "NetApp",
    "Dell EMC",
    "Brocade SAN",
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
      <body className="min-h-screen bg-[#0a0e17] text-slate-200 antialiased selection:bg-emerald-500/25 selection:text-emerald-300">
        <div className="fixed inset-0 tech-grid pointer-events-none z-0" />
        <div className="fixed inset-0 tech-radial pointer-events-none z-0" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
