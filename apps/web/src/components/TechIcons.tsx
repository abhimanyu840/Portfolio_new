"use client";

import React from "react";

interface IconProps {
  className?: string;
}

// 1. HTML5 (Official Orange Shield with white '5' cutout)
export const Html5Icon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 2L4.65 20.37L12 22.41L19.35 20.37L21 2H3Z" fill="#E34F26" />
    <path d="M12 3.65V20.72L17.85 19.1L19.26 3.65H12Z" fill="#EF652A" />
    <path d="M12 7.18H7.78L8.09 10.66H12V7.18ZM12 12.16H8.22L8.53 15.65L12 16.61V14.15L10.37 13.7L10.27 12.16H12V12.16Z" fill="#EBEBEB" />
    <path d="M12 7.18H16.22L15.91 10.66H12V7.18ZM12 12.16H15.77L15.42 16.08L12 17.03V14.57L13.63 14.12L13.78 12.16H12V12.16Z" fill="#FFFFFF" />
  </svg>
);

// 2. CSS3 (Official Blue Shield with white '3' cutout)
export const Css3Icon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 2L4.65 20.37L12 22.41L19.35 20.37L21 2H3Z" fill="#1572B6" />
    <path d="M12 3.65V20.72L17.85 19.1L19.26 3.65H12Z" fill="#33A9DC" />
    <path d="M12 7.18H7.78L8.09 10.66H12V7.18ZM12 12.16H8.22L8.35 13.64H12V12.16Z" fill="#EBEBEB" />
    <path d="M12 7.18H16.22L15.91 10.66H12V7.18ZM12 12.16H15.77L15.42 16.08L12 17.03V14.57L13.63 14.12L13.78 12.16H12V12.16Z" fill="#FFFFFF" />
  </svg>
);

// 3. JavaScript (Official Yellow Badge)
export const JavascriptIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#F7DF1E" />
    <path d="M7 16.5C7.5 17.5 8.5 18 9.8 18C11.2 18 12 17.2 12 15.8V9H10V15.7C10 16.2 9.7 16.5 9.1 16.5C8.6 16.5 8.2 16.2 7.9 15.6L7 16.5ZM13.8 17.8C14.8 18 15.9 18.1 16.9 17.6C17.7 17.1 18.2 16.3 18.2 15.3C18.2 14.1 17.4 13.5 16 12.9L15.3 12.6C14.6 12.3 14.3 12 14.3 11.4C14.3 10.9 14.7 10.5 15.5 10.5C16.2 10.5 16.8 10.8 17.2 11.3L18 10.1C17.3 9.4 16.4 9 15.4 9C14 9 13.1 9.8 13.1 11.1C13.1 12.2 13.8 12.9 15.1 13.4L15.8 13.7C16.6 14 17 14.4 17 15.1C17 15.7 16.4 16.2 15.4 16.2C14.5 16.2 13.8 15.8 13.3 15.1L13.8 17.8Z" fill="#000000" />
  </svg>
);

// 4. TypeScript (Official Blue Badge)
export const TypescriptIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#3178C6" />
    <path d="M5.5 10H11.5V11.5H9.3V18H7.7V11.5H5.5V10ZM12.5 16.8C13.2 17.6 14.2 18 15.3 18C16.6 18 17.6 17.2 17.6 16C17.6 14.8 16.8 14.2 15.3 13.6L14.7 13.3C13.9 13 13.5 12.6 13.5 11.9C13.5 11.2 14.1 10.7 15 10.7C15.8 10.7 16.5 11 17 11.6L17.8 10.4C17.1 9.7 16.1 9.3 15 9.3C13.5 9.3 12.4 10.2 12.4 11.7C12.4 12.9 13.2 13.7 14.6 14.2L15.2 14.5C16.1 14.8 16.5 15.3 16.5 16C16.5 16.8 15.8 17.3 14.8 17.3C13.9 17.3 13.1 16.8 12.6 16.1L12.5 16.8Z" fill="#FFFFFF" />
  </svg>
);

// 5. React (Cyan Spinning Atom)
export const ReactIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="-11.5 -10.23 23 20.46" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
    <g stroke="#61DAFB" strokeWidth="1">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

// 6. Next.js (Black & White Monogram)
export const NextjsIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="11" fill="#000000" stroke="#334155" strokeWidth="1" />
    <path d="M15.5 8.5V15.5M8.5 8.5V15.5L15.5 8.5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 7. Tailwind CSS (Cyan Waves)
export const TailwindIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="#06B6D4" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 6C9.6 6 8.1 7.2 7.5 9.6C8.5 8.8 9.6 8.5 10.8 8.8C11.8 9 12.6 9.8 13.4 10.6C14.7 11.9 16.3 13 20 13C22.4 13 23.9 11.8 24.5 9.4C23.5 10.2 22.4 10.5 21.2 10.2C20.2 10 19.4 9.2 18.6 8.4C17.3 7.1 15.7 6 12 6ZM4 12C1.6 12 0.1 13.2 -0.5 15.6C0.5 14.8 1.6 14.5 2.8 14.8C3.8 15 4.6 15.8 5.4 16.6C6.7 17.9 8.3 19 12 19C14.4 19 15.9 17.8 16.5 15.4C15.5 16.2 14.4 16.5 13.2 16.2C12.2 16 11.4 15.2 10.6 14.4C9.3 13.1 7.7 12 4 12Z" />
  </svg>
);

