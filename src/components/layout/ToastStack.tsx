"use client";

import { CheckCircle, Info, WarningCircle, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useStore } from "@/context/StoreContext";

export function ToastStack() {
  const { toasts, dismissToast } = useStore();
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-live="polite"
      aria-label="Notificações da loja"
      className="pointer-events-none fixed right-4 bottom-4 z-[var(--z-toast)] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-2"
    >
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto flex items-start gap-3 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-4 py-3 text-sm text-[var(--ink)] shadow-[var(--shadow-elevated)]"
          >
            {toast.tone === "success" && (
              <CheckCircle
                size={18}
                weight="bold"
                className="mt-0.5 shrink-0 text-[var(--accent)]"
                aria-hidden="true"
              />
            )}
            {toast.tone === "info" && (
              <Info
                size={18}
                weight="bold"
                className="mt-0.5 shrink-0 text-[var(--primary)]"
                aria-hidden="true"
              />
            )}
            {toast.tone === "error" && (
              <WarningCircle
                size={18}
                weight="bold"
                className="mt-0.5 shrink-0 text-[var(--danger)]"
                aria-hidden="true"
              />
            )}
            <p className="flex-1 text-sm leading-snug">{toast.text}</p>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              aria-label="Fechar notificação"
              className="rounded p-0.5 text-[var(--muted)] hover:text-[var(--ink)]"
            >
              <X size={15} weight="bold" aria-hidden="true" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
