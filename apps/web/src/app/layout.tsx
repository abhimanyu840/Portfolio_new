import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/context/ThemeContext";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#060813" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://abhimanyu.qzz.io"),
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Abhimanyu Kumar | Software Engineer",
    description: "Enterprise observability, distributed telemetry ingestion, FastAPI microservices, and React.",
    url: "https://abhimanyu.qzz.io",
    siteName: "Abhimanyu Kumar Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhimanyu Kumar | Software Engineer",
    description: "Enterprise observability, distributed telemetry ingestion, FastAPI microservices, and React.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark scroll-smooth">
      <head>
        {/* Instant FOUC Prevention Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
              try {
                var saved = localStorage.getItem('portfolio_theme');
                var theme = saved;
                if (!theme || theme === 'system') {
                  theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                }
                if (theme !== 'dark' && theme !== 'light') {
                  theme = 'dark';
                }
                document.documentElement.classList.remove('dark', 'light', 'system');
                document.documentElement.classList.add(theme);
                document.documentElement.style.colorScheme = theme;
              } catch(e) {
                document.documentElement.classList.remove('dark', 'light', 'system');
                document.documentElement.classList.add('dark');
                document.documentElement.style.colorScheme = 'dark';
              }
            })();`,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#ffffff] text-slate-900 dark:bg-[#060813] dark:text-slate-100 antialiased selection:bg-cyan-500/25 selection:text-cyan-200 transition-colors duration-200">
        <ThemeProvider>
          {/* Luminous Animated Background */}
          <AnimatedBackground />
          
          <div className="relative z-10">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