// 8. Python (Dual-snake Blue & Yellow)
export const PythonIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.92 2C8.75 2 6.8 2.92 6.8 4.77V6.82H11.92V7.54H4.25C2.42 7.54 0.8 9.17 0.8 12.04C0.8 14.91 2.42 16.35 4.25 16.35H5.97V13.88C5.97 11.83 7.7 10.1 9.75 10.1H14.97C16.6 10.1 18.04 8.67 18.04 7.03V4.77C18.04 2.92 15.09 2 11.92 2ZM10.48 3.44C11 3.44 11.41 3.85 11.41 4.36C11.41 4.87 11 5.29 10.48 5.29C9.97 5.29 9.56 4.87 9.56 4.36C9.56 3.85 9.97 3.44 10.48 3.44Z" fill="#3776AB" />
    <path d="M12.08 22C15.25 22 17.2 21.08 17.2 19.23V17.18H12.08V16.46H19.75C21.58 16.46 23.2 14.83 23.2 11.96C23.2 9.09 21.58 7.65 19.75 7.65H18.03V10.12C18.03 12.17 16.3 13.9 14.25 13.9H9.03C7.4 13.9 5.96 15.33 5.96 16.97V19.23C5.96 21.08 8.91 22 12.08 22ZM13.52 20.56C13 20.56 12.59 20.15 12.59 19.64C12.59 19.13 13 18.71 13.52 18.71C14.03 18.71 14.44 19.13 14.44 19.64C14.44 20.15 14.03 20.56 13.52 20.56Z" fill="#FFD438" />
  </svg>
);

// 9. FastAPI (Teal Lightning Badge)
export const FastapiIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="11" fill="#009688" />
    <path d="M12.5 4L6.5 13H11.5L10 20L17.5 11H12.5L13.5 4H12.5Z" fill="#FFFFFF" />
  </svg>
);

// 10. Node.js (Green Hexagon)
export const NodeIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L21 7.2V16.8L12 22L3 16.8V7.2L12 2Z" fill="#5FA04E" fillOpacity="0.15" stroke="#5FA04E" strokeWidth="1.5" />
    <path d="M12 5.5L17.5 8.7V15.3L12 18.5L6.5 15.3V8.7L12 5.5Z" fill="#5FA04E" />
    <path d="M10 10.5V14.5M10 12.5H14M14 10.5V14.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

// 11. Docker (Blue Container Whale)
export const DockerIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5 8H15.5V10H13.5V8ZM10.5 8H12.5V10H10.5V8ZM7.5 8H9.5V10H7.5V8ZM10.5 5.5H12.5V7.5H10.5V5.5ZM7.5 5.5H9.5V7.5H7.5V5.5ZM13.5 5.5H15.5V7.5H13.5V5.5Z" fill="#2496ED" />
    <path d="M22.5 12.5C22.2 12.3 21.8 12.2 21.4 12.2C21.2 12.2 21 12.2 20.8 12.3C20.9 11.8 20.8 11.3 20.6 10.9L20.2 10.4L19.8 10.7C19.3 11.1 18.9 11.7 18.8 12.3C18.3 12.1 17.7 12 17.1 12H2.5C2.1 13.5 2.4 15.5 3.6 16.7C4.9 18 6.9 18.5 9.3 18.5C13.9 18.5 17.5 16.7 19.2 13.4C20 13.5 20.9 13.3 21.5 12.5L22.5 12.5Z" fill="#2496ED" />
    <path d="M4.5 12.5H6.5V14.5H4.5V12.5ZM7.5 12.5H9.5V14.5H7.5V12.5ZM10.5 12.5H12.5V14.5H10.5V12.5ZM13.5 12.5H15.5V14.5H13.5V12.5Z" fill="#FFFFFF" fillOpacity="0.4" />
  </svg>
);

// 12. Linux / RHEL (Red Hat / Linux Terminal)
export const LinuxIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#EE0000" fillOpacity="0.15" stroke="#EE0000" strokeWidth="1.5" />
    <path d="M6 7H18V17H6V7Z" fill="#0A0E1A" stroke="#EE0000" strokeWidth="0.8" />
    <path d="M8.5 10.5L10.5 12L8.5 13.5M12 14H15" stroke="#EE0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 13. MongoDB (Green Leaf)
export const MongoIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 1.5C11.5 2.5 7.5 8 7.5 13.5C7.5 17 9.5 20 12 21V1.5Z" fill="#47A248" />
    <path d="M12 1.5C12.5 2.5 16.5 8 16.5 13.5C16.5 17 14.5 20 12 21V1.5Z" fill="#499D4A" />
    <path d="M12 22.5V21C12.3 21 12.5 20.8 12.7 20.6C14.7 18.9 15.5 16.5 15.5 13.5C15.5 9 12.5 4 12 3V22.5Z" fill="#58AA58" />
  </svg>
);

