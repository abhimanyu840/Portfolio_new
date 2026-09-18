"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

export type Theme = "dark" | "light" | "system";
export type ResolvedTheme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "portfolio_theme";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("dark");
  const [mounted, setMounted] = useState(false);

  // Helper to get system theme preference
  const getSystemTheme = (): ResolvedTheme => {
    if (typeof window === "undefined") return "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const applyTheme = useCallback((targetTheme: Theme) => {
    if (typeof window === "undefined") return;

    const resolved: ResolvedTheme =
      targetTheme === "system" ? getSystemTheme() : targetTheme;

    setResolvedTheme(resolved);

    const root = document.documentElement;
    root.classList.remove("dark", "light", "system");
    root.classList.add(resolved);
    root.style.colorScheme = resolved;
  }, []);

  // Initialize theme from localStorage or document on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (saved === "dark" || saved === "light") {
        setThemeState(saved);
        applyTheme(saved);
      } else if (saved === "system") {
        setThemeState("system");
        applyTheme("system");
      } else {
        // No explicit choice saved -> adhere to system preference dynamically
        setThemeState("system");
        applyTheme("system");
      }
    } catch {
      applyTheme("dark");
    } finally {
      setMounted(true);
    }
  }, [applyTheme]);

  // Listen to OS color-scheme changes if theme is "system"
  useEffect(() => {
    if (!mounted || theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      applyTheme("system");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, mounted, applyTheme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
      // Ignore localStorage errors
    }
    applyTheme(newTheme);
  };

  const toggleTheme = () => {
    const nextTheme: Theme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
