import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Abhimanyu Kumar | Software Engineer — Python, FastAPI, React, Linux & Observability",
  description:
    "Software Engineer with 1.5+ years of experience building enterprise monitoring solutions, FastAPI services, and reactive dashboards at Wipro. M.Tech in Software Systems at BITS Pilani.",
  keywords: [
    "Abhimanyu Kumar",
    "Software Engineer",
    "FastAPI",
    "Python",
    "React",
    "Observability",
    "InfluxDB",
    "Prometheus",
    "Grafana",
    "Linux",
    "RHEL",
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
      <body className="min-h-screen bg-[#09090b] text-zinc-100 antialiased selection:bg-zinc-800 selection:text-white">
        <div className="fixed inset-0 subtle-grid pointer-events-none z-0" />
        <div className="fixed inset-0 ambient-gradient pointer-events-none z-0" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