// 14. PostgreSQL (Blue SQL Badge)
export const PostgresIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#336791" />
    <circle cx="12" cy="12" r="8" fill="#FFFFFF" fillOpacity="0.15" />
    <path d="M9 9H15M12 9V17M10 17H14" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// 15. Git (Orange Branch)
export const GitIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="#F05032" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.6 10.9L13.1 2.4C12.5 1.8 11.6 1.8 11 2.4L8.7 4.7L11.5 7.5C12.1 7.3 12.8 7.4 13.3 7.9C13.8 8.4 13.9 9.2 13.7 9.7L16.4 12.4C17 12.2 17.7 12.3 18.2 12.8C19 13.6 19 14.8 18.2 15.6C17.4 16.4 16.2 16.4 15.4 15.6C14.9 15.1 14.8 14.3 15 13.8L12.4 11.2V17C12.6 17.1 12.8 17.3 12.9 17.5C13.7 18.3 13.7 19.5 12.9 20.3C12.1 21.1 10.9 21.1 10.1 20.3C9.3 19.5 9.3 18.3 10.1 17.5C10.3 17.3 10.6 17.1 10.9 17V11.2C10.6 11.1 10.4 10.9 10.2 10.7C9.7 10.2 9.6 9.4 9.8 8.9L7.1 6.2L2.4 10.9C1.8 11.5 1.8 12.4 2.4 13L10.9 21.5C11.5 22.1 12.4 22.1 13 21.5L21.6 12.9C22.2 12.4 22.2 11.5 21.6 10.9Z" />
  </svg>
);

// 16. InfluxDB (Time-Series Cyan Sparkline)
export const InfluxIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="22" height="22" x="1" y="1" rx="4" fill="#22ADF6" fillOpacity="0.15" stroke="#22ADF6" strokeWidth="1.5" />
    <path d="M5 16L9 11L13 14L19 7" stroke="#22ADF6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="19" cy="7" r="2" fill="#22ADF6" />
  </svg>
);

// 17. Grafana (Orange Swirl Dashboard)
export const GrafanaIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="#F46800" strokeWidth="1.8" />
    <path d="M12 6C15.3 6 18 8.7 18 12C18 15.3 15.3 18 12 18" stroke="#F46800" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="12" cy="12" r="3" fill="#F46800" />
  </svg>
);

// 18. Prometheus (Flame Logo)
export const PrometheusIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#E6522C" fillOpacity="0.15" stroke="#E6522C" strokeWidth="1.5" />
    <path d="M12 5C13.2 8 16 10 16 14C16 16.8 14.2 19 12 19C9.8 19 8 16.8 8 14C8 12 9.5 9.5 11 8C11.3 9.5 12 10.5 12.5 10.5C13 10.5 12.5 8 12 5Z" fill="#E6522C" />
  </svg>
);

// Universal helper to resolve any technology string to its matching icon
export function getTechIcon(name: string, className = "w-5 h-5"): React.ReactNode {
  const lower = name.toLowerCase();

  if (lower.includes("html") || lower.includes("html5")) {
    return <Html5Icon className={className} />;
  }
  if (lower.includes("css") || lower.includes("css3")) {
    return <Css3Icon className={className} />;
  }
  if (lower.includes("typescript") || lower.startsWith("ts")) {
    return <TypescriptIcon className={className} />;
  }
  if (lower.includes("javascript") || lower.startsWith("js")) {
    return <JavascriptIcon className={className} />;
  }
  if (lower.includes("react")) {
    return <ReactIcon className={className} />;
  }
  if (lower.includes("next")) {
    return <NextjsIcon className={className} />;
  }
  if (lower.includes("tailwind")) {
    return <TailwindIcon className={className} />;
  }
  if (lower.includes("python")) {
    return <PythonIcon className={className} />;
  }
  if (lower.includes("fastapi")) {
    return <FastapiIcon className={className} />;
  }
  if (lower.includes("node")) {
    return <NodeIcon className={className} />;
  }
  if (lower.includes("docker") || lower.includes("podman")) {
    return <DockerIcon className={className} />;
  }
  if (lower.includes("linux") || lower.includes("rhel")) {
    return <LinuxIcon className={className} />;
  }
  if (lower.includes("mongo")) {
    return <MongoIcon className={className} />;
  }
  if (lower.includes("postgres") || lower.includes("sql")) {
    return <PostgresIcon className={className} />;
  }
  if (lower.includes("git")) {
    return <GitIcon className={className} />;
  }
  if (lower.includes("influx")) {
    return <InfluxIcon className={className} />;
  }
  if (lower.includes("grafana")) {
    return <GrafanaIcon className={className} />;
  }
  if (lower.includes("prometheus")) {
    return <PrometheusIcon className={className} />;
  }

  // Generic fallback code icon
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
