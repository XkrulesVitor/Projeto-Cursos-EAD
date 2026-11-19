"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  const { theme, mounted, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      title={isDark ? "Alternar para modo claro" : "Alternar para modo escuro"}
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--ink)] transition-colors duration-150 hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)] active:scale-[0.98]"
    >
      {!mounted ? (
        <span className="h-4 w-4 rounded-full bg-[var(--border)]" />
      ) : isDark ? (
        <Sun size={18} weight="bold" aria-hidden="true" />
      ) : (
        <Moon size={18} weight="bold" aria-hidden="true" />
      )}
    </button>
  );
}
